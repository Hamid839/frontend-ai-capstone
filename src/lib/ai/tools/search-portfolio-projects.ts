import { tool } from "ai";
import { z } from "zod";

const searchPortfolioProjectsInputSchema = z.object({
  query: z.string().trim().min(2).max(100),
  limit: z.number().int().min(1).max(5).default(3),
});

type PortfolioProject = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  contribution: string;
  features: string[];
  href: string;
};

type SearchPortfolioProjectsResult = {
  query: string;
  total: number;
  projects: Array<PortfolioProject & { relevance: number }>;
};

const portfolioProjects: PortfolioProject[] = [
  {
    id: "mednoviai",
    name: "MedNoviAI — Patient side",
    description:
      "A healthcare platform designed to help patients access healthcare services and manage appointment information.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    contribution:
      "Contributed to patient-side features and connected the frontend to Supabase.",
    features: [
      "Patient-side appointment experience",
      "Frontend integration with Supabase",
    ],
    href: "https://github.com/Hamid839/frontend-ai-capstone/blob/main/FocusBoard/case-studies.md#case-study-1-mednoviai-patient-side-experience",
  },
  {
    id: "focusboard",
    name: "FocusBoard",
    description:
      "A local-first task planner built with React and TypeScript.",
    technologies: ["React", "TypeScript", "Vite", "localStorage"],
    contribution:
      "Built a local-first task planner with search, filtering, and priority sorting.",
    features: [
      "Search task titles",
      "Filter tasks by status and category",
      "Sort tasks by priority",
      "Accessible controls",
    ],
    href: "https://github.com/Hamid839/frontend-ai-capstone/tree/main/FocusBoard",
  },
];

const ignoredQueryTerms = new Set([
  "a",
  "about",
  "and",
  "find",
  "for",
  "hamid",
  "in",
  "involving",
  "is",
  "my",
  "of",
  "on",
  "project",
  "projects",
  "the",
  "where",
  "which",
  "with",
]);

function normalizeSearchTerm(term: string): string {
  if (term === "filters" || term === "filtering" || term === "filtered") {
    return "filter";
  }
  if (term === "tasks") return "task";
  if (term === "appointments") return "appointment";
  return term;
}

function getSearchTerms(value: string): string[] {
  return value
    .toLowerCase()
    .match(/[a-z0-9]+(?:[.+#-][a-z0-9]+)*/g)
    ?.map(normalizeSearchTerm)
    .filter((term) => !ignoredQueryTerms.has(term)) ?? [];
}

export const searchPortfolioProjects = tool({
  description:
    "Search Hamid's verified portfolio projects by name, technology, contribution, or feature. Returns matching projects only; an empty projects array means there are no matches.",
  parameters: searchPortfolioProjectsInputSchema,
  execute: async ({
    query,
    limit,
  }): Promise<SearchPortfolioProjectsResult> => {
    const queryTerms = [...new Set(getSearchTerms(query))];
    const rankedProjects = portfolioProjects
      .map((project) => {
        const projectTerms = new Set(
          getSearchTerms(
            [
              project.name,
              project.description,
              ...project.technologies,
              project.contribution,
              ...project.features,
            ].join(" "),
          ),
        );
        const matchedTerms = queryTerms.filter((term) =>
          projectTerms.has(term),
        );
        return {
          ...project,
          relevance:
            queryTerms.length === 0 ? 0 : matchedTerms.length / queryTerms.length,
        };
      })
      .filter((project) => project.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    return {
      query,
      total: rankedProjects.length,
      projects: rankedProjects.slice(0, limit),
    };
  },
});
