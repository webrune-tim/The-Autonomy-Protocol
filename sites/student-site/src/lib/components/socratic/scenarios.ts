import type { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
	{
		id: 'fed-papers-01',
		title: 'Constitutional Foundations & Separation of Powers',
		topic: 'Federalist No. 51 & Economic Historiography',
		standardFocus: 'Integrity Protocol: Inquiry-Based Reality & Precision of Speech',
		initialStatement:
			'The US Constitution was primarily designed by wealthy landowners to consolidate their own financial advantages over working citizens.',
		steps: {
			start: {
				id: 'start',
				speakerStatement:
					'The US Constitution was primarily designed by wealthy landowners to consolidate their own financial advantages over working citizens.',
				contextNote: 'The instructor presents this normative interpretation as an unquestioned consensus.',
				options: [
					{
						id: 'opt-combative',
						category: 'counter-perspectives',
						text: 'That is just ideological revisionism. The Founders built the freest system in human history.',
						feedback:
							'Ineffective: Direct ideological refutation induces defensive posture and shifts the inquiry away from empirical evidence.',
						scores: { posture: 20, probing: 30, grounding: 15, efficacy: 25 },
						teacherResponse:
							'That is a personal political stance, but modern historiography shows their financial portfolios directly aligned with the final document.',
						nextStepId: 'step-economic'
					},
					{
						id: 'opt-socratic-evidence',
						category: 'probing-evidence',
						text: 'How does that reconcile with Federalist No. 51, where Madison argues that institutional checks and balances were specifically engineered to prevent any single faction—including creditor elites—from monopolizing power?',
						feedback:
							'Exemplary: Cites contemporaneous primary documentation (Federalist 51) and frames the tension as an analytical paradox for the speaker to resolve.',
						scores: { posture: 95, probing: 92, grounding: 95, efficacy: 92 },
						teacherResponse:
							'Madison articulated that theoretical defense, but historians like Charles Beard argue that the rhetoric masked concrete protections for bondholders.',
						nextStepId: 'step-economic'
					},
					{
						id: 'opt-clarify-definition',
						category: 'clarification',
						text: 'What primary documentation or voting roll calls from the 1787 Philadelphia Convention best demonstrate that wealth consolidation was the predominant driver rather than federal stability?',
						feedback:
							'High Rigor: Politely redirects the burden of proof to contemporaneous evidence rather than secondary interpretation.',
						scores: { posture: 90, probing: 88, grounding: 85, efficacy: 88 },
						teacherResponse:
							'We can examine Charles Beard’s 1913 economic interpretation, which analyzed delegate security holdings and public debt obligations.',
						nextStepId: 'step-economic'
					}
				]
			},
			'step-economic': {
				id: 'step-economic',
				speakerStatement:
					'Take Charles Beard’s thesis: delegates held substantial depreciated public securities, meaning they stood to gain directly from a federal treasury empowered to honor national debt at face value.',
				contextNote: 'The instructor references an influential 20th-century economic interpretation.',
				options: [
					{
						id: 'opt-beard-critique',
						category: 'counter-perspectives',
						text: 'Didn’t Forrest McDonald and later quantitative economic historians recalculate Beard’s data and discover that delegates opposing ratification held equal or greater public securities than those who supported it?',
						feedback:
							'Mastery of Historiography: Deconstructs a tertiary conclusion by introducing empirical replication data without personal antagonism.',
						scores: { posture: 96, probing: 95, grounding: 98, efficacy: 96 },
						teacherResponse:
							'That is an accurate historical note—McDonald’s 1958 empirical re-analysis did expose severe flaws in Beard’s direct causality thesis.',
						nextStepId: null
					},
					{
						id: 'opt-consequence-inquiry',
						category: 'implications',
						text: 'If private financial gain dictated the constitutional design, why did delegates incorporate Article I restrictions that expressly barred the federal government from favoring the ports or commerce of one state over another?',
						feedback:
							'Structural Rigor: Tests the universal claim against counter-evidence directly inside the constitutional legal text.',
						scores: { posture: 88, probing: 90, grounding: 92, efficacy: 86 },
						teacherResponse:
							'That is a valid counterpoint. It demonstrates that interstate equilibrium and preventing regional monopoly was at least as central as private finance.',
						nextStepId: null
					},
					{
						id: 'opt-assumptive-retort',
						category: 'probing-assumptions',
						text: 'Isn’t it cynical to assume that everyone in the 18th century was motivated only by greed rather than civic republican virtue?',
						feedback:
							'Partial Alignment: Probes motivational assumptions, but phrasing drifts toward moral judgment rather than empirical verification.',
						scores: { posture: 60, probing: 65, grounding: 45, efficacy: 55 },
						teacherResponse:
							'Historians look at material interests because self-stated virtue is difficult to measure objectively, but it is true that ideological commitment played a major role.',
						nextStepId: null
					}
				]
			}
		}
	},
	{
		id: 'hist-forensics-02',
		title: 'Primary Source Forensics & Presentism',
		topic: 'Evaluating Historical Consensus vs Contemporaneous Ledgers',
		standardFocus: 'Integrity Protocol: Precision of Speech & Falsifiability',
		initialStatement:
			'Historical societies before the late modern era operated with zero regard for human rights because they lacked our modern ethical frameworks.',
		steps: {
			start: {
				id: 'start',
				speakerStatement:
					'Historical societies before the late modern era operated with zero regard for human rights because they lacked our modern ethical frameworks.',
				contextNote: 'The instructor evaluates historical periods exclusively through modern normative criteria (presentism).',
				options: [
					{
						id: 'opt-rights-combative',
						category: 'counter-perspectives',
						text: 'That is completely absurd. People back then had higher moral standards than modern culture does.',
						feedback:
							'Ineffective: Swaps one subjective value judgment for another without introducing objective standards.',
						scores: { posture: 25, probing: 20, grounding: 10, efficacy: 20 },
						teacherResponse:
							'That is a nostalgic assumption unsupported by legal or institutional history.',
						nextStepId: 'step-jurisprudence'
					},
					{
						id: 'opt-rights-charters',
						category: 'probing-evidence',
						text: 'When we examine foundational legal documents like the 1215 Magna Carta or the 1689 English Bill of Rights, don’t they explicitly establish procedural protections, habeas corpus, and limits on arbitrary sovereign power?',
						feedback:
							'Exemplary: Anchors inquiry in specific historical charters that codified institutional constraints and procedural rights.',
						scores: { posture: 94, probing: 92, grounding: 96, efficacy: 94 },
						teacherResponse:
							'They did protect procedural rights, though primarily for baronial elites rather than universal citizenship.',
						nextStepId: 'step-jurisprudence'
					},
					{
						id: 'opt-falsifiability-check',
						category: 'clarification',
						text: 'What empirical threshold would distinguish an era possessing "zero regard for rights" from an era actively developing customary common law protections against unlawful seizure and bodily harm?',
						feedback:
							'Rhetorical Precision: Applies the Rule of Falsifiability, requiring the speaker to define an objective metric for their assertion.',
						scores: { posture: 92, probing: 95, grounding: 88, efficacy: 92 },
						teacherResponse:
							'That is a fair distinction. Legal historians differentiate between customary protections under English common law and universal human rights doctrines.',
						nextStepId: 'step-jurisprudence'
					}
				]
			},
			'step-jurisprudence': {
				id: 'step-jurisprudence',
				speakerStatement:
					'Even if customary legal protections existed, they were strictly functional arrangements to maintain class hierarchy, not genuine human rights.',
				contextNote: 'The instructor attributes underlying subjective motives to historical legal developments.',
				options: [
					{
						id: 'opt-steelman-protocol',
						category: 'probing-assumptions',
						text: 'To make sure I understand the argument: if an institutional legal reform serves an immediate administrative stability function, does that automatically invalidate its long-term effect of establishing judicial due process?',
						feedback:
							'Steelman Protocol: Accurately summarizes the instructor’s premise before isolating the unstated causal assumption.',
						scores: { posture: 96, probing: 94, grounding: 92, efficacy: 96 },
						teacherResponse:
							'No, it does not invalidate the long-term institutional legacy—due process clearly evolved out of those very jurisdictional disputes.',
						nextStepId: null
					},
					{
						id: 'opt-comparative-consequence',
						category: 'implications',
						text: 'If we evaluate all past legal development exclusively through functional cynicism, doesn’t that same analytical standard apply to our modern legal institutions as well?',
						feedback:
							'Logical Implication: Demonstrates the universal downstream consequence of applying functional cynicism to legal systems.',
						scores: { posture: 90, probing: 92, grounding: 88, efficacy: 90 },
						teacherResponse:
							'Indeed, critical legal theorists apply that exact skepticism to modern statutes as well.',
						nextStepId: null
					}
				]
			}
		}
	}
];
