<script lang="ts">
  import { store } from '../store'

  $: ({ description } = $store.product)
</script>

<div class="description">
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