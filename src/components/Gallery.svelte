<script lang="ts">
  import { store } from '../store'
  import { createImageURL } from '../utils'

  import GalleryZoom from './GalleryZoom.svelte'

  let imageActiveIndex = 0
  let imageIsLoading = true
  let imageZoomActive = false

  $: ({ media } = $store.product)
  $: images = media.filter(({ media_type }) => media_type === 'image')
  $: imageActive = images[imageActiveIndex]

  const handleClickImageThumbnail = (index: number) => {
    if (index === imageActiveIndex) return
    imageIsLoading = true
    imageActiveIndex = index
  }

  const handleClickZoomButton = () => {
    imageZoomActive = true
  }

  const onLoadImage = () => imageIsLoading = false

</script>

<div class="gallery">
  <div class="gallery__image-container">
    <img
      src={imageActive.src}
      alt={imageActive.alt}
      class="gallery__image"
      on:load={onLoadImage}
    >
    {#if imageIsLoading}
      <div class="gallery__image-loading"></div>
    {:else}
      <button
        class="gallery__image-zoom-btn"
        on:click={handleClickZoomButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM10 10V7h2v3h3v2h-3v3h-2v-3H7v-2h3z"/></svg>
      </button>
    {/if}
  </div>
  <div class="gallery-thumbnails">
    {#each images as image, index}
      <img
        src={createImageURL(image.src, 'small')}
        alt={image.alt}
        class="gallery-thumbnails__item"
        class:gallery-thumbnails__item--active={index === imageActiveIndex}
        on:click={() => handleClickImageThumbnail(index)}
      >
    {/each}
  </div>
</div>
{#if imageZoomActive}
  <GalleryZoom image={imageActive} on:close={() => imageZoomActive = false}/>
{/if}

<style lang="scss">
  .gallery {
    width: 100%;
    position: relative;
    padding-left: calc(100px + var(--theme-spaces-xs));
    box-sizing: border-box;
    display: block;

    &__image-container {
      width: 100%;
      position: relative;
    }

    &__image {
      width: 100%;
      border-radius: 3px;
      display: block;
      margin: 0;
      padding: 0;
    }

    &__image-loading {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      background-color: rgba(0,0,0,0.5);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: var(--theme-spaces-xs);

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      &::after {
        content: '';
        width: 80%;
        height: 80%;
        border-radius: 50%;
        border: 2px solid #FFF;
        border-top-color: transparent;
        animation: rotate 1s linear infinite;
      }
    }

    &__image-zoom-btn {
      position: absolute;
      width: 50px;
      height: 50px;
      bottom: var(--theme-spaces-xs);
      right: var(--theme-spaces-xs);
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--theme-colors-gray-dark);
      border: none;
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      appearance: none;
      
      svg {
        width: var(--theme-spaces-sm);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.7);
      }
    }

    @media (max-width: 768px) {
      padding-left: 0;
      display: flex;
      flex-direction: column;
      margin-bottom: var(--theme-spaces-xs);

      &__image-container {
        margin-bottom: var(--theme-spaces-xs);
      }
    }
  }

  .gallery-thumbnails {
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;

    &::-webkit-scrollbar {
      display: none;
    }

    &__item {
      width: 100%;
      margin-bottom: var(--theme-spaces-xs);
      border-radius: 3px;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: var(--theme-color-gray-light);
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &--active {
        border-color: var(--theme-color-gray-dark);
      }
    }

    @media (max-width: 768px) {
      position: initial;
      width: 100%;
      flex-direction: row;

      &__item {
        width: auto;
        height: 100px;
        margin-right: var(--theme-spaces-xs);
        margin-bottom: 0;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>