<template>
  <h1 class="text-5xl text-center mt-12 my-6 font-bold text-white/90 tracking-tight">
    Poster eyes
  </h1>
  <p class="text-violet-200/80 text-center">
    Helping you create a playlist ahead of your festivals.
  </p>
  <div v-show="!imageSrc"
       class="p-12 shadow mt-12 flex gap-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl items-center">
    <label class="text-xl font-bold text-white/90" for="file_input">Upload lineup poster</label>
    <input id="file_input"
        class="block w-1/2 text-gray-900 border border-white/20 rounded-lg cursor-pointer bg-white/10 backdrop-blur focus:outline-none"
         ref="file" type="file" @change="previewFiles()">
  </div>
  <div v-show="imageSrc">
    <V1ImageCrop :key="imageSrc" :src="imageSrc" :reset="resetImage" :submitArtists="addArtists"/>
  </div>
</template>

<script>
import V1ImageCrop from "@/components/variants/v1/V1ImageCrop.vue";

export default {
  name: "V1ImageUpload",
  props: ["addArtists"],
  components: {V1ImageCrop},
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
