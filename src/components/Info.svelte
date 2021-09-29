<script lang="ts">
  import { store } from '../store'
  import { parsePrice } from '../utils'

  import BuyButton from './BuyButton.svelte'

  $: ({
    title,
    variants,
    options,
  } = $store.product)
  $: variantMetafields = $store.variantMetafields
  $: variantsAvailable = variants.filter(({ available }) => available)
  $: variantSelected = variantsAvailable.length ? variantsAvailable[0] : null
  $: installmentPrice = parsePrice(variantSelected.price * 1.1979 / 12)

  $: clothingSizes = variantMetafields.filter(({ title }) => options.find(({ name}) => name === 'Tamanho')?.values.includes(title))

  const handleClickOption = (optionValue: string) => {
    const newSelectedVariant = variants.find(variant => variant.option1 === optionValue)
    if (newSelectedVariant.id !== variantSelected.id) variantSelected = newSelectedVariant
  }

</script>

<div class="product-info">
  <h1 class="product-info__title">{title}</h1>
  <div class="product-prices">
    <div class="product-prices__price">{ parsePrice(variantSelected.price) }</div>
    {#if variantSelected.compare_at_price}
      <div class="product-prices__price product-prices__price--old">{ parsePrice(variantSelected.compare_at_price) }</div>
    {/if}
  </div>
  <p class="product-info__installments">Em até <strong>12x de { installmentPrice }</strong></p>

  {#if variantsAvailable.length}

    {#each options as option}
      <div class="product-variants">
        <p class="product-variants__title">{ option.name }</p>
        <div class="product-variants__list">
          {#each option.values as value}
            {#if variantsAvailable.find(variant => variant.option1 === value)}
              <div
                class="product-variants__item"
                class:product-variants__item--selected={ variantSelected.option1 === value }
                on:click={ () => handleClickOption(value) }
              >{ value }</div>
            {/if}
          {/each}
        </div>
      </div>
    {/each}

    <BuyButton variant={variantSelected}/>

    {#if clothingSizes.length }
      <p class="measures-table__title">Tabela de medidas(cm):</p>
      <table class="measures-table">
        <thead>
          <tr>
            <th>Tamanho</th>
            <th>Busto</th>
            <th>Cintura</th>
            <th>Quadril</th>
          </tr>
        </thead>
        <tbody>
          {#each clothingSizes as size}
            <tr>
              <td>{ size.title }</td>
              <td>{ size.values.busto }</td>
              <td>{ size.values.cintura }</td>
              <td>{ size.values.quadril }</td>
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
  }

  .measures-table td,
  .measures-table th {
    height: var(--theme-spaces-md);
    text-align: center;
    font-family: var(--theme-font-family);
    padding: var(--theme-spaces-xs) 0;
    box-sizing: border-box;
  }

  .measures-table tbody tr:hover {
    background: var(--theme-color-gray-light);
  }
</style>