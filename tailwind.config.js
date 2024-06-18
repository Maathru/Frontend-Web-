const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{jsx,js}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-nav": "rgb(48,0,65,0.02)",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
