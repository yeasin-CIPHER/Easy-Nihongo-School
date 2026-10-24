import { saveGrammar, saveKanji } from "@/app/admin/actions";
type Existing = Record<string, any>;
export function GrammarForm({ item }: { item?: Existing }) {
  return (
    <form action={saveGrammar} className="space-y-5">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Lesson title"
          name="title"
          required
          defaultValue={item?.title}
        />
        <Field
          label="Slug (unique URL)"
          name="slug"
          required
          defaultValue={item?.slug}
          placeholder="wa-desu"
        />
        <div>
          <label className="mb-2 block text-sm font-bold">JLPT level</label>
          <select
            name="level"
            defaultValue={item?.level || "N5"}
            className="field"
          >
            {["N5", "N4", "N3", "N2", "N1"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <Field
          label="Sort order"
          name="sort_order"
          defaultValue={item?.sort_order ?? 0}
          type="number"
        />
      </div>
      <Field
        label="Grammar pattern"
        name="pattern"
        required
        defaultValue={item?.pattern}
        placeholder="N は N です"
      />
      <Field
        label="Short summary"
        name="summary"
        required
        defaultValue={item?.summary}
      />
      <TextField
        label="Bangla explanation"
        name="explanation_bn"
        required
        defaultValue={item?.explanation_bn}
      />
      <Field
        label="Formation / sentence structure"
        name="formation"
        defaultValue={item?.formation}
      />
      <TextField
        label="Examples (valid JSON array)"
        name="examples"
        defaultValue={JSON.stringify(
          item?.examples || [
            {
              japanese: "わたしは がくせいです。",
              reading: "わたしは がくせいです。",
              meaning_bn: "আমি একজন শিক্ষার্থী।",
            },
          ],
          null,
          2,
        )}
        hint={'Format: [{"japanese":"...","reading":"...","meaning_bn":"..."}]'}
        required
      />
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published ?? true}
        />{" "}
        Publish this lesson
      </label>
      <button className="btn">
        {item ? "Update grammar" : "Save grammar lesson"}
      </button>
    </form>
  );
}
export function KanjiForm({ item }: { item?: Existing }) {
  return (
    <form action={saveKanji} className="space-y-5">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Kanji character"
          name="character"
          required
          defaultValue={item?.character}
          placeholder="日"
        />
        <Field
          label="Slug (unique URL)"
          name="slug"
          required
          defaultValue={item?.slug}
          placeholder="日 or hi"
        />
        <div>
          <label className="mb-2 block text-sm font-bold">JLPT level</label>
          <select
            name="level"
            defaultValue={item?.level || "N5"}
            className="field"
          >
            {["N5", "N4", "N3", "N2", "N1"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <Field
          label="Sort order"
          name="sort_order"
          defaultValue={item?.sort_order ?? 0}
          type="number"
        />
        <Field
          label="Meaning in Bangla"
          name="meaning_bn"
          required
          defaultValue={item?.meaning_bn}
        />
        <Field
          label="Meaning in English"
          name="meaning_en"
          required
          defaultValue={item?.meaning_en}
        />
        <Field label="Onyomi" name="onyomi" defaultValue={item?.onyomi} />
        <Field label="Kunyomi" name="kunyomi" defaultValue={item?.kunyomi} />
      </div>
      <TextField
        label="Example vocabulary (valid JSON array)"
        name="examples"
        required
        defaultValue={JSON.stringify(
          item?.examples || [
            { word: "日本", reading: "にほん", meaning_bn: "জাপান" },
          ],
          null,
          2,
        )}
        hint={
          'Format: [{"word":"日本","reading":"にほん","meaning_bn":"জাপান"}]'
        }
      />
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published ?? true}
        />{" "}
        Publish this kanji
      </label>
      <button className="btn">{item ? "Update kanji" : "Save kanji"}</button>
    </form>
  );
}
function Field({
  label,
  name,
  required,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>
      <input
        className="field"
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}
function TextField({
  label,
  name,
  required,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>
      <textarea
        className="field min-h-28 font-mono text-sm"
        name={name}
        required={required}
        defaultValue={defaultValue}
      />
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </div>
  );
}
