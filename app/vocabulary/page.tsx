import type { Metadata } from "next";
import Link from "next/link";
import { getVocabulary } from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Japanese Vocabulary | Easy Nihongo School",
  description: "Choose a JLPT level and learn Japanese vocabulary.",
};

export const dynamic = "force-dynamic";

const levels = [
  { name: "N5", description: "Beginner · Basic Japanese" },
  { name: "N4", description: "Elementary Japanese" },
  { name: "N3", description: "Intermediate Japanese" },
  { name: "N2", description: "Upper-intermediate Japanese" },
  { name: "N1", description: "Advanced Japanese" },
];

export default async function VocabularyPage() {
  const words = await getVocabulary();

  return (
    <section className="container-page py-12 sm:py-16">
      <p className="eyebrow">語彙 · VOCABULARY LIBRARY</p>

      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Japanese Vocabulary
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-stone-600">
        প্রথমে JLPT Level নির্বাচন করো। এরপর Lesson অনুযায়ী
        Japanese vocabulary, বাংলা অর্থ, reading ও উদাহরণ শিখো।
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
          N5–N1
        </span>
        <span className="rounded-full border border-line px-4 py-2 text-sm text-stone-600">
          {words.length}টি প্রকাশিত শব্দ
        </span>
      </div>

      <h2 className="mt-12 text-2xl font-extrabold">
        Select Your Level
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => {
          const count = words.filter(
            (word) => word.level === level.name
          ).length;

          return (
            <Link
              key={level.name}
              href={`/vocabulary/${level.name}`}
              className="card group flex min-h-40 flex-col p-6 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#f8ece8] px-4 py-2 text-sm font-extrabold text-vermilion">
                  {level.name}
                </span>
                <span className="text-stone-400 transition group-hover:translate-x-1 group-hover:text-vermilion">
                  ↗
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {level.name} Vocabulary
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                {level.description}
              </p>

              <p className="mt-auto pt-4 text-sm font-semibold">
                {count}টি শব্দ · শুরু করো →
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}