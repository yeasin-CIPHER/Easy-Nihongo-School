import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrammar } from "@/lib/content";

export const dynamic = "force-dynamic";

const validLevels = ["N5", "N4", "N3", "N2", "N1"];

export default async function GrammarLessonPage({
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

  const allGrammar = await getGrammar();

  const grammarList = allGrammar
    .filter(
      (item) =>
        item.level?.trim().toUpperCase() === level &&
        Number(item.lesson_number) === lessonNumber,
    )
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="container-page py-12 sm:py-16">
      <Link
        href={`/grammar/level/${level}`}
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← সব {level} Lesson
      </Link>

      <p className="eyebrow mt-6">文法 · {level} GRAMMAR</p>

      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
        Lesson {lessonNumber}
      </h1>

      <p className="mt-4 text-stone-600">এর Grammar Pattern শিখো।</p>

      <p className="mt-5 text-sm text-stone-500">
        মোট {grammarList.length}টি Grammar Pattern
      </p>

      {grammarList.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {grammarList.map((item, index) => (
            <Link
              key={item.id}
              href={`/grammar/${item.slug}`}
              className="card group flex min-h-40 flex-col p-3 transition hover:-translate-y-1 sm:p-4"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#f8ece8] px-2.5 py-1 text-[11px] font-extrabold text-vermilion">
                  {level}
                </span>

                <span className="text-sm text-stone-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mt-3 text-base font-extrabold leading-6 transition-colors group-hover:text-vermilion">
                {item.title}
              </h2>

              <p className="japanese mt-2 text-xl font-bold text-vermilion">
                {item.pattern}
              </p>

              <p className="mt-2 line-clamp-3 text-sm leading-5 text-stone-500">
                {item.summary}
              </p>

              <span className="mt-auto pt-4 text-xs font-bold">
                বিস্তারিত পড়ো →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <h2 className="text-lg font-bold">
            এই Lesson-এ এখনো Grammar যোগ করা হয়নি।
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Supabase-এ {level} এবং Lesson {lessonNumber} দিয়ে Grammar যোগ করো।
          </p>
        </div>
      )}
    </section>
  );
}
