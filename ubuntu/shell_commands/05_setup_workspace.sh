#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/08/10
#
# Description: Setup the workspace.
# OS: Ubuntu 22.04 LTS
####################################################################################################

# change the text-scaling-factor to 0.76 and move the window buttons to the left
gsettings set org.gnome.desktop.interface text-scaling-factor 0.76
gsettings set org.gnome.desktop.wm.preferences button-layout 'close,minimize,maximize:'
