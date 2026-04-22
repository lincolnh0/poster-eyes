<script setup>
import V3ImageUpload from '@/components/variants/v3/V3ImageUpload.vue'
import V3ArtistResults from '@/components/variants/v3/V3ArtistResults.vue'
import V3CreatePlaylist from '@/components/variants/v3/V3CreatePlaylist.vue'
import { useHomeLogic } from '@/composables/useHomeLogic'
import { onMounted, onUnmounted } from 'vue'

const {
  artists, access_token, selected_tracks,
  addArtists, resetArtists, resetTracks, oauthAtSpotify,
} = useHomeLogic()

onMounted(() => document.body.classList.add('theme-v3'))
onUnmounted(() => document.body.classList.remove('theme-v3'))
</script>

<template>
  <div class="font-mono text-black" v-if="!selected_tracks.length" :key="selected_tracks">
    <V3ArtistResults v-if="access_token" :key="artists" :artists="artists"
                     :access_token="access_token"
                     :resetArtists="resetArtists"
                     :oauthRedirect="oauthAtSpotify" />
    <V3ImageUpload v-if="!artists.length" :key="artists" :addArtists="addArtists" />
  </div>
  <div class="font-mono text-black" v-else>
    <V3CreatePlaylist :tracks="selected_tracks" :reset="resetTracks" />
  </div>
</template>
