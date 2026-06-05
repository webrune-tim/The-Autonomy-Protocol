<script lang="ts">
	import { motion } from '$actions'

	// State for dynamic theme engine testing
	let currentTheme = $state('dark')
	let currentSite = $state('student')

	// State for your interactive card button demo
	let isHovered = $state(false)
	let isFocused = $state(false)
	const isActive = $derived(isHovered || isFocused)

	// Sync state cleanly with document root attributes for true token evaluation
	$effect(() => {
		document.documentElement.setAttribute('data-theme', currentTheme)
		document.documentElement.setAttribute('data-site', currentSite)

		return () => {
			// Cleanup on navigation out of style guide
			document.documentElement.removeAttribute('data-theme')
			document.documentElement.removeAttribute('data-site')
		}
	})

	// Groups of tokens extracted from your CSS for mapping visualization
	const nordBases = [
		{ name: '--nord0', desc: 'Darkest Slate' },
		{ name: '--nord1', desc: 'Dark Slate' },
		{ name: '--nord2', desc: 'Medium Slate' },
		{ name: '--nord3', desc: 'Light Slate' },
		{ name: '--nord4', desc: 'Off-White' },
		{ name: '--nord5', desc: 'Clear White' },
		{ name: '--nord6', desc: 'Radiant White' }
	]

	const nordBrand = [
		{ name: '--nord7', desc: 'Calm Turquoise' },
		{ name: '--nord8', desc: 'Glacial Blue' },
		{ name: '--nord9', desc: 'Ice Blue' },
		{ name: '--nord10', desc: 'Deep Arctic Blue' }
	]

	const nordAurora = [
		{ name: '--nord11', desc: 'Aurora Red (Error)' },
		{ name: '--nord12', desc: 'Aurora Orange (Warning)' },
		{ name: '--nord13', desc: 'Aurora Yellow (Caution)' },
		{ name: '--nord14', desc: 'Aurora Green (Success)' },
		{ name: '--nord15', desc: 'Aurora Purple (Premium)' }
	]

	const semanticTokens = [
		'--brand-primary',
		'--brand-secondary',
		'--brand-tertiary',
		'--text-primary-print',
		'--text-secondary-print',
		'--text-tertiary-print',
		'--bg-surface',
		'--surface-1',
		'--surface-2',
		'--surface-3'
	]
</script>

<div class="styleguide-container">
	<header class="sg-control-panel">
		<div>
			<h1>System Style Guide</h1>
			<p class="subtitle">
				Validating runtime token interpolation and layout contracts
			</p>
		</div>

		<div class="sg-controls">
			<div class="control-group">
				<label for="theme-select">Theme Mode</label>
				<select id="theme-select" bind:value={currentTheme}>
					<option value="dark">Dark Theme (Baseline)</option>
					<option value="light">Light Theme (Engine Inversion)</option>
				</select>
			</div>

			<div class="control-group">
				<label for="site-select">Site Context</label>
				<select id="site-select" bind:value={currentSite}>
					<option value="student">Student Portal (Base Accents)</option>
					<option value="teacher">Teacher Portal (Aurora Overrides)</option>
				</select>
			</div>
		</div>
	</header>

	<hr class="sg-divider" />

	<section class="sg-section">
		<h2>1. Typographic Print Engine</h2>
		<div class="sg-grid typography-showcase">
			<div class="sg-card layout-flow">
				<h1>Heading 1 (Passion One)</h1>
				<h2>Heading 2 (Passion One)</h2>
				<h3>Heading 3 (Passion One)</h3>
				<h4>Heading 4 (Passion One)</h4>
			</div>

			<div class="sg-card layout-flow">
				<p class="larger-text">
					This is larger paragraph text styled with <code>.larger-text</code> using Inter
					or Poppins.
				</p>
				<p>
					This is basic body paragraph styling. It automatically leverages your
					anti-aliasing optimizations. Inside it, you can view an <a href="#links"
						>inline text hyperlink</a
					> demonstrating automatic high-contrast print transitions.
				</p>

				<details>
					<summary>Details Accordion Summary Element</summary>
					<p>
						Collapsible block text content including <strong
							>strongly emphasized brand-highlighted callouts</strong
						>.
					</p>
				</details>
			</div>
		</div>
	</section>

	<section class="sg-section">
		<h2>2. Dynamic Color & Swatch Engines</h2>

		<h3>Polar Night & Snow Storm (Structural & Canvas Bases)</h3>
		<div class="swatch-grid">
			{#each nordBases as token}
				<div class="swatch-card">
					<div class="swatch-preview" style:background="var({token.name})"></div>
					<div class="swatch-info">
						<span class="token-name">{token.name}</span>
						<span class="token-desc">{token.desc}</span>
					</div>
				</div>
			{/each}
		</div>

		<h3>Frost & Aurora (Interactive Accents & Semantic States)</h3>
		<div class="swatch-grid">
			{#each nordBrand as token}
				<div class="swatch-card">
					<div class="swatch-preview" style:background="var({token.name})"></div>
					<div class="swatch-info">
						<span class="token-name">{token.name}</span>
						<span class="token-desc">{token.desc}</span>
					</div>
				</div>
			{/each}
			{#each nordAurora as token}
				<div class="swatch-card">
					<div class="swatch-preview" style:background="var({token.name})"></div>
					<div class="swatch-info">
						<span class="token-name">{token.name}</span>
						<span class="token-desc">{token.desc}</span>
					</div>
				</div>
			{/each}
		</div>

		<h3>Dynamic Resolution Mapping Engine</h3>
		<p class="section-desc">
			These chips track shifts dynamically between the Student and Teacher palettes.
		</p>
		<div class="swatch-grid resolved-grid">
			{#each semanticTokens as token}
				<div class="swatch-card compact">
					<div class="swatch-preview" style:background="var({token})"></div>
					<div class="swatch-info">
						<span class="token-name">{token}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="sg-section">
		<h2>3. Fluid Layout Clamps & Spacing</h2>
		<div class="sg-card spacing-showcase">
			<div class="spacing-strip">
				<span class="label">Gap 1 (Small Base)</span>
				<div class="spacing-bar bar-1" style:height="var(--gap-1)"></div>
			</div>
			<div class="spacing-strip">
				<span class="label">Gap 2 (Standard Flow)</span>
				<div class="spacing-bar bar-2" style:height="var(--gap-2)"></div>
			</div>
			<div class="spacing-strip">
				<span class="label">Gap 3 (Section Layout)</span>
				<div class="spacing-bar bar-3" style:height="var(--gap-3)"></div>
			</div>
			<div class="spacing-strip">
				<span class="label">Gap 4 (Hero Layout)</span>
				<div class="spacing-bar bar-4" style:height="var(--gap-4)"></div>
			</div>
		</div>
	</section>

	<section class="sg-section">
		<h2>4. Interactive & Micro-Animation Runtime</h2>
		<div class="sg-grid interaction-showcase">
			<div class="sg-card flex-center layout-flow">
				<span class="component-label">Original Component Animation Demo</span>
				<div class="interactive-container">
					<button
						type="button"
						onmouseenter={() => (isHovered = true)}
						onmouseleave={() => (isHovered = false)}
						onfocus={() => (isFocused = true)}
						onblur={() => (isFocused = false)}
						use:motion={() => ({
							keyframes: {
								scale: isActive ? 1.15 : 1,
								rotate: isActive ? 8 : 0,
								backgroundColor: isActive ? '#313244' : '#1e1e2e'
							},
							options: {
								type: 'spring',
								stiffness: 260,
								damping: 20
							}
						})}
						class="card"
					>
						Interact With Me
					</button>
				</div>
			</div>

			<div class="sg-card layout-flow alert-showcase">
				<span class="component-label">System Structural Semantics</span>

				<div class="alert-box success-alert">
					<strong>Success State Banner</strong>
					<p>Derived via OKLCH baseline transformations.</p>
				</div>

				<div class="alert-box error-alert">
					<strong>Critical Failure Banner</strong>
					<p>Enforced using hard token bounds.</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Local Style Guide Scaffold Styles */
	.styleguide-container {
		padding: var(--thick-margin);
		background-color: var(--bg);
		color: var(--fg);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: var(--gap-3);
		box-sizing: border-box;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.sg-control-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--gap-2);
	}

	.subtitle {
		opacity: 0.7;
		margin-top: var(--gap-1);
	}

	.sg-controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap-2);
		background: var(--surface-2);
		padding: var(--gap-2);
		border-radius: var(--border-radius);
		border: 1px solid var(--surface-3);
		flex: 1 1 auto;
		max-width: 100%;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1 1 200px;
	}

	.control-group select {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		background: var(--surface-1);
		color: var(--fg);
		border: 1px solid var(--surface-3);
		font-family: var(--font-sans-2);
		cursor: pointer;
		box-sizing: border-box;
	}

	.sg-divider {
		border: none;
		border-top: var(--border);
		opacity: 0.3;
		margin: 0;
	}

	.sg-section {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
	}

	.section-desc {
		opacity: 0.8;
		margin-top: calc(var(--gap-1) * -1);
	}

	.sg-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
		gap: var(--gap-2);
	}

	.sg-card {
		background: var(--surface-2);
		padding: var(--gap-2);
		border-radius: var(--border-radius);
		border: 1px solid var(--surface-3);
		box-sizing: border-box;
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.layout-flow > * + * {
		margin-top: 1.25rem;
	}

	.flex-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 220px;
		text-align: center;
	}

	.interactive-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: var(--gap-1) 0;
	}

	.component-label {
		font-family: var(--font-sans-1);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.5;
		margin-bottom: var(--gap-1);
	}

	/* Swatch Grids */
	.swatch-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr));
		gap: var(--gap-1);
	}

	.resolved-grid {
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
	}

	.swatch-card {
		background: var(--surface-2);
		border: 1px solid var(--surface-3);
		border-radius: calc(var(--border-radius) / 2);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.swatch-preview {
		height: 60px;
		width: 100%;
		transition: background-color 0.2s ease;
	}

	.swatch-info {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.token-name {
		font-family: monospace;
		font-size: 0.82rem;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.token-desc {
		font-size: 0.75rem;
		opacity: 0.6;
	}

	.compact .swatch-preview {
		height: 40px;
	}

	/* Spacing Visualizers */
	.spacing-showcase {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
	}

	.spacing-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--surface-1);
		padding: 0.75rem 1rem;
		border-radius: 6px;
		gap: var(--gap-1);
	}

	.spacing-strip .label {
		font-family: monospace;
		font-size: 0.9rem;
	}

	.spacing-bar {
		background: var(--brand-secondary);
		width: var(--thick-margin);
		border-radius: 4px;
		min-width: 40px;
	}

	/* Semantic Alerts */
	.alert-box {
		padding: var(--gap-1);
		border-radius: calc(var(--border-radius) / 2);
		border-left: 6px solid transparent;
	}

	.success-alert {
		background: var(--success-bg);
		color: var(--success-fg);
		border-color: var(--success-border);
	}

	.error-alert {
		background: var(--error-bg);
		color: var(--error-fg);
		border-color: var(--error-border);
	}

	/* --- Responsive Viewport Adjustments --- */
	@media (max-width: 768px) {
		.styleguide-container {
			padding: var(--gap-2);
			gap: var(--gap-2);
		}
		.sg-control-panel {
			flex-direction: column;
			align-items: stretch;
		}
		.sg-controls {
			flex-direction: column;
		}
		.control-group {
			flex: 1 1 auto;
		}
	}

	@media (max-width: 480px) {
		.styleguide-container {
			padding: var(--gap-1);
		}
		.spacing-strip {
			flex-direction: column;
			align-items: flex-start;
		}
		.spacing-bar {
			width: 100%;
		}
	}

	/* --- Original Component Styles Passed Down --- */
	.card {
		all: unset;
		box-sizing: border-box;
		width: 200px;
		height: 120px;
		background: #1e1e2e;
		border: 1px solid #45475a;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #cdd6f4;
		cursor: pointer;
		user-select: none;
		text-align: center;
		transition: outline 0.2s ease;
	}

	.card:focus-visible {
		outline: 2px solid #fab387;
		outline-offset: 4px;
	}
</style>
