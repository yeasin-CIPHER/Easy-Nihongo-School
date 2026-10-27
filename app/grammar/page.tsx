// import type { Metadata } from "next";
// import { getGrammar } from "@/lib/content";
// import LevelFilter from "@/components/LevelFilter";
// export const metadata: Metadata = { title: "Japanese Grammar Lessons" };
// export default async function GrammarPage() {
//   const lessons = await getGrammar();
//   return (
//     <section className="container-page py-12 sm:py-16">
//       <p className="eyebrow">文法 · GRAMMAR LIBRARY</p>
//       <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
//         Japanese Grammar
//       </h1>
//       <p className="mt-4 max-w-2xl leading-7 text-stone-600">
//         N5 থেকে N1 পর্যন্ত grammar pattern, বাংলা ব্যাখ্যা এবং বাস্তব উদাহরণ
//         দিয়ে জাপানি ব্যাকরণ শিখো।
//       </p>
//       <LevelFilter items={lessons} type="grammar" />
//     </section>
//   );
// }

import type { Metadata } from "next";
import Link from "next/link";
import { getGrammar } from "@/lib/content";

export const metadata: Metadata = {
  title: "Japanese Grammar | Easy Nihongo School",
};

const levels = ["N5", "N4", "N3", "N2", "N1"];

export default async function GrammarPage() {
  const lessons = await getGrammar();

  return (
    <section className="container-page py-12 sm:py-16">
      <p className="eyebrow">文法 · GRAMMAR LIBRARY</p>

      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Japanese Grammar
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-stone-600">
        N5 থেকে N1 পর্যন্ত জাপানি Grammar বাংলায় শিখো।
        তোমার JLPT level নির্বাচন করো।
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {levels.map((level) => {
          const count = lessons.filter(
            (item) => item.level === level
          ).length;

          return (
            <Link
              key={level}
              href={`/grammar/level/${level}`}
              className="card group p-6 transition hover:-translate-y-1 hover:border-vermilion"
            >
              <p className="text-3xl font-extrabold text-vermilion">
                {level}
              </p>

              <p className="mt-3 font-bold">
                {count}টি Lesson
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Grammar শিখতে শুরু করো →
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
