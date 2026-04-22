<template>
  <h1 class="text-4xl text-center mt-16 my-6 font-light tracking-tight text-gray-900">
    Poster eyes
  </h1>
  <p class="text-gray-500 text-center font-light">
    Helping you create a playlist ahead of your festivals.
  </p>
  <div v-show="!imageSrc"
       class="p-12 bg-white border border-gray-200 rounded-lg mt-12 flex gap-12 items-center">

    <label class="text-lg font-medium text-gray-700" for="file_input">Upload lineup poster</label>
    <input id="file_input"
        class="block w-1/2 text-gray-700 border border-gray-300 rounded bg-gray-50 cursor-pointer focus:outline-none"
         ref="file" type="file" @change="previewFiles()">
  </div>
  <div v-show="imageSrc">
    <V2ImageCrop :key="imageSrc" :src="imageSrc" :reset="resetImage" :submitArtists="addArtists"/>
  </div>
</template>

<script>
import V2ImageCrop from "@/components/variants/v2/V2ImageCrop.vue";

export default {
  name: "V2ImageUpload",
  props: ["addArtists"],
  components: {V2ImageCrop},
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
