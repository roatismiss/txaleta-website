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
    // Cloudflare R2 — videos cycle in order. Add/remove URLs freely.
    videos: [
      "https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/Camiguin%20Island%20Video.mp4",
      "https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/Camiguin%20Island%20Scooter%20Rental.mp4",
    ],
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
  { label: "Experiences", href: "/experiences" },
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
    kicker: "Sea at Eye Level",
    description:
      "A king bed turned toward floor-to-ceiling glass, where the Bohol Sea fills the room before you are fully awake. Step onto your private terrace and White Island sits on the water in the distance, a pale line of sand waiting for the banca.",
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
    kicker: "Canvas on the Cliff",
    description:
      "A proper bed under canvas at the cliff's edge, with an en-suite rain shower and a private deck above the Bohol Sea. Each evening the sunset reaches straight into the tent, and the only sounds are the water below and the wind off the sea.",
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
    kicker: "Inside the Green",
    description:
      "A double bed wrapped in tropical garden, with an en-suite bath and the day kept at a slower pace. You wake to leaf-shade and birdsong rather than sun on glass, the cooler, greener side of staying by a volcano.",
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
  kicker: "By the Sea",
  heading: "Breakfast Comes In on the Tide",
  body: "The café sits at the edge of the water, where breakfast arrives with the morning light and the boats heading out for White Island. Days are built on fresh Filipino cooking and a few easy international plates: fish landed that morning, fruit from the slopes behind Mambajao, lanzones when the season turns them sweet. By evening the sea goes gold, and dinner is something you stay with for a while.",
  images: [
    "/images/dining/food_txaleta.webp",
    "/images/dining/breakfest_txaleta.webp",
    "/images/dining/nachos_sendiv.webp",
    "/images/dining/aerial_view_table.webp",
  ],
};

export type Experience = { title: string; description: string; image: string; video?: string };

export const experiences: Experience[] = [
  {
    title: "Out to the Sandbars",
    description:
      "A banca carries you past quiet coves to White Island's bare white spit and the reefs below, where the Bohol Sea turns clear over coral and the island's sheltered giant clams.",
    image: "/images/experiences/txaleta_private_boat.webp",
  },
  {
    title: "The Bohol Sea, Faster",
    description:
      "Open throttle across open water, the volcano shrinking behind you. Jet skis and watersports for the mornings you would rather feel the sea than drift on it.",
    image: "/images/experiences/jet_ski_txaleta.webp",
  },
  {
    title: "Up the Living Volcano",
    description:
      "Guided ascents of active Hibok-Hibok climb through rainforest and spring-fed shade to a ridgeline where the whole island, and the sea around it, falls away below you.",
    image: "/images/resort/txaleta_forest.webp",
  },
  {
    title: "One Road, All Day",
    description:
      "Take the 64-kilometre ring road at your own pace: Katibawasan's falls, the cross marking the sunken cemetery, cold springs found between one town and the next.",
    image: "/images/resort/txaleta_rice_field.webp",
    video:
      "https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/Camiguin%20Island%20Scooter%20Rental.mp4",
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
