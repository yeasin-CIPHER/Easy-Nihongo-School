
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ level: string }>;
};

const validLevels = ["N5", "N4", "N3", "N2", "N1"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level: rawLevel } = await params;
  const level = rawLevel.toUpperCase();

  return {
    title: `${level} Grammar Lessons | Easy Nihongo School`,
  };
}

export default async function GrammarLevelPage({ params }: Props) {
  const { level: rawLevel } = await params;
  const level = rawLevel.toUpperCase();

  if (!validLevels.includes(level)) notFound();

  return (
    <section className="container-page py-12 sm:py-16">
      <Link
        href="/grammar"
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← সব JLPT Level
      </Link>

      <p className="eyebrow mt-8">文法 · {level} GRAMMAR</p>

      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
        JLPT {level} Lessons
      </h1>

      <p className="mt-4 text-stone-600">
        {level}-এর ২৫টি Grammar lesson ধাপে ধাপে শিখো।
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 25 }, (_, i) => {
          const number = i + 1;

          return (
            <Link
              key={number}
              href={`/grammar/level/${level}/lesson/${number}`}
              className="card group flex min-h-32 flex-col p-3 transition hover:-translate-y-1 hover:border-vermilion"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#f8ece8] px-3 py-1 text-xs font-extrabold text-vermilion">
                  {level}
                </span>

                <span className="text-sm font-bold text-stone-400">
                  {String(number).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mt-5 text-lg font-extrabold">
                Lesson {number}
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Grammar lesson {number} শিখতে ক্লিক করো।
              </p>

              <span className="mt-auto pt-2 text-sm font-bold">
                Lesson পড়ো →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
