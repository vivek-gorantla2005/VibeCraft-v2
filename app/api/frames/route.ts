import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/config/db";
import { frameTable } from "@/app/config/schema";
import { eq } from "drizzle-orm";
import { chatTable } from "@/app/config/schema";
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const frameId = searchParams.get('frameId')
    const projectId = searchParams.get('projectId')
    // @ts-ignore
    const frameResult = await db.select().from(frameTable).where(eq(frameTable.frameId, frameId))
    //@ts-ignore
    const chatResult = await db.select().from(chatTable).where(eq(chatTable.frameId, frameId))

    const finalResult = {
        ...frameResult[0],
        chatMessages: chatResult[0].chatMessage
    }
    return NextResponse.json(finalResult)
}