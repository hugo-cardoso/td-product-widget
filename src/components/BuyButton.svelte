<script lang="ts">
  import { store } from '../store'
  import { addToCart } from '../services'

  type Status = 'default' | 'loading' | 'success'
  type Message = {
    [key in Status]: string;
  };

  let status: Status = 'default'
  let message: Message = {
    default: 'ADICIONAR À SACOLA!',
    loading: 'ADICIONANDO...',
    success: 'ADICIONADO!',
  }

  const handleClickButton = async () => {
    status = 'loading'

    try {
      await addToCart($store.selectedVariant.id)
      document.dispatchEvent(new CustomEvent('cart-update'));
      status = 'success'
    } finally {
      setTimeout(() => {
        status = 'default'
      }, 1000)
    }
  }
</script>

<button
  class="buy-button"
  on:click={handleClickButton}
  disabled={status === 'loading'}
>
  <span>{ message[status] }</span>
  {#if status === 'loading'}
    <svg class="buy-button__rotate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z"></path></svg>
  {:else if status === 'success'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
  {/if}
</button>

<style lang="scss">
  @keyframes rotate{
    to{ transform: translateY(-50%) rotate(360deg); }
    from{ transform: translateY(-50%) rotate(0deg); }
  }

  .buy-button {
    width: 100%;
    height: var(--theme-spaces-xxl);
    border-radius: 3px;
    font-family: var(--theme-font-family);
    border: none;
    appearance: none;
    font-size: 16px;
    background: attr(data-color);
    background: var(--product-color);
    color: #fff;
    cursor: pointer;
    font-weight: 400;
    margin-bottom: var(--theme-spaces-lg);
    transition: opacity,transform .2s ease-in-out;
    position: relative;

    &__rotate {
      animation: rotate 1s infinite;
    }

    svg {
      position: absolute;
      right: var(--theme-spaces-md);
      fill: #FFF;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>