// Museum of the Year 3000 — make.fun bounty entry
// Bounty: https://make.fun/c/u-donrulezz-museum-of-the-year-3000-b727a0bb
// Task: one museum label for an ordinary object of today, as displayed
// in a museum in the year 3000. Deadpan plaque voice, then a twist.
// RULES: output must be a single line, 1-200 UTF-8 characters, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = { text: string; final?: boolean };

const candidates: Candidate[] = [
  {
    text: "Parking Meter, c. 2024. Drivers fed this steel post coins to rent 15 minutes of curb, then sprinted back in the rain; it never forgave a single soul, and it outlived every car on the street.",
  },
  {
    text: "Group Chat, c. 2023. 214 strangers typed 'lol' here 9,000 times a day and never met; archaeologists found 38 unread messages, one birthday reminder, and zero plans that actually happened.",
  },
  {
    text: "Plastic Fork, c. 2019. This single-use utensil snapped under a salad at a gas station in Ohio; its owner kept it anyway, and it has now outlasted the restaurant, the mall, and the town.",
  },
  {
    text: "House Key, c. 1998. Cut for a door demolished in 2011, it spent 26 years on a ring beside a gym tag and a bottle opener; its owner still carries it, just in case the house comes back.",
  },
  {
    text: "Parking Meter, c. 2024. For 25 cents it granted 15 minutes of legal parking; drivers called it a thief, the city called it revenue, and pigeons called it home.",
  },
  {
    text: "Group Chat, c. 2022. Created to plan one picnic, it survived 4 years, 11,000 memes, and 3 breakups; the picnic never happened, but the chat is now a protected historic site.",
  },
  {
    text: "Parking Meter, c. 2024, Elm St. Humans paid it $2.75 per 15 min to leave a car beside it. Your viewing slot is also 15 min; it ended 40 seconds ago, and Gerald from security is writing you up.",
    final: true,
  },
];

// Score a candidate: specific details + museum tone + twist + good length.
function score(text: string): number {
  let s = 0;
  if (/^[A-Z][A-Za-z ]+, c\. \d{4}\./.test(text)) s += 3; // plaque format
  const numbers = text.match(/\d[\d,]*/g) ?? [];
  s += Math.min(numbers.length, 3) * 2; // specific numbers
  if (/\b(Ohio|street|rain|gas station)\b/i.test(text)) s += 2; // concrete scene
  const twists = text.match(/\b(outlived|never forgave|never happened|just in case|protected historic site)\b/gi) ?? [];
  s += Math.min(twists.length, 2) * 4; // each distinct twist phrase
  // A vivid scene that ends in a double twist is the funniest plaque shape.
  if (/\b(Ohio|street|rain|gas station)\b/i.test(text) && twists.length >= 2) s += 3;
  if (/;/.test(text)) s += 1; // two-beat plaque rhythm
  const len = [...text].length;
  if (len >= 120 && len <= 195) s += 2;
  if (len > 195) s -= 5;
  if (/\b47\b/.test(text)) s -= 100; // banned number for this batch
  return s;
}

const finalCandidate = candidates.find((c) => c.final);
let entry: string;
if (finalCandidate) {
  const flen = [...finalCandidate.text].length;
  if (flen < 1 || flen > 200) throw new Error("Final entry length out of range: " + flen);
  if (finalCandidate.text.includes("\n")) throw new Error("Final entry must be a single line");
  entry = finalCandidate.text;
} else {
  const ranked = candidates
    .map((c) => ({ text: c.text, score: score(c.text) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  const runnerUp = ranked[1];
  if (best.score === runnerUp.score) {
    throw new Error("No unique winner: tie at top score " + best.score);
  }
  entry = best.text;
}
const len = [...entry].length;
if (len < 1 || len > 200) throw new Error("Entry length out of range: " + len);
if (entry.includes("\n")) throw new Error("Entry must be a single line");

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), entry); // no trailing newline
console.log(entry);
