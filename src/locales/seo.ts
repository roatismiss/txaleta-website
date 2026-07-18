// ============================================================================
// Localized SEO metadata — page titles + meta descriptions per locale.
//
// These are NOT literal translations of the English meta: each locale uses the
// query terms its speakers actually type (카미긴 리조트, Camiguin Unterkunft,
// カミギン島 ホテル, 卡米金岛 度假村, hôtel Camiguin) worked naturally into
// hospitality-register copy. Brand name stays in Latin script everywhere —
// that is how it appears on booking platforms and maps.
//
// Keyed by the UNPREFIXED route. English pages keep the meta defined in the
// page files themselves (source of truth unchanged); lookups here return
// undefined for "en" so callers fall back to it.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type PageSeo = { title: string; description: string; keywords?: string[] };

type SeoMap = Record<string, PageSeo>;

const fr: SeoMap = {
  "/": {
    title: "Txaleta de Camiguin — Resort boutique face à la mer, Camiguin",
    description:
      "Resort boutique sur une falaise de l’île de Camiguin, Philippines : chambres vue mer, piscine à débordement, glamping et hospitalité familiale, à 15 minutes de l’aéroport.",
    keywords: [
      "hôtel Camiguin",
      "resort Camiguin",
      "Camiguin Philippines hébergement",
      "piscine à débordement Philippines",
      "glamping Philippines",
    ],
  },
  "/accommodation": {
    title: "Hébergement — chambres vue mer & glamping",
    description:
      "Suites face à la mer, chambres familiales et glamping vue océan sur l’île de Camiguin. Réservez votre séjour à Txaleta de Camiguin.",
  },
  "/dining": {
    title: "Restauration — cuisine philippine-espagnole face à l’océan",
    description:
      "Saveurs philippines et héritage espagnol, produits de l’île et vue sur la mer de Bohol : la table de Txaleta de Camiguin.",
  },
  "/dining/menu": {
    title: "Menu du restaurant",
    description:
      "Le menu de Txaleta de Camiguin : spécialités philippines, plats d’inspiration espagnole, fruits de mer frais de l’île.",
  },
  "/experiences": {
    title: "Expériences — White Island, volcan, cascades",
    description:
      "White Island, volcan Hibok-Hibok, cascades et sources chaudes : expériences personnalisées organisées depuis le resort, avec guides locaux.",
  },
  "/about": {
    title: "À propos — un resort familial sur Camiguin",
    description:
      "L’histoire de Txaleta de Camiguin : une maison familiale devenue resort boutique, entre héritage hispano-philippin et hospitalité sincère.",
  },
  "/community": {
    title: "Communauté — engagement local à Camiguin",
    description:
      "Notre engagement pour l’île : emplois locaux, artisanat, tourisme responsable et vie communautaire à Camiguin.",
  },
  "/gallery": {
    title: "Galerie — photos du resort et de l’île",
    description:
      "Photos de Txaleta de Camiguin : chambres vue mer, piscine à débordement, couchers de soleil et paysages de l’île de Camiguin.",
  },
  "/guides": {
    title: "Guides de voyage Camiguin",
    description:
      "Comment venir, itinéraires, meilleures périodes : nos guides pratiques pour préparer votre voyage à Camiguin, écrits sur place.",
  },
  "/book": {
    title: "Réserver votre séjour",
    description:
      "Réservez directement à Txaleta de Camiguin — meilleurs tarifs, confirmation immédiate, paiement sécurisé.",
  },
};

const de: SeoMap = {
  "/": {
    title: "Txaleta de Camiguin — Boutique-Resort mit Meerblick, Camiguin",
    description:
      "Boutique-Resort auf einer Klippe der Insel Camiguin, Philippinen: Zimmer mit Meerblick, Infinity-Pool, Glamping und familiäre Gastfreundschaft, 15 Minuten vom Flughafen.",
    keywords: [
      "Camiguin Hotel",
      "Camiguin Resort",
      "Camiguin Unterkunft",
      "Philippinen Infinity-Pool Resort",
      "Glamping Philippinen",
    ],
  },
  "/accommodation": {
    title: "Unterkünfte — Meerblick-Zimmer & Glamping",
    description:
      "Suiten mit Meerblick, Familienzimmer und Glamping am Ozean auf der Insel Camiguin. Jetzt Ihren Aufenthalt im Txaleta de Camiguin buchen.",
  },
  "/dining": {
    title: "Kulinarik — philippinisch-spanische Küche am Meer",
    description:
      "Philippinische Aromen, spanisches Erbe und frische Zutaten der Insel — mit Blick auf die Bohol-See im Txaleta de Camiguin.",
  },
  "/dining/menu": {
    title: "Speisekarte",
    description:
      "Die Speisekarte des Txaleta de Camiguin: philippinische Spezialitäten, spanisch inspirierte Gerichte, fangfrische Meeresfrüchte.",
  },
  "/experiences": {
    title: "Erlebnisse — White Island, Vulkan, Wasserfälle",
    description:
      "White Island, Vulkan Hibok-Hibok, Wasserfälle und heiße Quellen: persönlich organisierte Touren mit lokalen Guides, direkt vom Resort.",
  },
  "/about": {
    title: "Über uns — ein Familienresort auf Camiguin",
    description:
      "Die Geschichte von Txaleta de Camiguin: ein Familienhaus, das zum Boutique-Resort wurde — spanisch-philippinisches Erbe und echte Gastfreundschaft.",
  },
  "/community": {
    title: "Community — lokales Engagement auf Camiguin",
    description:
      "Unser Beitrag zur Insel: lokale Arbeitsplätze, Handwerk, verantwortungsvoller Tourismus und Gemeinschaft auf Camiguin.",
  },
  "/gallery": {
    title: "Galerie — Fotos vom Resort und der Insel",
    description:
      "Bilder aus dem Txaleta de Camiguin: Meerblick-Zimmer, Infinity-Pool, Sonnenuntergänge und Landschaften der Insel Camiguin.",
  },
  "/guides": {
    title: "Camiguin Reiseführer",
    description:
      "Anreise, Routen, beste Reisezeit: unsere vor Ort geschriebenen Reiseführer für Ihren Camiguin-Urlaub.",
  },
  "/book": {
    title: "Jetzt buchen",
    description:
      "Direkt im Txaleta de Camiguin buchen — Bestpreis, sofortige Bestätigung, sichere Zahlung.",
  },
};

const ja: SeoMap = {
  "/": {
    title: "Txaleta de Camiguin — カミギン島のオーシャンビュー・ブティックリゾート",
    description:
      "フィリピン・カミギン島の崖の上に佇むブティックリゾート。オーシャンビューの客室、インフィニティプール、グランピング。カミギン空港から車で15分。",
    keywords: [
      "カミギン島 ホテル",
      "カミギン リゾート",
      "カミギン島 宿泊",
      "フィリピン インフィニティプール",
      "フィリピン グランピング",
    ],
  },
  "/accommodation": {
    title: "客室 — オーシャンビュールーム＆グランピング",
    description:
      "海を望むスイート、ファミリールーム、オーシャンビューのグランピング。カミギン島のTxaleta de Camiguinでご予約を。",
  },
  "/dining": {
    title: "ダイニング — 海を望むフィリピン×スペイン料理",
    description:
      "フィリピンの味とスペインの伝統、島の新鮮な食材。ボホール海を眺めながらのお食事をどうぞ。",
  },
  "/dining/menu": {
    title: "レストランメニュー",
    description:
      "Txaleta de Camiguinのメニュー：フィリピン料理、スペイン風の一皿、島で獲れた新鮮なシーフード。",
  },
  "/experiences": {
    title: "体験 — ホワイトアイランド・火山・滝めぐり",
    description:
      "ホワイトアイランド、ヒボクヒボク火山、滝と温泉。地元ガイドと巡る、リゾート発のプライベートツアー。",
  },
  "/about": {
    title: "リゾートについて — カミギン島の家族経営リゾート",
    description:
      "家族の家から生まれたブティックリゾート、Txaleta de Camiguinの物語。スペインとフィリピンの伝統、心からのおもてなし。",
  },
  "/community": {
    title: "コミュニティ — カミギン島への貢献",
    description:
      "島とともに歩む取り組み：地元雇用、手仕事、責任ある観光、カミギンのコミュニティ支援。",
  },
  "/gallery": {
    title: "ギャラリー — リゾートと島の写真",
    description:
      "オーシャンビューの客室、インフィニティプール、夕日、カミギン島の風景。写真でめぐるTxaleta de Camiguin。",
  },
  "/guides": {
    title: "カミギン島 旅行ガイド",
    description:
      "行き方、モデルコース、ベストシーズン。現地在住スタッフが書いたカミギン島旅行の実用ガイド。",
  },
  "/book": {
    title: "ご予約",
    description:
      "Txaleta de Camiguin公式予約 — ベストレート保証、即時確認、安全なお支払い。",
  },
};

const ko: SeoMap = {
  "/": {
    title: "Txaleta de Camiguin — 카미긴 오션뷰 부티크 리조트",
    description:
      "필리핀 카미긴 섬 절벽 위 부티크 리조트. 오션뷰 객실, 인피니티 풀, 글램핑, 가족적인 환대. 카미긴 공항에서 차로 15분.",
    keywords: [
      "카미긴 리조트",
      "카미긴 호텔",
      "카미긴 숙소",
      "필리핀 인피니티 풀 리조트",
      "필리핀 글램핑",
    ],
  },
  "/accommodation": {
    title: "객실 — 오션뷰 룸 & 글램핑",
    description:
      "바다가 보이는 스위트, 패밀리룸, 오션뷰 글램핑. 카미긴 섬 Txaleta de Camiguin에서 예약하세요.",
  },
  "/dining": {
    title: "다이닝 — 바다를 마주한 필리핀·스페인 요리",
    description:
      "필리핀의 맛과 스페인의 전통, 섬의 신선한 재료. 보홀 바다를 바라보며 즐기는 식사.",
  },
  "/dining/menu": {
    title: "레스토랑 메뉴",
    description:
      "Txaleta de Camiguin 메뉴: 필리핀 대표 요리, 스페인풍 요리, 섬에서 잡은 신선한 해산물.",
  },
  "/experiences": {
    title: "체험 — 화이트 아일랜드·화산·폭포 투어",
    description:
      "화이트 아일랜드, 히복히복 화산, 폭포와 온천. 현지 가이드와 함께하는 리조트 맞춤 투어.",
  },
  "/about": {
    title: "소개 — 카미긴의 가족 경영 리조트",
    description:
      "가족의 집에서 시작된 부티크 리조트, Txaleta de Camiguin의 이야기. 스페인-필리핀 헤리티지와 진심 어린 환대.",
  },
  "/community": {
    title: "커뮤니티 — 카미긴과 함께하는 리조트",
    description:
      "섬과 함께 성장합니다: 지역 고용, 수공예, 책임 있는 관광, 카미긴 커뮤니티 지원.",
  },
  "/gallery": {
    title: "갤러리 — 리조트와 섬의 사진",
    description:
      "오션뷰 객실, 인피니티 풀, 노을, 카미긴 섬의 풍경. 사진으로 만나는 Txaleta de Camiguin.",
  },
  "/guides": {
    title: "카미긴 여행 가이드",
    description:
      "가는 방법, 추천 일정, 여행 시기. 현지에서 직접 쓴 카미긴 여행 실전 가이드.",
  },
  "/book": {
    title: "예약하기",
    description:
      "Txaleta de Camiguin 공식 예약 — 최저가 보장, 즉시 확정, 안전한 결제.",
  },
};

const zh: SeoMap = {
  "/": {
    title: "Txaleta de Camiguin — 卡米金岛海景精品度假村",
    description:
      "菲律宾卡米金岛悬崖上的精品度假村：海景客房、无边泳池、豪华露营与家庭式贴心服务，距卡米金机场仅15分钟车程。",
    keywords: [
      "卡米金岛 度假村",
      "卡米金 酒店",
      "卡米金岛 住宿",
      "菲律宾 无边泳池 度假村",
      "菲律宾 豪华露营",
    ],
  },
  "/accommodation": {
    title: "客房 — 海景客房与豪华露营",
    description:
      "海景套房、家庭房与面海豪华露营，尽在卡米金岛Txaleta de Camiguin，立即预订您的假期。",
  },
  "/dining": {
    title: "餐饮 — 面朝大海的菲西融合料理",
    description:
      "菲律宾风味与西班牙传统的融合，选用海岛新鲜食材，一边用餐一边欣赏保和海景致。",
  },
  "/dining/menu": {
    title: "餐厅菜单",
    description:
      "Txaleta de Camiguin菜单：菲律宾特色菜、西班牙风味料理与当日新鲜海鲜。",
  },
  "/experiences": {
    title: "体验 — 白岛、火山与瀑布之旅",
    description:
      "白岛、希伯克-希伯克火山、瀑布与温泉：由本地向导带领、从度假村出发的定制行程。",
  },
  "/about": {
    title: "关于我们 — 卡米金岛的家族度假村",
    description:
      "Txaleta de Camiguin的故事：从家族宅邸到精品度假村，西班牙-菲律宾传承与真挚待客之道。",
  },
  "/community": {
    title: "社区 — 与卡米金岛共同成长",
    description:
      "我们对海岛的承诺：本地就业、手工艺、负责任旅游与卡米金社区支持。",
  },
  "/gallery": {
    title: "图库 — 度假村与海岛风光",
    description:
      "海景客房、无边泳池、日落与卡米金岛风光——用照片认识Txaleta de Camiguin。",
  },
  "/guides": {
    title: "卡米金岛旅行攻略",
    description:
      "交通方式、行程推荐、最佳旅行季节：由驻岛团队撰写的卡米金实用旅行攻略。",
  },
  "/book": {
    title: "立即预订",
    description:
      "官方直订Txaleta de Camiguin — 最优房价、即时确认、安全支付。",
  },
};

const maps: Partial<Record<Locale, SeoMap>> = { fr, de, ja, ko, zh };

/** Localized meta for a page, or undefined (caller falls back to English). */
export function getPageSeo(locale: Locale, path: string): PageSeo | undefined {
  return maps[locale]?.[path];
}
