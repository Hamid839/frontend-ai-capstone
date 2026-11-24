import { test, expect } from "@playwright/test";

/**
 * FE-09 primary flow:
 * Visit chat → empty state visible → type a message → send (API mocked) →
 * user bubble appears and Send becomes Stop while "streaming".
 * Never hits the real Gemini API.
 */
test.describe("Chat primary flow", () => {
  test("empty state → type → send with mocked API", async ({ page }) => {
    // Intercept the AI route so tests never call the real provider
    await page.route("**/api/chat", async (route) => {
      // Minimal data-stream style response the UI can settle on
      await route.fulfill({
        status: 200,
        contentType: "text/plain; charset=utf-8",
        body: `0:"This is a mocked assistant reply about your portfolio."\n`,
      });
    });

    await page.goto("/chat");

    // Empty / first-run state
    await expect(page.getByText(/no messages yet/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /what did you build in mednoviai/i }),
    ).toBeVisible();

    const composer = page.getByRole("textbox", { name: /message/i });
    await expect(composer).toBeVisible();

    const send = page.getByRole("button", { name: /^send$/i });
    await expect(send).toBeDisabled();

    await composer.fill("What did you build in FocusBoard?");
    await expect(send).toBeEnabled();

    await send.click();

    // User message should appear (optimistic / after submit)
    await expect(
      page.getByText("What did you build in FocusBoard?"),
    ).toBeVisible({ timeout: 10_000 });

    // Either Stop (while in flight) or the mocked assistant text eventually
    await expect(
      page
        .getByRole("button", { name: /^stop$/i })
        .or(page.getByText(/mocked assistant reply/i)),
    ).toBeVisible({ timeout: 15_000 });
  });
});
