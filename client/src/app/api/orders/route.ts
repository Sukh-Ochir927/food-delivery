import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiUrl, authHeaders } from "@/lib/api";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "LOGIN_REQUIRED" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(apiUrl("/orders"), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? "ORDER_FAILED",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error) {
    console.error("[client-orders] order failed", {
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });
    return NextResponse.json(
      { success: false, message: "ORDER_PROXY_ERROR" },
      { status: 502 },
    );
  }
}
