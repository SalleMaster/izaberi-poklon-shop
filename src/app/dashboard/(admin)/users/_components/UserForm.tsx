'use client'

import { useMemo, useEffect, TransitionStartFunction } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UserRoleType } from '@/generated/prisma/enums'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Save } from 'lucide-react'
import { userSchema, UserValues } from './validation'
import { editUser } from '../_actions/actions'
import { Combobox } from '@/components/custom/Combobox'
import { ResponseStatus } from '@/lib/types'

type Props = {
  role: UserRoleType
  id: string
  startTransition: TransitionStartFunction
}

export function UserForm({ role, id, startTransition }: Props) {
  const defaultValues = useMemo(
    () => ({
      id,
      role,
    }),
    [id, role],
  )

  const form = useForm<UserValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: UserValues) {
    try {
      const response = await editUser(data)
      startTransition(() => {})
      if (response) {
        if (response.status === ResponseStatus.fail) {
          return toast.warning(response.message)
        }

        if (response.status === ResponseStatus.success) {
          toast.success(response.message)
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.',
      )
    }
  }

  // Use useEffect to reset the form when the prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormField
          control={form.control}
          name={'role'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rola</FormLabel>
              <FormControl>
                <Combobox
                  options={[
                    { value: UserRoleType.admin, label: 'Admin' },
                    { value: UserRoleType.user, label: 'Korisnik' },
                  ]}
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>Izaberite rolu korisnika</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex'>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='ml-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            Sačuvaj
          </Button>
        </div>
      </form>
    </Form>
  )
}
