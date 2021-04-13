|No.|Pattern|Description|
|-|-|-|
|1|`[\W_]+`|tìm các kí tự không thuộc bảng chữ cái alphabet (tính cả lowercase và uppercase) hoặc là kí tự '_', xuất hiện một hoặc nhiều lần trong văn bản|
|2|`[\s|\S]*\d{1,}[\s|\S]*`|tìm tất cả các kí tự là số|

##### 1.
```python
import re

txt = "The rain_ [\` in Spain"

x = re.sub('[\W_]+','', txt)

print(x)
```
> TheraininSpain