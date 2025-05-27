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
      new URL(`http${env.MINIO_SSL === "true" ? "s" : ""}://${env.MINIO_ENDPOINT}:${env.MINIO_PORT}/**`),
      new URL("http://server.fis.timoschwarzbach.de:9000/**")
    ],
  },
  output: "standalone",
};

export default config;
