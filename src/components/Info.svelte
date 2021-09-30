<script lang="ts">
  import { store, availableVariants, installmentPrice } from '../store'
  import { setSelectVariant } from '../store/actions'
  import { parsePrice } from '../utils'

  import BuyButton from './BuyButton.svelte'

  $: ({
    selectedVariant,
    variantMetafields,
    hasVariants,
  } = $store)

  $: ({
    title,
    variants,
    options,
  } = $store.product)

  $: clothingSizes = variantMetafields.filter(({ title }) => options.find(({ name}) => name === 'Tamanho')?.values.includes(title))

  const handleClickOption = (optionValue: string) => {
    const newSelectedVariant = variants.find(variant => variant.option1 === optionValue)
    if (newSelectedVariant.id !== selectedVariant.id) setSelectVariant(newSelectedVariant)
  }

</script>

<div class="product-info">
  <h1 class="product-info__title">{title}</h1>
  {#if selectedVariant}
    <div class="product-prices">
      <div class="product-prices__price">{ parsePrice(selectedVariant.price) }</div>
      {#if selectedVariant.compare_at_price}
        <div class="product-prices__price product-prices__price--old">{ parsePrice(selectedVariant.compare_at_price) }</div>
      {/if}
    </div>
    <p class="product-info__installments">Em até <strong>12x de { $installmentPrice }</strong></p>
  {/if}

  {#if $availableVariants.length}

    {#if hasVariants}

      {#each options as option}
        <div class="product-variants">
          <p class="product-variants__title">{ option.name }</p>
          <div class="product-variants__list">
            {#each option.values as value}
              {#if $availableVariants.find(variant => variant.option1 === value)}
                <div
                  class="product-variants__item"
                  class:product-variants__item--selected={ selectedVariant.option1 === value }
                  on:click={ () => handleClickOption(value) }
                >{ value }</div>
              {/if}
            {/each}
          </div>
        </div>
      {/each}

    {/if}

    <BuyButton />

    {#if clothingSizes.length }
      <p class="measures-table__title">Tabela de medidas(cm):</p>
      <table class="measures-table">
        <thead>
          <tr>
            <th></th>
            <th>Busto</th>
            <th>Cintura</th>
            <th>Quadril</th>
            {#if clothingSizes[0].values.comprimento}
              <th>Comprimento</th>
            {/if}
          </tr>
        </thead>
        <tbody>
          {#each clothingSizes as size}
            <tr>
              <td class="tam"><strong>{ size.title }</strong></td>
              <td>{ size.values.busto }</td>
              <td>{ size.values.cintura }</td>
              <td>{ size.values.quadril }</td>
              {#if size.values.comprimento}
                <td>{ size.values.comprimento }</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {/if}
</div>

<style lang="scss">
  .product-info {
    display: flex;
    flex-direction: column;

    &__title {
      font-family: var(--theme-font-family);
      color: var(--theme-color-gray-dark);
      font-size: 1.6rem;
      font-weight: 400;
      margin-bottom: var(--theme-spaces-lg);
    }

    &__installments {
      font-family: var(--theme-font-family);
      font-weight: 400;
      color: var(--theme-color-gray-dark);
      font-size: 1rem;
      margin-bottom: var(--theme-spaces-lg);

      strong {
        font-weight: 500;
      }
    }
  }

  .product-variants {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--theme-spaces-lg);
    align-items: flex-start;

    &__title {
      font-family: var(--theme-font-family);
      margin-bottom: var(--theme-spaces-xs);
      font-size: 14px;
      color: var(--theme-color-gray-dark);
    }

    &__list {
      display: flex;
      border: 1px solid var(--theme-color-gray-medium);
      box-sizing: border-box;
      border-radius: 3px;
      overflow: hidden;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--theme-spaces-xxxl);
      height: var(--theme-spaces-xl);
      border-right: 1px solid var(--theme-color-gray-medium);
      box-sizing: border-box;
      font-family: var(--theme-font-family);
      font-size: 14px;
      color: var(--theme-color-gray-dark);
      cursor: pointer;
      position: relative;

      &:last-child {
        border-right: none;
      }

      &--selected {
        font-weight: 500;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: var(--product-color);
        }
      }
    }
  }

  .product-prices {
    display: flex;
    margin-bottom: var(--theme-spaces-xs);
    align-items: flex-end;

    &__price {
      font-family: var(--theme-font-family);
      color: #000;
      font-weight: 500;
      font-size: 1.5rem;

      &--old {
        text-decoration: line-through;
        margin-left: var(--theme-spaces-sm);
        font-size: 1.4rem;
        font-weight: 300;
        color: var(--theme-color-gray-dark);
        opacity: .5;
      }
    }
  }

  .measures-table {
    border: 1px solid var(--theme-color-gray-medium);
    border-collapse:separate;
    border-radius: 3px;

    &__title {
      font-family: var(--theme-font-family);
      margin-bottom: var(--theme-spaces-xs);
      font-size: 14px;
      color: var(--theme-color-gray-dark);
    }
  }

  .measures-table th {
    font-weight: 500;
    border-bottom: 1px solid var(--theme-color-gray-medium);
    padding: var(--theme-spaces-xs);
    width: 1%;
    white-space: nowrap;
  }

  .measures-table td {
    padding: var(--theme-spaces-xs) 0;
  }

  .measures-table td,
  .measures-table th {
    height: var(--theme-spaces-md);
    text-align: center;
    font-family: var(--theme-font-family);
    font-size: .9rem;
    box-sizing: border-box;

    strong {
      font-weight: 500;
    }

    &.tam {
      padding: 0 var(--theme-spaces-xs);
      box-sizing: border-box;
    }
  }

  .measures-table tbody tr:hover {
    background: var(--theme-color-gray-light);
  }
</style>