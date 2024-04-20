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

function LangButton() {
  const { setTheme } = useTheme()
  const [lang, setLang] = useState('English')

  return (
    <div className="mx-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Image src={`/assets/icons/${lang}.png`} alt={lang} width={24} height={24} />
            <p className='mx-2'>{lang}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLang("Español")}>
            Español
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLang("English")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLang("Français")}>
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default LangButton;