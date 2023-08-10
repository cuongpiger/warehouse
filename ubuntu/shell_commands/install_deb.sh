#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/08/10
#
# Description: Install some apps using apt.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]; then
  echo "Please provide sudo password!"
  exit 1
fi

# make sure update the OS before installing something apps
echo "$sudo_pw" | sudo -S apt update

# install wget tool to download file from URL
sudo apt install wget -y


# install Chrome browser
chrome_dest="$HOME/Downloads/google-chrome-stable_current_amd64.deb"
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O $chrome_dest
sudo apt update && sudo apt install $chrome_dest -y && rm -rf $chrome_dest
echo "[INFO] Chrome browser is installed successfully!"


# eligth extension for the browser
elight_path=$(sudo find $HOME -type d -path '*warehouse/ubuntu/browser_extensions/elight')
dst_dir="/usr/cuongdm/"

sudo mkdir -p $dst_dir
sudo cp -r $elight_path $dst_dir

