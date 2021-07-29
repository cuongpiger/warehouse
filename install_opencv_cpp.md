# Option 1
## 1. Install
```shell
# Install minimal prerequisites (Ubuntu 18.04 as reference)
sudo apt update && sudo apt install -y cmake g++ wget unzip

# Download and unpack sources
wget -O opencv.zip https://github.com/opencv/opencv/archive/master.zip
unzip opencv.zip

# Create build directory
mkdir -p build && cd build

# Configure
cmake  ../opencv-master

# Build
cmake --build .

sudo make install
```

## 2. Alias cho terminal
```shell
alias ocv='f(){ g++ "$@" -o $@:t:r -lopencv_core -lopencv_highgui -lopencv_imgproc -lopencv_imgcodecs -I/usr/local/include/opencv4; unset -f f; }; f'

alias ocvr='f(){ g++ "$@" -o $@:t:r -lopencv_core -lopencv_highgui -lopencv_imgproc -lopencv_imgcodecs -I/usr/local/include/opencv4 && ./$@:t:r; unset -f f; }; f'
```

## 3. Run
* Giả sử có file `main.cpp`, nếu muốn thực thi file này thành file thực thi có tên là `main` thì chạy lệnh:
  ```shell
  ocv main.cpp
  ```
  * Từ đây có file `main`, để chạy file này mở terminal ghõ lệnh:
    ```shell
    ./main
    ```

* Còn nếu muốn thực thi ra file `main` sau đó chạy luôn file này thị dùng lệnh:
  ```shell
  ocvr main.cpp
  ```

## Option 2
* **Step 1**: Update the Ubuntu System packages
  ```shell
  sudo apt-get update && sudo apt-get upgrade
  sudo apt install software-properties-common
  sudo apt install apt-file
  ```