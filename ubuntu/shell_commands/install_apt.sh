#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/08/10
#
# Description: Install some apps using apt.
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

sudo apt -y install libfuse2 goldendict install default-jre default-jdk

sudo add-apt-repository ppa:obsproject/obs-studio --yes
sudo apt-get update
sudo apt install ffmpeg obs-studio -y
