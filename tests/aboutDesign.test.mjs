import assert from "node:assert/strict";
import test from "node:test";
import { chapterThemes, chapterTheme, storyImageLayout } from "../src/lib/aboutDesign.ts";
import { storyChapters } from "../src/content/about.ts";

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((value) => parseInt(value, 16) / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(a, b) { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05); }

test("every chapter has a distinct editorial palette with readable text", () => {
  assert.deepEqual(Object.keys(chapterThemes), storyChapters.map((chapter) => chapter.id));
  assert.equal(new Set(Object.values(chapterThemes).map((theme) => theme.surface)).size, storyChapters.length);
  for (const theme of Object.values(chapterThemes)) {
    for (const foreground of [theme.accent, theme.text]) {
      for (const background of [theme.surface, theme.paper]) assert.ok(contrast(foreground, background) >= 4.5, `${foreground} on ${background}`);
    }
    assert.ok(contrast("#FFFFFF", theme.accent) >= 4.5);
  }
  assert.equal(chapterTheme("unknown"), chapterThemes["sport-and-free-time"]);
});

test("photo layouts use the visible original frame, including requested crops", () => {
  for (const moment of storyChapters.flatMap((chapter) => chapter.moments)) {
    const expected = (moment.image.crop?.width ?? moment.image.width) / (moment.image.crop?.height ?? moment.image.height);
    const layout = storyImageLayout(moment.image);
    assert.equal(layout.ratio, expected);
    assert.equal(layout.panorama, expected >= 1.2);
  }
  assert.deepEqual(storyImageLayout({ width: 0, height: 0 }), { ratio: 1, panorama: false });
  assert.equal(storyImageLayout({ width: 899, height: 2000, crop: { width: 899, height: 830 } }).panorama, false);
});
