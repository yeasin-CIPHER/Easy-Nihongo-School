import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getAdminContent, Grammar, Kanji } from "@/lib/content";
import { deleteContent, signOut } from "./actions";
export default async function AdminPage() {
  const { user } = await requireAdmin();
  const [grammar, kanji] = await Promise.all([
    getAdminContent<Grammar>("grammar_lessons"),
    getAdminContent<Kanji>("kanji_lessons"),
  ]);
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">CONTENT MANAGEMENT</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Admin dashboard
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Logged in as {user.email}
          </p>
        </div>
        <form action={signOut}>
          <button className="btn-secondary">Sign out</button>
        </form>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="text-sm text-stone-500">Grammar lessons</p>
          <p className="mt-2 text-4xl font-extrabold">{grammar.length}</p>
          <Link className="btn mt-5" href="/admin/grammar/new">
            + Add grammar
          </Link>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="text-sm text-stone-500">Kanji entries</p>
          <p className="mt-2 text-4xl font-extrabold">{kanji.length}</p>
          <Link className="btn mt-5" href="/admin/kanji/new">
            + Add kanji
          </Link>
        </div>
      </div>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Grammar content</h2>
          <Link href="/grammar" className="text-sm font-bold text-vermilion">
            View public page ↗
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
          {grammar.length === 0 ? (
            <p className="p-6 text-sm text-stone-500">
              এখনো কোনো database lesson নেই। নতুন lesson যোগ করো। Sample lessons
              database-এ import করা হয়নি।
            </p>
          ) : (
            grammar.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 border-b border-line p-4 last:border-0 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f8ece8] px-2.5 py-1 text-xs font-bold text-vermilion">
                      {item.level}
                    </span>
                    <span className="text-xs text-stone-400">
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-2 font-bold">{item.title}</p>
                  <p className="japanese mt-1 text-sm text-stone-500">
                    {item.pattern}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    className="btn-secondary !px-3 !py-2"
                    href={`/admin/grammar/${item.id}/edit`}
                  >
                    Edit
                  </Link>
                  <form action={deleteContent}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="table" value="grammar_lessons" />
                    <button className="rounded-full border border-red-200 px-3 py-2 text-sm font-bold text-red-600">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Kanji content</h2>
          <Link href="/kanji" className="text-sm font-bold text-vermilion">
            View public page ↗
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
          {kanji.length === 0 ? (
            <p className="p-6 text-sm text-stone-500">
              এখনো কোনো database kanji নেই। নতুন entry যোগ করো।
            </p>
          ) : (
            kanji.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 border-b border-line p-4 last:border-0 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="japanese text-3xl">{item.character}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#e8efe5] px-2.5 py-1 text-xs font-bold text-moss">
                        {item.level}
                      </span>
                      <span className="text-xs text-stone-400">
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="mt-1 font-bold">
                      {item.meaning_bn} · {item.meaning_en}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    className="btn-secondary !px-3 !py-2"
                    href={`/admin/kanji/${item.id}/edit`}
                  >
                    Edit
                  </Link>
                  <form action={deleteContent}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="table" value="kanji_lessons" />
                    <button className="rounded-full border border-red-200 px-3 py-2 text-sm font-bold text-red-600">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}
