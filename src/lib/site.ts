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
    facebook: "https://www.facebook.com/p/Txaleta-de-Camiguin-61564911372698/",
    instagram: "https://www.instagram.com/txaletadecamiguin/",
    tiktok: "https://www.tiktok.com/@txaletadecamiguin",
  },

  hero: {
    // Cloudflare R2 — videos cycle in order. Add/remove URLs freely.
    videos: [
      "https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/Camiguin%20Island%20Video.mp4",
      "https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/Camiguin%20Island%20Scooter%20Rental.mp4",
    ],
    poster: "/images/resort/Aerialview_txaleta.webp",
    // Static images that slide in sequence before the video starts.
    slides: [
      "/images/resort/Aerialview_txaleta.webp",
      "/images/resort/txaleta_infinity_pool.jpg",
    ],
  },

  // CloudReef integration. Bookings POST here and land in CloudReef as `pending`.
  // Key is seeded by supabase migration 033_txaleta_seed.sql.
  //
  // baseUrl MUST be the CloudReef PLATFORM origin (app.cloudreef.io) — the only
  // place the /api/widget/* routes and /widget/chatbot.js actually live. It must
  // NEVER point at this marketing site's own domain (e.g. txaleta.cloudreef.io),
  // which has none of those routes and would 404 every booking + the chatbot.
  // We normalise empty/whitespace values and a trailing slash so a misconfigured
  // deploy falls back to the working default instead of silently breaking.
  cloudreef: {
    baseUrl:
      (process.env.NEXT_PUBLIC_CLOUDREEF_URL || "").trim().replace(/\/+$/, "") ||
      "https://app.cloudreef.io",
    widgetKey: "cr_pub_txaleta",
    // Public marketing site for the "Powered by CloudReef" credit (NOT the
    // platform origin above, which is app.cloudreef.io).
    productUrl: "https://cloudreef.io",
  },
} as const;

// ── Navigation + desktop mega-menu model ────────────────────────────────────
// Each top-level item may carry an optional `mega` panel (desktop-only): a
// text rail of quick links plus a row of image cards on the right.
export type MegaLink = { label: string; href: string };
export type MegaCard = { name: string; kicker: string; image: string; href: string };
export type MegaMenu = {
  kicker: string;
  heading: string;
  blurb: string;
  viewAll: MegaLink;
  links: MegaLink[];
  cards: MegaCard[];
};
export type NavItem = { label: string; href: string; mega?: MegaMenu };
// `nav` is declared at the foot of this file so its mega cards can be built
// from `rooms` / `experiences` (defined below).

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
  // Extended copy for the dedicated /dining page
  stories: [
    {
      kicker: "Morning",
      heading: "Breakfast at the Water's Edge",
      body: "The day begins with the tide. Coffee arrives first — Barako from the highlands, roasted dark and honest. Then the rest: fresh fruit from the market at Mambajao, eggs done simply, fish from the boats that left while you were still asleep. Breakfast at Txaleta is not rushed. The table faces the sea and the morning is yours for as long as you want it.",
      image: "/images/dining/breakfest_txaleta.webp",
      imageAlt: "Breakfast served by the sea at Txaleta",
    },
    {
      kicker: "All Day",
      heading: "Filipino Cooking, Kept Honest",
      body: "The kitchen runs on what the island gives. Sinigang built from tamarind and the morning's catch. Kare-kare slow-cooked until the sauce holds. Lanzones from the trees behind Mambajao, sweet enough to eat by the handful when the season comes. A few easy international plates for the afternoons when you want something lighter — but the Filipino table is the one worth knowing.",
      image: "/images/dining/food_txaleta.webp",
      imageAlt: "Filipino dishes at Txaleta de Camiguin",
    },
    {
      kicker: "Evening",
      heading: "Dinner While the Sea Goes Gold",
      body: "By late afternoon the light turns amber over the Bohol Sea. The café slows down. A cold San Miguel, or something from the bar. The nachos arrive — crisp, messy, exactly right. The snapper is grilled over coals with calamansi and butter. Dinner is unhurried here: the kind of meal that lasts past dark because no one at the table wants to be the first to leave.",
      image: "/images/dining/nachos_sendiv.webp",
      imageAlt: "Evening dining at Txaleta de Camiguin",
    },
  ],
  atmosphere: [
    "/images/resort/rayligh_lounge.webp",
    "/images/resort/common-area.webp",
    "/images/resort/terrace_view.webp",
    "/images/resort/night_view.webp",
  ],
  // QR room service — order from your phone, brought to your terrace.
  // (The "order" CTA points at the LIVE concierge/WhatsApp until QR ordering
  // is seeded for Txaleta in CloudReef — see plan follow-up.)
  roomService: {
    kicker: "Room Service, Reimagined",
    heading: "From Your Room, to Your Terrace",
    body: "Some afternoons you won't want to leave the deck. Scan the code in your room to browse the café's island delicacies — the morning's catch, a cold drink, something sweet — and order straight from your phone. We'll bring it to wherever you've settled: the pool, the lounge, your own private terrace.",
    image: "/images/rooms/ocean-view-suite/Ocean_view_private_terrace.webp",
    imageAlt: "A private terrace overlooking the Bohol Sea at Txaleta de Camiguin",
  },
};

// Homepage "seamless stay" section — the CloudReef-powered guest experience,
// framed as effortless hospitality (not as software). Pillar icons are mapped
// by index in the Seamless component.
export const seamless = {
  kicker: "Effortless by Design",
  heading: "Your Stay, Already Taken Care Of",
  body: "From the moment you book to the last morning on your terrace, the details run quietly in the background — so the only thing left to do is be on the island.",
  pillars: [
    {
      title: "Book in Real Time",
      body: "Live availability, and your room confirmed the moment you choose it — with an email in your inbox before you close the tab. No waiting days for a reply.",
    },
    {
      title: "A Concierge in Your Language",
      body: "Ask anything, any hour. Our concierge answers in your own language — the best tide for White Island, a late dinner on arrival, a boat for the morning.",
    },
    {
      title: "Order to Your Terrace",
      body: "Browse the café and order from your phone, brought to wherever you've settled — the pool, the lounge, your own private terrace.",
    },
  ],
};

export type Experience = { title: string; description: string; image: string; video?: string; hoverImage?: string };

export const experiences: Experience[] = [
  {
    title: "Out to the Sandbars",
    description:
      "A banca carries you past quiet coves to White Island's bare white spit and the reefs below, where the Bohol Sea turns clear over coral and the island's sheltered giant clams.",
    image: "/images/experiences/txaleta_private_boat.webp",
    hoverImage: "/images/experiences/Txaleta_private_boat_interior.webp",
  },
  {
    title: "The Bohol Sea, Faster",
    description:
      "Open throttle across open water, the volcano shrinking behind you. Jet skis and watersports for the mornings you would rather feel the sea than drift on it.",
    image: "/images/experiences/jet_ski_txaleta.webp",
    hoverImage: "/images/experiences/ski_jet_camiguin.jpg",
  },
  {
    title: "Up the Living Volcano",
    description:
      "Guided ascents of active Hibok-Hibok climb through rainforest and spring-fed shade to a ridgeline where the whole island, and the sea around it, falls away below you.",
    image: "/images/resort/txaleta_forest.webp",
    hoverImage: "/images/resort/telescope.webp",
  },
  {
    title: "One Road, All Day",
    description:
      "Take the 64-kilometre ring road at your own pace: Katibawasan's falls, the cross marking the sunken cemetery, cold springs found between one town and the next.",
    image: "/images/resort/txaleta_rice_field.webp",
  },
];

// Vehicle & watercraft rentals — shown on /experiences#rentals. Prices mirror
// the CloudReef bookable activities (migration 045) so the site and the folio
// charge match. Edit prices/copy here, the single source of truth.
export type RentalRate = { label: string; price: string };
export type Rental = { name: string; blurb: string; rates: RentalRate[] };

export const rentals = {
  kicker: "Getting Around",
  heading: "The Island, at Your Own Pace",
  body: "Take Camiguin on your own terms — a scooter for the coast road, a vehicle for the family, or the open sea by jet ski. We arrange it all from the front desk and add it straight to your stay.",
  items: [
    {
      name: "Scooter",
      blurb: "Nimble and easy for solo island cruising — the simplest way to take the 64-kilometre ring road at your own pace.",
      rates: [{ label: "Per day", price: "₱450" }],
    },
    {
      name: "SUV / AUV",
      blurb: "Spacious and comfortable for families and groups — room for everyone, and for the day's plans.",
      rates: [
        { label: "Per day", price: "₱2,850" },
        { label: "Half day", price: "₱1,500" },
      ],
    },
    {
      name: "Local Driver",
      blurb: "Add a local driver for ease and insider tips around the island — let someone who knows the roads do the driving.",
      rates: [
        { label: "Per day", price: "+₱1,000" },
        { label: "Half day", price: "+₱500" },
      ],
    },
    {
      name: "Jet Ski",
      blurb: "Thrilling rides across the Bohol Sea, with safety gear and a full orientation included before you set off.",
      rates: [
        { label: "4 hours", price: "₱7,000" },
        { label: "Additional hour", price: "₱1,500" },
      ],
    },
  ] as Rental[],
  note: "Every rental comes with essential inclusions, flexible durations and a clear fuel-return policy — making each journey smooth, comfortable and tailored to your stay.",
};

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

// ============================================================================
// Navigation — top bar + desktop mega menus
// Declared last so the mega cards can read from `rooms` / `experiences` above.
// ============================================================================

const diningMega: MegaMenu = {
  kicker: "The Café",
  heading: "Dining by the Sea",
  blurb:
    "Fresh Filipino cooking at the water's edge — breakfast with the tide, long lunches, and dinners that last past dark.",
  viewAll: { label: "See the Full Story", href: "/dining" },
  links: [
    { label: "Breakfast & Coffee", href: "/dining#morning" },
    { label: "Filipino Kitchen", href: "/dining#all-day" },
    { label: "Evening Menu", href: "/dining#evening" },
  ],
  cards: [
    { name: "Breakfast by the Tide", kicker: "Morning", image: "/images/dining/breakfest_txaleta.webp", href: "/dining#morning" },
    { name: "The Filipino Table", kicker: "All Day", image: "/images/dining/food_txaleta.webp", href: "/dining#all-day" },
    { name: "Evenings at the Café", kicker: "Evening", image: "/images/dining/aerial_view_table.webp", href: "/dining#evening" },
  ],
};

const accommodationMega: MegaMenu = {
  kicker: "Stay With Us",
  heading: "Rooms by the Sea",
  blurb:
    "Ten rooms between the volcano and the Bohol Sea — seaview suites, cliff-edge glamping and quiet garden retreats.",
  viewAll: { label: "All Accommodation", href: "/accommodation" },
  links: [
    { label: "Inclusions & Amenities", href: "/accommodation#inclusions" },
    { label: "Dining by the Sea", href: "/#dining" },
    { label: "The Gallery", href: "/#gallery" },
    { label: "Book Direct", href: "/book" },
  ],
  cards: rooms.map((r) => ({
    name: r.name,
    kicker: r.kicker,
    image: r.cover,
    href: `/accommodation#${r.slug}`,
  })),
};

const experiencesMega: MegaMenu = {
  kicker: "Things to Do",
  heading: "Meet the Island",
  blurb:
    "By banca, by ridgeline, by the slow turn of a coastal road — choose how you take Camiguin.",
  viewAll: { label: "All Experiences", href: "/experiences" },
  links: [
    { label: "Island Boat Tours", href: "/experiences" },
    { label: "Mount Hibok-Hibok", href: "/experiences" },
    { label: "Vehicle Rentals", href: "/experiences#rentals" },
    { label: "Beyond the Resort", href: "/experiences" },
    { label: "Plan Your Stay", href: "/book" },
  ],
  cards: experiences.slice(0, 3).map((e) => ({
    name: e.title,
    kicker: "Signature",
    image: e.image,
    href: "/experiences",
  })),
};

export const nav: NavItem[] = [
  { label: "Accommodation", href: "/accommodation", mega: accommodationMega },
  { label: "Dining", href: "/dining", mega: diningMega },
  { label: "Experiences", href: "/experiences", mega: experiencesMega },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];
