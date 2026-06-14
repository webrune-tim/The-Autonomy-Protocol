<script>
	import PayPayDonateBtns from './PayPayDonateBtns.svelte'
	import { thickMargins } from '@autonomy/actions'
	import { RevealingImage } from '@autonomy/revealing_image'
	import { Eye } from '@lucide/svelte'

	import DonationImage from '$images/donation.png'

	let { form } = $props()
</script>

<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast)"
>
	<h1>Invest in Sovereignty</h1>
	<p>
		<strong class="larger-text"
			>Your contribution converts theory into agency.</strong
		><br /><br />
		The Autonomy Protocol is more than a curriculum—it is a social infrastructure project.
		We are building the tools that allow high school students to transition from being
		managed by systems to governing themselves.
	</p>

	<p>
		Financial support allows us to maintain <strong>Secular Rigor</strong>, expand
		our <strong>Digital Resource Library</strong>, and keep the protocol accessible
		to the districts and educators who need it most.
	</p>

	<RevealingImage src={DonationImage} alt="Donate Now" />

	<a class="cta" href="#how-you-can-help">
		<Eye /> Browse Opportunities
	</a>
</section>

<section
	class="angled-top-bottom-box"
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast)"
>
	<h2 class="reveal-header">Where your investment goes</h2>

	<ul>
		<li>
			<strong>Development of "The Practicum":</strong> Funding the creation of concrete,
			real-world classroom exercises that translate the 12-Step Logic into actionable life
			skills.
		</li>
		<li>
			<strong>The Resource Vault:</strong> Maintaining a centralized, free-to-access library
			of frameworks, worksheets, and assessment guides for public school educators.
		</li>
		<li>
			<strong>Professional Peer Review:</strong> Ensuring our modules remain free of sectarian
			language and partisan bias through rigorous oversight by mental health and educational
			experts.
		</li>
		<li>
			<strong>Scalability:</strong> Moving the protocol from a localized framework to a
			digital platform capable of supporting students nationwide.
		</li>
	</ul>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast)"
>
	<PayPayDonateBtns {form} />
</section>

<section
	class="angled-top-box no-bottom-margin"
	use:thickMargins
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast)"
>
	<h2 id="how-you-can-help">Our Fiduciary Promise</h2>

	<p>
		We operate under the Integrity Protocol. Every dollar is accounted for with the
		same transparency we teach our students. We do not answer to corporate interests
		or sectarian agendas—we answer to the educators and students we serve.
	</p>
</section>
