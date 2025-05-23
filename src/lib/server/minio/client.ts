import * as Minio from "minio";
import { envFileOrEnv } from "~/env";

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
const MINIO_SSL = process.env.MINIO_SSL;
const MINIO_PORT = parseInt(process.env.MINIO_PORT!);
const MINIO_ACCESS_KEY = envFileOrEnv(process.env.MINIO_ACCESS_KEY_FILE, process.env.MINIO_ACCESS_KEY);
const MINIO_SECRET_KEY = envFileOrEnv(process.env.MINIO_SECRET_KEY_FILE, process.env.MINIO_SECRET_KEY);
// const MINIO_BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

export const MinioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT!,
  port: MINIO_PORT,
  useSSL: MINIO_SSL === "true",
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});