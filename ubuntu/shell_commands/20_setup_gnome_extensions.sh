#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: Setup gnome extensions. You need to comment phase 2 if you want to install phase 1
#   and vice versa.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]; then
  echo "Please provide sudo password!"
  exit 1
fi

# phase 1: install gnome-tweaks and gnome-shell-extensions and setup dependencies (comment phase 1
#    if you install phase 2)
echo "$sudo_pw" | sudo -S apt update
sudo add-apt-repository universe --yes
sudo apt install gnome-tweaks gnome-shell-extensions -y

warehouse_path=$(sudo find $HOME -type d -path '*warehouse/ubuntu/extensions')
cp -r $warehouse_path $HOME/.local/share/gnome-shell/
killall -HUP gnome-shell


# phase 2: enable all extensions (comment phase 2 if you install phase 1)
extensions=$(find "$warehouse_path" -maxdepth 1 -type d)

for extension in $extensions; do
  if [ "$extension" != "$warehouse_path" ]; then
    extension_name=$(basename "$extension")
    gnome-extensions enable $extension_name
  fi
done

echo "DONE! setting up gnome extensions."
