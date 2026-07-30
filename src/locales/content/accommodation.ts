// ============================================================================
// /accommodation page chrome — per-locale. Room names/descriptions come from
// live Cloudbeds data and stay in the source language by design.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type AccommodationDict = {
  heroKicker: string;
  heroTitle: string;
  intro: string;
  checkAvailability: string;
  sleepsUpTo: string; // "{n}" placeholder
  inclusionsKicker: string;
  inclusionsHeading: string;
  inclusionsIntro: string;
  inclusions: { label: string; note: string }[];
  ctaHeading: string;
  ctaBody: string;
  orCall: string;
};

const en: AccommodationDict = {
  heroKicker: "Where You Wake on Camiguin",
  heroTitle: "Accommodation",
  intro:
    "Fourteen rooms sit between the volcano and the sea, close enough to hear both, and no two open onto the same view. Choose the one that matches how you want to meet the morning.",
  checkAvailability: "Check Availability",
  sleepsUpTo: "Sleeps up to {n}",
  inclusionsKicker: "The Same For Every Room",
  inclusionsHeading: "Included in Every Stay",
  inclusionsIntro:
    "Whichever room you choose, the morning starts the same way: breakfast by the water, the pool to yourself, and hosts who know the island.",
  inclusions: [
    { label: "Daily Breakfast", note: "Served by the water as the boats head out for White Island." },
    { label: "Infinity Pool & Beach", note: "Open from sunrise, looking straight onto the Bohol Sea." },
    { label: "Fast Free WiFi", note: "Throughout the rooms and the common areas." },
    { label: "Air Conditioning", note: "In every suite and garden room, with natural airflow in the tents." },
    { label: "Free Parking & Transfers", note: "Airport pick-up arranged — fifteen minutes from Camiguin Airport." },
    { label: "Beachfront Café", note: "Fresh Filipino cooking and easy international plates, all day." },
    { label: "Daily Housekeeping", note: "Rooms turned down while you are out on the island." },
    { label: "Warm Filipino Hosts", note: "On hand to line up boats, treks and the quiet corners." },
  ],
  ctaHeading: "Find Your Room",
  ctaBody:
    "Tell us your dates and how many you are, and we'll hold the right room — and help you plan the days around it.",
  orCall: "Or call us directly",
};

const fr: AccommodationDict = {
  heroKicker: "Là où vous vous réveillez à Camiguin",
  heroTitle: "Hébergement",
  intro:
    "Quatorze chambres entre le volcan et la mer, assez proches pour entendre les deux — et aucune n'ouvre sur la même vue. Choisissez celle qui ressemble à votre façon d'accueillir le matin.",
  checkAvailability: "Voir les disponibilités",
  sleepsUpTo: "Jusqu'à {n} personnes",
  inclusionsKicker: "Identique pour chaque chambre",
  inclusionsHeading: "Compris dans chaque séjour",
  inclusionsIntro:
    "Quelle que soit la chambre, le matin commence de la même façon : petit-déjeuner au bord de l'eau, la piscine rien que pour vous, et des hôtes qui connaissent l'île.",
  inclusions: [
    { label: "Petit-déjeuner quotidien", note: "Servi au bord de l'eau, à l'heure où les bateaux partent pour White Island." },
    { label: "Piscine à débordement & plage", note: "Ouvertes dès le lever du soleil, face à la mer de Bohol." },
    { label: "Wi-Fi rapide et gratuit", note: "Dans les chambres et les espaces communs." },
    { label: "Climatisation", note: "Dans chaque suite et chambre jardin, avec ventilation naturelle dans les tentes." },
    { label: "Parking & transferts gratuits", note: "Accueil aéroport organisé — à quinze minutes de l'aéroport de Camiguin." },
    { label: "Café en bord de mer", note: "Cuisine philippine fraîche et plats internationaux, toute la journée." },
    { label: "Ménage quotidien", note: "Chambres préparées pendant que vous explorez l'île." },
    { label: "Hôtes philippins chaleureux", note: "Prêts à organiser bateaux, treks et coins tranquilles." },
  ],
  ctaHeading: "Trouvez votre chambre",
  ctaBody:
    "Dites-nous vos dates et combien vous êtes : nous gardons la bonne chambre — et vous aidons à organiser les journées autour.",
  orCall: "Ou appelez-nous directement",
};

const de: AccommodationDict = {
  heroKicker: "Wo Sie auf Camiguin aufwachen",
  heroTitle: "Unterkünfte",
  intro:
    "Vierzehn Zimmer liegen zwischen Vulkan und Meer, nah genug, um beide zu hören — und keines öffnet sich auf denselben Blick. Wählen Sie das Zimmer, das zu Ihrem Morgen passt.",
  checkAvailability: "Verfügbarkeit prüfen",
  sleepsUpTo: "Bis zu {n} Personen",
  inclusionsKicker: "Für jedes Zimmer gleich",
  inclusionsHeading: "In jedem Aufenthalt enthalten",
  inclusionsIntro:
    "Welches Zimmer Sie auch wählen, der Morgen beginnt gleich: Frühstück am Wasser, der Pool für Sie allein und Gastgeber, die die Insel kennen.",
  inclusions: [
    { label: "Tägliches Frühstück", note: "Am Wasser serviert, wenn die Boote nach White Island aufbrechen." },
    { label: "Infinity-Pool & Strand", note: "Ab Sonnenaufgang geöffnet, direkt zur Bohol-See." },
    { label: "Schnelles kostenloses WLAN", note: "In allen Zimmern und Gemeinschaftsbereichen." },
    { label: "Klimaanlage", note: "In jeder Suite und jedem Gartenzimmer, mit natürlicher Belüftung in den Zelten." },
    { label: "Kostenlose Parkplätze & Transfers", note: "Flughafenabholung organisiert — fünfzehn Minuten vom Flughafen Camiguin." },
    { label: "Café am Strand", note: "Frische philippinische Küche und leichte internationale Gerichte, den ganzen Tag." },
    { label: "Tägliche Zimmerreinigung", note: "Zimmer werden gerichtet, während Sie auf der Insel unterwegs sind." },
    { label: "Herzliche philippinische Gastgeber", note: "Zur Stelle für Boote, Touren und stille Ecken." },
  ],
  ctaHeading: "Finden Sie Ihr Zimmer",
  ctaBody:
    "Sagen Sie uns Ihre Daten und wie viele Sie sind — wir halten das passende Zimmer frei und helfen, die Tage darum herum zu planen.",
  orCall: "Oder rufen Sie uns direkt an",
};

const ja: AccommodationDict = {
  heroKicker: "カミギンで迎える朝",
  heroTitle: "客室",
  intro:
    "火山と海のあいだに佇む14の客室。どちらの気配も届く近さで、同じ景色を望む部屋はふたつとありません。朝の迎え方に合わせて、お選びください。",
  checkAvailability: "空室を確認",
  sleepsUpTo: "最大{n}名",
  inclusionsKicker: "どの客室にも共通",
  inclusionsHeading: "すべての滞在に含まれるもの",
  inclusionsIntro:
    "どのお部屋を選んでも、朝の始まりは同じ。水辺の朝食、独り占めのプール、そして島を知り尽くしたホスト。",
  inclusions: [
    { label: "毎日の朝食", note: "ボートがホワイトアイランドへ発つ頃、水辺でお召し上がりください。" },
    { label: "インフィニティプール＆ビーチ", note: "日の出から、ボホール海をまっすぐ望んで。" },
    { label: "高速無料Wi-Fi", note: "客室と共用エリアの全域で。" },
    { label: "エアコン", note: "全スイートとガーデンルームに完備、テントは自然の風通しで。" },
    { label: "無料駐車場＆送迎", note: "空港送迎を手配 — カミギン空港から15分。" },
    { label: "ビーチフロントカフェ", note: "新鮮なフィリピン料理と気軽なインターナショナルメニューを終日。" },
    { label: "毎日のハウスキーピング", note: "島へお出かけのあいだに、お部屋を整えます。" },
    { label: "温かなフィリピンのホスト", note: "ボート、トレッキング、静かな穴場の手配までお任せください。" },
  ],
  ctaHeading: "お部屋を見つける",
  ctaBody:
    "ご滞在日と人数をお知らせください。ふさわしいお部屋をお取りし、それに合わせた日々の計画もお手伝いします。",
  orCall: "またはお電話で直接どうぞ",
};

const ko: AccommodationDict = {
  heroKicker: "카미긴에서 맞는 아침",
  heroTitle: "객실",
  intro:
    "화산과 바다 사이, 두 소리가 모두 들리는 곳에 열네 개의 객실이 있습니다. 같은 풍경을 마주한 방은 하나도 없습니다. 아침을 맞이하고 싶은 방식대로 고르세요.",
  checkAvailability: "예약 가능 여부 확인",
  sleepsUpTo: "최대 {n}인",
  inclusionsKicker: "모든 객실에 동일하게",
  inclusionsHeading: "모든 숙박에 포함",
  inclusionsIntro:
    "어떤 방을 고르셔도 아침의 시작은 같습니다. 물가에서의 조식, 오롯이 나만의 수영장, 그리고 섬을 아는 호스트.",
  inclusions: [
    { label: "매일 조식", note: "보트가 화이트 아일랜드로 떠날 무렵, 물가에서 즐기세요." },
    { label: "인피니티 풀 & 해변", note: "일출부터, 보홀 바다를 정면으로 마주하며." },
    { label: "빠른 무료 Wi-Fi", note: "객실과 공용 공간 전역에서." },
    { label: "에어컨", note: "모든 스위트와 가든룸에 완비, 텐트는 자연 통풍으로." },
    { label: "무료 주차 & 픽업", note: "공항 픽업 준비 — 카미긴 공항에서 15분." },
    { label: "해변 카페", note: "신선한 필리핀 요리와 가벼운 인터내셔널 메뉴를 하루 종일." },
    { label: "매일 하우스키핑", note: "섬으로 나가 계신 동안 방을 정돈해 드립니다." },
    { label: "따뜻한 필리핀 호스트", note: "보트, 트레킹, 조용한 명소까지 손수 준비해 드립니다." },
  ],
  ctaHeading: "당신의 방을 찾으세요",
  ctaBody:
    "머무실 날짜와 인원을 알려주세요. 꼭 맞는 방을 잡아 두고, 그에 맞춰 하루하루도 함께 계획해 드립니다.",
  orCall: "또는 직접 전화 주세요",
};

const zh: AccommodationDict = {
  heroKicker: "在卡米金醒来的地方",
  heroTitle: "客房",
  intro:
    "十四间客房坐落在火山与大海之间，近得能同时听见两者的声音——而且没有两间面向同样的风景。选一间与你迎接清晨的方式最相配的。",
  checkAvailability: "查询空房",
  sleepsUpTo: "最多可住{n}人",
  inclusionsKicker: "每间客房都一样",
  inclusionsHeading: "每次入住均含",
  inclusionsIntro:
    "无论选择哪间客房，清晨的开始都一样：水边的早餐、专属于你的泳池，以及熟悉海岛的主人。",
  inclusions: [
    { label: "每日早餐", note: "在船只驶向白岛之时，于水边享用。" },
    { label: "无边泳池与海滩", note: "日出即开放，正对保和海。" },
    { label: "高速免费WiFi", note: "覆盖客房与所有公共区域。" },
    { label: "空调", note: "每间套房与花园房均配备，帐篷则采用自然通风。" },
    { label: "免费停车与接送", note: "可安排机场接机——距卡米金机场十五分钟。" },
    { label: "海滨咖啡厅", note: "新鲜的菲律宾料理与简单的国际菜式，全天供应。" },
    { label: "每日客房清洁", note: "在您出岛游玩时整理房间。" },
    { label: "热情的菲律宾主人", note: "随时为您安排船只、徒步与静谧的角落。" },
  ],
  ctaHeading: "找到您的客房",
  ctaBody:
    "告诉我们您的日期与人数，我们会为您留好合适的房间——并帮您围绕它规划每一天。",
  orCall: "或直接致电我们",
};

export const accommodationContent: Record<Locale, AccommodationDict> = { en, fr, de, ja, ko, zh };
