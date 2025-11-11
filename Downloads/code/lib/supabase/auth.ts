// import { supabase } from "./client"

// export async function signIn(email: string, password: string) {
//   return supabase.auth.signInWithPassword({
//     email,
//     password,
//   })
// }

// export async function signUp(email: string, password: string) {
//   return supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo:
//         process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
//         `${typeof window !== "undefined" ? window.location.origin : ""}/admin/dashboard`,
//     },
//   })
// }

// export async function signOut() {
//   return supabase.auth.signOut()
// }

// export async function getUser() {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   return user
// }


// lib/supabase/auth.ts
"use client";

import { supabase } from "./client";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    throw error;
  }

  // ✅ Force a full reload so cookies are applied before hitting /admin/dashboard
  if (typeof window !== "undefined") {
    location.assign("/admin/dashboard");
  }

  return data;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${typeof window !== "undefined" ? window.location.origin : ""}/admin/dashboard`,
    },
  });

  if (error) {
    console.error("Signup error:", error);
    throw error;
  }

  // Optional: reload after signup (if you want to auto-login users)
  if (typeof window !== "undefined") {
    location.assign("/admin/dashboard");
  }

  return data;
}

export async function signOut() {
  await supabase.auth.signOut();

  // ✅ Clear local session and reload
  if (typeof window !== "undefined") {
    location.assign("/admin/login");
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

