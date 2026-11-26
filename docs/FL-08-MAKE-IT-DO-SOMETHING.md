# FL-08 — Make It Do Something

## My Dynamic Feature: AI Portfolio Assistant

I chose the AI-powered portfolio assistant as the one dynamic feature of my portfolio.

It allows visitors, recruiters, and potential employers to ask questions about my projects, technical skills, and development experience. Instead of only reading information on my website, they can interact with an assistant to learn more about my work.

## What Is a Backend?

A backend is the part of an application that works behind the scenes. It receives requests, processes information, and communicates with other services.

In my project, the backend is a Next.js API route. It handles chat requests and communicates with Google Gemini without exposing my API key to website visitors.

## How My Feature Works

1. A visitor opens my portfolio's Chat page and enters a question.
2. The React chat interface captures the message.
3. The message is sent to my Next.js API route at `/api/chat`.
4. The API route validates the request and uses the Google Gemini API.
5. Gemini generates a response based on the assistant's instructions and available portfolio information.
6. The backend streams the response back to the browser.
7. The visitor sees the answer appear in the chat interface.

## Technologies Used

- Next.js API Routes
- React and TypeScript
- AI SDK (`useChat` and `streamText`)
- Google Gemini API (`gemini-2.5-flash`)
- Vercel deployment

## Hosting and Cost

The application is deployed on Vercel. The AI model is configured for Google's Gemini API free tier, subject to its current model eligibility and usage limits.

The API key is stored as a server-side environment variable rather than in the frontend code.

## Testing

A real test was performed on the deployed portfolio by submitting a question about my project contributions.

**Test result:** [Add your actual result here after testing.]

**Evidence:** [Add the screenshot filename or evidence location.]

## What I Learned

I learned that a frontend feature needs more than a user interface to become useful. It must communicate with a backend, process a real request, and handle the response.

I also learned how to keep API credentials on the server and how streaming responses can make an AI-powered interface feel more interactive.