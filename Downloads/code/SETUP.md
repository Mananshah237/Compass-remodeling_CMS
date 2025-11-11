# CMS Setup Instructions

Follow these steps to set up the Compass Remodeling CMS.

## Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Git repository access

## Step 1: Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://schnzffjxxkjqunjnemn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_lVdlIV_vxEmEhi1CcnufsA_bH2Al5bU
SUPABASE_SERVICE_ROLE_KEY=sb_secret_mpq87pT6tkax7bZ85Uhhlg_Mwf9GxG-
```

**Important:** 
- Never commit `.env.local` to git
- The service role key should NEVER be exposed to client-side code
- Restart your dev server after adding/changing environment variables

## Step 2: Install Dependencies

```bash
npm install
# or
pnpm install
```

## Step 3: Set Up Supabase Database

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Run the SQL script from `scripts/004_setup_cms_tables.sql`
4. This will create:
   - `admin_profiles` table
   - `services` table
   - `gallery` table
   - `testimonials` table
   - `contact_messages` table
   - All necessary RLS policies

## Step 4: Set Up Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket named `media`
3. Make it **public** (for public read access)
4. The SQL script already includes storage policies, but verify they're applied

## Step 5: Create Admin User

1. Sign up for an account at `/admin/login` (or use Supabase Auth UI)
2. After signing up, note your user ID from Supabase Auth → Users
3. Run this SQL in the Supabase SQL Editor:

```sql
insert into admin_profiles (id) values ('YOUR_USER_ID_HERE');
```

Replace `YOUR_USER_ID_HERE` with your actual user ID from Supabase Auth.

## Step 6: Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your site.

## Step 7: Test Admin Access

1. Go to `http://localhost:3000/admin/login`
2. Log in with your admin credentials
3. You should see the admin dashboard
4. Try adding a service or gallery item to test

## Step 8: Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the same environment variables in Vercel → Project Settings → Environment Variables
4. Deploy

### Environment Variables in Vercel

Add these in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Troubleshooting

### Can't log in to admin?

- Verify your user ID is in the `admin_profiles` table
- Check that RLS policies are enabled
- Verify environment variables are set correctly

### Images not uploading?

- Check that the `media` bucket exists in Supabase Storage
- Verify storage policies are set correctly
- Check file size (should be under 5MB)

### Database errors?

- Verify all tables were created successfully
- Check that RLS policies are enabled
- Verify your Supabase URL and keys are correct

## Next Steps

- Read `HELP.md` for user documentation
- Add your first service
- Upload gallery images
- Add testimonials
- Customize the homepage content

## Support

For issues or questions, contact your developer or check the Supabase documentation.

---

**Note:** This CMS uses Row Level Security (RLS) to protect your data. Only admins can modify content, while the public can read services, gallery, and testimonials. Contact messages can be submitted by anyone but only viewed by admins.

