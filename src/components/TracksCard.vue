<template>
  <div class="flex flex-col justify-between p-8 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-4">
    <h1 class="text-2xl font-black uppercase text-black">{{ artist.name }}</h1>
    <ol class="list-decimal pl-4 font-mono">
      <li v-for="track in tracks" :key="track.id">
        <p class="text-black">{{ track.name }}</p>
      </li>
    </ol>
    <Spotify :artist="artist"/>
  </div>
</template>

<script>
import Spotify from "@/components/Spotify.vue";

export default {
  name: "TracksCard",
  components: {Spotify},
  props: ["artist", "tracks"],
}
</script>
