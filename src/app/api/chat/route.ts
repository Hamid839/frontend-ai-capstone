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

function isChatMessage(value: unknown): value is Message {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "role" in value &&
    (value.role === "user" || value.role === "assistant") &&
    "content" in value &&
    typeof value.content === "string"
  );
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return jsonError(
      "GOOGLE_GENERATIVE_AI_API_KEY is missing. Add it to .env.local and restart the dev server.",
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
    !Array.isArray(body.messages) ||
    !body.messages.every(isChatMessage)
  ) {
    return jsonError(
      "Request must include a messages array with user or assistant text messages.",
      400
    );
  }

  try {
    const result = streamText({
      model: google(DEFAULT_CHAT_MODEL),
      system: CHAT_SYSTEM_PROMPT,
      messages: convertToCoreMessages(body.messages),
      temperature: CHAT_TEMPERATURE,
      onError: ({ error }) => console.error("[api/chat] Gemini stream error:", error),
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) =>
        error instanceof Error ? error.message : "Google Gemini stream failed.",
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown server error.";
    console.error("[api/chat] Failed to start Gemini stream:", err);
    return jsonError(`Unable to start Google Gemini chat: ${detail}`, 500);
  }
}