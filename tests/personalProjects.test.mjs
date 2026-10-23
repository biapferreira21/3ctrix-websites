import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { personalProjects, projectPreviewFlows } from "../src/content/personalProjects.ts";

test("curated projects have public README provenance and no placeholder repositories", () => {
  assert.deepEqual(personalProjects.map((item) => item.id), ["alphavote", "alpha-tkd-pro", "ai-research-roadmap"]);
  for (const project of personalProjects) {
    assert.match(project.repository, /^https:\/\/github.com\/biapferreira21\//);
    assert.match(project.readmeSha, /^[a-f0-9]{40}$/);
    assert.ok(project.summary.split(" ").length < 50);
    assert.equal(project.features.length, 3);
    if (project.image) assert.ok(existsSync(new URL(`../public${project.image.src}`, import.meta.url)));
  }
});

test("About navigation uses no nested horizontal scrolling rails or project tabs", () => {
  for (const path of ["StoryGallery", "PersonalProjects"]) {
    const source = readFileSync(new URL(`../src/components/studio/${path}.tsx`, import.meta.url), "utf8");
    assert.ok(!source.includes("overflow-x-auto"));
    assert.ok(!source.includes('role="tablist"'));
  }
  const story = readFileSync(new URL("../src/components/studio/StoryGallery.tsx", import.meta.url), "utf8");
  assert.match(story, /Choose a chapter/);
  assert.match(story, /Photo navigation/);
  assert.match(story, /Details & milestones/);
});

test("decorative 3D motion is optional, pausable and cleaned up", () => {
  const visual = readFileSync(new URL("../src/components/studio/AboutVisual.tsx", import.meta.url), "utf8");
  for (const safeguard of ["useReducedMotionPreference", "IntersectionObserver", "document.hidden", "Pause background animation", "gsap.ticker.remove(render)", "renderer.dispose()", "choreography.revert()"])
    assert.ok(visual.includes(safeguard));
  assert.match(visual, /catch \{ return; \}/);
});

test("project copy preserves product boundaries and direct Android test distribution", () => {
  assert.match(personalProjects[0].summary, /informed participation/);
  assert.match(personalProjects[1].action.href, /releases\/latest$/);
  assert.equal(personalProjects[0].action.href, "https://alphavote.app/");
  assert.ok(!personalProjects.some((project) => /content.hub|agent.factory/i.test(project.id)));
});

test("the remaining learning path is small and complete", () => {
  for (const steps of Object.values(projectPreviewFlows)) {
    assert.equal(steps.length, 3);
    assert.equal(new Set(steps.map((step) => step.title)).size, 3);
    for (const step of steps) assert.ok(step.detail && step.items.length === 3);
  }
  assert.deepEqual(Object.keys(projectPreviewFlows), ["ai-research-roadmap"]);
});
