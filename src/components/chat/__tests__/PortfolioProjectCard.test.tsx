import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  PortfolioProjectCard,
  type PortfolioProjectCardData,
} from "@/components/chat/PortfolioProjectCard";

const project: PortfolioProjectCardData = {
  id: "focusboard",
  name: "FocusBoard",
  description: "Local-first React task planner with filters and search.",
  technologies: ["React", "TypeScript", "Vite"],
  contribution: "Built the full client including persistence and keyboard UX.",
  features: ["Local storage", "Keyboard accessible filters"],
  href: "https://github.com/Hamid839/frontend-ai-capstone/tree/main/FocusBoard",
  relevance: 0.92,
};

describe("PortfolioProjectCard (tool result)", () => {
  it("renders project name, description, and contribution by accessible content", () => {
    render(<PortfolioProjectCard project={project} />);

    expect(
      screen.getByRole("heading", { name: "FocusBoard", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/local-first react task planner/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/built the full client including persistence/i),
    ).toBeInTheDocument();
  });

  it("exposes technologies with an accessible list label", () => {
    render(<PortfolioProjectCard project={project} />);

    const techList = screen.getByRole("list", { name: /technologies/i });
    expect(techList).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
  });

  it("links to the project with an accessible name including the project title", () => {
    render(<PortfolioProjectCard project={project} />);

    const link = screen.getByRole("link", {
      name: /view project details for focusboard/i,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/Hamid839/frontend-ai-capstone/tree/main/FocusBoard",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("lists relevant features", () => {
    render(<PortfolioProjectCard project={project} />);

    expect(screen.getByText("Local storage")).toBeInTheDocument();
    expect(
      screen.getByText("Keyboard accessible filters"),
    ).toBeInTheDocument();
  });
});
