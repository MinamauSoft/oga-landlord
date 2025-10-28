import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server"; // We need the server client

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    // We must use an async client here
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirect to the dashboard (or the intended page) after successful login
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect to an error page if something went wrong
  return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
}