<template>
  <form class="flex flex-col items-start gap-4" @submit.prevent="submitRecogniseImage()">
    <div class="bg-yellow-300 border-4 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full my-12 flex justify-around gap-12"
          v-show="src">
      <div class="w-full flex flex-col gap-4">
        <h2 class="text-2xl font-black uppercase text-black">Please crop out the artists names</h2>
        <img ref="image" :src="src" crossorigin>
        <div class="flex w-full gap-6">
          <button @click="reset" class="py-3 px-6 w-full bg-white border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  type="button"
          >Reset image</button>
          <button v-show="!extractedText" class="py-3 px-6 w-full bg-red-500 border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  type="submit">Identify</button>
        </div>
      </div>
      <div class="w-full">
        <div class="flex flex-col gap-4" v-show="!extractedText" >
          <h2 class="text-2xl font-black uppercase text-black">Preview</h2>
          <img ref="destination" :src="destination"/>
        </div>
        <div class="flex flex-col gap-4" v-show="extractedText">
          <h2 class="text-2xl font-black uppercase text-black">Manual edit</h2>
          <p class="text-black font-mono">Some symbols / fonts might not be recognised properly, please correct any errors below.</p>
          <textarea class="p-4 w-full leading-9 bg-white text-black border-4 border-black font-mono"
                    v-model="extractedText" rows="15" cols="40"></textarea>
          <div class="flex w-full gap-6">
            <button class="py-3 px-6 w-1/2 bg-white border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    type="button"
                    @click="extractedText = ''">Recrop</button>
            <button class="py-3 px-6 w-1/2 bg-red-500 border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    @click="submitArtists(extractedText)"
                    type="button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {createWorker} from "tesseract.js";
import Cropper from "cropperjs";

export default {
  name: "V3ImageCrop",
  props: ["src", "reset", "submitArtists"],
  data() {
    return {
      cropper: {},
      destination: {},
      image: {},
      extractedText: "",
    }
  },
  mounted() {
    this.image = this.$refs.image;
    this.cropper = new Cropper(this.image, {
      zoomable: false,
      scalable: false,
      crop: () => {
        const cropSettings = {}
        cropSettings.maxWidth = 800;
        const canvas = this.cropper.getCroppedCanvas(cropSettings);
        this.destination = canvas.toDataURL("image/png");
      }
    });
  },
  methods: {
    async submitRecogniseImage() {
      this.extractedText = '';
      const file = this.$refs.destination.src;
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const regex = /\b[a-zA-Z0-9\s]*\b/gm;
      let m;
      while ((m = regex.exec(text)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        m.forEach((match) => {
          if (match.length >= 1) {
            this.extractedText += match + '\n';
          }
        });
      }
    }
  }
}
</script>
