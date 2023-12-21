import { openai } from "@/lib/openai";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing env var from OpenAI", { status: 500 });
  }

  const { prompt } = await req.json();

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  let model = "gpt-3.5-turbo-0613";

  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    stream: false,
  });

  const [firstChoice] = response.choices;

  const responseString = firstChoice.message.content;

  if (!responseString) {
    return new Response(
      "There was an unknown error generating. Please try again.",
      { status: 500 }
    );
  }

  return new Response(JSON.stringify(responseString), { status: 200 });
}
