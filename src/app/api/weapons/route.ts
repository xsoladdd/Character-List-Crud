import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    var data = await db.getData("/weapons");
    return NextResponse.json({ weapons: data },{status:200});
  } catch (error) {
    return NextResponse.json(
      { weapons: [] },
      { status: 400, statusText: (error as catchError).message }
    );
  }
}
