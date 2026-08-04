import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true,
});

export function parseMarkdown(content: string): string {
  if (!content) return "";
  return marked.parse(content, { async: false }) as string;
}
