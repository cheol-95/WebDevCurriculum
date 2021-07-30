#!/bin/bash
aws ecr get-login-password --region ap-northeast-2 | sudo docker login --username AWS --password-stdin 558661889689.dkr.ecr.ap-northeast-2.amazonaws.com

sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)
sudo docker rmi $(sudo docker images)

sudo docker pull 558661889689.dkr.ecr.ap-northeast-2.amazonaws.com/kcweb_client:latest
sudo docker pull 558661889689.dkr.ecr.ap-northeast-2.amazonaws.com/kcweb_server:latest