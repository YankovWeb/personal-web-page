import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";
  const errorCode = searchParams.get("error_code");
  const error = searchParams.get("error");

  if (error || errorCode) {
    const loginUrl = new URL("/admin/login", origin);
    loginUrl.searchParams.set("error", errorCode ?? error ?? "auth");
    return NextResponse.redirect(loginUrl);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    const loginUrl = new URL("/admin/login", origin);
    loginUrl.searchParams.set("error", exchangeError.code ?? "auth");
    return NextResponse.redirect(loginUrl);
  }

  const loginUrl = new URL("/admin/login", origin);
  loginUrl.searchParams.set("error", "auth");
  return NextResponse.redirect(loginUrl);
}
