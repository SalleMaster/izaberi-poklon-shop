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
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <EmailHeader />
            <Section className='mb-[100px]'>
              <Text>Poštovani/a</Text>

              <Text>
                Molimo Vas da kliknete na dugme ispod kako biste se prijavili na
                www.izaberipoklon.com internet prodavnicu.
              </Text>

              <Link
                href={url}
                className='inline-block p-2 bg-black text-white rounded-lg text-sm my-5'
              >
                Prijava
              </Link>

              <Text>
                Ukoliko Vi niste zatražili ovu verifikaciju, slobodno ignorišite
                ovaj email.
              </Text>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
