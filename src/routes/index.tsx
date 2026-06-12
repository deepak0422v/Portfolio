import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parasa Deepak Kumar — AI Engineer Portfolio" },
      {
        name: "description",
        content:
          "Final-year B.Tech CSE (AIML) student and AI engineer building production LLM, RAG, and agentic AI systems. Open to AI Engineer roles.",
      },
      { property: "og:title", content: "Parasa Deepak Kumar — AI Engineer" },
      {
        property: "og:description",
        content: "Portfolio of an AI engineer building LLM, RAG and agentic systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
