import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  body: {
    background: "#131418",
    color: "white",
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  jsxFramework: "react",
  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,astro}",
    "./pages/**/*.{js,jsx,ts,tsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sms: "320px",
        ssms: "275px",
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  globalCss,
});
