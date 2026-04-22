import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useHomeLogic() {
  const artists = ref([])
  const access_token = ref('')
  const selected_tracks = ref('')

  function addArtists(extractedText) {
    artists.value = extractedText.split('\n')
  }

  function resetArtists() {
    artists.value = []
  }

  function resetTracks(success = false) {
    if (success) {
      alert('Playlist created successfully')
    }
    localStorage.removeItem('selected_tracks')
    artists.value = []
    selected_tracks.value = []
  }

  async function oauthAtSpotify(selectedTracksData) {
    localStorage.setItem('selected_tracks', JSON.stringify(selectedTracksData))

    if (localStorage.getItem('access_token') === null) {
      const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
      const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

      let code_verifier = generateRandomString(128)

      const code_challenge = await generateCodeChallenge(code_verifier)
      let state = generateRandomString(16)
      let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private'

      localStorage.setItem('code_verifier', code_verifier)

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: code_challenge
      })

      window.location = 'https://accounts.spotify.com/authorize?' + args
    } else {
      selected_tracks.value = localStorage.getItem('selected_tracks')
    }
  }

  async function clientCredentialsAuth() {
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
    access_token.value = response.data.access_token
  }

  async function authorizationCodeAuth(code) {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
    try {
      if (localStorage.getItem('refresh_token') !== null) {
        const response = await axios.post('https://accounts.spotify.com/api/token', {
          grant_type: 'refresh_token',
          client_id: client_id,
          refresh_token: localStorage.getItem('refresh_token'),
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        })
        access_token.value = response.data.access_token
        localStorage.setItem('access_token', response.data.access_token)
      } else {
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
        access_token.value = response.data.access_token
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function generateRandomString(length) {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '')
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)

    return base64encode(digest)
  }

  onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    if (code !== null || localStorage.getItem('access_token')) {
      await authorizationCodeAuth(code)
    } else {
      await clientCredentialsAuth()
    }
    if (localStorage.getItem('selected_tracks') !== null) {
      selected_tracks.value = localStorage.getItem('selected_tracks')
    }
  })

  return {
    artists,
    access_token,
    selected_tracks,
    addArtists,
    resetArtists,
    resetTracks,
    oauthAtSpotify,
  }
}
