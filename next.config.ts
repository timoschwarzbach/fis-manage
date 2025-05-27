/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.ts";
import { env } from "./src/env.ts";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: env.MINIO_SSL === "true" ? "https" : "http",
        hostname: env.MINIO_ENDPOINT,
      },
    ],
  },
  output: "standalone",
};

export default config;
