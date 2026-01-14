import { NextRequest } from "next/server";
import { chatTable } from "@/app/config/schema";
import { db } from "@/app/config/db";
import { inngest } from "@/app/inngest/client";
export async function POST(req: NextRequest) {
    try {

        const { projectId, frameId, message } = await req.json();
        await db.insert(chatTable).values({
            chatMessage: message,
            projectId,
            frameId,
        })

        const inngestResponse = await inngest.send({
            name: "ai/generate",
            data: {
                userprompt: message,
                projectId,
                frameId,
            }
        })
        console.log("Inngest send response:", inngestResponse);
        return Response.json({ status: "inngest build ", inngestResponse })
    } catch (err) {
        console.log(err);
        return Response.json({ status: "failed" })
    }
}