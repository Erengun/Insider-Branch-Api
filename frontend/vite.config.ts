import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    /// The base URL for your project is set to the value of the VITE_BASE_URL environment variable.
    /// For Cors 
    base: env.VITE_BASE_URL,
    plugins: [react()],
  }
})