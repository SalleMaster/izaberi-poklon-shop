import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        info: 'border-transparent bg-sky-100 text-sky-950 shadow-sm hover:bg-sky-100/80',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 shadow-sm hover:bg-yellow-100/80',
        success:
          'border-transparent bg-emerald-100 text-emerald-800 shadow-sm hover:bg-emerald-100/80',
        danger:
          'border-transparent bg-red-100 text-red-800 shadow-sm hover:bg-red-100/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
