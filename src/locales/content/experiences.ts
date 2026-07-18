// ============================================================================
// Experiences page content — per-locale (activity cards, signature rituals,
// rentals). Signature ritual NAMES (Almusal sa Bahay, Sunrise Saludo…) stay in
// the original by design — they are brand ritual names; taglines and bodies
// are localized.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type ExperiencesDict = {
  cards: { title: string; description: string }[];
  signature: {
    kicker: string;
    heading: string;
    body: string;
    items: { tagline: string; body: string }[];
  };
  rentals: {
    kicker: string;
    heading: string;
    body: string;
    items: { name: string; blurb: string; rates: { label: string; price: string }[] }[];
    note: string;
  };
};

const en: ExperiencesDict = {
  cards: [
    {
      title: "Out to the Sandbars",
      description:
        "A private speedboat carries you past quiet coves to White Island's bare white spit and the reefs below, where the Bohol Sea turns clear over coral and the island's sheltered giant clams.",
    },
    {
      title: "The Bohol Sea, Faster",
      description:
        "Open throttle across open water, the volcano shrinking behind you. Jet skis and watersports for the mornings you would rather feel the sea than drift on it.",
    },
    {
      title: "Up the Living Volcano",
      description:
        "Guided ascents of active Hibok-Hibok climb through rainforest and spring-fed shade to a ridgeline where the whole island, and the sea around it, falls away below you.",
    },
    {
      title: "One Road, All Day",
      description:
        "Take the 64-kilometre ring road at your own pace: Katibawasan's falls, the cross marking the sunken cemetery, cold springs found between one town and the next.",
    },
  ],
  signature: {
    kicker: "Signature Experiences",
    heading: "Rituals Made for Togetherness",
    body:
      "Woven through every stay are the small ceremonies that make Txaleta itself — heritage on the table, wellness by the sea, and slow evenings under the stars. Tell us what your family loves and we'll arrange the rest.",
    items: [
      {
        tagline: "Family Heritage Breakfast",
        body:
          "A slow morning ritual served in-room or al fresco — heirloom Filipino-Spanish plates like tsokolate-e, pan de sal con keso de bola, garlic adobo, and fresh Camiguin mango. Comfort food, storytelling, and shared moments.",
      },
      {
        tagline: "Cliffside Yoga at Dawn",
        body:
          "Gentle, breath-centered yoga overlooking the sea at sunrise — with Mantigue Island on the horizon, visible right from Txaleta and framed by birdsong and the rhythm of Camiguin's early light. Designed for all levels — a calm, grounded way to begin the day.",
      },
      {
        tagline: "Kids' Mindful Movement",
        body:
          "A playful yoga session for children — stories, animal poses, and breathwork in the garden or shaded lanai, guided by certified kids' instructors. Whole-family wellness, and a quiet moment for parents.",
      },
      {
        tagline: "Wellness Afternoon",
        body:
          "Traditional hilot massage with a volcanic salt foot soak and native herbal tea — local oils, skilled hands, and ancestral healing wisdom. Deep relaxation rooted in Filipino tradition.",
      },
      {
        tagline: "Sunset Picnic",
        body:
          "A curated seaside or garden picnic — or a barefoot spread on White Island's powder-white sandbar — with ensaymada, churros con tsokolate, fresh coconut juice or sangria, blankets, woven mats, and a reflection journal included. Made for golden-hour bonding.",
      },
      {
        tagline: "Island Heritage Tour",
        body:
          "A soulful exploration of Camiguin's heritage — the Old Spanish Church Ruins, the Sunken Cemetery, ancestral homes, and the slopes of Mt. Hibok-Hibok — guided by local storytellers sharing Filipino-Spanish history. Depth, learning, and real cultural connection.",
      },
      {
        tagline: "Family Cooking Session",
        body:
          "An interactive kitchen experience at Txaleta's restaurant — fast becoming one of the best up-and-coming tables in Camiguin — where you cook paella filipina, rellenong bangus, or bibingka alongside a local chef and learn the stories behind each dish. Joyful bonding through food and shared tradition.",
      },
      {
        tagline: "Digital Detox & Stargazing",
        body:
          "After an evening swim in Ardent Hot Springs, settle into a tech-free night of oil lamps, stars, and local myths — cacao or salabat in hand, slow music and gentle storytelling under the Camiguin sky. A soul-soothing break from the noise.",
      },
    ],
  },
  rentals: {
    kicker: "Getting Around",
    heading: "The Island, at Your Own Pace",
    body:
      "Take Camiguin on your own terms — a scooter for the coast road, a vehicle for the family, or the open sea by jet ski. We arrange it all from the front desk and add it straight to your stay.",
    items: [
      {
        name: "Scooter",
        blurb:
          "Nimble and easy for solo island cruising — the simplest way to take the 64-kilometre ring road at your own pace.",
        rates: [{ label: "Per day", price: "₱450" }],
      },
      {
        name: "SUV / AUV",
        blurb:
          "Spacious and comfortable for families and groups — room for everyone, and for the day's plans.",
        rates: [
          { label: "Per day", price: "₱2,850" },
          { label: "Half day", price: "₱1,500" },
        ],
      },
      {
        name: "Local Driver",
        blurb:
          "Add a local driver for ease and insider tips around the island — let someone who knows the roads do the driving.",
        rates: [
          { label: "Per day", price: "+₱1,000" },
          { label: "Half day", price: "+₱500" },
        ],
      },
      {
        name: "Jet Ski",
        blurb:
          "Thrilling rides across the Bohol Sea, with safety gear and a full orientation included before you set off.",
        rates: [
          { label: "3 hours", price: "₱7,000" },
          { label: "Additional hour", price: "₱1,500" },
        ],
      },
    ],
    note: "Every rental comes with essential inclusions, flexible durations and a clear fuel-return policy — making each journey smooth, comfortable and tailored to your stay.",
  },
};

const fr: ExperiencesDict = {
  cards: [
    {
      title: "Cap sur les bancs de sable",
      description:
        "Un speedboat privé vous mène, au fil de criques tranquilles, jusqu'à la langue de sable blanc de White Island et aux récifs qui l'entourent — là où la mer de Bohol devient limpide au-dessus des coraux et des bénitiers géants protégés de l'île.",
    },
    {
      title: "La mer de Bohol, en accéléré",
      description:
        "Pleins gaz sur l'eau libre, le volcan qui rétrécit derrière vous. Jet-ski et sports nautiques, pour les matins où l'on préfère sentir la mer plutôt que d'y flotter.",
    },
    {
      title: "À l'assaut du volcan vivant",
      description:
        "L'ascension guidée du Hibok-Hibok, volcan actif, traverse forêt tropicale et ombrages nourris de sources jusqu'à une ligne de crête d'où l'île entière, et la mer autour, se déploient à vos pieds.",
    },
    {
      title: "Une route, toute la journée",
      description:
        "Parcourez les 64 kilomètres de la route circulaire à votre rythme : les chutes de Katibawasan, la croix du cimetière englouti, des sources froides entre deux villages.",
    },
  ],
  signature: {
    kicker: "Expériences signature",
    heading: "Des rituels faits pour être partagés",
    body:
      "Chaque séjour est tissé de petites cérémonies qui font l'âme de Txaleta — l'héritage à table, le bien-être face à la mer, les soirées lentes sous les étoiles. Dites-nous ce que votre famille aime, nous organisons le reste.",
    items: [
      {
        tagline: "Petit-déjeuner d'héritage familial",
        body:
          "Un rituel matinal tout en lenteur, servi en chambre ou en plein air — des assiettes hispano-philippines de tradition : tsokolate-e, pan de sal con keso de bola, adobo à l'ail et mangue fraîche de Camiguin. Cuisine réconfortante, histoires et moments partagés.",
      },
      {
        tagline: "Yoga à l'aube sur la falaise",
        body:
          "Un yoga doux, centré sur le souffle, face à la mer au lever du soleil — l'île Mantigue à l'horizon, visible depuis Txaleta, dans un écrin de chants d'oiseaux et de première lumière. Pour tous niveaux — une façon calme et ancrée de commencer la journée.",
      },
      {
        tagline: "Mouvement en pleine conscience pour enfants",
        body:
          "Une séance de yoga ludique pour les enfants — histoires, postures d'animaux et respiration dans le jardin ou sous le lanai ombragé, guidée par des instructeurs certifiés. Bien-être en famille, et un moment de calme pour les parents.",
      },
      {
        tagline: "Après-midi bien-être",
        body:
          "Massage traditionnel hilot, bain de pieds au sel volcanique et tisane d'herbes locales — huiles de l'île, mains expertes et sagesse ancestrale. Une détente profonde, enracinée dans la tradition philippine.",
      },
      {
        tagline: "Pique-nique au coucher du soleil",
        body:
          "Un pique-nique soigné en bord de mer ou au jardin — ou pieds nus sur le sable poudreux de White Island — avec ensaymada, churros con tsokolate, jus de coco frais ou sangria, plaids, nattes tissées et carnet de réflexion inclus. Fait pour les liens de l'heure dorée.",
      },
      {
        tagline: "Circuit du patrimoine de l'île",
        body:
          "Une exploration sensible de l'héritage de Camiguin — les ruines de la vieille église espagnole, le cimetière englouti, les maisons ancestrales et les pentes du Hibok-Hibok — guidée par des conteurs locaux qui partagent l'histoire hispano-philippine. Profondeur, découverte et vraie connexion culturelle.",
      },
      {
        tagline: "Atelier de cuisine en famille",
        body:
          "Une expérience interactive au restaurant de Txaleta — l'une des tables montantes de Camiguin — où vous cuisinez paella filipina, rellenong bangus ou bibingka aux côtés d'un chef local, en apprenant l'histoire de chaque plat. Le bonheur de se retrouver autour de la cuisine et de la tradition.",
      },
      {
        tagline: "Détox numérique & nuit étoilée",
        body:
          "Après une baignade du soir aux sources chaudes d'Ardent, place à une nuit sans écrans : lampes à huile, étoiles et légendes locales — cacao ou salabat à la main, musique douce et récits sous le ciel de Camiguin. Une pause qui apaise l'âme.",
      },
    ],
  },
  rentals: {
    kicker: "Se déplacer",
    heading: "L'île, à votre rythme",
    body:
      "Prenez Camiguin à votre façon — un scooter pour la route côtière, un véhicule pour la famille, ou le grand large en jet-ski. Nous organisons tout depuis la réception, ajouté directement à votre séjour.",
    items: [
      {
        name: "Scooter",
        blurb:
          "Agile et facile pour explorer en solo — la façon la plus simple de parcourir les 64 kilomètres de la route circulaire à votre rythme.",
        rates: [{ label: "Par jour", price: "₱450" }],
      },
      {
        name: "SUV / AUV",
        blurb:
          "Spacieux et confortable pour familles et groupes — de la place pour tout le monde, et pour les plans de la journée.",
        rates: [
          { label: "Par jour", price: "₱2,850" },
          { label: "Demi-journée", price: "₱1,500" },
        ],
      },
      {
        name: "Chauffeur local",
        blurb:
          "Ajoutez un chauffeur local pour plus de sérénité et les bons plans de l'île — laissez le volant à qui connaît les routes.",
        rates: [
          { label: "Par jour", price: "+₱1,000" },
          { label: "Demi-journée", price: "+₱500" },
        ],
      },
      {
        name: "Jet-ski",
        blurb:
          "Des sensations fortes sur la mer de Bohol — équipement de sécurité et briefing complet inclus avant le départ.",
        rates: [
          { label: "3 heures", price: "₱7,000" },
          { label: "Heure supplémentaire", price: "₱1,500" },
        ],
      },
    ],
    note: "Chaque location comprend l'essentiel, des durées flexibles et une politique de carburant claire — pour des trajets fluides, confortables et adaptés à votre séjour.",
  },
};

const de: ExperiencesDict = {
  cards: [
    {
      title: "Hinaus zu den Sandbänken",
      description:
        "Ein privates Speedboot bringt Sie vorbei an stillen Buchten zur blanken weißen Zunge von White Island und den Riffen darunter — dort, wo die Bohol-See über Korallen und den geschützten Riesenmuscheln der Insel glasklar wird.",
    },
    {
      title: "Die Bohol-See, schneller",
      description:
        "Vollgas über offenes Wasser, der Vulkan schrumpft hinter Ihnen. Jetski und Wassersport — für die Morgen, an denen Sie das Meer spüren wollen statt darauf zu treiben.",
    },
    {
      title: "Hinauf auf den lebenden Vulkan",
      description:
        "Geführte Aufstiege auf den aktiven Hibok-Hibok führen durch Regenwald und quellkühlen Schatten bis zu einem Grat, an dem die ganze Insel — und das Meer ringsum — unter Ihnen liegt.",
    },
    {
      title: "Eine Straße, ein ganzer Tag",
      description:
        "Nehmen Sie die 64 Kilometer lange Ringstraße in Ihrem Tempo: die Katibawasan-Fälle, das Kreuz über dem versunkenen Friedhof, kalte Quellen zwischen einem Ort und dem nächsten.",
    },
  ],
  signature: {
    kicker: "Signature-Erlebnisse",
    heading: "Rituale, gemacht für Gemeinsamkeit",
    body:
      "Durch jeden Aufenthalt ziehen sich die kleinen Zeremonien, die Txaleta ausmachen — Erbe auf dem Tisch, Wohlbefinden am Meer, langsame Abende unter Sternen. Sagen Sie uns, was Ihre Familie liebt — wir kümmern uns um den Rest.",
    items: [
      {
        tagline: "Familien-Frühstück mit Tradition",
        body:
          "Ein langsames Morgenritual, serviert im Zimmer oder im Freien — spanisch-philippinische Traditionsgerichte wie Tsokolate-e, Pan de Sal con Keso de Bola, Knoblauch-Adobo und frische Camiguin-Mango. Wohlfühlküche, Geschichten und geteilte Momente.",
      },
      {
        tagline: "Yoga am Klippenrand bei Sonnenaufgang",
        body:
          "Sanftes, atemzentriertes Yoga mit Blick aufs Meer im ersten Licht — Mantigue Island am Horizont, direkt von Txaleta aus sichtbar, gerahmt von Vogelgesang und Camiguins frühem Rhythmus. Für alle Level — ein ruhiger, geerdeter Start in den Tag.",
      },
      {
        tagline: "Achtsame Bewegung für Kinder",
        body:
          "Eine spielerische Yogastunde für Kinder — Geschichten, Tierposen und Atemübungen im Garten oder auf der schattigen Lanai, geleitet von zertifizierten Kinder-Instruktoren. Wohlbefinden für die ganze Familie — und ein stiller Moment für die Eltern.",
      },
      {
        tagline: "Wellness-Nachmittag",
        body:
          "Traditionelle Hilot-Massage mit Fußbad in Vulkansalz und einheimischem Kräutertee — lokale Öle, kundige Hände und überliefertes Heilwissen. Tiefe Entspannung, verwurzelt in philippinischer Tradition.",
      },
      {
        tagline: "Picknick zum Sonnenuntergang",
        body:
          "Ein liebevoll gedecktes Picknick am Meer oder im Garten — oder barfuß auf der puderweißen Sandbank von White Island — mit Ensaymada, Churros con Tsokolate, frischem Kokoswasser oder Sangria, Decken, geflochtenen Matten und einem Reflexionsjournal. Gemacht für die goldene Stunde.",
      },
      {
        tagline: "Tour zum Erbe der Insel",
        body:
          "Eine Reise zur Seele von Camiguins Erbe — die Ruinen der alten spanischen Kirche, der versunkene Friedhof, Ahnenhäuser und die Hänge des Hibok-Hibok — geführt von lokalen Erzählern, die spanisch-philippinische Geschichte lebendig machen. Tiefe, Lernen und echte kulturelle Verbindung.",
      },
      {
        tagline: "Kochstunde für die Familie",
        body:
          "Ein interaktives Küchenerlebnis im Restaurant von Txaleta — schnell eine der spannendsten neuen Adressen Camiguins — bei dem Sie Paella Filipina, Rellenong Bangus oder Bibingka an der Seite eines lokalen Chefs kochen und die Geschichten hinter jedem Gericht erfahren. Freude am Essen, verbunden durch Tradition.",
      },
      {
        tagline: "Digital Detox & Sternenhimmel",
        body:
          "Nach einem Abendbad in den Ardent-Thermalquellen erwartet Sie eine Nacht ohne Bildschirme: Öllampen, Sterne und Inselmythen — Kakao oder Salabat in der Hand, leise Musik und sanftes Erzählen unter Camiguins Himmel. Eine Wohltat für die Seele.",
      },
    ],
  },
  rentals: {
    kicker: "Unterwegs auf der Insel",
    heading: "Die Insel in Ihrem Tempo",
    body:
      "Erleben Sie Camiguin zu Ihren Bedingungen — ein Roller für die Küstenstraße, ein Wagen für die Familie oder das offene Meer per Jetski. Wir organisieren alles an der Rezeption und buchen es direkt auf Ihren Aufenthalt.",
    items: [
      {
        name: "Roller",
        blurb:
          "Wendig und unkompliziert für Solo-Touren — der einfachste Weg, die 64 Kilometer lange Ringstraße im eigenen Tempo zu nehmen.",
        rates: [{ label: "Pro Tag", price: "₱450" }],
      },
      {
        name: "SUV / AUV",
        blurb:
          "Geräumig und komfortabel für Familien und Gruppen — Platz für alle und für die Pläne des Tages.",
        rates: [
          { label: "Pro Tag", price: "₱2,850" },
          { label: "Halber Tag", price: "₱1,500" },
        ],
      },
      {
        name: "Lokaler Fahrer",
        blurb:
          "Buchen Sie einen lokalen Fahrer dazu — entspannt reisen mit Insider-Tipps, gefahren von jemandem, der die Straßen kennt.",
        rates: [
          { label: "Pro Tag", price: "+₱1,000" },
          { label: "Halber Tag", price: "+₱500" },
        ],
      },
      {
        name: "Jetski",
        blurb:
          "Rasante Fahrten über die Bohol-See — Sicherheitsausrüstung und ausführliche Einweisung vor dem Start inklusive.",
        rates: [
          { label: "3 Stunden", price: "₱7,000" },
          { label: "Weitere Stunde", price: "₱1,500" },
        ],
      },
    ],
    note: "Jede Miete umfasst das Wesentliche, flexible Zeiten und eine klare Tankregelung — für Fahrten, die reibungslos, komfortabel und auf Ihren Aufenthalt zugeschnitten sind.",
  },
};

const ja: ExperiencesDict = {
  cards: [
    {
      title: "砂州の島へ",
      description:
        "プライベートスピードボートで静かな入り江を抜け、ホワイトアイランドの真っ白な砂州とその下のリーフへ。ボホール海がサンゴと島の保護区のシャコガイの上で透きとおる場所です。",
    },
    {
      title: "ボホール海を、もっと速く",
      description:
        "外海をフルスロットルで、火山が背後に小さくなっていく。海に漂うより、海を感じたい朝のためのジェットスキーとウォータースポーツ。",
    },
    {
      title: "生きた火山を登る",
      description:
        "活火山ヒボクヒボクのガイド付き登山。熱帯雨林と湧き水の木陰を抜けて尾根に立てば、島全体と、それを囲む海が眼下に広がります。",
    },
    {
      title: "一本道を、一日かけて",
      description:
        "全長64kmの環状道路を自分のペースで。カティバワサンの滝、海に沈んだ墓地を示す十字架、町と町のあいだに湧く冷たい泉。",
    },
  ],
  signature: {
    kicker: "シグネチャー体験",
    heading: "だんらんのための儀式",
    body:
      "滞在のそこかしこに、Txaletaらしさをつくる小さな儀式が織り込まれています。食卓の伝統、海辺のウェルネス、星空の下のゆっくりした夜。ご家族の好みを教えてください。あとは私たちが整えます。",
    items: [
      {
        tagline: "家族の伝統朝食",
        body:
          "お部屋または屋外で味わう、ゆったりした朝の儀式。ツォコラテ・エ、パン・デ・サルとケソ・デ・ボラ、ガーリックアドボ、カミギン産フレッシュマンゴーなど、代々受け継がれるフィリピン×スペインの味。心安らぐ料理と、物語と、分かち合う時間。",
      },
      {
        tagline: "夜明けの崖上ヨガ",
        body:
          "日の出の海を望みながらの、呼吸を中心にした優しいヨガ。水平線にはマンティゲ島、鳥のさえずりとカミギンの朝の光。全レベル対応 — 静かに、地に足をつけて一日を始める方法です。",
      },
      {
        tagline: "子どものマインドフル・ムーブメント",
        body:
          "子どものための遊び心あふれるヨガ。物語、動物のポーズ、呼吸法を、庭や木陰のラナイで。認定キッズインストラクターが導きます。家族みんなのウェルネスと、親のための静かなひととき。",
      },
      {
        tagline: "ウェルネスな午後",
        body:
          "伝統のヒロットマッサージに、火山塩のフットバスと島のハーブティー。地元のオイル、熟練の手、先人の癒しの知恵。フィリピンの伝統に根ざした深いリラクゼーション。",
      },
      {
        tagline: "夕暮れのピクニック",
        body:
          "海辺や庭での特別なピクニック — あるいはホワイトアイランドのパウダーサンドの上で裸足のまま。エンサイマーダ、チュロス・コン・ツォコラテ、フレッシュココナッツジュースかサングリア、ブランケット、編みマット、旅の日記帳つき。黄金色の時間を、大切な人と。",
      },
      {
        tagline: "島の伝統をめぐるツアー",
        body:
          "カミギンの遺産を心でたどる旅 — 旧スペイン教会跡、海に沈んだ墓地、先祖代々の家、ヒボクヒボク山の山裾。地元の語り部がフィリピン×スペインの歴史を伝えます。深さと学び、そして本物の文化的なつながり。",
      },
      {
        tagline: "家族の料理教室",
        body:
          "カミギンで注目の一軒となりつつあるTxaletaのレストランでの体験型キッチン。地元シェフと一緒にパエリア・フィリピーナ、レジェノン・バグス、ビビンカを作り、料理に宿る物語を学びます。食と伝統を分かち合う、喜びの時間。",
      },
      {
        tagline: "デジタルデトックスと星空観察",
        body:
          "アーデント温泉での夕方の湯浴みのあとは、スクリーンのない夜へ。オイルランプ、星、島の神話 — カカオかサラバットを手に、静かな音楽と語りをカミギンの空の下で。喧騒から心を解き放つ時間。",
      },
    ],
  },
  rentals: {
    kicker: "島内の移動",
    heading: "島を、自分のペースで",
    body:
      "カミギンをあなたの流儀で。海岸道路にはスクーター、家族には車、海へはジェットスキー。すべてフロントデスクで手配し、そのまま宿泊料金に加算できます。",
    items: [
      {
        name: "スクーター",
        blurb: "小回りが利いて気軽なひとり旅向き。64kmの環状道路を自分のペースで走る、いちばんシンプルな方法。",
        rates: [{ label: "1日", price: "₱450" }],
      },
      {
        name: "SUV / AUV",
        blurb: "家族やグループにゆったり快適。全員分の席と、その日の計画のための余裕を。",
        rates: [
          { label: "1日", price: "₱2,850" },
          { label: "半日", price: "₱1,500" },
        ],
      },
      {
        name: "地元ドライバー",
        blurb: "地元ドライバーを追加すれば、運転はお任せで島の穴場情報つき。道を知り尽くした人にハンドルを。",
        rates: [
          { label: "1日", price: "+₱1,000" },
          { label: "半日", price: "+₱500" },
        ],
      },
      {
        name: "ジェットスキー",
        blurb: "ボホール海を駆けるスリル。出発前の安全装備とオリエンテーション込み。",
        rates: [
          { label: "3時間", price: "₱7,000" },
          { label: "追加1時間", price: "₱1,500" },
        ],
      },
    ],
    note: "すべてのレンタルに基本装備、柔軟な利用時間、明快な燃料返却ポリシーが含まれます。滞在に合わせた、スムーズで快適な移動を。",
  },
};

const ko: ExperiencesDict = {
  cards: [
    {
      title: "모래톱을 향해",
      description:
        "프라이빗 스피드보트로 고요한 만을 지나 화이트 아일랜드의 새하얀 모래톱과 그 아래 산호초로. 보홀 바다가 산호와 섬의 보호 대왕조개 위에서 투명해지는 곳입니다.",
    },
    {
      title: "보홀 바다를, 더 빠르게",
      description:
        "탁 트인 바다를 전속력으로, 화산은 등 뒤로 작아집니다. 바다에 떠 있기보다 바다를 느끼고 싶은 아침을 위한 제트스키와 수상 스포츠.",
    },
    {
      title: "살아있는 화산을 오르다",
      description:
        "활화산 히복히복 가이드 등반. 열대우림과 샘물 그늘을 지나 능선에 서면 섬 전체와 그를 둘러싼 바다가 발아래 펼쳐집니다.",
    },
    {
      title: "길 하나로, 하루 종일",
      description:
        "64km 순환도로를 나만의 속도로. 카티바와산 폭포, 가라앉은 묘지를 알리는 십자가, 마을과 마을 사이 차가운 샘물.",
    },
  ],
  signature: {
    kicker: "시그니처 체험",
    heading: "함께하기 위한 리추얼",
    body:
      "머무름 곳곳에 Txaleta다움을 만드는 작은 의식들이 스며 있습니다. 식탁 위의 헤리티지, 바닷가의 웰니스, 별빛 아래 느린 저녁. 가족이 좋아하는 것을 알려주시면, 나머지는 저희가 준비합니다.",
    items: [
      {
        tagline: "가족 헤리티지 조식",
        body:
          "객실 또는 야외에서 즐기는 느린 아침 의식. 초콜라테-에, 판 데 살과 케소 데 볼라, 갈릭 아도보, 카미긴산 신선한 망고 등 대대로 이어진 필리핀-스페인 요리. 편안한 음식과 이야기, 함께 나누는 순간.",
      },
      {
        tagline: "새벽 절벽 요가",
        body:
          "일출의 바다를 바라보며 하는 호흡 중심의 부드러운 요가. 수평선에는 만티게 섬, 새소리와 카미긴의 아침 빛. 모든 레벨 환영 — 차분하고 단단하게 하루를 여는 방법.",
      },
      {
        tagline: "아이들의 마음챙김 요가",
        body:
          "아이들을 위한 즐거운 요가 시간. 이야기, 동물 자세, 호흡 놀이를 정원이나 그늘진 라나이에서, 공인 키즈 강사와 함께. 온 가족의 웰니스, 그리고 부모를 위한 조용한 한때.",
      },
      {
        tagline: "웰니스 오후",
        body:
          "전통 힐롯 마사지와 화산 소금 족욕, 토종 허브차. 지역의 오일, 숙련된 손길, 조상의 치유 지혜. 필리핀 전통에 뿌리내린 깊은 이완.",
      },
      {
        tagline: "선셋 피크닉",
        body:
          "바닷가나 정원에서의 정성스러운 피크닉 — 혹은 화이트 아일랜드의 분처럼 고운 모래 위에서 맨발로. 엔사이마다, 추로스와 초콜라테, 신선한 코코넛 주스나 상그리아, 담요, 짜임 매트, 여행 일기장까지. 황금빛 시간을 함께.",
      },
      {
        tagline: "섬 헤리티지 투어",
        body:
          "카미긴의 유산을 마음으로 더듬는 여정 — 옛 스페인 성당 유적, 가라앉은 묘지, 고택들, 히복히복 산자락. 필리핀-스페인 역사를 들려주는 현지 이야기꾼과 함께. 깊이와 배움, 진짜 문화적 교감.",
      },
      {
        tagline: "가족 요리 클래스",
        body:
          "카미긴에서 주목받는 레스토랑으로 떠오르는 Txaleta의 주방에서 펼쳐지는 체험형 클래스. 현지 셰프와 함께 파에야 필리피나, 레예농 방구스, 비빙카를 만들며 요리마다 깃든 이야기를 배웁니다. 음식과 전통으로 이어지는 즐거운 시간.",
      },
      {
        tagline: "디지털 디톡스 & 별 관측",
        body:
          "아덴트 온천에서의 저녁 목욕 후, 화면 없는 밤으로. 오일 램프, 별, 섬의 신화 — 카카오나 살라바트를 손에 들고, 느린 음악과 이야기로 카미긴의 하늘 아래. 소음에서 영혼을 쉬게 하는 시간.",
      },
    ],
  },
  rentals: {
    kicker: "섬에서의 이동",
    heading: "섬을, 나만의 속도로",
    body:
      "카미긴을 당신의 방식대로. 해안도로엔 스쿠터, 가족에겐 차량, 바다엔 제트스키. 프런트 데스크에서 모두 준비해 숙박 요금에 바로 더해 드립니다.",
    items: [
      {
        name: "스쿠터",
        blurb: "혼자 떠나는 섬 크루징에 가볍고 간편하게. 64km 순환도로를 내 속도로 달리는 가장 단순한 방법.",
        rates: [{ label: "1일", price: "₱450" }],
      },
      {
        name: "SUV / AUV",
        blurb: "가족과 그룹을 위한 넉넉하고 편안한 선택. 모두를 위한 자리, 하루의 계획을 위한 여유.",
        rates: [
          { label: "1일", price: "₱2,850" },
          { label: "반일", price: "₱1,500" },
        ],
      },
      {
        name: "현지 드라이버",
        blurb: "현지 드라이버를 더하면 운전은 맡기고 섬의 알짜 정보까지. 길을 아는 사람에게 핸들을.",
        rates: [
          { label: "1일", price: "+₱1,000" },
          { label: "반일", price: "+₱500" },
        ],
      },
      {
        name: "제트스키",
        blurb: "보홀 바다를 가르는 짜릿함. 출발 전 안전 장비와 충분한 오리엔테이션 포함.",
        rates: [
          { label: "3시간", price: "₱7,000" },
          { label: "추가 1시간", price: "₱1,500" },
        ],
      },
    ],
    note: "모든 렌털에 필수 구성품, 유연한 이용 시간, 명확한 연료 반납 규정이 포함됩니다. 머무름에 꼭 맞는 부드럽고 편안한 이동을 위해.",
  },
};

const zh: ExperiencesDict = {
  cards: [
    {
      title: "驶向沙洲",
      description:
        "私人快艇载您掠过静谧海湾，抵达白岛裸白的沙嘴与水下礁石——在那里，保和海在珊瑚与岛上受保护的大砗磲之上变得清澈见底。",
    },
    {
      title: "保和海，再快一点",
      description:
        "油门全开驰骋外海，火山在身后渐渐缩小。摩托艇与水上运动，献给那些想感受大海、而不只是漂在海上的清晨。",
    },
    {
      title: "攀登活火山",
      description:
        "在向导带领下攀登活火山希伯克-希伯克，穿过雨林与山泉滋养的树荫，登上山脊——整座海岛与环抱它的大海在脚下铺展开来。",
    },
    {
      title: "一条路，一整天",
      description:
        "以自己的节奏走完64公里环岛公路：卡蒂巴瓦桑瀑布、标记沉没墓园的十字架，以及一镇与一镇之间的冷泉。",
    },
  ],
  signature: {
    kicker: "招牌体验",
    heading: "为团聚而设的仪式",
    body:
      "每段住宿都织入了让Txaleta成为Txaleta的小小仪式——餐桌上的传承、海边的疗愈、星空下的慢夜晚。告诉我们家人喜欢什么，其余交给我们安排。",
    items: [
      {
        tagline: "家族传承早餐",
        body:
          "在客房或露天享用的慢晨光仪式——世代相传的菲西料理：热可可tsokolate-e、配奶酪球的pan de sal、蒜香阿多波，以及卡米金新鲜芒果。抚慰人心的食物、故事与共享的时光。",
      },
      {
        tagline: "崖畔日出瑜伽",
        body:
          "日出时分面朝大海的舒缓呼吸瑜伽——地平线上是曼蒂格岛，从Txaleta即可望见，伴着鸟鸣与卡米金的晨光。适合所有水平——以平静而踏实的方式开启一天。",
      },
      {
        tagline: "儿童正念律动",
        body:
          "为孩子设计的趣味瑜伽——故事、动物姿势与呼吸练习，在花园或树荫下的凉台进行，由持证儿童导师带领。全家共享的疗愈，也是父母难得的安静时刻。",
      },
      {
        tagline: "疗愈午后",
        body:
          "传统希洛按摩，配火山盐足浴与本地草本茶——本地精油、娴熟手法与先人的疗愈智慧。植根菲律宾传统的深度放松。",
      },
      {
        tagline: "日落野餐",
        body:
          "海边或花园里的精致野餐——或赤脚坐在白岛粉白的沙洲上——恩赛马达面包、吉拿棒配热可可、鲜椰汁或桑格利亚，毯子、编织草席与一本旅行手记。为黄金时刻的相聚而备。",
      },
      {
        tagline: "海岛传承之旅",
        body:
          "一场触及卡米金灵魂的传承之旅——西班牙古教堂遗址、沉没墓园、祖宅老屋与希伯克-希伯克山麓——由本地讲述者带路，娓娓道来菲西历史。深度、学习与真实的文化连结。",
      },
      {
        tagline: "家庭烹饪课",
        body:
          "在Txaleta餐厅——卡米金迅速崛起的新星食府——的互动厨房体验。与本地主厨一起烹制菲式海鲜饭、酿鲜奶鱼或比宾卡米糕，听懂每道菜背后的故事。以美食与传统相连的欢乐时光。",
      },
      {
        tagline: "数字排毒与观星",
        body:
          "在阿登特温泉夜泳之后，进入没有屏幕的夜晚：油灯、星空与海岛神话——手捧可可或姜茶salabat，在卡米金的夜空下听慢音乐与轻声讲述。让灵魂远离喧嚣的休憩。",
      },
    ],
  },
  rentals: {
    kicker: "海岛出行",
    heading: "这座岛，由你掌控节奏",
    body:
      "以你的方式游卡米金——海岸公路骑小摩托，全家出行租车，出海则有摩托艇。一切由前台安排，费用直接计入住宿账单。",
    items: [
      {
        name: "小型摩托车",
        blurb: "灵活轻便，适合独自环岛——以自己的节奏走完64公里环岛公路的最简单方式。",
        rates: [{ label: "每天", price: "₱450" }],
      },
      {
        name: "SUV / AUV",
        blurb: "宽敞舒适，适合家庭与团体——坐得下所有人，也装得下一天的计划。",
        rates: [
          { label: "每天", price: "₱2,850" },
          { label: "半天", price: "₱1,500" },
        ],
      },
      {
        name: "本地司机",
        blurb: "加一位本地司机，省心之余还有内行攻略——让熟悉道路的人来开车。",
        rates: [
          { label: "每天", price: "+₱1,000" },
          { label: "半天", price: "+₱500" },
        ],
      },
      {
        name: "水上摩托",
        blurb: "驰骋保和海的刺激体验——出发前含安全装备与完整讲解。",
        rates: [
          { label: "3小时", price: "₱7,000" },
          { label: "加时每小时", price: "₱1,500" },
        ],
      },
    ],
    note: "每项租赁均含基础配套、灵活时长与清晰的燃油归还政策——让每段旅程顺畅、舒适、贴合您的行程。",
  },
};

export const experiencesContent: Record<Locale, ExperiencesDict> = { en, fr, de, ja, ko, zh };
