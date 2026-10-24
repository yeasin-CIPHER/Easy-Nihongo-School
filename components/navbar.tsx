
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-line bg-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-xl font-extrabold">
          Easy <span className="text-vermilion">Nihongo</span>
        </Link>

        <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
          <Link href="/grammar">Grammar</Link>
          <Link href="/kanji">Kanji</Link>
          <Link href="/vocabulary">Vocabulary</Link>
        </div>
      </div>
    </nav>
  );
}
