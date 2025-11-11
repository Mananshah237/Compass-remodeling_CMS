import { supabase } from "./client"

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${typeof window !== "undefined" ? window.location.origin : ""}/admin/dashboard`,
    },
  })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
