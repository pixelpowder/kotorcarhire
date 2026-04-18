// Translate every key that's still English-identical in a locale file,
// or missing from it. Uses the gap report from full-translation-audit.mjs.
// Processes in batches to fit Claude's context and keep cost low.

import fs from "node:fs";
import path from "node:path";

// Load .env — check both this repo and sibling hercegnovidirectory
for (const f of [".env.local", ".env", "../hercegnovidirectory/.env.local"]) {
  if (!fs.existsSync(f)) continue;
  for (const line of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error("ANTHROPIC_API_KEY missing"); process.exit(1); }

const MODEL = "claude-haiku-4-5";
const LOCALES_DIR = "src/i18n/locales";
const BATCH_SIZE = 40; // keys per Claude call

const LOCALE_NAMES = {
  de: "German (Deutsch)",
  fr: "French (français)",
  it: "Italian (italiano)",
  ru: "Russian (Русский)",
  me: "Montenegrin (Crnogorski, LATIN script)",
};

const SYSTEM = (locale) => `Translate these English values into ${LOCALE_NAMES[locale]} for a car rental website covering Kotor, Budva, Tivat, Perast, Herceg Novi, Podgorica and the Bay of Kotor.

Rules:
- Preserve ALL proper nouns: place names (Kotor, Tivat, Budva, Perast, Lovćen, Dubrovnik, Herceg Novi, Podgorica, Debeli Brijeg, Tabacina, Sveti Stefan, Njegos, Bay of Kotor, Adriatic), historical periods (Austro-Hungarian, Ottoman, Venetian), and brand names (Kotor Car Rental, UNESCO, Green Card).
- Preserve ALL numbers, dates, currency (€25, €13/day), distances (15 min, 12 km, 1,000 metres).
- Preserve HTML-like tokens if present (e.g. <br>, <strong>).
- NO em-dashes (—) or en-dashes (–). Use commas, colons, periods.
- Translate IDIOMATICALLY, not literally.

Input: a JSON object where keys are translation paths and values are English strings.
Output: the SAME keys with translated values. JSON only, no preamble, no markdown fences.`;

async function translateBatch(locale, batch) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM(locale),
      messages: [{ role: "user", content: JSON.stringify(batch) }],
    }),
  });
  if (!res.ok) throw new Error(`Claude ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  let text = (data.content?.[0]?.text || "").trim();
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "");
  return JSON.parse(text);
}

// Flatten / unflatten helpers
function flatten(obj, prefix = "", out = {}) {
  for (const k in obj) {
    const key = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
function setDeep(obj, dottedKey, val) {
  const keys = dottedKey.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = val;
}

// Load report
const report = JSON.parse(fs.readFileSync("scripts/translation-gap-report.json", "utf8"));
const enJson = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, "en.json"), "utf8"));
const enFlat = flatten(enJson);

const targetArg = process.argv[2]; // optional: only run one locale
const locales = targetArg ? [targetArg] : ["de", "fr", "it", "ru", "me"];

for (const locale of locales) {
  const gapsMissing = report.missing[locale] || [];
  const gapsCopied = report.englishCopied[locale] || [];
  const gaps = [...new Set([...gapsMissing, ...gapsCopied])];
  if (gaps.length === 0) {
    console.log(`${locale}: nothing to fill`);
    continue;
  }
  console.log(`${locale}: ${gaps.length} keys to translate (${gapsMissing.length} missing + ${gapsCopied.length} English-identical)`);
  const target = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, `${locale}.json`), "utf8"));

  // Batch the keys
  for (let i = 0; i < gaps.length; i += BATCH_SIZE) {
    const keys = gaps.slice(i, i + BATCH_SIZE);
    const batch = {};
    for (const k of keys) if (enFlat[k] !== undefined) batch[k] = enFlat[k];
    if (Object.keys(batch).length === 0) continue;
    try {
      process.stdout.write(`  batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(gaps.length / BATCH_SIZE)}... `);
      const translated = await translateBatch(locale, batch);
      for (const [k, v] of Object.entries(translated)) {
        if (typeof v === "string") setDeep(target, k, v);
      }
      // Write after every batch in case of crash
      fs.writeFileSync(path.join(LOCALES_DIR, `${locale}.json`), JSON.stringify(target, null, 2) + "\n", "utf8");
      console.log("✓");
    } catch (e) {
      console.error("✗", e.message);
    }
  }
  console.log(`${locale}: done`);
}

console.log("\nAll locale gaps filled.");
