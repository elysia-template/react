
import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: "client",
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                rewrite: path => path,
                target: "http://localhost:3001",
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: "../dist/client",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: "assets/static/chunks/[hash].js",
                chunkFileNames: "assets/static/chunks/[hash].js",
                assetFileNames: ( assetInfo ) => {
                    if ( assetInfo.name?.endsWith( '.css' ) ) {
                      return 'assets/static/css/[hash][extname]';
                    }
                    return 'assets/static/[hash][extname]';
                  }
            }
        }
    },
    resolve: {
        alias: {
            "@app": resolve( __dirname, "./client/src" )
        }
    }
})
