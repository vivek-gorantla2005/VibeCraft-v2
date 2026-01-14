import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";
import firecrawl from "@/lib/firecrawl";
import { prompt } from "./prompt";
import { db } from "../config/db";
import { chatTable } from "../config/schema";
import { filesTable } from "../config/schema";

// Flow
// user query ----> extract urls ----> scrape urls ----> generate text

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string }
    const urls = await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) ?? [];
    }) as string[];

    const scrappedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const content = await firecrawl.scrape(url,
            { formats: ["markdown"] }
          );
          return content.markdown ?? null;
        })
      )
      return results.filter(Boolean).join("\n\n");
    })

    const finalPrompt = scrappedContent
      ? `Context:\n${scrappedContent}\n\nQuestion: ${prompt}`
      : prompt;

    const result = await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: finalPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        }
      })
    })
    console.log("Inngest result:", result);
  },
);

export const AiGenerate = inngest.createFunction(
  { id: "ai-generate" },
  { event: "ai/generate" },
  async ({ event, step }) => {
    const { userprompt, projectId, frameId } = event.data as {
      userprompt: string;
      projectId: string;
      frameId: string;
    };

    const finalPrompt = `${prompt}\n\nUser Prompt: ${userprompt}`;

    const raw = await step.run("generate-text", async () => {
      const { text } = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: finalPrompt,
      });
      return text;
    });

    let cleanRaw = raw.trim();
    if (cleanRaw.startsWith("```")) {
      cleanRaw = cleanRaw
        .replace(/^```[a-z]*\n?/i, "")
        .replace(/\n?```$/i, "")
        .trim();
    }

    const parsed = await step.run("parse-json", async () => {
      return JSON.parse(cleanRaw);
    });

    const files = parsed.files as Record<
      string,
      { content: string }
    >;

    const result = await step.run("save-to-db", async () => {
      const chatMessages = [
        {
          role: "user",
          content: userprompt,
        },
        {
          role: "assistant",
          content: parsed,
        },
      ];

      const [chat] = await db
        .insert(chatTable)
        .values({
          projectId,
          frameId,
          chatMessage: chatMessages,
        })
        .returning({ id: chatTable.id });

      const fileRows = Object.entries(files).map(
        ([filePath, fileData]) => ({
          projectId,
          name: filePath,
          type: "file" as const,
          content: fileData.content,
          createdOn: new Date(),
          updatedOn: new Date(),
        })
      );

      await db.insert(filesTable).values(fileRows);

      return {
        chatId: chat.id,
        fileCount: fileRows.length,
      };
    });

    return result;
  }
);
