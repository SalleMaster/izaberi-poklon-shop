'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
import { Input } from '@/components/ui/input'
import { Loader2, Mail } from 'lucide-react'

import { magicLinkSchema, MagicLinkSchemaValues } from './validation'
import { signInWithMagicLink } from '../../_actions/actions'

type Props = {
  callbackUrl: string | null
}

export default function MagicLinkForm({ callbackUrl }: Props) {
  const router = useRouter()

  const form = useForm<MagicLinkSchemaValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
      callbackUrl: callbackUrl || undefined,
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: MagicLinkSchemaValues) {
    try {
      const response = await signInWithMagicLink({ ...values })
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)

          router.push('/auth/verify-request')
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'There was an error. Please try again.',
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input
                  placeholder='john.doe@example.com'
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Ukoliko nemate nalog, kreiraćemo ga automatski.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          variant='outline'
          className='w-full'
        >
          {isSubmitting ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Mail className='mr-2 h-4 w-4' />
          )}
          Prijava / Registracija
        </Button>
      </form>
    </Form>
  )
}
