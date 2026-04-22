<template>
  <div class="flex flex-col justify-between p-8 rounded-lg bg-white border border-gray-200 gap-4">
    <h1 class="text-2xl font-medium text-gray-900">{{ artist.name }}</h1>
    <ol class="list-decimal pl-4">
      <li v-for="track in tracks" :key="track.id">
        <p class="text-gray-600">{{ track.name }}</p>
      </li>
    </ol>
    <Spotify :artist="artist"/>
  </div>
</template>

<script>
import Spotify from "@/components/Spotify.vue";

export default {
  name: "V2TracksCard",
  components: {Spotify},
  props: ["artist", "tracks"],
}
</script>
