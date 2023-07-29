#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: Setup fixed number of workspace and set the middle workspace as default.
# OS: Ubuntu 22.04 LTS
####################################################################################################

num_workspace=$1

if [ -z "$num_workspace" ]
then
  num_workspace=7
fi

echo "Number of workspace: $num_workspace"

gsettings set org.gnome.shell.overrides dynamic-workspaces false
gsettings set org.gnome.desktop.wm.preferences num-workspaces $num_workspace

# for x in {1..8}
# do
#   gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-$x "[\"<Super>$x\"]"
# done

sudo apt-get update
sudo apt-get install xdotool -y

dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-4 "['XF86LaunchB']"

cat > $HOME/.config/autostart/xdotool.desktop <<EOF
[Desktop Entry]
Type=Application
Exec=xdotool key XF86LaunchB
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name[en_US]=xdotool
Name=xdotool
Comment[en_US]=
Comment=
EOF
