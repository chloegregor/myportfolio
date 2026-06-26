
import WorkMedias from "./workMedias";

interface Trad {
  id: number;
  type: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  photos_caption: string | null;
  videos_caption: string | null;
  work: {
    year: string | null;
    url: string | null;
    photos: {
      url: string;
      titre: string;
    }[];
    videos: {
      url: string;
      thumbnail: string;
    }[];
  } ;
}

function Arrowprev ({slug}: {slug?: string}) {
  if (!slug) {
    return (
    <div className="rotate-180">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={92}
          fill="none"
          viewBox="0 0 24 24"

        >
        <path
          stroke="#6666"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.600}
          d="M20 12H4m16 0-6 6m6-6-6-6"
        />
      </svg>
    </div>

    )
  }
  return (
    <div className="rotate-180">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={92}
        fill="none"
        viewBox="0 0 24 24"

      >
      <path
        stroke="#05df72"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.600}
        d="M20 12H4m16 0-6 6m6-6-6-6"
      />
      </svg>
    </div>

  )

}

function Arrownext ({slug}: {slug?: string}) {
  if (!slug) {
    return (
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={92}
          fill="none"
          viewBox="0 0 24 24"

        >
          <path
            stroke="#6666"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.600}
            d="M20 12H4m16 0-6 6m6-6-6-6"
          />
        </svg>
      </div>

    )
  }
  return (
    <div className="">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={92}
        fill="none"
        viewBox="0 0 24 24"

      >
      <path
        stroke="#05df72"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.600}
        d="M20 12H4m16 0-6 6m6-6-6-6"
      />
      </svg>
    </div>

  )

}
export default function Work({trad, next, prev, locale}: {trad: Trad, next?: string, prev?: string, locale: string}) {

  if (trad === null) {
    return
  }

  const work =trad.work
  const photos = work.photos
  const videos = work.videos
  const medias = [...photos, ...videos]

  function url (slug?:string) {
    if (!slug) {
      return "#"
    }
    return `/${locale}/${slug}/?tag=${trad.type}`
  }


  return (
    <div className= "px-4 lg:px-20 h-full flex flex-col opacity" key={trad.id}>
      <div className="flex lg:flex-row flex-col  ">
        {medias.length > 0 && (
          <div className=" lg:w-[75%] order-2 lg:order-0 lg:mt-0 mt-[10px] flex justify-center  ">
            <WorkMedias medias={medias} videos_caption={trad.videos_caption} photos_caption={trad.photos_caption}/>
          </div>

          )}
        <div className={`lg:pl-15 flex flex-col ${medias.length > 0 ? "lg:w-[25%]" : "lg:w-[50%]"}`}>
          <span className="  flex flex-col gap-2 ">
            <div id="" className={` flex flex-col text-justify`}>
              <h2 id=""className=" lg:text-[1.5em] text-[1.2em]">{trad.title}</h2>
              <span className="text-[0.8em]">{work.year}</span>

            </div>
            <div className="h-[50px]">
              <h3 className=" thin ">{trad.subtitle}</h3>
              {work.url && (
                <a href={work.url} target="_blank" className="text-[0.9em] text-orange-400 underline underline-offset-3 cursor-pointer">{work.url}</a>
              )}
            </div>
          </span>
        </div>


      </div>
      <p className={`whitespace-pre-wrap text-justify lg:w-[75%] lg:pl-[70px] mt-[60px]`}>{trad?.description}</p>

        <div className=" mt-[7%] flex ">

        <a className={prev ? "" : "disabled"} href={url(prev)}><Arrowprev slug={prev}/></a>

          <span className="ml-auto">
            <a className={next ? "" : "disabled"} href={url(next)}><Arrownext slug={next}/></a>
          </span>
        </div>
    </div>
  );
}
