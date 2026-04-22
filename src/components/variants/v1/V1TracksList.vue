<template>
  <div class="flex flex-col justify-between p-8 rounded-2xl shadow-lg shadow-violet-500/10 bg-white/10 backdrop-blur-xl border border-white/20 gap-4">
    <h2 class="text-2xl font-bold text-white/90">Track list</h2>
    <ol class="list-decimal pl-12 max-h-[50rem] overflow-y-scroll">
      <li class="text-white/70" v-for="track in tracks" :key="track.id">
        <p>{{ track.name }} - {{ track.artists[0].name }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "V1TracksList",
  props: ["tracks"],
}
</script>
