import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        base: {
          wf: "#ffffff",
          bkf: "#000000",
        },
        tp: {
          wf: "#FFFFFF",
          w40: "#E1F0FF40",
          w32: "#E1F0FF32",
          w24: "#E1F0FF24",
          w16: "#E1F0FF16",
          w8: "#E1F0FF08",
          bkf: "#000000",
          bk85: "#26374785",
          bk40: "#26374740",
          bk32: "#26374732",
          bk24: "#26374724",
          bk16: "#26374716",
          bk8: "#26374708",
        },
        gray: {
          950: "#212529",
          900: "#343A40",
          800: "#495057",
          700: "#666E75",
          600: "#ADB5BD",
          500: "#CED4DA",
          400: "#DEE2E6",
          300: "#E9ECEF",
          200: "#F1F3F5",
          100: "#F8F9FA",
        },
        green: {
          700: "#16684F",
          600: "#1A7B5E",
          500: "#219A75",
          400: "#26B388",
          300: "#5DD0AD",
          88: "#26B38888",
          80: "#26B38880",
          72: "#26B38872",
          64: "#26B38864",
          56: "#26B38856",
          48: "#26B38848",
          32: "#26B38832",
          24: "#26B38824",
          16: "#26B38816",
          8: "#26B38808",
        },
        semantic: {
          r300: "#FE3D3D",
          r400: "#D40101",
          r500: "#A10101",
          b300: "#178FFD",
          b400: "#D40101",
          b500: "#A10101",
        },
      },
      boxShadow: {
        'xs': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 4px 8px -4px rgba(33, 37, 41, 0.10)',
        's': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 8px 12px -4px rgba(33, 37, 41, 0.10)',
        'm': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 12px 16px -4px rgba(33, 37, 41, 0.10)',
        'l': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 16px 24px -4px rgba(33, 37, 41, 0.10)',
        'xl': '0px 4px 6px -2px rgba(33, 37, 41, 0.04), 0px 24px 36px -4px rgba(33, 37, 41, 0.10)',
      },
      opacity: Object.fromEntries(
        Array.from({ length: 100 }, (_, i) => [`${i + 1}`, `${(i + 1) / 100}`])
      ),
    },
  },
  plugins: [],
}
export default config
