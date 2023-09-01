<script lang="ts">
  import {onMount} from 'svelte'
  import {pendingNdk} from './state'
  import StickerItem from './StickerItem.svelte'

  export let id

  let sticker
  let loading = true

  onMount(async () => {
    const ndk = await pendingNdk

    sticker = Array.from(await ndk.fetchEvents({kinds: [32881], '#d': [id]}))[0]
    loading = false
  })
</script>

{#if loading}
  Loading your sticker...
{:else if sticker}
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl">Here's what we found...</h1>
    <StickerItem {sticker} />
  </div>
{:else}
  Sorry, we couldn't find that sticker.
{/if}
