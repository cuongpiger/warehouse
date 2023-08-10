#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: Setup gnome extensions.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]; then
  echo "Please provide sudo password!"
  exit 1
fi

warehouse_path=$(echo "$sudo_pw" | sudo -S find $HOME -type d -path '*warehouse/ubuntu/extensions')
cp -r $warehouse_path $HOME/.local/share/gnome-shell/
killall -HUP gnome-shell

sleep 10

extensions=$(find "$warehouse_path" -maxdepth 1 -type d)

for extension in $extensions; do
    if [ "$extension" != "$warehouse_path" ]; then
        extension_name=$(basename "$extension")
        gnome-extensions enable $extension_name
    fi
done

echo "DONE! setting up gnome extensions."
