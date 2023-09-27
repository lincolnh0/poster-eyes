
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'spotify-green': {
          900:'#2D9F36',
          500:'#65d46e',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  plugins: [
    require('flowbite/plugin')
  ]

}