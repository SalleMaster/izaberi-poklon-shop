import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { orderSteps } from '@/lib/consts'
import { cn } from '@/lib/utils'

type Props = {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export default function CartOrderSteps({ currentStep, setCurrentStep }: Props) {
  return (
    <div className='flex items-center lg:gap-2'>
      <Button
        variant='ghost'
        onClick={() => setCurrentStep(0)}
        className='flex gap-2'
      >
        <OrderStepBadge step={1} disabled={false} />
        <span className='hidden lg:block'>{orderSteps[0].name}</span>
      </Button>
      <Separator className='w-5 lg:w-10' />
      <Button
        variant='ghost'
        disabled={currentStep < 1}
        onClick={() => setCurrentStep(1)}
        className='flex gap-2'
      >
        <OrderStepBadge step={2} disabled={currentStep < 1} />
        <span className='hidden lg:block'>{orderSteps[1].name}</span>
      </Button>
      <Separator className='w-5 lg:w-10' />
      <Button
        variant='ghost'
        disabled={currentStep < 2}
        onClick={() => setCurrentStep(2)}
        className='flex gap-2'
      >
        <OrderStepBadge step={3} disabled={currentStep < 2} />
        <span className='hidden lg:block'>{orderSteps[2].name}</span>
      </Button>
      <Separator className='w-5 lg:w-10' />
      <Button
        variant='ghost'
        disabled={currentStep < 3}
        onClick={() => setCurrentStep(3)}
        className='flex gap-2'
      >
        <OrderStepBadge step={4} disabled={currentStep < 3} />
        <span className='hidden lg:block'>{orderSteps[3].name}</span>
      </Button>
    </div>
  )
}

type OrderStepBadgeProps = {
  step: number
  disabled: boolean
}

function OrderStepBadge({ step, disabled }: OrderStepBadgeProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center bg-primary text-primary-foreground font-semibold rounded-full w-7 h-7',
        disabled && 'bg-foreground text-primary-foreground'
      )}
    >
      {step}
    </span>
  )
}

export function CartOrderStepsSkeleton() {
  return (
    <div className='flex items-center lg:gap-2'>
      <Button variant='ghost' className='flex gap-2' disabled={true}>
        <OrderStepBadge step={1} disabled={true} />
        <span className='hidden lg:block'>{orderSteps[0].name}</span>
      </Button>
      <Separator className='w-5 lg:w-10' />
      <Button variant='ghost' disabled={true} className='flex gap-2'>
        <OrderStepBadge step={2} disabled={true} />
        <span className='hidden lg:block'>{orderSteps[1].name}</span>
      </Button>
      <Separator className='w-5 lg:w-10' />
      <Button variant='ghost' disabled={true} className='flex gap-2'>
        <OrderStepBadge step={3} disabled={true} />
        <span className='hidden lg:block'>{orderSteps[2].name}</span>
      </Button>
      <Separator className='w-5 lg:w-10' />
      <Button variant='ghost' disabled={true} className='flex gap-2'>
        <OrderStepBadge step={4} disabled={true} />
        <span className='hidden lg:block'>{orderSteps[3].name}</span>
      </Button>
    </div>
  )
}
