import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { existsSync, readFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    sourcemap: false,
  },
  plugins: [
    {
      name: 'preview-prerendered-routes',
      configurePreviewServer(server) {
        const output = resolve(server.config.root, server.config.build.outDir)
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url ?? '/', 'http://localhost')
          if (url.pathname === '/' || url.pathname.includes('.')) return next()
          const route = url.pathname.replace(/\/$/, '')
          const target = resolve(output, '.' + route, 'index.html')
          if (target.startsWith(output + sep) && existsSync(target)) {
            request.url = route + '/index.html' + url.search
            return next()
          }
          response.statusCode = 404
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(readFileSync(resolve(output, '404.html')))
        })
      },
    },
    react({
      babel: {
        plugins: [
          ...(command === 'serve' ? ['react-dev-locator'] : []),
        ],
      },
    }),
    tsconfigPaths()
  ],
}))
