'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {createTraduction} from '@/app/actions/traductions';
import {updateTraduction} from '@/app/actions/traductions';


export async function getAllWorks() {
    const works = await prisma.work.findMany({include: {photos: true, videos: true, languages: true}});
    return works;
}

export async function getWorkById(id: number) {
    const work = await prisma.work.findUnique({
      where: { id: id },
      include: { photos: true, videos: true },
    });
    return work;
}

export async function createWork(formData: FormData) {
    const type = formData.get('type') as string;
    const urlarticle = formData.get('urlarticle') as string;
    const year = formData.get('year') as string;
    const title_fr =formData.get('titre_fr') as string;
    const title_en =formData.get('titre_en') as string;
    const subtitle_fr =formData.get('subtitle_fr') as string;
    const subtitle_en =formData.get('subtitle_en') as string;
    const description_fr = formData.get('description_fr') as string;
    const description_en = formData.get('description_en') as string;
    const photosurls = formData.getAll('photosurls') as string[];
    const phototitles = formData.getAll('phototitles') as string[];
    const videos = formData.getAll('video') as string[];
    const illustration = formData.get('illustration') as string;
    const photos_captions_fr = formData.get('photos_caption_fr') as string;
    const photos_captions_en = formData.get('photos_caption_en') as string;
    const videos_captions_fr = formData.get('videos_caption_fr') as string;
    const videos_captions_en = formData.get('videos_caption_en') as string;


    const position = ["start", "center", "end"];
    const placement_x = position[Math.floor(Math.random() * position.length)];
    const placement_y = position[Math.floor(Math.random() * position.length)];

    async function fetchThumbnail(url:string) {
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=${(url)}`);
     const data = await response.json();
     const thumbnail_url = data.thumbnail_url_with_play_button;
     return thumbnail_url;
   }

   const videoWithThumbnails = await Promise.all(videos.map(async (url) => ({
      url: url,
      thumbnail: await fetchThumbnail(url)
   })));

   const work = await prisma.work.create({
      data: {
        year: year,
        illustration: illustration,
        placement_x: placement_x,
        placement_y: placement_y,
        url: urlarticle,
        photos: {
          create : photosurls.map((url) => ({ url: url, titre: phototitles[photosurls.indexOf(url)] })),
        },
        videos: {
          create : videoWithThumbnails,
        }
      }
    }
    );

    const type_en = type === "Performances" ? "Performances" :
                    type === "Expositions" ? "Exhibitions" :
                    type === "Workshops" ? "Workshops" :
                    type === "Presse" ? "Press" :
                    type === "Publications" ? "Publications" : type;


    await createTraduction( type, title_fr, subtitle_fr, description_fr, 'fr', photos_captions_fr, videos_captions_fr, work.id);
    await createTraduction( type_en, title_en, subtitle_en, description_en, 'en', photos_captions_en, videos_captions_en, work.id);

    revalidatePath('/admin/works');
    return { ok: true};
  }

export async function updateWork(formData: FormData) {
    const id = Number(formData.get('id'));
    const type = formData.get('type') as string;
    const urlarticle = formData.get('urlarticle') as string;
    const year = formData.get('year') as string;
    const fr_id = Number(formData.get('fr_id'));
    const en_id = Number(formData.get('en_id'));
    const title_fr =formData.get('title_fr') as string;
    const title_en =formData.get('title_en') as string;
    const subtitle_fr =formData.get('subtitle_fr') as string;
    const subtitle_en =formData.get('subtitle_en') as string;
    const description_fr = formData.get('description_fr') as string;
    const description_en = formData.get('description_en') as string;
    const photosurls = formData.getAll('photosurls') as string[];
    const phototitles = formData.getAll('phototitles') as string[];
    const videos = formData.getAll('video') as string[];
    const illustration = formData.get('illustration') as string;
    const photos_captions_fr = formData.get('photos_caption_fr') as string;
    const photos_captions_en = formData.get('photos_caption_en') as string;
    const videos_captions_fr = formData.get('videos_caption_fr') as string;
    const videos_captions_en = formData.get('videos_caption_en') as string;

    async function fetchThumbnail(url:string) {
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=${(url)}`);
     const data = await response.json();
     const thumbnail_url = data.thumbnail_url_with_play_button;
     return thumbnail_url;
   }

   const videoWithThumbnails = await Promise.all(videos.map(async (url) => ({
      url: url,
      thumbnail: await fetchThumbnail(url)
   })));



    await prisma.work.update({
      where: { id: id },
      data: {
        year: year,
        illustration: illustration,
        url: urlarticle,
        photos: {
          create : photosurls.map((url) => ({ url: url, titre: phototitles[photosurls.indexOf(url)] })),
        },
        videos: {
          create : videoWithThumbnails
        }
      },
    });

    const type_en = type === "Performances" ? "Performances" :
                    type === "Expositions" ? "Exhibitions" :
                    type === "Workshops" ? "Workshops" :
                    type === "Presse" ? "Press" :
                    type === "Publications" ? "Publications" : type;

    await updateTraduction(type, fr_id, title_fr, subtitle_fr, description_fr, photos_captions_fr, videos_captions_fr);
    if(en_id){
      await updateTraduction(type_en, en_id, title_en, subtitle_en, description_en, photos_captions_en, videos_captions_en);
    }else{
      await createTraduction( type_en, title_en, subtitle_en, description_en, 'en', photos_captions_en, videos_captions_en, id);

    }

    revalidatePath('/admin/works');
    return { ok: true};
}

export async function deleteWorkById(id: number) {
    await prisma.work.delete({
      where: { id: id },
    });
    revalidatePath('/admin/works');
    return { ok: true};
}
