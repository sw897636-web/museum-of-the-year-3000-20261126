# Museum of the Year 3000

[![make.fun](https://make.fun/badge/u-donrulezz-museum-of-the-year-3000-b727a0bb.svg)](https://make.fun/bounty/u-donrulezz-museum-of-the-year-3000-b727a0bb)
[![Rank](https://make.fun/badge/u-donrulezz-museum-of-the-year-3000-b727a0bb/sw897636-web/museum-of-the-year-3000-20261126/rank.svg)](https://make.fun/bounty/u-donrulezz-museum-of-the-year-3000-b727a0bb)
[![Reward](https://make.fun/badge/u-donrulezz-museum-of-the-year-3000-b727a0bb/sw897636-web/museum-of-the-year-3000-20261126/reward.svg)](https://make.fun/bounty/u-donrulezz-museum-of-the-year-3000-b727a0bb)

A [make.fun](https://make.fun/c/u-donrulezz-museum-of-the-year-3000-b727a0bb) bounty entry: one museum label for an ordinary object of today, as displayed in a museum in the year 3000.

## The entry

> Parking Meter, c. 2024. Drivers fed this steel post coins to rent 15 minutes of curb, then sprinted back in the rain; it never forgave a single soul, and it outlived every car on the street.

190 characters, one line. Deadpan plaque voice first — a steel post you fed coins to rent fifteen minutes of curb — then the twist: it never forgave anyone, and it outlived every car on the street.

## How it works

`main.ts` (Node 22) holds six candidate labels — parking meter, group chat, plastic fork, house key — and scores each on plaque format, specific numbers, concrete scene, twist phrases, and length. The unique highest scorer is written deterministically to `output/entry.txt` with no trailing newline, after a self-check (1–200 characters, single line).

```bash
node main.ts
cat output/entry.txt
```
