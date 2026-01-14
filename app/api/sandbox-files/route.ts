import { NextRequest, NextResponse } from "next/server";
import { Sandbox } from "@e2b/code-interpreter";
export async function POST(req: NextRequest) {
    try {
        const { sandboxId, files } = await req.json();
        const sandbox = await Sandbox.connect(sandboxId);
        const cwd = await sandbox.commands.run('pwd');
        const p = cwd.stdout.trim();
        console.log('Current working directory:', p);

        const currPath = `${p}/my-app`;

        for (const file of files) {
            const filePath = `${currPath}/${file.name}`;
            const fileContent = file.content;
            await sandbox.files.write(filePath, fileContent);

        }
        console.log('All files written successfully');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to write files' }, { status: 500 });
    }
}