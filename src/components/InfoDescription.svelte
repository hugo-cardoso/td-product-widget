<script lang="ts">
  import { store } from '../store'

  $: ({ description } = $store.product)
</script>

<div class="description">
  <div class="description__title">Descrição</div>
  {@html description }
</div>

<style lang="scss">

  .description {
    width: 100%;
    margin-top: var(--theme-spaces-md);
    font-family: var(--theme-font-family);
    line-height: 1.4rem;
    font-size: 1rem;
    font-weight: 400;
    color: var(--theme-color-gray-dark);

    &__title {
      font-size: 18px;
      font-family: var(--theme-font-family);
      color: var(--theme-color-gray-dark);
      font-weight: 500;
      margin-bottom: var(--theme-spaces-sm);
      padding-left: var(--theme-spaces-sm);
      border-left: 2px solid #eb7cdc;
      width: 100%;
      box-sizing: border-box;
      line-height: 1;
    }

    & > :global(p) {
      font-family: var(--theme-font-family);
      font-size: 1rem;
      line-height: 1.4rem;
      color: var(--theme-color-gray-dark);
      font-weight: 400;
      margin-bottom: var(--theme-spaces-xs);

      &:last-child {
        margin-bottom: 0;
      }
    }

    & :global(strong) {
      font-weight: 500;
    }
  }

</style>