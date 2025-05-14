import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path, { resolve } from 'path'
normalizePath(path.resolve(__dirname, './')) 

const root = path.resolve(__dirname, './')
const resolve1 = (dir: string) => {
    return path.resolve(__dirname, dir)
}
 
export default defineConfig({
    base: "/",
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(path.resolve(__dirname, './images')),
                    dest: './dist2/images'
                } 
            ],
        }),
    ],
    resolve: { 
        alias: {
            '@': resolve('WebApp'),
            '@images': resolve('WebApp/images'),
            '@public': resolve('WebApp/public'),
            '@assets': resolve('WebApp/assets'),
            '@src'   : resolve('WebApp/src') 
        },
    },
    build: {
        emptyOutDir: true,
        //outDir: '../dist'
        outDir: path.join(__dirname, "dist"),
        target: 'modules', 
        minify: 'esbuild',

        rollupOptions: {
            external: [],
            output: {
                // For entry chunks (main JavaScript files)
                entryFileNames: ({ name }) => {
                    console.log('name', name);
                    //if (name === 'dashboard') return 'js/dashboard-[hash].js'
                   // if (name === 'home') return 'js/home-[hash].js'
                    return 'js/[name]-[hash].js'
                },

                // For static assets (images, fonts, CSS)
                assetFileNames: (assetInfo) => {
                    console.log('assetInfo', assetInfo);
                    if (assetInfo.name?.endsWith('.css')) {
                        //return 'styles/[name]-[hash][extname]'
                    }
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
            input: {
                main: resolve(__dirname, 'index.html'),
                dashboard: resolve(__dirname, 'dashboard.html')
                // dashboard: resolve(root, 'pages/dashboard/', 'index.html'),
                // home: path.resolve(root, 'pages/home/', 'index.html'), 
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
