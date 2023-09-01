<script lang="ts">
  import {getMeta} from './util'

  export let sticker

  const {r} = getMeta(sticker)
</script>

<div class="max-w-full overflow-hidden text-ellipsis">
  <div><strong>{sticker.content || 'Unnamed sticker'}</strong></div>
  <div class="flex gap-2 items-center">
    <i class="fa fa-arrow-right" />
    <a href={r} class="underline">{r.replace(/.*:\/\//, '')}</a>
  </div>
</div>
