import { randomBytes } from 'crypto'

export function generateOrderNumber(): string {
  return randomBytes(4).toString('hex').toUpperCase()
}
