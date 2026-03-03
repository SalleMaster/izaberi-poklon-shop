import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import OrderReadyForPickupEmail from '@/email/OrderReadyForPickupEmail'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: NextRequest) {
  try {
    const { order, orderEmail } = await req.json()

    const { data, error } = await resend.emails.send({
      from: `Reci Seci Pokloni <${process.env.SENDER_EMAIL}>`,
      to: [orderEmail],
      subject: 'Porudžbina spremna za preuzimanje',
      react: OrderReadyForPickupEmail({ order }),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
