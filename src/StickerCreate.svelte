<script lang="ts">
  import {onMount} from 'svelte'
  import {fly, fade} from 'svelte/transition'
  import {navigate} from 'svelte-routing'
  import {NDKEvent} from "@nostr-dev-kit/ndk"
  import {pendingNdk} from './state'
  import Scanner from './Scanner.svelte'

  let error = null
  let mode = "scan"
  let draft = {
    id: null,
    value: "",
    content: "",
  }

  const resetError = () => {
    error = null
  }

  const startScanner = value => {
    mode = 'scan'
  }

  const setId = id => {
    draft.id = id
    mode = 'display'
    error = null
  }

  const publishSticker = async () => {
    if (!draft.value) {
      error = 'value'
    }

    if (!draft.id) {
      error = 'id'
    }

    const ndk = await pendingNdk
    const event = new NDKEvent(ndk, {
      kind: 32881,
      content: draft.content,
      tags: [
        ["d", draft.id],
        ["r", draft.value],
      ],
    })

    await event.publish()

    navigate(`/${draft.id}`)
  }


  const clearSticker = () => {
    navigate('/')
  }

  const deleteSticker = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      await draft.event.delete()
      navigate('/')
    }
  }
</script>

<div
  transition:fade
  class="cursor-pointer fixed z-20 inset-0 bg-black/50 p-4"
  on:click={clearSticker}>
  <div
    in:fly={{y: 20}}
    class="cursor-auto bg-white rounded-xl p-4 flex flex-col gap-2 max-w-2xl m-auto"
    on:click|stopPropagation|preventDefault>
    <h2 class="text-xl">Sticker Details</h2>
    <div class="grid grid-cols-3 items-center gap-2">
      <label for="description">Description</label>
      <input
        name="description"
        type="text"
        class="padding card-default col-span-2 rounded-xl"
        placeholder="Describe your sticker"
        bind:value={draft.content} />
      <label for="link">Link</label>
      <input
        name="link"
        type="text"
        class="padding card-default col-span-2 rounded-xl"
        placeholder="Point your sticker to a url"
        bind:value={draft.value}
        on:change={resetError} />
      {#if error === 'value'}
        <span class="text-red-500 col-span-3">
          Link is a required field
        </span>
      {/if}
      {#if mode === 'display'}
        <label for="code">Code</label>
        <div class="flex col-span-2 ">
          <input
            disabled
            name="code"
            type="text"
            class="padding card-default rounded-xl pr-8 w-full"
            placeholder="Your QR Code"
            bind:value={draft.id} />
          <i class="fa fa-qrcode mt-3 -ml-7 cursor-pointer" on:click={startScanner} />
        </div>
      {:else}
        <div class="col-span-3 flex flex-col gap-2">
          <Scanner onScan={setId} />
          <i class="w-full text-center" class:text-red-500={error === 'id'}>
            Scan a sticker with a QR code on it
          </i>
        </div>
      {/if}
    </div>
    <div class="flex justify-end gap-2">
      {#if draft.event}
        <button class={`padding button3`} on:click={deleteSticker}> Delete </button>
      {/if}
      <button class={`padding button1`} on:click={publishSticker}> Save Sticker </button>
    </div>
  </div>
</div>
