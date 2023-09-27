<template>
  <form class="flex flex-col items-start gap-4" @submit.prevent="submitRecogniseImage()">
    <div class="p-12 w-full my-12 flex justify-around gap-12 shadow rounded bg-gradient-to-b from-gray-700"
          v-show="src">
      <div class="w-full flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Please crop out the artists names</h2>
        <img ref="image" :src="src" crossorigin>
        <div class="flex w-full gap-6">
          <button @click="reset" class="py-3 px-6 w-full rounded shadow text-lg font-bold bg-gray-500 hover:bg-gray-600 text-gray-100 hover:text-gray-200"
                  type="button"
          >Reset image</button>
          <button v-show="!extractedText" class="py-3 px-6 w-full rounded shadow text-lg font-bold bg-spotify-green-500 hover:bg-spotify-green-900 text-gray-900 hover:text-gray-100"
                  type="submit">Identify</button>
        </div>
      </div>
      <div class="w-full">
        <div class="flex flex-col gap-4" v-show="!extractedText" >
          <h2 class="text-2xl font-bold">Preview</h2>
          <img ref="destination" :src="destination"/>
        </div>
        <div class="flex flex-col gap-4" v-show="extractedText">
          <h2 class="text-2xl font-bold">Manual edit</h2>
          <p>Some symbols / fonts might not be recognised properly, please correct any errors below.</p>
          <textarea class="p-4 rounded shadow w-full leading-9 text-gray-900"
                    v-model="extractedText" rows="15" cols="40"></textarea>
          <div class="flex w-full gap-6">
            <button class="py-3 px-6 w-1/2 rounded shadow text-lg font-bold bg-gray-500 hover:bg-gray-600 text-gray-100 hover:text-gray-200"
                    type="button"
                    @click="extractedText = ''">Recrop</button>
            <button class="py-3 px-6 w-1/2 rounded shadow text-lg font-bold bg-spotify-green-500 hover:bg-spotify-green-900 text-gray-900 hover:text-gray-100"
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
  name: "ImageCrop",
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
      crop: () => {
        const cropSettings = {}
        cropSettings.maxWidth = 500;
        const canvas = this.cropper.getCroppedCanvas(cropSettings);
        this.destination = canvas.toDataURL("image/png");
      }
    });
  },
  methods: {
    async submitRecogniseImage() {
      this.extractedText = '';
      const file = this.$refs.destination.src;
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const regex = /\b[a-zA-Z0-9\s]*\b/gm;
      let m;
      while ((m = regex.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
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
