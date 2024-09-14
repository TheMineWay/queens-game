import "../globals.css";
import type { Metadata } from "next";
import { SHORT_FULLNAME } from "@/constants/name.constants";
import { LOCALES } from "@/constants/i18n/locales";
import { Locale } from "@/constants/i18n/locale.enum";
import { getDictionary } from "@/i18n/dictionary.utils";
import { I18nParams } from "@/types/i18n/i18n-params.type";

export async function generateMetadata({
  params: { lang },
}: I18nParams): Promise<Metadata> {
  const { layout } = await getDictionary(lang);

  return {
    title: layout.Title,
    description: `LinkedIn Queens game.`,
    keywords: ["Game", "Queens"],
    creator: SHORT_FULLNAME,
    alternates: {
      languages: LOCALES.reduce((prev, locale) => {
        prev[locale] = `/${locale}`;
        return prev;
      }, {} as Record<Locale, string>),
    },
  };
}

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<
  {
    children: React.ReactNode;
  } & I18nParams
>) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
