import { DeliveryAddressForm } from '@/app/dashboard/(user)/delivery-address/_components/DeliveryAddressForm'
import { Button } from '@/components/ui/button'
import { DeliveryAddress, DeliveryAddressType } from '@/generated/prisma'
import { Pencil, Plus } from 'lucide-react'
import { TransitionStartFunction, useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  selectedAddress: DeliveryAddress | undefined
  deliveryAddressType: DeliveryAddressType
  startTransition: TransitionStartFunction
}

export default function CartOrderAddress({
  selectedAddress,
  deliveryAddressType,
  startTransition,
}: Props) {
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const toggleAddressForm = ({ isEditing }: { isEditing: boolean }) => {
    setShowAddressForm((prev) => !prev)
    setIsEditing(isEditing)
  }

  useEffect(() => {
    setShowAddressForm(false)
  }, [selectedAddress])

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='space-y-2.5'>
          <h1>Dostava će biti izvršena na ovu adresu</h1>
          <div className='flex gap-4 rounded-xl border p-4'>
            <div>
              {!selectedAddress ? (
                <p className='text-muted-foreground'>
                  Adresa nije selektovana. Selektujte željenu adresu ili
                  kreirajte novu.
                </p>
              ) : null}
              <p className='text-muted-foreground'>{selectedAddress?.name}</p>
              <p className='text-muted-foreground'>
                {selectedAddress?.address}
              </p>
              <p className='text-muted-foreground'>
                {selectedAddress?.zip} {selectedAddress?.city}
              </p>
              <p className='text-muted-foreground'>{selectedAddress?.phone}</p>
              <p className='text-muted-foreground'>{selectedAddress?.email}</p>
              {selectedAddress?.note ? (
                <p className='text-muted-foreground'>
                  Napomena: {selectedAddress.note}
                </p>
              ) : null}
            </div>

            <Button
              type='button'
              variant='outline'
              size='icon'
              className='mt-auto ml-auto'
              disabled={!selectedAddress}
              onClick={() => toggleAddressForm({ isEditing: true })}
            >
              <Pencil />
            </Button>
          </div>
          <div className='flex'>
            <Button
              type='button'
              variant='secondary'
              className='ml-auto'
              onClick={() => toggleAddressForm({ isEditing: false })}
            >
              <Plus className='mr-2 h-4 w-4' /> Kreiraj novu adresu
            </Button>
          </div>
          {showAddressForm ? (
            <DeliveryAddressForm
              deliveryAddress={isEditing ? selectedAddress : null}
              deliveryAddressType={deliveryAddressType}
              startTransition={startTransition}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
