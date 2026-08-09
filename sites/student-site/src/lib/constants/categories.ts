export interface ModuleCategory {
  id: string;
  label: string;
  systemTitle: string;
  framework: string;
  description: string;
}

export const MODULE_CATEGORIES: readonly ModuleCategory[] = [
  {
    id: "step",
    label: "Step Modules",
    systemTitle: "The Accountability Cycle",
    framework: "Internal Regulation",
    description: "Foundational internal regulation, cognitive alignment, and restorative action.",
  },
  {
    id: "agreement",
    label: "Agreement Modules",
    systemTitle: "The Integrity Protocol",
    framework: "Interpersonal Dynamics",
    description:
      "Core interpersonal mechanics, precision of speech, emotional neutrality, and reality-based inquiry.",
  },
  {
    id: "review",
    label: "Review & Practicums",
    systemTitle: "Synthesis & Calibration",
    framework: "Behavioral Audits",
    description:
      "Applied friction mapping, real-time recalibration, and comprehensive behavioral assessments.",
  },
  {
    id: "capstone",
    label: "Capstone Pathways",
    systemTitle: "Applied Specialization",
    framework: "Professional Resilience",
    description:
      "Industry-specific executive functioning pathways for technical and collegiate transitions.",
  },
  {
    id: "foundation",
    label: "Foundations",
    systemTitle: "Core Protocol Onboarding",
    framework: "Psychological Literacy",
    description:
      "Introductory principles establishing baseline self-governance and personal agency.",
  },
] as const;

export const DEFAULT_CATEGORY = "step";

export function getCategoryById(id: string): ModuleCategory {
  const found = MODULE_CATEGORIES.find((c) => c.id === id);
  if (found) return found;
  return {
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1) + " Modules",
    systemTitle: id.charAt(0).toUpperCase() + id.slice(1),
    framework: "General Curriculum",
    description: "Curriculum modules for The Autonomy Protocol.",
  };
}
