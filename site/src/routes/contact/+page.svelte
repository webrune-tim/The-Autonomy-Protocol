<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';
	import HeroImage from '$images/img-1.jpg?enhanced&w=400;800;1600;2400'
	import {
		User,
		Mail,
		MessageSquare,
		HandHelping,
		LifeBuoy,
		Send
	} from '@lucide/svelte'

	const createInitialState = () => ({
		name: '',
		email: '',
		isOfferingHelp: true,
		comments: ''
	})

	let formData = $state(createInitialState())

	// contact/+page.svelte

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		// Use Formspree's endpoint (or a similar service like Getform.io)
		// You can replace 'YOUR_FORM_ID' with the ID you get after signing up, 
		// or use the email directly for a quick test (though ID is better for spam)
		const endpoint = "https://formspree.io/f/mdkdqygd";

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify($state.snapshot(formData))
			});

			if (response.ok) {
				toast.success('Message sent successfully!');
				formData = createInitialState();
			} else {
				toast.error("Oops! There was a problem submitting your form.");
			}
		} catch (error) {
			console.error("Submission error:", error);
			toast.error("Failed to send message. Please check your connection.");
		}
	};
</script>

<Toaster />
<section class="hero">
	<enhanced:img
		src={HeroImage}
		sizes="(min-width: 800px) 800px, 100vw"
		alt=""
		aria-hidden="true"
		class="hero-image"
	/>
	<div>
		<h1>Contact Us</h1>
		<p>
			Have questions or want to learn more about the Autonomy Protocol? Reach out to
			us! We're here to help you take charge of your own life and start governing
			yourself.
		</p>
	</div>
</section>

<section class="content">
	<form onsubmit={handleSubmit} class="contact-form">
		<div class="input-group">
			<label for="name"><User size={18} /> Name</label>
			<input
				type="text"
				id="name"
				bind:value={formData.name}
				placeholder="Your name"
				required
			/>
		</div>

		<div class="input-group">
			<label for="email"><Mail size={18} /> Email</label>
			<input
				type="email"
				id="email"
				bind:value={formData.email}
				placeholder="email@example.com"
				required
			/>
		</div>

		<div class="segmented-control">
			<button
				type="button"
				class="control-option"
				class:active={formData.isOfferingHelp}
				onclick={() => (!formData.isOfferingHelp = false)}
			>
				<LifeBuoy size={18} />
				<span>I want to help</span>
			</button>

			<button
				type="button"
				class="control-option"
				class:active={formData.isOfferingHelp}
				onclick={() => (formData.isOfferingHelp = true)}
			>
				<HandHelping size={18} />
				<span>I need help</span>
			</button>

			<div class="glider" class:shifted={formData.isOfferingHelp}></div>
		</div>

		<div class="input-group">
			<label for="comments"><MessageSquare size={18} /> Comments</label>
			<textarea
				id="comments"
				bind:value={formData.comments}
				rows="5"
				placeholder="How can we assist you?"
			></textarea>
		</div>

		<button type="submit" class="submit-btn">
			Submit Message <Send size={18} />
		</button>
	</form>
</section>

<style>
	.contact-form {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
		padding: var(--gap-1);
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		color: var(--accent-1);
	}

	input,
	textarea {
		background: var(--blue-60);
		border: 1px solid var(--blue-40);
		color: var(--white);
		padding: 0.8rem;
		border-radius: 4px;
		font-family: inherit;
		transition: border-color 0.2s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-2);
	}

	.segmented-control {
		position: relative;
		display: flex;
		background-color: var(--blue-60);
		border: 1px solid var(--blue-40);
		padding: 4px;
		border-radius: 8px;
		width: 100%;
		overflow: hidden;
	}

	.control-option {
		position: relative;
		z-index: 2;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.8rem;
		border: none;
		background: none;
		color: var(--blue-20); /* Dimmed color for inactive */
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	.control-option.active {
		color: var(
			--blue-80
		); /* Dark text for contrast against the yellow/pink slider */
	}

	/* The sliding highlight */
	.glider {
		position: absolute;
		top: 4px;
		left: 4px;
		height: calc(100% - 8px);
		width: calc(50% - 4px);
		background-color: var(--accent-1); /* Yellow from your global.css */
		border-radius: 4px;
		z-index: 1;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.glider.shifted {
		transform: translateX(100%);
		background-color: var(--accent-2); /* Changes to Pink when "Offering Help" */
	}

	@media (max-width: 480px) {
		.segmented-control {
			flex-direction: column;
		}
		.glider {
			width: calc(100% - 8px);
			height: calc(50% - 4px);
		}
		.glider.shifted {
			transform: translateY(100%);
		}
	}

	.submit-btn {
		background: var(--accent-1);
		color: var(--blue-80);
		border: none;
		padding: 1rem;
		font-family: 'Poppins', sans-serif;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition:
			transform 0.1s,
			filter 0.2s;
	}

	.submit-btn:hover {
		filter: brightness(1.1);
	}

	.submit-btn:active {
		transform: scale(0.98);
	}
</style>
