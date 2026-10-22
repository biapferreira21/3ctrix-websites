import assert from "node:assert/strict";
import test from "node:test";
import { getServiceContactPreset, researchPaths, servicePaths } from "../src/content/servicePaths.ts";

test("every home service has a distinct goal and maps to the existing enquiry options", () => {
  const allowed = ["Events, Media & Content", "Event Websites & Apps", "Research & Information Quality", "Workflow Automation"];
  assert.equal(new Set(servicePaths.map((item) => item.id)).size, 5);
  for (const service of servicePaths) {
    assert.deepEqual(getServiceContactPreset(service.id, "Home enquiry"), { field: "interest", value: service.contact });
    assert.ok(allowed.includes(service.contact));
    assert.equal(service.stages.length, 3);
    assert.equal(service.deliverables.length, 3);
  }
});

test("research selections prefill the format, not personal details or a message", () => {
  assert.equal(new Set(researchPaths.map((item) => item.id)).size, 4);
  for (const service of researchPaths) {
    assert.deepEqual(getServiceContactPreset(service.id, "Research enquiry"), { field: "format", value: service.contact });
  }
});

test("unknown, malformed and cross-page selections cannot prefill a form", () => {
  for (const value of [undefined, null, {}, 42, "__proto__", "message", ""]) {
    assert.equal(getServiceContactPreset(value, "Home enquiry"), null);
    assert.equal(getServiceContactPreset(value, "Research enquiry"), null);
  }
  assert.equal(getServiceContactPreset("research", "Research enquiry"), null);
  assert.equal(getServiceContactPreset("article", "Home enquiry"), null);
  assert.equal(getServiceContactPreset("workflow", "Automation enquiry"), null);
});
