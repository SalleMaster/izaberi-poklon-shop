'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { recreatePaymentCheckout } from '../_actions/actions'
import { Loader2, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { RequestStatus } from '@/lib/types'

type Props = {
  orderId: string
}

export default function RetryPaymentButton({ orderId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleRetry = () => {
    startTransition(async () => {
      try {
        const result = await recreatePaymentCheckout({
          orderId,
        })

        if (result.status === RequestStatus.success) {
          toast({ description: result.message })
          router.push(result.redirectUrl)
        } else {
          toast({
            variant: 'destructive',
            description: result.message,
          })
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          description:
            'Došlo je do greške prilikom pokušaja ponovnog plaćanja.',
        })
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
      Pokušaj ponovo
    </Button>
  )
}
