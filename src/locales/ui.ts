// ============================================================================
// UI chrome dictionary — navbar, footer, common buttons, per locale.
// Native-register hospitality copy, not literal translation: German uses the
// formal register, Japanese polite です/ます-adjacent nav conventions, Korean
// 존댓말 button forms, Simplified Chinese mainland travel-site conventions.
// Page/section content dictionaries live in their own files.
// ============================================================================

import type { Locale } from "@/lib/i18n";

export type UiDict = {
  /** Nav labels keyed by the UNPREFIXED href from site.ts `nav`. */
  nav: Record<string, string>;
  bookNow: string;
  menu: string;
  stayConnected: string;
  language: string;
  footer: {
    explore: string;
    contact: string;
    blurb: string;
    rights: string;
    crafted: string;
  };
};

export const ui: Record<Locale, UiDict> = {
  en: {
    nav: {
      "/accommodation": "Accommodation",
      "/dining": "Dining",
      "/experiences": "Experiences",
      "/guides": "Guides",
      "/about": "About",
      "/community": "Community",
      "/gallery": "Gallery",
    },
    bookNow: "Book Now",
    menu: "Menu",
    stayConnected: "Stay Connected",
    language: "Language",
    footer: {
      explore: "Explore",
      contact: "Contact",
      blurb:
        "A boutique coastal resort on Camiguin Island. Seaview suites, ocean-view glamping and an infinity pool — your peaceful island escape.",
      rights: "All rights reserved.",
      crafted: "Crafted on Camiguin",
    },
  },

  fr: {
    nav: {
      "/accommodation": "Hébergement",
      "/dining": "Restauration",
      "/experiences": "Expériences",
      "/guides": "Guides",
      "/about": "À propos",
      "/community": "Communauté",
      "/gallery": "Galerie",
    },
    bookNow: "Réserver",
    menu: "Menu",
    stayConnected: "Suivez-nous",
    language: "Langue",
    footer: {
      explore: "Explorer",
      contact: "Contact",
      blurb:
        "Un resort côtier boutique sur l’île de Camiguin. Suites vue mer, glamping face à l’océan et piscine à débordement — votre paisible refuge insulaire.",
      rights: "Tous droits réservés.",
      crafted: "Conçu à Camiguin",
    },
  },

  de: {
    nav: {
      "/accommodation": "Unterkünfte",
      "/dining": "Kulinarik",
      "/experiences": "Erlebnisse",
      "/guides": "Reiseführer",
      "/about": "Über uns",
      "/community": "Community",
      "/gallery": "Galerie",
    },
    bookNow: "Jetzt buchen",
    menu: "Menü",
    stayConnected: "Folgen Sie uns",
    language: "Sprache",
    footer: {
      explore: "Entdecken",
      contact: "Kontakt",
      blurb:
        "Ein Boutique-Resort an der Küste der Insel Camiguin. Suiten mit Meerblick, Glamping am Ozean und ein Infinity-Pool — Ihre ruhige Insel-Auszeit.",
      rights: "Alle Rechte vorbehalten.",
      crafted: "Gestaltet auf Camiguin",
    },
  },

  ja: {
    nav: {
      "/accommodation": "客室",
      "/dining": "ダイニング",
      "/experiences": "体験",
      "/guides": "旅行ガイド",
      "/about": "リゾートについて",
      "/community": "コミュニティ",
      "/gallery": "ギャラリー",
    },
    bookNow: "予約する",
    menu: "メニュー",
    stayConnected: "フォローする",
    language: "言語",
    footer: {
      explore: "ご案内",
      contact: "お問い合わせ",
      blurb:
        "カミギン島の海辺に佇むブティックリゾート。オーシャンビューのスイート、海を望むグランピング、インフィニティプール — 静かな島の休日をお過ごしください。",
      rights: "無断転載を禁じます。",
      crafted: "カミギン島にて制作",
    },
  },

  ko: {
    nav: {
      "/accommodation": "객실",
      "/dining": "다이닝",
      "/experiences": "체험",
      "/guides": "여행 가이드",
      "/about": "소개",
      "/community": "커뮤니티",
      "/gallery": "갤러리",
    },
    bookNow: "예약하기",
    menu: "메뉴",
    stayConnected: "팔로우하기",
    language: "언어",
    footer: {
      explore: "둘러보기",
      contact: "연락처",
      blurb:
        "카미긴 섬 해안의 부티크 리조트. 오션뷰 스위트, 바다를 마주한 글램핑, 인피니티 풀 — 평화로운 섬에서의 휴식을 만나보세요.",
      rights: "모든 권리 보유.",
      crafted: "카미긴에서 제작",
    },
  },

  zh: {
    nav: {
      "/accommodation": "客房",
      "/dining": "餐饮",
      "/experiences": "体验",
      "/guides": "旅行攻略",
      "/about": "关于我们",
      "/community": "社区",
      "/gallery": "图库",
    },
    bookNow: "立即预订",
    menu: "菜单",
    stayConnected: "关注我们",
    language: "语言",
    footer: {
      explore: "探索",
      contact: "联系我们",
      blurb:
        "坐落于卡米金岛海岸的精品度假村。海景套房、海景豪华露营与无边泳池——您宁静的海岛度假之选。",
      rights: "版权所有。",
      crafted: "匠心打造于卡米金岛",
    },
  },
};
