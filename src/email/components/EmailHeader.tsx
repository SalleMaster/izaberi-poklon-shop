import { Column, Img, Row, Section, Text, Link } from '@react-email/components'

export function EmailHeader() {
  return (
    <Link href={process.env.APP_URL}>
      <Section className='w-full rounded-lg bg-gray-50 mt-4 p-5 mb-5'>
        <Row>
          <Column align='left'>
            <Img
              alt='React Email logo'
              height='50'
              src={`${process.env.AWS_BUCKET_URL}/red-dot-logo.png`}
            />
          </Column>
          <Column align='center'>
            <Text className='text-md md:text-lg text-gray-600 m-0'>
              Izrada personalizovanih poklona <br /> i reklamnog materijala{' '}
              <br /> <span className='text-xs'>www.izaberipoklon.com</span>
            </Text>
          </Column>
          <Column align='right'>
            <Img
              alt='React Email logo'
              height='50'
              src={`${process.env.AWS_BUCKET_URL}/red-dot-logo.png`}
            />
          </Column>
        </Row>
      </Section>
    </Link>
  )
}
