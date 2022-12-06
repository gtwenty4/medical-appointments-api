#!/bin/bash
set -e

CONTAINER_NAME="";
CONTAINER_IMAGE="";
DATABASE_PASSWORD="";
DATABASE_PORT=;

echo "Stop & remove old container [$CONTAINER_NAME] and starting new fresh instance"
(docker kill $CONTAINER_NAME || :) && \
  (docker rm $CONTAINER_NAME || :) && \
  docker run --name $CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD=$DATABASE_PASSWORD \
  -p $DATABASE_PORT:3306 \
  -d $CONTAINER_IMAGE

echo "New container [$CONTAINER_NAME] created"
