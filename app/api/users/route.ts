// app/api/users/route.ts
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
