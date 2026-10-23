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
    { label: "Puzzles", index: 9 },
    { label: "Reading", index: 10 },
    { label: "Theatre", index: 12 },
    { label: "Nature", index: 13 },
    { label: "Appreciating the day", index: 14 },
  ]);
});

test("new personal photographs distinguish free-time reading from university study", () => {
  const university = storyChapters.find((chapter) => chapter.id === "university-and-initiatives");
  assert.equal(university.moments.length, 9);
  assert.equal(university.moments[2].id, "iseg-study-desk");
  assert.equal(university.moments[2].group, "Studying");
  const freeTime = storyChapters.find((chapter) => chapter.id === "sport-and-free-time");
  assert.equal(freeTime.moments.length, 15);
  assert.deepEqual(freeTime.moments.slice(9).map((moment) => moment.id), ["puzzles-free-time", "reading-philosophy", "reading-mathematics", "childhood-theatre", "nature-resilience", "childhood-appreciating-the-day"]);
  assert.match(freeTime.introduction, /philosophy and the social sciences/);
  assert.match(freeTime.moments[13].text, /lessons in resilience/);
  assert.match(freeTime.moments[14].text, /as a child/);
  for (const moment of freeTime.moments.slice(9)) {
    assert.equal(moment.eventRole, undefined);
    assert.equal(moment.image.crop, undefined);
  }
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

test("research collaborations lead into events without implying solo report authorship", () => {
  const research = storyChapters.find((chapter) => chapter.id === "crypto-research");
  assert.ok(research);
  assert.deepEqual(storyGroupStarts(research.moments), [
    { label: "The Block", index: 0 },
    { label: "The Big Whale", index: 1 },
    { label: "Stablecoin Insider", index: 2 },
    { label: "Into events", index: 4 },
  ]);
  assert.match(research.moments[0].text, /helped organise Emergence in Prague/);
  assert.match(research.moments[1].text, /decentralised finance \(DeFi\)/);
  assert.match(research.moments[1].caption, /does not show a specific publication I authored/);
  assert.match(research.moments[3].text, /alongside the Stablecoin Insider team and partners/);
  assert.equal(research.moments[2].links[0].href, "https://stablecoininsider.org/2025-stablecoin-year-end-report/");
  const dafWork = research.moments[4];
  assert.match(dafWork.text, /EBC Barcelona and DAF London/);
  assert.equal(dafWork.linkLayout, "list");
  assert.equal(dafWork.image.src, "/about/daf-research-publications.svg");
  assert.deepEqual(dafWork.links.map((link) => link.href), [
    "https://eblockchainconvention.com/where-institutional-digital-asset-budgets-are-flowing-in-2026/",
    "https://eblockchainconvention.com/digital-assets-forum-expands-to-two-days/",
    "https://eblockchainconvention.com/sponsor-roi-industry-events-daf-2026/",
    "https://eblockchainconvention.com/how-leading-financial-institutions-evaluate-digital-asset-infrastructure-partners/",
  ]);
  assert.equal(existsSync(new URL("../public/about/stablecoin-insider-year-end-report-2025.pdf", import.meta.url)), false);
});

test("event chapter separates five ambassador events from two attendee events", () => {
  const events = storyChapters.find((chapter) => chapter.id === "events-as-a-founder");
  assert.ok(events);
  assert.equal(events.moments.length, 11);
  const groups = storyGroupStarts(events.moments);
  assert.deepEqual(groups.map((group) => group.label), ["EBC Barcelona", "DAF London", "Proof of Talk", "AI Summit Barcelona", "Lisbon AI Week", "Web Summit Lisbon", "AI Week Italy"]);
  assert.deepEqual(groups.map((group) => events.moments[group.index].eventRole), ["Ambassador", "Ambassador", "Ambassador", "Ambassador", "Ambassador", "Attendee", "Attendee"]);
  assert.ok(existsSync(new URL(`../public${events.identityImage.src}`, import.meta.url)));
  const illustrations = events.moments.filter((moment) => moment.image.src.endsWith(".svg"));
  assert.equal(illustrations.length, 2);
  for (const illustration of illustrations) {
    assert.match(illustration.caption, /not an event photograph/);
    const svg = readFileSync(new URL(`../public${illustration.image.src}`, import.meta.url), "utf8");
    assert.match(svg, /prefers-reduced-motion:reduce/);
    assert.ok(!svg.includes("<script"));
  }
});

test("Repsol story preserves trainee and product chronology without inventing outcomes", () => {
  const repsol = storyChapters.find((chapter) => chapter.id === "repsol-product-management");
  assert.ok(repsol);
  assert.equal(repsol.moments.length, 5);
  assert.equal(repsol.highlightsLabel, "My work · select to explore");
  assert.deepEqual(storyGroupStarts(repsol.moments), [
    { label: "Joining Repsol", index: 0 },
    { label: "Trainee experiences", index: 1 },
    { label: "My Repsol", index: 4 },
  ]);
  assert.match(repsol.moments[0].text, /early 2025, while finishing my master’s degree/);
  assert.match(repsol.moments[0].text, /began working in pricing/);
  assert.match(repsol.moments[1].text, /Madrid, to Repsol University and to Tarragona/);
  const product = repsol.moments[4];
  assert.match(product.text, /Since September 2025/);
  assert.match(product.text, /Product Manager for the My Repsol app/);
  assert.match(product.text, /automations and built AI agents/);
  assert.match(product.caption, /not a claim that I designed or built every feature/);
  assert.equal(repsol.results, undefined);
  assert.match(product.text, /Microsoft Copilot and Atlassian Rovo/);
  assert.match(repsol.highlights[2].text, /Microsoft Copilot and Atlassian Rovo/);
});

test("requested crops preserve source assets and stay within the supplied image bounds", () => {
  const moments = storyChapters.flatMap((chapter) => chapter.moments);
  const kpmg = moments.find((moment) => moment.id === "kpmg-ambassador");
  const kickboxing = moments.find((moment) => moment.id === "kickboxing-training");
  assert.equal(kpmg.image.src, "/about/kpmg-ambassador.webp");
  assert.equal(kickboxing.image.src, "/about/kickboxing-training.webp");
  assert.deepEqual(kpmg.image.crop, { x: 140, y: 390, width: 420, height: 530 });
  assert.deepEqual(kickboxing.image.crop, { x: 0, y: 319, width: 899, height: 830 });
  for (const moment of [kpmg, kickboxing]) {
    const crop = moment.image.crop;
    assert.ok(crop.x >= 0 && crop.y >= 0 && crop.width > 0 && crop.height > 0);
    assert.ok(crop.x + crop.width <= moment.image.width);
    assert.ok(crop.y + crop.height <= moment.image.height);
  }
});

test("community story keeps membership separate from the upcoming fellowship", () => {
  const community = storyChapters.find((chapter) => chapter.id === "community-and-whats-next");
  assert.ok(community);
  assert.equal(community.moments.length, 4);
  assert.deepEqual(storyGroupStarts(community.moments), [
    { label: "YEC Portugal", index: 0 },
    { label: "Next: San Francisco", index: 3 },
  ]);
  assert.match(community.moments[0].text, /February 2025/);
  assert.match(community.moments[0].text, /several of its monthly dinners/);
  for (const moment of community.moments.slice(0, 3)) {
    assert.equal(moment.links[0].href, "https://pt.linkedin.com/company/yec-portugal");
    assert.equal(moment.eventRole, undefined);
  }
  const upcoming = community.moments[3];
  assert.equal(upcoming.label, "Upcoming · November 2026");
  assert.match(upcoming.text, /heading to San Francisco for the Silicon Valley Fellowship/);
  assert.match(upcoming.text, /the next page of this story/);
  assert.match(upcoming.caption, /not a photograph from my trip/);
  assert.equal(upcoming.links[0].href, "https://www.siliconvalleyfellowship.com/");
  assert.equal(upcoming.eventRole, undefined);
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
