import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'xs': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 4px 8px -4px rgba(33, 37, 41, 0.10)',
        's': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 8px 12px -4px rgba(33, 37, 41, 0.10)',
        'm': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 12px 16px -4px rgba(33, 37, 41, 0.10)',
        'l': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 16px 24px -4px rgba(33, 37, 41, 0.10)',
        'xl': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 24px 36px -4px rgba(33, 37, 41, 0.10)',
      },
    },
  },
  plugins: [],
}
export default config
