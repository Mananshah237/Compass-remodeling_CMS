// lib/supabase/config.ts
// Central place for Supabase storage configuration.
// Update SUPABASE_STORAGE_BUCKET in .env.local if you want a different bucket name.
export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "media";

export function getBucketPath(folder: string, filename: string) {
  return `${folder}/${filename}`;
}
