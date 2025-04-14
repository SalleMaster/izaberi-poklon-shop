import prisma from '@/lib/db'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import PackageOptionCard, {
  PackageOptionCardSkeleton,
} from './_components/PackageOptionCard'
import { GetPackageOptionsReturnType } from '@/data/services/packageOptions'
import { use } from 'react'

type Props = {
  packageOptionsPromise: GetPackageOptionsReturnType
}

export default function PackageOptionsPage({ packageOptionsPromise }: Props) {
  const packageOptions = use(packageOptionsPromise)

  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novo</h2>
        <PackageOptionCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Kreirana</h2>
        {packageOptions.length > 0 ? (
          packageOptions.map((packageOption) => (
            <PackageOptionCard
              key={packageOption.id}
              packageOption={packageOption}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema kreiranih poklon pakovanja.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function PackageOptionsPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novo</h2>
        <PackageOptionCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Kreirana</h2>
        <PackageOptionCardSkeleton />
        <PackageOptionCardSkeleton />
        <PackageOptionCardSkeleton />
      </div>
    </div>
  )
}
