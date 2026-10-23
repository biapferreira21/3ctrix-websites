import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync, statSync } from "node:fs";
import { moveStoryIndex, storyGroupStarts, storyIndexFromKey } from "../src/lib/storyNavigation.ts";
import { storyChapters } from "../src/content/about.ts";

test("photo navigation stops at either edge, including larger future chapters", () => {
  for (const count of [1, 2, 9, 60]) {
    assert.equal(moveStoryIndex(0, -1, count), 0);
    assert.equal(moveStoryIndex(count - 1, 1, count), count - 1);
    assert.equal(moveStoryIndex(0, 100, count), count - 1);
    assert.equal(moveStoryIndex(count - 1, -100, count), 0);
  }
  assert.equal(moveStoryIndex(15, 1, 60), 16);
  assert.equal(moveStoryIndex(0, 1, 0), 0);
  assert.equal(moveStoryIndex(NaN, 1, 2), 1);
});

test("chapter shortcuts preserve first-occurrence order and jump to the first photo of each part", () => {
  assert.deepEqual(storyGroupStarts([{ group: "A" }, {}, { group: "A" }, { group: "B" }, { group: "B" }]), [{ label: "A", index: 0 }, { label: "B", index: 3 }]);
  assert.deepEqual(storyGroupStarts([]), []);
  const sports = storyChapters.find((chapter) => chapter.id === "sport-and-free-time");
  assert.ok(sports);
  assert.deepEqual(storyGroupStarts(sports.moments), [
    { label: "Early years", index: 0 },
    { label: "Kickboxing", index: 2 },
    { label: "Taekwondo", index: 6 },
    { label: "Running", index: 7 },
  ]);
});

test("university results distinguish admission, degree grades and thesis, with a readable original PDF", () => {
  const university = storyChapters.find((chapter) => chapter.id === "university-and-initiatives");
  assert.ok(university);
  assert.deepEqual(university.results, [
    { label: "Admission score", value: "19.1 / 20" },
    { label: "MAEG · Final grade", value: "17 / 20" },
    { label: "Master’s · Final grade", value: "17 / 20" },
    { label: "Thesis grade", value: "18 / 20" },
  ]);
  const thesis = university.moments.find((moment) => moment.id === "masters-thesis");
  assert.ok(thesis);
  assert.equal(thesis.links.length, 2);
  assert.equal(thesis.links[0].href, thesis.links[1].href);
  assert.equal(thesis.links[1].download, true);
  const pdf = readFileSync(new URL(`../public${thesis.links[0].href}`, import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.equal(pdf.length, 1168772);
});

test("university initiatives keep distinct roles and an external example article", () => {
  const university = storyChapters.find((chapter) => chapter.id === "university-and-initiatives");
  assert.deepEqual(university.highlights.map((item) => item.title), ["KPMG & BNP Paribas", "ISEG YES", "Nova Blockchain Club"]);
  const club = university.highlights.find((item) => item.title === "Nova Blockchain Club");
  assert.ok(club.links[0].href.startsWith("https://www.linkedin.com/posts/novablockchainclub_"));
});

test("keyboard controls work without capturing unrelated keys", () => {
  assert.equal(storyIndexFromKey("ArrowRight", 0, 60), 1);
  assert.equal(storyIndexFromKey("ArrowLeft", 0, 60), 0);
  assert.equal(storyIndexFromKey("Home", 35, 60), 0);
  assert.equal(storyIndexFromKey("End", 35, 60), 59);
  assert.equal(storyIndexFromKey("Tab", 0, 2), null);
  assert.equal(storyIndexFromKey("Escape", 0, 2), null);
});

test("chapters and photographs have unique IDs and complete local image assets", () => {
  assert.equal(new Set(storyChapters.map((item) => item.id)).size, storyChapters.length);
  const moments = storyChapters.flatMap((chapter) => chapter.moments);
  assert.equal(new Set(moments.map((item) => item.id)).size, moments.length);
  for (const chapter of storyChapters) assert.ok(chapter.moments.length > 0);
  for (const moment of moments) {
    assert.ok(moment.title && moment.text && moment.caption && moment.image.alt);
    assert.ok(moment.image.width > 0 && moment.image.height > 0);
    for (const src of [moment.image.src, moment.image.thumbnail]) {
      assert.ok(src.startsWith("/about/"));
      assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)));
    }
    assert.ok(statSync(new URL(`../public${moment.image.thumbnail}`, import.meta.url)).size < 20000);
  }
});
