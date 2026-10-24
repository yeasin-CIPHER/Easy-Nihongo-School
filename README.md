# Easy Nihongo School

A responsive Japanese learning website focused on Grammar and Kanji, with Bangla explanations and a protected admin dashboard.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Postgres + Auth + Row Level Security
- Deployable to Vercel

## 1. Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without Supabase credentials, the public pages show local sample lessons; admin features require Supabase configuration.

## 2. Set up Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run `supabase/schema.sql` in full. This creates tables, indexes, RLS policies, a profile trigger, and sample N5/N4 content.
3. Open **Project Settings → API** and copy the Project URL and anon/public key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart the dev server after changing environment variables.

## 3. Create the first admin

1. In Supabase, open **Authentication → Users → Add user** and create an admin account with a strong password. Confirm the account if your project requires it.
2. Copy the new user's UUID.
3. Run this in the Supabase SQL Editor, replacing the UUID:

```sql
update public.profiles
set role = 'admin'
where id = 'REPLACE-WITH-AUTH-USER-UUID';
```

4. Visit `/admin/login` and sign in. Only accounts with `profiles.role = 'admin'` can use admin actions. Do not give out admin credentials.

## 4. Add and manage content

- Visit `/admin` after login.
- Use **Add grammar** or **Add kanji**.
- Set a unique slug. Grammar examples must be a JSON array such as:

```json
[
  {"japanese":"わたしは がくせいです。","reading":"わたしは がくせいです。","meaning_bn":"আমি একজন শিক্ষার্থী।"}
]
```

- Kanji examples use:

```json
[
  {"word":"日本","reading":"にほん","meaning_bn":"জাপান"}
]
```

- Check **Publish** to make content visible publicly. Unpublished content is only visible to admins.
- Slugs are unique per content table. Prefer simple URL slugs for grammar, and a kanji character or romanized slug for kanji.

## 5. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in https://vercel.com.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL` under Vercel project environment variables. Set the site URL to your real production URL.
4. Deploy. Test `/`, `/grammar`, `/kanji`, `/admin/login`, and the create/edit/publish flows.
5. In Supabase Auth URL configuration, set your production site URL and add the production callback/redirect URLs required by your Supabase project.

## Security notes

- Never put a Supabase service-role key in frontend or `NEXT_PUBLIC_*` variables.
- Admin server actions verify the signed-in user's database role. RLS policies enforce admin-only writes even if someone calls the API directly.
- Public pages only query published rows. Public content is readable without an account.
- Use a strong admin password and enable MFA on the Supabase account if available.

## Project map

```text
app/                 Public pages and admin routes
components/           Shared UI and admin forms
lib/                  Supabase helpers and content access
supabase/schema.sql   Database schema, RLS, and starter content
.env.example          Required environment variables
```

## Notes

- The current version intentionally excludes listening, student accounts, quizzes, bookmarks, and progress tracking.
- Sample content is introductory and should be reviewed by a Japanese-language educator before using it as formal teaching material.
- Search and JLPT filters run in the browser for the currently loaded lesson list. For a very large catalogue, add server-side pagination/search later.
