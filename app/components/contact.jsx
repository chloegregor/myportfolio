'use client';

import {useState} from "react";


export function Contact({ email, tel}) {

  const [isClicked, setIsClicked] = useState(false);
  const startEmail = email.slice(0, (email.indexOf("@")));
  const endEmail = email.slice(email.indexOf("@")+1);

  return (
    <div>
    <button className={`cursor-pointer ${isClicked ? "text-green-400" : ""}`} onClick={()=> setIsClicked(!isClicked)}>
      Contact
    </button>
    {isClicked && (
      <div className=" opacity flex lg:flex-row flex-col-reverse items-end gap-2 absolute  right-0">
        <p>{startEmail}@{endEmail}</p>
        <p className="w-fit">{tel}</p>
      </div>
    )}
    </div>
  );
}
