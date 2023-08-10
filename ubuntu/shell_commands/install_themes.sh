#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: This script is used to install my themes
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

dst_dir="$HOME/Downloads/WhiteSur-gtk-theme"
git clone https://github.com/vinceliuice/WhiteSur-gtk-theme.git --depth 1 --branch master $dst_dir
$dst_dir/install.sh -c Dark -i ubuntu -t purple
$dst_dir/tweaks.sh -c Dark -t purple -i ubuntu

# install icon
dst_dir_icon="$HOME/Downloads/WhiteSur-icon-theme"
git clone https://github.com/vinceliuice/WhiteSur-icon-theme.git --depth 1 --branch master $dst_dir_icon
$dst_dir_icon/install.sh -t purple

rm -rf $dst_dir
rm -rf $dst_dir_icon

cursor_path=$(sudo find $HOME -type d -path '*warehouse/ubuntu/themes/macOS-BigSur')
sudo cp -r $cursor_path /usr/share/icons/
