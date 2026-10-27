import { createServerSupabase } from "@/lib/supabase";
// import { createClient } from "@/lib/supabase-browser";
export type Grammar = {
  id: string;
  slug: string;
  title: string;
  pattern: string;
  level: string;
  summary: string;
  explanation_bn: string;
  formation: string;
  examples: { japanese: string; reading: string; meaning_bn: string }[];
  published: boolean;
  created_at?: string;
  lesson_number: number;
  sort_order: number;
};
export type Kanji = {
  id: string;
  slug: string;
  character: string;
  level: string;
  meaning_en: string;
  meaning_bn: string;
  onyomi: string;
  kunyomi: string;
  examples: { word: string; reading: string; meaning_bn: string }[];
  published: boolean;
  created_at?: string;
};

// export const sampleGrammar: Grammar[] = [
//   {
//     id: "sample-g1",
//     slug: "wa-desu",
//     title: "です — পরিচয় ও ভদ্র বাক্য",
//     pattern: "N は N です",
//     level: "N5",
//     summary: "কোনো ব্যক্তি বা বস্তুকে পরিচয় করিয়ে দিতে ব্যবহৃত হয়।",
//     explanation_bn:
//       "「です」 বাক্যকে ভদ্র করে। 「は」 এখানে বিষয় নির্দেশ করে; এর উচ্চারণ “wa”।",
//     formation: "নাম + は + নাম/বিশেষণ + です",
//     examples: [
//       {
//         japanese: "わたしは がくせいです。",
//         reading: "わたしは がくせいです。",
//         meaning_bn: "আমি একজন শিক্ষার্থী।",
//       },
//       {
//         japanese: "これは ほんです。",
//         reading: "これは ほんです。",
//         meaning_bn: "এটি একটি বই।",
//       },
//     ],
//     published: true,
//   },
//   {
//     id: "sample-g2",
//     slug: "te-kudasai",
//     title: "てください — অনুরোধ করা",
//     pattern: "て-form + ください",
//     level: "N5",
//     summary: "ভদ্রভাবে কাউকে কিছু করতে অনুরোধ করতে ব্যবহৃত হয়।",
//     explanation_bn:
//       "ক্রিয়ার て-form-এর পরে 「ください」 বসালে “দয়া করে … করুন” অর্থ হয়।",
//     formation: "ক্রিয়ার て-form + ください",
//     examples: [
//       {
//         japanese: "もういちど いってください。",
//         reading: "もういちど いってください。",
//         meaning_bn: "দয়া করে আরেকবার বলুন।",
//       },
//       {
//         japanese: "ここに なまえを かいてください。",
//         reading: "ここに なまえを かいてください。",
//         meaning_bn: "দয়া করে এখানে নাম লিখুন।",
//       },
//     ],
//     published: true,
//   },
//   {
//     id: "sample-g3",
//     slug: "ta-koto-ga-arimasu",
//     title: "たことがあります — অভিজ্ঞতা",
//     pattern: "Vた + ことがあります",
//     level: "N4",
//     summary: "আগে কোনো কাজ করার অভিজ্ঞতা বোঝায়।",
//     explanation_bn:
//       "অতীতে কোনো কাজ করেছেন কি না বা অভিজ্ঞতা আছে কি না বলতে এই গঠন ব্যবহার করা হয়।",
//     formation: "ক্রিয়ার た-form + ことがあります",
//     examples: [
//       {
//         japanese: "にほんへ いったことがあります。",
//         reading: "にほんへ いったことがあります。",
//         meaning_bn: "জাপানে যাওয়ার অভিজ্ঞতা আমার আছে।",
//       },
//     ],
//     published: true,
//   },
// ];
export const sampleKanji: Kanji[] = [
  {
    id: "sample-k1",
    slug: "日",
    character: "日",
    level: "N5",
    meaning_en: "day, sun",
    meaning_bn: "দিন, সূর্য",
    onyomi: "ニチ、ジツ",
    kunyomi: "ひ、か",
    examples: [
      { word: "日本", reading: "にほん", meaning_bn: "জাপান" },
      { word: "日曜日", reading: "にちようび", meaning_bn: "রবিবার" },
    ],
    published: true,
  },
  {
    id: "sample-k2",
    slug: "人",
    character: "人",
    level: "N5",
    meaning_en: "person, people",
    meaning_bn: "মানুষ, ব্যক্তি",
    onyomi: "ジン、ニン",
    kunyomi: "ひと",
    examples: [
      { word: "日本人", reading: "にほんじん", meaning_bn: "জাপানি ব্যক্তি" },
      { word: "三人", reading: "さんにん", meaning_bn: "তিনজন" },
    ],
    published: true,
  },
  {
    id: "sample-k3",
    slug: "学",
    character: "学",
    level: "N4",
    meaning_en: "study, learning",
    meaning_bn: "পড়াশোনা, শিক্ষা",
    onyomi: "ガク",
    kunyomi: "まなぶ",
    examples: [
      { word: "学生", reading: "がくせい", meaning_bn: "শিক্ষার্থী" },
      { word: "学校", reading: "がっこう", meaning_bn: "স্কুল" },
    ],
    published: true,
  },
];
// export async function getGrammar(): Promise<Grammar[]> {
//   const supabase = createClient();
//   if (!supabase) return sampleGrammar;
//   const { data, error } = await supabase
//     .from("grammar_lessons")
//     .select("*")
//     .eq("published", true)
//     .order("level")
//     .order("sort_order");
//   return !error && data ? (data as Grammar[]) : sampleGrammar;
// }


export async function getGrammar(): Promise<Grammar[]> {
  const supabase = await createServerSupabase();

  if (!supabase) {
    
    throw new Error("Supabase environment variables are missing.");
  }

  const { data, error } = await supabase
    .from("grammar_lessons")
    .select("*")
    .eq("published", true)
    .order("level")
    .order("sort_order");

  if (error) {
    console.error("Grammar fetch error:", error.message);
    throw new Error(error.message);
  }

  return (data ?? []) as Grammar[];
}

// export async function getKanji(): Promise<Kanji[]> {
//   const supabase = createClient();
//   if (!supabase) return sampleKanji;
//   const { data, error } = await supabase
//     .from("kanji_lessons")
//     .select("*")
//     .eq("published", true)
//     .order("level")
//     .order("sort_order");
//   return !error && data ? (data as Kanji[]) : sampleKanji;
// }

export async function getKanji(): Promise<Kanji[]> {
  const supabase = await createServerSupabase();

  if (!supabase) {
    throw new Error("Supabase client could not be created.");
  }

  const { data, error } = await supabase
    .from("kanji_lessons")
    .select("*")
    .eq("published", true)
    .order("level")
    .order("sort_order");

  if (error) {
    console.error("Kanji fetch error:", error.message);
    throw new Error(`Failed to fetch Kanji: ${error.message}`);
  }

  return (data ?? []) as Kanji[];
}


// export async function getAdminContent<T>(
//   table: "grammar_lessons" | "kanji_lessons",
// ): Promise<T[]> {
//   const supabase = createClient();
//   if (!supabase) return [];
//   const { data, error } = await supabase
//     .from(table)
//     .select("*")
//     .order("created_at", { ascending: false });
//   return !error && data ? (data as T[]) : [];
// }
export async function getAdminContent<T>(
  table: "grammar_lessons" | "kanji_lessons",
): Promise<T[]> {
  const supabase = await createServerSupabase();

  if (!supabase) return [];

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin content fetch error:", error.message);
    return [];
  }

  return (data ?? []) as T[];
}