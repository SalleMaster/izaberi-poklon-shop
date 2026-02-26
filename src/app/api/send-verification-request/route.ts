import { NextRequest, NextResponse } from 'next/server'
import { shopInfo } from '@/lib/consts'
import { Resend } from 'resend'
import VerifyRequestEmail from '@/email/VerifyRequestEmail'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: NextRequest) {
  try {
    const { url, to } = await req.json()

    const { data, error } = await resend.emails.send({
      from: `Reci Seci Pokloni <${process.env.SENDER_EMAIL}>`,
      to: [to],
      subject: 'Email verifikacija',
      react: VerifyRequestEmail({ url }),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
