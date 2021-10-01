<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'

  import type { Media } from 'src/types'

  export let image: Media;

  const dispatch = createEventDispatcher();

  const handleClickCloseButton = () => {
    dispatch('close');
  }

  onMount(() => {
    window.document.body.style.overflow = 'hidden';
  })

  onDestroy(() => {
    window.document.body.style.overflow = '';
  })
  
</script>

<div class="gallery-zoom">
  <button
    class="gallery-zoom__close-btn"
    on:click={handleClickCloseButton}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
  </button>
  <img class="gallery-zoom__image" src={ image?.src } alt="">
</div>

<style lang="scss">
  .gallery-zoom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    padding: var(--theme-spaces-sm);
    overflow: auto;

    &__close-btn {
      position: fixed;
      top: var(--theme-spaces-sm);
      right: var(--theme-spaces-sm);
      z-index: 100;
      width: 50px;
      height: 50px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--theme-colors-gray-dark);
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      appearance: none;
      border-radius: 3px;

      svg {
        width: var(--theme-spaces-sm);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }

    &__image {
      max-width: 100%;
      border-radius: 3px;
    }

    @media (max-width: 768px) {
      display: block;
      
      &__image {
        max-width: calc(100vw * 1.5);
      }
    }
  }
</style>