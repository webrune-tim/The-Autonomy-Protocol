// sites/teacher-site/src/routes/quizzes/[slug]/+page.server.ts
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { supabase } from "@autonomy/db"; // Use your shared package

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  // Fetch the quiz from the 'quizzes' table where the slug matches
  const { data: quiz, error: dbError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (dbError || !quiz) {
    console.error("Database Error:", dbError?.message);
    throw error(404, { 
      message: "Curriculum module not found in the repository." 
    });
  }

  return {
    quiz,
  };
};