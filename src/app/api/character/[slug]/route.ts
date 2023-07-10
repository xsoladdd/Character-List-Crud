import { db } from "@/db";
import { NextResponse } from "next/server";
import { characterSchema } from "../validation";

export async function GET(_: any, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const index = await db.getIndex("/characters", slug);
    if (index === -1) {
      throw new Error("Invalid Slug");
    }
    const data: ICharacter = await db.getData(`/characters[${index}]`);
    return NextResponse.json({ character: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { character: {} },
      { status: 400, statusText: (error as catchError).message }
    );
  }
}

export async function DELETE(_: any, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const index = await db.getIndex("/characters", slug);
    if (index === -1) {
      throw new Error("Invalid Slug");
    }
    await db.delete(`/characters[${index}]`);
    await db.save()
    return NextResponse.json(
      {message:"Delete succesfully"},
      { status: 200, statusText: "Delete succesfully" }
    );
  } catch (error) {
    return NextResponse.json(
      {},
      { status: 400, statusText: (error as catchError).message }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const validatedCharacter = await characterSchema.validate(body);
    const slug = params.slug;
    const index = await db.getIndex("/characters", slug);
    if (index === -1) {
      throw new Error("Invalid Slug");
    }
    const updatedCharacter: ICharacter = {
      ...validatedCharacter,
      id:slug
    };
    await db.push(`/characters[${index}]`,updatedCharacter,true)
    await db.save()
    return NextResponse.json(
      {character:updatedCharacter},
      { status: 200, statusText: "Success" }
      );
    } catch (error) {
    console.log(error)
    return NextResponse.json(
      {},
      { status: 400, statusText: (error as catchError).message }
    );
  }
}
