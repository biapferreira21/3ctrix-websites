import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, statSync } from "node:fs";
import { moveStoryIndex, storyIndexFromKey } from "../src/lib/storyNavigation.ts";
import { storyChapters } from "../src/content/about.ts";

test("photo navigation stops at either edge, including larger future chapters", () => {
  for (const count of [1, 2, 60]) {
    assert.equal(moveStoryIndex(0, -1, count), 0);
    assert.equal(moveStoryIndex(count - 1, 1, count), count - 1);
    assert.equal(moveStoryIndex(0, 100, count), count - 1);
    assert.equal(moveStoryIndex(count - 1, -100, count), 0);
  }
  assert.equal(moveStoryIndex(15, 1, 60), 16);
  assert.equal(moveStoryIndex(0, 1, 0), 0);
  assert.equal(moveStoryIndex(NaN, 1, 2), 1);
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
