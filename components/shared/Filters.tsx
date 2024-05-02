"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { movieFilters } from "@/constants"

const Filters = ({typeOfFilter, value, setValue} : any) => {
  const [open, setOpen] = React.useState(false)
  // [value, setValue] = React.useState("")
  let filters: typeof movieFilters = movieFilters;

  if (typeOfFilter === 'movies') {
    filters = movieFilters;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? filters.find((filt) => filt.value === value)?.label
            : "Select list..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search list..." />
          <CommandEmpty>No list found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {filters.map((filt) => (
              <CommandItem
                key={filt.value}
                value={filt.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === filt.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {filt.label}
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Filters;
