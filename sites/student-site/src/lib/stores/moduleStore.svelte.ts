// src/lib/moduleStore.svelte.ts

export const moduleState = $state({
  "module-1": {
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
  },
  "module-2": {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
    step10: false,
    step11: false,
    step12: false,
  },
  "module-3": {
    agreement1: false,
    agreement2: false,
    agreement3: false,
    agreement4: false,
    agreement5: false,
  },
  "module-4": {
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
    task6: false,
    task7: false,
    task8: false,
    task9: false,
    task10: false,
  },
  "module-5": {
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
    task6: false,
    task7: false,
    task8: false,
    task9: false,
    task10: false,
  },
});

// Extract the valid keys from the state object
export type ModuleId = keyof typeof moduleState;

/**
 * Returns statistics for a specific module
 */
export function getModuleStats(moduleId: ModuleId) {
  const mod = moduleState[moduleId];
  if (!mod) return { completed: 0, total: 0, percent: 0 };

  const steps = Object.values(mod);
  const total = steps.length;
  const completed = steps.filter((isComplete) => isComplete === true).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent };
}

// Keep the old helper for backward compatibility if needed, or just use getModuleStats
export function getModuleProgress(moduleId: ModuleId) {
  return getModuleStats(moduleId).percent;
}
