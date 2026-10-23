export type StoryMoment = {
  id: string;
  title: string;
  label: string;
  group?: string;
  text: string;
  caption: string;
  image: { src: string; thumbnail: string; alt: string; width: number; height: number };
};

export type StoryChapter = {
  id: string;
  title: string;
  eyebrow: string;
  introduction: string;
  topics: readonly string[];
  moments: readonly StoryMoment[];
};

// Add new moments to a chapter, or add another chapter. Only supplied stories and
// photographs belong here; no inferred ages, dates, achievements or motivations.
export const storyChapters: readonly StoryChapter[] = [
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
