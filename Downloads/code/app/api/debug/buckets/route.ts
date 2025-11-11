import { NextResponse } from "next/server";

// Debug route: GET /api/debug/buckets
// Returns the list of storage buckets from the Supabase project using the
// SUPABASE_SERVICE_ROLE_KEY. Useful to confirm which buckets exist and
// whether the app is pointed at the correct project.

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!base || !key) {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment" }, { status: 500 });
  }

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/storage/v1/buckets`, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    const data = await res.json();
    return NextResponse.json({ status: res.status, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
