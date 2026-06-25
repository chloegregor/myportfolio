'use client'
import { useEffect} from "react";
import { usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";


export default function Tags ({tags, locale,}: {tags: string[], locale: string}) {

const pathname = usePathname();

const searchParams = useSearchParams();

const currentTag = searchParams.get('tag') || "tout";


const tagColor: Record<string, [string, string]> = {
  React: ["text-green-400", "hover:text-green-400"],
  Astro: ["text-green-400", "hover:text-green-400"],
  Javascript: ["text-green-400", "hover:text-green-400"],
  Ruby: ["text-green-400", "hover:text-green-400"],
  Mobile: ["text-green-400", "hover:text-green-400"],
  Publications: ["text-green-400", "hover:text-green-400"],

};

 useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant'});
  }, [pathname]);


  return (

    <div className="flex gap-2
    ">
    <span className=" flex flex-col lg:flex-row gap-2">
      <Link href={`/${locale}`}  className={` ${currentTag === "tout" ? "text-red-600" : "hover:text-red-600"}`} scroll={true}> {locale === "fr" ? "Tout voir" : "See all"}</Link>
      <Link href={`/${locale}/?tag=react`} className={currentTag === "react" ? tagColor["React"][0] : tagColor["React"][1]}>NextJs / React</Link>
      <Link href={`/${locale}/?tag=mobile`} className={currentTag === "mobile" ? tagColor["Mobile"][0] : tagColor["Mobile"][1]}>Mobile</Link>
    </span>
    <span className=" flex flex-col lg:flex-row gap-2">
      <Link href={`/${locale}/?tag=astro`} className={currentTag === "astro" ? tagColor["Astro"][0] : tagColor["Astro"][1]}>Astro</Link>
      <Link href={`/${locale}/?tag=javascript`} className={currentTag === "javascript" ? tagColor["Javascript"][0] : tagColor["Javascript"][1]}>Javascript</Link>
      <Link href={`/${locale}/?tag=ruby`} className={currentTag === "ruby" ? tagColor["Ruby"][0] : tagColor["Ruby"][1]}>Ruby On Rails</Link>
    </span>
    </div>
  )
}
