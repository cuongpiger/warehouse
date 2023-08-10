#!/bin/zsh

check_pip3_installed() {
  if [ ! -x "/bin/pip3" ]; then
    echo "Error: pip3 is not installed at /bin/pip3"
    exit 1
  fi
}

check_pip3_installed

# pip_cmd="/bin/pip3"
# $pip_cmd install pimg

# save image
cat >> $HOME/.zshrc <<EOF
function si() {
  name="\$1"
  pimg g "\${name}.png"
}
EOF

source $HOME/.zshrc


