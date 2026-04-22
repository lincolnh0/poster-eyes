<template>
  <div class="flex flex-col justify-between p-8 rounded-2xl shadow-lg shadow-violet-500/10 bg-white/10 backdrop-blur-xl border border-white/20 gap-4">
    <h1 class="text-2xl font-bold text-white/90">{{ artist.name }}</h1>
    <ol class="list-decimal pl-4">
      <li v-for="track in tracks" :key="track.id">
        <p class="text-white/70">{{ track.name }}</p>
      </li>
    </ol>
    <Spotify :artist="artist"/>
  </div>
</template>

<script>
import Spotify from "@/components/Spotify.vue";

export default {
  name: "V1TracksCard",
  components: {Spotify},
  props: ["artist", "tracks"],
}
</script>
