<script lang="ts">
	import { enhance } from '$app/forms';
	import toast, { Toaster } from 'svelte-french-toast';
	import {
		User,
		Mail,
		MessageSquare,
		HandHelping,
		LifeBuoy,
		Send
	} from '@lucide/svelte';

	const createInitialState = () => ({
		name: '',
		email: '',
		isOfferingHelp: true,
		comments: ''
	});

	let formData = $state(createInitialState());

	// This function handles the result of the server action
	const handleEnhance = () => {
		return async ({ result }: { result: any }) => {
			if (result.type === 'success') {
				toast.success('Message sent successfully!');
				formData = createInitialState();
			} else if (result.type === 'failure') {
				toast.error(result.data?.error || 'Oops! There was a problem.');
			} else {
				toast.error('An unexpected error occurred.');
			}
		};
	};
</script>

<Toaster />

<section class="angled-bottom-box" style="--color: var(--brand-orange)">
	<h1>Contact Us</h1>
	<p>
		Have questions or want to learn more about the Autonomy Protocol? Reach out to
		us! We're here to help you take charge of your own life and start governing
		yourself.
	</p>
</section>

<section
	class="angled-top-box thick-margins no-bottom-margin"
	style="--color: var(--brand-blue-dark)"
>
	<form 
		method="POST" 
		use:enhance={handleEnhance} 
		class="contact-form"
	>
		<!-- Hidden input to capture the boolean state in the FormData -->
		<input type="hidden" name="isOfferingHelp" value={formData.isOfferingHelp} />

		<div class="input-group">
			<label for="name"><User size={18} /> Name</label>
			<input
				type="text"
				id="name"
				name="name"
				bind:value={formData.name}
				placeholder="Your name"
				required
			/>
		</div>

		<div class="input-group">
			<label for="email"><Mail size={18} /> Email Address</label>
			<input
				type="email"
				id="email"
				name="email"
				bind:value={formData.email}
				placeholder="email@example.com"
				required
			/>
		</div>

		<div class="input-group">
			<label><MessageSquare size={18} /> How can we help?</label>
			<div class="segmented-control">
				<div class="glider" class:shifted={!formData.isOfferingHelp}></div>
				
				<button
					type="button"
					class="control-option"
					class:active={formData.isOfferingHelp}
					onclick={() => (formData.isOfferingHelp = true)}
				>
					<HandHelping size={20} />
					<span>I Need Help</span>
				</button>
				
				<button
					type="button"
					class="control-option"
					class:active={!formData.isOfferingHelp}
					onclick={() => (formData.isOfferingHelp = false)}
				>
					<LifeBuoy size={20} />
					<span>I Want to Help</span>
				</button>
			</div>
		</div>

		<div class="input-group">
			<label for="comments"><MessageSquare size={18} /> Comments</label>
			<textarea
				id="comments"
				name="comments"
				bind:value={formData.comments}
				rows="5"
				placeholder="Tell us more..."
				required
			></textarea>
		</div>

		<button type="submit" class="submit-btn">
			<Send size={18} /> Send Message
		</button>
	</form>
</section>

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		color: var(--brand-orange);
	}

	input, textarea {
		padding: 0.8rem;
		background: var(--surface-2);
		border: 2px solid var(--surface-3);
		color: var(--fg);
		border-radius: 4px;
		font-family: inherit;
	}

	.segmented-control {
		position: relative;
		display: flex;
		background-color: var(--surface-2);
		border: 2px solid var(--surface-3);
		padding: 4px;
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
		color: var(--fg);
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	.control-option.active {
		color: var(--surface-1);
	}

	.glider {
		position: absolute;
		top: 4px;
		left: 4px;
		height: calc(100% - 8px);
		width: calc(50% - 4px);
		background-color: var(--brand-blue);
		z-index: 1;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.glider.shifted {
		transform: translateX(100%);
		background-color: var(--brand-orange);
	}

	.submit-btn {
		background: var(--brand-blue);
		color: white;
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
		transition: transform 0.1s, filter 0.2s;
		margin-top: 1rem;
	}

	.submit-btn:hover {
		filter: brightness(1.1);
	}

	.submit-btn:active {
		transform: scale(0.98);
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
</style>
