// ============================================================================
// Legal chrome — cookie banner, preferences dialog, Instagram placeholder,
// footer legal links and the frame around the legal documents, per locale.
//
// The documents themselves (src/content/legal/*.md) are published in English,
// the binding version; every locale gets the same text inside a translated
// frame plus a one-line notice saying so. Translate the documents only after
// the English text has been approved, and have the translations reviewed.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type LegalDoc = "privacy" | "terms" | "cookies";

export const legalDocs: LegalDoc[] = ["privacy", "terms", "cookies"];

export type LegalDict = {
  docs: Record<LegalDoc, string>;
  cookieSettings: string;
  banner: {
    kicker: string;
    title: string;
    body: string;
    acceptAll: string;
    essentialOnly: string;
    customise: string;
  };
  prefs: {
    title: string;
    intro: string;
    essentialTitle: string;
    essentialBody: string;
    alwaysOn: string;
    mediaTitle: string;
    mediaBody: string;
    save: string;
    close: string;
  };
  instagram: {
    kicker: string;
    body: string;
    load: string;
    open: string;
    remember: string;
  };
  page: {
    kicker: string;
    updated: string;
    onThisPage: string;
    print: string;
    englishNotice: string;
    questions: string;
    questionsBody: string;
    alsoRead: string;
    manageCookies: string;
  };
};

export const legal: Record<Locale, LegalDict> = {
  en: {
    docs: { privacy: "Privacy Policy", terms: "Terms & Conditions", cookies: "Cookie Policy" },
    cookieSettings: "Cookie settings",
    banner: {
      kicker: "Cookies",
      title: "Your privacy, simply put",
      body: "This site uses no analytics or advertising cookies. We use only what it needs to work and to keep your booking secure. With your permission, we also show Instagram posts, which lets Meta set its own cookies.",
      acceptAll: "Accept all",
      essentialOnly: "Essential only",
      customise: "Customise",
    },
    prefs: {
      title: "Cookie settings",
      intro: "Choose what this site may load. You can change your mind at any time with “Cookie settings” at the bottom of every page.",
      essentialTitle: "Essential",
      essentialBody: "Remember your choices, run secure booking and payment with Cloudbeds, and keep the concierge chat working. The site cannot work without these.",
      alwaysOn: "Always on",
      mediaTitle: "External media",
      mediaBody: "Instagram posts embedded on our pages. When on, Instagram (Meta) receives your IP address and may set its own cookies.",
      save: "Save my choices",
      close: "Close",
    },
    instagram: {
      kicker: "Instagram post",
      body: "This post is hosted on Instagram. Loading it allows Meta to set cookies and receive your IP address.",
      load: "Load Instagram content",
      open: "Open on Instagram",
      remember: "Your choice is remembered. Change it any time in Cookie settings.",
    },
    page: {
      kicker: "Legal",
      updated: "Last updated",
      onThisPage: "On this page",
      print: "Print or save as PDF",
      englishNotice: "",
      questions: "Questions about this document?",
      questionsBody: "Write to us or call. A real person from our team will answer.",
      alsoRead: "Also read",
      manageCookies: "Manage cookie settings",
    },
  },

  fr: {
    docs: { privacy: "Politique de confidentialité", terms: "Conditions générales", cookies: "Politique de cookies" },
    cookieSettings: "Paramètres des cookies",
    banner: {
      kicker: "Cookies",
      title: "Votre vie privée, en toute simplicité",
      body: "Ce site n’utilise aucun cookie de mesure d’audience ni de publicité. Nous n’utilisons que l’essentiel à son fonctionnement et à la sécurité de votre réservation. Avec votre accord, nous affichons aussi des publications Instagram, ce qui permet à Meta de déposer ses propres cookies.",
      acceptAll: "Tout accepter",
      essentialOnly: "Essentiels uniquement",
      customise: "Personnaliser",
    },
    prefs: {
      title: "Paramètres des cookies",
      intro: "Choisissez ce que ce site peut charger. Vous pouvez changer d’avis à tout moment via « Paramètres des cookies », en bas de chaque page.",
      essentialTitle: "Essentiels",
      essentialBody: "Mémoriser vos choix, assurer la réservation et le paiement sécurisés avec Cloudbeds, et faire fonctionner le concierge en ligne. Le site ne peut pas fonctionner sans eux.",
      alwaysOn: "Toujours actifs",
      mediaTitle: "Médias externes",
      mediaBody: "Publications Instagram intégrées à nos pages. Une fois activés, Instagram (Meta) reçoit votre adresse IP et peut déposer ses propres cookies.",
      save: "Enregistrer mes choix",
      close: "Fermer",
    },
    instagram: {
      kicker: "Publication Instagram",
      body: "Cette publication est hébergée sur Instagram. L’afficher permet à Meta de déposer des cookies et de recevoir votre adresse IP.",
      load: "Afficher le contenu Instagram",
      open: "Ouvrir sur Instagram",
      remember: "Votre choix est mémorisé. Modifiable à tout moment dans les paramètres des cookies.",
    },
    page: {
      kicker: "Informations légales",
      updated: "Dernière mise à jour",
      onThisPage: "Sur cette page",
      print: "Imprimer ou enregistrer en PDF",
      englishNotice: "Ce document est proposé en anglais ; seule la version anglaise fait foi.",
      questions: "Une question sur ce document ?",
      questionsBody: "Écrivez-nous ou appelez-nous : une personne de notre équipe vous répondra.",
      alsoRead: "À lire aussi",
      manageCookies: "Gérer les paramètres des cookies",
    },
  },

  de: {
    docs: { privacy: "Datenschutzerklärung", terms: "Allgemeine Geschäftsbedingungen", cookies: "Cookie-Richtlinie" },
    cookieSettings: "Cookie-Einstellungen",
    banner: {
      kicker: "Cookies",
      title: "Ihre Privatsphäre – ganz einfach",
      body: "Diese Website verwendet keine Analyse- oder Werbe-Cookies. Wir nutzen nur, was für den Betrieb und eine sichere Buchung nötig ist. Mit Ihrer Zustimmung zeigen wir außerdem Instagram-Beiträge an; dabei kann Meta eigene Cookies setzen.",
      acceptAll: "Alle akzeptieren",
      essentialOnly: "Nur notwendige",
      customise: "Anpassen",
    },
    prefs: {
      title: "Cookie-Einstellungen",
      intro: "Wählen Sie, was diese Website laden darf. Sie können Ihre Entscheidung jederzeit über „Cookie-Einstellungen“ am Ende jeder Seite ändern.",
      essentialTitle: "Notwendig",
      essentialBody: "Speichern Ihre Auswahl, ermöglichen sichere Buchung und Zahlung über Cloudbeds und halten den Concierge-Chat funktionsfähig. Ohne sie funktioniert die Website nicht.",
      alwaysOn: "Immer aktiv",
      mediaTitle: "Externe Medien",
      mediaBody: "In unsere Seiten eingebettete Instagram-Beiträge. Wenn aktiviert, erhält Instagram (Meta) Ihre IP-Adresse und kann eigene Cookies setzen.",
      save: "Auswahl speichern",
      close: "Schließen",
    },
    instagram: {
      kicker: "Instagram-Beitrag",
      body: "Dieser Beitrag wird auf Instagram bereitgestellt. Beim Laden kann Meta Cookies setzen und erhält Ihre IP-Adresse.",
      load: "Instagram-Inhalt laden",
      open: "Auf Instagram öffnen",
      remember: "Ihre Auswahl wird gespeichert und lässt sich jederzeit in den Cookie-Einstellungen ändern.",
    },
    page: {
      kicker: "Rechtliches",
      updated: "Zuletzt aktualisiert",
      onThisPage: "Auf dieser Seite",
      print: "Drucken oder als PDF speichern",
      englishNotice: "Dieses Dokument liegt auf Englisch vor; verbindlich ist ausschließlich die englische Fassung.",
      questions: "Fragen zu diesem Dokument?",
      questionsBody: "Schreiben Sie uns oder rufen Sie an – Ihnen antwortet ein Mensch aus unserem Team.",
      alsoRead: "Weitere Dokumente",
      manageCookies: "Cookie-Einstellungen verwalten",
    },
  },

  ja: {
    docs: { privacy: "プライバシーポリシー", terms: "利用規約", cookies: "Cookieポリシー" },
    cookieSettings: "Cookie設定",
    banner: {
      kicker: "Cookie",
      title: "プライバシーについて",
      body: "当サイトでは、アクセス解析や広告のためのCookieは使用していません。サイトの動作と安全なご予約に必要なものだけを使用しています。同意いただいた場合に限りInstagramの投稿を表示し、その際Meta社が独自のCookieを設定することがあります。",
      acceptAll: "すべて許可",
      essentialOnly: "必須のみ",
      customise: "設定を選ぶ",
    },
    prefs: {
      title: "Cookie設定",
      intro: "当サイトで読み込む内容を選択できます。設定は各ページ下部の「Cookie設定」からいつでも変更できます。",
      essentialTitle: "必須",
      essentialBody: "選択内容の保存、Cloudbedsによる安全な予約・決済、コンシェルジュチャットの動作に使用します。これらがないとサイトは機能しません。",
      alwaysOn: "常に有効",
      mediaTitle: "外部メディア",
      mediaBody: "ページに埋め込まれたInstagramの投稿です。有効にすると、Instagram（Meta社）がお客様のIPアドレスを受け取り、独自のCookieを設定することがあります。",
      save: "選択を保存",
      close: "閉じる",
    },
    instagram: {
      kicker: "Instagramの投稿",
      body: "この投稿はInstagram上で公開されています。表示すると、Meta社がCookieを設定し、お客様のIPアドレスを受け取ります。",
      load: "Instagramのコンテンツを表示",
      open: "Instagramで開く",
      remember: "選択内容は保存され、Cookie設定からいつでも変更できます。",
    },
    page: {
      kicker: "法的情報",
      updated: "最終更新日",
      onThisPage: "このページの内容",
      print: "印刷・PDFで保存",
      englishNotice: "本書は英語で提供しています。英語版のみが正式な効力を有します。",
      questions: "本書についてのご質問",
      questionsBody: "メールまたはお電話でお気軽にお問い合わせください。スタッフが直接お答えします。",
      alsoRead: "関連文書",
      manageCookies: "Cookie設定を管理",
    },
  },

  ko: {
    docs: { privacy: "개인정보 처리방침", terms: "이용약관", cookies: "쿠키 정책" },
    cookieSettings: "쿠키 설정",
    banner: {
      kicker: "쿠키",
      title: "개인정보, 간단하게",
      body: "이 사이트는 분석용·광고용 쿠키를 사용하지 않습니다. 사이트 작동과 안전한 예약에 꼭 필요한 것만 사용합니다. 동의하시는 경우에만 인스타그램 게시물을 표시하며, 이때 Meta가 자체 쿠키를 설정할 수 있습니다.",
      acceptAll: "모두 허용",
      essentialOnly: "필수만 허용",
      customise: "직접 설정",
    },
    prefs: {
      title: "쿠키 설정",
      intro: "이 사이트가 불러올 항목을 선택하세요. 각 페이지 하단의 ‘쿠키 설정’에서 언제든지 변경할 수 있습니다.",
      essentialTitle: "필수",
      essentialBody: "선택 내용 저장, Cloudbeds를 통한 안전한 예약·결제, 컨시어지 채팅 작동에 사용됩니다. 이 항목이 없으면 사이트가 작동하지 않습니다.",
      alwaysOn: "항상 사용",
      mediaTitle: "외부 미디어",
      mediaBody: "페이지에 삽입된 인스타그램 게시물입니다. 사용 시 인스타그램(Meta)이 회원님의 IP 주소를 받고 자체 쿠키를 설정할 수 있습니다.",
      save: "선택 저장",
      close: "닫기",
    },
    instagram: {
      kicker: "인스타그램 게시물",
      body: "이 게시물은 인스타그램에 게시되어 있습니다. 불러오면 Meta가 쿠키를 설정하고 회원님의 IP 주소를 받게 됩니다.",
      load: "인스타그램 콘텐츠 불러오기",
      open: "인스타그램에서 열기",
      remember: "선택 내용이 저장되며, 쿠키 설정에서 언제든지 변경할 수 있습니다.",
    },
    page: {
      kicker: "법적 고지",
      updated: "최종 업데이트",
      onThisPage: "이 페이지의 내용",
      print: "인쇄 또는 PDF로 저장",
      englishNotice: "이 문서는 영어로 제공되며, 영어 원문만이 효력을 가집니다.",
      questions: "이 문서에 대해 궁금한 점이 있으신가요?",
      questionsBody: "이메일이나 전화로 연락 주세요. 저희 직원이 직접 답변드립니다.",
      alsoRead: "함께 보기",
      manageCookies: "쿠키 설정 관리",
    },
  },

  zh: {
    docs: { privacy: "隐私政策", terms: "条款与条件", cookies: "Cookie 政策" },
    cookieSettings: "Cookie 设置",
    banner: {
      kicker: "Cookie",
      title: "您的隐私，简单明了",
      body: "本网站不使用任何分析或广告类 Cookie，仅使用网站运行和安全预订所必需的内容。经您同意后，我们才会显示 Instagram 帖子，届时 Meta 可能会设置其自身的 Cookie。",
      acceptAll: "全部接受",
      essentialOnly: "仅限必要",
      customise: "自定义",
    },
    prefs: {
      title: "Cookie 设置",
      intro: "选择本网站可以加载的内容。您可随时通过每个页面底部的“Cookie 设置”更改选择。",
      essentialTitle: "必要",
      essentialBody: "用于保存您的选择、通过 Cloudbeds 完成安全预订与支付，并保证礼宾聊天正常运行。缺少这些，网站将无法正常使用。",
      alwaysOn: "始终启用",
      mediaTitle: "外部媒体",
      mediaBody: "嵌入在页面中的 Instagram 帖子。启用后，Instagram（Meta）将获得您的 IP 地址，并可能设置其自身的 Cookie。",
      save: "保存选择",
      close: "关闭",
    },
    instagram: {
      kicker: "Instagram 帖子",
      body: "此帖子发布于 Instagram。加载后，Meta 可能设置 Cookie 并获得您的 IP 地址。",
      load: "加载 Instagram 内容",
      open: "在 Instagram 中打开",
      remember: "您的选择将被保存，可随时在 Cookie 设置中更改。",
    },
    page: {
      kicker: "法律信息",
      updated: "最后更新",
      onThisPage: "本页内容",
      print: "打印或另存为 PDF",
      englishNotice: "本文件以英文提供，仅英文版本具有约束力。",
      questions: "对本文件有疑问？",
      questionsBody: "欢迎发邮件或致电，我们的工作人员会亲自回复。",
      alsoRead: "相关文件",
      manageCookies: "管理 Cookie 设置",
    },
  },
};
