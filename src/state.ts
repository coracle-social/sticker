import {writable} from 'svelte/store'
import NDK, {NDKNip07Signer, NDKEvent} from "@nostr-dev-kit/ndk"

export const user = writable(null)

export const login = async () => {
  const ndk = await pendingNdk

  ndk.signer = new NDKNip07Signer()

  await ndk.signer.blockUntilReady()

  user.set(await ndk.signer.user())
}

export const pendingNdk = (async () => {
  const ndk = new NDK({
    explicitRelayUrls: [
      "wss://relay.damus.io",
      "wss://relay.nostr.band",
      "wss://relayable.org",
      "wss://relay.snort.social",
    ],
  })

  await ndk.connect()

  return ndk
})()
