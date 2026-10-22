// Service descriptions come from Beatriz's positioning brief. The previews describe
// possible project scope, not completed client work or ready-made product features.
export const servicePaths = [
  {
    id: "event-content", label: "Cover my event", category: "Events, media & content",
    title: "Before the doors open. After the room empties.",
    description: "Ambassador work, interviews and content that help people understand what your event is about.",
    audience: "For event organisers & media partners",
    deliverables: ["Event previews", "Speaker & founder interviews", "Recaps, explainers & newsletters"],
    note: "Ambassador, sponsored and commissioned work is disclosed.",
    link: { label: "See Beatriz’s event experience", href: "#experience" },
    contact: "Events, Media & Content", theme: "media",
    stages: [
      { label: "Before", title: "Give people a reason to attend", detail: "Event preview", items: ["Themes worth exploring", "People to hear from", "Questions to bring"] },
      { label: "During", title: "Bring the conversation closer", detail: "Interviews & coverage", items: ["Founders & speakers", "Ideas from the sessions", "Participant perspectives"] },
      { label: "After", title: "Keep the useful ideas moving", detail: "Recap & follow-up", items: ["Key takeaways", "Explainers & sources", "What to explore next"] },
    ],
  },
  {
    id: "product-review", label: "Review my product", category: "Hands-on product reviews",
    title: "Show what it does. Be clear about its limits.",
    description: "Hands-on reviews of AI and technology products, grounded in actual testing rather than a feature list.",
    audience: "For startups & technology companies",
    deliverables: ["Hands-on product testing", "Clear product explanation", "Evidence-aware review content"],
    note: "A commissioned review is disclosed. Findings depend on testing, not a promised positive verdict.",
    link: { label: "Meet the person behind the review", href: "#profile" },
    contact: "Events, Media & Content", theme: "review",
    stages: [
      { label: "Try", title: "Use it for a defined task", detail: "Hands-on testing", items: ["Understand the intended use", "Try the core workflow", "Record what happens"] },
      { label: "Examine", title: "Look beyond the feature list", detail: "Evidence & limits", items: ["What was observed", "Where the limits are", "What remains untested"] },
      { label: "Explain", title: "Make the experience understandable", detail: "Product review", items: ["What the product does", "Who it is intended for", "Findings & disclosure"] },
    ],
  },
  {
    id: "event-app", label: "Build an event app", category: "Event websites & apps",
    title: "A useful companion, not another download to forget.",
    description: "A tailored website or app that helps participants prepare, take part and follow up.",
    audience: "For conference & event organisers",
    deliverables: ["Agenda, speakers & venue guides", "Questions, polls & participant resources", "Post-event content & follow-up"],
    note: "Features are scoped to each event. The interactive app below is a demonstration, not a ready-made platform.",
    link: { label: "Try the conference app demo", href: "#event-tools" },
    contact: "Event Websites & Apps", theme: "app",
    stages: [
      { label: "Prepare", title: "Know where to go", detail: "Participant guide", items: ["Explore the agenda", "Find speakers & sessions", "Check practical information"] },
      { label: "Take part", title: "Have a way into the conversation", detail: "Session companion", items: ["Ask a question", "Share a perspective", "Open session resources"] },
      { label: "Follow up", title: "Take the useful parts with you", detail: "After the event", items: ["Revisit summaries", "Find linked sources", "Continue learning"] },
    ],
  },
  {
    id: "workflow", label: "Simplify a workflow", category: "Workflow automation",
    title: "Less copying. Fewer disconnected steps.",
    description: "Focused automations and AI-assisted tools for repetitive work, shaped around the process you actually use.",
    audience: "For event teams & organisations",
    deliverables: ["A review of the current workflow", "A focused automation or custom tool", "Testing in the real process"],
    note: "Important decisions stay with people. Scope depends on your tools, data and requirements.",
    link: { label: "Explore workflow automation", href: "/automations" },
    contact: "Workflow Automation", theme: "workflow",
    stages: [
      { label: "Map", title: "Find the repeat work", detail: "Current process", items: ["Repeated admin tasks", "Scattered event information", "Manual handovers"] },
      { label: "Connect", title: "Design a focused workflow", detail: "Tailored automation", items: ["A defined input", "Connected steps", "Human approval"] },
      { label: "Test", title: "Check it in real use", detail: "Workflow testing", items: ["Try the actual process", "Review the output", "Refine where needed"] },
    ],
  },
  {
    id: "research", label: "Explain a complex topic", category: "Research & information quality",
    title: "Make the topic clearer. Keep the evidence visible.",
    description: "Articles, reports and briefings that connect emerging technology with the questions your audience needs answered.",
    audience: "For startups, publications & organisations",
    deliverables: ["Research around a clear question", "Articles, reports or briefings", "Sources, context & open questions"],
    note: "Research supports understanding; it does not guarantee truth or replace judgement.",
    link: { label: "Explore research & information quality", href: "/research" },
    contact: "Research & Information Quality", theme: "research",
    stages: [
      { label: "Ask", title: "Start with a useful question", detail: "Research brief", items: ["Topic & audience", "What needs explaining", "Intended format"] },
      { label: "Investigate", title: "Keep the evidence close", detail: "Source review", items: ["Sources & dates", "Context & qualifications", "Gaps or disagreement"] },
      { label: "Explain", title: "A clear, inspectable result", detail: "Article, report or briefing", items: ["Evidence", "Interpretation", "Open questions"] },
    ],
  },
] as const;

export const researchPaths = [
  { ...servicePaths[4], id: "article", label: "Explain a topic", category: "Articles & briefings", title: "A complex topic, made understandable.", contact: "Article or briefing", link: { label: "See the research method", href: "#method" } },
  { ...servicePaths[0], id: "coverage", label: "Cover an event", contact: "Event coverage", link: { label: "See Beatriz’s event experience", href: "/#experience" } },
  {
    ...servicePaths[4], id: "report", label: "Go deeper into a question", category: "Research reports", title: "Examine the claims behind the conversation.",
    description: "A deeper investigation of a defined topic, with sources, competing explanations and unresolved questions made visible.",
    deliverables: ["A clearly scoped research question", "Source comparison & context", "A report with findings and limits"],
    contact: "Research report", link: { label: "Try the information-quality example", href: "#research-directions" },
  },
  {
    ...servicePaths[4], id: "editorial", label: "Plan a content series", category: "Editorial support", title: "Turn a subject into a useful series.",
    description: "Topic planning and ongoing research-led content for publications, events and technology teams.",
    deliverables: ["Topic & audience planning", "Article series or newsletters", "Ongoing research-led editorial support"],
    contact: "Editorial support", link: { label: "Discuss scope & format", href: "#engagements" },
    stages: [
      { label: "Plan", title: "Choose the questions worth covering", detail: "Editorial direction", items: ["Audience needs", "Themes & angles", "Formats & scope"] },
      { label: "Research", title: "Build each piece on evidence", detail: "Content development", items: ["Source material", "People to interview", "Useful context"] },
      { label: "Publish", title: "Give the series a clear thread", detail: "Editorial content", items: ["Articles & explainers", "Newsletters", "Sources & follow-up"] },
    ],
  },
] as const;

export type ServicePath = (typeof servicePaths)[number] | (typeof researchPaths)[number];
export const serviceSelectionEvent = "studio:service-selected";

// Only recognised services can prefill the appropriate field. No message, identity
// field or hidden field is overwritten, and this never submits the form.
export function getServiceContactPreset(serviceId: unknown, source: string) {
  if (typeof serviceId !== "string") return null;
  if (source === "Home enquiry") {
    const service = servicePaths.find((item) => item.id === serviceId);
    return service ? { field: "interest", value: service.contact } : null;
  }
  if (source === "Research enquiry") {
    const service = researchPaths.find((item) => item.id === serviceId);
    return service ? { field: "format", value: service.contact } : null;
  }
  return null;
}
