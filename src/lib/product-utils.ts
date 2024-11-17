import { SelectOptionType } from '@/components/custom/Combobox'

export const generateQuantityOptions = ({
  min,
  max,
}: {
  min: number
  max: number
}): SelectOptionType[] => {
  const options = []
  for (let i = min; i <= max; i++) {
    options.push({ value: i.toString(), label: i.toString() })
  }
  return options
}
