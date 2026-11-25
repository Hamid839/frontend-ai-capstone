import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatErrorBanner } from "@/components/chat/ChatErrorBanner";

describe("ChatErrorBanner", () => {
  it("exposes an alert role with the failure message", () => {
    render(
      <ChatErrorBanner
        message="Network timeout while streaming"
        canRetry={false}
        retrying={false}
        onRetry={vi.fn()}
      />,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Network timeout while streaming");
    expect(alert).toHaveTextContent(/Response failed/i);
  });

  it("shows Retry last message when canRetry is true and calls onRetry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ChatErrorBanner
        message="Stream interrupted"
        canRetry
        retrying={false}
        onRetry={onRetry}
      />,
    );

    const retry = screen.getByRole("button", { name: /retry last message/i });
    expect(retry).toBeEnabled();
    await user.click(retry);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables retry and shows Retrying… while retrying", () => {
    render(
      <ChatErrorBanner
        message="Stream interrupted"
        canRetry
        retrying
        onRetry={vi.fn()}
      />,
    );

    const retry = screen.getByRole("button", { name: /retrying/i });
    expect(retry).toBeDisabled();
  });

  it("hides the retry button when canRetry is false", () => {
    render(
      <ChatErrorBanner
        message="Fatal error"
        canRetry={false}
        retrying={false}
        onRetry={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /retry/i }),
    ).not.toBeInTheDocument();
  });
});
