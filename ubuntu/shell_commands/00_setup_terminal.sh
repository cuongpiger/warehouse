#!/bin/bash

sudo_pw=$1

if [ -z "$sudo_pw" ]
then
  echo "Please provide sudo password!"
  exit 1
fi

# make sure update the OS before installing something apps
echo "$sudo_pw" | sudo -S apt update

sudo apt install zsh git curl -y
chsh -s $(which zsh)

# now logout and login again to use zsh, open terminal and select 0 to use default config