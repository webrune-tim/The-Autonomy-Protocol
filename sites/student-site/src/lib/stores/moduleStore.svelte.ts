// src/lib/stores/moduleStore.svelte.ts
import { browser } from "$app/environment";

// Persistent State using Svelte 5 runes
const STORAGE_KEY = "tap_module_progress";

function loadInitialState(): Record<string, Record<string, boolean>> {
  if (!browser) return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Failed to load module progress:", e);
    return {};
  }
}

export const moduleState = $state<Record<string, Record<string, boolean>>>(loadInitialState());

/**
 * Persist state to localStorage on every change
 */
if (browser) {
  $effect.root(() => {
    $effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moduleState));
    });
  });
}

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
 * Ensures a module and its sections exist in the store without overwriting progress
 */
export function initModuleState(moduleId: string, sectionIds: string[]) {
  if (!moduleState[moduleId]) {
    moduleState[moduleId] = {};
  }

  sectionIds.forEach((id) => {
    if (moduleState[moduleId][id] === undefined) {
      moduleState[moduleId][id] = false;
    }
  });
}

/**
 * Updates a single section's state
 */
export function toggleSection(moduleId: string, sectionId: string, completed: boolean) {
  if (!moduleState[moduleId]) {
    moduleState[moduleId] = {};
  }
  moduleState[moduleId][sectionId] = completed;
}

export function getModuleProgress(moduleId: string) {
  return getModuleStats(moduleId).percent;
}
