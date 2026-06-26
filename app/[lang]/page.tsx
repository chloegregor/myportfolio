import CardFilter from "@/app/components/card_filter";
import {getTraductionsByLocale} from "@/lib/db";
import { Traduction } from "@/app/components/card_filter";

export default async function Home({params, searchParams}: {params: Promise<{ lang: string }>,
  searchParams: Promise<{ [key: string]: string | undefined }>}) {
console.log("DB:", process.env.DATABASE_URL)
  const searchprms = await searchParams;
  const tag = searchprms.tag || "";

  const result = await params;
  const locale = result.lang;

  const traductions = (await getTraductionsByLocale(locale)) as Traduction[];

  const filtered_traductions = tag ? traductions.filter((trad) => trad.type === tag) : traductions;


  return (
    <div className="w-full lg:mt-[180px] mt-[250px] ">
      <CardFilter traductions={traductions} filtered_traductions={filtered_traductions} currentTag={tag} />
    </div>

  );
}
