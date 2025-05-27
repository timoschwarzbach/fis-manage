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
        protocol: "http",
        hostname: "server.fis.timoschwarzbach.de",
        port: "9000",
        pathname: "**"
        // search needs to be omitted because wildcard does not work
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ],
  },
  output: "standalone",
};

export default config;
