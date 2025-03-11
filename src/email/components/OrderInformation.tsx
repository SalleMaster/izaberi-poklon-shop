import { getTransactionStatusLabel } from '@/app/dashboard/(admin)/orders/_components/OrderTransactionDetails'
import { OrderCartWithRelations } from '@/data/services/order'
import { shopInfo } from '@/lib/consts'
import { priceFormatter } from '@/lib/format'
import { Order, OrderDeliveryType, OrderPaymentType } from '@prisma/client'
import { Column, Img, Row, Section, Text, Link } from '@react-email/components'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'

type OrderInformationProps = {
  order: Order
}

export function OrderInformation({ order }: OrderInformationProps) {
  const orderFormattedCreatedAt = format(order.createdAt, 'PPpp', {
    locale: srLatn,
  })
  const orderFormattedTotalPrice = priceFormatter(order.orderTotalPrice)
  const orderFormattedDeliveryFee = priceFormatter(order.orderDeliveryFee)
  const orderFormattedDiscount = priceFormatter(order.orderDiscount)

  let userInformation = {
    name: '',
    address: '',
    phone: '',
    email: '',
  }

  switch (order.deliveryType) {
    case OrderDeliveryType.pickup:
      userInformation = {
        name: order.pickupName,
        address: '',
        phone: order.pickupPhone,
        email: order.pickupEmail,
      }
      break
    case OrderDeliveryType.delivery:
      userInformation = {
        name: order.billingName || order.deliveryName,
        address: order.billingAddress || order.deliveryAddress,
        phone: order.billingPhone || order.deliveryPhone,
        email: order.billingEmail || order.deliveryEmail,
      }
      break
    default:
      userInformation = {
        name: '',
        address: '',
        phone: '',
        email: '',
      }
  }

  let paymentTypeText
  switch (order.paymentType) {
    case OrderPaymentType.card:
      paymentTypeText = 'Plaćanje platnom karticom'
      break
    case OrderPaymentType.onDelivery:
      paymentTypeText = 'Plaćanje prilikom preuzimanja'
      break
    default:
      paymentTypeText = 'Nepoznat način plaćanja'
  }

  let deliveryTypeText
  switch (order.deliveryType) {
    case OrderDeliveryType.delivery:
      deliveryTypeText = 'Na kućnu adresu'
      break
    case OrderDeliveryType.pickup:
      deliveryTypeText = 'Lično preuzimanje'
      break
    default:
      deliveryTypeText = 'Nepoznat način isporuke'
  }

  const statusLabel = getTransactionStatusLabel({
    paymentStatus: order.paymentStatus,
  })

  const sameBillingAddress =
    order.deliveryType === OrderDeliveryType.delivery &&
    order.billingAddress === order.deliveryAddress &&
    order.billingCity === order.deliveryCity &&
    order.billingZip === order.deliveryZip &&
    order.billingPhone === order.deliveryPhone &&
    order.billingEmail === order.deliveryEmail

  const cart = order.cart as unknown as OrderCartWithRelations
  return (
    <>
      <Section className='rounded-xl border border-solid border-gray-300 p-4 mb-5'>
        <Row>
          <Column align='left' className='w-1/2 align-top'>
            <Text>
              <span className='font-semibold'>Datum naručivanja:</span> <br />
              {orderFormattedCreatedAt} <br />
              <span className='font-semibold'>Referenca porudžbine:</span>{' '}
              <br />
              {order.orderNumber} <br />
              <span className='font-semibold'>Podaci o kupcu:</span> <br />{' '}
              {userInformation.name} <br /> {userInformation.address}{' '}
              {userInformation.address ? <br /> : null} {userInformation.phone}{' '}
              <br />
              {userInformation.email}
            </Text>
          </Column>
          <Column align='left' className='w-1/2 align-top'>
            <Text>
              <span className='font-semibold'>Prodaci o prodavcu:</span> <br />
              {shopInfo.name} <br />
              {shopInfo.address} <br />
              {shopInfo.phone} <br />
              {shopInfo.email} <br />
              <span className='font-semibold'>PIB:</span> {shopInfo.pib} <br />
              <span className='font-semibold'>MATIČNI BROJ:</span>{' '}
              {shopInfo.idNumber} <br />
              <span className='font-semibold'>BR. RAČUNA:</span>{' '}
              <span className='break-all'>{shopInfo.bankAccountNumber}</span>
            </Text>
          </Column>
        </Row>
      </Section>

      <Section className='rounded-xl border border-solid border-gray-300 p-4 mb-5'>
        <table width='100%'>
          <tbody>
            <tr>
              <td className='text-sm font-semibold border-0 border-b border-solid border-gray-200 pb-3'>
                Proizvod
              </td>
              <td className='text-sm font-semibold border-0 border-b border-solid border-gray-200 pb-3'>
                Cena
              </td>
              <td className='text-sm font-semibold border-0 border-b border-solid border-gray-200 pb-3'>
                Količina
              </td>
              <td className='text-sm font-semibold border-0 border-b border-solid border-gray-200 pb-3'>
                Ukupno
              </td>
            </tr>
            {cart.items.map((item) => (
              <tr key={item.id}>
                <td className='text-sm border-0 border-b border-solid border-gray-200 py-3'>
                  <Link
                    href={`${process.env.APP_URL}/pokloni/${item.product.id}`}
                    className='text-black'
                  >
                    <Img
                      width='100px'
                      alt={item.product.name}
                      src={item.product.coverImage?.url}
                    />
                    {item.product.name}
                  </Link>
                </td>
                <td className='text-sm border-0 border-b border-solid border-gray-200 py-3'>
                  {priceFormatter(item.price / item.quantity)}
                </td>
                <td className='text-sm border-0 border-b border-solid border-gray-200 py-3'>
                  {item.quantity}
                </td>
                <td className='text-sm border-0 border-b border-solid border-gray-200 py-3'>
                  {priceFormatter(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Row>
          <Column>
            <Text>
              <span className='font-semibold'>Vrednost porudžbine:</span> <br />
              {order.orderDeliveryFee > 0 ? (
                <>
                  <span>Poštarina {orderFormattedDeliveryFee}</span> <br />
                </>
              ) : null}
              {order.orderDiscount > 0 ? (
                <>
                  <span>Popust {orderFormattedDiscount}</span> <br />
                </>
              ) : null}
              <span>Ukupno </span>
              <span className='text-xl font-semibold'>
                {orderFormattedTotalPrice}
              </span>{' '}
              <br />
              <span className='text-xs text-gray-500'>
                *Red Dot nije obaveznik PDV-a
              </span>
            </Text>
          </Column>
        </Row>
      </Section>

      <Section className='rounded-xl border border-solid border-gray-300 p-4 mb-5'>
        <Row>
          <Column align='left' className='w-1/2 align-top'>
            <Text>
              <span className='font-semibold'>Način plaćanja:</span> <br />
              {paymentTypeText}
            </Text>
          </Column>
          <Column align='left' className='w-1/2 align-top'>
            <Text>
              <span className='font-semibold'>Način isporuke:</span> <br />
              {deliveryTypeText}
            </Text>
          </Column>
        </Row>

        {order.deliveryType === OrderDeliveryType.delivery ? (
          <>
            <Row>
              <Column>
                <Text>
                  <span className='font-semibold'>Kurirska služba</span> <br />
                  {order.deliveryServiceName}
                </Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text>
                  <span className='font-semibold'>Adresa isporuke</span> <br />
                  {order.deliveryName} <br />
                  {order.deliveryAddress} <br />
                  {order.deliveryZip} {order.deliveryCity} <br />
                  {order.deliveryPhone} <br />
                  {order.deliveryEmail} <br />
                  {order.deliveryNote ? (
                    <>
                      <span className='font-semibold'>Napomena:</span> <br />
                      {order.deliveryNote}
                    </>
                  ) : null}
                </Text>
              </Column>
              <Column>
                <Text>
                  <span className='font-semibold'>Adresa računa</span> <br />
                  {sameBillingAddress ? (
                    <>Adresa računa je identična adresi dostave.</>
                  ) : (
                    <>
                      {order.billingName} <br />
                      {order.billingAddress} <br />
                      {order.billingZip} {order.billingCity} <br />
                      {order.billingPhone} <br />
                      {order.billingEmail} <br />
                      {order.billingNote ? (
                        <>
                          <span className='font-semibold'>Napomena:</span>{' '}
                          <br />
                          {order.billingNote}
                        </>
                      ) : null}
                    </>
                  )}
                </Text>
              </Column>
            </Row>
          </>
        ) : null}

        {order.deliveryType === OrderDeliveryType.pickup ? (
          <>
            <Row>
              <Column>
                <Text>
                  <span className='font-semibold'>Adresa isporuke</span> <br />
                  {shopInfo.pickupAddress}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text>
                  <span className='font-semibold'>
                    Podaci korisnika koji zaključuje kupovinu
                  </span>{' '}
                  <br />
                  {order.pickupName} <br />
                  {order.pickupPhone} <br />
                  {order.pickupEmail}
                </Text>
              </Column>
            </Row>
          </>
        ) : null}
      </Section>

      {order.paymentType === OrderPaymentType.card ? (
        <Section className='rounded-xl border border-solid border-gray-300 p-4 mb-5'>
          <Row>
            <Column align='left'>
              <Text>
                <span className='font-semibold'>ID transakcije:</span> <br />
                {order.paymentId}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column align='left'>
              <Text>
                <span className='font-semibold'>Checkout ID:</span> <br />
                {order.checkoutId}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column align='left'>
              <Text>
                <span className='font-semibold'>Status transakcije:</span>{' '}
                <br />
                {statusLabel}
              </Text>
            </Column>
          </Row>
        </Section>
      ) : null}

      <Section className='rounded-xl border border-solid border-gray-300 px-4 mb-5'>
        <Row>
          <Column align='left' className='w-1/2'>
            <Text>
              Pratite status porudžbine na svom <br /> Izaberi Poklon Shop
              profilu.
            </Text>
          </Column>
          <Column align='right' className='w-1/2'>
            <Link
              href={`${process.env.APP_URL}/profil/porudzbine/${order.id}`}
              className='p-2 bg-black text-white rounded-lg text-sm'
            >
              Detalji porudžbine
            </Link>
          </Column>
        </Row>
      </Section>
    </>
  )
}
