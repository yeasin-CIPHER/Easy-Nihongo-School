import Link from "next/link";
import {
  BookOpen,
  Languages,
  ArrowUpRight,
  Leaf,
  BookText,
} from "lucide-react";
import { getGrammar, getKanji } from "@/lib/content";
export default async function Home() {
  const [grammar, kanji] = await Promise.all([getGrammar(), getKanji()]);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <p className="eyebrow">YOUR JAPANESE LEARNING JOURNEY</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              জাপানি শেখা হোক <span className="text-vermilion">সহজ</span> ও
              আনন্দের।
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">
              বাংলায় বুঝে বুঝে শিখুন Japanese Grammar ও Kanji। একদম বেসিক থেকে
              JLPT-এর প্রতিটি লেভেল পর্যন্ত, নিজের গতিতে।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-secondary" href="/grammar">
                Grammar বুঝি <ArrowUpRight size={16} />
              </Link>

              <Link className="btn-secondary" href="/kanji">
                Kanji দেখি <ArrowUpRight size={16}/>
              </Link>

              <Link className="btn-secondary" href="/vocabulary">
                Vocabulary শিখি <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-5 text-sm text-stone-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-moss" />
                N5 থেকে N1
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-vermilion" />
                বাংলা ব্যাখ্যা
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                ফ্রি শেখা
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#f4e0d9]" />
            <div className="absolute -bottom-4 -left-5 h-24 w-24 rounded-full bg-[#e5ecdf]" />
            <div className="relative rounded-[28px] border border-line bg-white p-5 shadow-soft sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[.15em] text-stone-400">
                  TODAY'S STUDY
                </span>
                <span className="rounded-full bg-[#e8efe5] px-3 py-1 text-xs font-bold text-moss">
                  はじめましょう
                </span>
              </div>
              <div className="mt-6 rounded-2xl bg-paper p-6 text-center">
                <p className="japanese text-7xl font-medium">日本語</p>
                <p className="mt-3 text-sm text-stone-500">
                  にほんご · Nihongo
                </p>
                <p className="mt-2 font-bold">জাপানি ভাষা</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line p-4">
                  <BookOpen className="text-vermilion" size={20} />
                  <p className="mt-3 text-sm font-bold">Grammar</p>
                  <p className="mt-1 text-xs text-stone-500">
                    {grammar.length}টি lesson
                  </p>
                </div>
                <div className="rounded-2xl border border-line p-4">
                  <Languages className="text-moss" size={20} />
                  <p className="mt-3 text-sm font-bold">Kanji</p>
                  <p className="mt-1 text-xs text-stone-500">
                    {kanji.length}টি character
                  </p>
                </div>
                <div className="rounded-2xl border border-line p-4">
                  <Languages className="vermilion" size={20} />
                  <p className="mt-3 text-sm font-bold">vocabulary</p>
                  <p className="mt-1 text-xs text-stone-500">
                    Japanese Word
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-white py-14">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">START LEARNING</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                আজ কী শিখবে?
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-stone-500">
              ছোট ছোট ধাপে এগিয়ে চলো। তোমার বর্তমান লেভেল বেছে নিয়ে শেখা শুরু
              করো।
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/grammar"
              className="card flex items-start gap-5 p-6 sm:p-8"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f8ece8] text-vermilion">
                <BookOpen size={25} />
              </span>
              <div className="flex-1">
                <span className="eyebrow">文法 · GRAMMAR</span>
                <h3 className="mt-2 text-xl font-extrabold">Grammar lessons</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  ব্যাকরণ, গঠন, উদাহরণ এবং সহজ বাংলা ব্যাখ্যা।
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  সব Grammar দেখো <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
            <Link
              href="/kanji"
              className="card flex items-start gap-5 p-6 sm:p-8"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e8efe5] text-moss">
                <Leaf size={25} />
              </span>
              <div className="flex-1">
                <span className="eyebrow">漢字 · KANJI</span>
                <h3 className="mt-2 text-xl font-extrabold">Kanji lessons</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  অর্থ, Onyomi, Kunyomi ও ব্যবহারিক শব্দ শিখো।
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  সব Kanji দেখো <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
            <Link
              href="/vocabulary"
              className="card flex items-start gap-5 p-6 sm:p-8"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f8ece8] text-vermilion">
                <BookText size={25} />
              </span>

              <div className="flex-1">
                <span className="eyebrow">語彙 · VOCABULARY</span>
                <h3 className="mt-2 text-xl font-extrabold">
                  Vocabulary lessons
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  জাপানি শব্দ, উচ্চারণ, বাংলা অর্থ এবং উদাহরণ বাক্য শিখো।
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  সব Vocabulary দেখো <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="container-page py-14">
        <div className="rounded-3xl bg-ink p-7 text-white sm:p-10">
          <p className="text-xs font-bold tracking-[.18em] text-[#e9a294]">
            YOUR PACE, YOUR PROGRESS
          </p>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-extrabold">
                一歩ずつ — এক ধাপ করে।
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                নিয়মিত অল্প অল্প করে শেখাই সবচেয়ে ভালো অভ্যাস।
              </p>
            </div>
            <Link href="/grammar" className="btn !bg-white !text-ink">
              শেখা শুরু করো <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
