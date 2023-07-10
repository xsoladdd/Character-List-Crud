import { db } from "@/db";
import { generateID } from "@/utils/id";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const id = generateID();
  const newCharacter: ICharacter = {
    combatStatus: false,
    description: "An Awesome Character",
    id: id,
    weapon: "whip",
    name:'John Doe'
  };

  await db.push("/characters",[newCharacter],false);

  await db.save();

  return NextResponse.json({ message: "hello" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "success" });
}
