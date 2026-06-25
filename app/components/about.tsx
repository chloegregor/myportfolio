import {Contact} from "./contact";

interface AboutPageProps {
  cv: string;
  email: string;
  tel: string;
}

export function AboutPage({cv, email, tel}: AboutPageProps) {


  return(
    <div className="flex flex-col lg:flex-row gap-2 relative" >
      <a href={cv} target="_blank">CV</a>
      <Contact email={email} tel={tel}/>
    </div>

  );
}
