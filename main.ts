// Funniest One-Line Out-of-Office Reply
// Writes a single out-of-office auto-reply line to /output/entry.txt.
//
// The joke: the reply opens as a perfectly normal out-of-office message,
// then quietly confesses the truth about the inbox. "Answered in the order
// received" sounds fair and professional until the dash reveals it is a
// polite way of saying never — and "with great respect" doubles down on
// the politeness after the confession. It keeps the full shape of a real
// auto-reply, which is exactly what the brief asks for.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The entry — one line, 136 code points, em dash U+2014 kept exactly.
const ENTRY =
  "I am out of the office until Monday. Your email will be answered in the order received \u2014 which is to say, never, and with great respect.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function codePointCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const chars = codePointCount(text);
  if (chars < 1 || chars > 160) {
    throw new Error(`entry must be 1-160 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // The em dash (U+2014) is the hinge of the joke; it must be present
  // exactly once, and the entry must end on the polite punchline.
  const dashes = [...text].filter((ch) => ch === "\u2014").length;
  if (dashes !== 1) {
    throw new Error(`entry must contain exactly one em dash, got ${dashes}`);
  }
  if (!text.endsWith("with great respect.")) {
    throw new Error("entry must end with 'with great respect.'");
  }
}

validate(ENTRY);

// Create the output directory if needed; never delete it (it may be a
// mount point in the grader). Only its contents are ours to write.
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

// Byte-exact read-back: what we wrote must be exactly what is on disk,
// compared at the UTF-8 byte level so a lookalike dash or a stray byte
// cannot slip through a string comparison.
const expectedBytes = Buffer.from(ENTRY, "utf8");
const roundTrip = readFileSync(outFile);
if (!roundTrip.equals(expectedBytes)) {
  throw new Error("read-back mismatch: entry.txt bytes do not match the entry");
}
const roundTripText = roundTrip.toString("utf8");
if (codePointCount(roundTripText) !== 136) {
  throw new Error(
    `expected 136 characters on read-back, got ${codePointCount(roundTripText)}`,
  );
}
// Re-validate the exact bytes read back, not just the in-memory string.
validate(roundTripText);
if (roundTrip.length !== 138) {
  throw new Error(`expected 138 UTF-8 bytes on disk, got ${roundTrip.length}`);
}

console.log(`Wrote ${outFile} (${codePointCount(ENTRY)} characters, 1 line)`);
console.log(ENTRY);
