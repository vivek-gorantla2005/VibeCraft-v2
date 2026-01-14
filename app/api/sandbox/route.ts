import { NextRequest, NextResponse } from "next/server";
import { Sandbox } from "e2b";

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const sbx = await Sandbox.create("vibeCraft20");

    console.log(`Server is running at: https://49999-${sbx.sandboxId}.e2b.dev`);
    return NextResponse.json({
      url: `https://49999-${sbx.sandboxId}.e2b.dev`,
      sandboxId: sbx.sandboxId
    });
  } catch (err: any) {
    console.error("Sandbox failed:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
