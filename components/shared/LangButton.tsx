"use client"

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react';
import {useRecoilState} from 'recoil';
import { localeState } from '@/lib/translations/recoilStates';

function LangButton() {
  const { setTheme } = useTheme()
  const [lang, setLang] = useState('English')
  /* const [lang, setLang] = useRecoilState(localeState); */
  

  return (
    <div className="mx-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Image src={`/assets/icons/${lang}.png`} alt={lang} width={24} height={24} />
            <p className='mx-2'>{
              (lang === 'en') ? 'English' : (lang === 'es') ? "Español" : "Français"
            }</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLang("es")}>
            Español
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLang("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLang("fr")}>
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default LangButton;