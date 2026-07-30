// ============================================================================
// /dining/menu page chrome — per-locale. The menu book itself (dish names,
// section titles) stays in the original: a physical à-la-carte menu convention
// — dish names like paella, gambas, sisig are not translated.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type MenuPageDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  servedOn: string; // trailing clause after subtitle
  backToDining: string;
  ctaKicker: string;
  ctaHeading: string;
  ctaBody: string;
  reserveTable: string;
  roomService: string;
  orReach: string;
  coverIntro: string;
  openMenu: string;
  swipeHint: string;
};

const en: MenuPageDict = {
  eyebrow: "The Café · À la Carte",
  title: "Our Menu",
  subtitle: "Filipino Heart, Spanish Soul",
  servedOn: "served on a clifftop above the Bohol Sea.",
  backToDining: "Back to Dining",
  ctaKicker: "A Table by the Sea",
  ctaHeading: "Reserve a Table or Order In",
  ctaBody:
    "The café welcomes resort guests and walk-in visitors alike — breakfast by the infinity pool, long lunches, moonlight cocktails and dinners that last past dark. Message us to reserve a table or order to your terrace.",
  reserveTable: "Reserve a Table",
  roomService: "Room Service",
  orReach: "Or reach us directly",
  coverIntro: "Dishes made to be shared, on a clifftop above the Bohol Sea — paella and tapas, beloved Filipino plates, slow mornings and moonlight cocktails. Turn the page to explore the table.",
  openMenu: "Open the Menu",
  swipeHint: "Use the arrows, swipe, or tap a section to turn the page.",
};

const fr: MenuPageDict = {
  eyebrow: "Le Café · À la carte",
  title: "Notre carte",
  subtitle: "Cœur philippin, âme espagnole",
  servedOn: "servie sur une falaise au-dessus de la mer de Bohol.",
  backToDining: "Retour à la restauration",
  ctaKicker: "Une table face à la mer",
  ctaHeading: "Réservez une table ou commandez",
  ctaBody:
    "Le café accueille les hôtes du resort comme les visiteurs de passage — petit-déjeuner au bord de la piscine à débordement, longs déjeuners, cocktails au clair de lune et dîners qui s'étirent dans la nuit. Écrivez-nous pour réserver une table ou commander sur votre terrasse.",
  reserveTable: "Réserver une table",
  roomService: "Service en chambre",
  orReach: "Ou contactez-nous directement",
  coverIntro: "Des plats faits pour être partagés, sur une falaise au-dessus de la mer de Bohol — paella et tapas, grands classiques philippins, matins tranquilles et cocktails au clair de lune. Tournez la page pour explorer la carte.",
  openMenu: "Ouvrir la carte",
  swipeHint: "Utilisez les flèches, faites glisser ou touchez une section pour tourner la page.",
};

const de: MenuPageDict = {
  eyebrow: "Das Café · À la carte",
  title: "Unsere Karte",
  subtitle: "Philippinisches Herz, spanische Seele",
  servedOn: "serviert auf einer Klippe über der Bohol-See.",
  backToDining: "Zurück zur Kulinarik",
  ctaKicker: "Ein Tisch am Meer",
  ctaHeading: "Tisch reservieren oder bestellen",
  ctaBody:
    "Das Café heißt Hausgäste wie Tagesbesucher willkommen — Frühstück am Infinity-Pool, lange Mittagessen, Cocktails im Mondlicht und Abendessen, die bis in die Nacht dauern. Schreiben Sie uns, um einen Tisch zu reservieren oder auf Ihre Terrasse zu bestellen.",
  reserveTable: "Tisch reservieren",
  roomService: "Zimmerservice",
  orReach: "Oder erreichen Sie uns direkt",
  coverIntro: "Gerichte zum Teilen, auf einer Klippe über der Bohol-See — Paella und Tapas, geliebte philippinische Klassiker, langsame Morgen und Cocktails im Mondlicht. Blättern Sie weiter und entdecken Sie die Tafel.",
  openMenu: "Karte öffnen",
  swipeHint: "Nutzen Sie die Pfeile, wischen Sie oder tippen Sie auf einen Abschnitt zum Umblättern.",
};

const ja: MenuPageDict = {
  eyebrow: "ザ・カフェ · アラカルト",
  title: "メニュー",
  subtitle: "フィリピンの心、スペインの魂",
  servedOn: "ボホール海を見下ろす崖の上で。",
  backToDining: "ダイニングに戻る",
  ctaKicker: "海辺のテーブル",
  ctaHeading: "テーブル予約、またはお部屋へ",
  ctaBody:
    "カフェはご宿泊のお客様も、お食事だけのお客様も歓迎します。インフィニティプールのそばの朝食、ゆったりしたランチ、月明かりのカクテル、夜更けまで続くディナー。テーブルのご予約やテラスへのご注文はメッセージでどうぞ。",
  reserveTable: "テーブルを予約",
  roomService: "ルームサービス",
  orReach: "または直接ご連絡ください",
  coverIntro: "ボホール海を見下ろす崖の上で、分かち合うための料理を。パエリアとタパス、愛されるフィリピンの一皿、ゆったりした朝、月明かりのカクテル。ページをめくって、食卓へどうぞ。",
  openMenu: "メニューを開く",
  swipeHint: "矢印、スワイプ、またはセクションをタップしてページをめくれます。",
};

const ko: MenuPageDict = {
  eyebrow: "더 카페 · 아 라 카르트",
  title: "메뉴",
  subtitle: "필리핀의 마음, 스페인의 영혼",
  servedOn: "보홀 바다를 내려다보는 절벽 위에서.",
  backToDining: "다이닝으로 돌아가기",
  ctaKicker: "바닷가의 테이블",
  ctaHeading: "테이블 예약 또는 룸으로 주문",
  ctaBody:
    "카페는 투숙객과 방문 손님 모두를 환영합니다. 인피니티 풀 옆에서의 아침, 여유로운 점심, 달빛 칵테일, 밤늦게까지 이어지는 저녁까지. 테이블 예약이나 테라스 주문은 메시지로 알려주세요.",
  reserveTable: "테이블 예약",
  roomService: "룸서비스",
  orReach: "또는 직접 연락 주세요",
  coverIntro: "보홀 바다를 내려다보는 절벽 위에서, 함께 나누기 위한 요리를. 파에야와 타파스, 사랑받는 필리핀 요리, 여유로운 아침과 달빛 칵테일. 페이지를 넘겨 식탁을 둘러보세요.",
  openMenu: "메뉴 열기",
  swipeHint: "화살표, 스와이프, 또는 섹션을 탭하여 페이지를 넘기세요.",
};

const zh: MenuPageDict = {
  eyebrow: "咖啡厅 · 单点菜单",
  title: "我们的菜单",
  subtitle: "菲律宾之心，西班牙之魂",
  servedOn: "在俯瞰保和海的悬崖之上供应。",
  backToDining: "返回餐饮",
  ctaKicker: "面海的餐桌",
  ctaHeading: "预订餐桌或客房送餐",
  ctaBody:
    "咖啡厅欢迎住店客人与慕名而来的访客——无边泳池畔的早餐、悠长的午餐、月光下的鸡尾酒，以及延续至深夜的晚餐。欢迎留言预订餐桌，或点餐送至您的阳台。",
  reserveTable: "预订餐桌",
  roomService: "客房送餐",
  orReach: "或直接联系我们",
  coverIntro: "在俯瞰保和海的悬崖之上，为分享而生的菜肴——海鲜饭与塔帕斯、深受喜爱的菲律宾佳肴、悠闲的清晨与月光下的鸡尾酒。翻页一探这桌美味。",
  openMenu: "打开菜单",
  swipeHint: "使用箭头、滑动或点按某一区域即可翻页。",
};

export const menuPage: Record<Locale, MenuPageDict> = { en, fr, de, ja, ko, zh };
