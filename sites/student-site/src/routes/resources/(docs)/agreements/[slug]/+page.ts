import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

// 1. Use the generated PageLoad type for strict typing of 'params'
export const load: PageLoad = async ({ params }) => {
  try {
    // Vite will resolve the dynamic path relative to this file
    const post = await import(`$lib/docs/agreements/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata,
    };
  } catch (e) {
    // 2. Fix the "unknown" type error for the console log
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(`Failed to load markdown: ${errorMessage}`);

    throw error(404, `Resource "${params.slug}" not found.`);
  }
};
