export const chapterThemes = {
  "university-and-initiatives": { surface: "#EEE7FA", mat: "#D9CBEE", paper: "#FCFAFF", accent: "#624592", text: "#4E455C" },
  "crypto-research": { surface: "#DEEEEE", mat: "#B8D6D7", paper: "#F5FCFC", accent: "#155963", text: "#344F54" },
  "events-as-a-founder": { surface: "#F4DCD1", mat: "#E9B6A3", paper: "#FFF8F3", accent: "#8F3C27", text: "#64443B" },
  "repsol-product-management": { surface: "#F5E7C7", mat: "#E9CB90", paper: "#FFFBF1", accent: "#7C4F0D", text: "#5D5038" },
  "community-and-whats-next": { surface: "#E2E8F5", mat: "#C4D0EB", paper: "#F8FAFF", accent: "#405380", text: "#434E68" },
  "sport-and-free-time": { surface: "#E2EBDD", mat: "#BBD0B3", paper: "#FAFDF7", accent: "#28583C", text: "#43513E" },
} as const;

export function chapterTheme(id: string) {
  return chapterThemes[id as keyof typeof chapterThemes] ?? chapterThemes["sport-and-free-time"];
}

export function storyImageLayout(image: { width: number; height: number; crop?: { width: number; height: number } }) {
  const width = image.crop?.width ?? image.width;
  const height = image.crop?.height ?? image.height;
  const ratio = width > 0 && height > 0 ? width / height : 1;
  return { ratio, panorama: ratio >= 1.2 };
}
