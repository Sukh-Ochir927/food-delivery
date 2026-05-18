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
        { success: false, message: "MISSING_API_BASE_URL" },
        500,
      );
    }

    const { email, password } = await request.json();
    console.info("[admin-auth] login proxy request", {
      apiBaseUrlConfigured: Boolean(CONFIGURED_API_BASE_URL),
      emailReceived: typeof email === "string" && email.length > 0,
      passwordReceived: typeof password === "string" && password.length > 0,
    });

    const res = await fetch(apiUrl("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => ({}))) as Partial<AuthResponse>;

    if (!res.ok) {
      console.info("[admin-auth] external login failed", {
        status: res.status,
        message: data.message,
      });
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
        { success: false, message: "AUTH_SERVER_MISSING_TOKEN" },
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
    console.error("[admin-auth] login proxy failed", {
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });
    return jsonResponse({ success: false, message: "AUTH_PROXY_ERROR" }, 502);
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return NextResponse.json({ success: true }, { status: 200 });
}
