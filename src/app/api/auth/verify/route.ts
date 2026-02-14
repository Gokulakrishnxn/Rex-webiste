import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { idToken } = (await req.json()) as { idToken?: string };
    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { error: "Missing idToken" },
        { status: 400 }
      );
    }
    const decoded = await verifyIdToken(idToken);
    return NextResponse.json({
      success: true,
      uid: decoded.uid,
      email: decoded.email,
    });
  } catch (e) {
    console.error("Auth verify error:", e);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
