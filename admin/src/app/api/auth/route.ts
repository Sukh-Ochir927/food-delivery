import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
    const { email, password } = await request.json();

    const res = await fetch(apiUrl("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("Failed to sign in");
    }
    const { token } = await res.json();
    await cookieStore.set("token", token ?? "", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const response = NextResponse.json(
      { success: true, token },
      { status: 200 },
    );

    return response;
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return NextResponse.json({ success: true }, { status: 200 });
}
