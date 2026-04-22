<template>
  <h1 class="text-5xl text-center mt-12 my-6 font-black uppercase tracking-widest text-black">
    Poster eyes
  </h1>
  <p class="text-black text-center font-mono uppercase tracking-wide">
    Helping you create a playlist ahead of your festivals.
  </p>
  <div v-show="!imageSrc"
       class="bg-yellow-300 border-4 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-12 flex gap-12 items-center">

    <label class="text-xl font-black uppercase text-black" for="file_input">Upload lineup poster</label>
    <input id="file_input"
        class="block w-1/2 text-black border-4 border-black bg-white cursor-pointer focus:outline-none"
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
