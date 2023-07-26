/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {

    extend: {
      colors: {
        "dcam-light-blue": "#68ace3",
        "dcam-regular-blue": "#216dab",
        "dcam-dark-blue": "#103756",
        "dcam-red": "#c45429",
        "dcam-light-red": "#d97047",
        "dcam-orange": "#fc7753",
        "dcam-green": "#4aad52"
      },
    },
  },
  plugins: [],
}

