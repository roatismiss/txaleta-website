// ============================================================================
// Txaleta de Camiguin — central site config & content
// Single source of truth. Swap prices / copy / keys here, not in components.
// ============================================================================

export const site = {
  name: "Txaleta de Camiguin",
  shortName: "Txaleta",
  tagline: "Come Home to Camiguin",
  description:
    "A family-owned boutique resort on a Camiguin clifftop — Filipino-Spanish heritage, ocean-view rooms, an infinity pool, personalized island experiences and heartfelt hospitality, just minutes from Camiguin Airport.",
  url: "https://txaletadecamiguin.com",

  location: {
    address: "Purok 6, Puting Balas, Mambajao, 9100 Camiguin, Philippines",
    city: "Mambajao",
    region: "Camiguin",
    country: "Philippines",
    airportNote: "15 minutes from Camiguin Airport",
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

  // Cloudbeds Booking Engine. Used while CloudReef is NOT yet live at the
  // property: Cloudbeds is the single source of truth — direct bookings + OTA
  // inventory kept in sync by the Cloudbeds channel manager behind it.
  //
  // `propertyId` is the code in the engine URL hotels.cloudbeds.com/reservation/<this>.
  // (Txaleta = 4lfwvW, from the client's Cloudbeds rep.) Override via the Vercel
  // env var NEXT_PUBLIC_CLOUDBEDS_PROPERTY_ID. Empty → /book shows a graceful
  // phone/WhatsApp fallback (never a blank page).
  //
  // NOTE: do NOT add an `/en/` locale prefix — hotels.cloudbeds.com/en/reservation/<id>
  // returns HTTP 400. The engine has its own in-UI language switch.
  cloudbeds: {
    propertyId: (process.env.NEXT_PUBLIC_CLOUDBEDS_PROPERTY_ID || "").trim() || "4lfwvW",
    currency: "PHP",
  },
} as const;

// Which booking engine the public site uses RIGHT NOW.
//   "cloudbeds" → /book embeds the Cloudbeds Booking Engine. Cloudbeds is the
//                 single source of truth for PAID bookings + the OTA channel
//                 manager behind it. The CloudReef concierge chatbot STAYS on
//                 (it only captures leads, never books). The CloudReef promo
//                 popup is off — its discount codes aren't redeemable on the
//                 Cloudbeds engine (configure promos in Cloudbeds instead).
//   "cloudreef" → /book uses the native CloudReef BookingFlow + promo popup.
// Flip this ONE value to "cloudreef" when CloudReef goes live at the property —
// all the CloudReef code stays in the repo, nothing else to change.
export const bookingProvider: "cloudbeds" | "cloudreef" = "cloudbeds";

// How the Cloudbeds engine is presented on /book:
//   "new-tab" → guest is handed off to the engine in a new FIRST-PARTY tab
//               (deep-linked with their dates). Works everywhere incl. iOS
//               Safari + Facebook/Instagram in-app browsers. SAFE DEFAULT.
//   "be-plus" → (future) Cloudbeds Booking Engine Plus / Immersive Experience
//               web component embedded directly in-page — true first-party embed,
//               works on iPhone. Needs the embed code from the client. Until
//               wired up, this behaves like "new-tab".
//   "iframe"  → legacy inline iframe. DEPRECATED by Cloudbeds — its SameSite
//               cookies are blocked inside a cross-origin iframe on iOS Safari /
//               in-app browsers, breaking payment mid-checkout. Do NOT use live.
export const cloudbedsEmbedMode: "new-tab" | "be-plus" | "iframe" = "be-plus";

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

// Marketing display order for the Accommodation page + homepage section. Names
// are matched case-insensitively against the LIVE Cloudbeds room-type names —
// the ones listed here surface first, in this order; everything else follows by
// ascending rate. Lets the client feature rooms WITHOUT a CloudReef redeploy.
// (Use the exact Cloudbeds names, e.g. "Glamping Dome Tent", not "Glamping Tent".)
export const featuredRoomOrder: string[] = [
  "Glamping Dome Tent",
  "Balcony Seaview Room",
  "Villa Room with Shared Lanai",
];

// The small uppercase label above each room name on the cards. Price is
// intentionally NOT shown on the marketing cards — the exact, live rate lives in
// the Cloudbeds booking engine at /book. Keyed by the live Cloudbeds room-type
// name (whitespace-insensitive); unlisted rooms use `roomKickerFallback`.
export const roomKickers: Record<string, string> = {
  "Glamping Dome Tent": "Canvas on the Cliff",
  "Balcony Seaview Room": "Sea from the Balcony",
  "Villa Room with Shared Lanai": "Shared Lanai Living",
  "Premier Seaview Room": "Sea at Eye Level",
  "Garden & Pool View Family Room": "Garden & Pool",
  "Ocean View Family Nook Lower deck": "Ocean View Nook",
};
export const roomKickerFallback = "Oceanfront Stay";

export const dining = {
  // Short kicker for the homepage section; the long line lives in `subheading`.
  kicker: "Filipino Heart, Spanish Soul",
  heading: "Dining at Txaleta",
  subheading: "One of Camiguin's Most Memorable Dining Experiences",
  body:
    "Perched on a scenic clifftop overlooking the sea, Txaleta offers a unique dining experience that brings together Filipino warmth, Spanish heritage, breathtaking ocean views, and thoughtfully prepared cuisine. Whether you're looking for breakfast in Camiguin, a leisurely lunch with a view, moonlight cocktails, or dinner under the stars, our restaurant welcomes both resort guests and walk-in visitors seeking great food and unforgettable island hospitality.",
  images: [
    "/images/dining/food_txaleta.webp",
    "/images/dining/breakfest_txaleta.webp",
    "/images/dining/nachos_sendiv.webp",
    "/images/dining/aerial_view_table.webp",
  ],
  // Extended copy for the dedicated /dining page (client copywriting, verbatim).
  stories: [
    {
      id: "all-day",
      kicker: "The Kitchen",
      heading: "Filipino-Spanish Cuisine Rooted in Family Tradition",
      body:
        "Our menu celebrates the flavors that have shaped our family's story. Inspired by both Filipino and Spanish culinary traditions, we serve dishes designed to be shared and enjoyed together — fresh seafood, local ingredients, traditional recipes, and island flavors that honor both heritage and home. From paella and tapas to beloved Filipino favorites, every dish is prepared with care and meant to nourish both body and spirit.",
      image: "/images/dining/food_txaleta.webp",
      imageAlt: "Filipino-Spanish dishes at Txaleta de Camiguin",
    },
    {
      id: "morning",
      kicker: "Morning",
      heading: "Breakfast with a View in Camiguin",
      body:
        "Mornings at Txaleta are unhurried. Wake up to freshly brewed coffee, tropical fruits, homemade specialties, and breakfast dishes served alongside panoramic ocean views and the gentle rhythm of island life. Whether you're preparing for a day of adventure or simply enjoying a slow morning, breakfast at Txaleta is one of the most peaceful ways to begin your day in Camiguin.",
      image: "/images/dining/breakfest_txaleta.webp",
      imageAlt: "Breakfast with an ocean view at Txaleta de Camiguin",
    },
    {
      id: "evening",
      kicker: "Evening",
      heading: "Sunset Dining Overlooking the Sea",
      body:
        "As the sun begins to set, our clifftop location offers one of the most beautiful dining settings in Camiguin. Gather with family and friends, enjoy fresh island flavors, and watch the sky transform into shades of gold, orange, and pink while overlooking the sea. These are the moments our guests remember long after their holiday ends.",
      image: "/images/dining/aerial_view_table.webp",
      imageAlt: "Sunset dining overlooking the sea at Txaleta de Camiguin",
    },
  ],
  family: {
    kicker: "Gather",
    heading: "Family Dining, Celebrations & Special Occasions",
    body:
      "Some of life's best memories are made around the table. Whether you're celebrating a birthday, anniversary, family reunion, wedding gathering, or simply enjoying a meal together, our team is happy to help create a dining experience that feels personal and memorable. Private dining arrangements and customized menus are available upon request.",
    image: "/images/resort/common-area.webp",
    imageAlt: "Family dining and celebrations at Txaleta de Camiguin",
  },
  local: {
    kicker: "From the Island",
    heading: "Local Ingredients, Island Flavors",
    body:
      "Whenever possible, we source ingredients locally and support the Camiguin community that makes this island so special. Fresh seafood, tropical fruits, locally grown produce, and regional flavors inspire much of what we serve — letting guests enjoy an authentic taste of Camiguin while supporting local farmers, fishermen, and suppliers.",
    image: "/images/dining/nachos_sendiv.webp",
    imageAlt: "Local Camiguin ingredients and island flavors at Txaleta",
  },
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
  closing: {
    heading: "Come Hungry. Leave Nourished.",
    body:
      "At Txaleta, we hope every meal leaves you with more than a full stomach — a story shared, a laugh remembered, a sunset enjoyed, and the feeling of having gathered around a table where you truly belong.",
    signoff: ["Welcome to the table.", "Welcome home."],
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
      "A private speedboat carries you past quiet coves to White Island's bare white spit and the reefs below, where the Bohol Sea turns clear over coral and the island's sheltered giant clams.",
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
        { label: "3 hours", price: "₱7,000" },
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
// Brand pillars — the five core ideas from the brand book (txaleta_branding.pdf).
// ============================================================================
export type Pillar = { title: string; idea: string; quote: string };

export const pillars: Pillar[] = [
  {
    title: "Family-Centered Hospitality",
    idea: "Guests are family.",
    quote:
      "We treat every guest as family — offering warmth, care, and genuine connections rooted in Filipino and Spanish traditions of hospitality.",
  },
  {
    title: "Cultural Harmony & Heritage",
    idea: "Filipino heart, Spanish soul.",
    quote:
      "We celebrate our Filipino-Spanish roots by honoring tradition while creating space for shared cultural discovery and pride.",
  },
  {
    title: "Wellness Through Simplicity",
    idea: "Nature and nourishment, made personal.",
    quote:
      "We believe in restorative living — grounded in nature, gentle rhythms, and intentional design that nourishes body, mind, and spirit.",
  },
  {
    title: "Sustainable Island Living",
    idea: "Respect for the land that gives us life.",
    quote:
      "Our commitment to Camiguin's natural beauty means treading lightly, sourcing locally, and uplifting the community around us.",
  },
  {
    title: "Timeless Togetherness",
    idea: "Space to be present.",
    quote:
      "We create space for slow, meaningful moments — where generations come together and time feels both sacred and simple.",
  },
];

// ============================================================================
// Signature Txaleta experiences — the curated heritage + wellness rituals from
// the brand book. (Distinct from the island ACTIVITIES in `experiences` above.)
// ============================================================================
export type SignatureExperience = {
  name: string;
  tagline: string;
  body: string;
  image: string;
};

export const signature = {
  kicker: "Signature Experiences",
  heading: "Rituals Made for Togetherness",
  body:
    "Woven through every stay are the small ceremonies that make Txaleta itself — heritage on the table, wellness by the sea, and slow evenings under the stars. Tell us what your family loves and we'll arrange the rest.",
  items: [
    {
      name: "Almusal sa Bahay",
      tagline: "Family Heritage Breakfast",
      body:
        "A slow morning ritual served in-room or al fresco — heirloom Filipino-Spanish plates like tsokolate-e, pan de sal con keso de bola, garlic adobo, and fresh Camiguin mango. Comfort food, storytelling, and shared moments.",
      image: "/images/dining/breakfest_txaleta.webp",
    },
    {
      name: "Sunrise Saludo",
      tagline: "Cliffside Yoga at Dawn",
      body:
        "Gentle, breath-centered yoga overlooking the sea at sunrise — with Mantigue Island on the horizon, visible right from Txaleta and framed by birdsong and the rhythm of Camiguin's early light. Designed for all levels — a calm, grounded way to begin the day.",
      image: "/images/resort/terrace_view.webp",
    },
    {
      name: "Liit na Yogis",
      tagline: "Kids' Mindful Movement",
      body:
        "A playful yoga session for children — stories, animal poses, and breathwork in the garden or shaded lanai, guided by certified kids' instructors. Whole-family wellness, and a quiet moment for parents.",
      image: "/images/resort/txaleta_forest.webp",
    },
    {
      name: "Hilot & Heritage",
      tagline: "Wellness Afternoon",
      body:
        "Traditional hilot massage with a volcanic salt foot soak and native herbal tea — local oils, skilled hands, and ancestral healing wisdom. Deep relaxation rooted in Filipino tradition.",
      image: "/images/resort/rayligh_lounge.webp",
    },
    {
      name: "La Merienda",
      tagline: "Sunset Picnic",
      body:
        "A curated seaside or garden picnic — or a barefoot spread on White Island's powder-white sandbar — with ensaymada, churros con tsokolate, fresh coconut juice or sangria, blankets, woven mats, and a reflection journal included. Made for golden-hour bonding.",
      image: "/images/resort/txaleta_sand.webp",
    },
    {
      name: "Camiguin Roots",
      tagline: "Island Heritage Tour",
      body:
        "A soulful exploration of Camiguin's heritage — the Old Spanish Church Ruins, the Sunken Cemetery, ancestral homes, and the slopes of Mt. Hibok-Hibok — guided by local storytellers sharing Filipino-Spanish history. Depth, learning, and real cultural connection.",
      image: "/images/resort/txaleta_rice_field.webp",
    },
    {
      name: "Pamilya sa Palayok",
      tagline: "Family Cooking Session",
      body:
        "An interactive kitchen experience at Txaleta's restaurant — fast becoming one of the best up-and-coming tables in Camiguin — where you cook paella filipina, rellenong bangus, or bibingka alongside a local chef and learn the stories behind each dish. Joyful bonding through food and shared tradition.",
      image: "/images/dining/food_txaleta.webp",
    },
    {
      name: "Tahimik Nights",
      tagline: "Digital Detox & Stargazing",
      body:
        "After an evening swim in Ardent Hot Springs, settle into a tech-free night of oil lamps, stars, and local myths — cacao or salabat in hand, slow music and gentle storytelling under the Camiguin sky. A soul-soothing break from the noise.",
      image: "/images/resort/night_view.webp",
    },
  ] as SignatureExperience[],
};

// ============================================================================
// Ideal guests — who Txaleta is for (client onboarding brief).
// ============================================================================
export type IdealGuest = { title: string; body: string };

export const idealGuests = {
  kicker: "Who Txaleta Is For",
  heading: "Made for Those Who Travel with Heart",
  body:
    "We welcome everyone, but we have a special place in our hearts for travelers who value meaningful experiences over busy itineraries, connection over crowds, and memories over material things.",
  items: [
    {
      title: "Families Seeking Quality Time",
      body:
        "Multigenerational holidays, long-awaited reunions, or a simple weekend escape — built for the moments that happen around a shared table, during a sunset conversation, or while exploring the island together.",
    },
    {
      title: "Couples Looking to Slow Down",
      body:
        "Space to reconnect and unwind — sunrise views, leisurely breakfasts, island adventures, and peaceful evenings by the sea, set for meaningful moments.",
    },
    {
      title: "Wellness & Slow-Travel Enthusiasts",
      body:
        "For those who appreciate a slower pace and the restorative power of nature — a morning by the infinity pool, a quiet walk, a hike up Hibok-Hibok, or simply the sea breeze and a good book.",
    },
    {
      title: "Cultural & Island Explorers",
      body:
        "Curious travelers who seek authentic experiences — local traditions, regional cuisine, the stories behind a place, and the corners beyond the typical tourist route.",
    },
  ] as IdealGuest[],
};

// ============================================================================
// About page content (client copywriting). Single source of truth for /about.
// ============================================================================
export const about = {
  hero: {
    kicker: "About Txaleta de Camiguin",
    heading: "Where Heritage, Hospitality & Island Living Come Together",
    image: "/images/resort/Aerialview_txaleta.webp",
  },
  intro:
    "On a scenic clifftop overlooking the sea, Txaleta de Camiguin is a family-owned boutique resort in Mambajao designed for travelers seeking meaningful experiences, breathtaking ocean views, and the warmth of genuine hospitality. More than a place to stay, Txaleta is a place to slow down, reconnect, and experience island life at a gentler pace — whatever brings you here, our goal is simple: to make you feel at home.",
  sections: [
    {
      kicker: "Our Story",
      heading: "A Family Dream, Rooted in Camiguin",
      body: [
        "Txaleta began as a family dream inspired by a love for Camiguin, hospitality, and the traditions that bring people together.",
        "The name “Txaleta” comes from the Spanish word for a small home or cottage, reflecting our family's Spanish heritage and our vision of a welcoming sanctuary where guests are treated like family. Today that vision continues in every part of the guest experience — personalized service, thoughtfully designed spaces, shared meals, and island adventures.",
        "We believe the best memories are often the simplest ones: a sunrise shared with loved ones, conversations around the table, laughter by the pool, and moments of stillness overlooking the sea.",
      ],
      image: "/images/resort/common-area.webp",
    },
    {
      kicker: "Filipino Heart, Spanish Soul",
      heading: "A Blend of Two Cultures",
      body: [
        "Our Filipino-Spanish heritage influences everything we do — from our architecture and interiors to our cuisine and hospitality, Txaleta reflects a blend of cultures rooted in family, generosity, tradition, and togetherness.",
        "Every detail has been thoughtfully chosen to create a space that feels elegant yet comfortable, refined yet welcoming. It is luxury without pretense, and hospitality from the heart.",
      ],
      image: "/images/resort/rayligh_lounge.webp",
    },
    {
      kicker: "Designed for Connection",
      heading: "Space for Meaningful Moments",
      body: [
        "At Txaleta, travel is about more than visiting a destination. It is about creating space for family, friendship, wellness, and meaningful moments.",
        "Mornings begin with spectacular sunrises. Days unfold at a slower pace. Evenings are spent gathered around the table sharing stories, food, and laughter — the moments that stay with you long after you've returned home.",
      ],
      image: "/images/dining/aerial_view_table.webp",
    },
  ],
  location: {
    kicker: "A Unique Location in Camiguin",
    heading: "The Heart of the Island, a Peaceful Retreat from the Crowds",
    body:
      "Located in Mambajao, Txaleta offers easy access to many of Camiguin's most famous attractions while remaining a quiet retreat. After a day of exploring the island's natural wonders, return to panoramic ocean views, island breezes, and unforgettable sunsets.",
    attractions: [
      "White Island Sandbar",
      "Mantigue Island Nature Park",
      "Katibawasan Falls",
      "Tuasan Falls",
      "Sunken Cemetery",
      "Old Church Ruins",
      "Sto. Niño Cold Spring",
      "Ardent Hot Spring",
      "Mt. Hibok-Hibok",
    ],
    image: "/images/resort/aerial_view_camiguin_2.jpg",
  },
  whyChoose: {
    kicker: "What Makes Txaleta Special",
    heading: "More Than a Resort. A Place to Belong.",
    body:
      "Many travelers come for the ocean views, the infinity pool, and the villas — but what they remember most is how they felt: welcomed, cared for, and completely at home.",
    points: [
      "Family-owned boutique resort in Camiguin",
      "Personalized hospitality and local recommendations",
      "Infinity pool with panoramic ocean views",
      "Filipino-Spanish heritage and authentic island charm",
      "Customized tours and experiences",
      "Easy access to Camiguin's top attractions",
      "Restaurant serving Filipino-Spanish cuisine",
      "A peaceful retreat for connection, wellness, and togetherness",
    ],
  },
  comeHome: {
    heading: "Come Home to Txaleta",
    body:
      "Whether you're searching for a boutique resort in Camiguin, a family-friendly island getaway, or a romantic retreat, we invite you to experience the island through our eyes.",
    closing: ["Come for the views.", "Stay for the feeling.", "Welcome home."],
  },
};

// ============================================================================
// Community page content — "The Heart of Camiguin" (client copywriting).
// Single source of truth for /community. Image paths reuse existing resort
// photography as placeholders; swap for real artisan / team / guide photos.
// ============================================================================
export const community = {
  hero: {
    kicker: "Community, Culture & Island Stewardship",
    heading: "The Heart of Camiguin",
    image: "/images/resort/txaleta_rice_field.webp",
  },
  quote:
    "Luxury is not only found in beautiful places, but in the people who make those places unforgettable.",
  intro: [
    "A stay at Txaleta de Camiguin is a way into something larger than a destination.",
    "This island was shaped by hand — by fishermen and boatmen, guides and farmers, artists and families who have looked after Camiguin for generations. They are its storytellers and its keepers. When we built Txaleta, we didn't want to sit apart from that. We wanted to belong to it.",
    "So we made a decision early on: tourism here should give back more than it takes. Through local hiring, real partnerships, and a lighter footprint on the land and sea, we want every stay to leave Camiguin a little better than we found it.",
  ],
  stories: [
    {
      kicker: "People First",
      heading: "We Hire From the Community",
      body: [
        "We hire from the community first — and we mean it.",
        "Some of the people who welcome you today came to us with no hospitality background at all. Our best cook started as a helper on our construction site; we saw how he worked, trained him, and gave him a kitchen. We've hired housewives stepping into their first job, and a senior woman whom others might have passed over.",
        "What they brought wasn't a résumé. It was character — and that, we've learned, you can build a resort on.",
      ],
      image: "/images/community/the-staff.jpg",
    },
    {
      kicker: "Growing Together",
      heading: "We Hire for Potential, Not Polish",
      body: [
        "Most of our team began their journey without formal training. What they had instead was integrity, kindness, and the willingness to learn — and we've built everything else around that.",
        "Through hands-on mentoring and patient, day-by-day coaching, our people gain real skills, real confidence, and a real path forward. The goal was never just to give someone a job. It's to give them a future.",
        "As Txaleta grows, we want our team to grow with it — today's helpers becoming tomorrow's supervisors, chefs, and managers, all from right here on the island.",
      ],
      image: "/images/community/staff-growing.jpg",
    },
  ],
  promise: {
    heading: "Our Promise",
    points: ["We hire for character.", "We train for excellence.", "We grow together."],
  },
  artisans: {
    kicker: "Celebrating Local Artisans",
    heading: "The Hands Behind Camiguin",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "Twenty years ago, sea glass jewelry quietly faded from Camiguin. It came back through the hands of one artist who revived the craft — and the work speaks for itself.",
          "We're proud to feature Natalia Sea Glass, who turns glass weathered smooth by decades of tides into jewelry and keepsakes you can carry home. Each piece is a fragment of Camiguin's own shoreline — proof that the most sustainable luxury is the kind the ocean already made.",
        ],
        link: {
          label: "Follow @nataliaseaglass",
          href: "https://www.instagram.com/nataliaseaglass/",
        },
        image: "/images/resort/txaleta_sand.webp",
      },
      {
        name: "Local Artists",
        body: [
          "Walk through Txaleta — especially the new wing — and you'll find the island on the walls.",
          "Paintings, photography, handcrafted décor: works by Camiguin artists who capture the place better than any brochure could. We surround our guests with their work to put island talent in front of new eyes, and to let the people who live here tell their own story.",
        ],
        image: "/images/resort/terrace_view.webp",
      },
    ],
  },
  mountain: {
    kicker: "Walking With the Mountain",
    heading: "Mt. Hibok-Hibok Guides",
    body: [
      "Guests ask us almost every week how to reach the summit. We always answer the same way: with the people who know it best.",
      "Our local mountain guides carry generations of knowledge about Camiguin's volcanic slopes — its forests, its wildlife, its moods — and they make every trek both safe and unforgettable. By sending climbers their way, we help keep both the mountain and a way of life intact.",
    ],
    image: "/images/resort/txaleta_forest.webp",
  },
  sea: {
    kicker: "Guardians of the Sea",
    heading: "Camiguin Below the Surface",
    items: [
      {
        name: "Mantigue Island",
        body: [
          "Just offshore, clear water opens onto living coral and sea turtles gliding through the shallows.",
          "We send guests out with local Mantigue guides who know how to share this place without disturbing it — keeping a respectful distance from the wildlife and helping protect one of the island's most treasured sanctuaries.",
        ],
        image: "/images/resort/txaleta_beach.webp",
      },
      {
        name: "Scuba Diving with Scuba de Oro",
        body: [
          "There's a whole other Camiguin below the surface: volcanic reefs, healthy coral, and marine life that makes this one of the Philippines' quietest diving secrets.",
          "We work hand in hand with Scuba de Oro — they look after our guests underwater, and we send divers their way. It's a real partnership, the kind where two local businesses lift each other instead of competing, and where every dive is run safely and with respect for the reef.",
        ],
        image: "/images/experiences/txaleta_bed_shark.webp",
      },
    ],
  },
  partners: {
    kicker: "Supporting Local Businesses",
    heading: "Every Stay Sends Opportunity Outward",
    body:
      "Each stay at Txaleta reaches family businesses and small operators across the island. Together, these are how tourism becomes something the whole of Camiguin can feel.",
    list: [
      "Local artists",
      "Natalia Sea Glass",
      "Mt. Hibok-Hibok mountain guides",
      "Dive masters & dive operators",
      "Boat operators",
      "Tour guides",
      "Transportation providers",
      "Family-owned businesses",
      "Local musicians & performers",
      "Local wellness practitioners",
    ],
  },
  vision: {
    kicker: "Our Vision",
    heading: "Hospitality Should Leave Every Place Better Than It Found It",
    body:
      "That's still the whole of it. As we grow, our commitment stays the same:",
    points: [
      "Create meaningful work",
      "Invest in local talent",
      "Celebrate Camiguin's artists and entrepreneurs",
      "Practice tourism that gives back",
      "Protect the island's natural beauty",
      "Share the real Camiguin with guests from around the world",
    ],
  },
  sharedJourney: {
    heading: "A Shared Journey",
    body: [
      "When you choose Txaleta, you step into a story that outlasts your holiday.",
      "You help a local family find steady work. You put money into the hands of an artist and a small business owner. You make room for the next island kid to imagine a career in hospitality. And you help protect the culture, the coast, and the mountain that make this place what it is.",
    ],
    closing: "Thank you for being part of our journey.",
  },
};

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
    { label: "View the Menu", href: "/dining/menu" },
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
    "Fourteen rooms between the volcano and the Bohol Sea — seaview suites, cliff-edge glamping and quiet garden retreats.",
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
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Gallery", href: "/#gallery" },
];
