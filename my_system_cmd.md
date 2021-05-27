# 1. Phần mềm convert định dạng ảnh
* Cài đặt: `sudo apt-get install imagemagick`

|Lệnh|Giải thích|
|-|-|
|`convert <image_1>.jpg <image_2>.png`| chuyển `image_1` sang file `*.png`|
|`mogrify -format png *.jpg`| chuyển tất cả file `*.jpg` sang `*.png`|

# 2. Cài đặt Selenium và setup cho Firefox
* **Bước 1**:
  * Ghõ lệnh `pip3 install selenium`
* **Bước 2**:
  * Lênh trang [https://github.com/mozilla/geckodriver/releases](https://github.com/mozilla/geckodriver/releases) để tải `geckodriver` phù hợp với hệ điều hành, sau đó giải nén.
* **Bước 3**:
  * Vào thư mục của geckodriver vừa giải nén, mở terminal ghõ lệnh:
    ```
    sudo mv geckodriver /usr/local/bin
    ```
* **Bước 4**:
  * Mở terminal và ghõ lệnh:
    ```
    export PATH=$PATH:/usr/local/bin/geckodriver
    ```

* **Bước 5**:
  * Chạy thử file `demo.py` dưới đây bằng terminal để kiểm tra, nếu Firefox tự động mở sau khi run code này thì cài đặt thành công:
    ```python
    from selenium import webdriver

    browser = webdriver.Firefox()
    browser.get("http://www.ubuntu.com")
    ```