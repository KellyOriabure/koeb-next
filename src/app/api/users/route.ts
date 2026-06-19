import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const client = await clerkClient();
    const { data: users } = await client.users.getUserList({ limit: 100 });
    const mapped = users.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.emailAddresses?.[0]?.emailAddress || "",
      imageUrl: u.imageUrl,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const user = await client.users.createUser({
      firstName,
      lastName,
      emailAddress: [email],
      password,
    });

    return NextResponse.json(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses?.[0]?.emailAddress || "",
        imageUrl: user.imageUrl,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    const message =
      error?.errors?.[0]?.longMessage || error?.message || "Failed to create user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const client = await clerkClient();
    await client.users.deleteUser(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
