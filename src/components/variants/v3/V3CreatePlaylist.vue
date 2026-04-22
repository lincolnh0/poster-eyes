<template>
  <form class="flex flex-col gap-4 w-full mt-12 items-center"
      @submit.prevent="createPlaylist">
    <label class="text-2xl font-black uppercase text-black"
        :for="playlist_title">Playlist Title</label>
    <input class="w-1/2 py-4 block bg-white text-black border-4 border-black font-mono cursor-pointer focus:outline-none"
        :id="playlist_title" v-model="playlist_title" type="text"/>
    <div class="flex gap-4">
      <button type="submit" class="py-2 px-4 bg-red-500 border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        Create Playlist
      </button>
      <button type="button" @click="reset(false)" class="py-2 px-4 bg-white border-4 border-black text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        New Search
      </button>
    </div>
  </form>

  <div class="my-6">
    <V3TracksList :tracks="tracklist"/>
  </div>
</template>

<script>
import axios from "axios";
import V3TracksList from "@/components/variants/v3/V3TracksList.vue";

export default {
  name: "V3CreatePlaylist",
  components: {V3TracksList},
  props: ["tracks", "reset"],
  data: () => ({
    access_token: '',
    playlist_title: "",
    playlist_id: "",
    user_id: "",
    tracklist: [],
  }),
  async mounted() {
    this.access_token = localStorage.getItem('access_token')
    this.tracklist = JSON.parse(localStorage.getItem('selected_tracks'))
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + this.access_token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    this.user_id = response.data.id
  },
  methods: {
    async createPlaylist() {
      const response = await axios.post(`https://api.spotify.com/v1/users/${this.user_id}/playlists`, {
        name: this.playlist_title,
        description: "Created by Poster Eyes"
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.access_token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      this.playlist_id = response.data.id;
      await this.addTracksToPlaylist();
    },
    async addTracksToPlaylist() {
      const chunkSize = 100;
      for (let i = 0; i < this.tracklist.length; i += chunkSize) {
        const chunk = this.tracklist.slice(i, i + chunkSize);
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${this.playlist_id}/tracks`, {
          uris: chunk.map(track => track.uri)
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        if (response.status !== 201) {
          alert("Playlist cannot be created. Please try again.")
          break;
        }
      }
      this.reset(true);
    }
  }
}
</script>
