// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // If Supabase envs are missing, skip auth checks to avoid crashing the dev server.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("[middleware] Supabase env vars missing — skipping auth middleware.");
    return NextResponse.next();
  }

  // Single response instance to collect cookie writes from the Supabase helper
  const response = NextResponse.next();

  // Ensure common Supabase cookie names are proxied to the response so
  // createServerClient can sync auth state correctly.
  if (req.cookies.has("sb-access-token")) {
    response.cookies.set("sb-access-token", req.cookies.get("sb-access-token")!.value);
  }
  if (req.cookies.has("sb-refresh-token")) {
    response.cookies.set("sb-refresh-token", req.cookies.get("sb-refresh-token")!.value);
  }

  // Create Supabase server client that can read/write cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect all /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Allow /admin/login without auth
    if (req.nextUrl.pathname === "/admin/login") return response;

    // Redirect if not logged in
    if (!user) {
      const redirect = req.nextUrl.clone();
      redirect.pathname = "/admin/login";
      return NextResponse.redirect(redirect);
    }

    // Verify the user is in admin_profiles
    const { data: admin } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!admin) {
      const redirect = req.nextUrl.clone();
      redirect.pathname = "/";
      return NextResponse.redirect(redirect);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
