<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/curriculum">Curriculum</a></li>
		<li><a href="/resources">Resources</a></li>
		<li><a href="/road-map">Road Map</a></li>
		<li><a href="/contribute">Contribute</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<style>
	nav {
		anchor-name: --active-link;
		margin: 0 auto;
		margin-top: var(--gap-1);
		margin-bottom: var(--gap-1);
		width: 100%;
		height: fit-content;
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-wrap: wrap;
		gap: var(--gap-1);
		padding: var(--gap-1) 0;
		margin: 0;
		font-weight: bold;
		height: fit-content;

		li {
			display: flex;
			place-items: center;
			margin: 0;
			padding: 0;
			flex: 1;
		}
	}

	a {
		color: var(--brand-blue);
		padding: 4px 8px;
		border-radius: var(--border-radius);
		border: 2px solid var(--brand-orange);
		background: rgb(from var(--brand-orange) r g b / 0.15);
		text-decoration: none;
		white-space: nowrap;
		flex: 1;
		text-align: center;

		&:hover {
			color: var(--fb);
			background: rgb(from var(--brand-orange) r g b / 0.3);
			text-decoration: none;
		}
	}
</style>
