# 1. Install
```
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

# 2. Alias cho terminal
```
alias ocv='f(){ g++ "$@" -o $@:t:r -lopencv_core -lopencv_highgui -lopencv_imgproc -lopencv_imgcodecs -I/usr/local/include/opencv4; unset -f f; }; f'

alias ocvr='f(){ g++ "$@" -o $@:t:r -lopencv_core -lopencv_highgui -lopencv_imgproc -lopencv_imgcodecs -I/usr/local/include/opencv4 && ./$@:t:r; unset -f f; }; f'
```