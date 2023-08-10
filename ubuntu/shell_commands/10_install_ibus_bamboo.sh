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

sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo --yes
sudo apt-get update
sudo apt-get install ibus ibus-bamboo --install-recommends -y
ibus restart

# Đặt ibus-bamboo làm bộ gõ mặc định
env DCONF_PROFILE=ibus dconf write /desktop/ibus/general/preload-engines "['BambooUs', 'Bamboo']" && gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us'), ('ibus', 'Bamboo')]"
