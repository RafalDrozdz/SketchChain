import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: "var(--box-shadow-input)",
      },
    },
    colors: {
      background: "rgb(var(--color-background-rgb) / <alpha-value>)",
      "background-secondary":
        "rgb(var(--color-background-secondary-rgb) / <alpha-value>)",
      text: "rgb(var(--color-text-rgb) / <alpha-value>)",
      primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
    },
  },
  variants: {
    extend: {
      // ...
      backgroundOpacity: ["active"],
    },
  },
  plugins: [],
};
export default config;
