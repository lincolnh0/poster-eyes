<template>
  <h1 class="text-5xl text-center mt-12 my-6 font-bold text-gray-100">
    Poster eyes
  </h1>
  <p class="text-gray-200 text-center">
    Helping you create a playlist ahead of your festivals.
  </p>
  <div v-show="!imageSrc"
       class="p-12 shadow rounded-xl mt-12 flex gap-12 bg-gradient-to-b from-gray-700 items-center">

    <label class="text-xl font-bold text-gray-100" for="file_input">Upload lineup poster</label>
    <input id="file_input"
        class="block w-1/2  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
         ref="file" type="file" @change="previewFiles()">
  </div>
  <div v-show="imageSrc">
    <ImageCrop :key="imageSrc" :src="imageSrc" :reset="resetImage" :submitArtists="addArtists"/>
  </div>
</template>

<script>
import ImageCrop from "@/components/ImageCrop.vue";

export default {
  name: "ImageUpload",
  props: ["addArtists"],
  components: {ImageCrop},
  data() {
    return {
      imageSrc: "",
    }
  },
  methods: {
    previewFiles() {
      this.imageSrc = URL.createObjectURL(this.$refs.file.files[0]);
    },
    resetImage() {
      this.imageSrc = '';
      this.$refs.file.value = '';
    }
  }
}

</script>

<style scoped>
</style>