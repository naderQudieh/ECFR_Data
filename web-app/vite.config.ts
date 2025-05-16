import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    server: {

        host: 'localhost',
        hmr: { host: 'localhost' },
        watch: {
            usePolling: true
        },
        port: 3000,
        open: '/', // Critical path fix
    }
})
