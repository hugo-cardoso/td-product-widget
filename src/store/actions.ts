import type { Product, Variant, VariantMetafields } from 'src/types'
import { store } from './index'

export const setProduct = (product: Product) => store.update(state => ({...state, product}))

export const setSelectVariant = (selectedVariant: Variant) => store.update(state => ({...state, selectedVariant}))

export const setVariantMetafields = (variantMetafields: VariantMetafields) => store.update(state => ({...state, variantMetafields}))

export const setColor = (color: string) => store.update(state => ({...state, color}))