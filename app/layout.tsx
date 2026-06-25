// app/layout.tsx
// CE FICHIER EST STATIQUE ET GÈRE L'ENVELOPPE GLOBALE ET LES BOUTONS DE LANGUE.
import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Mulish, Noto_Sans_Kannada } from 'next/font/google';




export const metadata: Metadata = {
  title: "Chloé Grégoire | web developpement",
  description: "développeuse web front-end",
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-mulish',
});

const notoSansKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '700', '100','300', '200'],
  variable: '--font-noto-sans-kannada',
});

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html className={`${dmSans.variable} ${mulish.variable} ${notoSansKannada.variable}`} lang="fr">
      <body
        className={`antialiased flex flex-col `}
      >
        <div className="flex-1 ">
          {children}
        </div>
        <footer>
          <div className=" w-full text-end">
            <p className="text-sm "></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
