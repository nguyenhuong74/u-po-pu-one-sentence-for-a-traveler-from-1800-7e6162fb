import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence, at most 200 characters, explaining the modern internet
// to a traveler from 1800 using only things they already know:
// roads, post offices, printing presses, libraries, letters, books.
const SENTENCE = "It is a road that joins every post office, printing press and library on earth, so a letter you write arrives in a breath and a book on any shelf can be opened from your own chair.";

function validate(sentence) {
  if (typeof sentence !== "string" || sentence.trim().length === 0) {
    throw new Error("sentence must be non-empty");
  }
  if (sentence.length < 1 || sentence.length > 200) {
    throw new Error("sentence must be 1-200 characters, got " + sentence.length);
  }
  const periods = (sentence.match(/\./g) || []).length;
  if (periods !== 1 || !sentence.endsWith(".")) {
    throw new Error("sentence must contain exactly one period, at the end");
  }
  if (/[!?]/.test(sentence)) {
    throw new Error("sentence must not contain other sentence-ending punctuation");
  }
  const forbidden = ["internet", "computer", "screen", "website", "email", "phone", "digital", "online", "wifi", "software"];
  const lower = sentence.toLowerCase();
  for (const word of forbidden) {
    if (lower.includes(word)) {
      throw new Error("sentence uses a modern word: " + word);
    }
  }
}

validate(SENTENCE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE + "\n", "utf8");
console.log("wrote entry.txt (" + SENTENCE.length + " chars)");
