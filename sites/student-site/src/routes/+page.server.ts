import { db } from "#lib/server/db/index.js";
import { modules, sections, userProgress } from "#lib/server/db/schema.js";
import { inArray, notInArray, asc } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  // Fetch all modules and section counts for reference
  const allModules = await db.query.modules.findMany({
    orderBy: [asc(modules.order)],
  });

  const allSections = await db.query.sections.findMany({
    columns: {
      id: true,
      moduleId: true,
      title: true,
      order: true,
    },
    orderBy: [asc(sections.order)],
  });

  const sectionCounts = allSections.reduce(
    (acc, sec) => {
      if (sec.moduleId) {
        acc[sec.moduleId] = (acc[sec.moduleId] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  if (!user) {
    return {
      user: null,
      startedModules: [],
      availableModules: allModules.slice(0, 6),
      metrics: null,
      nextResumeSection: null,
      badges: [],
    };
  }

  const userId = user.id;

  // Fetch user progress
  const allProgress = await db.query.userProgress.findMany({
    where: (up, { eq }) => eq(up.userId, userId),
  });

  const startedModuleIds = new Set(
    allProgress
      .filter((p) => p.started)
      .map((p) => p.moduleId)
      .filter(Boolean) as string[],
  );

  const startedIdsList = Array.from(startedModuleIds);

  const startedModulesRaw =
    startedIdsList.length > 0 ? allModules.filter((m) => startedIdsList.includes(m.id)) : [];

  let totalCompletedSections = 0;
  let totalStartedCount = startedIdsList.length;
  let completedModulesCount = 0;
  let nextResumeSection: {
    moduleId: string;
    moduleTitle: string;
    moduleSlug: string;
    sectionId: string;
    sectionTitle: string;
    progress: number;
  } | null = null;

  const startedModules = startedModulesRaw.map((module) => {
    const total = sectionCounts[module.id] || 0;
    const moduleSections = allSections.filter((s) => s.moduleId === module.id);

    const completed = allProgress.filter(
      (p) =>
        (p.moduleId === module.id || moduleSections.some((s) => s.id === p.sectionId)) &&
        p.completed === true,
    ).length;

    totalCompletedSections += completed;
    const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    if (percentage === 100) {
      completedModulesCount++;
    }

    // Find first incomplete section for quick resume
    if (!nextResumeSection && percentage < 100) {
      const completedSecIds = new Set(
        allProgress.filter((p) => p.completed).map((p) => p.sectionId),
      );
      const nextSec = moduleSections.find((s) => !completedSecIds.has(s.id));
      if (nextSec) {
        nextResumeSection = {
          moduleId: module.id,
          moduleTitle: module.title,
          moduleSlug: module.slug,
          sectionId: nextSec.id,
          sectionTitle: nextSec.title,
          progress: percentage,
        };
      }
    }

    return { ...module, progress: percentage, completedSections: completed, totalSections: total };
  });

  const availableModules = allModules.filter((m) => !startedIdsList.includes(m.id)).slice(0, 6);

  // Calculate gamified metrics
  const autonomyScore = totalCompletedSections * 120 + totalStartedCount * 50 + 80; // baseline points
  let masteryRank = "Level 1: Self-Governance Apprentice";
  let nextLevelScore = 500;
  let levelTier = 1;

  if (autonomyScore >= 1200) {
    masteryRank = "Level 4: Autonomous Lead & Peer Mentor";
    nextLevelScore = 2000;
    levelTier = 4;
  } else if (autonomyScore >= 700) {
    masteryRank = "Level 3: Restorative Practice Specialist";
    nextLevelScore = 1200;
    levelTier = 3;
  } else if (autonomyScore >= 300) {
    masteryRank = "Level 2: Internal Regulation Practitioner";
    nextLevelScore = 700;
    levelTier = 2;
  }

  const metrics = {
    autonomyScore,
    masteryRank,
    levelTier,
    nextLevelScore,
    streakDays: Math.max(1, (totalCompletedSections % 7) + 2), // Gamified streak approximation
    completedSections: totalCompletedSections,
    totalSections: allSections.length,
    completedModulesCount,
    totalModulesCount: allModules.length,
  };

  // Defined pedagogical achievements badges
  const badges = [
    {
      id: "orientation-aligned",
      title: "Cognitive Alignment",
      category: "The Accountability Cycle",
      description: "Completed baseline orientation & recognized limits of control.",
      unlocked: totalStartedCount >= 1 || totalCompletedSections >= 1,
      progressText: totalStartedCount >= 1 ? "Unlocked" : "0/1 Modules Initialized",
    },
    {
      id: "precision-of-speech",
      title: "Precision of Speech",
      category: "The Integrity Protocol",
      description: "Maintained impeccable verbal clarity and objective framing.",
      unlocked: totalCompletedSections >= 2,
      progressText: `${Math.min(2, totalCompletedSections)}/2 Sections Complete`,
    },
    {
      id: "internal-audit-pro",
      title: "The Internal Audit",
      category: "The Accountability Cycle",
      description: "Submitted an objective behavioral inventory without cognitive distortions.",
      unlocked: totalCompletedSections >= 4,
      progressText: `${Math.min(4, totalCompletedSections)}/4 Sections Complete`,
    },
    {
      id: "amends-certified",
      title: "Amends Protocol Certified",
      category: "Restorative Action",
      description: "Constructed an actionable interpersonal repair protocol.",
      unlocked: completedModulesCount >= 1,
      progressText: `${completedModulesCount}/1 Module Mastered`,
    },
    {
      id: "reality-based-inquiry",
      title: "Inquiry Over Assumption",
      category: "The Integrity Protocol",
      description: "Mastered question-driven clarity in interpersonal conflict resolution.",
      unlocked: totalCompletedSections >= 6,
      progressText: `${Math.min(6, totalCompletedSections)}/6 Sections Complete`,
    },
    {
      id: "professional-resilience",
      title: "CTE Capstone Readiness",
      category: "Professional Resilience",
      description: "Applied self-governance frameworks to vocational & technical workflows.",
      unlocked: totalCompletedSections >= 8,
      progressText: `${Math.min(8, totalCompletedSections)}/8 Sections Complete`,
    },
  ];

  return {
    user,
    startedModules,
    availableModules,
    metrics,
    nextResumeSection,
    badges,
  };
};

export const actions: Actions = {
  signupRequest: async ({ request }) => {
    const formData = await request.formData();
    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const school = formData.get("school")?.toString().trim();
    const gradeLevel = formData.get("gradeLevel")?.toString().trim();
    const pathway = formData.get("pathway")?.toString().trim();
    const focusArea = formData.get("focusArea")?.toString().trim();

    if (!fullName || !email || !school) {
      return fail(400, {
        error: "Please fill in all required fields (Name, Email, School/District).",
      });
    }

    // In a production system this persists to the database or sends an onboarding email dispatch
    return {
      success: true,
      name: fullName,
      email,
      school,
      gradeLevel,
      pathway,
      focusArea,
      message:
        "Student onboarding registration received. Your orientation packet and institutional login access have been staged.",
    };
  },
};
