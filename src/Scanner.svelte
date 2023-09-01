<script lang="ts">
  import QrScanner from "qr-scanner"
  import {onMount, onDestroy} from "svelte"

  export let onScan

  let video
  let scanner
  let status = "closed"

  const onDecode = result => {
    onScan(result.data)
  }

  export const start = () => {
    status = "loading"

    scanner = new Promise(resolve => {
      setTimeout(async () => {
        const scanner = new QrScanner(video, onDecode, {
          returnDetailedScanResult: true,
        })

        await scanner.start()

        if (status === "closed") {
          stop()
        } else {
          resolve(scanner)

          status = "ready"
        }
      }, 1000)
    })
  }

  export const stop = async () => {
    status = "closed"

    if (scanner) {
      const s = await scanner

      await s.stop()
      await s.destroy()
    }
  }

  onMount(start)
  onDestroy(stop)
</script>

{#if status !== "closed"}
  {#if status === "loading"}
    <span class="text-center">Loading your camera...</span>
  {/if}
  <div
    class="m-auto rounded border border-solid border-gray-6 bg-gray-8 p-4"
    class:hidden={status !== "ready"}>
    <video class="m-auto rounded" bind:this={video} />
  </div>
{/if}
