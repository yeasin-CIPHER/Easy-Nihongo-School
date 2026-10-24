
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex min-h-[72px] items-center justify-between gap-3 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-vermilion text-xl font-bold text-white">
            日
          </span>

          <span>
            <span className="block text-sm font-extrabold tracking-tight">
              Easy Nihongo School
            </span>
            <span className="block text-[10px] tracking-[.16em] text-stone-500">
              LEARN JAPANESE, SIMPLY
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-semibold sm:gap-5">
          <Link
            className="btn text-stone-600 hover:text-vermilion"
            href="/grammar"
          >
            Grammar <span aria-hidden>↗</span>
          </Link>

          <Link
            className=" btn1 text-stone-500 hover:text-vermilion"
            href="/kanji"
          >
            Kanji <span aria-hidden>↗</span>
          </Link>

          <Link
            className="btn text-stone-500 hover:text-vermilion "
            href="/vocabulary"
          >
            Vocabulary <span aria-hidden>↗</span>
          </Link>

          {/* <Link className="btn " href="/grammar">
            শুরু করো 
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
