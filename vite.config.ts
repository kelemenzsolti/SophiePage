import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base =  '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    // Vite inlines assets under 4 KiB as base64 data URIs. That is the wrong
    // trade for fonts: the smallest subset (inter latin-ext, 2.4 KiB) would be
    // baked into the render-blocking stylesheet, growing it by a third of its
    // gzipped size to save one request for a file `font-display: swap` means
    // nobody is waiting on. Keep every font a separate file.
    assetsInlineLimit: (filePath) => (filePath.endsWith('.woff2') ? false : undefined),
  },
})
