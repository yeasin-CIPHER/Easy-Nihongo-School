import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrammar } from "@/lib/content";
// export async function generateStaticParams(){return (await getGrammar()).map(x=>({slug:x.slug}));}
export default async function GrammarDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = (await getGrammar()).find((x) => x.slug === slug);
  if (!item) notFound();
  return (
    <article className="container-page max-w-4xl py-12 sm:py-16">
      <Link
        href="/grammar"
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← সব Grammar
      </Link>
      <div className="mt-8 flex items-center gap-3">
        <span className="rounded-full bg-[#f8ece8] px-3 py-1 text-xs font-extrabold text-vermilion">
          {item.level}
        </span>
        <span className="text-xs text-stone-400">GRAMMAR LESSON</span>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{item.title}</h1>
      <div className="japanese mt-7 rounded-2xl bg-white p-6 text-2xl font-bold text-vermilion shadow-soft sm:p-8">
        {item.pattern}
      </div>
      <p className="mt-6 text-lg leading-8 text-stone-600">{item.summary}</p>
      <section className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-xl font-extrabold">বাংলায় ব্যাখ্যা</h2>
        <p className="prose-bn mt-4 text-stone-600">{item.explanation_bn}</p>
        <div className="mt-6 rounded-xl bg-paper p-4">
          <p className="text-xs font-bold tracking-wider text-stone-400">
            বাক্য গঠন · FORMATION
          </p>
          <p className="japanese mt-2 text-lg font-semibold">
            {item.formation}
          </p>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-extrabold">উদাহরণ বাক্য</h2>
        <div className="mt-4 space-y-4">
          {item.examples?.map((example, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-white p-5 sm:p-6"
            >
              <span className="text-xs font-bold text-stone-400">
                EXAMPLE {String(i + 1).padStart(2, "0")}
              </span>
              <p className="japanese mt-3 text-xl font-semibold sm:text-2xl">
                {example.japanese}
              </p>
              <p className="japanese mt-2 text-sm text-stone-500">
                {example.reading}
              </p>
              <p className="mt-3 border-t border-line pt-3 text-sm font-semibold text-moss">
                {example.meaning_bn}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-10">
        <Link href="/grammar" className="btn-secondary">
          ← Grammar তালিকায় ফিরুন
        </Link>
      </div>
    </article>
  );
}
