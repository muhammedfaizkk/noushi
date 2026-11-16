export interface Room {
  id: string;
  number: string;
  title: string;
  location: string;
  state: string;
  category: "Beach" | "Mountain" | "City" | "Countryside";
  price: number;
  formattedPrice: string;
  image: string;
  tags: string[];
  description: string;
  host: {
    name: string;
    phone: string;
    responseSpeed: string;
  };
  amenities: string[];
  maxGuests: number;
}

export const ROOMS: Room[] = [
  {
    id: "varkala-cliff",
    number: "01",
    title: "Cliffside Sea-View Room",
    location: "Varkala, Kerala",
    state: "Kerala",
    category: "Beach",
    price: 4200,
    formattedPrice: "₹4,200",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    tags: ["Sea view", "Wi-Fi", "50 m walk to sea", "Breakfast included"],
    description:
      "Perched directly above the North Cliff of Varkala, wake up to panoramic Arabian Sea horizons and gentle coastal breezes. Handcrafted wooden furnishings, artisanal linen, and a private balcony overlooking the waves.",
    host: {
      name: "Anand",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: [
      "Panoramic Sea View",
      "Complimentary Kerala Breakfast",
      "High-speed Wi-Fi (150 Mbps)",
      "Air Conditioning",
      "Private Sundeck & Hammock",
      "50 m Direct Cliff Path to Beach",
    ],
    maxGuests: 2,
  },
  {
    id: "manali-cedar",
    number: "02",
    title: "Cedar Loft with Valley View",
    location: "Manali, Himachal Pradesh",
    state: "Himachal Pradesh",
    category: "Mountain",
    price: 3600,
    formattedPrice: "₹3,600",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    tags: ["Valley view", "Wi-Fi", "Heated rooms", "Work desk"],
    description:
      "Tucked amidst ancient deodar forests in Upper Manali, this warm timber loft offers floor-to-ceiling windows facing snow-dusted Himalayan peaks. Cozy bukhari heating and handcrafted local deodar woodwork.",
    host: {
      name: "Tenzin & Meera",
      phone: "+919876543210",
      responseSpeed: "Within 15 minutes",
    },
    amenities: [
      "Himalayan Snow Peak View",
      "Radiant Space Heating",
      "Handmade Cedar Woodwork",
      "Dedicated Workstation & Wi-Fi",
      "Organic Herb Tea Station",
      "Orchard Walking Trails",
    ],
    maxGuests: 2,
  },
  {
    id: "jaipur-haveli",
    number: "03",
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    category: "City",
    price: 5800,
    formattedPrice: "₹5,800",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    tags: ["Courtyard", "Wi-Fi", "Air conditioning", "Artisan handcrafted"],
    description:
      "Step into 180 years of Rajasthani architectural heritage. Featuring intricate stone jali arches, fresco ceilings, and an open central courtyard where morning chai is served beneath the desert sky.",
    host: {
      name: "Digvijay Singh",
      phone: "+919876543210",
      responseSpeed: "Within 5 minutes",
    },
    amenities: [
      "Private Heritage Courtyard Access",
      "Traditional Rajasthani Breakfast",
      "Silent Inverter AC",
      "Artisanal Block-Print Linens",
      "En-suite Brass Soaking Tub",
      "Curated Old City Heritage Walk",
    ],
    maxGuests: 2,
  },
  {
    id: "coorg-plantation",
    number: "04",
    title: "Plantation Cottage",
    location: "Coorg, Karnataka",
    state: "Karnataka",
    category: "Countryside",
    price: 4900,
    formattedPrice: "₹4,900",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80",
    tags: ["Garden", "Estate nature trails", "Free parking", "Bonfire area"],
    description:
      "Nestled inside a 40-acre heritage coffee and black pepper estate. Wake up to the aroma of freshly roasted beans and songbirds in the rainforest canopy. Private verandah and evening bonfire.",
    host: {
      name: "Bopanna",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: [
      "Private Coffee Estate Verandah",
      "Guided Morning Birding Walk",
      "Evening Firepit & Barbecue",
      "Home-cooked Kodava Meals",
      "Free Private Parking",
      "Rainforest Stream Access",
    ],
    maxGuests: 3,
  },
  {
    id: "goa-quarter",
    number: "05",
    title: "Old Quarter Studio",
    location: "Fontainhas, Goa",
    state: "Goa",
    category: "City",
    price: 2800,
    formattedPrice: "₹2,800",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
    tags: ["Wi-Fi", "Historic walking", "Kitchenette", "Balcony"],
    description:
      "Set in the heart of Latin Quarter Fontainhas with ochre-yellow Portuguese colonial facades and terracotta tiles. Features a private iron-wrought balcony, kitchenette, and easy stroll to artisan bakeries.",
    host: {
      name: "Maria & Carlos",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: [
      "Wrought-Iron Streetview Balcony",
      "Equipped Kitchenette & Espresso Maker",
      "High-speed Wi-Fi for Remote Work",
      "Air Conditioning",
      "Steps from Local Art Galleries & Cafes",
      "Complimentary Goa Heritage Map",
    ],
    maxGuests: 2,
  },
  {
    id: "gokarna-palms",
    number: "06",
    title: "Beach Hut by the Palms",
    location: "Gokarna, Karnataka",
    state: "Karnataka",
    category: "Beach",
    price: 2400,
    formattedPrice: "₹2,400",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
    tags: ["Beach access", "Breakfast included", "Hammock", "Ceiling fan"],
    description:
      "A rustic bamboo and thatch sanctuary just steps away from the untouched sands of Kudle Beach. Sway in your private hammock listening to gentle ocean tides under coconut palms.",
    host: {
      name: "Shankar",
      phone: "+919876543210",
      responseSpeed: "Within 15 minutes",
    },
    amenities: [
      "Direct Step-out Beach Access",
      "Private Verandah & Cotton Hammock",
      "Fresh Tropical Fruit Breakfast",
      "Open-air Eco Shower",
      "High-speed Fiber Wi-Fi in Lounge",
      "Sunset Yoga Mats Provided",
    ],
    maxGuests: 2,
  },
];
