import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import nesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        pxtorem({
          rootValue: 16,
          propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        }),
        nesting(),
      ],
    },
  },
});
