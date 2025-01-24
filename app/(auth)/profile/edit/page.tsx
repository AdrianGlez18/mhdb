"use client"

import ProfileForm from "@/components/auth/profile-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { countries, supportedLanguages } from "@/constants";
import { useAction } from "@/hooks/useAction";
import { createProfile } from "@/lib/server/actions/profile/create";
import { ProfileZodSchema } from "@/lib/server/actions/profile/create/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Badge, Check, ChevronsUpDown, Command } from "lucide-react";
import Image from "next/image"
import router, { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EditProfilePage = () => {

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const form = useForm<z.infer<typeof ProfileZodSchema>>({
    resolver: zodResolver(ProfileZodSchema),
    defaultValues: {
      username: "",
      country: "US",
      language: "en",
      isPublic: false
    }
  })

  const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createProfile, {
    onSuccess: (data) => {
      toast.success('Profile created successfully!');
    },
    onError: () => {
      toast.error("Error while creating profile");
    }
  });

  async function onSubmit(data: z.infer<typeof ProfileZodSchema>) {
    console.log("onSubmit")
    setIsSubmitting(true)


    const newProfile = {
      username: data.username,
      country: data.country,
      language: data.language,
      isPublic: data.isPublic
    }

    const result = await executeCreate(newProfile)

    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/collection")
    }, 150)
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col p-4 items-center justify-center w-full max-w-md rounded-3xl z-30 bg-black/80 min-h-[70vh] mx-2 lg:mx-4">
        <Image src="/images/logo-header.png" alt="MHDB" width={150} height={750} />
        <h1 className="text-2xl font-semibold text-white my-6 text-center">
          Complete your profile to make your experience with MHDB even smoother!
        </h1>

        <ScrollArea className="w-full whitespace-nowrap rounded-lg h-72">
        <ProfileForm />
        </ScrollArea>
      </div>
    </div>
  )
}

export default EditProfilePage