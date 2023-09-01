<script lang="ts">
  import {onMount} from 'svelte'
  import {pendingNdk} from './state'
  import {getMeta} from './util'

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

<ul>
  {#each stickers as sticker (sticker.id)}
    {@const {r} = getMeta(sticker)}
    <li class="max-w-full overflow-hidden text-ellipsis">
      <strong>{sticker.content || 'Unnamed sticker'}</strong> points to
      <a href={r} class="underline">{r.replace(/.*:\/\//, '')}</a>
    </li>
  {/each}
</ul>
