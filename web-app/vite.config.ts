import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
normalizePath(path.resolve(__dirname, './'))
 
 
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    build: {
        emptyOutDir: true,
        outDir: path.join(__dirname, "dist"),
        assetsDir: 'assets',
         
        rollupOptions: {
            external: ["tailwindcss"],
            output: {
                dir: './dist',
                // For entry chunks (main JavaScript files)
                entryFileNames: ({ name }) => {
                    console.log('name', name);
                    return 'js/[name]-[hash].js'
                },
                chunkFileNames: 'js/[name]-[hash].js',  
                assetFileNames: (assetInfo) => {
                    if (/\.(css|scss)$/.test(assetInfo.name ?? '')) {
                        return 'css/[name]-[hash][extname]'
                    }
                    if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name ?? '')) {
                        return 'images/[name]-[hash][extname]'
                    }
                    return 'assets/[name]-[hash][extname]'
                },
                globals: {
                    tailwindcss: "tailwindcss",
                    postcss: "postcss",
                    react: 'React',
                    'react-dom': 'ReactDOM',
                }
            },
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
