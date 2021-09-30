import type { Variant } from "./types"

export const createImageURL = (
  url: string,
  size: 'thumb' | 'small' | 'medium' | 'large' | 'master'
) => {
  let imageFormat = ''
  
  for(let formatOption of ['.png','.jpg','.jpeg']) {
    if (url.includes(formatOption)) imageFormat = formatOption
  }

  return url.replace(imageFormat, `_${ size }` + imageFormat)
}

export const parsePrice = (price: number) => {
  return (price / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export const filterVariantsAvailable = (variants: Variant[]) => variants.filter(({available}) => available)