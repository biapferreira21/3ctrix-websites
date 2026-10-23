export type StoryLink = { label: string; href: string; download?: boolean };

export type StoryMoment = {
  id: string;
  title: string;
  label: string;
  group?: string;
  text: string;
  caption: string;
  links?: readonly StoryLink[];
  resourceNote?: string;
  image: { src: string; thumbnail: string; alt: string; width: number; height: number };
};

export type StoryChapter = {
  id: string;
  title: string;
  eyebrow: string;
  introduction: string;
  topics: readonly string[];
  results?: readonly { label: string; value: string }[];
  highlights?: readonly { title: string; text: string; links?: readonly StoryLink[] }[];
  moments: readonly StoryMoment[];
};

// Add new moments to a chapter, or add another chapter. Only supplied stories and
// photographs and clearly attributed publication assets belong here; no inferred
// ages, dates, achievements or motivations.
export const storyChapters: readonly StoryChapter[] = [
  {
    id: "university-and-initiatives",
    title: "University & initiatives",
    eyebrow: "ISEG · From 2020",
    introduction: "Applied Mathematics helped shape how I think: critically, and through problem-solving. University was also an intense period of studying, student initiatives and early professional experiences, followed by a master’s degree at ISEG.",
    topics: ["Applied Mathematics · MAEG", "KPMG", "BNP Paribas", "ISEG YES", "Nova Blockchain Club", "Master’s & thesis"],
    results: [
      { label: "Admission score", value: "19.1 / 20" },
      { label: "MAEG · Final grade", value: "17 / 20" },
      { label: "Master’s · Final grade", value: "17 / 20" },
      { label: "Thesis grade", value: "18 / 20" },
    ],
    highlights: [
      { title: "KPMG & BNP Paribas", text: "During my bachelor’s degree, I was a university ambassador for KPMG and then completed a summer internship there. I also participated in both the ambassador and summer internship programmes at BNP Paribas." },
      { title: "ISEG YES", text: "I was Director of the Human Resources Department at ISEG YES, a university club." },
      { title: "Nova Blockchain Club", text: "I was Director of the Content Department at Nova Blockchain Club. This was where my interest in writing about blockchain and crypto assets began.", links: [{ label: "Read an example article on LinkedIn", href: "https://www.linkedin.com/posts/novablockchainclub_moneylaundering-cryptocurrency-kyc-activity-7127638460709879808-DBxl" }] },
    ],
    moments: [
      {
        id: "iseg-first-year-2020",
        title: "ISEG, 2020.",
        label: "Applied Mathematics · MAEG",
        group: "Starting ISEG",
        text: "In 2020, I joined ISEG to study Applied Mathematics, with an admission score of 19.1 out of 20. It was where I began to structure the way I think through critical thinking and problem-solving. I completed MAEG with a final grade of 17 out of 20.",
        caption: "At the beginning of my ISEG journey.",
        image: { src: "/about/iseg-first-year-2020.webp", thumbnail: "/about/iseg-first-year-2020-thumb.webp", alt: "Beatriz Ferreira wearing an ISEG T-shirt and holding a Welcome to ISEG badge.", width: 1500, height: 2000 },
      },
      {
        id: "iseg-exam-studying",
        title: "The work behind the degree.",
        label: "Bachelor’s degree · Exam preparation",
        group: "Studying",
        text: "This was a difficult and intense period, and I spent a great deal of time studying. These are the materials I was working through for my exams around Christmas — a glimpse of how much studying filled those years.",
        caption: "Exam materials beside the Christmas tree.",
        image: { src: "/about/iseg-exam-studying.webp", thumbnail: "/about/iseg-exam-studying-thumb.webp", alt: "Folders filled with study notes beside a decorated Christmas tree.", width: 1080, height: 1920 },
      },
      {
        id: "kpmg-ambassador-group",
        title: "Learning beyond lectures.",
        label: "KPMG · University ambassador",
        group: "Student initiatives",
        text: "Alongside my studies, I became a KPMG ambassador at my university. I later completed a summer internship with KPMG, adding an early professional experience to my university years.",
        caption: "With the KPMG ambassador group.",
        image: { src: "/about/kpmg-ambassador-group.webp", thumbnail: "/about/kpmg-ambassador-group-thumb.webp", alt: "A group of KPMG university ambassadors wearing purple ambassador hoodies.", width: 1080, height: 1080 },
      },
      {
        id: "kpmg-ambassador",
        title: "Making room for more.",
        label: "Ambassador programmes & summer internships",
        group: "Student initiatives",
        text: "Even during a demanding degree, I made time for initiatives outside my coursework. In addition to KPMG, I took part in the university ambassador and summer internship programmes at BNP Paribas.",
        caption: "Wearing my KPMG ambassador hoodie; the BNP Paribas programmes were a separate experience.",
        image: { src: "/about/kpmg-ambassador.webp", thumbnail: "/about/kpmg-ambassador-thumb.webp", alt: "Beatriz Ferreira wearing a purple KPMG ambassador hoodie.", width: 899, height: 1599 },
      },
      {
        id: "iseg-yes",
        title: "Taking on a role in student life.",
        label: "ISEG YES · Human Resources Director",
        group: "Student initiatives",
        text: "I was Director of the Human Resources Department at ISEG YES. I also led the Content Department at Nova Blockchain Club, where I began writing about blockchain and crypto assets.",
        caption: "Speaking beside the ISEG YES banner.",
        links: [{ label: "Read an example of my Nova Blockchain Club writing", href: "https://www.linkedin.com/posts/novablockchainclub_moneylaundering-cryptocurrency-kyc-activity-7127638460709879808-DBxl" }],
        image: { src: "/about/iseg-yes.webp", thumbnail: "/about/iseg-yes-thumb.webp", alt: "Beatriz Ferreira speaking in a university room beside an ISEG YES banner.", width: 1080, height: 1551 },
      },
      {
        id: "masters-thesis",
        title: "Researching ICO underpricing.",
        label: "Master’s dissertation · June 2025",
        group: "Master’s & thesis",
        text: "For my master’s in Accounting, Taxation and Corporate Finance at ISEG, I wrote “An Essay on Underpricing in ICOs”. The dissertation examines underpricing and financing through token offerings. It received a grade of 18 out of 20.",
        caption: "The cover of my original dissertation.",
        resourceNote: "Original PDF in Portuguese, with an English abstract · 56 pages.",
        links: [
          { label: "Open thesis (PDF)", href: "/about/beatriz-ferreira-masters-thesis.pdf" },
          { label: "Download thesis", href: "/about/beatriz-ferreira-masters-thesis.pdf", download: true },
        ],
        image: { src: "/about/masters-thesis-cover.webp", thumbnail: "/about/masters-thesis-cover-thumb.webp", alt: "Cover of Beatriz Pereira Ferreira’s master’s dissertation, Ensaio sobre o Underpricing em ICOs, dated June 2025.", width: 990, height: 1400 },
      },
      {
        id: "iseg-diploma",
        title: "Completing my master’s.",
        label: "ISEG · Accounting, Taxation & Corporate Finance",
        group: "Graduation",
        text: "After Applied Mathematics, I completed my master’s in Accounting, Taxation and Corporate Finance at ISEG, with a final grade of 17 out of 20.",
        caption: "At ISEG, holding a diploma folder.",
        image: { src: "/about/iseg-diploma.webp", thumbnail: "/about/iseg-diploma-thumb.webp", alt: "Beatriz Ferreira holding a diploma folder outside ISEG.", width: 1500, height: 2000 },
      },
      {
        id: "iseg-graduation",
        title: "The diplomas, after the work.",
        label: "Graduation · ISEG",
        group: "Graduation",
        text: "A moment to mark the degrees I had worked towards, from Applied Mathematics to Accounting, Taxation and Corporate Finance — after the studying, the student initiatives and the thesis.",
        caption: "Graduation at ISEG.",
        image: { src: "/about/iseg-graduation.webp", thumbnail: "/about/iseg-graduation-thumb.webp", alt: "Beatriz Ferreira wearing a red graduation gown outside ISEG.", width: 1200, height: 1600 },
      },
    ],
  },
  {
    id: "crypto-research",
    title: "Crypto research & publications",
    eyebrow: "International collaborations",
    introduction: "I’ve worked as a crypto researcher with international companies, writing about DeFi and stablecoins. Along the way, research also brought me closer to the events where the industry meets.",
    topics: ["The Block", "The Big Whale", "Stablecoin Insider", "DeFi", "EBC Barcelona", "DAF London"],
    moments: [
      {
        id: "the-block-emergence",
        title: "Research, and behind the scenes.",
        label: "The Block · Crypto research",
        group: "The Block",
        text: "I worked as a crypto researcher for The Block. During that time, I also helped organise Emergence in Prague — a chance to contribute beyond research and support the work behind an industry event.",
        caption: "The Emergence team in Prague.",
        image: { src: "/about/emergence-team-prague.webp", thumbnail: "/about/emergence-team-prague-thumb.webp", alt: "A group photograph of the Emergence team on a stage beneath the event name.", width: 310, height: 207 },
      },
      {
        id: "the-big-whale-defi",
        title: "Writing about DeFi.",
        label: "The Big Whale · Client publications",
        group: "The Big Whale",
        text: "For The Big Whale, I produced several publications focused on decentralised finance (DeFi) for its clients. This was another part of my work researching and writing about crypto assets for an international audience.",
        caption: "Official promotional image from The Big Whale, used to identify the company; it does not show a specific publication I authored.",
        links: [{ label: "Visit The Big Whale", href: "https://www.thebigwhale.io/" }],
        image: { src: "/about/the-big-whale-research.webp", thumbnail: "/about/the-big-whale-research-thumb.webp", alt: "Official The Big Whale promotional image showing its digital platform and publications on a laptop.", width: 1200, height: 630 },
      },
      {
        id: "stablecoin-insider-year-end",
        title: "Bringing the research together.",
        label: "Stablecoin Insider · 2025 year-end report",
        group: "Stablecoin Insider",
        text: "At Stablecoin Insider, I contributed to publications and to The 2025 Stablecoin Year-End Report. The report took a great deal of work, bringing together research and contributions from the team and multiple partners.",
        caption: "The original report cover, including the participating partners’ logos.",
        links: [{ label: "Explore the report & get a copy", href: "https://stablecoininsider.org/2025-stablecoin-year-end-report/" }],
        resourceNote: "66 pages · English · Report access through Stablecoin Insider’s official page.",
        image: { src: "/about/stablecoin-year-end-2025.webp", thumbnail: "/about/stablecoin-year-end-2025-thumb.webp", alt: "Cover of The 2025 Stablecoin Year-End Report by Stablecoin Insider, dated December 2025, with partner logos.", width: 990, height: 1400 },
      },
      {
        id: "stablecoin-insider-credits",
        title: "A collaborative publication.",
        label: "Stablecoin Insider · Research & authorship",
        group: "Stablecoin Insider",
        text: "The report credits me as a Crypto Research Analyst, alongside the Stablecoin Insider team and partners. Its chapters bring together the market landscape, regulation, use cases, comparisons and an outlook for 2026.",
        caption: "The original overview and credits page. The publication is a collective work, not a solo-authored report.",
        links: [{ label: "View the official report page", href: "https://stablecoininsider.org/2025-stablecoin-year-end-report/" }],
        image: { src: "/about/stablecoin-report-credits.webp", thumbnail: "/about/stablecoin-report-credits-thumb.webp", alt: "Overview page crediting Beatriz Ferreira as Crypto Research Analyst together with the Stablecoin Insider team and partners.", width: 990, height: 1400 },
      },
      {
        id: "research-to-events-ebc-daf",
        title: "Where research met the room.",
        label: "EBC Barcelona & DAF London",
        group: "Into events",
        text: "I also did research for EBC Barcelona and DAF London. These collaborations were part of how I began attending more events — a bridge from researching the industry to being present in the rooms where it comes together.",
        caption: "At European Blockchain Convention in Barcelona. DAF London was a separate research collaboration.",
        image: { src: "/about/ebc-barcelona-research.webp", thumbnail: "/about/ebc-barcelona-research-thumb.webp", alt: "Beatriz Ferreira at European Blockchain Convention in front of the event’s sponsor backdrop.", width: 1080, height: 1440 },
      },
    ],
  },
  {
    id: "sport-and-free-time",
    title: "Sport & free time",
    eyebrow: "Away from work",
    introduction: "I started with karate, tried football and tennis, and spent eleven years swimming. Later came kickboxing, taekwondo and 5 km and 10 km races. Sport has taken different forms along the way.",
    topics: ["Karate", "Football", "Tennis", "Swimming", "Kickboxing", "Taekwondo", "Running"],
    moments: [
      {
        id: "childhood-karate",
        title: "A brief start with karate.",
        label: "Childhood · Karate",
        group: "Early years",
        text: "Karate was the first sport I tried as a child. I only stayed for a short time, and also tried football and tennis while growing up.",
        caption: "A photograph from my short time practising karate.",
        image: { src: "/about/childhood-karate.webp", thumbnail: "/about/childhood-karate-thumb.webp", alt: "Beatriz Ferreira as a child, wearing a karate uniform in a sports hall.", width: 1200, height: 1600 },
      },
      {
        id: "swimming-years",
        title: "Eleven years in the water.",
        label: "Swimming · 11 years",
        group: "Early years",
        text: "Swimming stayed with me for eleven years — a much longer chapter than my brief start with karate. It was part of the mix of sports I did growing up.",
        caption: "A moment from my swimming years.",
        image: { src: "/about/swimming-years.webp", thumbnail: "/about/swimming-years-thumb.webp", alt: "Beatriz Ferreira wearing a blue swimming cap and swimming goggles.", width: 1125, height: 2000 },
      },
      {
        id: "kickboxing-training",
        title: "Finding martial arts again.",
        label: "Kickboxing",
        group: "Kickboxing",
        text: "A little later, I fell in love with martial arts again and took up kickboxing. I’m still practising it today, alongside taekwondo.",
        caption: "A training photograph shared by Arena Lisboa, shown here in the Instagram screenshot I kept.",
        image: { src: "/about/kickboxing-training.webp", thumbnail: "/about/kickboxing-training-thumb.webp", alt: "An Instagram screenshot of a kickboxing training photograph shared by Arena Lisboa.", width: 899, height: 2000 },
      },
      {
        id: "kickboxing-training-group",
        title: "Training together.",
        label: "Kickboxing · Training",
        group: "Kickboxing",
        text: "A photograph with the kickboxing training group — another part of my return to martial arts.",
        caption: "With the group at kickboxing training.",
        image: { src: "/about/kickboxing-training-group.webp", thumbnail: "/about/kickboxing-training-group-thumb.webp", alt: "A kickboxing training group posing together on the gym mats.", width: 1600, height: 1200 },
      },
      {
        id: "kickboxing-nationals-2025",
        title: "Taking part at nationals.",
        label: "Kickboxing · 2025",
        group: "Kickboxing",
        text: "In 2025, I took part in the national kickboxing championship. My return to martial arts had also taken me into competition.",
        caption: "A moment from the national kickboxing championship in 2025.",
        image: { src: "/about/kickboxing-nationals-2025.webp", thumbnail: "/about/kickboxing-nationals-2025-thumb.webp", alt: "Competitors and a referee inside a kickboxing ring at a championship venue.", width: 1600, height: 738 },
      },
      {
        id: "kickboxing-competition-group",
        title: "Another side of competition.",
        label: "Kickboxing · Competition",
        group: "Kickboxing",
        text: "Away from the ring, a group photograph from this part of my kickboxing story.",
        caption: "A group photograph at a kickboxing competition.",
        image: { src: "/about/kickboxing-competition-group.webp", thumbnail: "/about/kickboxing-competition-group-thumb.webp", alt: "A kickboxing group posing together at a competition, with trophies visible in the foreground.", width: 1500, height: 1000 },
      },
      {
        id: "taekwondo-green-belt-2026",
        title: "From white to green.",
        label: "Taekwondo · February–July 2026",
        group: "Taekwondo",
        text: "I started taekwondo in February 2026, without giving up kickboxing. In July, I progressed three belt grades, from white to green. I’m continuing to progress.",
        caption: "With my green belt, July 2026.",
        image: { src: "/about/taekwondo-green-belt-2026.webp", thumbnail: "/about/taekwondo-green-belt-2026-thumb.webp", alt: "Beatriz Ferreira wearing a green taekwondo belt, standing between two people in martial arts uniforms.", width: 1500, height: 2000 },
      },
      {
        id: "running-race-day",
        title: "A different kind of starting line.",
        label: "Running · 5 km & 10 km",
        group: "Running",
        text: "Running has been part of my sporting life too. I’ve taken part in several 5 km and 10 km races, alongside the martial arts.",
        caption: "A race-day moment from São Silvestre de Almada, 2025.",
        image: { src: "/about/running-race-day.webp", thumbnail: "/about/running-race-day-thumb.webp", alt: "Beatriz Ferreira running at an evening race, wearing a numbered race bib.", width: 1600, height: 1066 },
      },
      {
        id: "running-event",
        title: "Moments from race days.",
        label: "Running",
        group: "Running",
        text: "Another photograph from the running events I’ve participated in — part of the same mix of 5 km and 10 km races.",
        caption: "At an evening running event.",
        image: { src: "/about/running-event.webp", thumbnail: "/about/running-event-thumb.webp", alt: "Participants gathered around a podium at an evening running event.", width: 1600, height: 1200 },
      },
    ],
  },
];
