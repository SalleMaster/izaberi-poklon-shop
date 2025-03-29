'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { recreatePaymentCheckout } from '../_actions/actions'
import { Loader2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { ResponseStatus } from '@/lib/types'

type Props = {
  orderId: string
  label: string
}

export default function RetryPaymentButton({ orderId, label }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRetry = () => {
    startTransition(async () => {
      try {
        const result = await recreatePaymentCheckout({
          orderId,
        })

        if (result.status === ResponseStatus.success) {
          toast.success(result.message)
          router.push(result.redirectUrl)
        } else {
          toast.warning(result.message)
        }
      } catch (err) {
        toast.warning('Došlo je do greške prilikom pokušaja ponovnog plaćanja.')
      }
    })
  }
  return (
    <Button onClick={handleRetry} disabled={isPending}>
      {isPending ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <RefreshCw className='mr-2 h-4 w-4' />
      )}
      {label}
    </Button>
  )
}
