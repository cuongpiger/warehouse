#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: This script is used to install Kleantrans app.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]
then
  echo "Please provide sudo password!"
  exit 1
fi

# install dependencies
echo "$sudo_pw" | sudo -S apt-get update -y


dictionary_path=$(sudo find $HOME -type d -path '*warehouse/ubuntu/dictionary_files')
sudo cp -r $dictionary_path /usr/cuongdm/
