export type Reel = {
  id: string;
  shortcode: string;
  title: string;
  location: string;
};

export const REELS: Reel[] = [
  {
    id: "najaf",
    shortcode: "DGs5wm8NJKQ",
    title: "Najaf",
    location: "Iraq",
  },
  {
    id: "dokan",
    shortcode: "DIEe4Vwp3uz",
    title: "Dokan",
    location: "Mountain village",
  },
  {
    id: "road",
    shortcode: "DJBlFwZtFYO",
    title: "On the road",
    location: "Kurdistan",
  },
  {
    id: "kerala",
    shortcode: "DBggwOTNjAe",
    title: "Toward Kerala",
    location: "Saudi Arabia",
  },
  {
    id: "georgia",
    shortcode: "DKUNKpgNSLU",
    title: "Freedom Square",
    location: "Georgia",
  },
];

export function reelEmbedUrl(shortcode: string) {
  return `https://www.instagram.com/reel/${shortcode}/embed`;
}
