#!/bin/bash
set -e

docker rm -f layer-container 2>/dev/null || true
docker build -t base-layer .
docker create --name layer-container base-layer
docker cp layer-container:/opt/layer.zip .
docker rm layer-container
echo "✅ Built layer.zip from inside the container."
