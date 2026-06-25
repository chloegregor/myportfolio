import prisma from "@/lib/prisma";
import {cache} from "react";

export async function getProfile() {
  const profile = await prisma.profile.findFirst();
  return profile;
}


export const getTraductionsByLocale = cache(async (locale: string) =>  {
    const traductions = await prisma.language.findMany({
      where: { locale: locale },
      select: {
        id: true,
        type: true,
        slug: true,
        locale : true,
        title: true,
        subtitle: true,
        description: true,
        photos_caption: true,
        videos_caption: true,
        work: {
          select: {

            placement_x: true,
            placement_y: true,
            illustration: true,


          }
        }


      }
    });
    return traductions;
});

export const  getTraductionBySlugAndLocale = cache(async (slug: string, locale: string) => {
    const traduction = await prisma.language.findFirst({
      where: {
        slug: slug,
        locale: locale
      },
      select: {
         id: true,
        type: true,
        title: true,
        subtitle: true,
        description: true,
        photos_caption: true,
        videos_caption: true,
        workId: true,
        work: {
          select: {
            year: true,
            url: true,
            photos: {
              select: {
                url: true,
                titre: true,
                id: true
              }
            },
            videos: {
              select: {
                url: true,
                id: true,
                thumbnail: true
              }
            }
          }
        }
      }
    });
    if (traduction) {

      const next_trad = await prisma.language.findFirst({
        where: {
          locale: locale,
          type: traduction.type,
          id: {
            gt: traduction.id
          },
        },
        orderBy: { id: 'asc' },
        select: {
          slug: true
        }

      })
      const prev_trad = await prisma.language.findFirst({
        where: {
          locale: locale,
          type:traduction.type,
          id: {
            lt: traduction.id
          }
        },
        orderBy: { id: 'desc' },
        select: {
          slug: true
        }
      })
      return {traduction: traduction, next_trad: next_trad?.slug, prev_trad: prev_trad?.slug};
    }
    return null;
  });

  export async function getAllTraductions() {
    const traductions = await prisma.language.findMany(
      {
        include: { work: {
          include: { photos: true, videos: true
        } }
      }
    }
    );
    return traductions;
  }

  export async function getAllTraductionsByType(type: string) {
    const traductions = await prisma.language.findMany(
      {
        where: { type: type },
        include: { work: {
          include: { photos: true, videos: true
        } }
      }
    }
    );
    return traductions;
  }

    export async function getAllTraductionsRoutes () {
    const traductions = await getAllTraductions();
    const routing_infos = traductions.map((trad: { locale: string; slug: string }) => ({
      locale: trad.locale,
      slug: trad.slug
    }))
    return routing_infos;
  }
