import { Column, Img, Row, Section, Text, Link } from '@react-email/components'

export function EmailHeader() {
  return (
    <Link href={process.env.APP_URL}>
      <Section className='w-full rounded-lg bg-gray-50 mt-4 p-5 mb-5'>
        <Row>
          <Column align='left'>
            <Img
              alt='React Email logo'
              height='80'
              src={`${process.env.AWS_BUCKET_URL}/red-dot-logo-medium.png`}
            />
          </Column>
          <Column align='center'>
            <Text className='text-md md:text-lg text-gray-600 m-0'>
              Izrada personalizovanih poklona <br /> i reklamnog materijala{' '}
              <br /> <span className='text-xs'>www.recisecipokloni.com</span>
            </Text>
          </Column>
          <Column align='right' className='hidden md:block'>
            <Img
              alt='React Email logo'
              height='80'
              src={`${process.env.AWS_BUCKET_URL}/red-dot-logo-medium.png`}
            />
          </Column>
        </Row>
      </Section>
    </Link>
  )
}
