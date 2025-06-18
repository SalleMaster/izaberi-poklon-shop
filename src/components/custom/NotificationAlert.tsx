import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Info } from 'lucide-react'

type NotificationAlertProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
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
  className,
}: NotificationAlertProps) {
  return (
    <Alert variant={variant} className={className}>
      <Info className='h-4 w-4' />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
