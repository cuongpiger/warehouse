#!/bin/bash

####################################################################################################
# Author: Cuong. Duong Manh
# Date: 2023/07/29
#
# Description: This script is used to enable horizontal scroll by using shift + vertical scroll.
# OS: Ubuntu 22.04 LTS
####################################################################################################

sudo apt-get update
sudo apt-get install xbindkeys -y

cat > ~/.xbindkeysrc.scm <<EOF
; bind shift + vertical scroll to horizontal scroll events
(xbindkey '(shift "b:4") "xte 'mouseclick 6'")
(xbindkey '(shift "b:5") "xte 'mouseclick 7'")
EOF

# run xbindkeys
xbindkeys
