// import { format } from 'date-fns'
import { randomBytes } from 'crypto'

export function generateOrderNumber(): string {
  //   const timestamp = format(new Date(), 'yyyyMMddHHmmss')
  //   const randomString = randomBytes(4).toString('hex').toUpperCase()
  //   return `${randomString}-${timestamp}`

  return randomBytes(4).toString('hex').toUpperCase()
}
