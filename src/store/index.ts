import { writable } from 'svelte/store'
import type { Product, VariantMetafields } from '../types'

type Store = {
  product: Product | null,
  variantMetafields: VariantMetafields,
  color: string,
}

export const store = writable<Store>({
  product: null,
  variantMetafields: [],
  color: '',
})