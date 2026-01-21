import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Link,
} from '@react-email/components'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'

type VerifyRequestEmailProps = {
  url: string
}

VerifyRequestEmail.PreviewProps = {
  url: 'https://example.com',
} satisfies VerifyRequestEmailProps

export default function VerifyRequestEmail({ url }: VerifyRequestEmailProps) {
  return (
    <Html>
      <Preview>Email verifikacija</Preview>
      <Tailwind>
        <Head>
          <meta name='x-apple-data-detectors' content='true' />
          <meta name='googlemail:nothreaded' content='true' />
          <meta name='x-gmail-data-detectors' content='true' />
        </Head>
        <Preview>Verifikacija Vašeg naloga - Reci Seci Pokloni</Preview>
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <EmailHeader />
            <Section className='mb-[100px]'>
              <Text>Poštovani/a</Text>

              <Text>
                Potrebno je da verifikujete Vašu email adresu za pristup nalogu
                na Reci Seci Pokloni sajtu.
              </Text>

              <Text>
                Molimo Vas da kliknete na dugme ispod kako biste se prijavili na
                www.recisecipokloni.com internet prodavnicu.
              </Text>

              <Link
                href={url}
                className='inline-block p-2 bg-black text-white rounded-lg text-sm my-5'
              >
                Kliknite ovde za verifikaciju i prijavu
              </Link>

              <Text>
                Link je validan 24 sata. Ukoliko Vi niste zatražili ovu
                verifikaciju, molimo Vas da ignorišete ovaj email.
              </Text>

              <Text>
                Srdačan pozdrav,
                <br />
                Tim Reci Seci Pokloni
              </Text>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
