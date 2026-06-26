
import {getTraductionsByLocale} from "@/lib/db";
import {getProfile} from "@/lib/db";
import Tags from "../components/tags";
import LanguageButtons from "@/app/components/language_buttons";
import {AboutPage} from "@/app/components/about";
import Link from "next/link";
import { DM_Sans } from 'next/font/google'



interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;


}

const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],   // pour l'optical size
  display: 'swap',
})


export default async function LangLayout({ children, params }: LangLayoutProps) {

  const result = await params;
  const locale = result.lang;

  const traductions = await getTraductionsByLocale(locale);
  const alltags = traductions.map((work) => work.type);
  const tags = Array.from(new Set(alltags));

  const profile =  await getProfile();

  return (
    <>
      <header className={`${dmSans.className}`}>
        <div className=" flex flex-col gap-6 lg:gap-3 px-4 pt-2 pb-6 fixed bg-fond w-full z-[100]">
          <div className= {`flex justify-between `}>
            <Link href="/" className="lg:text-3xl text-[1.3em] ">Chloé_Grégoire.dev </Link>
            <LanguageButtons currentLanguage={locale} />
          </div>
          <nav className="flex w-full justify-between">
              <span className="">
                <Tags tags={tags} locale={locale} />
              </span>
            {profile && (
            <span>
              <AboutPage cv={profile.cv } email={profile.email} tel={profile.telephone}/>
            </span>
              )}
          </nav>
        </div>
    </header>
      <div className={`${dmSans.className} w-full`}>
        {children}
      </div>

    </>
  );
}
