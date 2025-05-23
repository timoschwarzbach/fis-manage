import { readFileSync } from "fs";
import * as Minio from "minio";

const readSecretFile = async (filePath: string) => {
  try {
    const file = readFileSync(filePath);
    const secret = file.toString()
    return secret;
  } catch (error) {
    console.error(`Error reading secret file: ${filePath}`, error);
    return undefined;
  }
}

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
const MINIO_SSL = process.env.MINIO_SSL;
const MINIO_PORT = parseInt(process.env.MINIO_PORT!);
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY_FILE ? await readSecretFile(process.env.MINIO_ACCESS_KEY_FILE) ?? process.env.MINIO_ACCESS_KEY : process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY_FILE ? await readSecretFile(process.env.MINIO_SECRET_KEY_FILE) ?? process.env.MINIO_SECRET_KEY : process.env.MINIO_SECRET_KEY;
// const MINIO_BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

export const MinioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT!,
  port: MINIO_PORT,
  useSSL: MINIO_SSL === "true",
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});