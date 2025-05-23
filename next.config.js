/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.ts";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
      },
      {
        protocol: "http",
        hostname: "minio",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  output: "standalone",
};

export default config;
