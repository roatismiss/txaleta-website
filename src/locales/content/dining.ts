// ============================================================================
// Dining page content — per-locale. Dish names (paella, tapas, adobo, leche
// flan, tsokolate…) stay in the original; they are menu vocabulary.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type DiningDict = {
  heading: string;
  subheading: string;
  body: string;
  stories: { kicker: string; heading: string; body: string }[];
  family: { kicker: string; heading: string; body: string };
  local: { kicker: string; heading: string; body: string };
  roomService: { kicker: string; heading: string; body: string };
  closing: { heading: string; body: string; signoff: string[] };
};

const en: DiningDict = {
  heading: "Dining at Txaleta",
  subheading: "One of Camiguin's Most Memorable Dining Experiences",
  body:
    "Perched on a scenic clifftop overlooking the sea, Txaleta offers a unique dining experience that brings together Filipino warmth, Spanish heritage, breathtaking ocean views, and thoughtfully prepared cuisine. Whether you're looking for breakfast in Camiguin, a leisurely lunch with a view, moonlight cocktails, or dinner under the stars, our restaurant welcomes both resort guests and walk-in visitors seeking great food and unforgettable island hospitality.",
  stories: [
    {
      kicker: "The Kitchen",
      heading: "Filipino-Spanish Cuisine Rooted in Family Tradition",
      body:
        "Our menu celebrates the flavors that have shaped our family's story. Inspired by both Filipino and Spanish culinary traditions, we serve dishes designed to be shared and enjoyed together — fresh seafood, local ingredients, traditional recipes, and island flavors that honor both heritage and home. From paella and tapas to beloved Filipino favorites, every dish is prepared with care and meant to nourish both body and spirit.",
    },
    {
      kicker: "Morning",
      heading: "Breakfast with a View in Camiguin",
      body:
        "Mornings at Txaleta are unhurried. Wake up to freshly brewed coffee, tropical fruits, homemade specialties, and breakfast dishes served alongside panoramic ocean views and the gentle rhythm of island life. Whether you're preparing for a day of adventure or simply enjoying a slow morning, breakfast at Txaleta is one of the most peaceful ways to begin your day in Camiguin.",
    },
    {
      kicker: "Evening",
      heading: "Sunset Dining Overlooking the Sea",
      body:
        "As the sun begins to set, our clifftop location offers one of the most beautiful dining settings in Camiguin. Gather with family and friends, enjoy fresh island flavors, and watch the sky transform into shades of gold, orange, and pink while overlooking the sea. These are the moments our guests remember long after their holiday ends.",
    },
  ],
  family: {
    kicker: "Gather",
    heading: "Family Dining, Celebrations & Special Occasions",
    body:
      "Some of life's best memories are made around the table. Whether you're celebrating a birthday, anniversary, family reunion, wedding gathering, or simply enjoying a meal together, our team is happy to help create a dining experience that feels personal and memorable. Private dining arrangements and customized menus are available upon request.",
  },
  local: {
    kicker: "From the Island",
    heading: "Local Ingredients, Island Flavors",
    body:
      "Whenever possible, we source ingredients locally and support the Camiguin community that makes this island so special. Fresh seafood, tropical fruits, locally grown produce, and regional flavors inspire much of what we serve — letting guests enjoy an authentic taste of Camiguin while supporting local farmers, fishermen, and suppliers.",
  },
  roomService: {
    kicker: "Room Service, Reimagined",
    heading: "From Your Room, to Your Terrace",
    body:
      "Some afternoons you won't want to leave the deck. Scan the code in your room to browse the café's island delicacies — the morning's catch, a cold drink, something sweet — and order straight from your phone. We'll bring it to wherever you've settled: the pool, the lounge, your own private terrace.",
  },
  closing: {
    heading: "Come Hungry. Leave Nourished.",
    body:
      "At Txaleta, we hope every meal leaves you with more than a full stomach — a story shared, a laugh remembered, a sunset enjoyed, and the feeling of having gathered around a table where you truly belong.",
    signoff: ["Welcome to the table.", "Welcome home."],
  },
};

const fr: DiningDict = {
  heading: "La table de Txaleta",
  subheading: "L'une des expériences culinaires les plus mémorables de Camiguin",
  body:
    "Perché sur une falaise face à la mer, Txaleta propose une expérience culinaire unique où se rencontrent la chaleur philippine, l'héritage espagnol, des vues spectaculaires et une cuisine préparée avec soin. Petit-déjeuner à Camiguin, déjeuner tranquille avec vue, cocktails au clair de lune ou dîner sous les étoiles : notre restaurant accueille les hôtes du resort comme les visiteurs de passage.",
  stories: [
    {
      kicker: "La cuisine",
      heading: "Une cuisine hispano-philippine ancrée dans la tradition familiale",
      body:
        "Notre carte célèbre les saveurs qui ont façonné l'histoire de notre famille. Inspirés des traditions culinaires philippines et espagnoles, nos plats sont faits pour être partagés — fruits de mer frais, produits locaux, recettes de tradition et saveurs de l'île qui honorent l'héritage autant que la maison. De la paella et des tapas aux grands classiques philippins, chaque plat est préparé avec soin, pour nourrir le corps et l'esprit.",
    },
    {
      kicker: "Le matin",
      heading: "Petit-déjeuner avec vue à Camiguin",
      body:
        "Les matins à Txaleta ne connaissent pas la hâte. Réveillez-vous avec un café fraîchement passé, des fruits tropicaux, des spécialités maison et des assiettes servies face au panorama de l'océan, au rythme doux de la vie insulaire. Avant une journée d'aventure ou pour un matin tout en lenteur, le petit-déjeuner à Txaleta est l'une des plus paisibles façons de commencer la journée.",
    },
    {
      kicker: "Le soir",
      heading: "Dîner au coucher du soleil, face à la mer",
      body:
        "Quand le soleil descend, notre falaise offre l'un des plus beaux décors de table de Camiguin. Réunissez famille et amis, savourez les saveurs fraîches de l'île et regardez le ciel se teinter d'or, d'orange et de rose au-dessus de la mer. Ce sont ces moments que nos hôtes gardent longtemps après la fin des vacances.",
    },
  ],
  family: {
    kicker: "Se retrouver",
    heading: "Repas de famille, célébrations & grandes occasions",
    body:
      "Les plus beaux souvenirs se font souvent autour de la table. Anniversaire, noces, retrouvailles de famille, réception de mariage ou simple repas partagé — notre équipe se fait une joie de créer une expérience personnelle et mémorable. Salles privées et menus sur mesure sur demande.",
  },
  local: {
    kicker: "De l'île",
    heading: "Ingrédients locaux, saveurs insulaires",
    body:
      "Autant que possible, nous nous approvisionnons localement et soutenons la communauté qui rend Camiguin si spéciale. Fruits de mer frais, fruits tropicaux, produits cultivés sur l'île et saveurs régionales inspirent notre carte — un goût authentique de Camiguin, qui soutient fermiers, pêcheurs et fournisseurs locaux.",
  },
  roomService: {
    kicker: "Le room service, réinventé",
    heading: "De votre chambre à votre terrasse",
    body:
      "Certains après-midis, on ne veut plus quitter la terrasse. Scannez le code dans votre chambre pour parcourir les douceurs du café — la pêche du matin, une boisson fraîche, une gourmandise — et commandez depuis votre téléphone. Nous l'apportons là où vous êtes : la piscine, le salon, votre terrasse privée.",
  },
  closing: {
    heading: "Venez affamés. Repartez nourris.",
    body:
      "À Txaleta, nous espérons que chaque repas vous laisse plus qu'un ventre plein — une histoire partagée, un rire retenu, un coucher de soleil savouré, et le sentiment d'avoir pris place à une table où vous êtes vraiment chez vous.",
    signoff: ["Bienvenue à table.", "Bienvenue chez vous."],
  },
};

const de: DiningDict = {
  heading: "Kulinarik im Txaleta",
  subheading: "Eines der unvergesslichsten Restauranterlebnisse auf Camiguin",
  body:
    "Hoch auf einer Klippe über dem Meer bietet das Txaleta ein besonderes kulinarisches Erlebnis: philippinische Herzlichkeit, spanisches Erbe, atemberaubende Ausblicke und mit Sorgfalt zubereitete Küche. Ob Frühstück auf Camiguin, entspanntes Mittagessen mit Aussicht, Cocktails im Mondlicht oder Abendessen unter Sternen — unser Restaurant heißt Hausgäste wie Tagesbesucher willkommen.",
  stories: [
    {
      kicker: "Die Küche",
      heading: "Spanisch-philippinische Küche aus Familientradition",
      body:
        "Unsere Karte feiert die Aromen, die die Geschichte unserer Familie geprägt haben. Inspiriert von philippinischen und spanischen Traditionen servieren wir Gerichte, die zum Teilen gedacht sind — frische Meeresfrüchte, lokale Zutaten, überlieferte Rezepte und Inselaromen, die Erbe und Zuhause ehren. Von Paella und Tapas bis zu geliebten philippinischen Klassikern: Jedes Gericht wird mit Sorgfalt zubereitet und soll Körper wie Seele nähren.",
    },
    {
      kicker: "Der Morgen",
      heading: "Frühstück mit Aussicht auf Camiguin",
      body:
        "Die Morgen im Txaleta kennen keine Eile. Wachen Sie auf zu frisch gebrühtem Kaffee, tropischen Früchten, hausgemachten Spezialitäten und Frühstücksgerichten vor dem Panorama des Ozeans, im sanften Takt des Insellebens. Ob vor einem Abenteuertag oder für einen langsamen Morgen — das Frühstück im Txaleta ist einer der friedlichsten Anfänge, die ein Tag auf Camiguin haben kann.",
    },
    {
      kicker: "Der Abend",
      heading: "Abendessen über dem Meer, zum Sonnenuntergang",
      body:
        "Wenn die Sonne sinkt, bietet unsere Klippenlage eine der schönsten Tafelkulissen Camiguins. Versammeln Sie Familie und Freunde, genießen Sie frische Inselaromen und sehen Sie zu, wie sich der Himmel über dem Meer in Gold, Orange und Rosa verwandelt. Das sind die Momente, an die sich unsere Gäste noch lange nach dem Urlaub erinnern.",
    },
  ],
  family: {
    kicker: "Zusammenkommen",
    heading: "Familienessen, Feste & besondere Anlässe",
    body:
      "Die besten Erinnerungen entstehen oft am Tisch. Ob Geburtstag, Jahrestag, Familientreffen, Hochzeitsfeier oder einfach ein gemeinsames Essen — unser Team gestaltet gern ein Erlebnis, das persönlich und unvergesslich ist. Private Arrangements und individuelle Menüs auf Anfrage.",
  },
  local: {
    kicker: "Von der Insel",
    heading: "Lokale Zutaten, Inselaromen",
    body:
      "Wann immer möglich, kaufen wir lokal ein und unterstützen die Gemeinschaft, die Camiguin so besonders macht. Frische Meeresfrüchte, tropische Früchte, Erzeugnisse der Insel und regionale Aromen prägen unsere Karte — ein echter Geschmack von Camiguin, der Bauern, Fischer und Lieferanten vor Ort stärkt.",
  },
  roomService: {
    kicker: "Zimmerservice, neu gedacht",
    heading: "Vom Zimmer auf Ihre Terrasse",
    body:
      "An manchen Nachmittagen möchte man das Deck einfach nicht verlassen. Scannen Sie den Code in Ihrem Zimmer, stöbern Sie durch die Inselköstlichkeiten des Cafés — der Fang des Morgens, ein kaltes Getränk, etwas Süßes — und bestellen Sie direkt vom Handy. Wir bringen es, wohin Sie sich gesetzt haben: an den Pool, in die Lounge, auf Ihre private Terrasse.",
  },
  closing: {
    heading: "Kommen Sie hungrig. Gehen Sie genährt.",
    body:
      "Wir hoffen, dass jede Mahlzeit im Txaleta mehr hinterlässt als einen vollen Magen — eine geteilte Geschichte, ein Lachen, einen Sonnenuntergang und das Gefühl, an einem Tisch gesessen zu haben, an den man wirklich gehört.",
    signoff: ["Willkommen am Tisch.", "Willkommen zu Hause."],
  },
};

const ja: DiningDict = {
  heading: "Txaletaのダイニング",
  subheading: "カミギンで最も記憶に残る食体験のひとつ",
  body:
    "海を見下ろす崖の上で、Txaletaはフィリピンの温かさ、スペインの伝統、息をのむオーシャンビュー、丁寧に仕上げた料理がひとつになる特別なダイニングをお届けします。カミギンでの朝食、景色とともにゆっくり味わうランチ、月明かりのカクテル、星空の下のディナー。ご宿泊のお客様も、お食事だけのお客様も心からお迎えします。",
  stories: [
    {
      kicker: "キッチン",
      heading: "家族の伝統に根ざしたフィリピン×スペイン料理",
      body:
        "私たちのメニューは、家族の歩みを形づくってきた味の記憶を祝うもの。フィリピンとスペイン、ふたつの食文化に育まれ、分かち合うために生まれた料理をお出しします。新鮮なシーフード、島の食材、伝統のレシピ。パエリアやタパスから、フィリピンの定番料理まで — 一皿一皿を心を込めて、体と心の両方を満たすために。",
    },
    {
      kicker: "朝",
      heading: "カミギンの絶景朝食",
      body:
        "Txaletaの朝は、急ぎません。淹れたてのコーヒー、トロピカルフルーツ、自家製のスペシャリテ。パノラマの海と島のゆるやかなリズムとともに味わう朝食です。冒険の一日の前にも、ただゆっくりしたい朝にも — カミギンの一日のいちばん穏やかな始め方です。",
    },
    {
      kicker: "夜",
      heading: "海を見下ろすサンセットディナー",
      body:
        "日が傾きはじめると、崖の上のこの場所はカミギン随一の美しい食卓になります。家族や友人と集い、島の新鮮な味を楽しみながら、海の上で金色から茜、桃色へと移ろう空を眺めて。休暇が終わったあとも、お客様の心に長く残る時間です。",
    },
  ],
  family: {
    kicker: "集う",
    heading: "ファミリーダイニング・お祝い・特別な日に",
    body:
      "人生の最良の思い出は、食卓のまわりで生まれるもの。誕生日、記念日、家族の再会、ウェディングの集まり、あるいはただの食事でも —私たちのチームが、心に残るパーソナルなひとときをお手伝いします。プライベートダイニングや特別メニューはご要望に応じて。",
  },
  local: {
    kicker: "島の恵み",
    heading: "地元の食材、島の味",
    body:
      "できる限り食材は地元から仕入れ、この島を特別にしているカミギンのコミュニティを支えています。新鮮なシーフード、トロピカルフルーツ、島の農産物、地方の味 — カミギンの本物の味を楽しむことが、島の農家や漁師、生産者を支えることにつながります。",
  },
  roomService: {
    kicker: "新しいルームサービス",
    heading: "お部屋から、テラスへ",
    body:
      "デッキから離れたくない午後もあるでしょう。お部屋のコードをスキャンして、カフェの島の美味をブラウズ — 朝獲れの魚、冷たい飲み物、甘いもの — そのままスマートフォンから注文を。プール、ラウンジ、プライベートテラス、あなたのいる場所へお届けします。",
  },
  closing: {
    heading: "お腹を空かせて来て、満たされて帰る。",
    body:
      "Txaletaの食事が残すものが、満腹だけではありませんように。分かち合った物語、思い出す笑い声、味わった夕日 — そして、本当に自分の居場所だと思える食卓を囲んだという気持ちを。",
    signoff: ["食卓へようこそ。", "おかえりなさい。"],
  },
};

const ko: DiningDict = {
  heading: "Txaleta 다이닝",
  subheading: "카미긴에서 가장 기억에 남는 식사 경험",
  body:
    "바다가 내려다보이는 절벽 위에서 Txaleta는 필리핀의 따뜻함, 스페인의 전통, 숨막히는 오션뷰, 정성껏 준비한 요리가 하나 되는 특별한 다이닝을 선사합니다. 카미긴에서의 아침 식사, 풍경과 함께하는 여유로운 점심, 달빛 칵테일, 별빛 아래의 저녁까지 — 투숙객은 물론 방문 손님도 언제나 환영합니다.",
  stories: [
    {
      kicker: "주방",
      heading: "가족의 전통에 뿌리내린 필리핀-스페인 요리",
      body:
        "우리의 메뉴는 가족의 이야기를 빚어온 맛을 기념합니다. 필리핀과 스페인 두 요리 전통에서 영감을 받아, 함께 나누기 위해 만든 요리를 냅니다. 신선한 해산물, 지역 식재료, 전통 레시피, 그리고 헤리티지와 집을 함께 기리는 섬의 맛. 파에야와 타파스부터 사랑받는 필리핀 대표 요리까지 — 모든 요리는 몸과 마음을 채우기 위해 정성껏 준비됩니다.",
    },
    {
      kicker: "아침",
      heading: "카미긴 전망 조식",
      body:
        "Txaleta의 아침은 서두르지 않습니다. 갓 내린 커피, 열대 과일, 홈메이드 스페셜티, 그리고 파노라마 바다와 섬의 느긋한 리듬과 함께하는 아침 식사. 모험 가득한 하루를 준비하든, 그저 느린 아침을 즐기든 — 카미긴의 하루를 여는 가장 평화로운 방법입니다.",
    },
    {
      kicker: "저녁",
      heading: "바다를 내려다보는 선셋 다이닝",
      body:
        "해가 기울기 시작하면, 절벽 위 이곳은 카미긴에서 가장 아름다운 식탁이 됩니다. 가족, 친구와 둘러앉아 섬의 신선한 맛을 즐기며, 바다 위 하늘이 금빛에서 주황, 분홍으로 물드는 것을 바라보세요. 휴가가 끝난 뒤에도 오래 기억되는 순간들입니다.",
    },
  ],
  family: {
    kicker: "모이다",
    heading: "가족 식사, 축하연 & 특별한 날",
    body:
      "인생 최고의 추억은 식탁에서 만들어집니다. 생일, 기념일, 가족 모임, 웨딩 파티, 혹은 그저 함께하는 한 끼 — 저희 팀이 개인적이고 기억에 남는 식사 경험을 만들어 드립니다. 프라이빗 다이닝과 맞춤 메뉴는 요청 시 준비됩니다.",
  },
  local: {
    kicker: "섬에서 온",
    heading: "지역 재료, 섬의 맛",
    body:
      "가능한 한 재료는 지역에서 조달하며, 이 섬을 특별하게 만드는 카미긴 공동체를 지원합니다. 신선한 해산물, 열대 과일, 섬에서 기른 농산물, 지역의 맛 — 카미긴의 진짜 맛을 즐기는 일이 곧 지역 농부와 어부, 생산자를 돕는 일이 됩니다.",
  },
  roomService: {
    kicker: "룸서비스의 재발견",
    heading: "객실에서, 테라스로",
    body:
      "데크를 떠나고 싶지 않은 오후도 있는 법. 객실의 코드를 스캔해 카페의 섬 별미를 둘러보세요 — 아침에 잡은 생선, 시원한 음료, 달콤한 디저트 — 그리고 휴대폰으로 바로 주문하세요. 수영장, 라운지, 프라이빗 테라스, 당신이 있는 곳으로 가져다드립니다.",
  },
  closing: {
    heading: "배고프게 오셔서, 충만하게 떠나세요.",
    body:
      "Txaleta의 모든 식사가 배부름 이상을 남기길 바랍니다. 나눈 이야기, 기억에 남는 웃음, 함께한 노을 — 그리고 진짜 내 자리라고 느껴지는 식탁에 둘러앉았던 그 마음을.",
    signoff: ["식탁에 오신 것을 환영합니다.", "어서 오세요, 집으로."],
  },
};

const zh: DiningDict = {
  heading: "Txaleta餐厅",
  subheading: "卡米金最难忘的用餐体验之一",
  body:
    "Txaleta餐厅坐落于俯瞰大海的悬崖之上，将菲律宾式的热情、西班牙传承、震撼海景与用心烹制的料理融为一体。无论是卡米金的早餐、伴着海景的悠闲午餐、月光下的鸡尾酒，还是星空下的晚餐——我们既欢迎住店客人，也欢迎慕名而来的食客。",
  stories: [
    {
      kicker: "厨房",
      heading: "植根家族传统的菲西料理",
      body:
        "我们的菜单致敬塑造了这个家族故事的味道。受菲律宾与西班牙两种饮食传统的启发，我们供应为分享而生的菜肴——新鲜海产、本地食材、传统食谱，以及同时致敬传承与家的海岛风味。从海鲜饭、塔帕斯到深受喜爱的菲律宾经典，每一道菜都用心烹制，滋养身体，也滋养心灵。",
    },
    {
      kicker: "清晨",
      heading: "卡米金的海景早餐",
      body:
        "Txaleta的清晨从不匆忙。醒来便有现磨咖啡、热带水果、自家制作的招牌美食，伴着全景海色与海岛生活的轻柔节奏。无论是为一天的冒险做准备，还是只想享受一个慢悠悠的早晨——Txaleta的早餐都是开启卡米金一天最宁静的方式。",
    },
    {
      kicker: "傍晚",
      heading: "俯瞰大海的日落晚餐",
      body:
        "当太阳西沉，悬崖上的这方餐桌便成了卡米金最美的用餐之地。与家人朋友围坐，品尝海岛的新鲜风味，看天空在海面上由金转橙、再染成粉色。这些时刻，客人们在假期结束后仍会久久想起。",
    },
  ],
  family: {
    kicker: "相聚",
    heading: "家庭聚餐、庆典与特别时刻",
    body:
      "人生最美好的回忆，往往诞生在餐桌旁。无论是生日、纪念日、家族团聚、婚礼宴请，还是简单的一顿团圆饭——我们的团队都乐意为您打造一段亲切而难忘的用餐体验。私人用餐安排与定制菜单可应要求提供。",
  },
  local: {
    kicker: "来自海岛",
    heading: "本地食材，海岛风味",
    body:
      "我们尽可能就地取材，支持让这座岛如此特别的卡米金社区。新鲜海产、热带水果、本地农产与地方风味构成了菜单的灵感——让客人品尝地道的卡米金味道，同时支持本地的农民、渔民与供应商。",
  },
  roomService: {
    kicker: "焕新的客房送餐",
    heading: "从您的房间，到您的阳台",
    body:
      "有些午后，你不会想离开露台半步。扫描房间里的二维码，浏览咖啡厅的海岛美味——清晨的渔获、一杯冷饮、一份甜点——用手机直接下单。我们送到您所在的任何地方：泳池边、休息厅，或您的私人阳台。",
  },
  closing: {
    heading: "带着饥肠而来，带着满足而归。",
    body:
      "在Txaleta，我们希望每一餐留给您的不只是饱腹——还有分享过的故事、记得住的笑声、看过的日落，以及围坐在一张真正属于你的餐桌旁的感觉。",
    signoff: ["欢迎入座。", "欢迎回家。"],
  },
};

export const diningContent: Record<Locale, DiningDict> = { en, fr, de, ja, ko, zh };
