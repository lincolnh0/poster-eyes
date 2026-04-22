<script setup>
import V1ImageUpload from '@/components/variants/v1/V1ImageUpload.vue'
import V1ArtistResults from '@/components/variants/v1/V1ArtistResults.vue'
import V1CreatePlaylist from '@/components/variants/v1/V1CreatePlaylist.vue'
import { useHomeLogic } from '@/composables/useHomeLogic'
import { onMounted, onUnmounted } from 'vue'

const {
  artists, access_token, selected_tracks,
  addArtists, resetArtists, resetTracks, oauthAtSpotify,
} = useHomeLogic()

onMounted(() => document.body.classList.add('theme-v1'))
onUnmounted(() => document.body.classList.remove('theme-v1'))
</script>

<template>
  <div v-if="!selected_tracks.length" :key="selected_tracks">
    <V1ArtistResults v-if="access_token" :key="artists" :artists="artists"
                     :access_token="access_token"
                     :resetArtists="resetArtists"
                     :oauthRedirect="oauthAtSpotify" />
    <V1ImageUpload v-if="!artists.length" :key="artists" :addArtists="addArtists" />
  </div>
  <div v-else>
    <V1CreatePlaylist :tracks="selected_tracks" :reset="resetTracks" />
  </div>
</template>
