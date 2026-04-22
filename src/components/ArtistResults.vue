<template>
  <div v-if="artists.length" class="py-6">
    <h1 class="text-5xl text-center mb-12 font-black uppercase tracking-widest text-black">Top tracks</h1>
    <p v-if="!track_results.length" class="text-black font-mono uppercase mt-12">Loading...</p>
    <div class="grid-cols-3 gap-8 grid w-full">
      <TracksCard v-for="track in track_results" :key="track.artist" :artist="track.artist" :tracks="track.tracks"/>
    </div>
    <div v-if="track_results.length" class="flex flex-col w-full mt-12 gap-4" >
      <button v-if="!logged_in" class="py-3 px-6 bg-red-500 border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              type="button"
              @click="oauthRedirect(selected_tracks)">
              Login and create playlist</button>
      <button v-else class="py-3 px-6 bg-red-500 border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              type="button"
              @click="oauthRedirect(selected_tracks)">
              Create playlist</button>
      <button class="py-3 px-6 bg-white border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              type="button"
              @click="resetArtists">
        Start over</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TracksCard from "@/components/TracksCard.vue";
export default {
  name: "ArtistResults",
  components: {TracksCard},
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
