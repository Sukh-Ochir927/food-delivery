import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CONFIGURED_API_BASE_URL, apiUrl } from "@/lib/api/config";

type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
};

const jsonResponse = (body: AuthResponse, status: number) =>
  NextResponse.json(body, { status });

export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
    if (process.env.NODE_ENV === "production" && !CONFIGURED_API_BASE_URL) {
      return jsonResponse(
        { success: false, message: "MISSING_DATABASE_URL" },
        500,
      );
    }

    const { email, password } = await request.json();

    const res = await fetch(apiUrl("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => ({}))) as Partial<AuthResponse>;

    if (!res.ok) {
      return jsonResponse(
        {
          success: false,
          message: data.message ?? "INVALID_PASSWORD",
        },
        res.status,
      );
    }

    const { token } = data;
    if (!token) {
      return jsonResponse(
        { success: false, message: "MISSING_JWT_SECRET" },
        500,
      );
    }

    await cookieStore.set("token", token ?? "", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return jsonResponse({ success: true, message: "LOGIN_SUCCESS" }, 200);
  } catch (error) {
    console.log(error);
    return jsonResponse({ success: false, message: "INVALID_PASSWORD" }, 401);
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return NextResponse.json({ success: true }, { status: 200 });
}
