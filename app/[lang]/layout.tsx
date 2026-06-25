
import {getTraductionsByLocale} from "@/lib/db";
import {getProfile} from "@/lib/db";
import Tags from "../components/tags";
import LanguageButtons from "@/app/components/language_buttons";
import {AboutPage} from "@/app/components/about";
import Link from "next/link";
import LocalFont from 'next/font/local';



interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;


}

export const enbyGertrude = LocalFont({
  src: "../../public/fonts/Enby_Gertrude_roman.woff2",
});

export default async function LangLayout({ children, params }: LangLayoutProps) {

  const result = await params;
  const locale = result.lang;

  const traductions = await getTraductionsByLocale(locale);
  const alltags = traductions.map((work) => work.type);
  const tags = Array.from(new Set(alltags));

  const profile =  await getProfile();

  return (
    <>
      <header className={`${enbyGertrude.className}`}>
        <div className=" flex flex-col gap-6 lg:gap-3 px-4 pt-2 pb-6 fixed bg-fond w-full z-[100]">
          <div className= {`flex justify-between `}>
            <Link href="/" className="lg:text-3xl text-[1.3em] ">Chloé Grégoire </Link>
            <LanguageButtons currentLanguage={locale} />
          </div>
          <nav className="flex w-full bg-fond justify-between">
              <span className="">
                <Tags tags={tags} locale={locale} />
              </span>
            {profile && (
            <span>
              <AboutPage cv={profile.cv } portfolio={profile.portfolio} email={profile.email} tel={profile.telephone}/>
            </span>
              )}
          </nav>
        </div>
    </header>
      <div className=" w-full ">
        {children}
      </div>

    </>
  );
}
