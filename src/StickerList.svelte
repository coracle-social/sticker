<script lang="ts">
  import {onMount} from 'svelte'
  import {pendingNdk} from './state'
  import StickerItem from './StickerItem.svelte'

  let stickers = []

  onMount(async () => {
    const ndk = await pendingNdk

    const filter = {kinds: [32881], limit: 1000}

    const allStickers = Array.from(await ndk.fetchEvents(filter))

    const deletions = Array.from(
      await ndk.fetchEvents({
        kinds: [5],
        "#e": Array.from(allStickers).map(e => e.id),
      }),
    )

    const deletedIds = new Set(deletions.map(e => e.tagValue("e")))

    stickers = allStickers.filter(e => !deletedIds.has(e.id))
  })
</script>

<ul class="flex flex-col gap-8">
  {#each stickers as sticker (sticker.id)}
    <li><StickerItem {sticker} /></li>
  {/each}
</ul>
