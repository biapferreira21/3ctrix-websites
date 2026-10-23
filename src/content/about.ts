export type StoryMoment = {
  id: string;
  title: string;
  label: string;
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
    introduction: "I tried several sports as a child. I started with karate, and also played football and tennis. Swimming became a much longer chapter: eleven years.",
    topics: ["Karate", "Football", "Tennis", "Swimming"],
    moments: [
      {
        id: "childhood-karate",
        title: "A brief start with karate.",
        label: "Childhood · Karate",
        text: "Karate was the first sport I tried as a child. I only stayed for a short time, and also tried football and tennis while growing up.",
        caption: "A photograph from my short time practising karate.",
        image: { src: "/about/childhood-karate.webp", thumbnail: "/about/childhood-karate-thumb.webp", alt: "Beatriz Ferreira as a child, wearing a karate uniform in a sports hall.", width: 1200, height: 1600 },
      },
      {
        id: "swimming-years",
        title: "Eleven years in the water.",
        label: "Swimming · 11 years",
        text: "Swimming stayed with me for eleven years — a much longer chapter than my brief start with karate. It was part of the mix of sports I did growing up.",
        caption: "A moment from my swimming years.",
        image: { src: "/about/swimming-years.webp", thumbnail: "/about/swimming-years-thumb.webp", alt: "Beatriz Ferreira wearing a blue swimming cap and swimming goggles.", width: 1125, height: 2000 },
      },
    ],
  },
];
