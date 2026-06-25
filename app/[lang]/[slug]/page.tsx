import { getTraductionBySlugAndLocale } from "@/lib/db";
import Work from "@/app/components/work";
import { notFound } from "next/navigation";

export default async function SlugPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {

  const { lang, slug } = await params;

  const trad = await getTraductionBySlugAndLocale(slug, lang);



  if (!trad){
    notFound();}


  return (
    <div className=" w-full lg:mt-[140px] mt-[250px]">
      <Work trad={trad.traduction} next={trad.next_trad} prev={trad.prev_trad} locale={lang} />
    </div>
  )
  ;
}
