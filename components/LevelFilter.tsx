"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const levels = ["All", "N5", "N4", "N3", "N2", "N1"];

type Item = {
  id: string;
  slug?: string | null;
  level: string;
  title?: string | null;
  pattern?: string | null;
  summary?: string | null;
  character?: string | null;
  meaning_bn?: string | null;
  meaning_en?: string | null;
  onyomi?: string | null;
  kunyomi?: string | null;
  word?: string | null;
  reading?: string | null;
  part_of_speech?: string | null;
  example_japanese?: string | null;
  example_reading?: string | null;
  example_meaning_bn?: string | null;
};

export default function LevelFilter({
  items,
  type,
}: {
  items: Item[];
  type: "grammar" | "kanji" | "vocabulary";
}) {
  const [level, setLevel] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (level === "All" || item.level === level) &&
          JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
      ),
    [items, level, query],
  );

  const searchPlaceholder =
    type === "grammar"
      ? "ব্যাকরণ বা pattern খুঁজুন..."
      : type === "kanji"
        ? "Kanji বা অর্থ খুঁজুন..."
        : "শব্দ, অর্থ বা reading খুঁজুন...";

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search lessons</span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
            ⌕
          </span>
          <input
            className="field !rounded-full !py-3 !pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-full border px-4 py-2 text-sm font-bold ${
                level === l
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-stone-600 hover:border-stone-400"
              }`}
            >
              {l === "All" ? "সব লেভেল" : l}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-stone-500">
        {filtered.length}টি {type === "vocabulary" ? "শব্দ" : "lesson"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-line bg-white p-12 text-center text-stone-500">
          কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ বা level দিয়ে চেষ্টা করো।
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item) => (
            <Link
              key={item.id}
              // href={item.slug ? `/${type}/${item.slug}` : `/${type}/${item.id}`}
              href={
                type === "kanji"
                  ? `/kanji/${item.slug || item.id}`
                  : item.slug
                    ? `/${type}/${item.slug}`
                    : `/${type}/${item.id}`
              }
              className={`card group flex flex-col p-3 transition hover:-translate-y-1 ${
                type === "kanji" ? "min-h-36" : "min-h-48 p-5"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#f8ece8] px-3 py-1 text-xs font-extrabold text-vermilion">
                  {item.level}
                </span>
                <span className="text-stone-400 transition group-hover:translate-x-1 group-hover:text-vermilion">
                  ↗
                </span>
              </div>

              {type === "grammar" ? (
                <>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="japanese mt-2 text-xl font-semibold text-vermilion">
                    {item.pattern}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
                    {item.summary}
                  </p>
                </>
              ) : type === "kanji" ? (
                <>
                  <p className="japanese mt-3 text-5xl font-semibold">
                    {item.character}
                  </p>
                  <h3 className="mt-3 font-bold">{item.meaning_bn}</h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {item.meaning_en} · 音 {item.onyomi || "—"}
                  </p>
                </>
              ) : (
                <>
                  <p className="japanese mt-4 text-3xl font-semibold text-vermilion">
                    {item.word}
                  </p>
                  <p className="japanese mt-1 text-sm text-stone-500">
                    {item.reading}
                  </p>
                  <h3 className="mt-3 font-bold">{item.meaning_bn}</h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {item.meaning_en || ""}
                    {item.part_of_speech ? ` · ${item.part_of_speech}` : ""}
                  </p>
                  {item.example_japanese && (
                    <p className="japanese mt-3 line-clamp-2 text-sm leading-6">
                      {item.example_japanese}
                    </p>
                  )}
                  {item.example_meaning_bn && (
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-500">
                      {item.example_meaning_bn}
                    </p>
                  )}
                </>
              )}

              <span className="mt-auto pt-5 text-sm font-bold text-ink">
                পাঠ শুরু করো <span className="text-vermilion">→</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

// Added new grammer system


// // "use client";

// // import { useMemo, useState } from "react";
// // import Link from "next/link";

// // const levels = ["N5", "N4", "N3", "N2", "N1"];

// // type Item = {
// //   id: string;
// //   slug?: string | null;
// //   level: string;
// //   title?: string | null;
// //   pattern?: string | null;
// //   summary?: string | null;
// //   character?: string | null;
// //   meaning_bn?: string | null;
// //   meaning_en?: string | null;
// //   onyomi?: string | null;
// //   kunyomi?: string | null;
// //   word?: string | null;
// //   reading?: string | null;
// //   part_of_speech?: string | null;
// //   example_japanese?: string | null;
// //   example_reading?: string | null;
// //   example_meaning_bn?: string | null;
// // };

// // export default function LevelFilter({
// //   items,
// //   type,
// // }: {
// //   items: Item[];
// //   type: "grammar" | "kanji" | "vocabulary";
// // }) {
// //   const [level, setLevel] = useState<string | null>(null);
// //   const [query, setQuery] = useState("");

// //   const levelItems = useMemo(
// //     () =>
// //       items.filter((item) =>
// //         JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
// //       ),
// //     [items, query],
// //   );

// //   const filtered = useMemo(
// //     () => levelItems.filter((item) => item.level === level),
// //     [levelItems, level],
// //   );

// //   // Grammar: first show JLPT levels, then lessons.
// //   if (type === "grammar" && !level) {
// //     return (
// //       <section className="mt-8">

// //         {/* grammer level searchbar */}
// //         {/* <label className="relative block">
// //           <span className="sr-only">Search grammar</span>
// //           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
// //             ⌕
// //           </span>
// //           <input
// //             className="field !rounded-full !py-3 !pl-10"
// //             value={query}
// //             onChange={(e) => setQuery(e.target.value)}
// //             placeholder="ব্যাকরণ বা pattern খুঁজুন..."
// //           />
// //         </label> */}

// //         <h2 className="mt-8 text-2xl font-extrabold">JLPT Level নির্বাচন করো</h2>
// //         <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
// //           {levels.map((l) => {
// //             const count = levelItems.filter((item) => item.level === l).length;

// //             return (
// //               <button
// //                 key={l}
// //                 onClick={() => setLevel(l)}
// //                 className="card group p-6 text-left transition hover:-translate-y-1 hover:border-vermilion"
// //               >
// //                 <span className="text-3xl font-extrabold text-vermilion">
// //                   {l}
// //                 </span>
// //                 <p className="mt-3 font-bold">
// //                   {count}টি Lesson
// //                 </p>
// //                 <p className="mt-2 text-sm text-stone-500">
// //                   Grammar শিখতে শুরু করো →
// //                 </p>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </section>
// //     );
// //   }

// //   const searchPlaceholder =
// //     type === "grammar"
// //       ? "ব্যাকরণ বা pattern খুঁজুন..."
// //       : type === "kanji"
// //         ? "Kanji বা অর্থ খুঁজুন..."
// //         : "শব্দ, অর্থ বা reading খুঁজুন...";

// //   return (
// //     <>
// //       {type === "grammar" && (
// //         <button
// //           onClick={() => {
// //             setLevel(null);
// //             setQuery("");
// //           }}
// //           className="mt-8 text-sm font-bold text-stone-500 hover:text-vermilion"
// //         >
// //           ← সব JLPT Level
// //         </button>
// //       )}

// //       <div className="mt-6 flex flex-col gap-3 sm:flex-row">
// //         <label className="relative flex-1">
// //           <span className="sr-only">Search lessons</span>
// //           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
// //             ⌕
// //           </span>
// //           <input
// //             className="field !rounded-full !py-3 !pl-10"
// //             value={query}
// //             onChange={(e) => setQuery(e.target.value)}
// //             placeholder={searchPlaceholder}
// //           />
// //         </label>

// //         {type !== "grammar" && (
// //           <div className="flex flex-wrap gap-2">
// //             {["All", ...levels].map((l) => (
// //               <button
// //                 key={l}
// //                 onClick={() => setLevel(l === "All" ? null : l)}
// //                 className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold"
// //               >
// //                 {l === "All" ? "সব লেভেল" : l}
// //               </button>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       <p className="mt-5 text-sm text-stone-500">
// //         {type === "grammar"
// //           ? filtered.length
// //           : items.filter(
// //               (item) =>
// //                 (!level || item.level === level) &&
// //                 JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
// //             ).length}
// //         টি {type === "vocabulary" ? "শব্দ" : "lesson"}
// //       </p>

// //       {filtered.length === 0 ? (
// //         <div className="mt-5 rounded-2xl border border-dashed border-line bg-white p-12 text-center text-stone-500">
// //           কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ বা level দিয়ে চেষ্টা করো।
// //         </div>
// //       ) : (
// //         <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
// //           {filtered.map((item) => (
// //             <Link
// //               key={item.id}
// //               href={
// //                 type === "kanji"
// //                   ? `/kanji/${item.slug || item.id}`
// //                   : item.slug
// //                     ? `/${type}/${item.slug}`
// //                     : `/${type}/${item.id}`
// //               }
// //               className={`card group flex flex-col p-5 transition hover:-translate-y-1 ${
// //                 type === "kanji" ? "min-h-36 p-3" : "min-h-48"
// //               }`}
// //             >
// //               <div className="flex items-center justify-between">
// //                 <span className="rounded-full bg-[#f8ece8] px-3 py-1 text-xs font-extrabold text-vermilion">
// //                   {item.level}
// //                 </span>
// //                 <span className="text-stone-400 group-hover:text-vermilion">
// //                   ↗
// //                 </span>
// //               </div>

// //               {type === "grammar" ? (
// //                 <>
// //                   <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
// //                   <p className="japanese mt-2 text-xl font-semibold text-vermilion">
// //                     {item.pattern}
// //                   </p>
// //                   <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
// //                     {item.summary}
// //                   </p>
// //                 </>
// //               ) : type === "kanji" ? (
// //                 <>
// //                   <p className="japanese mt-3 text-5xl font-semibold">
// //                     {item.character}
// //                   </p>
// //                   <h3 className="mt-3 font-bold">{item.meaning_bn}</h3>
// //                   <p className="mt-1 text-sm text-stone-500">
// //                     {item.meaning_en} · 音 {item.onyomi || "—"}
// //                   </p>
// //                 </>
// //               ) : (
// //                 <>
// //                   <p className="japanese mt-4 text-3xl font-semibold text-vermilion">
// //                     {item.word}
// //                   </p>
// //                   <p className="japanese mt-1 text-sm text-stone-500">
// //                     {item.reading}
// //                   </p>
// //                   <h3 className="mt-3 font-bold">{item.meaning_bn}</h3>
// //                   <p className="mt-1 text-sm text-stone-500">
// //                     {item.meaning_en || ""}
// //                     {item.part_of_speech
// //                       ? ` · ${item.part_of_speech}`
// //                       : ""}
// //                   </p>
// //                   {item.example_japanese && (
// //                     <p className="japanese mt-3 line-clamp-2 text-sm leading-6">
// //                       {item.example_japanese}
// //                     </p>
// //                   )}
// //                   {item.example_meaning_bn && (
// //                     <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-500">
// //                       {item.example_meaning_bn}
// //                     </p>
// //                   )}
// //                 </>
// //               )}

// //               <span className="mt-auto pt-5 text-sm font-bold text-ink">
// //                 পাঠ শুরু করো <span className="text-vermilion">→</span>
// //               </span>
// //             </Link>
// //           ))}
// //         </div>
// //       )}
// //     </>
// //   );
// // }
