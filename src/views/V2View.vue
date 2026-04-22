<script setup>
import V2ImageUpload from '@/components/variants/v2/V2ImageUpload.vue'
import V2ArtistResults from '@/components/variants/v2/V2ArtistResults.vue'
import V2CreatePlaylist from '@/components/variants/v2/V2CreatePlaylist.vue'
import { useHomeLogic } from '@/composables/useHomeLogic'
import { onMounted, onUnmounted } from 'vue'

const {
  artists, access_token, selected_tracks,
  addArtists, resetArtists, resetTracks, oauthAtSpotify,
} = useHomeLogic()

onMounted(() => document.body.classList.add('theme-v2'))
onUnmounted(() => document.body.classList.remove('theme-v2'))
</script>

<template>
  <div class="text-gray-800" v-if="!selected_tracks.length" :key="selected_tracks">
    <V2ArtistResults v-if="access_token" :key="artists" :artists="artists"
                     :access_token="access_token"
                     :resetArtists="resetArtists"
                     :oauthRedirect="oauthAtSpotify" />
    <V2ImageUpload v-if="!artists.length" :key="artists" :addArtists="addArtists" />
  </div>
  <div class="text-gray-800" v-else>
    <V2CreatePlaylist :tracks="selected_tracks" :reset="resetTracks" />
  </div>
</template>
