/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      colors: {
        foreground: 'var(--foreground)',
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
        },
        contrast: {
          primary: 'var(--contrast-primary)',
          secondary: 'var(--contrast-secondary)',
          tertiary: 'var(--contrast-tertiary)',
          quaternary: 'var(--contrast-quaternary)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          dim: 'var(--surface-dim)',
          muted: 'var(--surface-muted)',
        },
        accent: 'var(--accent)',
        gradient: {
          100: 'var(--gradient-100)',
          200: 'var(--gradient-200)',
          300: 'var(--gradient-300)',
        },
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        sparkle: {
          '0%, 100%': {
            opacity: '1',
            scale: '1',
          },
          '50%': {
            opacity: '0.5',
            scale: '0.9',
          },
        },
        loading: {
          '0%': { transform: 'translateX(-80px)' },
          '100%': { transform: 'translateX(160px)' },
        },
        'image-first': {
          '0%': {
            top: '0px',
            right: '-50px',
            rotate: '-10deg',
            scale: '0.75',
            opacity: '0',
          },
          '20%, 40%': {
            opacity: '1',
          },
          '100%': {
            top: '-250px',
            right: '-75px',
            rotate: '20deg',
            scale: '1.5',
            opacity: '0',
          },
        },
        'image-second': {
          '0%': {
            bottom: '175px',
            left: '-75px',
            rotate: '45deg',
            scale: '0.5',
            opacity: '0',
          },
          '20%, 40%': {
            opacity: '1',
          },
          '100%': {
            bottom: '75px',
            left: '-200px',
            rotate: '10deg',
            scale: '0.75',
            opacity: '0',
          },
        },
        'image-third': {
          '0%': {
            bottom: '0px',
            right: '-100px',
            rotate: '20deg',
            scale: '0.75',
            filter: 'blur(5px)',
            opacity: '0',
          },
          '20%, 40%': {
            opacity: '1',
            filter: 'blur(5px)',
          },
          '100%': {
            bottom: '-150px',
            right: '-75px',
            rotate: '-40deg',
            scale: '1.5',
            opacity: '0',
            filter: 'blur(20px)',
          },
        },
        'image-fourth': {
          '0%': {
            bottom: '275px',
            right: '75px',
            rotate: '10deg',
            scale: '0.5',
            opacity: '0',
          },
          '20%, 40%': {
            opacity: '0.5',
          },
          '100%': {
            bottom: '250px',
            right: '25px',
            rotate: '30deg',
            scale: '1',
            opacity: '0',
          },
        },
        'tilt-left': {
          '0%': {
            transform: 'rotate(0deg) translateX(0px)',
          },
          '100%': {
            transform: 'rotate(-4deg) translateX(-35px)',
          },
        },
        'tilt-right': {
          '0%': {
            transform: 'rotate(0deg) translateX(00px)',
          },
          '100%': {
            transform: 'rotate(4deg) translateX(35px)',
          },
        },
        shadow: {
          '0%': {
            boxShadow: '0px 0px 0px 0px #A863E6',
          },
          '100%': {
            boxShadow: '0px 2px 40px 0px #A863E699',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
        'scale-in': 'scale-in 0.3s ease-in-out forwards',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
        loading: 'loading 3s infinite',
        'image-first': 'image-first 5s ease-out infinite',
        'image-second': 'image-second 5s ease-out infinite',
        'image-third': 'image-third 5s ease-out infinite',
        'image-fourth': 'image-fourth 5s ease-out infinite',
        'tilt-left': 'tilt-left 1s ease-in-out forwards',
        'tilt-right': 'tilt-right 1s ease-in-out forwards',
        shadow: 'shadow 0.75s ease-in-out forwards 0.1s',
      },
      boxShadow: {
        glow: '0px 2px 40px 0px #A863E699',
      },
    },
  },
  plugins: [],
};
export default config;
