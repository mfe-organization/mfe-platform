import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // if (mode !== 'development' && (!process.env.VITE_FRONTEND_A_URL || !process.env.VITE_FRONTEND_B_URL)) {
  //   throw new Error('VITE_FRONTEND_A_URL or VITE_FRONTEND_B_URL are not defined in the environment');
  // }

  return {
    plugins: [
      react(),
      federation({
        name: "platform",
        remotes: {
          frontendA: `${mode === "development" ? 'http://localhost:3002' : process.env.VITE_FRONTEND_A_URL}/assets/remoteEntry.js`,
          frontendB: `${mode === "development" ? 'http://localhost:3003' : process.env.VITE_FRONTEND_B_URL}/assets/remoteEntry.js`,
        },
        shared: [
          "react",
          "react-dom",
          "react-router-dom",
        ],
      }),
    ],
    server: {
      port: 3001,
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
  }
})

