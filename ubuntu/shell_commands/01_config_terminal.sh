#!/bin/zsh

sudo_pw=$1

if [ -z "$sudo_pw" ]
then
  echo "Please provide sudo password!"
  exit 1
fi

# make sure update the OS before installing something apps
echo "$sudo_pw" | sudo -S apt update

sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions --depth 1
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting --depth 1

sed -i '/plugins=(/d' $HOME/.zshrc

cat >> $HOME/.zshrc <<EOF
plugins=(git zsh-autosuggestions zsh-syntax-highlighting docker npm)
EOF

source $HOME/.zshrc
