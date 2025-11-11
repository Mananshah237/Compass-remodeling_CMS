// Re-export from server-client for backward compatibility
// Server actions should use supabaseAdmin from server-client.ts
export { supabaseAdmin as supabaseServer } from "./server-client"
