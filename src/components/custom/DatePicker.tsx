'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl } from '../ui/form'
import { SelectSingleEventHandler } from 'react-day-picker'

type DatePickerProps = {
  fieldValue: Date
  fieldOnChange: SelectSingleEventHandler
}

export function DatePicker({ fieldValue, fieldOnChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left',
              !fieldValue && 'text-muted-foreground'
            )}
          >
            {fieldValue ? (
              format(fieldValue, 'Pp', { locale: srLatn })
            ) : (
              <span>Izaberi datum</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={fieldValue}
          onSelect={fieldOnChange}
          locale={srLatn}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
