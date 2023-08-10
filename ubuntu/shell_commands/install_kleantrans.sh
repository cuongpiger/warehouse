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

directory="$HOME/kleantrans"
dst_dir="/usr/cuongdm/kleantrans"

# install dependencies
echo "$sudo_pw" | sudo -S apt-get update -y
sudo apt-get install -y translate-shell xclip python3-tk git python3-pip

pip3 install pyperclip==1.8.2 PySide2==5.15.2.1 pynput==1.7.4

# clone the repo
git clone https://github.com/cuongpiger/python.git --depth 1 --branch app/kleantrans $directory

# install
sudo mkdir -p $dst_dir

sudo mv $directory/config $dst_dir
sudo mv $directory/images $dst_dir
sudo mv $directory/main.py $dst_dir
sudo mv $directory/listener.py $dst_dir

cat <<EOF >> ~/.zshrc
# run kleantrans
function kleantrans() {
  cd /usr/cuongdm/kleantrans
  nohup python3 main.py &>/dev/null &
}
EOF

rm -rf $directory
