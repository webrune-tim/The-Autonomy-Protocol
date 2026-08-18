import type { RequestHandler } from "./$types";

export const prerender = true;

const SITE_URL = "https://the-autonomy-protocol-student.vercel.app";

interface MarkdownModule {
  metadata?: {
    date?: string;
    published?: boolean;
  };
}

export const GET: RequestHandler = async ({ url }) => {
  const baseUrl =
    url.origin && !url.origin.includes("localhost") && !url.origin.includes("sveltekit-prerender")
      ? url.origin
      : SITE_URL;

  const staticRoutes = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/resources", priority: "0.9", changefreq: "weekly" },
    { path: "/teacher-onboarding", priority: "0.7", changefreq: "monthly" },
    { path: "/login", priority: "0.4", changefreq: "monthly" },
  ];

  const agreementDocs = import.meta.glob("/src/lib/docs/agreements/*.md", { eager: true });
  const stepDocs = import.meta.glob("/src/lib/docs/steps/*.md", { eager: true });
  const freshmanDocs = import.meta.glob("/src/lib/docs/freshman/*.md", { eager: true });
  const seniorDocs = import.meta.glob("/src/lib/docs/senior/*.md", { eager: true });

  const docRoutes: Array<{ path: string; priority: string; changefreq: string; lastmod?: string }> =
    [];

  const processDocs = (docs: Record<string, unknown>, section: string) => {
    for (const [filepath, mod] of Object.entries(docs)) {
      const slug = filepath.split("/").at(-1)?.replace(".md", "");
      if (!slug) continue;

      const typedMod = mod as MarkdownModule;
      if (typedMod.metadata?.published === false) continue;

      docRoutes.push({
        path: `/resources/${section}/${slug}`,
        priority: "0.8",
        changefreq: "monthly",
        lastmod: typedMod.metadata?.date,
      });
    }
  };

  processDocs(agreementDocs, "agreements");
  processDocs(stepDocs, "steps");
  processDocs(freshmanDocs, "freshman");
  processDocs(seniorDocs, "senior");

  const allUrls = [
    ...staticRoutes.map((r) => ({
      loc: `${baseUrl}${r.path}`,
      priority: r.priority,
      changefreq: r.changefreq,
      lastmod: new Date().toISOString().split("T")[0],
    })),
    ...docRoutes.map((r) => ({
      loc: `${baseUrl}${r.path}`,
      priority: r.priority,
      changefreq: r.changefreq,
      lastmod: r.lastmod || new Date().toISOString().split("T")[0],
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
