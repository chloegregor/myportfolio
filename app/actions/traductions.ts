'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

type Language = {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  locale: string;
  slug: string;
  photos_caption: string;
  videos_caption: string;
  work: {
    year: string;
    url: string;
    illustration: string;
    placement_x: string;
    placement_y: string;
    photos: {
      url: string;
      titre: string;
      id: number;
    }[];
    videos: {
      url: string;
      id: number;
    }[];
  }
}


export async function getTraductionById(id: number) {
    const traduction = await prisma.language.findUnique({
      where: { id: id },
      include: { work: {
        include: { photos: true, videos: true
      } }
    }
    });
    return traduction;
}


export async function createTraduction(type: string, title: string, subtitle: string, description: string, locale: string, photos_caption: string, videos_caption: string, workId: number) {
    if (!title) {
      return
    }

    const slug = slugify(title, { lower: true, strict: true });

     await prisma.language.create({
      data: {
        locale: locale,
        type: type,
        title: title,
        photos_caption: photos_caption,
        videos_caption: videos_caption,
        slug : slug,
        subtitle: subtitle,
        description: description,
        work: { connect: { id: workId } }
      }
  })
    revalidatePath('/admin');
    return { ok: true};
  }

export async function updateTraduction(type: string, id: number, title: string, subtitle: string, description: string, photos_caption: string, videos_caption: string) {
    if (id === 0) {
      return
    }
    const slug = slugify(title, { lower: true, strict: true });

    await prisma.language.update({
      where: { id: id },
      data: {
        type: type,
        title: title,
        subtitle: subtitle,
        description: description,
        slug : slug,
        photos_caption: photos_caption,
        videos_caption: videos_caption,
      }
    });
    revalidatePath('/admin');
    return { ok: true};
}
