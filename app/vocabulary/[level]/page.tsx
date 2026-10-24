import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVocabulary } from "@/lib/vocabulary";

const validLevels = ["N5", "N4", "N3", "N2", "N1"];

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;

  return {
    title: `${level} Vocabulary | Easy Nihongo School`,
  };
}

export default async function VocabularyLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: rawLevel } = await params;
  const level = rawLevel.toUpperCase();

  if (!validLevels.includes(level)) notFound();

  const allWords = await getVocabulary();
  const words = allWords.filter((word) => word.level === level);

  const availableLessons = [
    ...new Set(
      words
        .map((word) => word.lesson_number)
        .filter((number) => Number.isInteger(number) && number >= 1 && number <= 25)
    ),
  ].sort((a, b) => a - b);

  const lessons =
    level === "N5"
      ? Array.from({ length: 25 }, (_, index) => index + 1)
      : availableLessons;

  return (
    <section className="container-page py-12 sm:py-16">
      <Link
        href="/vocabulary"
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← সব Level
      </Link>

      <p className="eyebrow mt-6">語彙 · VOCABULARY</p>

      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
        {level} Vocabulary
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-stone-600">
        {level} Level-এর Lesson নির্বাচন করে শব্দ, reading,
        বাংলা অর্থ এবং উদাহরণ বাক্য শেখো।
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {validLevels.map((item) => (
          <Link
            key={item}
            href={`/vocabulary/${item}`}
            className={`rounded-full border px-4 py-2 text-sm font-bold ${
              item === level
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-stone-600"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-end justify-between gap-3">
        <h2 className="text-2xl font-extrabold">Lessons</h2>
        <span className="text-sm text-stone-500">
          {lessons.length}টি Lesson
        </span>
      </div>

      {lessons.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const count = words.filter(
              (word) => word.lesson_number === lesson
            ).length;

            return (
              <Link
                key={lesson}
                href={`/vocabulary/${level}/lesson/${lesson}`}
                className="card group flex min-h-36 flex-col p-5 transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#f8ece8] px-3 py-1 text-xs font-extrabold text-vermilion">
                    {level}
                  </span>
                  <span className="text-stone-400 group-hover:text-vermilion">
                    ↗
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  Lesson {lesson}
                </h3>

                <p className="mt-2 text-sm text-stone-500">
                  {count}টি শব্দ
                </p>

                <span className="mt-auto pt-4 text-sm font-bold">
                  শব্দ শেখা শুরু করো →
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <h3 className="font-bold">এখনো কোনো Lesson যোগ করা হয়নি।</h3>
          <p className="mt-2 text-sm text-stone-500">
            Supabase-এ {level} Level-এর vocabulary এবং lesson_number যোগ করো।
          </p>
        </div>
      )}
    </section>
  );
}