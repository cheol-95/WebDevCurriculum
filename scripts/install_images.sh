#!/bin/bash
aws ecr get-login-password --region ap-northeast-2 | sudo docker login --username AWS --password-stdin 558661889689.dkr.ecr.ap-northeast-2.amazonaws.com
sudo docker pull 558661889689.dkr.ecr.ap-northeast-2.amazonaws.com/kcweb_client:latest
sudo docker pull 558661889689.dkr.ecr.ap-northeast-2.amazonaws.com/kcweb_server:latest