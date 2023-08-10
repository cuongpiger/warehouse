# 1. Phần mềm convert định dạng ảnh
* Cài đặt: `sudo apt-get install imagemagick`

|Lệnh|Giải thích|
|-|-|
|`convert <image_1>.jpg <image_2>.png`| chuyển `image_1` sang file `*.png`|
|`convert -resize 20% source.png dest.png`|scale image theo tỉ lệ |
|`mogrify -format png *.jpg`| chuyển tất cả file `*.jpg` sang `*.png`|

# 2. Các lỗi trong quá trình cài Ubuntu
* Lỗi RST khi cài đặt: [https://youtu.be/rSn34Gv3-D4](https://youtu.be/rSn34Gv3-D4)
# 4. Sử dụng `pimg` để lưu hình chụp màn hình từ clipboard
* Trước tiên cần install, ghõ lệnh
```
pip3 install pimg
```
* Sau khi chụp màn hình và lưu vào clipboard, có thể dùng lệnh dưới đây để lưu hình, giả sử cần lưu hình vào đường dẫn `~/Downloads/image.png` thì làm như sau:
```
pimg ~/Downloads/image.png
```

* Alias
```shell
# save image
function si() {
  name="$1"
  pimg g "${name}.png"
}
```

# 6. Alias cho chuổi lệnh github
* Mở file `.zshrc` lên và bỏ vào dòng này:
  ```shell
  function gs() {
    # cmm=${1:-"This is my commit"}
    cmm="$1"
    if test -z "$cmm"
    then
      cmm="This is Manh Cuong's commit 🌻."
    fi
    git add . && git commit -m "$cmm" && git push
  }
  ```
* Sau đó save lại và mở terminal ghõ lệnh:
  ```shell
  source ~/.zshrc
  ```

* Từ này thay vì sài combo lệnh:
  ```shell
  git add .
  git commit -m "đây là một commit"
  git push
  ```
  thì có thể nhẹ nhàng hơn bằng lệnh này:
  ```shell
  gitdone "đây là một commit"
  ```

# 7. Cài đặt Fake Ip
* Ghõ lệnh:
  ```shell
  sudo apt-get install tor
  sudo apt-get install privoxy
  ```

* Tạo thư mục `aut`:
  ```shell
  cd ~/usr/share/
  sudo mkdir aut
  ```

* Clone repo này về [https://github.com/FDX100/Auto_Tor_IP_changer](https://github.com/FDX100/Auto_Tor_IP_changer) và ghõ lệnh
  ```shell
  cd ~
  cd Auto_Tor_IP_changer
  sudo python3 install.py
  ```

* Từ nay về sau, chỉ cần mở terminal lên ghõ lệnh `sudo aut` là chạy.

# 8. Phần mềm quay màn hình tạo ảnh gif Peek
  ```shell
  sudo apt update
  sudo apt install peek
  ```
# 9. Install Flameshot
* [https://flameshot.org](https://flameshot.org/)

# 10. Alias kleantrans
```bash=
sudo apt-get update -y && sudo apt-get install -y translate-shell xclip python3-tk && \
pip3 install pyperclip==1.8.2 PySide2==5.15.2.1 pynput==1.7.4 && \
cat <<EOF >> ~/.zshrc

# run kleantrans
function kleantrans() {
  cd /usr/cuongdm/kleantrans/
  nohup python3 main.py &>/dev/null &
}
EOF
source ~/.zshrc
```
# 11. Install some gnome extensions
```bash
sudo apt install gnome-shell-extensions -y
sudo apt install gnome-tweaks -y
```
* [https://extensions.gnome.org/extension/19/user-themes](https://extensions.gnome.org/extension/19/user-themes/)
* [https://extensions.gnome.org/extension/779/clipboard-indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/)
* [https://extensions.gnome.org/extension/906/sound-output-device-chooser](https://extensions.gnome.org/extension/906/sound-output-device-chooser/)
* [https://extensions.gnome.org/extension/1401/bluetooth-quick-connect](https://extensions.gnome.org/extension/1401/bluetooth-quick-connect/)
* [https://extensions.gnome.org/extension/2182/noannoyance](https://extensions.gnome.org/extension/2182/noannoyance/)
* [https://extensions.gnome.org/extension/1162/emoji-selector](https://extensions.gnome.org/extension/1162/emoji-selector/)
* [https://extensions.gnome.org/extension/1634/resource-monitor/](https://extensions.gnome.org/extension/1634/resource-monitor/)
* [https://extensions.gnome.org/extension/3733/tiling-assistant/](https://extensions.gnome.org/extension/3733/tiling-assistant/)
* [https://extensions.gnome.org/extension/4245/gesture-improvements/](https://extensions.gnome.org/extension/4245/gesture-improvements/)

# 12. Install Macos Touchpad
* [https://ubuntuhandbook.org/index.php/2022/06/touchpad-gestures-ubuntu-22-04-xorg](https://ubuntuhandbook.org/index.php/2022/06/touchpad-gestures-ubuntu-22-04-xorg/)

## 14. Cài đặt `ibus-unikey`
* Installa iBus-Unikey [https://minhng.info/tips/unikey-ubuntu-2204.html](https://minhng.info/tips/unikey-ubuntu-2204.html).
* Fix error can not type Vietnamese in VNI [click here](https://github.com/BambooEngine/ibus-bamboo/wiki/Kh%C3%B4ng-g%C3%B5-%C4%91%C6%B0%E1%BB%A3c-ti%E1%BA%BFng-vi%E1%BB%87t-tr%C3%AAn-ph%E1%BA%A7n-m%E1%BB%81m-%60abc-xyz%60#ki%E1%BB%83m-tra-bi%E1%BA%BFn-m%C3%B4i-tr%C6%B0%E1%BB%9Dng)

# 15. Install and config Git on Ubuntu
  ```bash=
  git config --global user.name "cuongpiger" && git config --global user.email "cuongpigerr@gmail.com"
  ```

## 16. Elight extension for browser
* [https://drive.google.com/file/d/1xPW-0jYP7cu2E67fHi0dclsGmQdoHHOS/view?usp=sharing](https://drive.google.com/file/d/1xPW-0jYP7cu2E67fHi0dclsGmQdoHHOS/view?usp=sharing)

## 17. Setup Oh-My-ZSH
* [https://linuxhint.com/install-use-oh-my-zsh/](https://linuxhint.com/install-use-oh-my-zsh/)
* [https://gist.github.com/dogrocker/1efb8fd9427779c827058f873b94df95](https://gist.github.com/dogrocker/1efb8fd9427779c827058f873b94df95)

* Use the theme `jispwoso`

# 18. Install goldendict
```bash=
sudo apt update && sudo apt install goldendict -y
```

# 19. Install OBS studio
* [https://www.how2shout.com/linux/install-obs-studio-on-ubuntu-22-04-lts-jammy-linux/](https://www.how2shout.com/linux/install-obs-studio-on-ubuntu-22-04-lts-jammy-linux/)

# 21. Install theme and Icons
* [https://fostips.com/whitesur-theme-make-ubuntu-fedora-macos-big-sur](https://fostips.com/whitesur-theme-make-ubuntu-fedora-macos-big-sur/)
