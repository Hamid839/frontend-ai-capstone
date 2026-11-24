import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatEmptyState } from "@/components/chat/ChatEmptyState";

describe("ChatEmptyState", () => {
  it("renders the empty guidance and example prompts", () => {
    render(<ChatEmptyState onPick={vi.fn()} />);

    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /what did you build in mednoviai/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /how does focusboard store data/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search projects using typescript/i }),
    ).toBeInTheDocument();
  });

  it("calls onPick with the example text when an example is clicked", async () => {
    const user = userEvent.setup();
    const onPick = vi.fn();

    render(<ChatEmptyState onPick={onPick} />);

    await user.click(
      screen.getByRole("button", { name: /search projects using typescript/i }),
    );

    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onPick).toHaveBeenCalledWith("Search projects using TypeScript");
  });

  it("disables example buttons when disabled is true", () => {
    render(<ChatEmptyState onPick={vi.fn()} disabled />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
