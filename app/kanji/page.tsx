import type { Metadata } from "next";
import { getKanji } from "@/lib/content";
import LevelFilter from "@/components/LevelFilter";
export const metadata: Metadata = { title: "Japanese Kanji Lessons" };
export default async function KanjiPage() {
  const lessons = await getKanji();
  return (
    <section className="container-page py-12 sm:py-16">
      <p className="eyebrow">漢字 · KANJI LIBRARY</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Japanese Kanji
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-stone-600">
        Kanji-এর অর্থ, Onyomi, Kunyomi এবং উদাহরণ শব্দ শিখো—JLPT লেভেল অনুযায়ী।
      </p>
      <LevelFilter items={lessons} type="kanji" />
    </section>
  );
}
