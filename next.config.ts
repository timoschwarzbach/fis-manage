/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import path from "path";
import "./src/env.ts";
import { env } from "./src/env.ts";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      new URL(`http${env.MINIO_SSL === "true" ? "s" : ""}://${env.MINIO_ENDPOINT}:${env.MINIO_PORT}/**`),
      {
        protocol: "https",
        hostname: "server.fis.timoschwarzbach.de",
        port: "9000",
        pathname: "**",
        query: "**"

      }
    ],
  },
  output: "standalone",
};

export default config;
