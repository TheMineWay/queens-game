import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/dictionary.utils";
import { I18nParams } from "@/types/i18n/i18n-params.type";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import GitHubIcon from "@/assets/social/github.png";
import LinkedInIcon from "@/assets/social/linkedin.png";
import { SOCIAL } from "@/constants/social.constants";

export default async function Home({ params: { lang } }: I18nParams) {
  const { home } = await getDictionary(lang);

  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl md:text-6xl w-full">{home.title.Title}</h1>
        <h2 className="text-lg md:text-xl w-full">{home.title.Subtitle}</h2>
        <Button variant="secondary">
          <Play className="mr-2 h-4 w-4" /> {home.title.actions.play.Text}
        </Button>
        <div className="flex gap-2 justify-center">
          <Link href={SOCIAL.repository} target="_blank">
            <Image
              className="w-10 invert"
              src={GitHubIcon}
              alt={home.title.social.github.Alt}
            />
          </Link>
          <Link href={SOCIAL.linkedIn} target="_blank">
            <Image
              className="w-10 invert"
              src={LinkedInIcon}
              alt={home.title.social.github.Alt}
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
