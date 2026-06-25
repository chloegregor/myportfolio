import CardGrid from "@/app/components/card_grid";

export interface Traduction {
  id: number;
  slug: string;
  locale: string;
  type: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  photos_caption: string | null;
  videos_caption: string | null;
  work: {
    illustration: string;
    placement_x: string;
    placement_y: string;
  }
}


export default function CardFilter({ traductions, filtered_traductions, currentTag }: { traductions: Traduction[], filtered_traductions: Traduction[], currentTag: string}) {

  const filtered_works = filtered_traductions

  return(
    <>

    <div className="lg:pl-25 lg:pr-25 pl-2 pr-2">
      <div className =" ">
        <div className={`grid lg:grid-cols-4 grid-cols-3 lg:gap-[4em] gap-[2em]`}>
          { traductions.map((trad, index) => (
                <CardGrid trad={trad} key={index} opacity={filtered_works.includes(trad) ? true : false} currentTag={currentTag} />
            ))
          }
        </div>

      </div>
    </div>

    </>
  )
}
