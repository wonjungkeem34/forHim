import { defineConfig } from "vite";

export default defineConfig({
  base: "/forHim/",
  server: {
    proxy: {
      "/puuid": {
        target: "https://asia.api.riotgames.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/puuid/, ""),
      },
      "/id": {
        target: "https://kr.api.riotgames.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/id/, ""),
      },
    },
  },
});
