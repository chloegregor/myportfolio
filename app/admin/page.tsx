
import {getAllWorks} from "@/app/actions/works";
import {IndexWorks} from "../components/indexWorks";
import {CreateForm} from "../components/createForm";
import {EditProfile} from "@/app/components/editProfile";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Ton instance Better Auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session?.user) {
    redirect('/sign-in');
  }
  const works = await getAllWorks();
  const profile = await prisma.profile.findFirst();

  return (
  <div className="p-5">
    <div className="mb-10 ">
      <h1>Coucou Elo</h1>
    </div>
    <div className="">
      <div className=" h-10 flex gap-4">
        <CreateForm />
        <EditProfile profile={profile} />

      </div>
      <div className="flex-flex-col gap-10 mt-10">
        <div className="flex gap-3 ">
          <p className='py-1'>tel:</p>
          <p className="border py-1 px-2 w-30">{profile?.telephone ?? ''}</p>
          <p className='py-1'>email: </p>
          <p className="border py-1 px-2 w-40 truncate">{profile?.email ?? ''}</p>
          <p className='py-1'>CV: </p>
          <p className="border py-1 px-2 w-50 truncate"> {profile?.cv ? "chargé" : 'absent'} </p>
          <p className='py-1'>portfolio: </p>
          <p className="border py-1 px-2 w-50 truncate"> {profile?.portfolio ? "chargé" : 'absent'} </p>
        </div>
        <IndexWorks works={works} />
      </div>
    </div>
    <a href="
"></a>
  </div>
  );
}
