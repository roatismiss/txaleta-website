import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { LegalPage, legalMetadata } from "@/components/legal-page";

export default async function PrivacyPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return <LegalPage lang={lang as Locale} doc="privacy" />;
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return legalMetadata(lang as Locale, "privacy");
}
