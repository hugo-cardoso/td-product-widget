<script lang="ts">
  import { onMount } from 'svelte'
  import { store } from './store'

  import { getProduct, getProductMetafields } from './services'
  import { setProduct, setVariantMetafields, setColor } from './store/actions'

  import Gallery from './components/Gallery.svelte'
  import Info from './components/Info.svelte'

  import type { VariantMetafields } from './types'

  $: ({ product, color } = $store)

  onMount(async () => {
    const productResponse = await getProduct()
    setProduct(productResponse)
    console.log(productResponse)

    const metafieldsResponse = await getProductMetafields(productResponse.handle)

    const variantMetafields: VariantMetafields = metafieldsResponse.data.product.variants.edges.map(edge => {
      return {
        id: edge.node.id,
        title: edge.node.title,
        values: {
          busto: edge.node.busto.value,
          cintura: edge.node.cintura.value,
          quadril: edge.node.quadril.value,
        }
      }
    })

    setVariantMetafields(variantMetafields)
    setColor(metafieldsResponse.data.product.cor.value)

    window.document.body.style.setProperty('--product-color', metafieldsResponse.data.product.cor.value)
  })
</script>
{#if product}
  <div class="product">
    <Gallery />
    <Info />
  </div>
{/if}

<style lang="scss">
  .product {
    display: grid;
    grid-template-columns: auto 400px;
    gap: var(--theme-spaces-sm);
    box-sizing: border-box;
    padding-top: var(--theme-spaces-sm);

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      padding-top: var(--theme-spaces-xs);
      padding-left: var(--theme-spaces-xs);
      padding-right: var(--theme-spaces-xs);
    }
  }
</style>