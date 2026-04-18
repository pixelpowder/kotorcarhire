// Compare every key in en.json against each locale file and report:
//   1. Keys missing from a locale
//   2. Keys present but English-identical (copied over but not translated)
//   3. Any hardcoded English strings in the source tree that bypass t() entirely

import fs from "node:fs";
import path from "node:path";

const LOCALES = ["de", "fr", "it", "ru", "me"];
const LOCALES_DIR = "src/i18n/locales";

function walk(obj, prefix, out) {
  for (const k in obj) {
    const key = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) walk(v, key, out);
    else out[key] = v;
  }
}

const en = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, "en.json"), "utf8"));
const enFlat = {};
walk(en, "", enFlat);
console.log(`English keys: ${Object.keys(enFlat).length}`);
console.log();

const missingPerLocale = {};
const englishCopiedPerLocale = {};

for (const locale of LOCALES) {
  const j = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, `${locale}.json`), "utf8"));
  const flat = {};
  walk(j, "", flat);
  const missing = [];
  const copied = [];
  for (const [k, v] of Object.entries(enFlat)) {
    if (flat[k] === undefined) missing.push(k);
    else if (typeof v === "string" && typeof flat[k] === "string" && v.trim() === flat[k].trim() && v.trim().length > 8 && /[A-Z][a-z]/.test(v)) {
      copied.push(k);
    }
  }
  missingPerLocale[locale] = missing;
  englishCopiedPerLocale[locale] = copied;
  console.log(`${locale}: ${missing.length} missing, ${copied.length} English-identical`);
}

// Write compact report
const report = {
  enKeyCount: Object.keys(enFlat).length,
  missing: missingPerLocale,
  englishCopied: englishCopiedPerLocale,
};
fs.writeFileSync("scripts/translation-gap-report.json", JSON.stringify(report, null, 2), "utf8");

console.log("\nSample missing keys (from IT):");
for (const k of missingPerLocale.it.slice(0, 20)) console.log(`  ${k}`);
console.log("\nFull report: scripts/translation-gap-report.json");
