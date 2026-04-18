// Translate the newly-added en.json keys into the 5 other locales.
// Only touches keys that are missing in the target locale (resume-safe).

import fs from "node:fs";
import path from "node:path";

// Load .env from repo root
for (const f of [".env.local", ".env"]) {
  if (!fs.existsSync(f)) continue;
  for (const line of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

// Fall back to the hercegnovidirectory .env.local if no key here
if (!process.env.ANTHROPIC_API_KEY) {
  const hn = "../hercegnovidirectory/.env.local";
  if (fs.existsSync(hn)) {
    for (const line of fs.readFileSync(hn, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error("ANTHROPIC_API_KEY missing"); process.exit(1); }

const MODEL = "claude-haiku-4-5";
const LOCALES_DIR = "src/i18n/locales";
const TARGET_LOCALES = ["de", "fr", "it", "ru", "me"];

const LOCALE_NAMES = {
  de: "German (Deutsch)",
  fr: "French (français)",
  it: "Italian (italiano)",
  ru: "Russian (Русский)",
  me: "Montenegrin (Crnogorski, LATIN script)",
};

const SYSTEM = (locale) => `Translate JSON values from English into ${LOCALE_NAMES[locale]} for a car rental website.

Rules:
- Preserve ALL proper nouns: Kotor, Tivat, Budva, Perast, Lovćen, Njegos, Sveti Stefan, Dubrovnik, Herceg Novi, Debeli Brijeg, Tabacina, Bay of Kotor. Decline naturally but keep the names.
- Preserve currency (€25, €13/day) and distances/times (15 min, 12 km, 2 hrs).
- Preserve "KOTOR" as the uppercase hub label — do not translate.
- NO em-dashes (—) or en-dashes (–). Use commas, colons, or periods.
- Keep key names EXACTLY as-is. Only translate the string VALUES.
- Preserve JSON structure — same keys, same nesting, translated string values.

Output ONLY the translated JSON object, no markdown fences, no preamble.`;

async function translate(locale, obj) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      system: SYSTEM(locale),
      messages: [{ role: "user", content: JSON.stringify(obj) }],
    }),
  });
  if (!res.ok) throw new Error(`Claude ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  let text = (data.content?.[0]?.text || "").trim();
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "");
  return JSON.parse(text);
}

// Deep-get value at a dotted path from an object
function get(obj, keys) {
  return keys.reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}
function set(obj, keys, val) {
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = val;
}

// Collect the sub-tree from the source that's missing in target.
// Returns [path, value] pairs for each leaf that isn't in target.
function diff(source, target, path = []) {
  const diffs = [];
  for (const [k, v] of Object.entries(source)) {
    const p = [...path, k];
    const tv = get(target, [k]);
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      const sub = diff(v, (target && target[k]) || {}, p);
      diffs.push(...sub);
    } else if (target === undefined || target[k] === undefined) {
      diffs.push({ path: p, value: v });
    }
  }
  return diffs;
}

const enJson = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, "en.json"), "utf8"));

// Keys we just added — restrict translation to these to avoid reprocessing
// the rest of the file. Derived from the add-missing-i18n-keys script.
const NEW_TOP_LEVEL_KEYS = [
  "popularRoutes", "insiderTips", "experiences", "roadTripPlanner",
  "compare", "driveMap", "statsLabels", "ctaBrand",
];
const NEW_NESTED = [
  ["hero", "headlineMain"], ["hero", "headlineSub"],
  ["fleet", "browseByCategory"], ["fleet", "ourFleet"],
  ["fleet", "tabCities"], ["fleet", "tabAirports"], ["fleet", "tabScenic"],
  ["howItWorks", "stepsTitle1"], ["howItWorks", "stepsDesc1"],
  ["howItWorks", "stepsTitle2"], ["howItWorks", "stepsDesc2"],
  ["howItWorks", "stepsTitle3"], ["howItWorks", "stepsDesc3"],
];

// Build the English subset to translate
const subset = {};
for (const k of NEW_TOP_LEVEL_KEYS) if (enJson[k]) subset[k] = enJson[k];
for (const keyPath of NEW_NESTED) {
  const val = get(enJson, keyPath);
  if (val !== undefined) set(subset, keyPath, val);
}

for (const locale of TARGET_LOCALES) {
  const filePath = path.join(LOCALES_DIR, `${locale}.json`);
  const target = JSON.parse(fs.readFileSync(filePath, "utf8"));
  // Only translate what's missing in the target
  const missing = diff(subset, target);
  if (missing.length === 0) {
    console.log(`${locale}: all keys already present, skip`);
    continue;
  }
  // Build sub-subset with only missing keys so Claude translates a smaller payload
  const toTranslate = {};
  for (const { path: p, value } of missing) set(toTranslate, p, value);
  console.log(`${locale}: translating ${missing.length} new keys...`);
  try {
    const translated = await translate(locale, toTranslate);
    // Merge translated into target
    for (const { path: p } of missing) {
      const tv = get(translated, p);
      if (tv !== undefined) set(target, p, tv);
    }
    fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + "\n", "utf8");
    console.log(`  ✓ ${locale} written`);
  } catch (e) {
    console.error(`  ✗ ${locale}: ${e.message}`);
  }
}

console.log("done");
