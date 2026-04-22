<template>
  <div v-if="artists.length" class="py-6">
    <h1 class="text-4xl text-center mb-12 font-light tracking-tight text-gray-900">Top tracks</h1>
    <p v-if="!track_results.length" class="text-gray-500 mt-12">Loading...</p>
    <div class="grid-cols-3 gap-8 grid w-full">
      <V2TracksCard v-for="track in track_results" :key="track.artist" :artist="track.artist" :tracks="track.tracks"/>
    </div>
    <div v-if="track_results.length" class="flex flex-col w-full mt-12 gap-4" >
      <button v-if="!logged_in" class="py-3 px-6 bg-gray-900 hover:bg-gray-700 text-white rounded text-lg font-medium"
              type="button"
              @click="oauthRedirect(selected_tracks)">
              Login and create playlist</button>
      <button v-else class="py-3 px-6 bg-gray-900 hover:bg-gray-700 text-white rounded text-lg font-medium"
              type="button"
              @click="oauthRedirect(selected_tracks)">
              Create playlist</button>
      <button class="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 rounded text-lg font-medium"
              type="button"
              @click="resetArtists">
        Start over</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import V2TracksCard from "@/components/variants/v2/V2TracksCard.vue";
export default {
  name: "V2ArtistResults",
  components: {V2TracksCard},
  props: ["artists", "access_token", "resetArtists", "oauthRedirect"],
  data() {
    return {
      artist_results: [],
      track_results: [],
      selected_tracks: [],
      logged_in: false,
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
    if (localStorage.getItem('access_token')) {
      this.logged_in = true;
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
        artist: artist,
        tracks: response.data.tracks
      });
      this.selected_tracks.push(...response.data.tracks);
    },
  }
}
</script>
