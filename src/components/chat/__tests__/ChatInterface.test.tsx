import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const useChatMock = vi.fn();

vi.mock("@ai-sdk/react", () => ({
  useChat: () => useChatMock(),
}));

import { ChatInterface } from "@/components/chat/ChatInterface";

type MockChat = {
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    toolInvocations?: Array<{
      toolCallId: string;
      toolName: string;
      state: "partial-call" | "call" | "result";
      args?: { query?: string };
      result?: unknown;
    }>;
  }>;
  input: string;
  setInput: ReturnType<typeof vi.fn>;
  handleSubmit: ReturnType<typeof vi.fn>;
  isLoading: boolean;
  stop: ReturnType<typeof vi.fn>;
  error: Error | undefined;
  reload: ReturnType<typeof vi.fn>;
};

function mockChat(overrides: Partial<MockChat> = {}): MockChat {
  return {
    messages: [],
    input: "",
    setInput: vi.fn(),
    handleSubmit: vi.fn((e?: { preventDefault?: () => void }) => {
      e?.preventDefault?.();
    }),
    isLoading: false,
    stop: vi.fn(),
    error: undefined,
    reload: vi.fn(),
    ...overrides,
  };
}

describe("ChatInterface — pending, streaming, error", () => {
  beforeEach(() => {
    useChatMock.mockReset();
  });

  it("shows empty state when there are no messages and no error", () => {
    useChatMock.mockReturnValue(mockChat());

    render(<ChatInterface />);

    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /message/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^send$/i })).toBeDisabled();
  });

  it("shows pending skeleton while waiting for the first assistant token", () => {
    useChatMock.mockReturnValue(
      mockChat({
        isLoading: true,
        messages: [
          { id: "u1", role: "user", content: "What is FocusBoard?" },
        ],
      }),
    );

    render(<ChatInterface />);

    expect(
      screen.getByRole("status", {
        name: /assistant is preparing a response/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^stop$/i })).toBeInTheDocument();
  });

  it("renders streaming assistant content and Stop control", () => {
    useChatMock.mockReturnValue(
      mockChat({
        isLoading: true,
        messages: [
          { id: "u1", role: "user", content: "Tell me about MedNoviAI" },
          {
            id: "a1",
            role: "assistant",
            content: "MedNoviAI is a patient-facing surface…",
          },
        ],
      }),
    );

    render(<ChatInterface />);

    expect(screen.getByText(/mednoviai is a patient-facing surface/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^stop$/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^send$/i })).not.toBeInTheDocument();
  });

  it("shows error banner with retry when useChat reports an error", async () => {
    const user = userEvent.setup();
    const reload = vi.fn();

    useChatMock.mockReturnValue(
      mockChat({
        error: new Error("Google Gemini stream failed."),
        reload,
        messages: [
          { id: "u1", role: "user", content: "Search TypeScript projects" },
        ],
      }),
    );

    render(<ChatInterface />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/google gemini stream failed/i);

    const retry = screen.getByRole("button", { name: /retry last message/i });
    await user.click(retry);
    expect(reload).toHaveBeenCalled();
  });

  it("renders tool-result project cards from searchPortfolioProjects", () => {
    useChatMock.mockReturnValue(
      mockChat({
        messages: [
          { id: "u1", role: "user", content: "Search TypeScript" },
          {
            id: "a1",
            role: "assistant",
            content: "Here are matching projects.",
            toolInvocations: [
              {
                toolCallId: "t1",
                toolName: "searchPortfolioProjects",
                state: "result",
                args: { query: "TypeScript" },
                result: {
                  query: "TypeScript",
                  total: 1,
                  projects: [
                    {
                      id: "focusboard",
                      name: "FocusBoard",
                      description: "Task planner in TypeScript.",
                      technologies: ["TypeScript", "React"],
                      contribution: "Full client build.",
                      features: ["Filters"],
                      href: "https://github.com/Hamid839/frontend-ai-capstone/tree/main/FocusBoard",
                      relevance: 0.9,
                    },
                  ],
                },
              },
            ],
          },
        ],
      }),
    );

    render(<ChatInterface />);

    expect(
      screen.getByRole("heading", { name: "FocusBoard", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view project details for focusboard/i }),
    ).toBeInTheDocument();
  });

  it("fills the composer when an empty-state example is chosen", async () => {
    const user = userEvent.setup();
    const setInput = vi.fn();
    useChatMock.mockReturnValue(mockChat({ setInput }));

    render(<ChatInterface />);

    await user.click(
      screen.getByRole("button", { name: /what did you build in mednoviai/i }),
    );

    expect(setInput).toHaveBeenCalledWith("What did you build in MedNoviAI?");
  });
});
