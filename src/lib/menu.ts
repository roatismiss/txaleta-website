// ============================================================================
// Txaleta de Camiguin — restaurant menu (À la Carte)
// Single source of truth for the flip-book menu at /dining/menu.
//
// Transcribed from the client's "NEW MENU" PDF (June 2026). Prices are in
// Philippine Peso (₱); store the number only (e.g. "220", "1,330") — the ₱ sign
// is rendered in the UI / Peso() helper. A 5% service charge applies (see
// SERVICE_NOTE). Keep this in sync with the chatbot KB
// (cloudreef-platform/supabase/migrations/095_txaleta_dining_menu_kb.sql) —
// the AI concierge reads from a mirror of this data, so prices must match.
// ============================================================================

export type MenuItem = {
  name: string;
  /** Peso amount as a string, no sign — e.g. "220", "1,330". Omit for POA items. */
  price?: string;
  /** Original (struck-through) price when an item is on promo. */
  wasPrice?: string;
  /** One-line dish description (only the menu's featured dishes carry one). */
  desc?: string;
  /** Sub-options shown beneath the name, e.g. Paella variants. */
  variants?: string[];
  /** Small pill, e.g. "Best Seller", "Seasonal", "Promo". */
  tag?: string;
  /** Shown in place of a price for "price on order" items. */
  priceNote?: string;
};

export type MenuGroup = {
  /** Optional sub-heading inside a page (small uppercase label). */
  title?: string;
  /** Optional italic note under the group heading. */
  note?: string;
  items: MenuItem[];
};

export type MenuPage = {
  id: string;
  /** Top kicker (e.g. "Tapas & Small Plates"). */
  eyebrow: string;
  /** Big serif page title. */
  title: string;
  /** Short label used in the chapter navigation pills. */
  tab: string;
  /** Optional intro line under the title. */
  note?: string;
  groups: MenuGroup[];
  /** Optional per-page footnote (overrides the default service note). */
  footnote?: string;
};

export const SERVICE_NOTE =
  "Kindly note that all prices are subject to a 5% service charge, in support of our dedicated service team. Prices are in Philippine Peso (₱).";

export const menuMeta = {
  eyebrow: "The Café · À la Carte",
  title: "Our Menu",
  subtitle: "Filipino Heart, Spanish Soul",
  intro:
    "Dishes made to be shared, on a clifftop above the Bohol Sea — paella and tapas, beloved Filipino plates, slow mornings and sunset cocktails. Turn the page to explore the table.",
  // Public URL the concierge chatbot shares when guests ask for the menu.
  url: "https://txaletadecamiguin.com/dining/menu",
};

export const menuPages: MenuPage[] = [
  {
    id: "bar-chow",
    eyebrow: "Tapas & Small Plates",
    title: "Bar Chow",
    tab: "Bar Chow",
    note: "Crisp, savoury bites made for sharing over a cold drink.",
    groups: [
      {
        items: [
          { name: "Bowl of Txaleta Chips", price: "220" },
          { name: "Chorizo / Jamón Croquetas", price: "420" },
          { name: "Croquetas Sampler", price: "460" },
          { name: "Gambas al Ajillo", price: "395" },
          { name: "Pork Sisig", price: "450" },
          { name: "Crispy Drunken Shrimp", price: "425" },
          { name: "Calamares Fritas", price: "345" },
          { name: "Onion Rings", price: "240" },
          { name: "Ceviche in a Boat", price: "380" },
          {
            name: "Pork Sisig in a Boat",
            price: "380",
            desc: "The Filipino classic — pork jowls served as a flavourful appetiser with a touch of Txaleta dressing. 8 pieces.",
          },
          {
            name: "Sisig Cheese Sticks",
            price: "350",
            tag: "Signature",
            desc: "Crispy lumpia rolls with savoury sisig, local jalapeño (optional), melted cheese and Txaleta dip.",
          },
        ],
      },
    ],
  },
  {
    id: "starters-warm-plates",
    eyebrow: "To Begin · To Share",
    title: "Starters & Warm Plates",
    tab: "Starters",
    groups: [
      {
        title: "Starters",
        items: [
          { name: "Soup of the Day", price: "250" },
          { name: "Txaleta Fiddle Fern Citrus Salad", price: "240" },
          { name: "Pulpo a la Plancha", price: "550", tag: "Seasonal" },
        ],
      },
      {
        title: "Warm Plates",
        items: [
          {
            name: "Chicken Ibérico",
            price: "420",
            desc: "Quarter chicken slow-cooked five hours in extra-virgin olive oil and aromatic spices.",
          },
          { name: "Gambas al Ajillo", price: "420" },
          { name: "Fish Ala Pobre", price: "395", desc: "Catch of the day." },
          { name: "Txaleta Chicken Wings", price: "360" },
          { name: "Beef Callos", price: "545" },
          {
            name: "Paella",
            price: "999",
            wasPrice: "1,330",
            tag: "Best Seller",
            variants: ["Paella Marisco", "Paella en su Tinta", "Txaleta Paella"],
            desc: "Spain's classic dish with chicken, pork, shrimp and chorizo. Promo price for a limited time.",
          },
        ],
      },
    ],
  },
  {
    id: "filipino-classics",
    eyebrow: "From the Filipino Kitchen",
    title: "Filipino Classics",
    tab: "Filipino",
    note: "Hearty plates, good for sharing. Serves 2 to 3 guests.",
    groups: [
      {
        items: [
          { name: "Pork Sisig", price: "450" },
          { name: "Inihaw na Liempo", price: "435" },
          { name: "Lechon Kawali", price: "435" },
          { name: "Chicken BBQ", price: "420" },
          { name: "Pork Shoulder & Ribs Sinigang", price: "480" },
          { name: "Beef Shank Nilaga", price: "535" },
          { name: "Chicken Garlic Adobo", price: "395" },
          { name: "Pork Garlic Adobo", price: "420" },
          { name: "Crispy Drunken Shrimp", price: "425" },
        ],
      },
    ],
  },
  {
    id: "rice-bowls",
    eyebrow: "Single Servings",
    title: "Rice Bowls",
    tab: "Rice Bowls",
    note: "Favourite dishes — hearty single servings with rice & veggies. Sisig & Adobo include egg.",
    groups: [
      {
        items: [
          { name: "Chicken Adobo", price: "315" },
          { name: "Shrimp Gambas", price: "320" },
          { name: "Fish Ala Pobre", price: "320" },
          { name: "Crispy Sisig", price: "355" },
          { name: "Inihaw na Liempo", price: "355" },
          { name: "Pork Adobo", price: "355" },
          { name: "Beef Nilaga", price: "395" },
          { name: "Pork Sinigang", price: "395" },
        ],
      },
    ],
  },
  {
    id: "pasta-sandwiches",
    eyebrow: "Comfort Plates",
    title: "Pasta & Sandwiches",
    tab: "Pasta",
    groups: [
      {
        title: "Pasta",
        items: [
          {
            name: "Smoked Pork Pasta",
            price: "380",
            desc: "Our signature smoked pork in a creamy sauce.",
          },
          { name: "Bacon Tomato Basil Pasta", price: "370" },
          { name: "Creamy Lemon Chicken Pasta", price: "370" },
          {
            name: "Shrimp or Fish Gambaretti",
            price: "370",
            tag: "Best Seller",
            desc: "Our signature gambas, tossed in a rich garlic sauce.",
          },
          { name: "Pasta Marisco", price: "395" },
        ],
      },
      {
        title: "Sandwiches",
        items: [
          { name: "Txaleta Egg Sandwich", price: "220" },
          { name: "Ham & Cheese Panini", price: "260" },
          { name: "Txaleta Club Sandwich", price: "295" },
          { name: "Hungarian Open-faced Sandwich", price: "330" },
        ],
      },
    ],
  },
  {
    id: "vegetables-sides",
    eyebrow: "Garden & Sides",
    title: "Vegetables & Sides",
    tab: "Sides",
    groups: [
      {
        title: "Vegetables",
        note: "Serves 2 to 3 guests.",
        items: [
          { name: "Eggplant Fry", price: "260" },
          { name: "Japanese Stir-fry Vegetables", price: "340" },
          { name: "Japanese Stir-fry Vegetables with Pork & Squid", price: "395" },
        ],
      },
      {
        title: "Sides",
        items: [
          { name: "Plain Rice", price: "55" },
          { name: "Garlic Rice", price: "65" },
          { name: "Java Rice", price: "100" },
          { name: "French Fries", price: "140" },
        ],
      },
    ],
  },
  {
    id: "dessert-picnic",
    eyebrow: "Something Sweet · For the Road",
    title: "Dessert & Picnic To-Go",
    tab: "Dessert",
    groups: [
      {
        title: "Dessert",
        items: [
          {
            name: "Txaleta Turon Ala Mode",
            price: "190",
            desc: "Banana or Mango-Peach turon with salted caramel and vanilla ice cream.",
          },
          {
            name: "Txaleta Turon Ala Mode — Deluxe",
            price: "220",
            desc: "With whipped cream, cherry and extra caramel.",
          },
        ],
      },
      {
        title: "Picnic To-Go",
        note: "Pre-order your Txaleta picnic for island hopping to Mantigue Island.",
        items: [
          { name: "Fruit Slush (Thermos / Picnic & To-Go)", price: "240" },
          { name: "Binalot sa Dahon", priceNote: "By order", desc: "Price determined by order." },
          { name: "Choice of Rice Bowls — add-on", price: "75" },
        ],
      },
    ],
  },
  {
    id: "breakfast",
    eyebrow: "Good Mornings",
    title: "Breakfast",
    tab: "Breakfast",
    note: "All meals are served with a side of fruit.",
    groups: [
      {
        title: "Plates",
        items: [
          {
            name: "Cheese Pancake & Sausages",
            price: "480",
            tag: "For Sharing",
            desc: "Four pancakes, sweet & savoury, served with butter, jam or syrup, paired with sausages sautéed in caramelised onions.",
          },
          {
            name: "Hearty Breakfast",
            price: "450",
            desc: "Choice of corned beef, bacon or bangus belly; eggs to your liking with a basket of assorted bread or garlic rice.",
          },
          {
            name: "Hungarian Sausage & Eggs",
            price: "580",
            tag: "For Sharing",
            desc: "Paired with Txaleta scrambled eggs, onions, a grilled cheese sandwich, a basket of mini pandesal and strawberry jam.",
          },
        ],
      },
      {
        title: "Sides & Add-ons",
        items: [
          { name: "Bacon (3 pieces)", price: "220" },
          { name: "Hashbrowns (2 pieces)", price: "200" },
          { name: "Spam Fries", price: "280" },
          { name: "Vienna Sausage (3 pieces)", price: "195" },
          { name: "Mini Pancakes (2 pieces)", price: "280" },
          { name: "Additional Egg", price: "50" },
        ],
      },
    ],
    footnote: "Specialty coffees available — see Coffee & Cold Drinks.",
  },
  {
    id: "breakfast-inclusion",
    eyebrow: "Included With Your Stay",
    title: "Breakfast Inclusion",
    tab: "Inclusion",
    note: "Served daily 7:00–10:00 AM at the restaurant by the infinity pool. Freshly prepared — please order ahead. Plated single portions; share or upsize with a small add-on. Prices shown are à la carte.",
    groups: [
      {
        title: "Breakfast Plates",
        items: [
          {
            name: "Txaleta Scrambled Eggs",
            price: "355",
            desc: "Prepared with cheese & caramelised onions, a drizzle of basil purée, with a basket of mini pandesal & jam.",
          },
          {
            name: "Salty Little Soldiers",
            price: "355",
            desc: "Buttery, finger-sized toast topped with butter & salty anchovies, served with two poached eggs.",
          },
          {
            name: "Spanish Omelette",
            price: "355",
            desc: "Eggs with cheese, tomato, onions, garlic & basil, with a basket of mini pandesal & jam.",
          },
          {
            name: "Tocino (Chicken or Pork)",
            price: "355",
            desc: "Marinated in a sweet & savoury sauce, with garlic rice and eggs your way.",
          },
          {
            name: "Daing na Bangus",
            price: "355",
            desc: "Crispy milkfish (½) marinated in garlic & savoury sauce, with garlic rice and eggs your way.",
          },
        ],
      },
      {
        title: "Beverages Included",
        items: [
          { name: "Brewed Coffee", price: "135" },
          { name: "Hot Tea", price: "135" },
          { name: "Four Seasons Juice", price: "120" },
        ],
      },
      {
        title: "To-Go",
        note: "Heading out early? We'll leave a chilled sandwich in your room fridge with a drink to go — just let us know.",
        items: [
          {
            name: "Chilled To-Go Sandwich",
            price: "355",
            variants: ["Ham & Egg Sandwich", "Chicken Tocino"],
          },
        ],
      },
    ],
    footnote:
      "Breakfast includes a selection of standard drinks. Specialty coffees are available with a small add-on.",
  },
  {
    id: "coffee-cold-drinks",
    eyebrow: "The Bar · Non-Alcoholic",
    title: "Coffee & Cold Drinks",
    tab: "Coffee",
    groups: [
      {
        title: "Coffee & Hot",
        items: [
          { name: "Spanish Latte / Cappuccino", price: "190" },
          { name: "Café Latte / Macchiato / Flat White", price: "170" },
          { name: "Iced Spanish Latte", price: "195" },
          { name: "Americano / Double Espresso", price: "160" },
          { name: "Double Espresso Macchiato", price: "160" },
          { name: "Brewed Coffee / Hot Tea", price: "135" },
          { name: "Hot Chocolate", price: "250" },
          { name: "Iced Chocolate", price: "265" },
        ],
      },
      {
        title: "Juices, Slushes & Sodas",
        items: [
          { name: "Calamansi / Dalandan Juice", price: "160" },
          { name: "Watermelon / Mango Juice", price: "170" },
          { name: "Flavor of the Day Slush", price: "180" },
          { name: "Calamansi / Dalandan Slush", price: "175" },
          { name: "Watermelon / Mango Slush", price: "180" },
          { name: "Grape Slush", price: "265" },
          { name: "Dalandan / Calamansi Caraffe", price: "395" },
          { name: "Watermelon / Mango Caraffe", price: "420" },
          { name: "Coca-Cola / Royal / Sprite", price: "75" },
          { name: "Coca-Cola / Sprite Zero", price: "110" },
          { name: "Soda Bottle, 1.5L", price: "275" },
        ],
      },
    ],
  },
  {
    id: "bar-cocktails",
    eyebrow: "The Bar · Beer, Wine & Cocktails",
    title: "Beer, Wine & Cocktails",
    tab: "Cocktails",
    groups: [
      {
        title: "Beer & Wine",
        items: [
          { name: "San Miguel Light / Pale Pilsen", price: "145" },
          { name: "Red Horse", price: "160" },
          { name: "San Miguel Premium Beer", price: "190" },
          { name: "Red Horse Jumbo", price: "340" },
          { name: "San Miguel Pale Pilsen Grande", price: "320" },
          { name: "Wine by the Glass", price: "265" },
          { name: "Red & White Wine (bottle)", price: "950" },
          { name: "Sangria Caraffe", price: "895" },
        ],
      },
      {
        title: "Spirits & Mixers",
        items: [
          { name: "Gin / Vodka Tonic", price: "250" },
          { name: "Rhum Coke", price: "220" },
          { name: "Fruit Slush Add-on Shot", price: "175" },
        ],
      },
      {
        title: "Sip & Savor — Signature Cocktails",
        note: "Our signature drinks, perfectly balanced and unforgettable.",
        items: [
          { name: "Cinco de Mayo", price: "220", desc: "Local beer with a splash of lime — crisp, with a kick." },
          { name: "Diana", price: "220", desc: "Icy local lemon with vodka — bright and refreshing." },
          { name: "Sarah", price: "220", desc: "Creamy piña colada — tropical and indulgent." },
          { name: "Margarita", price: "220", desc: "Lime, smooth tequila, with a salted edge." },
        ],
      },
    ],
  },
  {
    id: "happy-hour",
    eyebrow: "Sundowners · 3:00–6:30 PM",
    title: "Happy Hour",
    tab: "Happy Hour",
    note: "Daily from 3:00 to 6:30 PM.",
    groups: [
      {
        title: "Buckets & Pours",
        items: [
          { name: "Any 3 Premium Beers", price: "499" },
          { name: "Any 3 Regular Beers", price: "380" },
          { name: "Rhum Coke", price: "185" },
          { name: "Gin Tonic", price: "185" },
          { name: "Vodka Tonic", price: "185" },
          { name: "Wine (glass)", price: "185" },
          { name: "Sangria (glass)", price: "185" },
        ],
      },
      {
        title: "Sip & Savor — Happy Hour",
        note: "Our signature cocktails at the sundown price.",
        items: [
          { name: "Cinco de Mayo", price: "185", desc: "Local beer with a splash of lime — crisp, with a kick." },
          { name: "Diana", price: "185", desc: "Icy local lemon with vodka — bright and refreshing." },
          { name: "Sarah", price: "185", desc: "Creamy piña colada — tropical and indulgent." },
          { name: "Margarita", price: "185", desc: "Lime, smooth tequila, with a salted edge." },
        ],
      },
    ],
  },
];
