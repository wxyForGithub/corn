module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '258px': '258px',
        '264px': '264px',
        '50px': '50px',
        '35px': '35px'
      },
      fontSize: {
        '24px': '24px',
        '16px': '16px'
      }
    },
    textColor: {
      'FBFF00': '#FBFF00',
      'FFFFFF': '#FFFFFF',
    },
  },
  plugins: [],
}
