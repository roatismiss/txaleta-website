// ============================================================================
// /experiences page chrome + island guide — per-locale.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type ExperiencesPageDict = {
  heroKicker: string;
  heroTitle: string;
  introQuote: string;
  adventuresKicker: string;
  adventuresHeading: string;
  adventuresBody: string;
  adventureLabel: string;
  shoreKicker: string;
  shoreHeading: string;
  beyondKicker: string;
  beyondHeading: string;
  beyondBody: string;
  island: { name: string; note: string }[];
  arrangeRental: string;
  planHeading: string;
  planBody: string;
  planCta: string;
};

const en: ExperiencesPageDict = {
  heroKicker: "Things to Do on Camiguin",
  heroTitle: "Experiences",
  introQuote:
    "The best journeys are the ones that feel personal. Whether you're chasing waterfalls, island hopping, or watching the sunrise with a coffee in hand, we'll help you experience Camiguin in a way that matches your pace.",
  adventuresKicker: "Out on the Island",
  adventuresHeading: "Island Adventures",
  adventuresBody:
    "By banca, by ridgeline, by the slow turn of a coastal road — Camiguin gives up its best on its own terms. Choose how you go.",
  adventureLabel: "Adventure",
  shoreKicker: "The Shore & the Sea",
  shoreHeading: "Days That Begin at the Waterline",
  beyondKicker: "Beyond the Resort",
  beyondHeading: "The Whole Island Is the Day Trip",
  beyondBody:
    "One road, sixty-four kilometres, and more than enough to fill every morning of your stay. We'll help you plan the order.",
  island: [
    {
      name: "White Island",
      note: "A bare crescent of white sand off Mambajao, reached by banca at first light — no trees, no shade, just the sandbar, the reef and the volcano across the water.",
    },
    {
      name: "Mantigue Island",
      note: "A green islet twenty minutes out, ringed by a protected marine sanctuary that shelters resident sea turtles. Snorkel the drop-off where they glide over the coral, then lunch in the shade of the trees.",
    },
    {
      name: "The Sunken Cemetery",
      note: "A single white cross stands over the town the 1871 eruption pulled into the sea — best met by kayak as the sun goes down.",
    },
    {
      name: "Katibawasan Falls",
      note: "Seventy metres of water falling in one clean ribbon into a cold, fern-ringed pool at the foot of the highlands.",
    },
    {
      name: "Cold Springs & Soda Pool",
      note: "Sto. Niño's spring-fed pools run clear and cold; nearby, the Bura pool fizzes with natural soda water you can swim in.",
    },
    {
      name: "Ardent Hot Spring",
      note: "On the flank of Hibok-Hibok, volcano-warmed pools sit in the rainforest — the island's other temperature.",
    },
    {
      name: "Giant Clam Sanctuary",
      note: "Off Cantaan, rows of giant clams the size of armchairs rest in the shallows, close enough to snorkel above.",
    },
    {
      name: "Lanzones",
      note: "Camiguin grows the sweetest lanzones in the country. Come in October and the whole island turns out to celebrate them.",
    },
  ],
  arrangeRental: "Arrange a Rental",
  planHeading: "Let Us Plan Your Days",
  planBody:
    "Tell us how long you're staying and we'll line up the boats, the treks and the quiet corners — and hold the right room for it.",
  planCta: "Plan Your Stay",
};

const fr: ExperiencesPageDict = {
  heroKicker: "Que faire à Camiguin",
  heroTitle: "Expériences",
  introQuote:
    "Les plus beaux voyages sont ceux qui vous ressemblent. Cascades, island hopping ou lever de soleil café à la main — nous vous aidons à vivre Camiguin à votre rythme.",
  adventuresKicker: "Au cœur de l'île",
  adventuresHeading: "Aventures insulaires",
  adventuresBody:
    "En banca, par les crêtes, au fil lent de la route côtière — Camiguin se livre à ses propres conditions. À vous de choisir.",
  adventureLabel: "Aventure",
  shoreKicker: "Le rivage & la mer",
  shoreHeading: "Des journées qui commencent au bord de l'eau",
  beyondKicker: "Au-delà du resort",
  beyondHeading: "L'île entière est votre excursion",
  beyondBody:
    "Une route, soixante-quatre kilomètres, et de quoi remplir chaque matinée de votre séjour. Nous vous aidons à planifier l'ordre.",
  island: [
    {
      name: "White Island",
      note: "Un croissant nu de sable blanc au large de Mambajao, atteint en banca aux premières lueurs — pas d'arbres, pas d'ombre, juste le banc de sable, le récif et le volcan de l'autre côté de l'eau.",
    },
    {
      name: "Île Mantigue",
      note: "Un îlot vert à vingt minutes, ceint d'un sanctuaire marin protégé qui abrite des tortues résidentes. Palmez le long du tombant où elles glissent au-dessus du corail, puis déjeunez à l'ombre des arbres.",
    },
    {
      name: "Le cimetière englouti",
      note: "Une seule croix blanche veille sur le village que l'éruption de 1871 a entraîné dans la mer — à découvrir en kayak, au coucher du soleil.",
    },
    {
      name: "Chutes de Katibawasan",
      note: "Soixante-dix mètres d'eau tombant en un seul ruban net dans un bassin froid cerné de fougères, au pied des hauteurs.",
    },
    {
      name: "Sources froides & piscine de soda",
      note: "Les bassins de source de Sto. Niño coulent clairs et froids ; tout près, la piscine de Bura pétille d'une eau gazeuse naturelle où l'on peut nager.",
    },
    {
      name: "Source chaude d'Ardent",
      note: "Sur le flanc du Hibok-Hibok, des bassins chauffés par le volcan reposent dans la forêt tropicale — l'autre température de l'île.",
    },
    {
      name: "Sanctuaire des bénitiers géants",
      note: "Au large de Cantaan, des rangées de bénitiers géants grands comme des fauteuils reposent dans les hauts-fonds, assez proches pour les survoler en palmes.",
    },
    {
      name: "Lanzones",
      note: "Camiguin cultive les lanzones les plus sucrés du pays. Venez en octobre : toute l'île sort les célébrer.",
    },
  ],
  arrangeRental: "Organiser une location",
  planHeading: "Laissez-nous planifier vos journées",
  planBody:
    "Dites-nous combien de temps vous restez : nous alignons les bateaux, les treks et les coins tranquilles — et nous vous gardons la bonne chambre.",
  planCta: "Planifier votre séjour",
};

const de: ExperiencesPageDict = {
  heroKicker: "Was man auf Camiguin erlebt",
  heroTitle: "Erlebnisse",
  introQuote:
    "Die schönsten Reisen sind die, die sich persönlich anfühlen. Ob Wasserfälle, Island Hopping oder Sonnenaufgang mit Kaffee in der Hand — wir helfen Ihnen, Camiguin in Ihrem Tempo zu erleben.",
  adventuresKicker: "Unterwegs auf der Insel",
  adventuresHeading: "Inselabenteuer",
  adventuresBody:
    "Per Banca, über den Grat, im langsamen Bogen der Küstenstraße — Camiguin zeigt sein Bestes zu eigenen Bedingungen. Sie wählen den Weg.",
  adventureLabel: "Abenteuer",
  shoreKicker: "Ufer & Meer",
  shoreHeading: "Tage, die an der Wasserlinie beginnen",
  beyondKicker: "Jenseits des Resorts",
  beyondHeading: "Die ganze Insel ist der Tagesausflug",
  beyondBody:
    "Eine Straße, vierundsechzig Kilometer — genug für jeden Morgen Ihres Aufenthalts. Wir helfen bei der Reihenfolge.",
  island: [
    {
      name: "White Island",
      note: "Ein blanker Halbmond aus weißem Sand vor Mambajao, im ersten Licht per Banca erreicht — keine Bäume, kein Schatten, nur Sandbank, Riff und der Vulkan über dem Wasser.",
    },
    {
      name: "Mantigue Island",
      note: "Ein grünes Eiland, zwanzig Minuten entfernt, umgeben von einem geschützten Meeresschutzgebiet mit heimischen Meeresschildkröten. Schnorcheln Sie am Drop-off, wo sie über die Korallen gleiten, und essen Sie danach im Schatten der Bäume.",
    },
    {
      name: "Der versunkene Friedhof",
      note: "Ein einzelnes weißes Kreuz wacht über dem Ort, den der Ausbruch von 1871 ins Meer zog — am schönsten per Kajak bei Sonnenuntergang.",
    },
    {
      name: "Katibawasan-Wasserfall",
      note: "Siebzig Meter Wasser, die in einem einzigen klaren Band in ein kaltes, farngesäumtes Becken am Fuß des Hochlands fallen.",
    },
    {
      name: "Kalte Quellen & Soda-Pool",
      note: "Die Quellbecken von Sto. Niño fließen klar und kalt; gleich daneben sprudelt der Bura-Pool mit natürlichem Sodawasser, in dem man schwimmen kann.",
    },
    {
      name: "Ardent-Thermalquelle",
      note: "An der Flanke des Hibok-Hibok liegen vulkangewärmte Becken im Regenwald — die andere Temperatur der Insel.",
    },
    {
      name: "Riesenmuschel-Schutzgebiet",
      note: "Vor Cantaan ruhen Reihen sesselgroßer Riesenmuscheln im flachen Wasser — nah genug, um darüber zu schnorcheln.",
    },
    {
      name: "Lanzones",
      note: "Auf Camiguin wachsen die süßesten Lanzones des Landes. Kommen Sie im Oktober — die ganze Insel feiert sie.",
    },
  ],
  arrangeRental: "Miete anfragen",
  planHeading: "Wir planen Ihre Tage",
  planBody:
    "Sagen Sie uns, wie lange Sie bleiben — wir stellen Boote, Wanderungen und stille Ecken zusammen und halten das passende Zimmer dafür frei.",
  planCta: "Aufenthalt planen",
};

const ja: ExperiencesPageDict = {
  heroKicker: "カミギン島での過ごし方",
  heroTitle: "体験",
  introQuote:
    "最高の旅は、自分らしい旅。滝を追いかけるのも、アイランドホッピングも、コーヒー片手に朝日を眺めるのも — あなたのペースに合うカミギンを、私たちがご案内します。",
  adventuresKicker: "島へ出かける",
  adventuresHeading: "島の冒険",
  adventuresBody:
    "バンカ船で、尾根づたいに、海沿いの道をゆっくりと — カミギンは島のやり方で最良の姿を見せてくれます。行き方は、あなた次第。",
  adventureLabel: "アドベンチャー",
  shoreKicker: "渚と海",
  shoreHeading: "波打ち際から始まる一日",
  beyondKicker: "リゾートの先へ",
  beyondHeading: "島全体が日帰りの旅先",
  beyondBody:
    "一本の道、64キロメートル。滞在中の毎朝を満たしてなお余りある島です。回る順番は、ご一緒に考えましょう。",
  island: [
    {
      name: "ホワイトアイランド",
      note: "マンバハオ沖に浮かぶ、白砂だけの三日月形の砂州。夜明けにバンカ船で渡ります。木も日陰もなく、あるのは砂州とリーフ、そして海の向こうの火山だけ。",
    },
    {
      name: "マンティゲ島",
      note: "沖合20分の緑の小島。周囲は海保護区で、住みついたウミガメたちのすみか。サンゴの上を滑るように泳ぐ姿をドロップオフでシュノーケリングした後は、木陰でランチを。",
    },
    {
      name: "海に沈んだ墓地",
      note: "1871年の噴火が海に引き込んだ町の上に、白い十字架がひとつ。日が沈むころ、カヤックで訪れるのがいちばんです。",
    },
    {
      name: "カティバワサンの滝",
      note: "70メートルの水が一筋のリボンとなって、シダに囲まれた冷たい滝壺へ落ちていきます。高地の麓で。",
    },
    {
      name: "冷泉とソーダプール",
      note: "サント・ニーニョの湧水プールは澄んで冷たく、近くのブラのプールは天然の炭酸水が湧き、そのまま泳げます。",
    },
    {
      name: "アーデント温泉",
      note: "ヒボクヒボク山の中腹、熱帯雨林の中に火山があたためたお湯の段々プール。島のもうひとつの温度です。",
    },
    {
      name: "シャコガイ保護区",
      note: "カンタアン沖の浅瀬には、肘掛け椅子ほどもあるシャコガイがずらり。すぐ上をシュノーケリングで泳げる近さです。",
    },
    {
      name: "ランソネス",
      note: "カミギンは国内でいちばん甘いランソネスの産地。10月に訪れれば、島じゅうがこの果実を祝います。",
    },
  ],
  arrangeRental: "レンタルを手配する",
  planHeading: "一日の計画はお任せください",
  planBody:
    "滞在日数を教えてください。ボートもトレッキングも静かな穴場も手配して、それにふさわしいお部屋をお取りしておきます。",
  planCta: "滞在を計画する",
};

const ko: ExperiencesPageDict = {
  heroKicker: "카미긴에서 즐길 거리",
  heroTitle: "체험",
  introQuote:
    "가장 좋은 여행은 나다운 여행입니다. 폭포를 찾아다니든, 섬을 넘나들든, 커피 한 잔과 함께 일출을 바라보든 — 당신의 속도에 맞는 카미긴을 안내해 드립니다.",
  adventuresKicker: "섬으로 나서다",
  adventuresHeading: "섬에서의 모험",
  adventuresBody:
    "방카 배로, 능선을 따라, 해안 도로를 천천히 — 카미긴은 자신만의 방식으로 최고의 모습을 보여줍니다. 방법은 당신이 고르세요.",
  adventureLabel: "어드벤처",
  shoreKicker: "해변과 바다",
  shoreHeading: "물가에서 시작되는 하루",
  beyondKicker: "리조트 너머",
  beyondHeading: "섬 전체가 당일치기 여행지",
  beyondBody:
    "길 하나, 64킬로미터. 머무는 동안의 모든 아침을 채우고도 남습니다. 도는 순서는 함께 정해요.",
  island: [
    {
      name: "화이트 아일랜드",
      note: "맘바하오 앞바다의 새하얀 초승달 모래톱. 동틀 녘 방카 배로 건너갑니다. 나무도 그늘도 없이, 모래톱과 산호초, 그리고 바다 건너 화산뿐.",
    },
    {
      name: "만티게 섬",
      note: "20분 거리의 초록 섬. 바다거북이 사는 해양 보호구역으로 둘러싸여 있습니다. 산호 위를 미끄러지는 거북을 드롭오프에서 스노클링으로 만나고, 나무 그늘에서 점심을.",
    },
    {
      name: "가라앉은 묘지",
      note: "1871년 분화가 바다로 끌고 간 마을 위에 하얀 십자가 하나. 해질 무렵 카약으로 만나는 것이 가장 아름답습니다.",
    },
    {
      name: "카티바와산 폭포",
      note: "70미터의 물줄기가 한 가닥 리본처럼, 고사리로 둘러싸인 차가운 못으로 떨어집니다. 고원 기슭에서.",
    },
    {
      name: "냉천과 소다 풀",
      note: "산토 니뇨의 샘물 수영장은 맑고 차갑게 흐르고, 근처 부라 풀에서는 헤엄칠 수 있는 천연 탄산수가 보글거립니다.",
    },
    {
      name: "아덴트 온천",
      note: "히복히복 산자락, 열대우림 속에 화산이 데운 온천탕이 자리합니다. 섬의 또 다른 온도.",
    },
    {
      name: "대왕조개 보호구역",
      note: "칸타안 앞바다 얕은 물에 안락의자만 한 대왕조개들이 줄지어 쉬고 있습니다. 바로 위에서 스노클링할 수 있는 가까움.",
    },
    {
      name: "란소네스",
      note: "카미긴은 필리핀에서 가장 달콤한 란소네스의 산지. 10월에 오시면 온 섬이 이 과일을 축하합니다.",
    },
  ],
  arrangeRental: "렌털 신청하기",
  planHeading: "하루하루는 저희가 계획해 드릴게요",
  planBody:
    "며칠 머무시는지 알려주세요. 보트와 트레킹, 조용한 명소까지 줄지어 준비하고, 거기에 어울리는 방을 잡아 두겠습니다.",
  planCta: "여행 계획하기",
};

const zh: ExperiencesPageDict = {
  heroKicker: "卡米金玩乐指南",
  heroTitle: "体验",
  introQuote:
    "最好的旅程，是有你自己样子的旅程。追瀑布、跳岛游，或是端着咖啡看日出——我们帮你以自己的节奏体验卡米金。",
  adventuresKicker: "去岛上",
  adventuresHeading: "海岛探险",
  adventuresBody:
    "乘螃蟹船、走山脊、沿海岸公路慢慢兜风——卡米金以自己的方式呈现最好的一面。怎么走，由你决定。",
  adventureLabel: "探险",
  shoreKicker: "海岸与大海",
  shoreHeading: "从水边开始的日子",
  beyondKicker: "度假村之外",
  beyondHeading: "整座岛都是一日游",
  beyondBody:
    "一条路，六十四公里，足以填满住宿期间的每一个清晨。游览顺序，我们帮你规划。",
  island: [
    {
      name: "白岛",
      note: "曼巴豪外海一弯赤裸的白沙洲，天刚亮乘螃蟹船抵达——没有树，没有荫，只有沙洲、礁石和海对面的火山。",
    },
    {
      name: "曼蒂格岛",
      note: "二十分钟船程外的绿色小岛，被保护性海洋保护区环绕，栖息着常驻海龟。在断崖处浮潜看它们滑过珊瑚，然后在树荫下用午餐。",
    },
    {
      name: "沉没墓园",
      note: "一座白色十字架，伫立在1871年火山喷发拖入海中的小镇之上——最好在日落时分划皮划艇前往。",
    },
    {
      name: "卡蒂巴瓦桑瀑布",
      note: "七十米的水流化作一条利落的缎带，落入高地脚下被蕨类环绕的冰凉水潭。",
    },
    {
      name: "冷泉与苏打泳池",
      note: "圣婴冷泉的泉水清冽见底；不远处的布拉泳池冒着天然苏打水的气泡，可以直接下水畅游。",
    },
    {
      name: "阿登特温泉",
      note: "在希伯克-希伯克山的山腰，火山温热的水池藏在雨林里——这是海岛的另一种温度。",
    },
    {
      name: "大砗磲保护区",
      note: "在坎塔安外海的浅水里，一排排扶手椅大小的大砗磲静静躺着，近得可以在正上方浮潜。",
    },
    {
      name: "兰索果",
      note: "卡米金出产全菲律宾最甜的兰索果。十月前来，整座岛都在为它庆祝。",
    },
  ],
  arrangeRental: "预约租赁",
  planHeading: "让我们为您安排每一天",
  planBody:
    "告诉我们您住几天，我们来安排船只、徒步与静谧的角落——并为此留好最合适的房间。",
  planCta: "规划您的假期",
};

export const experiencesPage: Record<Locale, ExperiencesPageDict> = { en, fr, de, ja, ko, zh };
