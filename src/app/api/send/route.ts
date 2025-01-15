import { NextRequest, NextResponse } from 'next/server'
import PurchaseReceiptEmail from '@/email/PurchaseReceiptEmail'
import { shopInfo } from '@/lib/consts'
import { Resend } from 'resend'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: NextRequest) {
  try {
    const { order, orderEmail } = await req.json()

    const { data, error } = await resend.emails.send({
      from: `${shopInfo.name} <${process.env.SENDER_EMAIL}>`,
      to: [
        `${process.env.NODE_ENV === 'development' ? 'salle90ar@gmail.com' : orderEmail}`,
      ],
      subject: 'Potvrda porudžbine',
      react: PurchaseReceiptEmail({ order }),
    })

    if (error) {
      console.log('Error sending email', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.log('Error sending email', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
