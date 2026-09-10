import type { Scenario, DialogueOption, DialogueStep, SocraticScores } from './types';
import { simulationEngine } from '#lib/webmcp/simulationEngine.svelte';

export class DialogueSession {
	scenario = $state<Scenario>()!;
	currentStepId = $state<string | null>(null);
	history = $state<
		Array<{
			speakerText: string;
			studentOption: DialogueOption;
		}>
	>([]);
	isComplete = $state<boolean>(false);

	constructor(scenario: Scenario, startStepId: string = 'start') {
		this.scenario = scenario;
		this.currentStepId = startStepId;
		simulationEngine.resetSocraticSession(scenario.id);
	}

	currentStep = $derived.by((): DialogueStep | null => {
		if (!this.currentStepId) return null;
		return this.scenario.steps[this.currentStepId] ?? null;
	});

	cumulativeScores = $derived.by((): SocraticScores => {
		if (this.history.length === 0) {
			return { posture: 0, probing: 0, grounding: 0, efficacy: 0 };
		}

		const totals = this.history.reduce(
			(acc, entry) => ({
				posture: acc.posture + entry.studentOption.scores.posture,
				probing: acc.probing + entry.studentOption.scores.probing,
				grounding: acc.grounding + entry.studentOption.scores.grounding,
				efficacy: acc.efficacy + entry.studentOption.scores.efficacy
			}),
			{ posture: 0, probing: 0, grounding: 0, efficacy: 0 }
		);

		const count = this.history.length;
		return {
			posture: Math.round(totals.posture / count),
			probing: Math.round(totals.probing / count),
			grounding: Math.round(totals.grounding / count),
			efficacy: Math.round(totals.efficacy / count)
		};
	});

	overallGrade = $derived.by((): string => {
		const scores = this.cumulativeScores;
		const avg = (scores.posture + scores.probing + scores.grounding + scores.efficacy) / 4;
		if (avg >= 88) return 'Exemplary Epistemic Rigor';
		if (avg >= 70) return 'Effective Socratic Inquirer';
		if (avg >= 50) return 'Emerging - Mind Tone & Evidence';
		return 'Combative / Unsubstantiated';
	});

	selectOption(option: DialogueOption) {
		if (!this.currentStep) return;

		const currentStepStatement = this.currentStep.speakerStatement;
		const stepId = this.currentStepId ?? 'start';

		this.history.push({
			speakerText: currentStepStatement,
			studentOption: option
		});

		// Sync with WebMCP simulation engine
		simulationEngine.logSocraticTurn({
			stepId,
			optionId: option.id,
			category: option.category,
			text: option.text,
			scores: option.scores,
			teacherResponse: option.teacherResponse,
			feedback: option.feedback
		});
		simulationEngine.updateSocraticCumulativeScores(this.cumulativeScores);

		if (option.nextStepId) {
			this.currentStepId = option.nextStepId;
		} else {
			this.isComplete = true;
			this.currentStepId = null;

			// Check and record competency with WebMCP simulation engine
			const scores = this.cumulativeScores;
			const avg = (scores.posture + scores.probing + scores.grounding + scores.efficacy) / 4;
			if (avg >= 75 && scores.posture >= 70) {
				simulationEngine.socraticVerificationRecord = {
					scenarioId: this.scenario.id,
					studentId: simulationEngine.studentId,
					timestamp: new Date().toISOString(),
					evaluatorSignature: 'WebMCP-Socratic-Proctor-v1',
					cumulativeScores: scores,
					grade: this.overallGrade,
					verdict: 'COMPETENCY_VERIFIED',
					notes: `Validated epistemic autonomy and dialectical composure across ${this.history.length} dialogue steps.`
				};
			}
		}
	}

	loadScenario(newScenario: Scenario, startStepId: string = 'start') {
		this.scenario = newScenario;
		this.currentStepId = startStepId;
		this.history = [];
		this.isComplete = false;
		simulationEngine.resetSocraticSession(newScenario.id);
	}

	reset(startStepId: string = 'start') {
		this.currentStepId = startStepId;
		this.history = [];
		this.isComplete = false;
		simulationEngine.resetSocraticSession(this.scenario.id);
	}
}
