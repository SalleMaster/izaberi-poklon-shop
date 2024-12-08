'use client'

import {
  use,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from 'react'
import { GetCartReturnType } from '@/data/services/cart'
import {
  removeCartItem,
  removeCartItemType,
  updateCartItem,
  updateCartItemType,
} from '@/app/(shop)/_actions/cart/actions'
import CartTable, {
  CartTableSkeleton,
} from './_components/cart-table/CartTable'
import CartOverview, {
  CartOverviewSkeleton,
} from './_components/cart-overview/CartOverview'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import {
  CartCouponForm,
  CartCouponFormSkeleton,
} from './_components/cart-coupon-form/CartCouponForm'
import { CartOrderForm } from './_components/cart-order-form/CartOrderForm'
import { GetUserAddressesReturnType } from '@/data/services/user'
import { OrderDeliveryType, OrderPaymentType } from '@prisma/client'
import { FieldName, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  cartOrderSchema,
  CartOrderValues,
} from './_components/cart-order-form/validation'
import { cartCreateOrder } from '../_actions/order/actions'

const steps = [
  {
    id: 'step-1',
    name: 'Korpa',
  },
  {
    id: 'step-2',
    name: 'Način i adresa isporuke',
    fields: [
      'deliveryType',
      'selectedDeliveryAddressId',
      'pickupName',
      'pickupPhone',
      'pickupEmail',
    ],
  },
  {
    id: 'step-3',
    name: 'Plaćanje i adresa računa',
    fields: ['paymentType'],
  },
  {
    id: 'step-4',
    name: 'Pregled porudžbine',
  },
]

type Props = {
  cartPromise: GetCartReturnType
  userAddressesPromise: GetUserAddressesReturnType
}

export default function CartPage({ cartPromise, userAddressesPromise }: Props) {
  const cart = use(cartPromise)
  const userAddresses = use(userAddressesPromise)
  const [isPending, startTransition] = useTransition()
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart)
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)

  const defaultValues = useMemo(
    () => ({
      deliveryType: OrderDeliveryType.delivery,
      paymentType: OrderPaymentType.card,
      selectedDeliveryAddressId: userAddresses[0]?.id,
      selectedBillingAddressId: '',
      pickupName: '',
      pickupPhone: '',
      pickupEmail: '',
    }),
    []
  )

  const form = useForm<CartOrderValues>({
    resolver: zodResolver(cartOrderSchema),
    defaultValues,
  })

  const { reset, trigger } = form

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName<CartOrderValues>[], {
      shouldFocus: true,
    })

    if (!output) {
      return
    }

    console.log(currentStep, steps.length)

    if (currentStep < steps.length) {
      if (currentStep === steps.length - 1) {
        return form.handleSubmit(onSubmit)()
      }
      setCurrentStep((prev) => prev + 1)
    }

    // if (currentStep < steps.length - 1) {
    //   if (currentStep === steps.length - 2) {
    //     return form.handleSubmit(onSubmit)()
    //   }
    //   setCurrentStep((prev) => prev + 1)
    // }
  }

  async function onSubmit(data: CartOrderValues) {
    try {
      const response = await cartCreateOrder(data)
      startTransition(() => {})
      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }
        if (response.status === 'success') {
          toast({ description: response.message })
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške. Molimo pokušajte ponovo.',
      })
    } finally {
      setCurrentStep(0)
    }
  }

  // Use useEffect to reset the form when the product prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const updateCartItemHandler = async ({
    id,
    quantity,
  }: updateCartItemType) => {
    try {
      if (optimisticCart) {
        startTransition(() => {
          setOptimisticCart({
            ...optimisticCart,
            items: optimisticCart.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        })
      }

      const response = await updateCartItem({ id, quantity })

      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }

        if (response.status === 'success') {
          toast({ description: response.message })
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške. Molimo pokušajte ponovo.',
      })
    }
  }

  const removeCartItemHandler = async ({ id }: removeCartItemType) => {
    try {
      if (optimisticCart) {
        startTransition(() => {
          setOptimisticCart({
            ...optimisticCart,
            items: optimisticCart.items.filter((item) => item.id !== id),
          })
        })
      }

      const response = await removeCartItem({ id })
      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }

        if (response.status === 'success') {
          toast({ description: response.message })
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške. Molimo pokušajte ponovo.',
      })
    }
  }

  return (
    <div
      className={cn(
        'grid gap-6 lg:grid-cols-cart',
        isPending && 'animate-pulse'
      )}
    >
      <h3 className='lg:col-span-2'>{steps[currentStep].name}</h3>
      <div className='mb-auto'>
        {currentStep === 0 ? (
          <CartTable
            optimisticCart={optimisticCart}
            updateCartItemHandler={updateCartItemHandler}
            removeCartItemHandler={removeCartItemHandler}
            disabled={isPending}
          />
        ) : (
          <CartOrderForm
            userAddresses={userAddresses}
            form={form}
            currentStep={currentStep}
            optimisticCart={optimisticCart}
            onSubmit={onSubmit}
          />
        )}
      </div>
      <div className='mb-auto space-y-6'>
        <CartOverview
          onlinePrice={optimisticCart?.onlinePrice}
          totalPrice={optimisticCart?.totalPrice}
          discount={optimisticCart?.discount}
          disabled={isPending || optimisticCart?.items.length === 0}
          isSubmitting={form.formState.isSubmitting}
          next={next}
        />
        <CartCouponForm
          disabled={
            isPending ||
            optimisticCart?.items.length === 0 ||
            form.formState.isSubmitting
          }
          appliedCoupon={optimisticCart?.coupon?.code}
          startTransition={startTransition}
        />
      </div>
    </div>
  )
}

export function CartPageSkeleton() {
  return (
    <div className='grid gap-6 lg:grid-cols-cart'>
      <div className='mb-auto'>
        <CartTableSkeleton />
      </div>
      <div className='mb-auto space-y-6'>
        <CartOverviewSkeleton />
        <CartCouponFormSkeleton />
      </div>
    </div>
  )
}
