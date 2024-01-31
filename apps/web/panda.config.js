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

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      strictPropertyValues: true,
    },
  },
  // The output directory for your css system
  outdir: "styled-system",

  // global style
  globalCss,
});
