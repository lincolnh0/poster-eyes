<script>
import ImageUpload from "@/components/ImageUpload.vue";
import ArtistResults from "@/components/ArtistResults.vue";
import axios from "axios";
import CreatePlaylist from "@/components/CreatePlaylist.vue";
export default {
  components: {CreatePlaylist, ImageUpload, ArtistResults},
  data() {
    return {
      artists: [],
      access_token: '',
      selected_tracks: '',
    }
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    if (code !== null || localStorage.getItem('access_code')) {
      await this.authorizationCodeAuth(code);
    } else {
      await this.clientCredentialsAuth();
    }
    if (localStorage.getItem('selected_tracks')) {
      this.selected_tracks = localStorage.getItem('selected_tracks');
    }
  },
  methods: {
    addArtists(extractedText) {
      this.artists = extractedText.split('\n');
    },
    resetArtists() {
      this.artists = [];
    },
    resetTracks(success=false) {
      if (success) {
        alert('Playlist created successfully');
      }
      localStorage.removeItem('selected_tracks');
      this.artists = [];
      this.selected_tracks = [];
    },
    async oauthAtSpotify(selected_tracks) {
      localStorage.setItem("selected_tracks", JSON.stringify(selected_tracks));

      if (localStorage.getItem('access_code') === undefined) {
        const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
        const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

        let code_verifier = this.generateRandomString(128);

        const code_challenge = await this.generateCodeChallenge(code_verifier)
        let state = this.generateRandomString(16);
        let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

        localStorage.setItem('code_verifier', code_verifier);

        let args = new URLSearchParams({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
          code_challenge_method: 'S256',
          code_challenge: code_challenge
        });

        window.location = 'https://accounts.spotify.com/authorize?' + args;
      } else {
        this.selected_tracks = localStorage.getItem('selected_tracks');

      }

    },
    async clientCredentialsAuth() {
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
    async authorizationCodeAuth(code) {
      const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
      const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

      const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        code_verifier: localStorage.getItem('code_verifier'),
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      })
      this.access_token = response.data.access_token;
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    },
    generateRandomString(length) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    async generateCodeChallenge(codeVerifier) {
      function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);

      return base64encode(digest);
    }
  }
}
</script>

<template>
  <div v-if="!selected_tracks.length" :key="selected_tracks">
    <ArtistResults v-if="access_token" :key="artists" :artists="artists"
                   :access_token="access_token"
                   :resetArtists="resetArtists"
                   :oauthRedirect="oauthAtSpotify"
    />
    <ImageUpload v-if="!artists.length" :key="artists" :addArtists="addArtists"/>
  </div>
  <div v-else>
    <CreatePlaylist :tracks="selected_tracks" :reset="resetTracks"/>
  </div>
</template>
