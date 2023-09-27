<template>
  <div class="flex flex-col justify-start p-8 rounded-xl shadow bg-gradient-to-b from-gray-700 gap-4">
    <h1 class="text-2xl font-bold text-gray-100">{{ artist }}</h1>
    <p v-if="!tracks.length" class="text-gray-100 mt-12">Loading...</p>
    <ol class="list-decimal pl-4">
      <li v-for="track in tracks" :key="track.id">
        <!--    To be implemented -->
<!--        <input type="checkbox" class="mr-2" :id="track.id" checked>-->
<!--        <label :for="track.id">{{track.name}}</label>-->
        <p class="text-gray-100">{{track.name}}</p>
      </li>
    </ol>
<!--    <div class="flex w-full gap-4 mt-4">-->
<!--      <button class="py-3 px-6 w-1/2 rounded shadow bg-gray-500 hover:bg-gray-600 text-gray-100 hover:text-gray-200"-->
<!--              type="button"-->
<!--              >Toggle all</button>-->
<!--      <button class="py-3 px-6 w-1/2 rounded shadow bg-spotify-green-500 hover:bg-spotify-green-900 text-gray-900 hover:text-gray-100"-->
<!--              type="button">Add</button>-->
<!--    </div>-->
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