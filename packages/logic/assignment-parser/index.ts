import { unified } from "unified";
import remarkParse from "remark-parse";
import { toString } from "mdast-util-to-string";

export interface Question {
  id: number;
  text: string;
  options: string[];
  type: "multiple-choice" | "open-response";
  goal: string | null;
}

export interface Quiz {
  title: string;
  questions: Question[];
}

export function parseQuiz(markdown: string): Quiz {
  const tree = unified().use(remarkParse).parse(markdown);
  const quiz: Quiz = { title: "The Autonomy Protocol", questions: [] };
  let currentQuestion: Question | null = null;

  tree.children.forEach((node) => {
    // 1. Capture Title (# Quiz: ...)
    if (node.type === "heading" && node.depth === 1) {
      quiz.title = toString(node).replace("Quiz: ", "").trim();
    }

    // 2. Capture Questions (List Items)
    if (node.type === "list") {
      node.children.forEach((listItem) => {
        const textNode = listItem.children[0];
        const text = toString(textNode).trim();

        const subList = listItem.children.find((c) => c.type === "list");
        const options = subList
          ? subList.children.map((opt) =>
              toString(opt)
                .replace(/^\[\s\]\s/, "")
                .trim(),
            )
          : [];

        currentQuestion = {
          id: quiz.questions.length,
          text,
          options,
          type: options.length > 0 ? "multiple-choice" : "open-response",
          goal: null,
        };
        quiz.questions.push(currentQuestion);
      });
    }

    // 3. Capture Open Response (Blockquotes)
    if (node.type === "blockquote") {
      const text = toString(node).trim();
      if (text.length > 0) {
        currentQuestion = {
          id: quiz.questions.length,
          text,
          options: [],
          type: "open-response",
          goal: "Self-reflection",
        };
        quiz.questions.push(currentQuestion);
      }
    }

    // 4. Capture Metadata (HTML Comments)
    // We use new RegExp here to prevent OXC from misinterpreting // as a comment
    if (node.type === "html" && currentQuestion) {
      const cleanRegex = new RegExp("", "g");
      const comment = toString(node).replace(cleanRegex, "").trim();
      currentQuestion.goal = comment;
    }
  });

  return quiz;
}
