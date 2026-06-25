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
      <div className=" opacity flex gap-2 absolute -bottom-6 right-0">
        <p>{startEmail}@{endEmail}</p>
        <p>{tel}</p>
      </div>
    )}
    </div>
  );
}
