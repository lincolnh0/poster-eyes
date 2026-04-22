<template>
  <div class="flex flex-col justify-between p-8 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-4">
    <h2 class="text-2xl font-black uppercase text-black">Track list</h2>
    <ol class="list-decimal pl-12 max-h-[50rem] overflow-y-scroll font-mono">
      <li class="text-black" v-for="track in tracks" :key="track.id">
        <p>{{ track.name }} - {{ track.artists[0].name }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "TrackList",
  props: ["tracks"],
}
</script>
