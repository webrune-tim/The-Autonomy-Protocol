export interface QuizQuestion {
  id: number;
  text: string;
  type: "multiple-choice" | "open-response";
  options?: string[];
  correctAnswer?: number;
  goal?: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export function parseQuiz(markdown: string): QuizData {
  const lines = markdown.split("\n");
  let title = "The Integrity Protocol";
  const questions: QuizQuestion[] = [];

  let currentQuestion: QuizQuestion | null = null;
  let questionCounter = 0;

  const titleMatch = markdown.match(/^# Quiz:\s*(.*)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Match question: 1. Text
    const questionMatch = line.match(/^(\d+)\.\s*(.*)$/);
    if (questionMatch) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        id: questionCounter++,
        text: questionMatch[2].trim(),
        type: "open-response",
        options: [],
        goal: "",
      };
      continue;
    }

    // Match option: - [ ] Text
    const optionMatch = line.match(/^- \[ \]\s*(.*)$/);
    if (optionMatch && currentQuestion) {
      currentQuestion.type = "multiple-choice";
      currentQuestion.options?.push(optionMatch[1].trim());
      continue;
    }

    // Match answer/goal: <!-- B (Goal: ...) -->
    const answerMatch = line.match(/<!--\s*([A-D])\s*(?:\(Goal:\s*(.*)\))?\s*-->/);
    if (answerMatch && currentQuestion) {
      const letter = answerMatch[1];
      const goal = answerMatch[2];
      currentQuestion.correctAnswer = letter.charCodeAt(0) - "A".charCodeAt(0);
      if (goal) {
        currentQuestion.goal = goal.trim();
      }
      continue;
    }

    // If it's not a question, option, or answer, and we have a current question,
    // it might be additional text for the question (especially for open response)
    if (currentQuestion && !line.startsWith("#") && !line.startsWith(">")) {
      // If it's just text after a question and before options, append to question text
      if (currentQuestion.options?.length === 0 && currentQuestion.type === "open-response") {
        // Avoid appending if it's just the quote marks for open response
        if (!line.startsWith(">")) {
          // currentQuestion.text += ' ' + line; // Usually questions are one line in this format
        }
      }
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return { title, questions };
}
