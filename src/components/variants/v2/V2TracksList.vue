<template>
  <div class="flex flex-col justify-between p-8 rounded-lg bg-white border border-gray-200 gap-4">
    <h2 class="text-2xl font-light text-gray-900">Track list</h2>
    <ol class="list-decimal pl-12 max-h-[50rem] overflow-y-scroll">
      <li class="text-gray-600" v-for="track in tracks" :key="track.id">
        <p>{{ track.name }} - {{ track.artists[0].name }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "V2TracksList",
  props: ["tracks"],
}
</script>
