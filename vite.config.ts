import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `vite.config.ts` is compiled by TypeScript; this avoids requiring @types/node.
declare const process: any

const base = process?.env?.GITHUB_ACTIONS ? '/SophiePage/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
