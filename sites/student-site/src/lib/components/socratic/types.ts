export type InquiryCategory =
	| 'clarification'
	| 'probing-assumptions'
	| 'probing-evidence'
	| 'counter-perspectives'
	| 'implications';

export interface SocraticScores {
	posture: number; // Curiosity Posture (0-100)
	probing: number; // Assumption Probing (0-100)
	grounding: number; // Source Grounding in empirical / primary evidence (0-100)
	efficacy: number; // Dialectical Efficacy (0-100)
}

export interface DialogueOption {
	id: string;
	category: InquiryCategory;
	text: string;
	feedback: string;
	scores: SocraticScores;
	teacherResponse: string;
	nextStepId: string | null; // null represents dialogue resolution
}

export interface DialogueStep {
	id: string;
	speakerStatement: string;
	contextNote?: string;
	options: DialogueOption[];
}

export interface Scenario {
	id: string;
	title: string;
	topic: string;
	standardFocus: string;
	initialStatement: string;
	steps: Record<string, DialogueStep>;
}
