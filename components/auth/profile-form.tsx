"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { countries, supportedLanguages } from "@/constants"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAction } from "@/hooks/useAction"
import { createProfile } from "@/lib/server/actions/profile/create"
import { toast } from "sonner"
import { ProfileZodSchema } from "@/lib/server/actions/profile/create/schema"
import { z } from "zod"
export interface ProfileFormData {
    username: string
    country: string
    language: string
    isPublic: boolean
  }
  

export default function ProfileForm() {

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<ProfileFormData>({
    defaultValues: {
      username: "",
      country: "",
      language: "",
      isPublic: false,
    },
  })

  const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createProfile, {
    onSuccess: (data) => {
      toast.success('Profile created successfully!');
    },
    onError: (error) => {
      toast.error(`Error while creating profile: ${error}`);
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

//TODO FIX COLORS, CHECK DUPLICATED USERNAMES & SEND DATA

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field}/>
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? countries.find((country) => country.code === field.value)?.name
                        : "Select country"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            value={country.name}
                            key={country.code}
                            onSelect={() => {
                              form.setValue("country", country.code)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.code === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Select your country of residence.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? supportedLanguages.find((language) => language.code === field.value)?.name
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {supportedLanguages.map((language) => (
                          <CommandItem
                            value={language.name}
                            key={language.code}
                            onSelect={() => {
                              form.setValue("language", language.code)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.code === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {language.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Choose your preferred language.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Public Profile</FormLabel>
                <FormDescription>Make your profile visible to everyone.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} className="text-white"/>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-center">
        <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}

