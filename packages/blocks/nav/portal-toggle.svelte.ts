// packages/blocks/nav/portal-toggle.svelte.ts
import { browser } from "$app/environment";

const getBaseUrls = () => {
  let teacher = "http://localhost:8080";
  let student = "http://localhost:5173";

  if (browser) {
    const hostname = window.location.hostname;
    const port = window.location.port;

    if (hostname.includes("github.dev")) {
      const codespaceId = hostname.replace(/-(5173|8080)\.app\.github\.dev$/, "");
      teacher = `https://${codespaceId}-8080.app.github.dev`;
      student = `https://${codespaceId}-5173.app.github.dev`;
    } else if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
      teacher = "http://localhost:8080";
      student = "http://localhost:5173";
    } else {
      teacher = "https://the-autonomy-protocol.vercel.app";
      student = "https://the-autonomy-protocol-student.vercel.app";
    }
  }

  return { teacher, student };
};

/**
 * Computes destination portal configuration based on the current domain.
 */
export const getPortalToggle = () => {
  const { teacher, student } = getBaseUrls();
  let isTeacherSite = false;

  if (browser) {
    const hostname = window.location.hostname;
    const port = window.location.port;

    isTeacherSite =
      port === "8080" ||
      hostname.includes("-8080.app.github.dev") ||
      hostname === "the-autonomy-protocol.vercel.app";
  }

  return {
    href: isTeacherSite ? student : teacher,
    label: isTeacherSite ? "Student Site" : "Teacher Site",
  };
};
