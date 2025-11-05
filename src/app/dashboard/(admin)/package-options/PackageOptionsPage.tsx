import { NotificationAlert } from '@/components/custom/NotificationAlert'
import PackageOptionCard, {
  PackageOptionCardSkeleton,
} from './_components/PackageOptionCard'
import { getPackageOptions } from '@/data/services/packageOptions'
import { Separator } from '@/components/ui/separator'

export default async function PackageOptionsPage() {
  const packageOptions = await getPackageOptions()

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Poklon pakovanja</h2>

      <Separator />
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
    </div>
  )
}

export function PackageOptionsPageSkeleton() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Poklon pakovanja</h2>

      <Separator />
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
    </div>
  )
}
