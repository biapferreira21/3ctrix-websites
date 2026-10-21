import assert from "node:assert/strict";
import test from "node:test";
import { allocatePoint, moveRankedItem } from "../src/lib/demoInteractions.ts";
import { conferenceSessions, experimentCards } from "../src/content/interactiveDemos.ts";

test("ranking moves preserve every item and never wrap at an edge", () => {
  const original = ["Sources", "Evidence", "Context"];
  assert.deepEqual(moveRankedItem(original, 0, -1), original);
  assert.deepEqual(moveRankedItem(original, 2, 1), original);
  assert.deepEqual(moveRankedItem(original, 1, -1), ["Evidence", "Sources", "Context"]);
  assert.deepEqual(moveRankedItem(original, 1, 1), ["Sources", "Context", "Evidence"]);
  assert.deepEqual(moveRankedItem(original, -1, 1), original);
  assert.deepEqual(moveRankedItem(original, 8, -1), original);
  assert.deepEqual(original, ["Sources", "Evidence", "Context"]);
});

test("allocation cannot exceed the shared budget or go below zero", () => {
  const full = [4, 3, 3];
  assert.deepEqual(allocatePoint(full, 0, 1), full);
  assert.deepEqual(allocatePoint([0, 0, 0], 0, -1), [0, 0, 0]);
  const released = allocatePoint(full, 2, -1);
  assert.deepEqual(released, [4, 3, 2]);
  assert.deepEqual(allocatePoint(released, 0, 1), [5, 3, 2]);
  assert.deepEqual(allocatePoint(full, 9, -1), full);
  assert.deepEqual(full, [4, 3, 3]);
});

test("repeated point allocation still caps at ten and can be fully redistributed", () => {
  let points = [0, 0, 0];
  for (let i = 0; i < 30; i++) points = allocatePoint(points, i % 3, 1);
  assert.equal(points.reduce((sum, value) => sum + value, 0), 10);
  for (let i = 0; i < 30; i++) points = allocatePoint(points, i % 3, -1);
  assert.deepEqual(points, [0, 0, 0]);
});

test("all six formats have two distinct questions and valid learning answers", () => {
  const formats = Object.keys(experimentCards);
  assert.equal(formats.length, 6);
  const cards = Object.values(experimentCards).flat();
  assert.equal(cards.length, 12);
  assert.equal(new Set(cards.map((card) => card.id)).size, 12);
  for (const format of formats) {
    assert.equal(experimentCards[format].length, 2);
    for (const card of experimentCards[format]) {
      assert.equal(card.perspectives.length, 2);
      if (format === "learn") assert.ok(card.options.includes(card.correctAnswer));
      if (format === "allocation" || format === "rank") assert.ok(card.options.length >= 3);
    }
  }
});

test("sample sessions keep unique identifiers and rooms supported by the venue map", () => {
  assert.equal(new Set(conferenceSessions.map((session) => session.id)).size, conferenceSessions.length);
  for (const session of conferenceSessions) assert.ok(["Main stage", "Studio room", "Meet-up lounge"].includes(session.room));
});
