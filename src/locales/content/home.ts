// ============================================================================
// Homepage content — per-locale dictionaries.
//
// English is the source of truth (copied verbatim from the components it
// replaced); the other locales are native-register rewrites, not literal
// translations: the poetic voice of the EN copy is re-created in each
// language's own hospitality idiom. Proper nouns (Txaleta, Camiguin, White
// Island, Mambajao, banca, lanzones) stay untranslated by design.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type IntroDict = {
  kicker: string;
  title: string;
  lede: string;
  body1: string;
  body2: string;
  features: { label: string; note: string }[];
  quote: string;
};

export type HomeDict = {
  intro: IntroDict;
};

const en: HomeDict = {
  intro: {
    kicker: "Camiguin · The Island Born of Fire",
    title: "The Quiet the Other Islands Lost",
    lede:
      "While Siargao chases the next wave and Siquijor trades in folklore and moonlight, Camiguin did something quietly radical — it stayed itself.",
    body1:
      "One road loops the whole island. Mornings arrive with church bells from Mambajao and the smell of the sea; afternoons dissolve into spring-fed pools and the shade of century-old acacias. This is the Philippines measured in lanzones harvests and tides, not flight schedules — an island where tradition was never restored for the brochures, because it never left.",
    body2:
      "Txaleta de Camiguin sits where all of it comes closest: the volcano at your back, the Bohol Sea at your feet, the white sandbar of White Island a short banca ride off the shore. Fourteen rooms, an infinity pool that meets the horizon, and the rare luxury of being somewhere the world hasn't crowded yet.",
    features: [
      { label: "Infinity Pool", note: "Meeting the horizon" },
      { label: "Seaview Rooms", note: "Wake to the ocean" },
      { label: "15 min from Airport", note: "Camiguin Airport" },
    ],
    quote: "Some islands you visit. Camiguin, you remember.",
  },
};

const fr: HomeDict = {
  intro: {
    kicker: "Camiguin · L’île née du feu",
    title: "Le calme que les autres îles ont perdu",
    lede:
      "Pendant que Siargao court après la prochaine vague et que Siquijor vit de folklore et de clair de lune, Camiguin a fait quelque chose de discrètement radical — elle est restée elle-même.",
    body1:
      "Une seule route fait le tour de l’île. Les matins arrivent avec les cloches de Mambajao et l’odeur de la mer ; les après-midis se fondent dans des bassins d’eau de source et l’ombre d’acacias centenaires. Ce sont les Philippines mesurées en récoltes de lanzones et en marées, pas en horaires de vol — une île où la tradition n’a jamais été restaurée pour les brochures, parce qu’elle n’est jamais partie.",
    body2:
      "Txaleta de Camiguin se trouve là où tout cela se rejoint : le volcan dans le dos, la mer de Bohol à vos pieds, le banc de sable blanc de White Island à quelques minutes de banca. Quatorze chambres, une piscine à débordement qui rejoint l’horizon, et le luxe rare d’être quelque part que le monde n’a pas encore envahi.",
    features: [
      { label: "Piscine à débordement", note: "Face à l’horizon" },
      { label: "Chambres vue mer", note: "Réveil face à l’océan" },
      { label: "Aéroport à 15 min", note: "Aéroport de Camiguin" },
    ],
    quote: "Certaines îles se visitent. Camiguin, elle, se grave dans la mémoire.",
  },
};

const de: HomeDict = {
  intro: {
    kicker: "Camiguin · Die Insel, aus Feuer geboren",
    title: "Die Stille, die andere Inseln verloren haben",
    lede:
      "Während Siargao der nächsten Welle nachjagt und Siquijor von Folklore und Mondlicht lebt, tat Camiguin etwas leise Radikales — es blieb einfach es selbst.",
    body1:
      "Eine einzige Straße umrundet die ganze Insel. Der Morgen beginnt mit Kirchenglocken aus Mambajao und dem Geruch des Meeres; der Nachmittag löst sich auf in quellgespeiste Becken und den Schatten hundertjähriger Akazien. Das sind die Philippinen, gemessen in Lanzones-Ernten und Gezeiten statt in Flugplänen — eine Insel, auf der Tradition nie für Broschüren restauriert wurde, weil sie nie verschwunden ist.",
    body2:
      "Txaleta de Camiguin liegt dort, wo all das am nächsten kommt: der Vulkan im Rücken, die Bohol-See zu Füßen, die weiße Sandbank von White Island eine kurze Bootsfahrt vor der Küste. Vierzehn Zimmer, ein Infinity-Pool, der mit dem Horizont verschmilzt — und der seltene Luxus eines Ortes, den die Welt noch nicht überlaufen hat.",
    features: [
      { label: "Infinity-Pool", note: "Verschmilzt mit dem Horizont" },
      { label: "Zimmer mit Meerblick", note: "Aufwachen am Ozean" },
      { label: "15 Min. vom Flughafen", note: "Flughafen Camiguin" },
    ],
    quote: "Manche Inseln besucht man. An Camiguin erinnert man sich.",
  },
};

const ja: HomeDict = {
  intro: {
    kicker: "カミギン · 火から生まれた島",
    title: "ほかの島が失った静けさ",
    lede:
      "シアルガオが次の波を追いかけ、シキホルが伝承と月明かりで旅人を集めるあいだ、カミギンは静かに、ただ自分自身であり続けました。",
    body1:
      "島をめぐる道は一本だけ。朝はマンバハオの教会の鐘と潮の香りとともに訪れ、午後は湧き水のプールと樹齢百年のアカシアの木陰に溶けていきます。ここにあるのは、フライトの時刻表ではなく、ランソネスの収穫と潮の満ち引きで時を刻むフィリピン。パンフレットのために伝統を復元する必要のない島 — 伝統は一度も途切れていないのだから。",
    body2:
      "Txaleta de Camiguinは、そのすべてが最も近づく場所に建っています。背後には火山、足元にはボホール海、白い砂州ホワイトアイランドへはバンカ船でほんのひととき。14の客室、水平線と溶け合うインフィニティプール、そして世界にまだ見つかっていない場所にいるという贅沢。",
    features: [
      { label: "インフィニティプール", note: "水平線と溶け合う" },
      { label: "オーシャンビュー客室", note: "海とともに目覚める" },
      { label: "空港から15分", note: "カミギン空港" },
    ],
    quote: "訪れるだけの島もある。カミギンは、心に残る島。",
  },
};

const ko: HomeDict = {
  intro: {
    kicker: "카미긴 · 불에서 태어난 섬",
    title: "다른 섬들이 잃어버린 고요",
    lede:
      "시아르가오가 다음 파도를 쫓고 시키호르가 전설과 달빛으로 여행자를 부르는 동안, 카미긴은 조용히, 그러나 단호하게 — 자기 자신으로 남았습니다.",
    body1:
      "섬을 도는 길은 단 하나. 아침은 맘바하오 성당의 종소리와 바다 내음으로 시작되고, 오후는 샘물 수영장과 백 년 된 아카시아 그늘 속으로 녹아듭니다. 비행 시간표가 아니라 란소네스 수확과 밀물 썰물로 시간을 재는 필리핀 — 전통을 브로슈어를 위해 복원할 필요가 없는 섬입니다. 한 번도 사라진 적이 없으니까요.",
    body2:
      "Txaleta de Camiguin은 그 모든 것이 가장 가까워지는 곳에 있습니다. 등 뒤에는 화산, 발아래에는 보홀 바다, 하얀 모래톱 화이트 아일랜드까지는 방카 배로 잠깐. 열네 개의 객실, 수평선과 맞닿는 인피니티 풀, 그리고 아직 세상에 붐비지 않는 곳에 머무는 드문 사치.",
    features: [
      { label: "인피니티 풀", note: "수평선과 맞닿은" },
      { label: "오션뷰 객실", note: "바다와 함께 눈뜨는 아침" },
      { label: "공항에서 15분", note: "카미긴 공항" },
    ],
    quote: "어떤 섬은 다녀가는 곳. 카미긴은 기억에 남는 곳.",
  },
};

const zh: HomeDict = {
  intro: {
    kicker: "卡米金 · 火中诞生的岛屿",
    title: "别的海岛失去的宁静",
    lede:
      "当锡亚高追逐下一道浪、锡基霍尔以传说与月光招徕旅人时，卡米金做了一件安静却彻底的事——它始终是它自己。",
    body1:
      "一条环岛公路绕行全岛。清晨伴着曼巴豪教堂的钟声与海的气息到来，午后消融在山泉泳池与百年金合欢的树荫里。这里的菲律宾以兰索果的收成与潮汐计时，而非航班时刻表——在这座岛上，传统从不需要为宣传册而复原，因为它从未离开。",
    body2:
      "Txaleta de Camiguin正坐落在这一切最近的地方：身后是火山，脚下是保和海，乘螃蟹船片刻即达白岛的白色沙洲。十四间客房，一座与地平线相接的无边泳池，以及一种难得的奢侈——住在一个尚未被世界挤满的地方。",
    features: [
      { label: "无边泳池", note: "与地平线相接" },
      { label: "海景客房", note: "在海边醒来" },
      { label: "距机场15分钟", note: "卡米金机场" },
    ],
    quote: "有些岛，去过便罢。卡米金，会留在记忆里。",
  },
};

export const homeContent: Record<Locale, HomeDict> = { en, fr, de, ja, ko, zh };
