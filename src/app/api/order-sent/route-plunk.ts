import { NextRequest, NextResponse } from 'next/server'
import { createElement } from 'react'
import OrderSentEmail from '@/email/OrderSentEmail'
import { render } from '@react-email/render'
import { onlinePurchaseContract, orderQuitForm } from '@/lib/consts'

export async function POST(req: NextRequest) {
  try {
    const { order, orderEmail } = await req.json()

    const emailComponent = createElement(OrderSentEmail, { order })
    const renderedEmail = await render(emailComponent)

    const body = JSON.stringify({
      // to: recipientEmail,
      to: orderEmail,
      subject: 'Porudžbina poslata',
      body: renderedEmail,
      // subscribed: true,
      // name: '<string>',
      // from: '<string>',
      // reply: '<string>',
      // headers: {},
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

    const plunkUrl = process.env.PLUNK_URL!

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
      },
      body,
    }

    const response = await fetch(plunkUrl, options)
    const result = await response.json()

    return NextResponse.json(
      {
        success: result.success,
      },
      { status: response.status }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}
