<script>
import ImageUpload from "@/components/ImageUpload.vue";
import ArtistResults from "@/components/ArtistResults.vue";
import axios from "axios";
export default {
  components: {ImageUpload, ArtistResults},
  data() {
    return {
      artists: [],
      access_token: '',
    }
  },
  async mounted() {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

    const response = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
    this.access_token = response.data.access_token;
  },
  methods: {
    addArtists(extractedText) {
      this.artists = extractedText.split('\n');
      console.log(this.artists)
    }

  }
}
</script>

<template>
  <div>
    <ArtistResults v-if="access_token" :key="artists" :artists="artists" :access_token="access_token"/>
    <ImageUpload v-if="!artists.length" :key="artists" :addArtists="addArtists"/>
  </div>
</template>
