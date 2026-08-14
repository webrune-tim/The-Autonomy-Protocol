<script lang="ts">
	import {
		moduleState,
		getModuleProgress,
		initModuleState,
		toggleSection,
		saveSectionResponse
	} from '#lib/stores/moduleStore.svelte';
	import { ArrowBigLeft } from '@lucide/svelte';
	import { parseMarkdown } from '#lib/utils/markdown.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Set which module this page represents
	const moduleId = $derived(data.module.id);

	// Track student answers for each section
	let answers = $state<Record<string, string>>({});
	const MIN_CHARS = 100;

	// Initialize the module state and hydrate responses when the page loads
	$effect(() => {
		if (moduleId) {
			initModuleState(
				moduleId,
				data.module.sections.map((s) => s.id),
				data.userProgress
			);

			if (data.userProgress) {
				data.userProgress.forEach((p) => {
					if (p.response && answers[p.sectionId] === undefined) {
						answers[p.sectionId] = p.response;
					}
				});
			}
		}
	});

	// $derived ensures this variable recalculates anytime moduleState changes
	let progress = $derived(getModuleProgress(moduleId as any));

	// Helper for safe checkbox binding
	function getSectionState(secId: string) {
		if (!moduleState[moduleId]) return false;
		return moduleState[moduleId][secId] ?? false;
	}
</script>

<div class="module-container">
	<header class="angled-bottom-box">
		<h1 class="reveal-header">{data.module.title}</h1>

		<div class="progress-wrapper">
			<div class="progress-bar" style="width: {progress}%;"></div>
		</div>
		<p class="larger-text">{progress}% Completed</p>
		<a href="/modules" class="cta"><ArrowBigLeft /> Back to Modules</a>
	</header>

	<main class="margin-top-2">
		{#each data.module.sections as section (section.id)}
			{@const charCount = (answers[section.id] || '').trim().length}
			{@const isEligible = charCount >= MIN_CHARS}
			<section class="content">
				<h2>{section.title}</h2>
				<div class="markdown-body">
					{@html parseMarkdown(section.content)}
				</div>

				<div class="response-container">
					<label for="answer-{section.id}" class="response-label">
						Your Response / Answer
					</label>
					<textarea
						id="answer-{section.id}"
						bind:value={answers[section.id]}
						onblur={() => saveSectionResponse(moduleId, section.id, answers[section.id] || '')}
						placeholder="Type your response to the section question here (minimum 100 characters required)..."
						rows="4"
						class="response-textarea"
					></textarea>
					<div class="char-count-wrapper">
						<span
							class="char-counter"
							class:char-counter-met={isEligible}
						>
							{charCount} / {MIN_CHARS} characters
							{#if !isEligible}
								({MIN_CHARS - charCount} more needed)
							{:else}
								✓ Minimum met
							{/if}
						</span>
					</div>
				</div>

				<label class="completion-toggle" class:disabled-toggle={!isEligible}>
					<input
						type="checkbox"
						disabled={!isEligible}
						checked={getSectionState(section.id)}
						onchange={(e) =>
							toggleSection(
								moduleId,
								section.id,
								e.currentTarget.checked,
								answers[section.id] || ''
							)}
					/>
					<span>Mark "{section.title}" as complete</span>
				</label>
			</section>
		{/each}
	</main>
</div>

<style>
	.module-container {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--gap-2);
	}

	.progress-wrapper {
		width: 100%;
		background-color: var(--surface-3);
		border-radius: var(--border-radius);
		height: 12px;
		overflow: hidden;
		margin: var(--gap-1) 0;
	}

	.progress-bar {
		height: 100%;
		background-color: var(--brand-secondary);
		transition: width 0.3s ease;
	}

	.content {
		margin-bottom: var(--gap-3);
	}

	.markdown-body {
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--fg);
	}

	.markdown-body :global(p) {
		margin-bottom: var(--gap-1);
	}

	.markdown-body :global(p:last-child) {
		margin-bottom: 0;
	}

	.markdown-body :global(strong) {
		color: var(--brand-secondary);
		font-weight: 700;
	}

	.markdown-body :global(ul),
	.markdown-body :global(ol) {
		margin: var(--gap-1) 0;
		padding-left: 1.5rem;
	}

	.markdown-body :global(li) {
		margin-bottom: 0.5rem;
	}

	.markdown-body :global(blockquote) {
		border-left: 4px solid var(--brand-primary);
		margin: var(--gap-1) 0;
		padding-left: 1rem;
		opacity: 0.9;
		font-style: italic;
	}

	.markdown-body :global(code) {
		background: var(--surface-2);
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: monospace;
		font-size: 0.9em;
	}

	.markdown-body :global(pre) {
		background: var(--surface-2);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
	}

	.markdown-body :global(pre code) {
		background: none;
		padding: 0;
	}

	.response-container {
		margin-top: var(--gap-2);
		margin-bottom: var(--gap-1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.response-label {
		font-family: monospace;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--brand-secondary);
		font-weight: 600;
	}

	.response-textarea {
		width: 100%;
		padding: 0.85rem;
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		color: var(--fg);
		border-radius: var(--border-radius);
		font-family: inherit;
		font-size: 0.95rem;
		line-height: 1.5;
		resize: vertical;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.response-textarea:focus {
		outline: none;
		border-color: var(--brand-primary);
		box-shadow: 0 0 0 2px rgb(from var(--brand-primary) r g b / 0.25);
	}

	.char-count-wrapper {
		display: flex;
		justify-content: flex-end;
	}

	.char-counter {
		font-size: 0.8rem;
		font-family: monospace;
		color: #ff6b6b;
		opacity: 0.9;
		transition: color 0.2s ease;
	}

	.char-counter-met {
		color: #51cf66;
		font-weight: bold;
	}

	.completion-toggle {
		display: flex;
		align-items: center;
		gap: var(--gap-1);
		margin-top: var(--gap-1);
		cursor: pointer;
		user-select: none;
		transition: opacity 0.2s ease, filter 0.2s ease;
	}

	.disabled-toggle {
		opacity: 0.4;
		filter: grayscale(100%);
		cursor: not-allowed;
		pointer-events: none;
	}

	.disabled-toggle input {
		cursor: not-allowed;
	}
</style>
