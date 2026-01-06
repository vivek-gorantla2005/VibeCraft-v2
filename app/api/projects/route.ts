import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/config/db";
import { projectsTable, frameTable, chatTable } from "@/app/config/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const { projectId, frameId, messages } = await req.json();
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!projectId || !email || !frameId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    //create project
    const project = await db.insert(projectsTable).values({
        projectId: projectId,
        createdBy: email,
    })

    //create frame
    const frameResult = await db.insert(frameTable).values({
        frameId: frameId,
        projectId: projectId,
        createdBy: email,
    })

    //save user message
    const chatResult = await db.insert(chatTable).values({
        chatMessage: messages,
        projectId: projectId,
        frameId: frameId,
        createdBy: email,
    })

    return NextResponse.json({
        message: "Project created successfully",
        project,
        frameResult,
        chatResult,
    })
}