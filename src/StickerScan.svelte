<script lang="ts">
  import {navigate} from 'svelte-routing'
  import Scanner from './Scanner.svelte'

  const onScan = id => navigate("/" + id)
</script>

<div class="flex flex-col gap-2">
  <Scanner {onScan} />
  <i class="w-full text-center">
    Scan a sticker with a QR code on it
  </i>
</div>
