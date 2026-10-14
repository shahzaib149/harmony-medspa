const smallTitleWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "vs", "with"]);
const titleAcronyms: Record<string, string> = {
  "adk-10": "ADK-10",
  daxxify: "DAXXIFY",
  e: "E",
  glo2facial: "Glo2Facial",
  glo2facials: "Glo2Facials",
  bhrt: "BHRT",
  co2: "CO2",
  fl: "FL",
  "glp-1": "GLP-1",
  hrt: "HRT",
  kerafactor: "KeraFactor",
  ipl: "IPL",
  iv: "IV",
  rf: "RF",
  t: "T",
  tm: "TM",
};

/** Title Case for headings, keeping short joining words lowercase and known acronyms intact. */
export function formatHeading(text: string): string {
  return text.replace(/[a-z0-9]+(?:[-'][a-z0-9]+)*/gi, (word, offset) => {
    const lower = word.toLocaleLowerCase("en-US");
    const acronym = titleAcronyms[lower];
    if (acronym) return acronym;

    const followsColon = text.slice(0, offset).trimEnd().endsWith(":");
    if (offset > 0 && !followsColon && smallTitleWords.has(lower)) return lower;

    return lower
      .split("-")
      .map((part) => part.charAt(0).toLocaleUpperCase("en-US") + part.slice(1))
      .join("-");
  });
}

/** Title-cases text that arrived all lowercase (as some CMS titles do); leaves cased text alone. */
export function titleCaseIfLowercase(text: string): string {
  return /[A-Z]/.test(text) ? text : formatHeading(text);
}

/** Joins hyphenated terms like "GLP-1" with a non-breaking hyphen so they never split across lines. */
export function keepNumberHyphens(text: string): string {
  return text.replace(/([A-Za-z])-(\d)/g, "$1\u2011$2");
}
