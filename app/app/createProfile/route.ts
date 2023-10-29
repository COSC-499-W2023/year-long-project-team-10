import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    // Read JSON data from a file
    const requestJson = await request.json();
    const jsonData = JSON.parse(requestJson);

    // Extract values
    const { country, address, bio, occupationTags } = jsonData;

    // Insert into the database using raw SQL query
    const result = await prisma.$executeRaw`INSERT INTO profile (country, address, occupationTags, bio) VALUES (${country}, ${address}, ${occupationTags}, ${bio})`;

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(e.message), { status: 500 });
  }
}
