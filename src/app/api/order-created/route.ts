import { NextRequest, NextResponse } from 'next/server'
import PurchaseReceiptEmail from '@/email/PurchaseReceiptEmail'
import { onlinePurchaseContract, orderQuitForm, shopInfo } from '@/lib/consts'
import { Resend } from 'resend'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: NextRequest) {
  try {
    const { order, orderEmail } = await req.json()

    const { data, error } = await resend.emails.send({
      from: `Reci Seci Pokloni <${process.env.SENDER_EMAIL}>`,
      to: [
        `${process.env.NODE_ENV === 'production' ? orderEmail : process.env.RECIPIENT_EMAIL}`,
      ],
      subject: 'Potvrda porudžbine',
      react: PurchaseReceiptEmail({ order }),
      attachments: [
        {
          path: orderQuitForm.url,
          filename: orderQuitForm.fileName,
        },
        {
          path: onlinePurchaseContract.url,
          filename: onlinePurchaseContract.fileName,
        },
      ],
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
