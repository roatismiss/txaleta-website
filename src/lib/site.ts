// ============================================================================
// Txaleta de Camiguin — central site config & content
// Single source of truth. Swap prices / copy / keys here, not in components.
// ============================================================================

export const site = {
  name: "Txaleta de Camiguin",
  shortName: "Txaleta",
  tagline: "Your Coastal Escape in Mambajao",
  description:
    "A boutique coastal resort on Camiguin Island — seaview suites, ocean-view glamping, an infinity pool and warm Filipino hospitality, just minutes from Camiguin Airport.",
  url: "https://txaletadecamiguin.com",

  location: {
    address: "Purok 6, Puting Balas, Mambajao, 9100 Camiguin, Philippines",
    city: "Mambajao",
    region: "Camiguin",
    country: "Philippines",
    airportNote: "5 minutes from Camiguin Airport",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Txaleta+de+Camiguin",
  },

  contact: {
    phone: "+63 917 770 4656",
    phoneRaw: "+639177704656",
    whatsapp: "639178182277",
    viber: "639178182277",
    email: "txaletadecamiguin@gmail.com",
  },

  social: {
    facebook: "https://www.facebook.com/txaletadecamiguin",
    instagram: "https://www.instagram.com/txaletadecamiguin",
    tiktok: "https://www.tiktok.com/@txaletadecamiguin",
  },

  hero: {
    // Cloudflare R2 — drop a new mp4 URL here anytime.
    videoUrl:
      "https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/Camiguin%20Island%20Video.mp4",
    poster: "/images/resort/Aerialview_txaleta.webp",
  },

  // CloudReef integration. Bookings POST here and land in CloudReef as `pending`.
  // Key is seeded by supabase migration 033_txaleta_seed.sql.
  // Set NEXT_PUBLIC_CLOUDREEF_URL in .env.local to point at the live CloudReef.
  cloudreef: {
    baseUrl: process.env.NEXT_PUBLIC_CLOUDREEF_URL ?? "https://app.cloudreef.io",
    widgetKey: "cr_pub_txaleta",
  },
} as const;

export const nav = [
  { label: "Accommodation", href: "/#accommodation" },
  { label: "Dining", href: "/#dining" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
] as const;

export type Room = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  cover: string;
  images: string[];
  maxOccupancy: number;
  amenities: string[];
};

export const rooms: Room[] = [
  {
    slug: "premier-seaview-suite",
    name: "Premier Seaview Suite",
    kicker: "Room for the ocean",
    description:
      "Floor-to-ceiling views of the sea, a private terrace and a plush king bed. Wake to the sound of the waves and step straight onto your own slice of the coast.",
    cover: "/images/rooms/ocean-view-suite/Ocean_view.webp",
    images: [
      "/images/rooms/ocean-view-suite/Ocean_view.webp",
      "/images/rooms/ocean-view-suite/Ocean_view_room.webp",
      "/images/rooms/ocean-view-suite/Ocean_view_private_terrace.webp",
      "/images/rooms/ocean-view-suite/Ocean_view_ved.webp",
    ],
    maxOccupancy: 2,
    amenities: ["Sea view", "Private terrace", "King bed", "Air conditioning", "WiFi", "Work desk"],
  },
  {
    slug: "ocean-view-glamping",
    name: "Ocean View Glamping",
    kicker: "Sleep under the stars",
    description:
      "Canvas luxury on the cliff's edge — a real bed, an en-suite rain shower and a private deck where the sunset pours straight into your tent.",
    cover: "/images/rooms/glamping/glamping_sunset_view.webp",
    images: [
      "/images/rooms/glamping/glamping_sunset_view.webp",
      "/images/rooms/glamping/glamping_bed.webp",
      "/images/rooms/glamping/cozy_glamping.webp",
      "/images/rooms/glamping/glamping_private_terrace.webp",
      "/images/rooms/glamping/glamping-private-area.webp",
      "/images/rooms/glamping/glamping_shower.webp",
      "/images/rooms/glamping/Glamping_raylight.webp",
    ],
    maxOccupancy: 2,
    amenities: ["Ocean view", "Private deck", "En-suite shower", "Queen bed", "Natural airflow", "WiFi"],
  },
  {
    slug: "deluxe-garden-room",
    name: "Deluxe Garden Room",
    kicker: "Room for two",
    description:
      "A serene double room wrapped in tropical garden, with a crisp en-suite bath and all the quiet comforts for a slow island stay.",
    cover: "/images/rooms/double-bedroom/double_bedroom.webp",
    images: [
      "/images/rooms/double-bedroom/double_bedroom.webp",
      "/images/rooms/double-bedroom/double_bedroom1.webp",
      "/images/rooms/double-bedroom/double_bedroom2.webp",
      "/images/rooms/double-bedroom/double_bedroom3.webp",
      "/images/rooms/double-bedroom/double_bedroom4.webp",
      "/images/rooms/double-bedroom/double_bedroom5.webp",
      "/images/rooms/double-bedroom/double_bedroom_bath.webp",
    ],
    maxOccupancy: 2,
    amenities: ["Garden view", "En-suite bath", "Double bed", "Air conditioning", "WiFi", "Wardrobe"],
  },
];

export const dining = {
  kicker: "Seaside dining",
  heading: "Flavours of the Island",
  body: "Fresh Filipino cooking and easy international plates, served over the water — from sunrise breakfast to long, golden-hour dinners at the café.",
  images: [
    "/images/dining/food_txaleta.webp",
    "/images/dining/breakfest_txaleta.webp",
    "/images/dining/nachos_sendiv.webp",
    "/images/dining/aerial_view_table.webp",
  ],
};

export type Experience = { title: string; description: string; image: string };

export const experiences: Experience[] = [
  {
    title: "Private Island Boat Tours",
    description: "Charter our boat to hidden coves, white sandbars and snorkeling reefs around Camiguin.",
    image: "/images/experiences/txaleta_private_boat.webp",
  },
  {
    title: "Jet Ski & Watersports",
    description: "Open the throttle across the bay, or keep it gentle along the shoreline.",
    image: "/images/experiences/jet_ski_txaleta.webp",
  },
  {
    title: "Mount Hibok-Hibok Treks",
    description: "Guided hikes up Camiguin's volcano, through rainforest, springs and ridgeline views.",
    image: "/images/resort/txaleta_forest.webp",
  },
  {
    title: "Island Scooter Rental",
    description: "Two wheels, one island — chase waterfalls and the sunken cemetery at your own pace.",
    image: "/images/resort/txaleta_rice_field.webp",
  },
];

export const gallery = [
  "/images/resort/txaleta_hero.webp",
  "/images/resort/night_view.webp",
  "/images/resort/terrace_view.webp",
  "/images/resort/txaleta_beach.webp",
  "/images/resort/rayligh_lounge.webp",
  "/images/resort/common-area.webp",
  "/images/resort/txaleta_sand.webp",
  "/images/resort/telescope.webp",
];

export type Testimonial = { quote: string; name: string; date: string };

// PLACEHOLDER reviews — swap with real Google / Facebook guest reviews.
export const testimonials: Testimonial[] = [
  {
    quote:
      "The most peaceful stay we've had in the Philippines. The seaview suite woke us up to the ocean every single morning.",
    name: "Chris",
    date: "March 2025",
  },
  {
    quote:
      "Glamping at Txaleta is unreal — the sunset pours right into the tent and breakfast is over the water. We'll be back.",
    name: "Sheerie",
    date: "July 2025",
  },
  {
    quote:
      "Warm hosts, spotless rooms and an infinity pool even better than the photos. Highly recommend Camiguin.",
    name: "Randulph",
    date: "April 2025",
  },
];
