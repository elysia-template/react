
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { renameSync, writeFileSync } from 'fs'

export default defineConfig({
    root: "client",
    plugins: [
        react(),
        {
            name: 'move-static-index-page',
            closeBundle() {
                renameSync(
                    resolve( __dirname, 'dist/client/index.html' ),
                    resolve( __dirname, 'dist/index.html' )
                );
                writeFileSync(
                    resolve( __dirname, 'dist/package.json' ),
                    JSON.stringify( { scripts:{ start:"NODE_ENV=production bun server.js" } },null,2)
                )
            },
        }
    ],
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
