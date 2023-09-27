<template>
  <div class="flex flex-col justify-between p-8 rounded-xl shadow bg-gradient-to-b from-gray-700 min-h-[500px]">
    <h1 class="text-2xl font-bold text-gray-100">{{ artist }}</h1>
    <ul class="">
      <li v-for="track in tracks" :key="track.id">
        <input type="checkbox" class="mr-2" :id="track.id" checked>
        <label :for="track.id">{{track.name}}</label>
      </li>
    </ul>
    <div class="flex w-full gap-4 mt-4">
      <button class="py-3 px-6 w-1/2 rounded shadow bg-gray-500 hover:bg-gray-600 text-gray-100 hover:text-gray-200"
              type="button"
              >Toggle all</button>
      <button class="py-3 px-6 w-1/2 rounded shadow bg-spotify-green-500 hover:bg-spotify-green-900 text-gray-900 hover:text-gray-100"
              type="button">Add</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "TracksCard",
  props: ["artist", "tracks"],
}
</script>

<style scoped>

</style>