#!/bin/zsh

cat <<EOF >> $HOME/.zshrc
function keyswitcher() {
    option=\$1
    kbid=\$(xinput list | grep "AT Translated Set 2 keyboard" | grep -oP 'id=\K\d+')
    tpid=\$(xinput list | grep "Elan TrackPoint" | grep -oP 'id=\K\d+')

    if [ "\$option" = "enable" ]; then
        xinput --enable \$kbid
        xinput --enable \$tpid
        echo "Enable laptop keyboard"
    else
        xinput --disable \$kbid
        xinput --disable \$tpid
        echo "Disable laptop keyboard"
    fi
}
EOF

source $HOME/.zshrc
