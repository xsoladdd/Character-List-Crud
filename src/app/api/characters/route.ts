import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    var data = await db.getData("/characters");
    return NextResponse.json({ characters: data },{status:200});
  } catch (error) {
    return NextResponse.json(
      { characters: [] },
      { status: 400, statusText: (error as catchError).message }
    );
  }
}
