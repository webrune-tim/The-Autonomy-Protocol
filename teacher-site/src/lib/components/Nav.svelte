<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/curriculum">Curriculum</a></li>
		<li><a href="/resources">Resources</a></li>
		<li><a href="/contribute">Contribute</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<style>
	:global(:root) {
		--nav-bg: var(--brand-orange);

		--shadow: 0 0 12px hsl(from var(--nav-bg) h s 10);

		--timing-speed: 500ms;
		--timing-function: linear(
			0,
			0.402 7.4%,
			0.711 15.3%,
			0.929 23.7%,
			1.008 28.2%,
			1.067 33%,
			1.099 36.9%,
			1.12 41%,
			1.13 45.4%,
			1.13 50.1%,
			1.111 58.5%,
			1.019 83.2%,
			1.004 91.3%,
			1
		);
	}

    :global(:root[data-theme='light']) {
	    color-scheme: light;

        --shadow: 0 0 12px hsl(from var(--nav-bg) h s 150);
    }

	nav {
  		anchor-name: --active-link;
		margin: 0 auto;
		margin-top: var(--gap-1);
		width: 100%;

		a:is(:hover, :focus-visible) {
			anchor-name: --active-link;
		}

		&::after {
			content: "";
			background: rgb(from var(--nav-bg) r g b / 0.5);
			border: 2px solid var(--nav-bg);
			box-shadow: inset var(--shadow);
			border-radius: var(--border-radius);
			corner-shape: squrcle;

			position: absolute;
			position-anchor: --active-link;
			top: anchor(top);
			left: anchor(left);
			right: anchor(right);
			bottom: anchor(bottom);

			z-index: -1;

			transition: inset var(--timing-speed) var(--timing-function);
		}
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--gap-1);
		padding: var(--gap-1) 0;
		margin: 0;
		font-weight: bold;
	}

	a {
		color: var(--brand-blue);
		padding: 8px 16px;
	}

	@media (max-width: 600px) {
		ul {
			justify-content: center;
		}
	}
</style>
