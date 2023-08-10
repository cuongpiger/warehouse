#!/bin/bash

sudo_pw=$1

if [ -z "$sudo_pw" ]; then
  echo "Please provide sudo password!"
  exit 1
fi

echo "$sudo_pw" | sudo -S apt update

elight_path=$(sudo find $HOME -type d -path '*warehouse/ubuntu/browser_extensions/elight')
dst_dir="/usr/cuongdm/"

sudo mkdir -p $dst_dir
sudo cp -r $elight_path $dst_dir

