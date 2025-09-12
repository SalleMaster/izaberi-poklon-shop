'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'

type Props = ImageProps

export default function DynamicImage({ ...props }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className='grid grid-cols-1 grid-rows-1'>
      {!imageLoaded && (
        <Skeleton className='col-start-1 row-start-1 h-auto w-[100%]' />
      )}
      <Image
        {...props}
        className={clsx(
          props.className,
          'col-start-1 row-start-1 transition-opacity duration-300',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}
