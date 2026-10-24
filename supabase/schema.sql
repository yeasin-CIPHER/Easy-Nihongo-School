-- Run this file in Supabase SQL Editor before deploying.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'student' check (role in ('admin','student')),
  created_at timestamptz not null default now()
);

create table if not exists public.grammar_lessons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  pattern text not null,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  summary text not null default '',
  explanation_bn text not null default '',
  formation text not null default '',
  examples jsonb not null default '[]'::jsonb check (jsonb_typeof(examples)='array'),
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kanji_lessons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  character text not null,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  meaning_en text not null default '',
  meaning_bn text not null default '',
  onyomi text not null default '',
  kunyomi text not null default '',
  examples jsonb not null default '[]'::jsonb check (jsonb_typeof(examples)='array'),
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists grammar_level_sort_idx on public.grammar_lessons(level, sort_order);
create index if not exists kanji_level_sort_idx on public.kanji_lessons(level, sort_order);
create index if not exists grammar_title_search_idx on public.grammar_lessons using gin (to_tsvector('simple', title || ' ' || pattern || ' ' || summary));
create index if not exists kanji_search_idx on public.kanji_lessons using gin (to_tsvector('simple', character || ' ' || meaning_en || ' ' || meaning_bn));

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles(id,email,role) values(new.id,new.email,'student') on conflict(id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.grammar_lessons enable row level security;
alter table public.kanji_lessons enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Published grammar is public" on public.grammar_lessons;
create policy "Published grammar is public" on public.grammar_lessons for select to anon, authenticated using (published = true or public.is_admin());
drop policy if exists "Admins manage grammar" on public.grammar_lessons;
create policy "Admins manage grammar" on public.grammar_lessons for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Published kanji is public" on public.kanji_lessons;
create policy "Published kanji is public" on public.kanji_lessons for select to anon, authenticated using (published = true or public.is_admin());
drop policy if exists "Admins manage kanji" on public.kanji_lessons;
create policy "Admins manage kanji" on public.kanji_lessons for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Sample content. Re-running this seed is safe because slugs are unique.
insert into public.grammar_lessons(slug,title,pattern,level,summary,explanation_bn,formation,examples,published,sort_order) values
('wa-desu','です — পরিচয় ও ভদ্র বাক্য','N は N です','N5','কোনো ব্যক্তি বা বস্তুকে পরিচয় করিয়ে দিতে ব্যবহৃত হয়।','「です」 বাক্যকে ভদ্র করে। 「は」 এখানে বিষয় নির্দেশ করে; এর উচ্চারণ “wa”。','নাম + は + নাম/বিশেষণ + です','[{"japanese":"わたしは がくせいです。","reading":"わたしは がくせいです。","meaning_bn":"আমি একজন শিক্ষার্থী।"},{"japanese":"これは ほんです。","reading":"これは ほんです。","meaning_bn":"এটি একটি বই।"}]'::jsonb,true,1),
('te-kudasai','てください — অনুরোধ করা','て-form + ください','N5','ভদ্রভাবে কাউকে কিছু করতে অনুরোধ করতে ব্যবহৃত হয়।','ক্রিয়ার て-form-এর পরে 「ください」 বসালে “দয়া করে … করুন” অর্থ হয়।','ক্রিয়ার て-form + ください','[{"japanese":"もういちど いってください。","reading":"もういちど いってください。","meaning_bn":"দয়া করে আরেকবার বলুন।"},{"japanese":"ここに なまえを かいてください。","reading":"ここに なまえを かいてください。","meaning_bn":"দয়া করে এখানে নাম লিখুন।"}]'::jsonb,true,2),
('ta-koto-ga-arimasu','たことがあります — অভিজ্ঞতা','Vた + ことがあります','N4','আগে কোনো কাজ করার অভিজ্ঞতা বোঝায়।','অতীতে কোনো কাজ করেছেন কি না বা অভিজ্ঞতা আছে কি না বলতে এই গঠন ব্যবহার করা হয়।','ক্রিয়ার た-form + ことがあります','[{"japanese":"にほんへ いったことがあります。","reading":"にほんへ いったことがあります。","meaning_bn":"জাপানে যাওয়ার অভিজ্ঞতা আমার আছে।"}]'::jsonb,true,1)
on conflict(slug) do nothing;

insert into public.kanji_lessons(slug,character,level,meaning_en,meaning_bn,onyomi,kunyomi,examples,published,sort_order) values
('日','日','N5','day, sun','দিন, সূর্য','ニチ、ジツ','ひ、か','[{"word":"日本","reading":"にほん","meaning_bn":"জাপান"},{"word":"日曜日","reading":"にちようび","meaning_bn":"রবিবার"}]'::jsonb,true,1),
('人','人','N5','person, people','মানুষ, ব্যক্তি','ジン、ニン','ひと','[{"word":"日本人","reading":"にほんじん","meaning_bn":"জাপানি ব্যক্তি"},{"word":"三人","reading":"さんにん","meaning_bn":"তিনজন"}]'::jsonb,true,2),
('学','学','N4','study, learning','পড়াশোনা, শিক্ষা','ガク','まなぶ','[{"word":"学生","reading":"がくせい","meaning_bn":"শিক্ষার্থী"},{"word":"学校","reading":"がっこう","meaning_bn":"স্কুল"}]'::jsonb,true,1)
on conflict(slug) do nothing;
