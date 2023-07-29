#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: This script is used to setup git. It will do the following tasks:
#  - Install git CLI
#  - Setup git config, such as user information
#  - Setup SSH keys
#  - Setup alias git command
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo_pw=$1

if [ -z "$sudo_pw" ]
then
  echo "Please provide sudo password!"
  exit 1
fi

echo "$sudo_pw" | sudo -S apt update
sudo apt install git -y

git config --global user.name "cuongpiger"
git config --global user.email "cuongpigerr@gmail.com"

private_key="$HOME/.ssh/personal_git"
public_key="$HOME/.ssh/personal_git.pub"
zshrc_file="$HOME/.zshrc"

if [ ! -f "$private_key" ]; then
    echo "CRITICAL: $private_key does not exist!"
    exit 1
fi

if [ ! -f "$public_key" ]; then
    echo "CRITICAL: $public_key does not exist!"
    exit 1
fi

chmod 0400 "$private_key"
chmod 0400 "$public_key"

chown "$USER:$USER" "$private_key"
chown "$USER:$USER" "$public_key"

# alias git command
if [ ! -f "$zshrc_file" ]; then
    echo "CRITICAL: $zshrc_file does not exist!"
    exit 1
fi

cat >>"$zshrc_file" <<EOF
function gs() {
    # cmm=${1:-"This is my commit"}
    cmm="$1"
    if test -z "$cmm"
    then
        cmm="This is Manh Cuong's commit 🌻."
    fi
    
    git add .
    git commit -m "$cmm"
    git push
}
EOF

# reload zshrc
source "$zshrc_file"
