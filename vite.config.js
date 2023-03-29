import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{

    alias: {
      // 波浪号代表src
      "~": path.resolve(__dirname, "src")
    }

  },

  server:{

    proxy: {
      '/api': {
          target: 'http://ceshi13.dishait.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
      },
  }


  },
  plugins: [vue(), WindiCSS()]
})
// http://127.0.0.1:5173/
