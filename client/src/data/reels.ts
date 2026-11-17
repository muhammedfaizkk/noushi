export type Reel = {
  id: string;
  shortcode: string;
  title: string;
  location: string;
  image: string;
};

export const INSTAGRAM_HANDLE = "driftwood";
export const INSTAGRAM_URL = "https://instagram.com";

export const REELS: Reel[] = [
  {
    id: "haveli",
    shortcode: "DGs5wm8NJKQ",
    title: "Inside a 200-year-old haveli",
    location: "Jaipur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "estate",
    shortcode: "DIEe4Vwp3uz",
    title: "Morning walk on the estate",
    location: "Coorg, Karnataka",
    image:
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cliff",
    shortcode: "DJBlFwZtFYO",
    title: "Wake up above the cliff",
    location: "Varkala, Kerala",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "loft",
    shortcode: "DBggwOTNjAe",
    title: "Cedar light in the loft",
    location: "Manali, Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "quarter",
    shortcode: "DKUNKpgNSLU",
    title: "Balcony over the old quarter",
    location: "Fontainhas, Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },
];

export function reelWatchUrl(shortcode: string) {
  return `https://www.instagram.com/reel/${shortcode}/`;
}
