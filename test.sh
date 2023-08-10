#!/bin/bash

# sed '$s/plugins=(/plugins=(git zsh-autosuggestions zsh-syntax-highlighting docker npm)/' ./tmp

sed -i '/plugins=(/d' tmp

