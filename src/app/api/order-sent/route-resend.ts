import { NextRequest, NextResponse } from 'next/server'
import { onlinePurchaseContract, orderQuitForm, shopInfo } from '@/lib/consts'
import { Resend } from 'resend'
import OrderSentEmail from '@/email/OrderSentEmail'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function POST(req: NextRequest) {
  // Start the overall timer
  const totalStartTime = performance.now()

  // Create an object to store timing metrics
  const metrics = {
    parseRequest: 0,
    renderEmail: 0,
    sendEmail: 0,
    totalTime: 0,
  }

  try {
    // Measure request parsing time
    const parseStartTime = performance.now()
    const { order, orderEmail } = await req.json()
    metrics.parseRequest = performance.now() - parseStartTime

    // Measure email rendering time
    const renderStartTime = performance.now()
    const emailComponent = OrderSentEmail({ order })
    metrics.renderEmail = performance.now() - renderStartTime

    // Measure email sending time (including attachments download)
    const sendStartTime = performance.now()
    const { data, error } = await resend.emails.send({
      from: `${shopInfo.name} <${process.env.SENDER_EMAIL}>`,
      to: [
        `${process.env.NODE_ENV === 'production' ? orderEmail : process.env.RECIPIENT_EMAIL}`,
      ],
      subject: 'Porudžbina poslata',
      react: emailComponent,
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
    metrics.sendEmail = performance.now() - sendStartTime

    // Calculate total time
    metrics.totalTime = performance.now() - totalStartTime

    // Log the metrics
    console.log('Email Sending Performance Metrics:')
    console.log('--------------------------------')
    console.log(`Parse Request: ${metrics.parseRequest.toFixed(2)} ms`)
    console.log(`Render Email: ${metrics.renderEmail.toFixed(2)} ms`)
    console.log(
      `Send Email (including attachments): ${metrics.sendEmail.toFixed(2)} ms`
    )
    console.log(`Total Time: ${metrics.totalTime.toFixed(2)} ms`)
    console.log('--------------------------------')

    if (error) {
      return NextResponse.json(
        {
          error,
          metrics,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ...data,
      metrics,
    })
  } catch (error) {
    // Calculate total time even for errors
    metrics.totalTime = performance.now() - totalStartTime

    console.error('Error sending email:', error)
    console.log(`Total Time (with error): ${metrics.totalTime.toFixed(2)} ms`)

    return NextResponse.json(
      {
        error,
        metrics,
      },
      { status: 500 }
    )
  }
}
