```
alias ocv='f(){ g++ "$@" -o $@:t:r -lopencv_core -lopencv_highgui -lopencv_imgproc -lopencv_imgcodecs -I/usr/local/include/opencv4; unset -f f; }; f'

alias ocvr='f(){ g++ "$@" -o $@:t:r -lopencv_core -lopencv_highgui -lopencv_imgproc -lopencv_imgcodecs -I/usr/local/include/opencv4 && ./$@:t:r; unset -f f; }; f'
```