<template>
  <div v-if="artists.length" class="py-12">
    <h1 class="text-5xl text-center mb-12 font-bold text-gray-100">Tops tracks</h1>
    <div class="grid-cols-3 gap-8 grid w-full">
      <TracksCard v-for="track in track_results" :key="track.artist" :artist="track.artist" :tracks="track.tracks"/>
    </div>
    <div v-if="track_results.length" class="flex flex-col w-full mt-12">
      <button class="py-3 px-6 rounded shadow text-lg font-bold bg-spotify-green-500 hover:bg-spotify-green-900 text-gray-900 hover:text-gray-100"
              type="button">Review and complete</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TracksCard from "@/components/TracksCard.vue";
export default {
  name: "ArtistResults",
  components: {TracksCard},
  props: ["artists", "access_token"],
  data() {
    return {
      artist_results: [],
      track_results: [],
    }
  },
  async mounted() {
    for (const artist of this.artists) {
      if (artist.length > 1) {
        await this.searchSpotifyArtist(artist);
      }
    }
    for (const artist of this.artist_results) {
      await this.displayArtistsTopTracks(artist);
    }

  },
  methods: {
    async searchSpotifyArtist(artist) {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': 'Bearer ' + this.access_token,
          'Accept': 'application/json'
        },
        params: {
          q: artist,
          type: 'artist'
        }
      });
      this.artist_results.push(response.data.artists.items[0]);
    },
    async displayArtistsTopTracks(artist) {
      const response = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
        headers: {
          'Authorization': 'Bearer ' + this.access_token,
          'Accept': 'application/json'
        },
        params: {
          market: 'GB'
        }
      });
      this.track_results.push({
        artist: artist.name,
        tracks: response.data.tracks
      })
    }
  }
}
</script>