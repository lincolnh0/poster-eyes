<script setup>
import ImageUpload from '@/components/ImageUpload.vue'
import ArtistResults from '@/components/ArtistResults.vue'
import CreatePlaylist from '@/components/CreatePlaylist.vue'
import { useHomeLogic } from '@/composables/useHomeLogic'

const {
  artists, access_token, selected_tracks,
  addArtists, resetArtists, resetTracks, oauthAtSpotify,
} = useHomeLogic()
</script>

<template>
  <div class="font-mono text-black" v-if="!selected_tracks.length" :key="selected_tracks">
    <ArtistResults v-if="access_token" :key="artists" :artists="artists"
                   :access_token="access_token"
                   :resetArtists="resetArtists"
                   :oauthRedirect="oauthAtSpotify"
    />
    <ImageUpload v-if="!artists.length" :key="artists" :addArtists="addArtists"/>
  </div>
  <div class="font-mono text-black" v-else>
    <CreatePlaylist :tracks="selected_tracks" :reset="resetTracks"/>
  </div>
</template>
