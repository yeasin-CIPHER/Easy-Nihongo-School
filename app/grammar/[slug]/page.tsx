
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrammar } from "@/lib/content";

export default async function GrammarDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = (await getGrammar()).find((x) => x.slug === slug);
  if (!item) notFound();

  return (
    <article className="container-page max-w-4xl py-7 sm:py-10">
      <Link
        href="/grammar"
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← সব Grammar
      </Link>

      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full bg-[#f8ece8] px-2.5 py-1 text-xs font-extrabold text-vermilion">
          {item.level}
        </span>
        <span className="text-xs text-stone-400">GRAMMAR LESSON</span>
      </div>

      <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
        {item.title}
      </h1>

      <div className="japanese mt-4 break-words rounded-xl bg-white p-4 text-xl font-bold text-vermilion shadow-soft sm:p-5">
        {item.pattern}
      </div>

      <p className="mt-3 text-base leading-7 text-stone-600">
        {item.summary}
      </p>

      <section className="mt-5 rounded-xl border border-line bg-white p-4 sm:p-5">
        <h2 className="text-lg font-extrabold">বাংলায় ব্যাখ্যা</h2>

        <p className="prose-bn mt-2 text-sm text-stone-600">
          {item.explanation_bn}
        </p>

        <div className="mt-4 rounded-lg bg-paper p-3">
          <p className="text-[11px] font-bold tracking-wider text-stone-400">
            বাক্য গঠন · FORMATION
          </p>
          <p className="japanese mt-1.5 text-base font-semibold">
            {item.formation}
          </p>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-xl font-extrabold">উদাহরণ বাক্য</h2>

        <div className="mt-3 space-y-3">
          {item.examples?.map((example, i) => (
            <div
              key={i}
              className="rounded-xl border border-line bg-white p-3 sm:p-4"
            >
              <span className="text-[11px] font-bold text-stone-400">
                EXAMPLE {String(i + 1).padStart(2, "0")}
              </span>

              <p className="japanese mt-2 text-lg font-semibold sm:text-xl">
                {example.japanese}
              </p>

              <p className="japanese mt-1 text-sm text-stone-500">
                {example.reading}
              </p>

              <p className="mt-2 border-t border-line pt-2 text-sm font-semibold text-moss">
                {example.meaning_bn}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <Link href="/grammar" className="btn-secondary">
          ← Grammar তালিকায় ফিরুন
        </Link>
      </div>
    </article>
  );
}
