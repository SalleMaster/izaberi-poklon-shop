import Image from 'next/image'

type Props = {
  productName: string
  productCoverUrl: string
}

export default function ProductCell({ productName, productCoverUrl }: Props) {
  return (
    <div className='flex gap-4 items-center'>
      <Image src={productCoverUrl} alt='Poklon' width={100} height={100} />
      {productName}
    </div>
  )
}
