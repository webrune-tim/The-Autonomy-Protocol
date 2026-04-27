<script lang="ts">
	import { parseQuiz } from '$lib/quiz-parser'

	let dragging = $state(false)
	let fileContent = $state('')
	let status = $state('idle') // idle, parsing, success

	async function handleDrop(e: DragEvent) {
		e.preventDefault()
		dragging = false

		const file = e.dataTransfer?.files[0]
		if (file && file.name.endsWith('.md')) {
			status = 'parsing'
			fileContent = await file.text()

			// We parse locally first to validate before sending to the server
			const parsed = parseQuiz(fileContent)

			// Send to your API or Action
			const response = await fetch('?/createQuiz', {
				method: 'POST',
				body: JSON.stringify({ markdown: fileContent, ...parsed })
			})

			if (response.ok) status = 'success'
		}
	}
</script>

<div
	class="drop-zone"
	role="button"
	tabindex="0"
	class:dragging
	ondragover={(e) => {
		e.preventDefault()
		dragging = true
	}}
	ondragleave={() => (dragging = false)}
	ondrop={handleDrop}
>
	{#if status === 'idle'}
		<p>Drag your <strong>Integrity Protocol</strong> MD file here</p>
	{:else if status === 'parsing'}
		<p class="pulse">Extracting Curriculum Logic...</p>
	{:else}
		<p>Quiz created successfully. <a href="/quizzes">View Repository</a></p>
	{/if}
</div>

<style>
	.drop-zone {
		height: 300px;
		border: 2px dashed var(--brand-orange);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--surface-1);
		transition: all 0.2s ease;
	}
	.dragging {
		background: var(--surface-2);
		border-color: var(--brand-blue);
		transform: scale(1.02);
	}
</style>
