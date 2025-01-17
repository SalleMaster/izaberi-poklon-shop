import { shopInfo } from '@/lib/consts'
import { Column, Row, Section, Text } from '@react-email/components'

export function EmailFooter() {
  return (
    <Section className='w-full text-sm rounded-lg bg-gray-50 text-white mt-4 p-5'>
      <Row>
        <Column align='center'>
          <Text className='text-sm text-gray-600 m-0'>
            © {new Date().getFullYear()} {shopInfo.name}
          </Text>
        </Column>
      </Row>
    </Section>
  )
}
