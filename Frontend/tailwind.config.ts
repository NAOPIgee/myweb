import type { Config } from "tailwindcss";

const config: Config = {
  // 👇 修改這裡：確保包含你的實際路徑
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f4f1ea',
          dark: '#e0dbcf',
        },
        ink: {
          DEFAULT: '#222222',
          light: '#555555',
          red: '#c0392b',
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Songti TC', 'Times New Roman', 'serif'],
      },
      backgroundImage: {
        'paper-pattern': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
};
export default config;