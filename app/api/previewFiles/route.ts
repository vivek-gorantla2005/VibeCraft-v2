import { NextRequest, NextResponse } from "next/server";
import { filesTable } from "@/app/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/app/config/db";
interface WebContainerFile {
    file: {
        contents: string;
    };
}

interface WebContainerDirectory {
    directory: FileSystemTree;
}

interface FileSystemTree {
    [key: string]: WebContainerFile | WebContainerDirectory;
}

export async function GET(req: NextRequest) {
    try {
        const projectId = req.nextUrl.searchParams.get("projectId");

        if (!projectId) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        const files = await db.select().from(filesTable).where(eq(filesTable.projectId, projectId));
        return NextResponse.json(files);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}