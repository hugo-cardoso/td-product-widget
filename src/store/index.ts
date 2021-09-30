import { writable, derived } from 'svelte/store'

import { filterVariantsAvailable, parsePrice } from '../utils'

import type { Product, Variant, VariantMetafields } from '../types'

type Store = {
  product: Product | null,
  variantMetafields: VariantMetafields,
  color: string,
  selectedVariant: Variant,
  hasVariants: boolean,
}

export const store = writable<Store>({
  product: null,
  variantMetafields: [],
  color: '',
  selectedVariant: null,
  hasVariants: false,
})

export const availableVariants = derived(store, $store => filterVariantsAvailable($store.product.variants))

export const installmentPrice = derived(store, ({ selectedVariant }) => parsePrice(selectedVariant ? selectedVariant.price * 1.1979 / 12 : 0))