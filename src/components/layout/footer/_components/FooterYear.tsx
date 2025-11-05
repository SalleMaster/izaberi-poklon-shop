import { shopInfo } from '@/lib/consts'

export async function FooterYear() {
  'use cache'

  const year = new Date().getFullYear()

  return (
    <p>
      &copy; {year} - {shopInfo.name} - Sva prava zadržana
    </p>
  )
}
