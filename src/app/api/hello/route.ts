import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, name: "山田さん" },
    { id: 2, name: "田中さん" },
  ]);
}
