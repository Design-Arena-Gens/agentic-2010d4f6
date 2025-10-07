import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cookie-brown': '#8B4513',
        'cookie-light': '#D2691E',
        'cream': '#FFFACD',
      },
    },
  },
  plugins: [],
};
export default config;
