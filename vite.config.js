import { defineConfig } from "vite";

export default defineConfig({
  base: "/forHim/",
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://asia.api.riotgames.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //     "/krapi": {
  //       target: "https://kr.api.riotgames.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/krapi/, ""),
  //     },
  //   },
  // },
});
