import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type ConfirmationDialogProps = {
  confirmAction: () => void
  alertTriggerVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
  alertTrigger?: string
  alertTitle?: string
  alertDescription?: string
  alertCancel?: string
  alertAction?: string
  isLoading?: boolean
  isDisabled?: boolean
}

export function ConfirmationDialog({
  confirmAction,
  alertTriggerVariant = 'destructive',
  alertTrigger = 'Izbriši',
  alertTitle = 'Da li ste sigurni?',
  alertDescription = 'Ova akcija ne može biti poništena. Ovo će trajno obrisati i ukloniti podatke sa naših servera.',
  alertCancel = 'Otkaži',
  alertAction = 'Nastavi',
  isLoading = false,
  isDisabled = false,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={alertTriggerVariant} disabled={isDisabled}>
          {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
          {alertTrigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{alertCancel}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={confirmAction}>{alertAction}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
