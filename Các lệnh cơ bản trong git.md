# Các lệnh cơ bản trong Git
##### Chú ý khi nhập không nhập cặp dấu '' trong các cú pháp
|**Chức năng**|**Ý nghĩa**|**Cú pháp**|
|:---:|:---:|:---:|
|Kiểm tra thông tin|Dùng để hiển thị tất cả thông tin của git trên máy|git config --list|
|Thiết lập username|Có thể sử dụng username giả, ko cần phải là chỉnh chủ|git config --global user.username 'username'|
|Kiểm tra username|Kiểm tra username đã được thiết lập thành công hay chưa|git config user.username|
|Thiết lập email|Thiết lập email cho git để khi commit lên không cần phải nhập lại email nữa|git config --global user.email 'email'|
|Kiểm tra email|Kiểm tra email đã được thiết lập thành công hay chưa|git config user.email|
|Thiết lập password|Thiết lập password cho git để khi commit lên không cần phải nhập lại password nữa|git config --global user.password 'password'|
|Xóa bỏ username||git config --global --unset user.username|
|Xóa bỏ password||git config --global --unset user.password|
|Xóa bỏ email||git config --global --unset user.email|
|Clone repo|**B1**. Vào repo, copy link repo cần clone<br>**B2**. Vào thư mục muốn clone repo này về<br>**B3**. Nhấp chuột phải ở trong thư mục đó sau đó mở git bash here|git clone 'link'|
|Clone repo và thay đổi tên mặc định của repo trên server|Tương tự thao tác của Clone|git clone 'link' 'new name'|
||Khi đã tồn tại một repo trên local và muốn theo dõi nó (lịch sử,...) thì cần phải tạo một init cho nó<br>**B1**. Vào thư mục cha chứa thư mục repo cần theo dõi<br>**B2**. Chuột phải chọn git bash here|git init|
|Lệnh status|Dùng để kiểm tra trạng thái các file có trong repo<br>**B1**. Vào thư mục repo cần kiểm tra<br>**B2**. Chuột phải chọn git bash here|git status|
|Đưa file về trạng thái staged|Vào thư mực repo<br>**git add -A**: stages all changes.<br>**git add .**: stages new files and modifications, without deletions.<br>**git add -u**: stages modifications and deletions, without new files.|1. git add .<br>2. git add -u<br>3. git add -A|
|Commit|Xác nhận chính thức rằng lưu lại 1 bản sao sau khi được staged (git add)|1. git commit -m '"your's describe"'<br>2. git commit -a -m '"your describe"'|
|Tạo local repository và push lên remote repository||1. git init<br>2. git add -A<br>3. git commit -m "first commit"<br>4. git remote add origin 'link to repo'<br>5. git push -u origin master|
|Xem lịch sử những lần commit||1. git log<br>2. git log --oneline<br>(ấn q để thoát)|
|Lệnh xem lịch sử n commit sau cùng||git log -3|
|Lệnh reset|Cho phép đưa con trỏ **HEAD** về một commit cụ thể nào đó trước đây|1. git reset 'commit id'<br>2. git reset --hard 'commit id'|
|Kiểm tra xem tại một commit id ta đã sửa đổi hay làm gì||git checkout 'commit id'|
|Gộp file vào một commit trước đó||1. git add .<br>2. git status<br>3. git commit --amend<br>4. Chỉnh your describe<br>5. Ctrl + X => Y or N => Enter|
|Đẩy lên web||git push|














