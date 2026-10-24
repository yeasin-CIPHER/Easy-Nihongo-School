
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVocabulary } from "@/lib/vocabulary";

export const dynamic = "force-dynamic";

const validLevels = ["N5", "N4", "N3", "N2", "N1"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string; lesson: string }>;
}): Promise<Metadata> {
  const { level, lesson } = await params;

  return {
    title: `${level} Lesson ${lesson} Vocabulary | Easy Nihongo School`,
  };
}

export default async function VocabularyLessonPage({
  params,
}: {
  params: Promise<{ level: string; lesson: string }>;
}) {
  const { level: rawLevel, lesson: rawLesson } = await params;
  const level = rawLevel.toUpperCase();
  const lessonNumber = Number(rawLesson);

  if (
    !validLevels.includes(level) ||
    !Number.isInteger(lessonNumber) ||
    lessonNumber < 1 ||
    lessonNumber > 25
  ) {
    notFound();
  }

  const allWords = await getVocabulary();

  const words = allWords
    .filter(
      (word) =>
        word.level === level &&
        word.lesson_number === lessonNumber
    )
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="container-page py-12 sm:py-16">
      <Link
        href={`/vocabulary/${level}`}
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← সব {level} Lesson
      </Link>

      <p className="eyebrow mt-6">語彙 · {level} VOCABULARY</p>

      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
        Lesson {lessonNumber}
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-stone-600">
        Japanese word, reading, বাংলা অর্থ এবং উদাহরণ বাক্য অনুশীলন করো।
      </p>

      <p className="mt-5 text-sm text-stone-500">
        মোট {words.length}টি শব্দ
      </p>

      {words.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {words.map((word) => (
            <Link
              key={word.id}
              href={`/vocabulary/word/${word.id}`}
              className="card flex min-h-40 flex-col p-3 sm:p-4 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#f8ece8] px-2.5 py-1 text-[11px] font-extrabold text-vermilion">
                  {level}
                </span>
                <span className="text-sm text-stone-400">↗</span>
              </div>

              <h2 className="japanese mt-3 text-2xl font-bold text-vermilion">
                {word.word}
              </h2>

              <p className="mt-2 text-sm font-bold leading-5">
                {word.meaning_bn}
              </p>

              {word.meaning_en && (
                <p className="mt-1 text-xs text-stone-500">
                  {word.meaning_en}
                  {word.part_of_speech ? ` · ${word.part_of_speech}` : ""}
                </p>
              )}

              {word.example_japanese && (
                <p className="japanese mt-3 text-sm leading-5">
                  {word.example_japanese}
                </p>
              )}

              {word.example_meaning_bn && (
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  {word.example_meaning_bn}
                </p>
              )}

              <span className="mt-auto pt-4 text-xs font-bold">
                বিস্তারিত দেখো →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <h2 className="text-lg font-bold">
            এই Lesson-এ এখনো কোনো শব্দ নেই।
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Supabase-এর vocabulary table-এ {level} এবং Lesson {lessonNumber}
            দিয়ে শব্দ যোগ করো।
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {lessonNumber > 1 && (
          <Link
            href={`/vocabulary/${level}/lesson/${lessonNumber - 1}`}
            className="rounded-full border border-line px-5 py-3 text-sm font-bold"
          >
            ← আগের Lesson
          </Link>
        )}

        {lessonNumber < 25 && (
          <Link
            href={`/vocabulary/${level}/lesson/${lessonNumber + 1}`}
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
          >
            পরের Lesson →
          </Link>
        )}
      </div>
    </section>
  );
}
