// Service descriptions come from Beatriz's brief and her service clarifications. The previews describe
// possible project scope, not completed client work or ready-made product features.
export const servicePaths = [
  {
    id: "event-content", label: "Create event content", category: "Educational content · blogs, socials & SEO",
    title: "Give people a reason to learn. And a reason to attend.",
    description: "Educational blog posts and social content that explain your industry and your event — with SEO and clear routes to ticket booking.",
    audience: "For event organisers & media partners",
    deliverables: ["Ambassador work, speaker interviews & coverage", "News of the week & industry concept explainers", "SEO-led blog posts & content for social media"],
    note: "Designed to support discovery and ticket sales, not guarantee them. Ambassador, sponsored and commissioned work is disclosed.",
    link: { label: "See Beatriz’s event experience", href: "#experience" },
    contact: "Events, Media & Content", theme: "media",
    stages: [
      { label: "Before", title: "Turn curiosity into a reason to attend", detail: "Educational blogs & socials", items: ["Speaker interviews", "News of the week", "Industry concepts, explained"] },
      { label: "During", title: "Bring the conversation closer", detail: "Interviews & coverage", items: ["Founders & speakers", "Ideas from the sessions", "Participant perspectives"] },
      { label: "After", title: "Keep the useful ideas discoverable", detail: "Recap, search & follow-up", items: ["Educational recaps & sources", "SEO-led blog posts", "Social posts & next-event ticket links"] },
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
  {
    id: "event-website", label: "Build a simple event website", category: "Event websites · content to tickets",
    title: "Make the event worth exploring. Make tickets easy to find.",
    description: "Simple, visually engaging websites that present your event, bring educational content together and guide interested visitors to ticket booking.",
    audience: "For event organisers & conference teams",
    deliverables: ["A clear, engaging event website", "Speaker, programme & educational content pages", "SEO-led content structure & ticket-booking links"],
    note: "A focused event website can be a project on its own; an app is not required. Ticket-sales and search-ranking outcomes are not guaranteed.",
    link: { label: "Explore the event app as an optional next step", href: "#event-tools" },
    contact: "Event Websites & Apps", theme: "website",
    stages: [
      { label: "Discover", title: "Connect useful content to the event", detail: "Search, blog & social content", items: ["Questions your audience brings", "Educational posts & interviews", "Links to the event website"] },
      { label: "Explore", title: "Show why this event matters", detail: "Content-led event website", items: ["A clear event introduction", "Speakers, topics & programme", "Helpful, visually engaging content"] },
      { label: "Book", title: "Give interest a clear next step", detail: "Ticket-booking journey", items: ["Visible ticket calls to action", "Clear event details", "Links to your ticket-booking page"] },
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
    ...servicePaths[4], id: "editorial", label: "Create blog & social content", category: "Educational content & SEO", title: "Help people understand the industry — and why to attend.",
    description: "Educational content for event blogs and social channels: speaker interviews, news of the week and industry concept explainers. SEO-led planning connects useful posts to event discovery and ticket booking.",
    deliverables: ["Speaker interviews & news of the week", "Industry concept explainers for blogs & socials", "SEO-led content planning & ticket calls to action"],
    note: "Content is designed to support discovery and ticket sales; search rankings and sales are not guaranteed. Sponsored or commissioned work is disclosed.",
    contact: "Educational blog & social content", link: { label: "Discuss scope & format", href: "#engagements" },
    stages: [
      { label: "Plan", title: "Start with what people want to understand", detail: "Audience & SEO planning", items: ["Audience questions & search intent", "Industry themes & concepts", "Blog & social content plan"] },
      { label: "Create", title: "Teach something worth coming for", detail: "Educational content", items: ["Interviews with speakers", "News of the week", "Clear industry concept explainers"] },
      { label: "Connect", title: "Link the learning to the event", detail: "Content to ticket booking", items: ["Search-friendly blog structure", "Social posts linked to useful content", "Clear calls to explore the event & book"] },
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
