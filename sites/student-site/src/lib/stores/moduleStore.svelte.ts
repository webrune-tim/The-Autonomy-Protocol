// src/lib/stores/moduleStore.svelte.ts
import { browser } from "$app/environment";

// Persistent State using Svelte 5 runes
export const moduleState = $state<Record<string, Record<string, boolean>>>({});

/**
 * Returns statistics for a specific module
 */
export function getModuleStats(moduleId: string) {
  const mod = moduleState[moduleId];
  if (!mod) return { completed: 0, total: 0, percent: 0 };

  const steps = Object.values(mod);
  const total = steps.length;
  const completed = steps.filter((isComplete) => isComplete === true).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent };
}

/**
 * Ensures a module and its sections exist in the store without overwriting progress.
 * Optionally hydrates with initial progress from the database.
 */
export function initModuleState(
  moduleId: string,
  sectionIds: string[],
  initialProgress: { sectionId: string; completed: boolean }[] = [],
) {
  if (!moduleState[moduleId]) {
    moduleState[moduleId] = {};
  }

  sectionIds.forEach((id) => {
    if (moduleState[moduleId][id] === undefined) {
      moduleState[moduleId][id] = false;
    }
  });

  initialProgress.forEach((p) => {
    moduleState[moduleId][p.sectionId] = p.completed;
  });
}

/**
 * Updates a single section's state and persists to server
 */
export async function toggleSection(moduleId: string, sectionId: string, completed: boolean) {
  // Optimistic update
  if (!moduleState[moduleId]) {
    moduleState[moduleId] = {};
  }
  const previousValue = moduleState[moduleId][sectionId];
  moduleState[moduleId][sectionId] = completed;

  if (browser) {
    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("completed", String(completed));

      const response = await fetch("?/toggleSection", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to sync with server");
      }
    } catch (e) {
      console.error("Failed to sync module progress:", e);
      // Rollback on failure
      moduleState[moduleId][sectionId] = previousValue;
    }
  }
}

export function getModuleProgress(moduleId: string) {
  return getModuleStats(moduleId).percent;
}
