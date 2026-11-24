// One-Line Laugh — entry 2 for the make.fun bounty "The One-Line Laugh".
// Writes exactly one funny line (127 characters, a single sentence)
// to /output/entry.txt. Nothing else goes in the output file.
//
// The write is atomic (temp file + rename) and self-checked: after
// writing, the file is read back and verified to be valid UTF-8,
// 1-200 characters, not only whitespace, a single sentence, and
// byte-identical to the intended line. Any failure exits non-zero.
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my AI assistant for a compliment and it said, 'you type with remarkable confidence for someone who Googles everything.'";
const OUT = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(`${OUT}.tmp`, LINE, "utf8");
renameSync(`${OUT}.tmp`, OUT);

// Self-check: read back exactly what was written.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  throw new Error("output does not match the intended line");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`output is ${written.length} characters, must be 1-200`);
}
if (!written.trim()) {
  throw new Error("output is only whitespace");
}
// Single sentence: exactly one sentence-terminating period, at the end
// (inside the closing quote).
if ((written.match(/\./g) ?? []).length !== 1 || !written.endsWith(".'")) {
  throw new Error("output is not a single sentence");
}

