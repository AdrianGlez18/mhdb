import ProfileForm from "@/components/auth/profile-form";
import ThemeButton from "@/components/shared/theme-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image"

const EditProfilePage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col p-4 items-center justify-center w-full max-w-md rounded-3xl z-30 bg-background/80 min-h-[70vh] mx-2 lg:mx-4">
        <ThemeButton />
        <Image src="/images/logo-header.png" alt="MHDB" width={100} height={50} />
        <h1 className="text-2xl font-semibold text-foreground my-6 text-center">
          Complete your profile!
        </h1>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg h-72">
          <ProfileForm />
        </ScrollArea>
      </div>
    </div>
  )
}

export default EditProfilePage