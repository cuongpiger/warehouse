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

sudo apt -y install libfuse2 goldendict default-jre default-jdk flameshot virtualbox vagrant vlc python3-pip tmux gedit-plugins mlocate gettext podman htop protobuf-compiler graphviz

sudo add-apt-repository ppa:obsproject/obs-studio --yes
sudo apt-get update
sudo apt install ffmpeg obs-studio -y

# install thumbnail for the epub
sudo add-apt-repository ppa:ubuntuhandbook1/apps --yes
sudo apt update
sudo apt install gnome-epub-thumbnailer -y

# install calibre
sudo -v && wget -nv -O- https://download.calibre-ebook.com/linux-installer.sh | sudo sh /dev/stdin
