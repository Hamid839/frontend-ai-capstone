
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText, type Message } from "ai";
import {
  CHAT_SYSTEM_PROMPT,
  CHAT_TEMPERATURE,
  DEFAULT_CHAT_MODEL,
} from "@/lib/ai/config";

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function extractText(value: unknown): string | null {
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    const text = value
      .map((part) => {
        if (
          typeof part === "object" &&
          part !== null &&
          "text" in part &&
          typeof part.text === "string"
        ) {
          return part.text;
        }
        return "";
      })
      .filter(Boolean)
      .join("");

    return text || null;
  }

  if (typeof value === "object" && value !== null && "parts" in value) {
    return extractText(value.parts);
  }

  return null;
}

function normalizeMessage(value: unknown, index: number): Message | null {
  if (typeof value !== "object" || value === null) return null;

  if (!("role" in value) ||
      (value.role !== "user" && value.role !== "assistant")) {
    return null;
  }

  const content =
    "content" in value
      ? extractText(value.content)
      : "parts" in value
        ? extractText(value.parts)
        : null;

  if (!content?.trim()) return null;

  return {
    id:
      "id" in value && typeof value.id === "string"
        ? value.id
        : `message-${index}`,
    role: value.role,
    content,
  };
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return jsonError(
      "Google AI API key is missing. Configure GOOGLE_GENERATIVE_AI_API_KEY.",
      503
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("messages" in body) ||
    !Array.isArray(body.messages)
  ) {
    return jsonError("Request must include a messages array.", 400);
  }

  const messages = body.messages.map(normalizeMessage);

  if (messages.length === 0 || messages.some((message) => message === null)) {
    return jsonError(
      "Messages must contain user or assistant text.",
      400
    );
  }

  try {
    const result = streamText({
      model: google(DEFAULT_CHAT_MODEL),
      system: CHAT_SYSTEM_PROMPT,
      messages: convertToCoreMessages(messages as Message[]),
      temperature: CHAT_TEMPERATURE,
      onError: ({ error }) => {
        console.error("[api/chat] Gemini stream error:", error);
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) =>
        error instanceof Error
          ? error.message
          : "Google Gemini stream failed.",
    });
  } catch (error) {
    console.error("[api/chat] Failed to start Gemini chat:", error);

    return jsonError("Unable to start Google Gemini chat.", 500);
  }
}
