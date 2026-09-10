/**
 * Simulation Engine for The Autonomy Protocol & WebMCP
 * State machine modeling the Accountability Cycle & Integrity Protocol.
 * Exposes observable environment controls and registers WebMCP tools for autonomous evaluator agents.
 */

import { webMcpClient } from './client';
import type {
	AccountabilityCyclePhase,
	CognitiveLiability,
	CompetencyVerificationRecord,
	EnvironmentalFrictionEvent,
	TelemetryLogEntry,
	SocraticTelemetryScores,
	SocraticTurnTelemetry,
	SocraticCompetencyRecord
} from './types';

export class AutonomySimulationEngine {
	// Svelte 5 runes for reactive state
	public currentPhase = $state<AccountabilityCyclePhase>('ORIENTATION');
	public moduleId = $state<string>('mod-cte-exec-01');
	public moduleTitle = $state<string>('CTE Capstone: Executive Functioning & Professional Crisis Resolution');
	public studentId = $state<string>('student-alpha-77');

	// Socratic Inquiry & Epistemic Autonomy State
	public activeSocraticScenarioId = $state<string>('fed-papers-01');
	public socraticSessionHistory = $state<SocraticTurnTelemetry[]>([]);
	public socraticCumulativeScores = $state<SocraticTelemetryScores>({
		posture: 0,
		probing: 0,
		grounding: 0,
		efficacy: 0
	});
	public socraticVerificationRecord = $state<SocraticCompetencyRecord | null>(null);

	// State machine state
	public objectiveStandardSelected = $state<string>('Universal Principles of Engineering Integrity');
	public limitsOfControlAcknowledged = $state<boolean>(false);
	public cognitiveAlignmentCommitted = $state<boolean>(false);

	// Cognitive liabilities inventory (Internal Audit)
	public liabilities = $state<CognitiveLiability[]>([
		{
			id: 'liab-1',
			label: 'Externalized Blame: Attributing missed sprint deadline entirely to client communication delays',
			distortionType: 'EXTERNALIZED_BLAME',
			detected: true,
			remediated: false,
			studentRefactoring: ''
		},
		{
			id: 'liab-2',
			label: 'Catastrophizing: Presuming single system outage invalidates enterprise reliability SLA',
			distortionType: 'CATASTROPHIZING',
			detected: true,
			remediated: false,
			studentRefactoring: ''
		},
		{
			id: 'liab-3',
			label: 'Assumptive Projection: Believing technical lead intentionally excluded junior engineer from deployment',
			distortionType: 'ASSUMPTIVE_PROJECTION',
			detected: true,
			remediated: false,
			studentRefactoring: ''
		}
	]);

	// Interpersonal Restorative Practice (Amends Protocol)
	public amendsPlan = $state({
		impactedStakeholder: 'Senior Systems Architect & Client Operations',
		identifiedHarm: 'Delayed deployment window without pro-active status telemetry',
		restorativeAction: '',
		protocolStatus: 'PENDING_SUBMISSION' as 'PENDING_SUBMISSION' | 'SUBMITTED' | 'VERIFIED_BY_AGENT'
	});

	// Active environmental friction events
	public frictionEvents = $state<EnvironmentalFrictionEvent[]>([
		{
			id: 'fric-101',
			timestamp: Date.now(),
			source: 'Stakeholder Escalation',
			scenario: 'Client product owner requests urgent status update with terse, accusatory tone.',
			requiredTenet: 'EMOTIONAL_NEUTRALITY',
			resolved: false
		}
	]);

	// Telemetry stream
	public telemetryLogs = $state<TelemetryLogEntry[]>([]);

	// Competency verification record
	public verificationRecord = $state<CompetencyVerificationRecord | null>(null);

	// WebMCP tool registration status
	public registeredToolsCount = $state<number>(0);

	constructor() {
		this.addTelemetry('SYSTEM', 'Simulation Engine initialized for The Autonomy Protocol', undefined, undefined, 'SUCCESS');
	}

	/**
	 * Registers all WebMCP tools with the client manager
	 */
	public async registerWebMcpTools(): Promise<void> {
		// Tool 1: get_student_competency_profile
		await webMcpClient.registerTool({
			name: 'get_student_competency_profile',
			description: 'Retrieves current student competency metrics, state machine stage, and completion telemetry.',
			inputSchema: {
				type: 'object',
				properties: {
					moduleId: { type: 'string', description: 'The identifier of the course module' }
				},
				required: ['moduleId']
			},
			annotations: {
				readOnlyHint: true,
				untrustedContentHint: false,
				consequentialHint: false
			},
			execute: async ({ moduleId }) => {
				this.addTelemetry('EVALUATOR_AGENT', 'Invoked get_student_competency_profile', 'get_student_competency_profile', { moduleId }, 'SUCCESS');
				return {
					moduleId: this.moduleId,
					studentId: this.studentId,
					currentPhase: this.currentPhase,
					remediatedLiabilitiesCount: this.liabilities.filter((l) => l.remediated).length,
					totalLiabilitiesCount: this.liabilities.length,
					amendsProtocolStatus: this.amendsPlan.protocolStatus,
					activeFrictionCount: this.frictionEvents.filter((f) => !f.resolved).length,
					isVerified: Boolean(this.verificationRecord)
				};
			}
		});

		// Tool 2: inspect_state_machine
		await webMcpClient.registerTool({
			name: 'inspect_state_machine',
			description: 'Inspects current node of the Accountability Cycle state machine, active liabilities, and parameters.',
			inputSchema: {
				type: 'object',
				properties: {}
			},
			annotations: {
				readOnlyHint: true
			},
			execute: async () => {
				this.addTelemetry('EVALUATOR_AGENT', 'Invoked inspect_state_machine', 'inspect_state_machine', {}, 'SUCCESS');
				return {
					phase: this.currentPhase,
					orientation: {
						limitsOfControlAcknowledged: this.limitsOfControlAcknowledged,
						cognitiveAlignmentCommitted: this.cognitiveAlignmentCommitted,
						objectiveStandard: this.objectiveStandardSelected
					},
					liabilities: this.liabilities,
					amendsPlan: this.amendsPlan,
					frictionQueue: this.frictionEvents
				};
			}
		});

		// Tool 3: inject_environmental_friction
		await webMcpClient.registerTool({
			name: 'inject_environmental_friction',
			description: 'Injects an objective environmental friction event to test student emotional neutrality and inquiry-based reality.',
			inputSchema: {
				type: 'object',
				properties: {
					scenario: { type: 'string', description: 'Description of the professional conflict or crisis scenario' },
					requiredTenet: {
						type: 'string',
						enum: ['PRECISION_OF_SPEECH', 'EMOTIONAL_NEUTRALITY', 'INQUIRY_BASED_REALITY', 'BASELINE_FLUCTUATION'],
						description: 'The Integrity Protocol tenet required to de-escalate'
					}
				},
				required: ['scenario', 'requiredTenet']
			},
			annotations: {
				readOnlyHint: false,
				consequentialHint: false
			},
			execute: async ({ scenario, requiredTenet }) => {
				const newEvent: EnvironmentalFrictionEvent = {
					id: `fric-${Date.now().toString().slice(-4)}`,
					timestamp: Date.now(),
					source: 'Autonomous Evaluator Agent',
					scenario,
					requiredTenet,
					resolved: false
				};
				this.frictionEvents.push(newEvent);
				this.addTelemetry('EVALUATOR_AGENT', `Injected environmental friction: "${scenario}"`, 'inject_environmental_friction', { scenario, requiredTenet }, 'WARNING');
				return { status: 'INJECTED', eventId: newEvent.id };
			}
		});

		// Tool 4: audit_cognitive_alignment
		await webMcpClient.registerTool({
			name: 'audit_cognitive_alignment',
			description: 'Audits a student refactoring against approved cognitive distortion rubrics and marks liability remediated if valid.',
			inputSchema: {
				type: 'object',
				properties: {
					liabilityId: { type: 'string', description: 'ID of the cognitive liability under audit' },
					verdict: { type: 'string', enum: ['ALIGNED', 'MISALIGNED'], description: 'Audit verdict' },
					feedbackNotes: { type: 'string', description: 'Objective pedagogical evaluation notes' }
				},
				required: ['liabilityId', 'verdict', 'feedbackNotes']
			},
			annotations: {
				readOnlyHint: false,
				consequentialHint: false
			},
			execute: async ({ liabilityId, verdict, feedbackNotes }) => {
				const liability = this.liabilities.find((l) => l.id === liabilityId);
				if (!liability) {
					this.addTelemetry('EVALUATOR_AGENT', `Audit failed: liability ${liabilityId} not found`, 'audit_cognitive_alignment', { liabilityId }, 'ERROR');
					return { error: 'Liability not found' };
				}

				if (verdict === 'ALIGNED') {
					liability.remediated = true;
				}

				this.addTelemetry('EVALUATOR_AGENT', `Audited liability "${liability.id}": verdict=${verdict}. Notes: ${feedbackNotes}`, 'audit_cognitive_alignment', { liabilityId, verdict, feedbackNotes }, verdict === 'ALIGNED' ? 'SUCCESS' : 'WARNING');

				// Check if all liabilities are remediated to advance state machine
				if (this.currentPhase === 'INTERNAL_AUDIT' && this.liabilities.every((l) => l.remediated)) {
					this.currentPhase = 'RESTORATIVE_PRACTICE';
					this.addTelemetry('SYSTEM', 'State Machine Transition: INTERNAL_AUDIT -> RESTORATIVE_PRACTICE', undefined, undefined, 'SUCCESS');
				}

				return { liabilityId, remediated: liability.remediated, notes: feedbackNotes };
			}
		});

		// Tool 5: verify_amends_protocol
		await webMcpClient.registerTool({
			name: 'verify_amends_protocol',
			description: 'Validates that student proposed restorative actions constitute observable behavioral repair rather than subjective apologies.',
			inputSchema: {
				type: 'object',
				properties: {
					isActionBased: { type: 'boolean', description: 'True if proposal focuses on concrete corrective action' },
					repairScopeVerified: { type: 'boolean', description: 'True if interpersonal impact scope is accurately mapped' },
					evaluatorNotes: { type: 'string', description: 'Evaluator assessment comments' }
				},
				required: ['isActionBased', 'repairScopeVerified', 'evaluatorNotes']
			},
			annotations: {
				readOnlyHint: false,
				consequentialHint: true
			},
			execute: async ({ isActionBased, repairScopeVerified, evaluatorNotes }) => {
				if (isActionBased && repairScopeVerified) {
					this.amendsPlan.protocolStatus = 'VERIFIED_BY_AGENT';
					if (this.currentPhase === 'RESTORATIVE_PRACTICE') {
						this.currentPhase = 'MAINTENANCE_LEADERSHIP';
						this.addTelemetry('SYSTEM', 'State Machine Transition: RESTORATIVE_PRACTICE -> MAINTENANCE_LEADERSHIP', undefined, undefined, 'SUCCESS');
					}
					this.addTelemetry('EVALUATOR_AGENT', `Amends Protocol Verified. Evaluator Notes: ${evaluatorNotes}`, 'verify_amends_protocol', { isActionBased, repairScopeVerified }, 'SUCCESS');
					return { status: 'VERIFIED', currentPhase: this.currentPhase };
				} else {
					this.addTelemetry('EVALUATOR_AGENT', `Amends Protocol Rejected: Requires actionable restitution. Notes: ${evaluatorNotes}`, 'verify_amends_protocol', { isActionBased, repairScopeVerified }, 'WARNING');
					return { status: 'REVISION_REQUIRED', notes: evaluatorNotes };
				}
			}
		});

		// Tool 6: record_proof_of_competency
		await webMcpClient.registerTool({
			name: 'record_proof_of_competency',
			description: 'Issues an automated, verifiable proof of competency record for student executive functioning mastery.',
			inputSchema: {
				type: 'object',
				properties: {
					integrityCalibrationScore: { type: 'number', description: 'Score out of 100 on the 4 Integrity tenets' },
					observableBehaviorScore: { type: 'number', description: 'Score out of 100 on Accountability Cycle state execution' },
					evaluatorSignature: { type: 'string', description: 'Identifier of evaluating proctor agent' },
					notes: { type: 'string', description: 'Final collegiate competency summary' }
				},
				required: ['integrityCalibrationScore', 'observableBehaviorScore', 'evaluatorSignature', 'notes']
			},
			annotations: {
				readOnlyHint: false,
				consequentialHint: true
			},
			execute: async ({ integrityCalibrationScore, observableBehaviorScore, evaluatorSignature, notes }) => {
				const record: CompetencyVerificationRecord = {
					moduleId: this.moduleId,
					studentId: this.studentId,
					verifiedAt: new Date().toISOString(),
					evaluatorSignature,
					cyclePhaseCompleted: this.currentPhase,
					integrityCalibrationScore,
					observableBehaviorScore,
					verdict: (integrityCalibrationScore >= 75 && observableBehaviorScore >= 75) ? 'COMPETENCY_VERIFIED' : 'ALIGNMENT_REQUIRED',
					notes
				};

				this.verificationRecord = record;
				this.addTelemetry('EVALUATOR_AGENT', `Proof of Competency Recorded. Verdict: ${record.verdict}. Scores: [Integrity: ${integrityCalibrationScore}%, Behavior: ${observableBehaviorScore}%]`, 'record_proof_of_competency', record, record.verdict === 'COMPETENCY_VERIFIED' ? 'SUCCESS' : 'WARNING');

				return {
					status: 'RECORDED',
					record
				};
			}
		});

		// Tool 7: audit_socratic_inquiry
		await webMcpClient.registerTool({
			name: 'audit_socratic_inquiry',
			description: 'Audits a student inquiry turn across the 4 Socratic dimensions: Curiosity Posture, Assumption Probing, Source Grounding, and Dialectical Efficacy.',
			inputSchema: {
				type: 'object',
				properties: {
					scenarioId: { type: 'string', description: 'Identifier of the historical or analytical scenario' },
					category: {
						type: 'string',
						enum: ['clarification', 'probing-assumptions', 'probing-evidence', 'counter-perspectives', 'implications'],
						description: 'The Socratic inquiry category utilized'
					},
					scores: {
						type: 'object',
						properties: {
							posture: { type: 'number', description: 'Curiosity Posture (0-100)' },
							probing: { type: 'number', description: 'Assumption Probing (0-100)' },
							grounding: { type: 'number', description: 'Source Grounding in primary evidence (0-100)' },
							efficacy: { type: 'number', description: 'Dialectical Efficacy (0-100)' }
						},
						required: ['posture', 'probing', 'grounding', 'efficacy']
					},
					evaluatorNotes: { type: 'string', description: 'Pedagogical feedback on dialectical rigor' }
				},
				required: ['scenarioId', 'category', 'scores', 'evaluatorNotes']
			},
			annotations: {
				readOnlyHint: false,
				consequentialHint: false
			},
			execute: async ({ scenarioId, category, scores, evaluatorNotes }) => {
				const avg = (scores.posture + scores.probing + scores.grounding + scores.efficacy) / 4;
				const isAligned = avg >= 70 && scores.posture >= 60;
				this.addTelemetry(
					'EVALUATOR_AGENT',
					`Audited Socratic Turn [${category}]: Avg=${avg.toFixed(1)}%. Verdict=${isAligned ? 'ALIGNED' : 'REVISION_NEEDED'}. Notes: ${evaluatorNotes}`,
					'audit_socratic_inquiry',
					{ scenarioId, category, scores },
					isAligned ? 'SUCCESS' : 'WARNING'
				);
				return {
					status: isAligned ? 'EPISTEMIC_ALIGNMENT_CONFIRMED' : 'REFINEMENT_REQUIRED',
					scores,
					evaluatorNotes
				};
			}
		});

		// Tool 8: inspect_socratic_session
		await webMcpClient.registerTool({
			name: 'inspect_socratic_session',
			description: 'Inspects the active Socratic scenario, turn history, telemetry scores, and verification record.',
			inputSchema: {
				type: 'object',
				properties: {}
			},
			annotations: {
				readOnlyHint: true
			},
			execute: async () => {
				this.addTelemetry(
					'EVALUATOR_AGENT',
					'Invoked inspect_socratic_session',
					'inspect_socratic_session',
					{},
					'SUCCESS'
				);
				return {
					scenarioId: this.activeSocraticScenarioId,
					turnCount: this.socraticSessionHistory.length,
					history: this.socraticSessionHistory,
					cumulativeScores: this.socraticCumulativeScores,
					verificationRecord: this.socraticVerificationRecord
				};
			}
		});

		// Tool 9: record_socratic_proof_of_competency
		await webMcpClient.registerTool({
			name: 'record_socratic_proof_of_competency',
			description: 'Issues an automated, verifiable proof of competency record for student mastery in Epistemic Autonomy and Socratic Inquiry.',
			inputSchema: {
				type: 'object',
				properties: {
					scenarioId: { type: 'string', description: 'Scenario ID completed' },
					scores: {
						type: 'object',
						properties: {
							posture: { type: 'number' },
							probing: { type: 'number' },
							grounding: { type: 'number' },
							efficacy: { type: 'number' }
						},
						required: ['posture', 'probing', 'grounding', 'efficacy']
					},
					evaluatorSignature: { type: 'string', description: 'Identifier of evaluating proctor agent' },
					notes: { type: 'string', description: 'Final collegiate competency summary' }
				},
				required: ['scenarioId', 'scores', 'evaluatorSignature', 'notes']
			},
			annotations: {
				readOnlyHint: false,
				consequentialHint: true
			},
			execute: async ({ scenarioId, scores, evaluatorSignature, notes }) => {
				const avg = (scores.posture + scores.probing + scores.grounding + scores.efficacy) / 4;
				let grade = 'Combative / Unsubstantiated';
				if (avg >= 88) grade = 'Exemplary Epistemic Rigor';
				else if (avg >= 70) grade = 'Effective Socratic Inquirer';
				else if (avg >= 50) grade = 'Emerging - Mind Tone & Evidence';

				const record: SocraticCompetencyRecord = {
					scenarioId,
					studentId: this.studentId,
					timestamp: new Date().toISOString(),
					evaluatorSignature,
					cumulativeScores: scores,
					grade,
					verdict: avg >= 75 && scores.posture >= 70 ? 'COMPETENCY_VERIFIED' : 'ALIGNMENT_REQUIRED',
					notes
				};

				this.socraticVerificationRecord = record;
				this.addTelemetry(
					'EVALUATOR_AGENT',
					`Socratic Proof of Competency Recorded. Rating: ${grade} (${avg.toFixed(1)}%). Verdict: ${record.verdict}`,
					'record_socratic_proof_of_competency',
					record,
					record.verdict === 'COMPETENCY_VERIFIED' ? 'SUCCESS' : 'WARNING'
				);

				return {
					status: 'RECORDED',
					record
				};
			}
		});

		const tools = await webMcpClient.listRegisteredTools();
		this.registeredToolsCount = tools.length;
		this.addTelemetry('SYSTEM', `Registered ${tools.length} WebMCP tools into modelContext`, undefined, undefined, 'SUCCESS');
	}

	/**
	 * Socratic session synchronization methods
	 */
	public logSocraticTurn(turn: SocraticTurnTelemetry): void {
		this.socraticSessionHistory.push(turn);
		this.addTelemetry(
			'STUDENT_WORKBENCH',
			`Socratic turn [${turn.category}]: "${turn.text.slice(0, 60)}..." (Posture: ${turn.scores.posture}%, Grounding: ${turn.scores.grounding}%)`,
			'audit_socratic_inquiry',
			turn,
			turn.scores.posture >= 60 ? 'SUCCESS' : 'WARNING'
		);
	}

	public updateSocraticCumulativeScores(scores: SocraticTelemetryScores): void {
		this.socraticCumulativeScores = scores;
	}

	public resetSocraticSession(scenarioId: string = 'fed-papers-01'): void {
		this.activeSocraticScenarioId = scenarioId;
		this.socraticSessionHistory = [];
		this.socraticCumulativeScores = { posture: 0, probing: 0, grounding: 0, efficacy: 0 };
		this.socraticVerificationRecord = null;
		this.addTelemetry('SYSTEM', `Socratic Inquiry session reset for scenario: ${scenarioId}`, undefined, undefined, 'SUCCESS');
	}

	/**
	 * Student actions on the workbench
	 */
	public completeOrientation(standard: string): void {
		this.objectiveStandardSelected = standard;
		this.limitsOfControlAcknowledged = true;
		this.cognitiveAlignmentCommitted = true;
		this.currentPhase = 'INTERNAL_AUDIT';
		this.addTelemetry('STUDENT_WORKBENCH', `Completed Orientation: Sourced standard "${standard}". Advanced to INTERNAL_AUDIT.`, undefined, undefined, 'SUCCESS');
	}

	public submitLiabilityRefactoring(liabilityId: string, refactoredText: string): void {
		const liab = this.liabilities.find((l) => l.id === liabilityId);
		if (liab) {
			liab.studentRefactoring = refactoredText;
			this.addTelemetry('STUDENT_WORKBENCH', `Submitted refactoring for "${liab.id}": "${refactoredText}". Ready for agent audit.`, undefined, undefined, 'SUCCESS');
		}
	}

	public submitAmendsProposal(restorativeAction: string): void {
		this.amendsPlan.restorativeAction = restorativeAction;
		this.amendsPlan.protocolStatus = 'SUBMITTED';
		this.addTelemetry('STUDENT_WORKBENCH', `Submitted Amends Protocol proposal: "${restorativeAction}". Awaiting agent verification.`, undefined, undefined, 'SUCCESS');
	}

	public resolveFrictionEvent(eventId: string, studentResponse: string): void {
		const event = this.frictionEvents.find((f) => f.id === eventId);
		if (event) {
			event.resolved = true;
			this.addTelemetry('STUDENT_WORKBENCH', `Resolved friction event ${eventId} with response: "${studentResponse}"`, undefined, undefined, 'SUCCESS');
		}
	}

	public resetSimulation(): void {
		this.currentPhase = 'ORIENTATION';
		this.limitsOfControlAcknowledged = false;
		this.cognitiveAlignmentCommitted = false;
		this.liabilities.forEach((l) => {
			l.remediated = false;
			l.studentRefactoring = '';
		});
		this.amendsPlan = {
			impactedStakeholder: 'Senior Systems Architect & Client Operations',
			identifiedHarm: 'Delayed deployment window without pro-active status telemetry',
			restorativeAction: '',
			protocolStatus: 'PENDING_SUBMISSION'
		};
		this.frictionEvents = [
			{
				id: 'fric-101',
				timestamp: Date.now(),
				source: 'Stakeholder Escalation',
				scenario: 'Client product owner requests urgent status update with terse, accusatory tone.',
				requiredTenet: 'EMOTIONAL_NEUTRALITY',
				resolved: false
			}
		];
		this.verificationRecord = null;
		this.addTelemetry('SYSTEM', 'Simulation reset to baseline ORIENTATION state', undefined, undefined, 'SUCCESS');
	}

	private addTelemetry(
		caller: 'EVALUATOR_AGENT' | 'STUDENT_WORKBENCH' | 'SYSTEM',
		action: string,
		toolName?: string,
		payload?: any,
		status: 'SUCCESS' | 'WARNING' | 'ERROR' = 'SUCCESS'
	): void {
		const entry: TelemetryLogEntry = {
			id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
			timestamp: new Date().toLocaleTimeString(),
			caller,
			action,
			toolName,
			payload,
			status
		};
		this.telemetryLogs.unshift(entry);
		if (this.telemetryLogs.length > 50) {
			this.telemetryLogs.pop();
		}
	}
}

export const simulationEngine = new AutonomySimulationEngine();
