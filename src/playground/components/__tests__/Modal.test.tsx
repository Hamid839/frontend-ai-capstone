import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/playground/components/Modal";

describe("Modal", () => {
  it("does not render dialog content when closed", () => {
    render(
      <Modal open={false} onClose={vi.fn()} title="Confirm action">
        <p>Body</p>
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a dialog with accessible name when open", () => {
    render(
      <Modal open onClose={vi.fn()} title="Confirm action" description="Are you sure?">
        <p>Body copy</p>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog", { name: /confirm action/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
  });

  it("calls onClose when Close is activated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open onClose={onClose} title="Confirm action">
        <p>Body</p>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open onClose={onClose} title="Confirm action">
        <button type="button">Inside</button>
      </Modal>,
    );

    screen.getByRole("dialog").focus();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
