<script lang="ts">
  import {range} from 'hurdak'
  import {onMount} from 'svelte'
  import {navigate} from 'svelte-routing'
  import QRCode from './QRCode.svelte'

  onMount(() => {
    window.print()
    navigate("/")
  })
</script>

<div class="grid grid-cols-4 gap-2">
  {#each range(0, 24) as row}
    <QRCode code={crypto.randomUUID()} />
  {/each}
</div>
