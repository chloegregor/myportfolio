'use client'
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect} from 'react';

type TextKey = 'title' | 'subtitle' | 'description';

interface Language {
  id: number;
  title: string;
  locale : string;
  slug: string;
  subtitle: string | null;
  type: string;
  description: string | null;
  work: {
    illustration: string;
    placement_x: string;
    placement_y: string;
  }
}

const ValidTextKeys: TextKey[] = ['title', 'subtitle', 'description'];

export default function CardGrid({ trad, opacity, currentTag}: { trad: Language, opacity: boolean, currentTag: string}) {


  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(opacity);
    }, 50);
    return () => clearTimeout(timer);
  }, [opacity]);


  const italic = trad.work.illustration === "subtitle"
  const work = trad.work;
  const illustrationValue =  work.illustration as string;
  const isUrl = illustrationValue.startsWith("https://");
  const isTextKey = !isUrl && ValidTextKeys.includes(illustrationValue as TextKey);
  const textKey = isTextKey ? (illustrationValue as TextKey) : null;

  const url = `${trad.locale}/${trad.slug}/?tag=${trad.type}`


    return (
    <div className={`aspect-square  flex flex-col items-${work.placement_x} justify-${work.placement_y}` }key={trad.id}>
      <div id=""className={`
    flex flex-col items-center justify-center gap-3 h-[100%] w-[100%] lg:h-[50%] lg:w-[80%] transform
    ${ isVisible  ? " opacity-100 " : " opacity-0 disabled"}
  `}>
        <Link href={`/${url}`} className="h-full w-full ">
        {
          illustrationValue && (
            work.illustration?.includes("https://") ? (
              <div className="  relative h-[100%] w-[100%]  text-center">
                  <Image src={illustrationValue} alt={trad.title} fill sizes="max-width:400px" className="object-contain"/>
                </div>

            )
              : textKey && (
                <div className=" w-full ">
                  <p className={`text-justify text-[0.5em] lg:line-clamp-6 w-[80%] w-[100%] line-clamp-8 last-center  ${italic ? "italic" : ""}`}>{trad[textKey]}</p>
                </div>
              )
          )
        }
        </Link>
      </div>
    </div>
    );
}
