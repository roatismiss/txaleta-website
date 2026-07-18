// ============================================================================
// Homepage section headers & CTAs — per-locale. Native-register rewrites of
// the EN source copy (EN verbatim from components/site.ts). Item-level content
// (rooms from Cloudbeds, dish lists, testimonial quotes) stays in its source
// language by design — real guest quotes are never translated.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type SectionsDict = {
  accommodation: { kicker: string; title: string; intro: string; cta: string };
  dining: { kicker: string; heading: string; body: string; cta: string };
  experiences: { kicker: string; title: string; intro: string; cta: string };
  watersports: {
    kicker: string;
    title: string;
    intro: string;
    rides: { title: string; description: string }[];
    ctaBook: string;
    ctaAll: string;
  };
  seamless: {
    kicker: string;
    heading: string;
    body: string;
    pillars: { title: string; body: string }[];
    cta: string;
  };
  gallery: { kicker: string; title: string; cta: string };
  testimonials: { kicker: string; title: string };
};

const en: SectionsDict = {
  accommodation: {
    kicker: "The Fourteen Rooms",
    title: "Where You Wake on Camiguin",
    intro:
      "Fourteen rooms sit between the volcano and the sea, close enough to hear both, and no two open onto the same view. Some face the Bohol Sea, others the garden or the cliff's edge. Choose the one that matches how you want to meet the morning.",
    cta: "Check Availability",
  },
  dining: {
    kicker: "Filipino Heart, Spanish Soul",
    heading: "Dining at Txaleta",
    body:
      "Perched on a scenic clifftop overlooking the sea, Txaleta offers a unique dining experience that brings together Filipino warmth, Spanish heritage, breathtaking ocean views, and thoughtfully prepared cuisine. Whether you're looking for breakfast in Camiguin, a leisurely lunch with a view, moonlight cocktails, or dinner under the stars, our restaurant welcomes both resort guests and walk-in visitors seeking great food and unforgettable island hospitality.",
    cta: "Explore Our Cuisine",
  },
  experiences: {
    kicker: "Things to Do",
    title: "Four Ways to Meet the Island",
    intro:
      "Camiguin gives up its best on its own terms — by speedboat, by ridgeline, by the slow turn of a coastal road. Choose how you go.",
    cta: "Explore All Experiences",
  },
  watersports: {
    kicker: "On the Water",
    title: "Jet Ski & Speedboat",
    intro:
      "The Bohol Sea is yours to open up. Carve across it on a jet ski, or let our private speedboat run you out to White Island and the quiet coves beyond.",
    rides: [
      {
        title: "Jet Ski",
        description: "Open the throttle across the Bohol Sea, the volcano at your shoulder.",
      },
      {
        title: "Private Speedboat",
        description: "Our own boat runs you out to White Island, hidden coves and the open blue.",
      },
    ],
    ctaBook: "Book Now",
    ctaAll: "All Experiences",
  },
  seamless: {
    kicker: "Effortless by Design",
    heading: "Your Stay, Already Taken Care Of",
    body:
      "From the moment you book to the last morning on your terrace, the details run quietly in the background — so the only thing left to do is be on the island.",
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
    cta: "See It in Action",
  },
  gallery: { kicker: "Between Volcano and Sea", title: "The Long Look", cta: "View the Full Gallery" },
  testimonials: { kicker: "Voices from Puting Balas", title: "What Stayed With Them" },
};

const fr: SectionsDict = {
  accommodation: {
    kicker: "Les quatorze chambres",
    title: "Là où vous vous réveillez à Camiguin",
    intro:
      "Quatorze chambres entre le volcan et la mer, assez proches pour entendre les deux — et aucune n'ouvre sur la même vue. Certaines regardent la mer de Bohol, d'autres le jardin ou le bord de la falaise. Choisissez celle qui ressemble à votre façon d'accueillir le matin.",
    cta: "Voir les disponibilités",
  },
  dining: {
    kicker: "Cœur philippin, âme espagnole",
    heading: "La table de Txaleta",
    body:
      "Perché sur une falaise face à la mer, Txaleta propose une expérience culinaire unique où se rencontrent la chaleur philippine, l'héritage espagnol, des vues spectaculaires sur l'océan et une cuisine préparée avec soin. Petit-déjeuner à Camiguin, déjeuner tranquille avec vue, cocktails au clair de lune ou dîner sous les étoiles : notre restaurant accueille les hôtes du resort comme les visiteurs de passage, en quête de bonne cuisine et d'une hospitalité insulaire inoubliable.",
    cta: "Découvrir notre cuisine",
  },
  experiences: {
    kicker: "À vivre",
    title: "Quatre façons de rencontrer l'île",
    intro:
      "Camiguin se livre à ses propres conditions — en speedboat, par les crêtes, au rythme lent d'une route côtière. À vous de choisir.",
    cta: "Toutes les expériences",
  },
  watersports: {
    kicker: "Sur l'eau",
    title: "Jet-ski & speedboat",
    intro:
      "La mer de Bohol vous appartient. Filez en jet-ski, ou laissez notre speedboat privé vous emmener vers White Island et les criques tranquilles au-delà.",
    rides: [
      {
        title: "Jet-ski",
        description: "Pleins gaz sur la mer de Bohol, le volcan à l'épaule.",
      },
      {
        title: "Speedboat privé",
        description: "Notre bateau vous emmène vers White Island, des criques cachées et le grand bleu.",
      },
    ],
    ctaBook: "Réserver",
    ctaAll: "Toutes les expériences",
  },
  seamless: {
    kicker: "La simplicité pensée pour vous",
    heading: "Votre séjour, déjà pris en charge",
    body:
      "De la réservation au dernier matin sur votre terrasse, les détails s'occupent d'eux-mêmes en coulisses — il ne vous reste qu'à être sur l'île.",
    pillars: [
      {
        title: "Réservez en temps réel",
        body: "Disponibilités en direct, chambre confirmée à l'instant même — l'e-mail arrive avant que vous ne fermiez l'onglet. Plus de jours d'attente.",
      },
      {
        title: "Un concierge dans votre langue",
        body: "Demandez tout, à toute heure. Notre concierge répond dans votre langue — la meilleure marée pour White Island, un dîner tardif à l'arrivée, un bateau pour le matin.",
      },
      {
        title: "Commandez sur votre terrasse",
        body: "Parcourez la carte du café et commandez depuis votre téléphone, livré là où vous êtes — la piscine, le salon, votre terrasse privée.",
      },
    ],
    cta: "Voir comment ça marche",
  },
  gallery: { kicker: "Entre volcan et mer", title: "Le long regard", cta: "Voir toute la galerie" },
  testimonials: { kicker: "Voix de Puting Balas", title: "Ce qu'ils ont gardé en mémoire" },
};

const de: SectionsDict = {
  accommodation: {
    kicker: "Die vierzehn Zimmer",
    title: "Wo Sie auf Camiguin aufwachen",
    intro:
      "Vierzehn Zimmer liegen zwischen Vulkan und Meer, nah genug, um beide zu hören — und keines öffnet sich auf denselben Blick. Manche schauen auf die Bohol-See, andere in den Garten oder an die Klippenkante. Wählen Sie das Zimmer, das zu Ihrem Morgen passt.",
    cta: "Verfügbarkeit prüfen",
  },
  dining: {
    kicker: "Philippinisches Herz, spanische Seele",
    heading: "Kulinarik im Txaleta",
    body:
      "Hoch auf einer Klippe über dem Meer bietet das Txaleta ein besonderes kulinarisches Erlebnis: philippinische Herzlichkeit, spanisches Erbe, atemberaubende Ausblicke und mit Sorgfalt zubereitete Küche. Ob Frühstück auf Camiguin, ein entspanntes Mittagessen mit Aussicht, Cocktails im Mondlicht oder ein Abendessen unter Sternen — unser Restaurant heißt Hausgäste wie Tagesbesucher willkommen, die gutes Essen und echte Inselgastfreundschaft suchen.",
    cta: "Unsere Küche entdecken",
  },
  experiences: {
    kicker: "Erleben",
    title: "Vier Wege, die Insel kennenzulernen",
    intro:
      "Camiguin zeigt sein Bestes zu eigenen Bedingungen — per Speedboot, über den Bergkamm, im langsamen Bogen einer Küstenstraße. Sie wählen den Weg.",
    cta: "Alle Erlebnisse entdecken",
  },
  watersports: {
    kicker: "Auf dem Wasser",
    title: "Jetski & Speedboot",
    intro:
      "Die Bohol-See gehört Ihnen. Ziehen Sie mit dem Jetski Ihre Bahn, oder lassen Sie sich mit unserem privaten Speedboot nach White Island und zu den stillen Buchten dahinter bringen.",
    rides: [
      {
        title: "Jetski",
        description: "Vollgas über die Bohol-See, den Vulkan an der Schulter.",
      },
      {
        title: "Privates Speedboot",
        description: "Unser eigenes Boot bringt Sie nach White Island, zu versteckten Buchten und hinaus ins offene Blau.",
      },
    ],
    ctaBook: "Jetzt buchen",
    ctaAll: "Alle Erlebnisse",
  },
  seamless: {
    kicker: "Mühelos durchdacht",
    heading: "Ihr Aufenthalt — bereits geregelt",
    body:
      "Von der Buchung bis zum letzten Morgen auf Ihrer Terrasse laufen die Details leise im Hintergrund — Ihnen bleibt nur eines: auf der Insel sein.",
    pillars: [
      {
        title: "In Echtzeit buchen",
        body: "Live-Verfügbarkeit, Ihr Zimmer im Moment der Wahl bestätigt — die E-Mail ist im Posteingang, bevor Sie den Tab schließen. Kein tagelanges Warten.",
      },
      {
        title: "Ein Concierge in Ihrer Sprache",
        body: "Fragen Sie alles, zu jeder Stunde. Unser Concierge antwortet in Ihrer Sprache — die beste Tide für White Island, ein spätes Abendessen bei Ankunft, ein Boot für den Morgen.",
      },
      {
        title: "Bestellen auf die Terrasse",
        body: "Stöbern Sie in der Café-Karte und bestellen Sie vom Handy — gebracht, wohin Sie sich gesetzt haben: an den Pool, in die Lounge, auf Ihre private Terrasse.",
      },
    ],
    cta: "So funktioniert es",
  },
  gallery: { kicker: "Zwischen Vulkan und Meer", title: "Der lange Blick", cta: "Zur ganzen Galerie" },
  testimonials: { kicker: "Stimmen aus Puting Balas", title: "Was ihnen geblieben ist" },
};

const ja: SectionsDict = {
  accommodation: {
    kicker: "14の客室",
    title: "カミギンで迎える朝",
    intro:
      "火山と海のあいだに佇む14の客室。どちらの気配も届く近さで、同じ景色を望む部屋はふたつとありません。ボホール海を望む部屋、庭や崖の縁に面した部屋。朝の迎え方に合わせて、お選びください。",
    cta: "空室を確認する",
  },
  dining: {
    kicker: "フィリピンの心、スペインの魂",
    heading: "Txaletaのダイニング",
    body:
      "海を見下ろす崖の上で、Txaletaはフィリピンの温かさ、スペインの伝統、息をのむようなオーシャンビュー、そして丁寧に仕上げた料理がひとつになる、特別なダイニング体験をお届けします。カミギンでの朝食、景色とともにゆっくり味わうランチ、月明かりのカクテル、星空の下のディナー。ご宿泊のお客様も、お食事だけのお客様も、心からお迎えします。",
    cta: "料理を見る",
  },
  experiences: {
    kicker: "アクティビティ",
    title: "島と出会う、4つの方法",
    intro:
      "カミギンは、島のやり方で最良の姿を見せてくれます。スピードボートで、尾根づたいに、海沿いの道をゆっくりと。行き方は、あなた次第。",
    cta: "すべての体験を見る",
  },
  watersports: {
    kicker: "海の上で",
    title: "ジェットスキー＆スピードボート",
    intro:
      "ボホール海を思いのままに。ジェットスキーで波を切るもよし、プライベートスピードボートでホワイトアイランドと静かな入り江へ向かうもよし。",
    rides: [
      {
        title: "ジェットスキー",
        description: "火山を横目に、ボホール海をフルスロットルで。",
      },
      {
        title: "プライベートスピードボート",
        description: "専用ボートでホワイトアイランドへ。隠れた入り江と、どこまでも続く青へ。",
      },
    ],
    ctaBook: "予約する",
    ctaAll: "すべての体験",
  },
  seamless: {
    kicker: "さりげない心配り",
    heading: "滞在のすべてが、すでに整っています",
    body:
      "ご予約の瞬間からテラスで迎える最後の朝まで、細やかなことは静かに背後で進みます。あなたがすることは、ただ島にいること。",
    pillars: [
      {
        title: "リアルタイム予約",
        body: "空室は常に最新。選んだ瞬間にお部屋が確定し、タブを閉じる前に確認メールが届きます。返事を何日も待つ必要はありません。",
      },
      {
        title: "あなたの言語のコンシェルジュ",
        body: "何でも、何時でも。コンシェルジュがあなたの言語でお答えします。ホワイトアイランドに最適な潮、到着日の遅めのディナー、翌朝のボートの手配まで。",
      },
      {
        title: "テラスへお届け",
        body: "スマートフォンからカフェのメニューを選んで注文。プール、ラウンジ、プライベートテラス — あなたのいる場所へお持ちします。",
      },
    ],
    cta: "実際の流れを見る",
  },
  gallery: { kicker: "火山と海のあいだ", title: "ながめる時間", cta: "ギャラリーをすべて見る" },
  testimonials: { kicker: "プティン・バラスからの声", title: "心に残ったもの" },
};

const ko: SectionsDict = {
  accommodation: {
    kicker: "열네 개의 객실",
    title: "카미긴에서 맞는 아침",
    intro:
      "화산과 바다 사이, 두 소리가 모두 들리는 곳에 열네 개의 객실이 있습니다. 같은 풍경을 마주한 방은 하나도 없습니다. 보홀 바다를 향한 방, 정원이나 절벽 끝을 향한 방. 아침을 맞이하고 싶은 방식대로 고르세요.",
    cta: "예약 가능 여부 확인",
  },
  dining: {
    kicker: "필리핀의 마음, 스페인의 영혼",
    heading: "Txaleta 다이닝",
    body:
      "바다가 내려다보이는 절벽 위에서 Txaleta는 필리핀의 따뜻함, 스페인의 전통, 숨막히는 오션뷰, 그리고 정성껏 준비한 요리가 하나 되는 특별한 다이닝을 선사합니다. 카미긴에서의 아침 식사, 풍경과 함께하는 여유로운 점심, 달빛 칵테일, 별빛 아래의 저녁까지. 리조트 투숙객은 물론 방문 손님도 언제나 환영합니다.",
    cta: "요리 둘러보기",
  },
  experiences: {
    kicker: "즐길 거리",
    title: "섬을 만나는 네 가지 방법",
    intro:
      "카미긴은 자신만의 방식으로 최고의 모습을 보여줍니다. 스피드보트로, 능선을 따라, 해안 도로를 천천히 돌며. 방법은 당신이 고르세요.",
    cta: "모든 체험 보기",
  },
  watersports: {
    kicker: "바다 위에서",
    title: "제트스키 & 스피드보트",
    intro:
      "보홀 바다가 당신의 것입니다. 제트스키로 바다를 가르거나, 프라이빗 스피드보트로 화이트 아일랜드와 그 너머 고요한 만까지 다녀오세요.",
    rides: [
      {
        title: "제트스키",
        description: "어깨 너머 화산을 두고, 보홀 바다를 전속력으로.",
      },
      {
        title: "프라이빗 스피드보트",
        description: "전용 보트로 화이트 아일랜드, 숨은 만, 그리고 탁 트인 푸른 바다까지.",
      },
    ],
    ctaBook: "예약하기",
    ctaAll: "모든 체험",
  },
  seamless: {
    kicker: "보이지 않는 세심함",
    heading: "당신의 여행, 이미 준비되어 있습니다",
    body:
      "예약하는 순간부터 테라스에서 맞는 마지막 아침까지, 모든 디테일은 조용히 뒤에서 움직입니다. 당신이 할 일은 단 하나, 섬에 있는 것.",
    pillars: [
      {
        title: "실시간 예약",
        body: "실시간 객실 현황, 선택하는 순간 확정되는 예약 — 탭을 닫기 전에 확인 메일이 도착합니다. 며칠씩 답을 기다릴 필요가 없습니다.",
      },
      {
        title: "당신의 언어로 응대하는 컨시어지",
        body: "무엇이든, 언제든 물어보세요. 컨시어지가 당신의 언어로 답합니다. 화이트 아일랜드에 좋은 물때, 도착 날 늦은 저녁 식사, 다음 날 아침 보트까지.",
      },
      {
        title: "테라스로 주문",
        body: "휴대폰으로 카페 메뉴를 보고 주문하세요. 수영장, 라운지, 프라이빗 테라스 — 당신이 있는 곳으로 가져다드립니다.",
      },
    ],
    cta: "실제로 보기",
  },
  gallery: { kicker: "화산과 바다 사이", title: "오래 바라보는 풍경", cta: "갤러리 전체 보기" },
  testimonials: { kicker: "푸팅 발라스에서 온 목소리", title: "마음에 남은 것들" },
};

const zh: SectionsDict = {
  accommodation: {
    kicker: "十四间客房",
    title: "在卡米金醒来的地方",
    intro:
      "十四间客房坐落在火山与大海之间，近得能同时听见两者的声音——而且没有两间面向同样的风景。有的面朝保和海，有的面向花园或悬崖边缘。选一间与你迎接清晨的方式最相配的。",
    cta: "查询空房",
  },
  dining: {
    kicker: "菲律宾之心，西班牙之魂",
    heading: "Txaleta餐厅",
    body:
      "Txaleta餐厅坐落于俯瞰大海的悬崖之上，将菲律宾式的热情、西班牙传承、震撼的海景与用心烹制的料理融为一体。无论是卡米金的早餐、伴着海景的悠闲午餐、月光下的鸡尾酒，还是星空下的晚餐——我们既欢迎住店客人，也欢迎慕名而来的食客，共享美食与难忘的海岛待客之道。",
    cta: "探索我们的美食",
  },
  experiences: {
    kicker: "玩乐体验",
    title: "认识这座岛的四种方式",
    intro:
      "卡米金以自己的方式呈现它最好的一面——乘快艇、走山脊、沿着海岸公路慢慢兜风。怎么走，由你决定。",
    cta: "探索全部体验",
  },
  watersports: {
    kicker: "在海上",
    title: "摩托艇与快艇",
    intro:
      "保和海任你驰骋。驾摩托艇破浪而行，或乘我们的私人快艇前往白岛，以及更远处宁静的海湾。",
    rides: [
      {
        title: "水上摩托",
        description: "火山在肩侧，油门全开，驰骋保和海。",
      },
      {
        title: "私人快艇",
        description: "专属快艇带你前往白岛、隐秘海湾与辽阔的蔚蓝。",
      },
    ],
    ctaBook: "立即预订",
    ctaAll: "全部体验",
  },
  seamless: {
    kicker: "润物无声的周到",
    heading: "您的假期，早已安排妥当",
    body:
      "从预订那一刻到阳台上的最后一个清晨，一切细节都在幕后静静运转——您只需要做一件事：享受海岛。",
    pillars: [
      {
        title: "实时预订",
        body: "实时房态，选定即确认——确认邮件在您关闭页面前就已送达。无需等待数日回复。",
      },
      {
        title: "说您语言的礼宾服务",
        body: "任何问题，任何时间。礼宾用您的语言作答——去白岛的最佳潮汐、抵达当晚的晚餐、清晨出海的船。",
      },
      {
        title: "点餐送到阳台",
        body: "用手机浏览咖啡厅菜单并下单，送到您所在的任何地方——泳池边、休息厅，或您的私人阳台。",
      },
    ],
    cta: "看看实际体验",
  },
  gallery: { kicker: "火山与海之间", title: "久久凝望", cta: "查看完整图库" },
  testimonials: { kicker: "来自Puting Balas的声音", title: "留在他们心里的" },
};

export const homeSections: Record<Locale, SectionsDict> = { en, fr, de, ja, ko, zh };
