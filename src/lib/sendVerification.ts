export async function sendVerification(params: { to: string; url: string }) {
  const { to, url } = params

  const res = await fetch(
    `${process.env.APP_URL}/api/send-verification-request`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        to,
      }),
    }
  )

  if (!res.ok)
    throw new Error('Resend error: ' + JSON.stringify(await res.json()))
}
