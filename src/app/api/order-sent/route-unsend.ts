import { NextRequest, NextResponse } from 'next/server'
import { createElement } from 'react'
import OrderSentEmail from '@/email/OrderSentEmail'
import { render } from '@react-email/render'
import { onlinePurchaseContract, orderQuitForm } from '@/lib/consts'

export async function POST(req: NextRequest) {
  // Start the overall timer
  const totalStartTime = performance.now()

  // Create an object to store timing metrics
  const metrics = {
    parseRequest: 0,
    renderEmail: 0,
    fetchAttachment: 0,
    base64Conversion: 0,
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
    const emailComponent = createElement(OrderSentEmail, { order })
    const renderedEmail = await render(emailComponent)
    metrics.renderEmail = performance.now() - renderStartTime

    // Measure attachment fetching time
    const fetchStartTime = performance.now()
    const quitFormResponse = await fetch(orderQuitForm.url)
    if (!quitFormResponse.ok) {
      throw new Error(
        `Failed to fetch quit form: ${quitFormResponse.statusText}`
      )
    }
    metrics.fetchAttachment = performance.now() - fetchStartTime

    // Measure base64 conversion time
    const base64StartTime = performance.now()
    const quitFormArrayBuffer = await quitFormResponse.arrayBuffer()
    const quitFormBase64 = Buffer.from(quitFormArrayBuffer).toString('base64')
    metrics.base64Conversion = performance.now() - base64StartTime

    const body = JSON.stringify({
      from: 'mail@noreply.izaberipoklon.com',
      to: orderEmail,
      subject: 'Porudžbina poslata',
      html: renderedEmail,
      attachments: [
        {
          content: quitFormBase64,
          filename: orderQuitForm.fileName,
        },
      ],
    })

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.UNSEND_API_KEY}`,
      },
      body,
    }

    // Measure email sending time
    const sendStartTime = performance.now()
    const response = await fetch(process.env.UNSEND_URL!, options)
    const result = await response.json()
    metrics.sendEmail = performance.now() - sendStartTime

    // Calculate total time
    metrics.totalTime = performance.now() - totalStartTime

    // Log the metrics
    console.log('Unsend Email Performance Metrics:')
    console.log('--------------------------------')
    console.log(`Parse Request: ${metrics.parseRequest.toFixed(2)} ms`)
    console.log(`Render Email: ${metrics.renderEmail.toFixed(2)} ms`)
    console.log(`Fetch Attachment: ${metrics.fetchAttachment.toFixed(2)} ms`)
    console.log(`Base64 Conversion: ${metrics.base64Conversion.toFixed(2)} ms`)
    console.log(`Send Email: ${metrics.sendEmail.toFixed(2)} ms`)
    console.log(`Total Time: ${metrics.totalTime.toFixed(2)} ms`)
    console.log('--------------------------------')

    console.log('API Response:', {
      status: response.status,
      result: JSON.stringify(result).substring(0, 100) + '...',
    })

    return NextResponse.json(
      {
        success: result.success,
        metrics,
      },
      { status: response.status }
    )
  } catch (error) {
    // Calculate total time even for errors
    metrics.totalTime = performance.now() - totalStartTime

    console.error('Error sending email:', error)
    console.log(`Total Time (with error): ${metrics.totalTime.toFixed(2)} ms`)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        metrics,
      },
      {
        status: 500,
      }
    )
  }
}
