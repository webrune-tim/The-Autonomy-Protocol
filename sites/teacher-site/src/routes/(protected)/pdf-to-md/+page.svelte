<script>
	import { enhance } from '$app/forms';

	// Svelte 5 snippet capturing the action response data from the server
	let { form } = $props();

	// Local reactive state for UI transitions
	let isSubmitting = $state(false);

	function handleEnhance() {
		isSubmitting = true;
		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}
</script>

<div class="app-container">
	<!-- standard HTML form routing directly to our server action -->
	<form method="POST" action="?/convert" enctype="multipart/form-data" use:enhance={handleEnhance}>
		<div class="upload-zone">
			<label for="pdf-file">Click to choose a PDF file</label>
			<input 
				id="pdf-file" 
				name="pdf-file" 
				type="file" 
				accept="application/pdf" 
				disabled={isSubmitting} 
			/>
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Converting...' : 'Convert to Markdown'}
			</button>
		</div>
	</form>

	{#if form?.error}
		<p class="status error">Error: {form.error}</p>
	{/if}

	{#if form?.success && form?.markdown}
		<div class="output-container">
			<h3>Converted Markdown:</h3>
			<pre><code>{form.markdown}</code></pre>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #121212;
		color: #e0e0e0;
		font-family: sans-serif;
	}

	.app-container {
		max-width: 800px;
		margin: 40px auto;
		padding: 20px;
	}

	.upload-zone {
		display: flex;
		flex-direction: column;
		gap: 16px;
		border: 2px dashed #333;
		padding: 40px;
		text-align: center;
		background: #1e1e1e;
		border-radius: 8px;
	}

	label {
		cursor: pointer;
		color: #a0a0a0;
	}

	input[type="file"] {
		margin: 0 auto;
		color: #e0e0e0;
	}

	button {
		background-color: #2a2a2a;
		color: #fff;
		border: 1px solid #444;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s;
	}

	button:hover:not(:disabled) {
		background-color: #3a3a3a;
		border-color: #666;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.status.error {
		margin-top: 20px;
		padding: 12px;
		border-radius: 4px;
		color: #ff6b6b;
		background: #2c1a1a;
		border: 1px solid #5a2727;
	}

	.output-container {
		margin-top: 30px;
	}

	pre {
		background: #1e1e1e;
		padding: 20px;
		border-radius: 6px;
		overflow-x: auto;
		border: 1px solid #2d2d2d;
	}

	code {
		font-family: monospace;
		color: #a9dc76;
	}
</style>