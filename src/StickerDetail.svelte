<script lang="ts">
  import {onMount} from 'svelte'
  import {pendingNdk} from './state'
  import {getMeta} from './util'

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
  {@const {r} = getMeta(sticker)}
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl">Here's what we found...</h1>
    <p>
      <strong>{sticker.content || "Your sticker"}</strong> points to
      <a href={r} class="underline">{r.replace(/.*:\/\//, '')}</a>
    </p>
  </div>
{:else}
  Sorry, we couldn't find that sticker.
{/if}
