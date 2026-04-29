import type { Actions } from "./$types";
import { supabase } from '@autonomy/db'; // Your shared client
import { fail } from "@sveltejs/kit";

export const actions = {
  createQuiz: async ({ request }) => {
    const data = await request.json();

    // 1. Validation Logic
    if (!data.markdown || !data.title) {
      return fail(400, { message: "Missing required quiz content." });
    }

    console.log(`--- Creating Quiz: ${data.title} ---`);

    // 2. Database Logic
    // We use the imported supabase client to write to your table
    const { error } = await supabase
      .from('quizzes') 
      .insert({
        title: data.title,
        content: data.markdown,
        questions: data.questions, // Assumes this is a JSONB column
        created_by: 'teacher_id_here' // Ideally from locals.session
      });

    if (error) {
      console.error("Supabase Error:", error.message);
      return fail(500, { message: "Failed to save quiz to database." });
    }

    return { success: true };
  },
} satisfies Actions;