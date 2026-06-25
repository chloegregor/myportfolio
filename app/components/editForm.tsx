import  CloudinaryWidget  from "./cloudinary_widget";
import {updateWork} from '@/app/actions/works';
import {deletePhotoById, deleteVideoById} from '@/app/actions/photos_videos';
import {useState, useEffect} from "react";

interface Work {
  id: number;
  year: string;
  illustration: string;
  url: string | null;
  photos: { id: number; url: string; titre: string }[];
  videos: { id: number; url: string }[];
  languages: { id: number; type: string; locale: string;
    title: string; subtitle: string | null; description: string | null;
    photos_caption: string | null; videos_caption: string | null
  }[];
}
interface EditFormProps {
  workToEdit: Work;
  onClose: () => void;
}

export function EditForm({ workToEdit, onClose }: EditFormProps ) {
  const work = workToEdit;
  const photos = work.photos;
  const videos = work.videos;

  const [uploadedPhotos, setUploadedPhotos] = useState<[string, string][]>([]);
  const [urlVideos, setUrlVideos] = useState<string[]>([]);
  const [illustration, setIllustration] = useState<string>(work.illustration);





  function handleUpload(urls: [string, string][]){
    setUploadedPhotos((prev) => [...prev, ...urls]);
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

 function deleteFromEverywhere(url: string) {
    setUploadedPhotos(prev => prev.filter(photo => photo[0] !== url));
    setUrlVideos(prev => prev.filter(videoUrl => videoUrl !== url));
  }
   const  handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const form = event.currentTarget;
    const videoInputs = form.querySelectorAll('input[name="video"]');
    videoInputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value.trim() !== '') {
        formData.append('video', input.value);
      }
    });
    formData.append("id", work.id.toString());
    formData.append('fr_id', form.traduction_fr_id.value);
    formData.append('en_id', form.traduction_en_id.value);
    formData.append("urlarticle", (form.urlarticle as HTMLInputElement).value);
    formData.append("title_fr", form.titre_fr.value);
    formData.append("year", form.year.value);
    formData.append("subtitle_fr", form.subtitle_fr.value);
    formData.append("description_fr", form.description_fr.value);
    formData.append("title_en", form.titre_en.value);
    formData.append("subtitle_en", form.subtitle_en.value);
    formData.append("description_en", form.description_en.value);
    formData.append("type", (form.type as HTMLSelectElement).value);
    formData.append("illustration", illustration);
    formData.append("videos_caption_fr", form.videos_caption_fr.value);
    formData.append("videos_caption_en", form.videos_caption_en.value);
    if( photos && photos.length > 0) {

    formData.append("photos_caption_fr", form.photos_caption_fr.value);
    formData.append("photos_caption_en", form.photos_caption_en.value);
    }
    if (uploadedPhotos.length > 0)
      uploadedPhotos.forEach((photo) => {
    formData.append("photosurls", photo[0]);
    formData.append("phototitles", photo[1]);
      if (!photos || photos.length === 0) {
        formData.append("photos_caption_fr", form.photos_caption_fr.value);
        formData.append("photos_caption_en", form.photos_caption_en.value);
      }
      });
    const result = await updateWork(formData);
    if (!result.ok) {
      alert("Erreur lors de la mise à jour du projet.");
      return;
    }
    if (result.ok) {
      setUrlVideos([]);
      form.reset();
      setUploadedPhotos([]);
      onClose();

    }
  }

  return (
    <>

    <div className="fixed overflow-scroll bg-white  p-[1em] inset-0 w-[70%] h-[700px] m-auto shadow-2xl">
      <form onSubmit={handleSubmit}  className="flex flex-col gap-[1em] mt-[1em] relative ">
        <button className="absolute top-0 right-0 z-10 cursor-pointer" onClick={onClose} type="button">Fermer</button>
        <h2 className="text-[2em] text-center">Edition</h2>
        <div className="mt-[2em] flex flex-col gap-[2em]">

          <input type="hidden" name="id" value={work.id} />
          <input type="hidden" name="_method" />
          <input type="hidden" name="traduction_fr_id" value={work.languages.find(lang => lang.locale === 'fr')?.id} />
          <input type="hidden" name="traduction_en_id" value={work.languages.find(lang => lang.locale === 'en')?.id} />
          <div className="flex gap-5">
            <label htmlFor={`type-${work.id}`}>Type: </label>
            <select
              id="type" name="type"
              className="border w-[50%]"
              defaultValue={work.languages.find(lang => lang.locale === 'fr')?.type}
              required
              >
              <option value="react">react / next</option>
              <option value="astro">astro</option>
              <option value="mobile">mobile</option>
              <option value="javascript">js</option>
              <option value ="ruby">ruby</option>
            </select>
            <label className="" htmlFor={`urlarticle-${work.id}`}>lien externe : </label>
            <input
              type="text"
              className="border w-[30%]"
              id={`urlarticle-${work.id}`}
              name="urlarticle"
              defaultValue={work.url ?? '' }
            />
          </div>
          <div className ="flex gap-2">
            <label className="" htmlFor={`title-${work.id}`}>Titre-FR: </label>
            <input
              type="text"
              className="border w-[30%]"
              id={`title-${work.id}`}
              name="titre_fr"
              defaultValue={work.languages.find(lang => lang.locale === 'fr')?.title}
              required
            />
            <label className="" htmlFor={`title-${work.id}`}>Titre-EN: </label>
            <input
              type="text"
              className="border w-[30%]"
              id={`title-${work.id}`}
              name="titre_en"
              defaultValue={work.languages.find(lang => lang.locale === 'en')?.title}

            />
            <label htmlFor="year">Année: </label>
            <input
              type="text"
              className="border w-[20%]"
              id={`year-${work.id}`}
              name="year"
              defaultValue={work.year}
            />
          </div>
          <div>
            <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == "subtitle"} onClick={() => setIllustration("subtitle")} />
            <div className ="flex gap-2">
              <div className="flex flex-col w-[50%]">
                <label htmlFor={`subtitle-${work.id}`}>Sous-titre-FR: </label>
                <textarea
                  className="border"
                  id={`subtitle-${work.id}`}
                  name="subtitle_fr"
                  defaultValue={work.languages.find(lang => lang.locale === 'fr')?.subtitle ?? '' }
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label htmlFor={`subtitle-${work.id}`}>Sous-titre-EN: </label>
                <textarea
                  className="border"
                  id={`subtitle-${work.id}`}
                  name="subtitle_en"
                  defaultValue={work.languages.find(lang => lang.locale === 'en')?.subtitle ?? '' }
              />
              </div>
            </div>
          </div>
          <div>
            <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == "description"} onClick={() => setIllustration('description')}/>
            <div className="flex gap-2">
              <label htmlFor={`description-${work.id}`}>Description-FR:</label>
              </div>
              <textarea
                className="border border w-full h-[10em]"
                id={`description-${work.id}`}
                name="description_fr"
                defaultValue={work.languages.find(lang => lang.locale === 'fr')?.description ?? '' }

              ></textarea>
                <label htmlFor={`description-${work.id}`}>Description-EN:</label>
              <textarea
                className="border border w-full h-[10em]"
                id={`description-${work.id}`}
                name="description_en"
                defaultValue={work.languages.find(lang => lang.locale === 'en')?.description ?? '' }

              ></textarea>
          </div>
          <span>Photos:</span>
          <div className="flex gap-2">
            {photos && photos.length > 0 && (
              <div className="flex flex-col">
                <div className="flex gap-2">
                  {photos.map((photo) => (
                    <div className="flex gap-2" key={photo.id}>
                      <p className="underline">{photo.titre}</p>
                      <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == photo.url} onClick={() => setIllustration(photo.url)} />
                      <button type="button" className="text-red-500"onClick={() => deletePhotoById(photo.id)}>x</button>
                    </div>
                  ))
                  }
                </div>
                <label htmlFor="photos_caption_fr">descriptions des photos FR:</label>
                <textarea className="border w-full" id="photos_caption_fr" name="photos_caption_fr" defaultValue={work.languages.find(lang => lang.locale === 'fr')?.photos_caption ?? ''} ></textarea>
                <label htmlFor="photos_caption_en">descriptions des photos EN:</label>
                <textarea className="border w-full" id="photos_caption_en" name="photos_caption_en" defaultValue={work.languages.find(lang => lang.locale === 'en')?.photos_caption ?? ''} ></textarea>
              </div>
            )}
            {uploadedPhotos.length > 0 && (
              <div className=" ">
                {uploadedPhotos.map((photo, index) => (
                    <div className="flex gap-2" key={index}>
                      <p className="underline">{photo[1]}</p>
                      <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == photo[0]} onClick={()=> setIllustration(photo[0])} />
                    <button type="button" className="text-red-500" onClick={() => deleteFromEverywhere(photo[0])}>x</button>
                    </div>
                ))}
                {photos.length === 0 && (
                  <span>
                      <label htmlFor="photos_caption_fr">descriptions des photos FR:</label>
                      <textarea className="border w-full" id="photos_caption_fr" name="photos_caption_fr" defaultValue={work.languages.find(lang => lang.locale === 'fr')?.photos_caption ?? ''} ></textarea>
                      <label htmlFor="photos_caption_en">descriptions des photos EN:</label>
                      <textarea className="border w-full" id="photos_caption_en" name="photos_caption_en" defaultValue={work.languages.find(lang => lang.locale === 'en')?.photos_caption ?? ''} ></textarea>
                  </span>
                )}
              </div>
            )}
          </div>
          <div>
          <CloudinaryWidget handleUpload={handleUpload} />
          </div>

          {videos && videos.length > 0 && (
            <div>
              <span>Vidéos:</span>
              <div className="flex flex-col gap-2">
                {videos.map((video) => (
                  <div key={video.id} className="flex gap-2">
                    <p>{video.url}</p>
                    <button type="button" className="text-red-500 cursor-pointer" onClick={() => deleteVideoById(video.id)}>x</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div id="videoInputs" className="flex flex-wrap gap-2">
            <label htmlFor="video">Url vidéo</label>
            <input type="text" className="border" id="video" name="video" />
          </div>
            <div>
              <button className="border p-1" type="button" onClick={addVideo}>Ajouter une vidéo</button>
            </div>
          <label htmlFor="videos_caption_fr">descriptions des vidéos FR:</label>
          <textarea className="border w-full" id="videos_caption_fr" name="videos_caption_fr" defaultValue={work.languages.find(lang => lang.locale === 'fr')?.videos_caption ?? ''} ></textarea>
          <label htmlFor="videos_caption_en">descriptions des vidéos EN:</label>
          <textarea className="border w-full" id="videos_caption_en" name="videos_caption_en" defaultValue={work.languages.find(lang => lang.locale === 'en')?.videos_caption ?? ''} ></textarea>
        </div>
        <div className="flex justify-end ">
          <button className="border p-1 cursor-pointer" type="submit">Publier</button>
        </div>
      </form>
    </div>


    </>
  )
}
