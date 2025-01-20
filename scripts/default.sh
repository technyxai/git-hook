#!/bin/bash

PROJECT_NAME=$1
REPO_NAME=$2
BRANCH_NAME=$3
PROJECT_LOCATION=$4

cd $PROJECT_LOCATION

echo $pwd

git switch $BRANCH_NAME

git pull origin $BRANCH_NAME && \

pm2 stop $PROJECT_NAME && \

npm run build && \

pm2 start $(pm2 list | grep $PROJECT_NAME | awk '{print $2}')

echo $PROJECT_NAME updated and started successfully.
