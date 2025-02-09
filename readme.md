# fis manager

this tool controls content for the sockets to retrieve

## start minio

```
docker run \
-p 9000:9000 \
-p 9001:9001 \
--name minio1 \
-v ~/code/fis/manage-file-storage/data:/data \
-e "MINIO_ROOT_USER=user" \
-e "MINIO_ROOT_PASSWORD=password" \
quay.io/minio/minio server /data --console-address ":9001"
```
