import { CreditCard, HandCoins, CheckCheck, Clock, Brush } from 'lucide-react'

export default function Benefits() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4 text-xs text-center justify-evenly'>
      <div className='flex flex-col gap-2 items-center'>
        <CreditCard className='w-10 h-10' />
        <p>Online plaćanje karticama</p>
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <HandCoins className='w-10 h-10' />
        <p>Plaćanje pouzećem</p>
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <CheckCheck className='w-10 h-10' />
        <p>Garancija kvaliteta</p>
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <Clock className='w-10 h-10' />
        <p>Rok izrade 3 - 5 dana</p>
      </div>
      <div className='col-span-2 md:col-span-1 flex flex-col gap-2 items-center'>
        <Brush className='w-10 h-10' />
        <p>Mogućnost maksimalne personalizacije</p>
      </div>
    </div>
  )
}
