#!/bin/zsh

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/08/10
#
# Description: Install Anaconda.
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

# install Anaconda dependencies
sudo apt-get install libgl1-mesa-glx libegl1-mesa libxrandr2 libxrandr2 libxss1 libxcursor1 libxcomposite1 libasound2 libxi6 libxtst6 -y

download_url="https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Linux-x86_64.sh"  # should be updated
dst_file="$HOME/Downloads/anaconda.sh"

curl -fsSL $download_url -o $dst_file
bash $dst_file -b
rm $dst_file


cat >> $HOME/.zshrc <<EOF
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if [ -f "/home/cuongdm/anaconda3/etc/profile.d/conda.sh" ]; then
    . "/home/cuongdm/anaconda3/etc/profile.d/conda.sh"
else
    export PATH="/home/cuongdm/anaconda3/bin:$PATH"
fi
# <<< conda initialize <<<
EOF

# source file
source $HOME/.zshrc

# disable base environment
conda config --set auto_activate_base False
