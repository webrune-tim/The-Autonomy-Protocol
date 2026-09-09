/**
 * WebMCP Client Manager
 * Implements Chromium Early Preview Model Context Protocol (document.modelContext)
 * with graceful progressive enhancement and lifecycle management via AbortController.
 */

import { PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN } from '$app/env/public';
import type {
	ModelContextInterface,
	RegisteredToolInfo,
	WebMcpToolDefinition
} from './types';

class WebMcpClientManager {
	private activeControllers: Map<string, AbortController> = new Map();
	private fallbackTools: Map<string, WebMcpToolDefinition> = new Map();
	private listeners: Set<(tools: RegisteredToolInfo[]) => void> = new Set();
	private trialToken: string = PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN || '';

	/**
	 * Injects an Origin Trial token into the document head
	 */
	public injectOriginTrial(token: string) {
		if (typeof document === 'undefined' || !token) return;
		this.trialToken = token;

		const existing = document.querySelector('meta[http-equiv="origin-trial"]');
		if (existing) {
			existing.setAttribute('content', token);
		} else {
			const meta = document.createElement('meta');
			meta.httpEquiv = 'origin-trial';
			meta.content = token;
			document.head.appendChild(meta);
		}
	}

	/**
	 * Detects if native WebMCP (document.modelContext or navigator.modelContext) is available
	 */
	public isNativeSupported(): boolean {
		if (typeof window === 'undefined') return false;
		const docCtx = (document as any)?.modelContext;
		const navCtx = (navigator as any)?.modelContext;
		return Boolean((docCtx && typeof docCtx.registerTool === 'function') || (navCtx && typeof navCtx.registerTool === 'function'));
	}

	/**
	 * Gets the underlying ModelContext instance or the managed fallback context
	 */
	public getModelContext(): ModelContextInterface {
		if (typeof window === 'undefined') {
			return this.createFallbackContext();
		}

		const docCtx = (document as any)?.modelContext;
		if (docCtx && typeof docCtx.registerTool === 'function') {
			return docCtx as ModelContextInterface;
		}

		const navCtx = (navigator as any)?.modelContext;
		if (navCtx && typeof navCtx.registerTool === 'function') {
			return navCtx as ModelContextInterface;
		}

		return this.createFallbackContext();
	}

	/**
	 * Registers a tool into WebMCP with an AbortController for clean lifecycle teardown
	 */
	public async registerTool(tool: WebMcpToolDefinition): Promise<AbortController> {
		// Clean up existing instance if already registered
		this.unregisterTool(tool.name);

		const controller = new AbortController();
		this.activeControllers.set(tool.name, controller);
		this.fallbackTools.set(tool.name, tool);

		const context = this.getModelContext();
		try {
			await context.registerTool(tool, { signal: controller.signal });
		} catch (error) {
			console.warn(`[WebMCP] Native registration failed for tool "${tool.name}", using managed runtime fallback:`, error);
		}

		this.notifyListeners();
		return controller;
	}

	/**
	 * Unregisters a tool using AbortSignal abort() as per WebMCP specification
	 */
	public unregisterTool(toolName: string): boolean {
		const controller = this.activeControllers.get(toolName);
		if (controller) {
			controller.abort();
			this.activeControllers.delete(toolName);
			this.fallbackTools.delete(toolName);
			this.notifyListeners();
			return true;
		}
		return false;
	}

	/**
	 * Unregisters all tools registered by this client
	 */
	public unregisterAll(): void {
		for (const [name, controller] of this.activeControllers.entries()) {
			controller.abort();
		}
		this.activeControllers.clear();
		this.fallbackTools.clear();
		this.notifyListeners();
	}

	/**
	 * Returns list of registered tools from the active context
	 */
	public async listRegisteredTools(): Promise<RegisteredToolInfo[]> {
		const context = this.getModelContext();
		try {
			if (typeof context.getTools === 'function') {
				const tools = await context.getTools();
				if (tools && tools.length > 0) return tools;
			}
		} catch {
			// Fall through to local cache
		}

		return Array.from(this.fallbackTools.values()).map((tool) => ({
			name: tool.name,
			description: tool.description,
			inputSchema: tool.inputSchema,
			annotations: tool.annotations,
			origin: typeof window !== 'undefined' ? window.location.origin : ''
		}));
	}

	/**
	 * Executes a tool either via native WebMCP or local registry
	 */
	public async executeTool(toolName: string, args: Record<string, any>): Promise<any> {
		const context = this.getModelContext();
		const tool = this.fallbackTools.get(toolName);

		if (this.isNativeSupported() && typeof context.executeTool === 'function') {
			try {
				return await context.executeTool({ name: toolName }, JSON.stringify(args));
			} catch (err) {
				console.warn(`[WebMCP] Native executeTool failed, executing handler directly:`, err);
			}
		}

		if (tool) {
			return await tool.execute(args, { signal: this.activeControllers.get(toolName)?.signal });
		}

		throw new Error(`[WebMCP] Tool not found: "${toolName}"`);
	}

	/**
	 * Subscribes to changes in registered tools
	 */
	public onToolsChange(callback: (tools: RegisteredToolInfo[]) => void): () => void {
		this.listeners.add(callback);
		this.listRegisteredTools().then(callback);
		return () => this.listeners.delete(callback);
	}

	private notifyListeners(): void {
		this.listRegisteredTools().then((tools) => {
			for (const listener of this.listeners) {
				listener(tools);
			}
		});
	}

	/**
	 * Built-in polyfill context when browser flags / Origin Trial are not yet enabled
	 */
	private createFallbackContext(): ModelContextInterface {
		const self = this;
		return {
			async registerTool(tool: WebMcpToolDefinition) {
				self.fallbackTools.set(tool.name, tool);
			},
			async getTools() {
				return Array.from(self.fallbackTools.values()).map((t) => ({
					name: t.name,
					description: t.description,
					inputSchema: t.inputSchema,
					annotations: t.annotations,
					origin: typeof window !== 'undefined' ? window.location.origin : ''
				}));
			},
			async executeTool(toolRef: { name: string }, argsJson: string) {
				const tool = self.fallbackTools.get(toolRef.name);
				if (!tool) throw new Error(`Tool not found: ${toolRef.name}`);
				const parsed = JSON.parse(argsJson || '{}');
				return await tool.execute(parsed, {});
			}
		};
	}
}

export const webMcpClient = new WebMcpClientManager();
