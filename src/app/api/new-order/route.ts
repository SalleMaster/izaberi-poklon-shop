import { NextRequest, NextResponse } from 'next/server'
import { onlinePurchaseContract, orderQuitForm } from '@/lib/consts'
import { Resend } from 'resend'
import NewOrderEmail from '@/email/NewOrderEmail'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json()

    const { data, error } = await resend.emails.send({
      from: `Reci Seci Pokloni <${process.env.SENDER_EMAIL}>`,
      to: [`${process.env.RECIPIENT_EMAIL}`],
      subject: 'Nova porudžbina',
      react: NewOrderEmail({ order }),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
