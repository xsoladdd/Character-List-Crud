import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    var data = await db.getData("/characters");
    return NextResponse.json({ characters: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { characters: [] },
      { status: 400, statusText: (error as catchError).message }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();

    const { idArr } = body;

    if (idArr && idArr.length !== 0) {
      const record = (await db.getData(`/characters`)) as Array<ICharacter>;
      const newRecord = record.filter(({ id }) => !idArr.includes(id));
      await db.push("/characters", newRecord, true);
      await db.save();
      return NextResponse.json(
        { message: "Delete succesfully" },
        { status: 200, statusText: "Delete succesfully" }
      );
    }
    throw new Error("invalid Array of ID");
  } catch (error) {
    return NextResponse.json(
      {},
      { status: 400, statusText: (error as catchError).message }
    );
  }
}
