import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CONFIGURED_API_BASE_URL, apiUrl, authHeaders } from "@/lib/api";

type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
};

const jsonResponse = (body: AuthResponse | { authenticated: boolean }, status: number) =>
  NextResponse.json(body, { status });

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return jsonResponse({ authenticated: false }, 200);
  }

  try {
    const response = await fetch(apiUrl("/users/me"), {
      cache: "no-store",
      headers: authHeaders(token),
    });

    return jsonResponse({ authenticated: response.ok }, 200);
  } catch {
    return jsonResponse({ authenticated: true }, 200);
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();

  try {
    if (process.env.NODE_ENV === "production" && !CONFIGURED_API_BASE_URL) {
      return jsonResponse({ success: false, message: "MISSING_API_BASE_URL" }, 500);
    }

    const { email, password } = await request.json();
    const response = await fetch(apiUrl("/login"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
    const data = (await response.json().catch(() => ({}))) as Partial<AuthResponse>;

    if (!response.ok) {
      return jsonResponse(
        {
          success: false,
          message: data.message ?? "LOGIN_FAILED",
        },
        response.status,
      );
    }

    if (!data.token) {
      return jsonResponse({ success: false, message: "AUTH_SERVER_MISSING_TOKEN" }, 500);
    }

    cookieStore.set("token", data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return jsonResponse({ success: true, message: "LOGIN_SUCCESS" }, 200);
  } catch (error) {
    console.error("[client-auth] login failed", {
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
