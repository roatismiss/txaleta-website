// ============================================================================
// Community page content — per-locale. Partner and artisan names (Natalia Sea
// Glass, Scuba de Oro, Mantigue…) stay in the original.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type CommunityDict = {
  hero: { kicker: string; heading: string };
  quote: string;
  intro: string[];
  stories: { kicker: string; heading: string; body: string[] }[];
  promise: { heading: string; points: string[] };
  artisans: { kicker: string; heading: string; items: { name: string; body: string[] }[] };
  mountain: { kicker: string; heading: string; body: string[] };
  sea: { kicker: string; heading: string; items: { name: string; body: string[] }[] };
  partners: { kicker: string; heading: string; body: string; list: string[] };
  vision: { kicker: string; heading: string; body: string; points: string[] };
  sharedJourney: { heading: string; body: string[]; closing: string };
};

const en: CommunityDict = {
  hero: { kicker: "Community, Culture & Island Stewardship", heading: "The Heart of Camiguin" },
  quote:
    "Luxury is not only found in beautiful places, but in the people who make those places unforgettable.",
  intro: [
    "A stay at Txaleta de Camiguin is a way into something larger than a destination.",
    "This island was shaped by hand — by fishermen and boatmen, guides and farmers, artists and families who have looked after Camiguin for generations. They are its storytellers and its keepers. When we built Txaleta, we didn't want to sit apart from that. We wanted to belong to it.",
    "So we made a decision early on: tourism here should give back more than it takes. Through local hiring, real partnerships, and a lighter footprint on the land and sea, we want every stay to leave Camiguin a little better than we found it.",
  ],
  stories: [
    {
      kicker: "People First",
      heading: "We Hire From the Community",
      body: [
        "We hire from the community first — and we mean it.",
        "Some of the people who welcome you today came to us with no hospitality background at all. Our best cook started as a helper on our construction site; we saw how he worked, trained him, and gave him a kitchen. We've hired housewives stepping into their first job, and a senior woman whom others might have passed over.",
        "What they brought wasn't a résumé. It was character — and that, we've learned, you can build a resort on.",
      ],
    },
    {
      kicker: "Growing Together",
      heading: "We Hire for Potential, Not Polish",
      body: [
        "Most of our team began their journey without formal training. What they had instead was integrity, kindness, and the willingness to learn — and we've built everything else around that.",
        "Through hands-on mentoring and patient, day-by-day coaching, our people gain real skills, real confidence, and a real path forward. The goal was never just to give someone a job. It's to give them a future.",
        "As Txaleta grows, we want our team to grow with it — today's helpers becoming tomorrow's supervisors, chefs, and managers, all from right here on the island.",
      ],
    },
  ],
  promise: {
    heading: "Our Promise",
    points: ["We hire for character.", "We train for excellence.", "We grow together."],
  },
  artisans: {
    kicker: "Celebrating Local Artisans",
    heading: "The Hands Behind Camiguin",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "Twenty years ago, sea glass jewelry quietly faded from Camiguin. It came back through the hands of one artist who revived the craft — and the work speaks for itself.",
          "We're proud to feature Natalia Sea Glass, who turns glass weathered smooth by decades of tides into jewelry and keepsakes you can carry home. Each piece is a fragment of Camiguin's own shoreline — proof that the most sustainable luxury is the kind the ocean already made.",
        ],
      },
      {
        name: "Local Artists",
        body: [
          "Walk through Txaleta — especially the new wing — and you'll find the island on the walls.",
          "Paintings, photography, handcrafted décor: works by Camiguin artists who capture the place better than any brochure could. We surround our guests with their work to put island talent in front of new eyes, and to let the people who live here tell their own story.",
        ],
      },
    ],
  },
  mountain: {
    kicker: "Walking With the Mountain",
    heading: "Mt. Hibok-Hibok Guides",
    body: [
      "Guests ask us almost every week how to reach the summit. We always answer the same way: with the people who know it best.",
      "Our local mountain guides carry generations of knowledge about Camiguin's volcanic slopes — its forests, its wildlife, its moods — and they make every trek both safe and unforgettable. By sending climbers their way, we help keep both the mountain and a way of life intact.",
    ],
  },
  sea: {
    kicker: "Guardians of the Sea",
    heading: "Camiguin Below the Surface",
    items: [
      {
        name: "Mantigue Island",
        body: [
          "Just offshore, clear water opens onto living coral and sea turtles gliding through the shallows.",
          "We send guests out with local Mantigue guides who know how to share this place without disturbing it — keeping a respectful distance from the wildlife and helping protect one of the island's most treasured sanctuaries.",
        ],
      },
      {
        name: "Scuba Diving with Scuba de Oro",
        body: [
          "There's a whole other Camiguin below the surface: volcanic reefs, healthy coral, and marine life that makes this one of the Philippines' quietest diving secrets.",
          "We work hand in hand with Scuba de Oro — they look after our guests underwater, and we send divers their way. It's a real partnership, the kind where two local businesses lift each other instead of competing, and where every dive is run safely and with respect for the reef.",
        ],
      },
    ],
  },
  partners: {
    kicker: "Supporting Local Businesses",
    heading: "Every Stay Sends Opportunity Outward",
    body:
      "Each stay at Txaleta reaches family businesses and small operators across the island. Together, these are how tourism becomes something the whole of Camiguin can feel.",
    list: [
      "Local artists",
      "Natalia Sea Glass",
      "Mt. Hibok-Hibok mountain guides",
      "Dive masters & dive operators",
      "Boat operators",
      "Tour guides",
      "Transportation providers",
      "Family-owned businesses",
      "Local musicians & performers",
      "Local wellness practitioners",
    ],
  },
  vision: {
    kicker: "Our Vision",
    heading: "Hospitality Should Leave Every Place Better Than It Found It",
    body: "That's still the whole of it. As we grow, our commitment stays the same:",
    points: [
      "Create meaningful work",
      "Invest in local talent",
      "Celebrate Camiguin's artists and entrepreneurs",
      "Practice tourism that gives back",
      "Protect the island's natural beauty",
      "Share the real Camiguin with guests from around the world",
    ],
  },
  sharedJourney: {
    heading: "A Shared Journey",
    body: [
      "When you choose Txaleta, you step into a story that outlasts your holiday.",
      "You help a local family find steady work. You put money into the hands of an artist and a small business owner. You make room for the next island kid to imagine a career in hospitality. And you help protect the culture, the coast, and the mountain that make this place what it is.",
    ],
    closing: "Thank you for being part of our journey.",
  },
};

const fr: CommunityDict = {
  hero: { kicker: "Communauté, culture & protection de l'île", heading: "Le cœur de Camiguin" },
  quote:
    "Le luxe ne se trouve pas seulement dans les beaux endroits, mais dans les personnes qui les rendent inoubliables.",
  intro: [
    "Un séjour à Txaleta de Camiguin, c'est l'entrée dans quelque chose de plus grand qu'une destination.",
    "Cette île a été façonnée à la main — par des pêcheurs et des bateliers, des guides et des fermiers, des artistes et des familles qui veillent sur Camiguin depuis des générations. Ils en sont les conteurs et les gardiens. En construisant Txaleta, nous ne voulions pas rester à l'écart de tout cela. Nous voulions en faire partie.",
    "Alors nous avons pris une décision très tôt : ici, le tourisme doit rendre plus qu'il ne prend. Par l'embauche locale, de vrais partenariats et une empreinte plus légère sur la terre et la mer, nous voulons que chaque séjour laisse Camiguin un peu plus belle que nous ne l'avons trouvée.",
  ],
  stories: [
    {
      kicker: "L'humain d'abord",
      heading: "Nous recrutons dans la communauté",
      body: [
        "Nous recrutons d'abord dans la communauté — et ce ne sont pas des mots.",
        "Certaines des personnes qui vous accueillent aujourd'hui sont arrivées sans aucune expérience de l'hôtellerie. Notre meilleur cuisinier a commencé comme aide sur notre chantier ; nous avons vu comment il travaillait, nous l'avons formé, et nous lui avons confié une cuisine. Nous avons embauché des mères de famille pour leur premier emploi, et une femme d'âge mûr que d'autres auraient écartée.",
        "Ce qu'ils apportaient, ce n'était pas un CV. C'était du caractère — et ça, nous l'avons appris, on peut bâtir un resort dessus.",
      ],
    },
    {
      kicker: "Grandir ensemble",
      heading: "Nous recrutons le potentiel, pas le vernis",
      body: [
        "La plupart de notre équipe a commencé sans formation. Ce qu'ils avaient, c'était l'intégrité, la gentillesse et l'envie d'apprendre — et nous avons bâti tout le reste autour.",
        "Par un mentorat de terrain et un accompagnement patient, jour après jour, nos équipes acquièrent de vraies compétences, une vraie confiance et un vrai chemin devant elles. Le but n'a jamais été de donner un simple emploi. C'est de donner un avenir.",
        "À mesure que Txaleta grandit, nous voulons que notre équipe grandisse avec elle — les aides d'aujourd'hui devenant les superviseurs, chefs et managers de demain, tous d'ici, de l'île.",
      ],
    },
  ],
  promise: {
    heading: "Notre promesse",
    points: ["Nous recrutons le caractère.", "Nous formons à l'excellence.", "Nous grandissons ensemble."],
  },
  artisans: {
    kicker: "Célébrer les artisans locaux",
    heading: "Les mains derrière Camiguin",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "Il y a vingt ans, les bijoux en verre de mer disparaissaient doucement de Camiguin. Ils sont revenus par les mains d'une artiste qui a fait renaître ce savoir-faire — et le travail parle de lui-même.",
          "Nous sommes fiers de présenter Natalia Sea Glass, qui transforme le verre poli par des décennies de marées en bijoux et souvenirs à emporter. Chaque pièce est un fragment du rivage même de Camiguin — la preuve que le luxe le plus durable est celui que l'océan a déjà façonné.",
        ],
      },
      {
        name: "Artistes locaux",
        body: [
          "Traversez Txaleta — surtout la nouvelle aile — et vous trouverez l'île sur les murs.",
          "Peintures, photographies, décor artisanal : des œuvres d'artistes de Camiguin qui saisissent ce lieu mieux qu'aucune brochure. Nous entourons nos hôtes de leur travail pour mettre le talent de l'île sous de nouveaux regards — et laisser ceux qui vivent ici raconter leur propre histoire.",
        ],
      },
    ],
  },
  mountain: {
    kicker: "Marcher avec la montagne",
    heading: "Les guides du Hibok-Hibok",
    body: [
      "Presque chaque semaine, nos hôtes nous demandent comment atteindre le sommet. Nous répondons toujours la même chose : avec ceux qui le connaissent le mieux.",
      "Nos guides de montagne portent des générations de savoir sur les pentes volcaniques de Camiguin — ses forêts, sa faune, ses humeurs — et rendent chaque trek aussi sûr qu'inoubliable. En leur confiant nos randonneurs, nous aidons à préserver la montagne et un mode de vie.",
    ],
  },
  sea: {
    kicker: "Gardiens de la mer",
    heading: "Camiguin sous la surface",
    items: [
      {
        name: "Île Mantigue",
        body: [
          "Juste au large, l'eau claire s'ouvre sur du corail vivant et des tortues qui glissent dans les hauts-fonds.",
          "Nous confions nos hôtes aux guides locaux de Mantigue, qui savent partager ce lieu sans le déranger — en gardant une distance respectueuse avec la faune et en protégeant l'un des sanctuaires les plus précieux de l'île.",
        ],
      },
      {
        name: "Plongée avec Scuba de Oro",
        body: [
          "Il existe un tout autre Camiguin sous la surface : récifs volcaniques, corail en pleine santé et une vie marine qui en fait l'un des secrets de plongée les mieux gardés des Philippines.",
          "Nous travaillons main dans la main avec Scuba de Oro — ils veillent sur nos hôtes sous l'eau, nous leur envoyons les plongeurs. Un vrai partenariat, de ceux où deux entreprises locales s'élèvent mutuellement au lieu de se concurrencer, et où chaque plongée respecte le récif.",
        ],
      },
    ],
  },
  partners: {
    kicker: "Soutenir les entreprises locales",
    heading: "Chaque séjour fait circuler l'opportunité",
    body:
      "Chaque séjour à Txaleta touche des entreprises familiales et de petits opérateurs à travers l'île. Ensemble, c'est ainsi que le tourisme devient quelque chose que tout Camiguin ressent.",
    list: [
      "Artistes locaux",
      "Natalia Sea Glass",
      "Guides du Mt. Hibok-Hibok",
      "Moniteurs et centres de plongée",
      "Opérateurs de bateaux",
      "Guides touristiques",
      "Transporteurs",
      "Entreprises familiales",
      "Musiciens et artistes locaux",
      "Praticiens bien-être locaux",
    ],
  },
  vision: {
    kicker: "Notre vision",
    heading: "L'hospitalité doit laisser chaque lieu plus beau qu'elle ne l'a trouvé",
    body: "Tout est là. En grandissant, notre engagement reste le même :",
    points: [
      "Créer un travail qui a du sens",
      "Investir dans le talent local",
      "Célébrer les artistes et entrepreneurs de Camiguin",
      "Pratiquer un tourisme qui rend",
      "Protéger la beauté naturelle de l'île",
      "Partager le vrai Camiguin avec des hôtes du monde entier",
    ],
  },
  sharedJourney: {
    heading: "Un voyage partagé",
    body: [
      "En choisissant Txaleta, vous entrez dans une histoire qui dure plus longtemps que vos vacances.",
      "Vous aidez une famille locale à trouver un travail stable. Vous mettez de l'argent entre les mains d'un artiste et d'un petit entrepreneur. Vous ouvrez la voie au prochain enfant de l'île qui rêvera d'une carrière dans l'hôtellerie. Et vous aidez à protéger la culture, la côte et la montagne qui font de ce lieu ce qu'il est.",
    ],
    closing: "Merci de faire partie de notre voyage.",
  },
};

const de: CommunityDict = {
  hero: { kicker: "Gemeinschaft, Kultur & Inselverantwortung", heading: "Das Herz von Camiguin" },
  quote:
    "Luxus findet sich nicht nur an schönen Orten, sondern in den Menschen, die diese Orte unvergesslich machen.",
  intro: [
    "Ein Aufenthalt im Txaleta de Camiguin ist der Zugang zu etwas Größerem als einem Reiseziel.",
    "Diese Insel wurde von Hand geformt — von Fischern und Bootsleuten, Guides und Bauern, Künstlern und Familien, die seit Generationen über Camiguin wachen. Sie sind ihre Erzähler und ihre Hüter. Als wir Txaleta bauten, wollten wir nicht daneben stehen. Wir wollten dazugehören.",
    "Deshalb haben wir früh eine Entscheidung getroffen: Tourismus soll hier mehr zurückgeben, als er nimmt. Durch lokale Einstellungen, echte Partnerschaften und einen leichteren Fußabdruck auf Land und Meer soll jeder Aufenthalt Camiguin ein wenig besser hinterlassen, als wir es vorgefunden haben.",
  ],
  stories: [
    {
      kicker: "Menschen zuerst",
      heading: "Wir stellen aus der Gemeinschaft ein",
      body: [
        "Wir stellen zuerst aus der Gemeinschaft ein — und wir meinen es ernst.",
        "Einige der Menschen, die Sie heute willkommen heißen, kamen ohne jede Hotellerie-Erfahrung zu uns. Unser bester Koch begann als Helfer auf unserer Baustelle; wir sahen, wie er arbeitete, bildeten ihn aus und gaben ihm eine Küche. Wir haben Hausfrauen für ihren ersten Job eingestellt — und eine ältere Frau, die andere übergangen hätten.",
        "Was sie mitbrachten, war kein Lebenslauf. Es war Charakter — und darauf, das haben wir gelernt, lässt sich ein Resort bauen.",
      ],
    },
    {
      kicker: "Gemeinsam wachsen",
      heading: "Wir stellen Potenzial ein, nicht Politur",
      body: [
        "Die meisten in unserem Team begannen ohne formale Ausbildung. Was sie stattdessen hatten: Integrität, Freundlichkeit und den Willen zu lernen — und darum haben wir alles andere gebaut.",
        "Durch Mentoring in der Praxis und geduldiges, tägliches Coaching gewinnen unsere Leute echte Fähigkeiten, echtes Selbstvertrauen und einen echten Weg nach vorn. Es ging nie nur darum, jemandem einen Job zu geben. Sondern eine Zukunft.",
        "Wenn Txaleta wächst, soll unser Team mitwachsen — die Helfer von heute werden die Supervisoren, Köche und Manager von morgen, alle von hier, von der Insel.",
      ],
    },
  ],
  promise: {
    heading: "Unser Versprechen",
    points: ["Wir stellen nach Charakter ein.", "Wir bilden zur Exzellenz aus.", "Wir wachsen gemeinsam."],
  },
  artisans: {
    kicker: "Lokale Kunsthandwerker feiern",
    heading: "Die Hände hinter Camiguin",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "Vor zwanzig Jahren verschwand Seeglas-Schmuck still von Camiguin. Er kehrte zurück durch die Hände einer Künstlerin, die das Handwerk wiederbelebte — und die Arbeit spricht für sich.",
          "Mit Stolz zeigen wir Natalia Sea Glass, die von Jahrzehnten der Gezeiten glatt geschliffenes Glas in Schmuck und Andenken verwandelt. Jedes Stück ist ein Fragment von Camiguins eigener Küste — der Beweis, dass der nachhaltigste Luxus der ist, den das Meer schon gemacht hat.",
        ],
      },
      {
        name: "Lokale Künstler",
        body: [
          "Gehen Sie durch Txaleta — besonders durch den neuen Flügel — und Sie finden die Insel an den Wänden.",
          "Gemälde, Fotografie, handgefertigtes Dekor: Werke von Künstlern aus Camiguin, die diesen Ort besser einfangen als jede Broschüre. Wir umgeben unsere Gäste mit ihrer Arbeit, um Inseltalent vor neue Augen zu bringen — und die Menschen von hier ihre eigene Geschichte erzählen zu lassen.",
        ],
      },
    ],
  },
  mountain: {
    kicker: "Mit dem Berg gehen",
    heading: "Die Guides des Hibok-Hibok",
    body: [
      "Fast jede Woche fragen uns Gäste, wie man den Gipfel erreicht. Wir antworten immer gleich: mit den Menschen, die ihn am besten kennen.",
      "Unsere lokalen Bergführer tragen Generationen von Wissen über Camiguins Vulkanhänge — die Wälder, die Tierwelt, die Launen des Berges — und machen jede Tour sicher und unvergesslich. Indem wir ihnen die Wanderer anvertrauen, helfen wir, den Berg und eine Lebensweise zu bewahren.",
    ],
  },
  sea: {
    kicker: "Hüter des Meeres",
    heading: "Camiguin unter der Oberfläche",
    items: [
      {
        name: "Mantigue Island",
        body: [
          "Gleich vor der Küste öffnet sich klares Wasser über lebende Korallen und Meeresschildkröten, die durch die Untiefen gleiten.",
          "Wir schicken unsere Gäste mit lokalen Mantigue-Guides hinaus, die diesen Ort teilen können, ohne ihn zu stören — mit respektvollem Abstand zur Tierwelt und zum Schutz eines der wertvollsten Schutzgebiete der Insel.",
        ],
      },
      {
        name: "Tauchen mit Scuba de Oro",
        body: [
          "Unter der Oberfläche liegt ein ganz anderes Camiguin: vulkanische Riffe, gesunde Korallen und eine Unterwasserwelt, die dies zu einem der stillsten Tauchgeheimnisse der Philippinen macht.",
          "Wir arbeiten Hand in Hand mit Scuba de Oro — sie kümmern sich unter Wasser um unsere Gäste, wir schicken ihnen die Taucher. Eine echte Partnerschaft, bei der zwei lokale Betriebe einander stärken statt zu konkurrieren — und jeder Tauchgang sicher und mit Respekt vor dem Riff geführt wird.",
        ],
      },
    ],
  },
  partners: {
    kicker: "Lokale Betriebe stärken",
    heading: "Jeder Aufenthalt trägt Chancen weiter",
    body:
      "Jeder Aufenthalt im Txaleta erreicht Familienbetriebe und kleine Anbieter auf der ganzen Insel. Zusammen wird Tourismus so zu etwas, das ganz Camiguin spürt.",
    list: [
      "Lokale Künstler",
      "Natalia Sea Glass",
      "Bergführer am Mt. Hibok-Hibok",
      "Tauchlehrer & Tauchbasen",
      "Bootsbetreiber",
      "Reiseführer",
      "Transportanbieter",
      "Familienbetriebe",
      "Lokale Musiker & Künstler",
      "Lokale Wellness-Praktiker",
    ],
  },
  vision: {
    kicker: "Unsere Vision",
    heading: "Gastfreundschaft soll jeden Ort besser hinterlassen, als sie ihn vorfand",
    body: "Das ist noch immer der ganze Kern. Während wir wachsen, bleibt unser Versprechen dasselbe:",
    points: [
      "Sinnvolle Arbeit schaffen",
      "In lokales Talent investieren",
      "Camiguins Künstler und Unternehmer feiern",
      "Tourismus leben, der zurückgibt",
      "Die natürliche Schönheit der Insel schützen",
      "Das echte Camiguin mit Gästen aus aller Welt teilen",
    ],
  },
  sharedJourney: {
    heading: "Eine gemeinsame Reise",
    body: [
      "Wer Txaleta wählt, tritt in eine Geschichte ein, die den Urlaub überdauert.",
      "Sie helfen einer Familie zu fester Arbeit. Sie legen Geld in die Hände einer Künstlerin und eines Kleinunternehmers. Sie machen Platz für das nächste Inselkind, das sich eine Zukunft in der Gastfreundschaft vorstellen darf. Und Sie helfen, die Kultur, die Küste und den Berg zu schützen, die diesen Ort ausmachen.",
    ],
    closing: "Danke, dass Sie Teil unserer Reise sind.",
  },
};

const ja: CommunityDict = {
  hero: { kicker: "コミュニティ・文化・島の守り手として", heading: "カミギンの心" },
  quote: "贅沢は美しい場所だけにあるのではありません。その場所を忘れがたいものにする、人々の中にあるのです。",
  intro: [
    "Txaleta de Camiguinでの滞在は、目的地よりも大きな何かへの入り口です。",
    "この島は手仕事で形づくられてきました。漁師と船頭、ガイドと農家、芸術家と家族たち — 何世代にもわたりカミギンを守ってきた人々です。彼らこそ、島の語り部であり守り手。Txaletaを建てたとき、私たちはその外側に立ちたくありませんでした。その一部になりたかったのです。",
    "だから早くに決めました。ここでの観光は、受け取る以上に還元するものであるべきだと。地元雇用、本物のパートナーシップ、そして土地と海への軽い足取りを通じて、すべての滞在がカミギンを少しだけ良くして帰るものでありますように。",
  ],
  stories: [
    {
      kicker: "人がいちばん",
      heading: "地域から雇用しています",
      body: [
        "私たちはまず地域から雇う — 本気でそうしています。",
        "今日あなたを迎えるスタッフの中には、ホスピタリティ経験ゼロで来た人もいます。いちばんの料理人は建設現場の手伝いから始まりました。働きぶりを見て、育てて、厨房を任せました。初めての仕事に踏み出す主婦を、そして他では見過ごされたかもしれない年配の女性を雇いました。",
        "彼らが持ってきたのは履歴書ではなく、人柄でした。そしてそれこそ、リゾートを築ける土台なのだと学びました。",
      ],
    },
    {
      kicker: "ともに育つ",
      heading: "磨かれた経歴より、伸びる力を",
      body: [
        "チームの多くは、正式な訓練なしに歩み始めました。代わりにあったのは誠実さ、優しさ、学ぶ意志 — 私たちはその上にすべてを築いてきました。",
        "実地のメンタリングと日々の根気強いコーチングを通じて、スタッフは本物のスキルと自信、そして先へ続く道を手にします。目標は仕事を与えることではなく、未来を与えることでした。",
        "Txaletaが成長するとき、チームも一緒に成長してほしい。今日のヘルパーが明日のスーパーバイザーに、シェフに、マネージャーに — みんなこの島の出身のままで。",
      ],
    },
  ],
  promise: {
    heading: "私たちの約束",
    points: ["人柄で雇う。", "卓越へと育てる。", "ともに成長する。"],
  },
  artisans: {
    kicker: "地元の職人とともに",
    heading: "カミギンを支える手",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "20年前、シーグラスのジュエリーはカミギンから静かに姿を消しました。それを蘇らせたのは、ひとりの作家の手 — 作品がすべてを物語っています。",
          "私たちはNatalia Sea Glassを誇りを持ってご紹介します。何十年もの潮に磨かれたガラスが、持ち帰れるジュエリーや記念品に生まれ変わります。ひとつひとつがカミギンの海岸線のかけら — 最も持続可能な贅沢とは、海がすでに作ってくれたものなのです。",
        ],
      },
      {
        name: "地元アーティスト",
        body: [
          "Txaletaを歩けば — 特に新館では — 壁の上に島が見つかります。",
          "絵画、写真、手仕事の装飾。どんなパンフレットよりもこの場所を捉えた、カミギンの芸術家たちの作品です。島の才能を新しい目に触れさせ、ここに生きる人々に自らの物語を語ってもらうために、私たちはお客様を彼らの作品で包みます。",
        ],
      },
    ],
  },
  mountain: {
    kicker: "山とともに歩く",
    heading: "ヒボクヒボク山のガイドたち",
    body: [
      "ほぼ毎週、山頂への行き方を尋ねられます。答えはいつも同じ。いちばんよく知る人たちと、です。",
      "地元の山岳ガイドは、カミギンの火山の斜面について何世代分もの知恵を受け継いでいます。森を、生き物を、山の機嫌を。だからどのトレッキングも安全で、忘れがたいものになります。登山者を彼らに託すことで、山と、ひとつの生き方の両方を守るお手伝いをしています。",
    ],
  },
  sea: {
    kicker: "海の守り手",
    heading: "水面下のカミギン",
    items: [
      {
        name: "マンティゲ島",
        body: [
          "沖に出ればすぐ、透きとおる水の下に生きたサンゴが広がり、浅瀬をウミガメが滑っていきます。",
          "私たちはマンティゲの地元ガイドとともにお客様を送り出します。彼らはこの場所を、乱すことなく分かち合う術を知る人たち。生き物と敬意ある距離を保ち、島でもっとも大切な保護区のひとつを守っています。",
        ],
      },
      {
        name: "Scuba de Oroとのダイビング",
        body: [
          "水面下には、もうひとつのカミギンがあります。火山性のリーフ、健やかなサンゴ、そしてフィリピンでもっとも静かなダイビングの秘密といえる海の生き物たち。",
          "私たちはScuba de Oroと手を取り合っています。水中ではお客様を彼らが守り、私たちはダイバーを彼らへ送る。競うのではなく高め合う、地元企業同士の本物のパートナーシップ。すべてのダイビングは安全に、リーフへの敬意とともに。",
        ],
      },
    ],
  },
  partners: {
    kicker: "地元ビジネスを支える",
    heading: "すべての滞在が、機会を島へ広げる",
    body: "Txaletaでの滞在は、島じゅうの家族経営の店や小さな事業者に届きます。観光がカミギン全体に感じられるものになるのは、この積み重ねからです。",
    list: [
      "地元アーティスト",
      "Natalia Sea Glass",
      "ヒボクヒボク山の山岳ガイド",
      "ダイブマスターとダイビング事業者",
      "ボート事業者",
      "ツアーガイド",
      "交通事業者",
      "家族経営のビジネス",
      "地元のミュージシャンとパフォーマー",
      "地元のウェルネス施術者",
    ],
  },
  vision: {
    kicker: "私たちのビジョン",
    heading: "ホスピタリティは、訪れた場所を出会ったときより良くして去るべきもの",
    body: "それがすべてです。成長しても、私たちの約束は変わりません。",
    points: [
      "意味のある仕事を生み出す",
      "地元の才能に投資する",
      "カミギンの芸術家と起業家を讃える",
      "還元する観光を実践する",
      "島の自然の美しさを守る",
      "世界中のゲストと本当のカミギンを分かち合う",
    ],
  },
  sharedJourney: {
    heading: "分かち合う旅",
    body: [
      "Txaletaを選ぶことは、休暇よりも長く続く物語に足を踏み入れること。",
      "地元の家族が安定した仕事を得る手助けになります。芸術家と小さな店主の手にお金を届けます。次の島の子どもがホスピタリティの道を夢見る余地をつくります。そして、この場所をこの場所たらしめている文化と海岸と山を守る力になります。",
    ],
    closing: "私たちの旅の一部になってくださり、ありがとうございます。",
  },
};

const ko: CommunityDict = {
  hero: { kicker: "커뮤니티, 문화, 그리고 섬의 지킴이", heading: "카미긴의 심장" },
  quote: "럭셔리는 아름다운 장소에만 있지 않습니다. 그 장소를 잊지 못하게 만드는 사람들 안에 있습니다.",
  intro: [
    "Txaleta de Camiguin에서의 머무름은 여행지 그 이상의 무언가로 들어가는 입구입니다.",
    "이 섬은 손으로 빚어졌습니다. 어부와 뱃사공, 가이드와 농부, 예술가와 가족들 — 세대에 걸쳐 카미긴을 돌봐온 사람들입니다. 그들이 이 섬의 이야기꾼이자 지킴이입니다. Txaleta를 지을 때, 우리는 그 바깥에 서고 싶지 않았습니다. 그 일부가 되고 싶었습니다.",
    "그래서 일찍이 결심했습니다. 이곳의 관광은 가져가는 것보다 더 많이 돌려주어야 한다고. 지역 고용, 진짜 파트너십, 땅과 바다에 남기는 더 가벼운 발자국을 통해 — 모든 머무름이 카미긴을 처음보다 조금 더 좋게 만들고 떠나기를 바랍니다.",
  ],
  stories: [
    {
      kicker: "사람이 먼저",
      heading: "우리는 지역에서 채용합니다",
      body: [
        "우리는 지역 주민을 먼저 채용합니다 — 진심으로요.",
        "오늘 당신을 맞이하는 사람들 중에는 호텔 경력이 전혀 없이 온 이들도 있습니다. 최고의 요리사는 공사장 잡부로 시작했습니다. 일하는 모습을 보고, 가르치고, 주방을 맡겼습니다. 첫 직장에 나선 주부들을, 다른 곳이라면 지나쳤을 나이 든 여성을 채용했습니다.",
        "그들이 가져온 것은 이력서가 아니라 사람됨이었습니다. 그리고 그 위에 리조트를 지을 수 있다는 것을, 우리는 배웠습니다.",
      ],
    },
    {
      kicker: "함께 성장하기",
      heading: "완성형이 아니라 가능성을 채용합니다",
      body: [
        "팀 대부분은 정식 훈련 없이 시작했습니다. 대신 가진 것은 정직함, 친절함, 배우려는 의지 — 나머지는 모두 그 위에 쌓아 올렸습니다.",
        "현장 멘토링과 하루하루의 끈기 있는 코칭으로, 우리 사람들은 진짜 기술과 자신감, 앞으로 나아갈 길을 얻습니다. 목표는 일자리를 주는 것이 아니라 미래를 주는 것이었습니다.",
        "Txaleta가 성장할 때 팀도 함께 성장하길 바랍니다. 오늘의 헬퍼가 내일의 슈퍼바이저, 셰프, 매니저가 되도록 — 모두 이 섬 출신 그대로.",
      ],
    },
  ],
  promise: {
    heading: "우리의 약속",
    points: ["사람됨으로 채용합니다.", "탁월함으로 길러냅니다.", "함께 성장합니다."],
  },
  artisans: {
    kicker: "지역 장인과 함께",
    heading: "카미긴을 빚는 손들",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "20년 전, 씨글라스 주얼리는 카미긴에서 조용히 사라졌습니다. 그것을 되살린 것은 한 예술가의 손 — 작품이 스스로 말해줍니다.",
          "수십 년의 파도에 매끄럽게 다듬어진 유리를 집으로 가져갈 주얼리와 기념품으로 바꾸는 Natalia Sea Glass를 자랑스럽게 소개합니다. 조각 하나하나가 카미긴 해안선의 파편 — 가장 지속가능한 럭셔리는 바다가 이미 만들어 둔 것임을 보여줍니다.",
        ],
      },
      {
        name: "지역 예술가들",
        body: [
          "Txaleta를 걷다 보면 — 특히 새 별관에서 — 벽 위에서 이 섬을 만나게 됩니다.",
          "그림, 사진, 수공예 장식. 어떤 브로슈어보다 이곳을 잘 담아낸 카미긴 예술가들의 작품입니다. 섬의 재능을 새로운 눈앞에 놓기 위해, 그리고 여기 사는 사람들이 자신의 이야기를 직접 들려주도록, 우리는 손님을 그들의 작품으로 둘러쌉니다.",
        ],
      },
    ],
  },
  mountain: {
    kicker: "산과 함께 걷다",
    heading: "히복히복 산의 가이드들",
    body: [
      "거의 매주 손님들이 정상에 오르는 법을 묻습니다. 대답은 언제나 같습니다. 산을 가장 잘 아는 사람들과 함께 가시라고.",
      "지역 산악 가이드들은 카미긴 화산 비탈에 대한 몇 세대의 지식을 품고 있습니다. 숲과 야생, 산의 기분까지. 그래서 모든 트레킹이 안전하고 잊을 수 없는 여정이 됩니다. 등반객을 그들에게 보내는 것으로, 산과 삶의 방식 둘 다를 지키는 데 보탬이 됩니다.",
    ],
  },
  sea: {
    kicker: "바다의 수호자",
    heading: "수면 아래의 카미긴",
    items: [
      {
        name: "만티게 섬",
        body: [
          "해안 바로 앞, 맑은 물 아래로 살아있는 산호가 펼쳐지고 바다거북이 얕은 물을 미끄러집니다.",
          "우리는 이곳을 흐트러뜨리지 않고 나눌 줄 아는 만티게 현지 가이드들과 함께 손님을 내보냅니다. 야생과 존중의 거리를 지키며, 섬에서 가장 소중한 보호구역 하나를 함께 지킵니다.",
        ],
      },
      {
        name: "Scuba de Oro와 함께하는 스쿠버다이빙",
        body: [
          "수면 아래에는 완전히 다른 카미긴이 있습니다. 화산 리프, 건강한 산호, 그리고 필리핀에서 가장 조용한 다이빙 비경으로 만드는 해양 생물들.",
          "우리는 Scuba de Oro와 손잡고 일합니다. 물속에서는 그들이 손님을 지키고, 우리는 다이버를 그들에게 보냅니다. 경쟁 대신 서로를 끌어올리는 지역 기업 간의 진짜 파트너십 — 모든 다이빙은 안전하게, 리프에 대한 존중과 함께.",
        ],
      },
    ],
  },
  partners: {
    kicker: "지역 비즈니스를 지원합니다",
    heading: "모든 머무름이 기회를 퍼뜨립니다",
    body: "Txaleta에서의 머무름은 섬 곳곳의 가족 사업과 소상공인에게 닿습니다. 관광이 카미긴 전체가 느낄 수 있는 무언가가 되는 방법입니다.",
    list: [
      "지역 예술가",
      "Natalia Sea Glass",
      "히복히복 산 산악 가이드",
      "다이브 마스터 & 다이빙 업체",
      "보트 운영자",
      "투어 가이드",
      "교통 사업자",
      "가족 경영 사업체",
      "지역 음악가 & 공연자",
      "지역 웰니스 전문가",
    ],
  },
  vision: {
    kicker: "우리의 비전",
    heading: "환대는 머문 자리를 처음보다 더 좋게 남겨야 합니다",
    body: "그게 전부입니다. 성장하는 동안에도 약속은 같습니다:",
    points: [
      "의미 있는 일자리를 만들기",
      "지역 인재에 투자하기",
      "카미긴의 예술가와 기업가를 응원하기",
      "돌려주는 관광을 실천하기",
      "섬의 자연을 지키기",
      "전 세계의 손님과 진짜 카미긴을 나누기",
    ],
  },
  sharedJourney: {
    heading: "함께 걷는 여정",
    body: [
      "Txaleta를 선택하는 순간, 당신은 휴가보다 오래 남는 이야기에 발을 들입니다.",
      "지역 가족이 안정된 일을 찾도록 돕고, 예술가와 소상공인의 손에 소득을 쥐여 주고, 다음 세대 섬 아이가 호텔리어의 꿈을 그릴 자리를 만들어 줍니다. 그리고 이곳을 이곳답게 만드는 문화와 해안과 산을 지키는 데 힘을 보태게 됩니다.",
    ],
    closing: "우리의 여정에 함께해 주셔서 감사합니다.",
  },
};

const zh: CommunityDict = {
  hero: { kicker: "社区、文化与海岛守护", heading: "卡米金的心脏" },
  quote: "奢华不仅在于美丽的地方，更在于让那些地方难以忘怀的人。",
  intro: [
    "入住Txaleta de Camiguin，是走进一段比目的地更辽阔的故事。",
    "这座岛是用双手塑造的——渔民与船夫、向导与农人、艺术家与一代代守护卡米金的家庭。他们是海岛的讲述者，也是守护者。建造Txaleta时，我们不想置身其外，而想成为其中的一部分。",
    "所以我们很早就做了决定：这里的旅游业，回馈应当多于索取。通过本地招聘、真诚的合作关系，以及对土地与海洋更轻的足迹，我们希望每一次入住，都让卡米金比我们遇见它时更好一点。",
  ],
  stories: [
    {
      kicker: "以人为先",
      heading: "我们从社区招聘",
      body: [
        "我们优先从社区招人——说到做到。",
        "今天迎接您的员工里，有些人来时完全没有酒店从业经历。我们最好的厨师最初是工地上的帮工；我们看见他做事的样子，培养他，把厨房交给了他。我们雇过第一次出来工作的家庭主妇，也雇过别处可能不会考虑的年长女性。",
        "他们带来的不是简历，而是品格——而我们学到的是：品格之上，足以建起一座度假村。",
      ],
    },
    {
      kicker: "共同成长",
      heading: "我们看重潜力，而非光鲜履历",
      body: [
        "团队中大多数人起步时没有受过正式培训。他们拥有的是正直、善良和学习的意愿——其余的一切，我们都围绕这些来搭建。",
        "通过手把手的带教与日复一日的耐心指导，我们的员工获得真本领、真自信和一条真正向前的路。目标从来不只是给人一份工作，而是给人一个未来。",
        "随着Txaleta成长，我们希望团队与它一起成长——今天的帮工成为明天的主管、主厨与经理，而且都来自这座岛。",
      ],
    },
  ],
  promise: {
    heading: "我们的承诺",
    points: ["以品格取人。", "以卓越育人。", "共同成长。"],
  },
  artisans: {
    kicker: "致敬本地匠人",
    heading: "卡米金背后的双手",
    items: [
      {
        name: "Natalia Sea Glass",
        body: [
          "二十年前，海玻璃首饰悄然从卡米金消失。让它归来的，是一位艺术家的双手——作品本身就是最好的证明。",
          "我们自豪地推介Natalia Sea Glass：她把被数十年潮汐磨圆的玻璃，变成可以带回家的首饰与纪念品。每一件都是卡米金海岸线的碎片——证明最可持续的奢华，是大海早已造好的那种。",
        ],
      },
      {
        name: "本地艺术家",
        body: [
          "走进Txaleta——尤其是新翼——你会在墙上遇见这座岛。",
          "绘画、摄影、手作装饰：卡米金艺术家的作品，比任何宣传册都更能捕捉这里的神韵。我们让客人被这些作品环绕，把海岛的才华带到新的目光面前，也让生活在这里的人讲述自己的故事。",
        ],
      },
    ],
  },
  mountain: {
    kicker: "与山同行",
    heading: "希伯克-希伯克山的向导",
    body: [
      "几乎每周都有客人问我们如何登顶。我们的回答始终如一：跟最了解这座山的人一起去。",
      "本地山地向导承载着几代人关于卡米金火山山坡的知识——它的森林、它的生灵、它的脾气——让每一次徒步既安全又难忘。把登山者交给他们，我们同时守护了这座山，和一种生活方式。",
    ],
  },
  sea: {
    kicker: "大海的守护者",
    heading: "水面之下的卡米金",
    items: [
      {
        name: "曼蒂格岛",
        body: [
          "离岸不远，清澈的海水下是活珊瑚，海龟在浅滩间滑行。",
          "我们请曼蒂格的本地向导带客人出海——他们懂得如何分享这里而不打扰它：与野生动物保持尊重的距离，共同守护这座岛最珍贵的保护区之一。",
        ],
      },
      {
        name: "与Scuba de Oro一起潜水",
        body: [
          "水面之下是另一个卡米金：火山礁石、健康的珊瑚，以及让这里成为菲律宾最低调潜水秘境的海洋生物。",
          "我们与Scuba de Oro携手合作——水下由他们照顾我们的客人，我们把潜水者介绍给他们。这是真正的伙伴关系：两家本地企业彼此成就而非竞争，每一次下潜都安全进行、心怀对礁石的敬意。",
        ],
      },
    ],
  },
  partners: {
    kicker: "支持本地企业",
    heading: "每一次入住，都把机会传向岛屿各处",
    body: "在Txaleta的每一次入住，都惠及全岛的家庭企业与小经营者。正是这些点滴，让旅游业成为整个卡米金都能感受到的事。",
    list: [
      "本地艺术家",
      "Natalia Sea Glass",
      "希伯克-希伯克山向导",
      "潜水长与潜水机构",
      "船只经营者",
      "导游",
      "交通服务者",
      "家庭企业",
      "本地音乐人与表演者",
      "本地康养师",
    ],
  },
  vision: {
    kicker: "我们的愿景",
    heading: "待客之道，应让每个地方比遇见时更好",
    body: "这就是全部。无论怎样成长，我们的承诺不变：",
    points: [
      "创造有意义的工作",
      "投资本地人才",
      "致敬卡米金的艺术家与创业者",
      "践行回馈式旅游",
      "守护海岛的自然之美",
      "与世界各地的客人分享真实的卡米金",
    ],
  },
  sharedJourney: {
    heading: "同行的旅程",
    body: [
      "选择Txaleta，你便走进了一段比假期更长久的故事。",
      "你帮助一个本地家庭获得稳定的工作；你把钱交到艺术家和小店主的手里；你为下一个海岛孩子留出想象酒店职业的空间；你也在守护让这里成为这里的文化、海岸与高山。",
    ],
    closing: "感谢你成为我们旅程的一部分。",
  },
};

export const communityContent: Record<Locale, CommunityDict> = { en, fr, de, ja, ko, zh };
