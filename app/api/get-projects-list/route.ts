import { NextResponse } from "next/server"
import { db } from "@/app/config/db"
import { projectsTable, frameTable } from "@/app/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq, desc } from "drizzle-orm"

export async function GET(request: Request) {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch projects and their frames, joined together
    //@ts-ignore
    const allResults = await db
        .select({
            id: projectsTable.id,
            name: projectsTable.name,
            description: projectsTable.description,
            projectId: projectsTable.projectId,
            createdOn: projectsTable.createdOn,
            frameId: frameTable.frameId,
            frameCreatedOn: frameTable.createdOn
        })
        .from(projectsTable)
        .leftJoin(frameTable, eq(projectsTable.projectId, frameTable.projectId))
        .where(eq(projectsTable.createdBy, email))
        .orderBy(desc(frameTable.createdOn));

    // Filter to keep only the latest frame for each unique project
    const uniqueProjectsMap = new Map();
    allResults.forEach((res: any) => {
        if (!uniqueProjectsMap.has(res.projectId)) {
            uniqueProjectsMap.set(res.projectId, res);
        }
    });

    const projectsWithLatestFrame = Array.from(uniqueProjectsMap.values());

    return NextResponse.json(projectsWithLatestFrame);
}