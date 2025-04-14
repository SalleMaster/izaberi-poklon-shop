'use client'

import {
  use,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from 'react'
import { useRouter } from 'next/navigation'
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
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  CartCouponForm,
  CartCouponFormSkeleton,
} from './_components/cart-coupon-form/CartCouponForm'
import { CartOrderForm } from './_components/cart-order-form/CartOrderForm'
import { GetUserAddressesReturnType } from '@/data/services/user'
import {
  DeliveryAddressType,
  OrderDeliveryType,
  OrderPaymentType,
} from '@prisma/client'
import { FieldName, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  cartOrderSchema,
  CartOrderValues,
} from './_components/cart-order-form/validation'
import { cartCreateOrder } from '../_actions/order/actions'
import CartOrderAddress from './_components/cart-order-address/CartOrderAddress'
import CartOrderSummary from './_components/cart-order-summary/CartOrderSummary'
import CartOrderSteps, {
  CartOrderStepsSkeleton,
} from './_components/cart-order-steps/CartOrderSteps'
import { orderSteps } from '@/lib/consts'
import { GetDeliveryServicesReturnType } from '@/data/services/delivery-services'

type Props = {
  cartPromise: GetCartReturnType
  userAddressesPromise: GetUserAddressesReturnType
  deliveryServicesPromise: GetDeliveryServicesReturnType
  userName: string
  userEmail: string
  userPhone: string
}

export default function CartPage({
  cartPromise,
  userAddressesPromise,
  deliveryServicesPromise,
  userName,
  userEmail,
  userPhone,
}: Props) {
  const cart = use(cartPromise)
  const userAddresses = use(userAddressesPromise)
  const deliveryServices = use(deliveryServicesPromise)
  const [isPending, startTransition] = useTransition()
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart)
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      deliveryType: OrderDeliveryType.delivery,
      paymentType: OrderPaymentType.card,
      selectedDeliveryAddressId:
        userAddresses.filter(
          (address) => address.type === DeliveryAddressType.delivery
        )[0]?.id || '',
      selectedBillingAddressId:
        userAddresses.filter(
          (address) => address.type === DeliveryAddressType.billing
        )[0]?.id ||
        userAddresses.filter(
          (address) => address.type === DeliveryAddressType.delivery
        )[0]?.id ||
        '',
      selectedDeliveryServiceId:
        deliveryServices.find((service) => service.predefinedPrices)?.id ||
        deliveryServices[0]?.id ||
        '',
      pickupName: userName,
      pickupPhone: userPhone,
      pickupEmail: userEmail,
      termsAccepted: false,
    }),
    [userAddresses, deliveryServices, userEmail, userName, userPhone]
  )

  const form = useForm<CartOrderValues>({
    resolver: zodResolver(cartOrderSchema),
    defaultValues,
  })

  const { reset, trigger } = form

  const selectedDeliveryAddress = userAddresses.find(
    (address) => address.id === form.watch('selectedDeliveryAddressId')
  )
  const selectedBillingAddress = userAddresses.find(
    (address) => address.id === form.watch('selectedBillingAddressId')
  )

  const selectedDeliveryService = deliveryServices.find(
    (service) => service.id === form.watch('selectedDeliveryServiceId')
  )

  const next = async () => {
    const fields = orderSteps[currentStep].fields
    if (fields) {
      const output = await trigger(fields as FieldName<CartOrderValues>[], {
        shouldFocus: true,
      })

      if (!output) {
        return
      }
    }

    // Scroll page to the top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (currentStep < orderSteps.length) {
      if (currentStep === orderSteps.length - 1) {
        return form.handleSubmit(onSubmit)()
      }
      setCurrentStep((prev) => prev + 1)
    }
  }

  async function onSubmit(data: CartOrderValues) {
    try {
      const response = await cartCreateOrder(data)
      startTransition(() => {})
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }
        if (response.status === 'success') {
          toast.success(response.message)
          router.push(response.redirectUrl)
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.'
      )
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
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.'
      )
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
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.'
      )
    }
  }

  return (
    <div
      className={cn(
        'grid gap-6 lg:grid-cols-cart',
        isPending && 'animate-pulse'
      )}
    >
      <div className='mx-auto lg:col-span-2'>
        <CartOrderSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div className='mb-auto'>
        {currentStep === 0 ? (
          <CartTable
            optimisticCart={optimisticCart}
            updateCartItemHandler={updateCartItemHandler}
            removeCartItemHandler={removeCartItemHandler}
            disabled={isPending}
          />
        ) : (
          <>
            <div className='space-y-6'>
              <CartOrderForm
                userAddresses={userAddresses}
                deliveryServices={deliveryServices}
                selectedDeliveryService={selectedDeliveryService}
                deliveryFee={optimisticCart?.deliveryFee}
                form={form}
                currentStep={currentStep}
                onSubmit={onSubmit}
              />
              {currentStep === 1 &&
              form.watch('deliveryType') === OrderDeliveryType.delivery ? (
                <CartOrderAddress
                  selectedAddress={selectedDeliveryAddress}
                  startTransition={startTransition}
                  deliveryAddressType={DeliveryAddressType.delivery}
                />
              ) : null}
              {currentStep === 2 &&
              form.watch('deliveryType') === OrderDeliveryType.delivery ? (
                <CartOrderAddress
                  selectedAddress={selectedBillingAddress}
                  startTransition={startTransition}
                  deliveryAddressType={DeliveryAddressType.billing}
                />
              ) : null}
            </div>
            {currentStep === 3 ? (
              <CartOrderSummary
                paymentType={form.watch('paymentType')}
                deliveryType={form.watch('deliveryType')}
                selectedDeliveryAddressId={form.watch(
                  'selectedDeliveryAddressId'
                )}
                selectedBillingAddressId={form.watch(
                  'selectedBillingAddressId'
                )}
                pickupName={form.watch('pickupName')}
                pickupPhone={form.watch('pickupPhone')}
                pickupEmail={form.watch('pickupEmail')}
                selectedDeliveryService={
                  form.watch('deliveryType') === OrderDeliveryType.delivery &&
                  selectedDeliveryService
                    ? selectedDeliveryService
                    : null
                }
                userAddresses={userAddresses}
                optimisticCart={optimisticCart}
              />
            ) : null}
          </>
        )}
      </div>
      <div className='mb-auto space-y-6'>
        <CartOverview
          onlinePrice={optimisticCart?.onlinePrice}
          totalPrice={optimisticCart?.totalPrice}
          deliveryFee={optimisticCart?.deliveryFee}
          totalPriceWithDeliveryFee={optimisticCart?.totalPriceWithDeliveryFee}
          discount={optimisticCart?.discount}
          disabled={isPending || optimisticCart?.items.length === 0}
          withDeliveryFee={
            form.watch('deliveryType') === OrderDeliveryType.delivery &&
            form.watch('paymentType') === OrderPaymentType.card &&
            selectedDeliveryService?.predefinedPrices
          }
          isSubmitting={form.formState.isSubmitting}
          buttonLabel={
            currentStep === orderSteps.length - 1
              ? 'Završi kupovinu'
              : 'Nastavi'
          }
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
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  )
}

export function CartPageSkeleton() {
  return (
    <div className='grid gap-6 lg:grid-cols-cart'>
      <div className='mx-auto lg:col-span-2'>
        <CartOrderStepsSkeleton />
      </div>
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
