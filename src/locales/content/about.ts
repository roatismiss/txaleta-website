// ============================================================================
// About page content — per-locale (about + pillars + idealGuests).
// EN verbatim from site.ts; other locales are native-register rewrites.
// Attraction proper names are localized with recognizable forms.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type AboutDict = {
  pillars: { title: string; idea: string; quote: string }[];
  idealGuests: {
    kicker: string;
    heading: string;
    body: string;
    items: { title: string; body: string }[];
  };
  about: {
    hero: { kicker: string; heading: string };
    intro: string;
    sections: { kicker: string; heading: string; body: string[] }[];
    location: { kicker: string; heading: string; body: string; attractions: string[] };
    whyChoose: { kicker: string; heading: string; body: string; points: string[] };
    comeHome: { heading: string; body: string; closing: string[] };
  };
};

const en: AboutDict = {
  pillars: [
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
  ],
  idealGuests: {
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
    ],
  },
  about: {
    hero: {
      kicker: "About Txaleta de Camiguin",
      heading: "Where Heritage, Hospitality & Island Living Come Together",
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
      },
      {
        kicker: "Filipino Heart, Spanish Soul",
        heading: "A Blend of Two Cultures",
        body: [
          "Our Filipino-Spanish heritage influences everything we do — from our architecture and interiors to our cuisine and hospitality, Txaleta reflects a blend of cultures rooted in family, generosity, tradition, and togetherness.",
          "Every detail has been thoughtfully chosen to create a space that feels elegant yet comfortable, refined yet welcoming. It is luxury without pretense, and hospitality from the heart.",
        ],
      },
      {
        kicker: "Designed for Connection",
        heading: "Space for Meaningful Moments",
        body: [
          "At Txaleta, travel is about more than visiting a destination. It is about creating space for family, friendship, wellness, and meaningful moments.",
          "Mornings begin with spectacular sunrises. Days unfold at a slower pace. Evenings are spent gathered around the table sharing stories, food, and laughter — the moments that stay with you long after you've returned home.",
        ],
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
  },
};

const fr: AboutDict = {
  pillars: [
    {
      title: "Une hospitalité centrée sur la famille",
      idea: "Nos hôtes sont notre famille.",
      quote:
        "Nous accueillons chaque hôte comme un membre de la famille — avec chaleur, attention et des liens sincères, ancrés dans les traditions d'hospitalité philippines et espagnoles.",
    },
    {
      title: "Harmonie culturelle & héritage",
      idea: "Cœur philippin, âme espagnole.",
      quote:
        "Nous célébrons nos racines hispano-philippines en honorant la tradition, tout en créant un espace de découverte culturelle partagée et de fierté.",
    },
    {
      title: "Le bien-être par la simplicité",
      idea: "Nature et nourriture, à votre mesure.",
      quote:
        "Nous croyons à une vie ressourçante — ancrée dans la nature, les rythmes doux et un design pensé pour nourrir le corps, l'esprit et l'âme.",
    },
    {
      title: "Une vie insulaire durable",
      idea: "Le respect de la terre qui nous fait vivre.",
      quote:
        "Notre engagement envers la beauté naturelle de Camiguin : avancer d'un pas léger, s'approvisionner localement et faire grandir la communauté qui nous entoure.",
    },
    {
      title: "Des instants hors du temps",
      idea: "L'espace d'être présent.",
      quote:
        "Nous créons l'espace des moments lents et précieux — où les générations se retrouvent et où le temps devient à la fois sacré et simple.",
    },
  ],
  idealGuests: {
    kicker: "Pour qui est Txaleta",
    heading: "Pensé pour ceux qui voyagent avec le cœur",
    body:
      "Nous accueillons tout le monde, mais nous avons une tendresse particulière pour les voyageurs qui préfèrent les expériences qui comptent aux itinéraires surchargés, les rencontres à la foule, et les souvenirs aux choses matérielles.",
    items: [
      {
        title: "Familles en quête de moments vrais",
        body:
          "Vacances multigénérationnelles, retrouvailles longtemps attendues ou simple week-end d'évasion — pensé pour les moments qui naissent autour d'une table partagée, d'une conversation au coucher du soleil ou d'une île explorée ensemble.",
      },
      {
        title: "Couples qui veulent ralentir",
        body:
          "L'espace pour se retrouver et souffler — levers de soleil, petits-déjeuners sans montre, aventures insulaires et soirées paisibles au bord de la mer.",
      },
      {
        title: "Amateurs de bien-être et de slow travel",
        body:
          "Pour ceux qui goûtent un rythme plus lent et le pouvoir ressourçant de la nature — une matinée au bord de la piscine à débordement, une marche tranquille, l'ascension du Hibok-Hibok, ou simplement la brise marine et un bon livre.",
      },
      {
        title: "Explorateurs de culture et d'îles",
        body:
          "Voyageurs curieux en quête d'authenticité — traditions locales, cuisine régionale, les histoires derrière un lieu et les recoins hors des sentiers battus.",
      },
    ],
  },
  about: {
    hero: {
      kicker: "À propos de Txaleta de Camiguin",
      heading: "Là où héritage, hospitalité et vie insulaire se rencontrent",
    },
    intro:
      "Sur une falaise face à la mer, Txaleta de Camiguin est un resort boutique familial de Mambajao, pensé pour les voyageurs en quête d'expériences qui comptent, de vues spectaculaires sur l'océan et d'une hospitalité sincère. Plus qu'un lieu où séjourner, Txaleta est un endroit où ralentir, se retrouver et vivre l'île à un rythme plus doux — quelle que soit la raison de votre venue, notre but est simple : que vous vous sentiez chez vous.",
    sections: [
      {
        kicker: "Notre histoire",
        heading: "Un rêve de famille, enraciné à Camiguin",
        body: [
          "Txaleta est né d'un rêve de famille, inspiré par l'amour de Camiguin, de l'hospitalité et des traditions qui rassemblent.",
          "Le nom « Txaleta » vient du mot espagnol désignant une petite maison, reflet de l'héritage espagnol de notre famille et de notre vision : un refuge accueillant où chaque hôte est traité comme un proche. Cette vision vit aujourd'hui dans chaque détail de l'expérience — service personnalisé, espaces pensés avec soin, repas partagés et aventures insulaires.",
          "Nous croyons que les plus beaux souvenirs sont souvent les plus simples : un lever de soleil partagé, des conversations autour de la table, des rires au bord de la piscine et des instants de silence face à la mer.",
        ],
      },
      {
        kicker: "Cœur philippin, âme espagnole",
        heading: "Le mariage de deux cultures",
        body: [
          "Notre héritage hispano-philippin imprègne tout ce que nous faisons — de l'architecture aux intérieurs, de la cuisine à l'hospitalité, Txaleta reflète un mélange de cultures fondé sur la famille, la générosité, la tradition et le partage.",
          "Chaque détail a été choisi pour créer un lieu à la fois élégant et confortable, raffiné et accueillant. Un luxe sans prétention, une hospitalité qui vient du cœur.",
        ],
      },
      {
        kicker: "Pensé pour le lien",
        heading: "L'espace des moments qui comptent",
        body: [
          "Chez Txaleta, voyager ne se résume pas à visiter une destination. C'est créer l'espace de la famille, de l'amitié, du bien-être et des moments qui comptent.",
          "Les matins commencent par des levers de soleil spectaculaires. Les journées se déroulent à un rythme plus lent. Les soirées se passent autour de la table, entre histoires, plats et rires — ces moments qui restent longtemps après le retour à la maison.",
        ],
      },
    ],
    location: {
      kicker: "Un emplacement unique à Camiguin",
      heading: "Le cœur de l'île, à l'écart de la foule",
      body:
        "Situé à Mambajao, Txaleta offre un accès facile aux attractions les plus célèbres de Camiguin tout en restant un refuge paisible. Après une journée d'exploration, retrouvez les vues panoramiques sur l'océan, la brise de l'île et des couchers de soleil inoubliables.",
      attractions: [
        "Banc de sable de White Island",
        "Parc naturel de l'île Mantigue",
        "Chutes de Katibawasan",
        "Chutes de Tuasan",
        "Cimetière englouti",
        "Ruines de la vieille église",
        "Source froide de Sto. Niño",
        "Source chaude d'Ardent",
        "Mont Hibok-Hibok",
      ],
    },
    whyChoose: {
      kicker: "Ce qui rend Txaleta unique",
      heading: "Plus qu'un resort. Un endroit où l'on se sent à sa place.",
      body:
        "Beaucoup viennent pour les vues sur l'océan, la piscine à débordement et les villas — mais ce qu'ils retiennent, c'est ce qu'ils ont ressenti : accueillis, choyés, complètement chez eux.",
      points: [
        "Resort boutique familial à Camiguin",
        "Hospitalité personnalisée et recommandations locales",
        "Piscine à débordement avec vue panoramique sur l'océan",
        "Héritage hispano-philippin et charme insulaire authentique",
        "Excursions et expériences sur mesure",
        "Accès facile aux principales attractions de Camiguin",
        "Restaurant de cuisine hispano-philippine",
        "Un refuge paisible pour le lien, le bien-être et le partage",
      ],
    },
    comeHome: {
      heading: "Revenez chez vous, à Txaleta",
      body:
        "Que vous cherchiez un resort boutique à Camiguin, une escapade insulaire en famille ou une retraite romantique, nous vous invitons à découvrir l'île à travers nos yeux.",
      closing: ["Venez pour les vues.", "Restez pour ce que vous ressentez.", "Bienvenue chez vous."],
    },
  },
};

const de: AboutDict = {
  pillars: [
    {
      title: "Gastfreundschaft mit Familiensinn",
      idea: "Gäste sind Familie.",
      quote:
        "Wir empfangen jeden Gast wie Familie — mit Wärme, Fürsorge und echter Verbundenheit, verwurzelt in philippinischen und spanischen Traditionen der Gastfreundschaft.",
    },
    {
      title: "Kulturelle Harmonie & Erbe",
      idea: "Philippinisches Herz, spanische Seele.",
      quote:
        "Wir feiern unsere spanisch-philippinischen Wurzeln, ehren die Tradition und schaffen zugleich Raum für gemeinsames kulturelles Entdecken und Stolz.",
    },
    {
      title: "Wohlbefinden durch Einfachheit",
      idea: "Natur und Nahrung, ganz persönlich.",
      quote:
        "Wir glauben an ein Leben, das Kraft zurückgibt — verwurzelt in der Natur, in sanften Rhythmen und einem Design, das Körper, Geist und Seele nährt.",
    },
    {
      title: "Nachhaltiges Inselleben",
      idea: "Respekt vor dem Land, das uns trägt.",
      quote:
        "Unsere Verpflichtung gegenüber Camiguins Natur heißt: leichtfüßig auftreten, lokal einkaufen und die Gemeinschaft um uns herum stärken.",
    },
    {
      title: "Zeitloses Miteinander",
      idea: "Raum, um präsent zu sein.",
      quote:
        "Wir schaffen Raum für langsame, bedeutsame Momente — in denen Generationen zusammenkommen und Zeit sich zugleich kostbar und einfach anfühlt.",
    },
  ],
  idealGuests: {
    kicker: "Für wen Txaleta gedacht ist",
    heading: "Für Menschen, die mit dem Herzen reisen",
    body:
      "Wir heißen alle willkommen — aber einen besonderen Platz in unserem Herzen haben Reisende, denen bedeutsame Erlebnisse wichtiger sind als volle Programme, Begegnung wichtiger als Menschenmengen und Erinnerungen wichtiger als Dinge.",
    items: [
      {
        title: "Familien auf der Suche nach echter Zeit",
        body:
          "Urlaub über Generationen, lang ersehnte Wiedersehen oder ein einfaches Wochenende — gemacht für die Momente am gemeinsamen Tisch, im Gespräch bei Sonnenuntergang oder beim gemeinsamen Erkunden der Insel.",
      },
      {
        title: "Paare, die entschleunigen wollen",
        body:
          "Raum, um zueinanderzufinden und loszulassen — Sonnenaufgänge, lange Frühstücke, Inselabenteuer und stille Abende am Meer.",
      },
      {
        title: "Wellness- und Slow-Travel-Liebhaber",
        body:
          "Für alle, die ein langsameres Tempo und die heilende Kraft der Natur schätzen — ein Morgen am Infinity-Pool, ein stiller Spaziergang, eine Wanderung auf den Hibok-Hibok oder einfach Meeresbrise und ein gutes Buch.",
      },
      {
        title: "Kultur- und Inselentdecker",
        body:
          "Neugierige Reisende auf der Suche nach dem Echten — lokale Traditionen, regionale Küche, die Geschichten hinter einem Ort und die Winkel abseits der üblichen Route.",
      },
    ],
  },
  about: {
    hero: {
      kicker: "Über Txaleta de Camiguin",
      heading: "Wo Erbe, Gastfreundschaft und Inselleben zusammenfinden",
    },
    intro:
      "Auf einer Klippe hoch über dem Meer liegt Txaleta de Camiguin — ein familiengeführtes Boutique-Resort in Mambajao für Reisende, die bedeutsame Erlebnisse, atemberaubende Ausblicke und echte Herzlichkeit suchen. Txaleta ist mehr als eine Unterkunft: ein Ort zum Langsamerwerden, zum Wiederfinden, zum Inselleben in sanfterem Takt. Was auch immer Sie herführt — unser Ziel ist einfach: dass Sie sich zu Hause fühlen.",
    sections: [
      {
        kicker: "Unsere Geschichte",
        heading: "Ein Familientraum, verwurzelt auf Camiguin",
        body: [
          "Txaleta begann als Traum einer Familie — inspiriert von der Liebe zu Camiguin, zur Gastfreundschaft und zu den Traditionen, die Menschen zusammenbringen.",
          "Der Name „Txaleta“ geht auf das spanische Wort für ein kleines Haus zurück — ein Echo des spanischen Erbes unserer Familie und unserer Vision: ein herzlicher Zufluchtsort, an dem Gäste wie Familie behandelt werden. Diese Vision lebt heute in jedem Teil des Aufenthalts weiter — persönlicher Service, durchdachte Räume, gemeinsame Mahlzeiten und Inselabenteuer.",
          "Wir glauben: Die schönsten Erinnerungen sind oft die einfachsten. Ein gemeinsamer Sonnenaufgang, Gespräche am Tisch, Lachen am Pool und stille Momente mit Blick aufs Meer.",
        ],
      },
      {
        kicker: "Philippinisches Herz, spanische Seele",
        heading: "Zwei Kulturen, eine Handschrift",
        body: [
          "Unser spanisch-philippinisches Erbe prägt alles, was wir tun — von Architektur und Interieur bis zu Küche und Gastfreundschaft. Txaleta ist eine Verbindung von Kulturen, getragen von Familie, Großzügigkeit, Tradition und Miteinander.",
          "Jedes Detail wurde mit Bedacht gewählt: elegant und doch behaglich, fein und doch einladend. Luxus ohne Pose — Gastfreundschaft von Herzen.",
        ],
      },
      {
        kicker: "Gemacht für Verbundenheit",
        heading: "Raum für Momente, die bleiben",
        body: [
          "Reisen heißt bei Txaleta mehr, als ein Ziel zu besuchen. Es heißt, Raum zu schaffen — für Familie, Freundschaft, Wohlbefinden und Momente, die zählen.",
          "Die Morgen beginnen mit spektakulären Sonnenaufgängen. Die Tage entfalten sich langsamer. Die Abende gehören dem gedeckten Tisch, den Geschichten, dem Essen und dem Lachen — Momente, die noch lange nachklingen, wenn man längst wieder zu Hause ist.",
        ],
      },
    ],
    location: {
      kicker: "Eine einzigartige Lage auf Camiguin",
      heading: "Das Herz der Insel — ein ruhiger Rückzugsort abseits der Menge",
      body:
        "In Mambajao gelegen, bietet Txaleta leichten Zugang zu Camiguins berühmtesten Sehenswürdigkeiten — und bleibt doch ein stiller Rückzugsort. Nach einem Tag voller Naturwunder erwarten Sie Panoramablicke aufs Meer, Inselbrise und unvergessliche Sonnenuntergänge.",
      attractions: [
        "White-Island-Sandbank",
        "Mantigue-Island-Naturpark",
        "Katibawasan-Wasserfall",
        "Tuasan-Wasserfall",
        "Versunkener Friedhof",
        "Alte Kirchenruinen",
        "Sto.-Niño-Kaltwasserquelle",
        "Ardent-Thermalquelle",
        "Mt. Hibok-Hibok",
      ],
    },
    whyChoose: {
      kicker: "Was Txaleta besonders macht",
      heading: "Mehr als ein Resort. Ein Ort zum Ankommen.",
      body:
        "Viele kommen wegen des Meerblicks, des Infinity-Pools und der Villen — doch woran sie sich erinnern, ist das Gefühl: willkommen, umsorgt und ganz zu Hause.",
      points: [
        "Familiengeführtes Boutique-Resort auf Camiguin",
        "Persönliche Gastfreundschaft und lokale Empfehlungen",
        "Infinity-Pool mit Panorama-Meerblick",
        "Spanisch-philippinisches Erbe und echter Inselcharme",
        "Maßgeschneiderte Touren und Erlebnisse",
        "Leichter Zugang zu Camiguins Top-Sehenswürdigkeiten",
        "Restaurant mit spanisch-philippinischer Küche",
        "Ein ruhiger Rückzugsort für Verbundenheit und Wohlbefinden",
      ],
    },
    comeHome: {
      heading: "Kommen Sie heim — nach Txaleta",
      body:
        "Ob Sie ein Boutique-Resort auf Camiguin suchen, eine Inselauszeit mit der Familie oder einen romantischen Rückzugsort — entdecken Sie die Insel mit unseren Augen.",
      closing: ["Kommen Sie für die Aussicht.", "Bleiben Sie für das Gefühl.", "Willkommen zu Hause."],
    },
  },
};

const ja: AboutDict = {
  pillars: [
    {
      title: "家族を中心にしたおもてなし",
      idea: "お客様は、家族。",
      quote:
        "私たちはすべてのお客様を家族として迎えます。フィリピンとスペイン、ふたつのおもてなしの伝統に根ざした、温かさと心遣い、そして本物のつながりを。",
    },
    {
      title: "文化の調和と伝統",
      idea: "フィリピンの心、スペインの魂。",
      quote:
        "伝統に敬意を払いながら、文化をともに発見し誇りを分かち合う場をつくる。それが、スペインとフィリピンにルーツを持つ私たちの流儀です。",
    },
    {
      title: "シンプルさの中のウェルネス",
      idea: "自然と滋養を、あなたのかたちで。",
      quote:
        "自然に根ざし、穏やかなリズムに寄り添い、心と体と魂を満たす意図あるデザイン。回復のための暮らしを、私たちは信じています。",
    },
    {
      title: "持続可能な島の暮らし",
      idea: "命をくれる土地への敬意。",
      quote:
        "カミギンの自然の美しさへの約束 — 足跡は軽く、食材は地元から、そして周りのコミュニティとともに育つこと。",
    },
    {
      title: "時を超えるだんらん",
      idea: "いまに在るための余白。",
      quote:
        "ゆっくりと意味のある時間のための余白をつくります。世代が集い、時間が神聖で、同時にシンプルに感じられる場所を。",
    },
  ],
  idealGuests: {
    kicker: "Txaletaはこんな方のために",
    heading: "心で旅する人のために",
    body:
      "どなたも歓迎します。けれど特に心に留めているのは、詰め込んだ旅程より意味のある体験を、人混みよりつながりを、モノより思い出を大切にする旅人たちです。",
    items: [
      {
        title: "質の高い時間を求める家族",
        body:
          "三世代の休暇、待ちわびた再会、気軽な週末の逃避行 — 囲む食卓、夕暮れの会話、ともに巡る島。そんな瞬間のためにつくられた場所です。",
      },
      {
        title: "ゆっくりしたいふたりへ",
        body:
          "心を通わせ、肩の力を抜くための余白 — 朝日、ゆったりした朝食、島の冒険、海辺の静かな夜。意味のある時間のために。",
      },
      {
        title: "ウェルネスとスロートラベルの愛好家",
        body:
          "遅い時間の流れと自然の回復力を味わえる方へ — インフィニティプールの朝、静かな散歩、ヒボクヒボク山のハイキング、あるいは潮風と一冊の本。",
      },
      {
        title: "文化と島の探検者",
        body:
          "本物を求める好奇心旺盛な旅人へ — 土地の伝統、郷土の味、場所に宿る物語、そして定番ルートの先にある島の素顔。",
      },
    ],
  },
  about: {
    hero: {
      kicker: "Txaleta de Camiguinについて",
      heading: "伝統と、おもてなしと、島の暮らしが出会う場所",
    },
    intro:
      "海を見下ろす崖の上、Txaleta de Camiguinはマンバハオにある家族経営のブティックリゾートです。意味のある体験、息をのむオーシャンビュー、そして心からのおもてなしを求める旅人のために。泊まる場所である以上に、ここは歩みをゆるめ、心を通わせ、島の時間を味わう場所。どんな理由で訪れても、私たちの願いはひとつ — 我が家のようにくつろいでいただくことです。",
    sections: [
      {
        kicker: "私たちの物語",
        heading: "カミギンに根を下ろした、家族の夢",
        body: [
          "Txaletaは、カミギンへの愛と、おもてなしと、人を結ぶ伝統への想いから生まれた家族の夢でした。",
          "「Txaleta」という名は、スペイン語で小さな家を意味する言葉に由来します。家族のスペインの血筋と、お客様を家族として迎える温かな聖域という私たちの理想を映した名前です。その理想はいまも、滞在のすべてに息づいています — 心を尽くしたサービス、丁寧に設えた空間、ともに囲む食卓、島の冒険。",
          "最良の思い出は、しばしば最もシンプルなもの。大切な人と見る朝日、食卓の語らい、プールサイドの笑い声、海を眺める静かなひととき。私たちはそう信じています。",
        ],
      },
      {
        kicker: "フィリピンの心、スペインの魂",
        heading: "ふたつの文化が織りなすもの",
        body: [
          "スペインとフィリピンの伝統は、私たちのすべてに息づいています。建築とインテリア、料理とおもてなし — Txaletaは家族、寛容、伝統、だんらんに根ざした文化の融合です。",
          "細部のひとつひとつを、上質でありながら心地よく、洗練されていながら温かい空間のために選びました。気取らない贅沢と、心からのおもてなしを。",
        ],
      },
      {
        kicker: "つながりのためのデザイン",
        heading: "意味のある時間のための余白",
        body: [
          "Txaletaにとって旅とは、目的地を訪れること以上のもの。家族のため、友情のため、健やかさのため、意味ある瞬間のための余白をつくることです。",
          "朝は壮大な日の出とともに始まり、昼はゆっくりと流れ、夜は食卓を囲んで物語と料理と笑いを分かち合う。家に帰ったあとも、長く心に残る時間です。",
        ],
      },
    ],
    location: {
      kicker: "カミギンでも特別なロケーション",
      heading: "島の中心にありながら、喧騒から遠く",
      body:
        "マンバハオに位置するTxaletaは、カミギンの名所へのアクセスに恵まれながら、静かな隠れ家であり続けます。島の自然を巡った一日の終わりには、パノラマの海、島の風、忘れられない夕日が待っています。",
      attractions: [
        "ホワイトアイランドの砂州",
        "マンティゲ島自然公園",
        "カティバワサンの滝",
        "トゥアサンの滝",
        "海に沈んだ墓地（サンケン・セメタリー）",
        "旧教会跡",
        "サント・ニーニョ冷泉",
        "アーデント温泉",
        "ヒボクヒボク山",
      ],
    },
    whyChoose: {
      kicker: "Txaletaが特別な理由",
      heading: "リゾート以上の、帰る場所。",
      body:
        "多くの方が海の眺めやインフィニティプール、ヴィラを目当てに訪れます。けれど最も記憶に残るのは、そこで感じたこと — 歓迎され、大切にされ、心から家にいるような気持ちです。",
      points: [
        "カミギンの家族経営ブティックリゾート",
        "一人ひとりに寄り添うおもてなしと地元情報",
        "海を一望するインフィニティプール",
        "スペイン×フィリピンの伝統と素朴な島の魅力",
        "オーダーメイドのツアーと体験",
        "カミギンの主要スポットへ好アクセス",
        "フィリピン×スペイン料理のレストラン",
        "つながりと健やかさのための静かな隠れ家",
      ],
    },
    comeHome: {
      heading: "Txaletaへ、ただいま",
      body:
        "カミギンのブティックリゾートを、家族での島時間を、ふたりだけの隠れ家を — どんな旅でも、私たちの目に映る島を体験しにいらしてください。",
      closing: ["景色に惹かれて来て、", "感じたもののために留まる。", "おかえりなさい。"],
    },
  },
};

const ko: AboutDict = {
  pillars: [
    {
      title: "가족 중심의 환대",
      idea: "손님은 곧 가족입니다.",
      quote:
        "우리는 모든 손님을 가족으로 맞이합니다. 필리핀과 스페인의 환대 전통에 뿌리내린 따뜻함과 배려, 진심 어린 교감으로.",
    },
    {
      title: "문화의 조화와 헤리티지",
      idea: "필리핀의 마음, 스페인의 영혼.",
      quote:
        "전통을 존중하면서 문화를 함께 발견하고 자부심을 나누는 공간을 만듭니다. 그것이 스페인-필리핀 뿌리를 가진 우리의 방식입니다.",
    },
    {
      title: "단순함이 주는 웰니스",
      idea: "자연과 음식을, 당신에게 맞게.",
      quote:
        "자연에 뿌리내리고, 느린 리듬을 따르며, 몸과 마음과 영혼을 채우는 의도된 디자인 — 회복하는 삶을 믿습니다.",
    },
    {
      title: "지속가능한 섬 생활",
      idea: "삶을 주는 땅에 대한 존중.",
      quote:
        "카미긴의 자연을 향한 약속: 가볍게 발 딛고, 지역에서 조달하고, 주변 공동체와 함께 성장하는 것.",
    },
    {
      title: "시간을 초월한 함께함",
      idea: "현재에 머무를 여백.",
      quote:
        "느리고 의미 있는 순간을 위한 여백을 만듭니다. 세대가 함께 모이고, 시간이 성스러우면서도 단순하게 느껴지는 곳.",
    },
  ],
  idealGuests: {
    kicker: "Txaleta는 이런 분들을 위한 곳",
    heading: "마음으로 여행하는 이들을 위해",
    body:
      "누구든 환영하지만, 빽빽한 일정보다 의미 있는 경험을, 인파보다 교감을, 물건보다 추억을 소중히 여기는 여행자에게 특별한 마음을 품고 있습니다.",
    items: [
      {
        title: "진짜 시간을 찾는 가족",
        body:
          "삼대가 함께하는 휴가, 오래 기다린 재회, 가벼운 주말 여행 — 함께 둘러앉은 식탁, 노을 속 대화, 함께 누비는 섬. 그런 순간들을 위해 지어진 곳입니다.",
      },
      {
        title: "느려지고 싶은 커플",
        body:
          "다시 마주하고 내려놓을 여백 — 일출, 느긋한 아침 식사, 섬에서의 모험, 바닷가의 평화로운 저녁.",
      },
      {
        title: "웰니스와 느린 여행을 사랑하는 분",
        body:
          "느린 속도와 자연의 회복력을 아는 분들께 — 인피니티 풀에서의 아침, 조용한 산책, 히복히복 산행, 혹은 바닷바람과 좋은 책 한 권.",
      },
      {
        title: "문화와 섬의 탐험가",
        body:
          "진짜를 찾는 호기심 많은 여행자에게 — 지역의 전통, 향토 음식, 장소에 깃든 이야기, 그리고 관광 코스 너머의 골목들.",
      },
    ],
  },
  about: {
    hero: {
      kicker: "Txaleta de Camiguin 소개",
      heading: "헤리티지와 환대, 섬의 삶이 만나는 곳",
    },
    intro:
      "바다가 내려다보이는 절벽 위, Txaleta de Camiguin은 맘바하오의 가족 경영 부티크 리조트입니다. 의미 있는 경험과 숨막히는 오션뷰, 진심 어린 환대를 찾는 여행자를 위한 곳. 머무는 곳 그 이상으로, Txaleta는 속도를 늦추고, 다시 연결되고, 섬의 시간을 살아보는 곳입니다. 어떤 이유로 오셨든 우리의 목표는 하나 — 집처럼 편안하게 느끼시는 것.",
    sections: [
      {
        kicker: "우리의 이야기",
        heading: "카미긴에 뿌리내린 한 가족의 꿈",
        body: [
          "Txaleta는 카미긴을 향한 사랑, 환대, 그리고 사람을 잇는 전통에서 태어난 가족의 꿈이었습니다.",
          "'Txaleta'라는 이름은 작은 집을 뜻하는 스페인어에서 왔습니다. 우리 가족의 스페인 헤리티지, 그리고 손님을 가족처럼 맞이하는 따뜻한 안식처라는 비전을 담은 이름이죠. 그 비전은 오늘도 머무름의 모든 순간에 살아 있습니다 — 세심한 서비스, 정성껏 가꾼 공간, 함께 나누는 식사, 섬에서의 모험.",
          "가장 좋은 추억은 흔히 가장 단순한 것들입니다. 사랑하는 이와 함께 본 일출, 식탁에서의 대화, 수영장가의 웃음, 바다를 바라보는 고요한 순간.",
        ],
      },
      {
        kicker: "필리핀의 마음, 스페인의 영혼",
        heading: "두 문화가 빚은 하나의 공간",
        body: [
          "스페인-필리핀 헤리티지는 우리가 하는 모든 일에 배어 있습니다. 건축과 인테리어부터 요리와 환대까지 — Txaleta는 가족, 너그러움, 전통, 함께함에 뿌리내린 문화의 융합입니다.",
          "모든 디테일은 우아하면서 편안하고, 세련되면서 다정한 공간을 위해 골랐습니다. 허세 없는 럭셔리, 마음에서 우러나는 환대.",
        ],
      },
      {
        kicker: "교감을 위한 디자인",
        heading: "의미 있는 순간을 위한 여백",
        body: [
          "Txaleta에서 여행은 목적지 방문 그 이상입니다. 가족과 우정, 웰니스, 의미 있는 순간을 위한 여백을 만드는 일입니다.",
          "아침은 장엄한 일출로 시작되고, 하루는 느리게 흘러갑니다. 저녁은 식탁에 둘러앉아 이야기와 음식과 웃음을 나누는 시간 — 집에 돌아간 뒤에도 오래 남는 순간들입니다.",
        ],
      },
    ],
    location: {
      kicker: "카미긴에서도 특별한 위치",
      heading: "섬의 중심에서, 인파와는 멀리",
      body:
        "맘바하오에 자리한 Txaleta는 카미긴의 명소들로 쉽게 닿으면서도 고요한 안식처로 남아 있습니다. 섬의 자연을 누빈 하루 끝에는 파노라마 바다와 섬바람, 잊지 못할 노을이 기다립니다.",
      attractions: [
        "화이트 아일랜드 모래톱",
        "만티게 섬 자연공원",
        "카티바와산 폭포",
        "투아산 폭포",
        "가라앉은 묘지(선큰 세머터리)",
        "옛 성당 유적",
        "산토 니뇨 냉천",
        "아덴트 온천",
        "히복히복 산",
      ],
    },
    whyChoose: {
      kicker: "Txaleta가 특별한 이유",
      heading: "리조트 그 이상, 마음이 머무는 곳.",
      body:
        "많은 분이 오션뷰와 인피니티 풀, 빌라를 보러 옵니다. 하지만 가장 오래 기억하는 것은 그곳에서 느낀 감정입니다 — 환영받고, 보살핌받고, 온전히 집에 있는 듯한.",
      points: [
        "카미긴의 가족 경영 부티크 리조트",
        "맞춤형 환대와 현지인의 추천",
        "파노라마 오션뷰 인피니티 풀",
        "스페인-필리핀 헤리티지와 진짜 섬의 매력",
        "맞춤 투어와 체험",
        "카미긴 주요 명소로의 편리한 접근",
        "필리핀-스페인 요리 레스토랑",
        "교감과 웰니스를 위한 고요한 안식처",
      ],
    },
    comeHome: {
      heading: "Txaleta로, 어서 오세요",
      body:
        "카미긴의 부티크 리조트를 찾으시든, 가족과의 섬 휴가든, 둘만의 로맨틱한 휴식이든 — 우리의 눈에 비친 이 섬을 경험하러 오세요.",
      closing: ["풍경 때문에 오셨다가,", "느낌 때문에 머무실 겁니다.", "어서 오세요, 집으로."],
    },
  },
};

const zh: AboutDict = {
  pillars: [
    {
      title: "以家为本的待客之道",
      idea: "宾客即家人。",
      quote:
        "我们把每一位客人当作家人——以植根于菲律宾与西班牙待客传统的温暖、关怀与真诚连结相待。",
    },
    {
      title: "文化交融与传承",
      idea: "菲律宾之心，西班牙之魂。",
      quote:
        "我们珍视菲西双重血脉，在敬重传统的同时，营造共同发现文化、共享自豪的空间。",
    },
    {
      title: "大道至简的疗愈",
      idea: "自然与滋养，因人而异。",
      quote:
        "我们相信有恢复力的生活——扎根自然、顺应舒缓的节奏，以滋养身、心、灵的用心设计。",
    },
    {
      title: "可持续的海岛生活",
      idea: "敬畏赐予我们生命的土地。",
      quote:
        "我们对卡米金自然之美的承诺：轻轻走过、就地取材，并扶持身边的社区共同成长。",
    },
    {
      title: "超越时间的团聚",
      idea: "留白，为了当下。",
      quote:
        "我们为缓慢而有意义的时刻留出空间——让几代人相聚，让时间既珍贵又简单。",
    },
  ],
  idealGuests: {
    kicker: "Txaleta为谁而设",
    heading: "献给用心旅行的人",
    body:
      "我们欢迎每一位客人，但心中尤其惦念这样的旅人：比起排满的行程更看重有意义的体验，比起人潮更看重连结，比起物质更看重回忆。",
    items: [
      {
        title: "追求高质量相处的家庭",
        body:
          "三代同游、久别重逢，或一场说走就走的周末——这里为围桌共餐、夕阳长谈、结伴环岛的时刻而生。",
      },
      {
        title: "想慢下来的伴侣",
        body:
          "重新靠近彼此、放松身心的空间——日出、慢悠悠的早餐、海岛探险，以及海边宁静的夜晚。",
      },
      {
        title: "疗愈与慢旅行爱好者",
        body:
          "献给懂得慢节奏与自然疗愈力的人——无边泳池畔的清晨、一次安静的散步、攀登希伯克-希伯克山，或只是海风与一本好书。",
      },
      {
        title: "文化与海岛探索者",
        body:
          "追寻真实体验的好奇旅人——本地传统、地方美食、藏在土地里的故事，以及游客路线之外的角落。",
      },
    ],
  },
  about: {
    hero: {
      kicker: "关于Txaleta de Camiguin",
      heading: "传承、待客之道与海岛生活在此相遇",
    },
    intro:
      "在俯瞰大海的悬崖上，Txaleta de Camiguin是曼巴豪一家家族经营的精品度假村，为追寻有意义的体验、震撼海景与真诚待客之道的旅人而建。Txaleta不只是落脚之处，更是放慢脚步、重新连结、以更温柔的节奏体验海岛生活的地方——无论您为何而来，我们的心愿只有一个：让您宾至如归。",
    sections: [
      {
        kicker: "我们的故事",
        heading: "一个扎根卡米金的家族梦想",
        body: [
          "Txaleta始于一个家族的梦想，源自对卡米金、对待客之道、对凝聚人心的传统的热爱。",
          "『Txaleta』一名源于西班牙语中『小屋』一词，映照着我们家族的西班牙血脉，以及把客人当作家人的温暖庇护所的愿景。如今这一愿景延续在住宿体验的每个角落——贴心的服务、用心设计的空间、共享的餐食与海岛探险。",
          "我们相信，最好的回忆往往最简单：与挚爱共赏的日出、餐桌旁的交谈、泳池边的笑声，以及面朝大海的静谧时刻。",
        ],
      },
      {
        kicker: "菲律宾之心，西班牙之魂",
        heading: "两种文化的交融",
        body: [
          "菲西传承渗透在我们所做的一切——从建筑与室内到美食与待客之道，Txaleta是植根于家庭、慷慨、传统与团聚的文化交融。",
          "每个细节都经过用心挑选：优雅而舒适，精致而亲切。不摆架子的奢华，发自内心的款待。",
        ],
      },
      {
        kicker: "为连结而设计",
        heading: "留给珍贵时刻的空间",
        body: [
          "在Txaleta，旅行不止于抵达一个目的地，而是为家庭、友谊、疗愈与珍贵时刻留出空间。",
          "清晨始于壮丽日出，白日缓缓展开，夜晚围坐餐桌，分享故事、美食与笑声——那些回家很久之后仍留在心里的时刻。",
        ],
      },
    ],
    location: {
      kicker: "卡米金独一无二的位置",
      heading: "岛之中心，远离人潮的静谧居所",
      body:
        "Txaleta位于曼巴豪，坐拥卡米金众多著名景点的便利，却始终是一处安静的避世之所。探索海岛自然奇观一天之后，回到这里，迎接您的是全景海色、海岛清风与难忘的日落。",
      attractions: [
        "白岛沙洲",
        "曼蒂格岛自然公园",
        "卡蒂巴瓦桑瀑布",
        "图阿桑瀑布",
        "沉没墓园",
        "古教堂遗址",
        "圣婴冷泉",
        "阿登特温泉",
        "希伯克-希伯克山",
      ],
    },
    whyChoose: {
      kicker: "Txaleta的与众不同",
      heading: "不止是度假村，更是心之所属。",
      body:
        "许多旅人为海景、无边泳池与别墅而来——但最令他们难忘的，是那种感觉：被欢迎、被照顾、彻底像回到了家。",
      points: [
        "卡米金家族经营的精品度假村",
        "个性化的款待与本地人推荐",
        "全景海景无边泳池",
        "菲西传承与地道海岛魅力",
        "量身定制的行程与体验",
        "轻松抵达卡米金各大景点",
        "供应菲西料理的餐厅",
        "为连结、疗愈与团聚而设的宁静居所",
      ],
    },
    comeHome: {
      heading: "回家吧，回到Txaleta",
      body:
        "无论您在寻找卡米金的精品度假村、适合全家的海岛假期，还是浪漫的二人世界——都请来透过我们的眼睛，认识这座岛。",
      closing: ["为风景而来。", "为感觉而留。", "欢迎回家。"],
    },
  },
};

export const aboutContent: Record<Locale, AboutDict> = { en, fr, de, ja, ko, zh };
