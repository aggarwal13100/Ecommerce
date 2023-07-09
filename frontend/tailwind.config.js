/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dim-gray": "var(--dim-gray)",
        "pine-green": "var(--pine-green)",
        "midnight-green": "var(--midnight-green)",
        "celadon": "var(--celadon)",
        "baby-powder": "var(--baby-powder)"
      },
    },

  },
  plugins: [],
}