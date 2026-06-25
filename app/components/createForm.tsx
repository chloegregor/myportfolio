'use client';
import {useState, useEffect} from "react";
import {createWork} from "@/app/actions/works";
import  CloudinaryWidget  from "./cloudinary_widget";

export function CreateForm () {
  const [isClicked, setIsClicked] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<[string, string][]>([]);
  const [urlVideos, setUrlVideos] = useState<string[]>([]);
  const [illustration, setIllustration] = useState<string | null>(null);

 function handleUpload(url: [string, string][]){
    setUploadedPhotos((prev) => [...prev, ...url]);
 }


  function addVideo() {
    const container = document.getElementById('videoInputs');
    if (container) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = 'video';
      input.className = 'border';
      container.appendChild(input);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    setIsClicked(false);
    const formData = new FormData();
    const form = event.currentTarget;
    const videoInputs = form.querySelectorAll('input[name="video"]');
    videoInputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value.trim() !== '') {
        formData.append('video', input.value);
      }
    });
    formData.append("type", (form.type as HTMLSelectElement).value);
    formData.append("urlarticle", (form.urlarticle as HTMLInputElement).value);
    formData.append("year", form.year.value);
    formData.append("titre_fr", form.title_fr.value);
    formData.append("subtitle_fr", form.subtitle_fr.value);
    formData.append("description_fr", form.description_fr.value);
    formData.append("titre_en", form.title_en.value);
    formData.append("subtitle_en", form.subtitle_en.value);
    formData.append("description_en", form.description_en.value);
    formData.append("videos_caption_fr", form.videos_caption_fr.value);
    formData.append("videos_caption_en", form.videos_caption_en.value);

    if (illustration) {
      formData.append("illustration", illustration);
    }
    if (uploadedPhotos.length > 0){
      formData.append("photos_caption_fr", form.photos_caption_fr.value);
      formData.append("photos_caption_en", form.photos_caption_en.value);
      uploadedPhotos.forEach((photo) => {
        formData.append("photosurls", photo[0]);
        formData.append("phototitles", photo[1]);
      })};

    const result = await createWork(formData);
    if (!result.ok) {
      alert("Erreur lors de la création du projet.");
      return;
    }
    if (result.ok) {
      setUrlVideos([]);
      form.reset();
      setUploadedPhotos([]);

    }
  }

  function deleteFromEverywhere(url: string) {
    setUploadedPhotos(prev => prev.filter(photo => photo[0] !== url));
    setUrlVideos(prev => prev.filter(videoUrl => videoUrl !== url));
  }



  return (
    <>

        <button className={`${isClicked ? "disabled" : ""} p-1 border cursor-pointer `} onClick={() => setIsClicked(true)}>
          Ajouter un projet
        </button>


      {isClicked && (
          <div className="absolute overflow-scroll bg-white  p-[1em] left-50 right-50 top-30 bottom-30 shadow-2xl z-10">
            <form onSubmit={handleSubmit}  method="POST" encType="multipart/form-data" className="flex flex-col gap-[1em] mt-[2em] relative">
              <button className="absolute top-0 right-0 cursor-pointer" onClick={() => setIsClicked(false)}>Fermer</button>
              <h2 className="text-[2em] text-center">Création</h2>
              <div className=" mt-[2em] flex flex-col gap-[2em]">
                <div  className="flex gap-5">
                  <label htmlFor="type">Type de projet :</label>
                  <select id="type" name="type" className="border w-[20%]">
                    <option value="react">react / next</option>
                    <option value="mobile">mobile</option>
                    <option value="astro">astro</option>
                    <option value="javascript">js</option>
                    <option value="ruby">ruby</option>
                  </select>
                   <div className="flex gap-2">
                    <label htmlFor="urlarticle">lien externe : </label>
                    <input type="text" className="border" id="urlarticle" name="urlarticle"  />
                  </div>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="illustration">Définir comme illustration</label>
                  <input type="radio" id="illustration" name="illustration" required onChange={(e) => {setIllustration("title");}} />
                </div>
                <div className='flex gap-3'>
                  <span className="flex flex-col gap-2">
                    <label htmlFor="title_fr">Titre-FR:</label>
                    <input type="text" className="border " id="title_fr" name="title_fr" required />
                  </span>
                  <span className="flex flex-col gap-2">
                    <label htmlFor="title_en">Titre-EN:</label>
                    <input type="text" className="border" id="title_en" name="title_en"  />
                  </span>
                  <div className="flex flex-col">
                    <label htmlFor="year">Année: </label>
                    <input type="text" className="border w-[30%]" id="year" name="year"  />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <input type="radio" id="illustration" name="illustration" onChange={(e) => {setIllustration("subtitle");}} />
                  </div>
                  <div className='flex gap-2'>
                    <div className="flex flex-col w-[50%]">
                      <label htmlFor="subtitle_fr">Sous-titre-FR:</label>
                      <input type="text" className="border" id="subtitle_fr" name="subtitle_fr"/>
                    </div>
                    <div className="flex flex-col w-[50%]">
                      <label htmlFor="subtitle_en">Sous-titre-EN:</label>
                      <input type="text" className="border" id="subtitle_en" name="subtitle_en"  />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <input type="radio" id="illustration" name="illustration" onChange={(e) => {setIllustration("description");}} />
                  </div>
                  <label htmlFor="description_fr">Contenu-FR:</label>
                  <textarea className="border grow h-[10em]" id="description" name="description_fr" ></textarea>
                  <label htmlFor="description_en">Contenu-EN:</label>
                  <textarea className="border grow h-[10em]" id="description_en" name="description_en"  ></textarea>
                </div>
                <div>
                  {uploadedPhotos.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        {uploadedPhotos.map((photo, index) => (
                            <div className="flex gap-3" key={index}>
                              <span className="underline">{photo[1]}</span>
                              <input type="radio" id="illustration" name="illustration" onChange={(e) => {setIllustration(photo[0]);}} />
                              <button className="text-red-500 cursor-pointer" onClick={() => deleteFromEverywhere(photo[0])}>x</button>
                            </div>
                        ))}
                      </div>
                      <label htmlFor="photos_caption_fr">descriptions des photos FR:</label>
                      <textarea className="border w-full" id="photos_caption_fr" name="photos_caption_fr" ></textarea>
                      <label htmlFor="photos_caption_en">descriptions des photos EN:</label>
                      <textarea className="border w-full" id="photos_caption_en" name="photos_caption_en" ></textarea>
                    </div>
                  )}
                </div>
                <div>
                  <CloudinaryWidget handleUpload={handleUpload} />
                </div>
                <div className="">
                </div>
                <div id="videoInputs" className="flex gap-2">
                  <label htmlFor="video">Url vidéo : </label>
                  <input type="text" className="border" id="video" name="video" />
                </div>
                <label htmlFor="videos_caption_fr">descriptions des vidéos FR:</label>
                <textarea className="border w-full" id="videos_caption_fr" name="videos_caption_fr" ></textarea>
                <label htmlFor="videos_caption_en">descriptions des vidéos EN:</label>
                <textarea className="border w-full" id="videos_caption_en" name="videos_caption_en" ></textarea>
                <div>
                  <button className="border p-1 cursor-pointer" type="button" onClick={addVideo}>Ajouter une vidéo</button>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="border p-1 cursor-pointer" type="submit">Publier</button>
              </div>
            </form>
          </div>
        )
      }

    </>
    )
}
