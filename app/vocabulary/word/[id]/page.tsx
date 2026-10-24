
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVocabulary } from "@/lib/vocabulary";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const words = await getVocabulary();
  const word = words.find((item) => item.id === id);

  return {
    title: word
      ? `${word.word} | Easy Nihongo School`
      : "Vocabulary | Easy Nihongo School",
  };
}

export default async function VocabularyWordPage({
  params,
}: Props) {
  const { id } = await params;
  const words = await getVocabulary();
  const word = words.find((item) => item.id === id);

  if (!word) notFound();

  return (
    <section className="container-page py-12 sm:py-16">
      <Link
        href={`/vocabulary/${word.level}/lesson/${word.lesson_number}`}
        className="text-sm font-bold text-stone-500 hover:text-vermilion"
      >
        ← Lesson {word.lesson_number}-এ ফিরে যাও
      </Link>

      <p className="eyebrow mt-6">
        語彙 · {word.level} VOCABULARY
      </p>

      <h1 className="japanese mt-4 text-5xl font-extrabold text-vermilion">
        {word.word}
      </h1>

      <p className="japanese mt-3 text-xl text-stone-500">
        {word.reading}
      </p>

      <div className="card mt-8 max-w-2xl p-6">
        <p className="text-sm text-stone-500">বাংলা অর্থ</p>
        <h2 className="mt-2 text-2xl font-bold">
          {word.meaning_bn}
        </h2>

        {word.meaning_en && (
          <p className="mt-2 text-stone-600">
            {word.meaning_en}
          </p>
        )}

        {word.part_of_speech && (
          <p className="mt-3 text-sm text-stone-500">
            Part of speech: {word.part_of_speech}
          </p>
        )}

        {word.example_japanese && (
          <div className="mt-6 border-t border-line pt-5">
            <h3 className="font-bold">উদাহরণ বাক্য</h3>
            <p className="japanese mt-3 text-lg">
              {word.example_japanese}
            </p>

            {word.example_reading && (
              <p className="japanese mt-2 text-sm text-stone-500">
                {word.example_reading}
              </p>
            )}

            {word.example_meaning_bn && (
              <p className="mt-3 leading-7">
                {word.example_meaning_bn}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
