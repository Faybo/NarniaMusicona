import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon-red': '0 0 4px rgba(255, 255, 255, 0.8), 0 0 6px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 255), 0 0 10px rgba(0, 0, 0, 1)',
      },

    },
  },
  plugins: [],
}
export default config
