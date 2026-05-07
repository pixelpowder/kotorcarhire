'use client';
import useTranslation from '../i18n/useTranslation';

/**
 * Generic renderer for legal page bodies (Terms, Privacy, Cookie Policy).
 * Reads an array of blocks from the translation key `<bodyKey>` and renders
 * h2/h3/p/ul/ulBold/link blocks. All href="/..." attributes inside paragraphs
 * are auto-resolved through localePath() so internal links stay locale-aware.
 *
 * Block schema:
 *   { h2: "..." }                    → <h2>
 *   { h3: "..." }                    → <h3>
 *   { p: "..." }                     → <p> (HTML allowed)
 *   { p: ["...", "..."] }            → multiple <p>
 *   { ul: ["a", "b"] }               → <ul><li>a</li>...
 *   { ulBold: [["Term:", "rest"]] }  → <ul><li><strong>Term:</strong> rest</li>
 *
 * The `lastUpdated` label + value renders as the first paragraph if both
 * `<bodyKey>.lastUpdatedLabel` and `<bodyKey>.lastUpdated` exist.
 */
export default function LegalPageBody({ bodyKey }) {
  const { t, localePath } = useTranslation();
  const body = t(`${bodyKey}.body`);
  const lastUpdatedLabel = t(`${bodyKey}.lastUpdatedLabel`);
  const lastUpdated = t(`${bodyKey}.lastUpdated`);
  if (!Array.isArray(body)) return null;

  // Resolve internal hrefs inside HTML strings.
  const resolveLinks = (html) =>
    html.replace(/href="(\/[^"]+)"/g, (_, p) => `href="${localePath(p)}"`);

  const showLU = lastUpdatedLabel && lastUpdated && lastUpdatedLabel !== `${bodyKey}.lastUpdatedLabel`;

  return (
    <>
      {showLU && (
        <p>
          <strong>{lastUpdatedLabel}</strong> {lastUpdated}
        </p>
      )}
      {body.map((block, i) => {
        if (block.h2) return <h2 key={i}>{block.h2}</h2>;
        if (block.h3) return <h3 key={i}>{block.h3}</h3>;
        if (block.p) {
          const ps = Array.isArray(block.p) ? block.p : [block.p];
          return ps.map((para, j) => (
            <p key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: resolveLinks(para) }} />
          ));
        }
        if (block.ulBold) {
          return (
            <ul key={i}>
              {block.ulBold.map(([label, text], j) => (
                <li key={j}><strong>{label}</strong> {text}</li>
              ))}
            </ul>
          );
        }
        if (block.ul) {
          return (
            <ul key={i}>
              {block.ul.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: resolveLinks(item) }} />
              ))}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}
