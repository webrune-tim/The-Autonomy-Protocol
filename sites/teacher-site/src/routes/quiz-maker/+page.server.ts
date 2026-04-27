import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions = {
  createQuiz: async ({ request }) => {
    const data = await request.json();

    // Log the incoming Integrity Protocol data to the terminal
    console.log("--- New Quiz Received ---");
    console.log("Title:", data.title);
    console.log("Questions Count:", data.questions?.length);

    // Logic check: Ensure we have data
    if (!data.markdown) {
      return fail(400, { message: "No curriculum content found." });
    }

    // TODO: This is where you would write to Supabase or the Filesystem

    return { success: true };
  },
} satisfies Actions;
