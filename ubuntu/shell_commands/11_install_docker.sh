#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/08/10
#
# Description: Install Docker.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]; then
  echo "Please provide sudo password!"
  exit 1
fi

# make sure update the OS before installing something apps
echo "$sudo_pw" | sudo -S apt update

# phase 1: install Docker
dst_file="$HOME/Downloads/get-docker.sh"

curl -fsSL https://get.docker.com -o $dst_file && \
sh $dst_file && \
sudo usermod -a -G docker $USER && \
sudo chmod 666 /var/run/docker.sock && \
rm $dst_file
