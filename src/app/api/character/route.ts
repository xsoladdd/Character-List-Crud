import { db } from "@/db";
import { NextResponse } from "next/server";
import { characterSchema } from "./validation";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newCharacter = await characterSchema.validate(body)
    await db.push("/characters",[newCharacter],false);
    await db.save();
    return NextResponse.json({ character:newCharacter },{status:200});
  } catch (error) {
    return NextResponse.json(
      { error: (error as catchError).message },
      { status: 400, statusText: (error as catchError).message }
    );
  }
}
