import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export const dynamic = "force-static";
const base = "https://varunprasad.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/` },
    { url: `${base}/about/` },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}/` })),
  ];
}
