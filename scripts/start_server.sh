#!/bin/bash
PWD=$(dirname $(realpath $0))
sudo docker-compose -f $PWD/docker-compose.yml up -d