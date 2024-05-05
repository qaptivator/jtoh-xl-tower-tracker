/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  // easy: {
  //  light: '#75F347',
  //  DEFAULT: '#75F347',
  //  dark: '#75F347',
  // },
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        easy: "#75f347",
        medium: "#fffe00",
        hard: "#fd7c00",
        difficult: "#ff0c02",
        challenging: "#c10000",
        intense: "#19232d",
        remorseless: "#c800c8",
        insane: "#0000ff",
        extreme: "#0389ff",
        terrifying: "#00ffff",
        catastrophic: "#ffffff",
      },
    },
  },
  plugins: [],
  //darkMode: "selector",
  safelist: [
    {
      pattern:
        /(text)-(transparent|current|easy|medium|hard|difficult|challenging|intense|remorseless|insane|extreme|terrifying|catastrophic)/,
    },
    "font-outline-1",
    "font-outline-2",
    "font-outline-4",
    "bg-black",
    "bg-white",
  ],
};
