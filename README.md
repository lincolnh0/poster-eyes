# postereyes

A VueJS based project that reads festival posters lineup and create
a Spotify playlist with the artists' top tracks.

## Project setup

Install dependencies
```
yarn
```

Local development
```
yarn dev
```

Build for production
```
yarn build
```

Spotify ENV files
- Create a Spotify app on https://developer.spotify.com/dashboard/applications
- Create a `.env` file on the root of the project
- Add the following variables to the `.env` file:
```
VITE_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
VITE_SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
VITE_SPOTIFY_REDIRECT_URI=YOUR_SPOTIFY_REDIRECT_URI
```
