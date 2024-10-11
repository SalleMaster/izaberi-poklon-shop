import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Info } from 'lucide-react'

type NotificationAlertProps = {
  title: string
  description: string
  variant?:
    | 'default'
    | 'info'
    | 'success'
    | 'warning'
    | 'destructive'
    | null
    | undefined
}

export function NotificationAlert({
  title,
  description,
  variant,
}: NotificationAlertProps) {
  return (
    <Alert variant={variant}>
      <Info className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
