import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { LegalPage, legalMetadata } from "@/components/legal-page";

export default async function TermsPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return <LegalPage lang={lang as Locale} doc="terms" />;
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return legalMetadata(lang as Locale, "terms");
}
