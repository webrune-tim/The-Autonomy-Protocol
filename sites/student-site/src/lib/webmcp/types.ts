/**
 * WebMCP (Web Model Context Protocol) Type Definitions
 * Aligned with Chromium Early Preview Draft Specification and The Autonomy Protocol
 */

export interface WebMcpToolAnnotations {
	/**
	 * When true, indicates the tool only reads state and produces no side effects.
	 */
	readOnlyHint?: boolean;
	/**
	 * When true, signals to agents that tool output contains untrusted data requiring sanitization.
	 */
	untrustedContentHint?: boolean;
	/**
	 * When true, indicates executing the tool triggers significant or irreversible actions.
	 */
	consequentialHint?: boolean;
}

export interface WebMcpJsonSchemaProperty {
	type: 'string' | 'number' | 'boolean' | 'object' | 'array';
	description?: string;
	enum?: string[];
	items?: WebMcpJsonSchemaProperty;
	properties?: Record<string, WebMcpJsonSchemaProperty>;
	required?: string[];
}

export interface WebMcpJsonSchema {
	type: 'object';
	properties: Record<string, WebMcpJsonSchemaProperty>;
	required?: string[];
}

export interface WebMcpToolDefinition<T = any> {
	name: string;
	description: string;
	inputSchema: WebMcpJsonSchema;
	annotations?: WebMcpToolAnnotations;
	execute: (input: T, context: { signal?: AbortSignal }) => Promise<any> | any;
}

export interface RegisteredToolInfo {
	name: string;
	description: string;
	inputSchema: WebMcpJsonSchema;
	annotations?: WebMcpToolAnnotations;
	origin?: string;
	title?: string;
}

export interface ModelContextInterface {
	registerTool(
		tool: WebMcpToolDefinition,
		options?: { signal?: AbortSignal; exposedTo?: string[] }
	): Promise<void> | void;
	getTools(options?: { fromOrigins?: string[] }): Promise<RegisteredToolInfo[]>;
	executeTool(tool: RegisteredToolInfo | { name: string }, argsJson: string, options?: { signal?: AbortSignal }): Promise<any>;
	addEventListener?(type: 'toolchange', listener: (event: Event) => void): void;
	removeEventListener?(type: 'toolchange', listener: (event: Event) => void): void;
}

/**
 * Pedagogical State Machine Types for The Autonomy Protocol
 * Focus: Transitioning high school students from external behavioral policing to internal self-governance.
 */

export type AccountabilityCyclePhase =
	| 'ORIENTATION' // Steps 1-3: Limits of control, objective standard, cognitive alignment
	| 'INTERNAL_AUDIT' // Steps 4-7: Identifying cognitive liabilities/distortions, peer validation
	| 'RESTORATIVE_PRACTICE' // Steps 8-9: Interpersonal repair, action-based Amends Protocol
	| 'MAINTENANCE_LEADERSHIP'; // Steps 10-12: Daily cognitive inventory, real-time conflict de-escalation

export interface CognitiveLiability {
	id: string;
	label: string;
	distortionType:
		| 'EXTERNALIZED_BLAME'
		| 'CATASTROPHIZING'
		| 'DICHOTOMOUS_THINKING'
		| 'EMOTIONAL_REASONING'
		| 'ASSUMPTIVE_PROJECTION';
	detected: boolean;
	remediated: boolean;
	studentRefactoring?: string;
}

export interface EnvironmentalFrictionEvent {
	id: string;
	timestamp: number;
	source: string;
	scenario: string;
	requiredTenet: 'PRECISION_OF_SPEECH' | 'EMOTIONAL_NEUTRALITY' | 'INQUIRY_BASED_REALITY' | 'BASELINE_FLUCTUATION';
	resolved: boolean;
}

export interface TelemetryLogEntry {
	id: string;
	timestamp: string;
	caller: 'EVALUATOR_AGENT' | 'STUDENT_WORKBENCH' | 'SYSTEM';
	action: string;
	toolName?: string;
	payload?: any;
	result?: any;
	status: 'SUCCESS' | 'WARNING' | 'ERROR';
}

export interface CompetencyVerificationRecord {
	moduleId: string;
	studentId: string;
	verifiedAt: string;
	evaluatorSignature: string;
	cyclePhaseCompleted: AccountabilityCyclePhase;
	integrityCalibrationScore: number;
	observableBehaviorScore: number;
	verdict: 'COMPETENCY_VERIFIED' | 'ALIGNMENT_REQUIRED';
	notes: string;
}

/**
 * Socratic Inquiry & Epistemic Autonomy WebMCP Types
 * Focus: Equipping students with objective inquiry frameworks, primary-source forensics, and disciplined rhetoric.
 */

export type InquiryCategory =
	| 'clarification'
	| 'probing-assumptions'
	| 'probing-evidence'
	| 'counter-perspectives'
	| 'implications';

export interface SocraticTelemetryScores {
	posture: number; // Curiosity Posture (0-100)
	probing: number; // Assumption Probing (0-100)
	grounding: number; // Source Grounding (0-100)
	efficacy: number; // Dialectical Efficacy (0-100)
}

export interface SocraticTurnTelemetry {
	stepId: string;
	optionId: string;
	category: InquiryCategory;
	text: string;
	scores: SocraticTelemetryScores;
	teacherResponse: string;
	feedback: string;
}

export interface SocraticCompetencyRecord {
	scenarioId: string;
	studentId: string;
	timestamp: string;
	evaluatorSignature: string;
	cumulativeScores: SocraticTelemetryScores;
	grade: string;
	verdict: 'COMPETENCY_VERIFIED' | 'ALIGNMENT_REQUIRED';
	notes: string;
}

