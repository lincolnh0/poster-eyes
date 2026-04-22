import flowbite from 'flowbite/plugin'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': {
          900: '#2D9F36',
          500: '#65d46e',
        },
      },
    },
  },
  plugins: [flowbite],
}
