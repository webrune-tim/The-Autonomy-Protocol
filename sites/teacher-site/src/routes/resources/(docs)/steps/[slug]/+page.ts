import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

const modules = import.meta.glob<{ default: any; metadata: Record<string, any> }>(
  "/src/lib/docs/steps/*.md",
);

export const load: PageLoad = async ({ params }) => {
  const loader = modules[`/src/lib/docs/steps/${params.slug}.md`];

  if (!loader) {
    throw error(404, `Resource "${params.slug}" not found.`);
  }

  try {
    const post = await loader();

    return {
      content: post.default,
      meta: post.metadata,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(`Failed to load markdown: ${errorMessage}`);

    throw error(404, `Resource "${params.slug}" not found.`);
  }
};
