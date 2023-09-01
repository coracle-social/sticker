<script lang="ts">
  import cx from "classnames"
  import QRCode from "qrcode"
  import {onMount} from "svelte"

  export let code

  let canvas

  onMount(() => QRCode.toCanvas(canvas, code))
</script>

<div class="m-auto flex max-w-sm flex-col gap-4">
  <canvas class="m-auto rounded-xl" bind:this={canvas} />
</div>
