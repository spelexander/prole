#!/bin/bash
source ./.env

# Use this to start mongo locally
docker pull mongo

docker run --name ${PROLE_DB_NAME} -d -p ${PROLE_DB_PORT}:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=${PROLE_ROOT_USERNAME} \
  -e MONGO_INITDB_ROOT_PASSWORD=${PROLE_ROOT_PASSWORD} \
  -e MONGO_INITDB_DATABASE=${PROLE_DB_NAME} \
  mongo
