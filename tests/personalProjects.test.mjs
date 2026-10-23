import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { personalProjects, projectPreviewFlows } from "../src/content/personalProjects.ts";

test("curated projects have public README provenance and no placeholder repositories", () => {
  assert.deepEqual(personalProjects.map((item) => item.id), ["alphavote", "alpha-tkd-pro", "ai-research-roadmap", "content-hub"]);
  for (const project of personalProjects) {
    assert.match(project.repository, /^https:\/\/github.com\/biapferreira21\//);
    assert.match(project.readmeSha, /^[a-f0-9]{40}$/);
    assert.ok(project.summary.split(" ").length < 50);
    assert.equal(project.features.length, 3);
    if (project.image) assert.ok(existsSync(new URL(`../public${project.image.src}`, import.meta.url)));
  }
});

test("project copy preserves product boundaries and direct Android test distribution", () => {
  assert.match(personalProjects[0].summary, /informed participation/);
  assert.match(personalProjects[1].action.href, /releases\/latest$/);
  assert.match(personalProjects[3].category, /AlphaVote extension/);
  assert.match(personalProjects[3].summary, /human approval/);
  assert.equal(personalProjects[0].action.href, "https://alphavote.app/");
  assert.equal(personalProjects[3].action.href, "https://alphavote.app/3CTrix-content/");
});

test("illustrative paths are small, complete and explicit about human publication", () => {
  for (const steps of Object.values(projectPreviewFlows)) {
    assert.equal(steps.length, 3);
    assert.equal(new Set(steps.map((step) => step.title)).size, 3);
    for (const step of steps) assert.ok(step.detail && step.items.length === 3);
  }
  assert.match(projectPreviewFlows["content-hub"][2].detail, /Nothing is posted automatically/);
});
