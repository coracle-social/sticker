<script lang="ts">
  import "@fortawesome/fontawesome-free/css/fontawesome.css"
  import "@fortawesome/fontawesome-free/css/solid.css"

  import {Route, Router, links, navigate} from "svelte-routing"
  import {user, login} from './state'
  import StickerList from './StickerList.svelte'
  import StickerDetail from './StickerDetail.svelte'
  import StickerCreate from './StickerCreate.svelte'
  import StickerPrint from './StickerPrint.svelte'

  let pathname = ""

  login()
</script>

<Router url={pathname}>
  <div use:links class="p-4 absolute inset-0 flex flex-col max-w-screen-md mx-auto gap-8">
    <div class="flex justify-between items-center print:hidden">
      <a class="text-2xl cursor-pointer" href="/">Sticker</a>
      <div class="flex justify-end">
        {#if $user}
          <button class="padding button1" on:click={() => navigate('/new')}> Add Sticker </button>
        {:else}
          <button class="padding button1" on:click={login}> Log In </button>
        {/if}
      </div>
    </div>
    <Route path="/" component={StickerList} />
    <Route path="/new" component={StickerCreate} />
    <Route path="/print" component={StickerPrint} />
    <Route path="/:id" component={StickerDetail} />
    <a href="/print" class="p-2 text-gray-400 text-center underline print:hidden"> Print a sheet of stickers </a>
  </div>
</Router>
