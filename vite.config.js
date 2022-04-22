import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:8080,
    open:true,//默认打开浏览器
    proxy:{
      
    }
  }
})
