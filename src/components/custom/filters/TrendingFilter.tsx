'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'
import useCreateQueryString from '@/hooks/use-create-query-string'
import { Switch } from '@/components/ui/switch'

export default function TrendingFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const [optimisticTrending, setOptimisticTrending] = useOptimistic(
    searchParams.get('aktuelno')
  )

  const createQueryString = useCreateQueryString(searchParams)

  let trending

  switch (optimisticTrending) {
    case 'da':
      trending = true
      break
    case 'ne':
      trending = false
      break
    default:
      trending = false
  }

  const handleTrendingChange = (checked: boolean) => {
    startTransition(() => {
      setOptimisticTrending(checked ? 'da' : 'ne')
    })
    router.push(
      `${pathname}?${createQueryString({
        addParams: [{ name: 'aktuelno', value: checked ? 'da' : 'ne' }],
        removeParams: ['stranica'],
      })}`
    )
  }

  return (
    <div
      data-pending-products={isPending ? '' : undefined}
      className='flex items-center'
    >
      <span className='mr-2'>Samo aktuelno:</span>
      <Switch
        checked={trending}
        onCheckedChange={handleTrendingChange}
        aria-label='trending-switch'
      />
    </div>
  )
}
