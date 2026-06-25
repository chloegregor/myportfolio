'use client';

import {useState, useEffect} from "react";
import {updateProfile} from "@/app/actions/profile";
import  CloudinaryWidget  from "./cloudinary_widget";


interface Profile {
  profile: {
    telephone: string;
    email: string;
    cv: string;
    portfolio: string;
  } | null;
}


export function EditProfile ({profile}: Profile) {

  const [isClicked, setIsClicked] = useState(false);
  const [uploadedCv, setUploadedCv] = useState<[string, string] | null>(null);
  const [uploadedPf, setUploadedPf] = useState<[string, string] | null>(null);


  function handleUploadCv(urls: [string, string][]){
    if (urls.length > 0) {
      setUploadedCv(urls[0]);
    }
  }

  function handleUploadPf(urls: [string, string][]){
    if (urls.length > 0) {
      setUploadedPf(urls[0]);
    }
  }

  function deleteCv() {
    setUploadedCv(null);
  }


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsClicked(false);
    const form = event.currentTarget;

    // Here you would typically handle form submission, e.g., send data to the server
   const telephone = (form.telephone as HTMLInputElement).value;
   const email = (form.email as HTMLInputElement).value;
   const cv = uploadedCv ? uploadedCv[0] : profile?.cv || '';
   const portfolio = uploadedPf ? uploadedPf[0] : profile?.portfolio || '';



    updateProfile(telephone, email, cv, portfolio);

  }

  return(
    <>
      <button onClick={() => setIsClicked(!isClicked)} className="border p-1">Editer les infos perso</button>
      {isClicked && (

          <div className="absolute overflow-scroll bg-black flex p-[1em] left-50 right-50 top-30 bottom-30 shadow-2xl z-10">
            <form onSubmit={handleSubmit} className=" flex grow flex-col relative mt-[2em] mb-[2em]">
              <button className="absolute top-0 right-0 cursor-pointer" onClick={() => setIsClicked(false)}>Fermer</button>
              <h2 className="text-[2em] text-center">Infos Perso</h2>

                <div className="flex flex-col gap-4 mt-10 flex-1">

                  <label>
                    Téléphone:
                    <input type="text" name="telephone" defaultValue={profile?.telephone ?? ''} className="border p-2 w-full"/>
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" defaultValue={profile?.email ?? '' } className="border p-2 w-full truncate"/>
                  </label>
                  <div className="h-10">

                    {uploadedCv && (

                      <div className="flex gap-2">
                        <p className="">CV chargé:</p>
                        <p className="text-[0.8em] p-1">{uploadedCv[1]}</p>
                        <span>
                          <button type="button" onClick={deleteCv} className="text-red-500 cursor-pointer">x</button>
                        </span>
                      </div>

                    )}
                  </div>
                  {uploadedCv === null && (

                    <div>
                      <label htmlFor="cv">Cv: </label>
                      <CloudinaryWidget handleUpload={handleUploadCv} />
                    </div>

                  )}

                  <div className="h-10">

                    {
                      uploadedPf && (
                        <div className="flex gap-2">
                          <p>Portfolio chargé:</p>
                          <p className="text-[0.8em] p-1">{uploadedPf[1]}</p>
                          <span>
                            <button type="button" onClick={() => setUploadedPf(null)} className="text-red-500 cursor-pointer">x</button>
                          </span>
                        </div>
                      )
                    }
                  </div>


                  {uploadedPf === null && (
                    <div>
                      <label htmlFor="portfolio">Portfolio: </label>
                      <CloudinaryWidget handleUpload={handleUploadPf} />
                    </div>
                  )}
                </div>
                <span className="flex justify-end mt-auto">
                  <button type="submit" className="border p-1">Enregistrer</button>
                </span>

            </form>
          </div>
        )}
    </>

  );
}
