/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          dark: '#060d19',
          depth: '#0a1428',
          light: '#1a2f4c'
        },
        navy: {
          deep: '#0d1b2a',
          card: 'rgba(13, 27, 42, 0.85)'
        },
        cream: {
          warm: '#f4f1de',
          muted: '#ece4d0'
        },
        brass: {
          DEFAULT: '#c5a059',
          light: '#d4af37',
          gold: '#e5c158'
        },
        wood: {
          dark: '#1a1008',
          medium: '#2c1d11',
          accent: '#3e2723'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
