'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectOptionType } from './Combobox'

type MultiComboboxProps = {
  options: SelectOptionType[]
  value: [string, ...string[]]
  setValue: (value: [string, ...string[]]) => void
}

export function MultiCombobox({
  options,
  value,
  setValue,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='flex w-full justify-between'
        >
          <span className='truncate'>
            {value.length
              ? value
                  .map(
                    (item) =>
                      options.find((option) => option.value === item)?.label
                  )
                  .join(', ')
              : 'Selektuj opciju...'}
          </span>
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput placeholder='Pronađi opciju...' />
          <CommandList>
            <CommandEmpty>Opcija nije pronađena.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(
                      value.includes(currentValue)
                        ? (value.filter((item) => item !== currentValue) as [
                            string,
                            ...string[],
                          ])
                        : ([...value, currentValue] as [string, ...string[]])
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
