<template>
  <div class="flex flex-col justify-between p-8 rounded-xl shadow bg-gradient-to-b from-gray-700 gap-4">
    <h2 class="text-2xl font-bold text-gray-100">Track list</h2>
    <ol class="list-decimal pl-12 max-h-[50rem] overflow-y-scroll">
      <li class="text-gray-100"
          v-for="track in tracks" :key="track.id">
        <p>{{track.name}} - {{ track.artists[0].name }}</p>
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
