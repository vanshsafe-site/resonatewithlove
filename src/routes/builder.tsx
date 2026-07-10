import { createFileRoute } from "@tanstack/react-router";
import { Builder } from "@/components/Builder";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Builder — ReasonateAI" },
      { name: "description", content: "Describe your product and watch ReasonateAI draft it live." },
    ],
  }),
  component: Builder,
});
