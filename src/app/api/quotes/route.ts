import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_name, customer_name, email, phone, message } = body;

    const result = await sql`
      INSERT INTO quote_requests (product_name, customer_name, email, phone, message)
      VALUES (${product_name}, ${customer_name}, ${email}, ${phone}, ${message})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating quote request:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}
