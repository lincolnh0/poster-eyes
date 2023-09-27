<template>
  <a :href="artist.external_urls.spotify" class="flex items-center gap-4 text-lg font-bold hover:text-gray-500">
    <img width="30" src="@/assets/spotify_logo.png" alt="Spotify logo"/>
    Open on Spotify
  </a>
</template>
<script>
export default {
  props: ["artist"],
  mounted() {
    console.log(this.artist.external_urls.spotify)
  }
}
</script>