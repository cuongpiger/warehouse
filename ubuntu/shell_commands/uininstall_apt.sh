#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/08/10
#
# Description: Uninstall some apps using apt.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]
then
  echo "Please provide sudo password!"
  exit 1
fi

# make sure update the OS before installing something apps
echo "$sudo_pw" | sudo -S apt update


sudo apt-get remove --purge thunderbird* -y
rm -r $HOME/.thunderbird
sudo apt-get update -y
sudo apt-get upgrade -y

echo "[INFO] Everything is done!"
