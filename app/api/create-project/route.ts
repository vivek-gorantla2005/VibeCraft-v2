import { NextResponse } from "next/server"
import { db } from "@/app/config/db"
import { projectsTable, frameTable, chatTable } from "@/app/config/schema"
import { currentUser } from "@clerk/nextjs/server"
export async function POST(request: Request) {
    const { projectId, frameId, messages, name, description } = await request.json()
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!projectId || !email || !frameId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    try {
        await db.insert(projectsTable).values({
            projectId: projectId,
            name: name,
            description: description,
            createdBy: email,
        })

        await db.insert(frameTable).values({
            frameId: frameId,
            projectId: projectId,
            createdBy: email,
        })

        await db.insert(chatTable).values({
            chatMessage: messages,
            projectId: projectId,
            frameId: frameId,
            createdBy: email,
        })
        return NextResponse.json({ message: "Project created successfully" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}