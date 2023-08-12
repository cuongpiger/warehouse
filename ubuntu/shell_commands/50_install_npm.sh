#!/bin/zsh

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/10/12
#
# Description: Install NodeJs and NPM
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1 # the root user password
tar_file=$2  # the tar file path of nodejs

if [ -z "$sudo_pw" ]; then
  echo "Please provide sudo password!"
  exit 1
fi

if [ ! -e "$tar_file" ]; then
  echo "Please provide tar file path correctly!"
  exit 1
fi

echo "$sudo_pw" | sudo -S apt-get update -y
nodejs_dst="/usr/local/lib/nodejs"
sudo mkdir -p $nodejs_dst
sudo tar -xJvf $tar_file -C $nodejs_dst

path_nodejs=$(find "$nodejs_dst" -mindepth 1 -maxdepth 1 -type d -print)

echo "export PATH=\$PATH:$path_nodejs/bin" >> $HOME/.zshrc
source $HOME/.zshrc

echo "DONE! installing nodejs, npm and npx."
