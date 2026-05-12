<script lang="ts">
	let { data } = $props()
	const Content = $derived(data.content)
</script>

<svelte:head>
	<title>{data.meta.title} | The Autonomy Protocol</title>
</svelte:head>

{#if Content}
	<Content />
{/if}
