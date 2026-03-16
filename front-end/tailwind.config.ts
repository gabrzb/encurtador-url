import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        project: {
          bg: '#efefef',
          card: '#e8e8e8',
          input: '#efefef',
          button: '#e2e2e2',
          social: '#dcdcdc',
          text1: '#111111',
          text2: '#555555',
          text3: '#777777',
          text4: '#aaaaaa',
          accentA: '#7c6ffa',
          accentB: '#3b82f6',
        },
      },
      boxShadow: {
        navbar: '0 4px 28px var(--shadow)',
        floating: '0 4px 18px var(--shadow)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.4)' },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
