  var word_day = [],
  idioms = [],
  collocation = [],
  suggest_search = ["tie","tien","tieng","tienga","tiengan","tienganh","tienganhe","tienganhel","tienganheli","tienganhelig","tienganheligh","tienganhelight"],
  ee_update_version = "5.4.0",
  ee_update_history = [
      {
        description : '<ul>' +
        '<li> Cập nhập từ điển. </li>' +
        '</ul>',
        date : 'Ngày 12 tháng 04, 2019',
        version : 'Phiên bản 5.4.0',
        index: 21
      },
      {
        description : '<ul>' +
        '<li> Thay đổi font chữ từ text capitalize thành lowercase </li>' +
        '</ul>',
        date : 'Ngày 20 tháng 12, 2018',
        version : 'Phiên bản 5.3.2',
        index: 20
      },
       {
        description : '<ul>' +
        '<li>Mở khoá 1.000 từ vựng, 100 chủ đề cho tất cả người học</li>' +
        '<li>Cập nhật hình ảnh minh hoạ của từ vựng mới và đẹp hơn </li>' +
        '</ul>',
        date : 'Ngày 23 tháng 11, 2018',
        version : 'Phiên bản 5.3.1',
        index: 19
      },
      {
        description : '<ul>' +
        '<li>Mở khoá 1.000 từ vựng, 100 chủ đề cho tất cả người học</li>' +
        '<li>Cập nhật hình ảnh minh hoạ của từ vựng mới và đẹp hơn </li>' +
        '</ul>',
        date : 'Ngày 21 tháng 11, 2018',
        version : 'Phiên bản 5.3.0',
        index: 18
      },
      {
        description : '<ul>' +
        '<li>Thay đổi tên extension </li>' +
        '<li>Thay đổi các bước chọn chủ đề</li>' +
        '</ul>',
        date : 'Ngày 12 tháng 11, 2018',
        version : 'Phiên bản 5.2.1',
        index: 17
      },
      {
          description : '<ul>' +
          '<li>Thay đổi khóa học 1000 từ vựng </li>' +
          '<li>Thay đổi giao diện game thách đấu </li>' +
          '</ul>',
          date : 'Ngày 29 tháng 10, 2018',
          version : 'Phiên bản 5.2.0',
          index: 16
      },
      {
          description : '<ul>' +
          '<li>Thay đổi khóa học 1000 từ cơ bản</li>' +
          '</ul>',
          date : 'Ngày 22 tháng 10, 2018',
          version : 'Phiên bản 5.1.7',
          index : 15
      },
      {
          description : '<ul>' +
          '<li>Bổ sung file nghe cho phần học từ vựng</li>' +
          '<li>Cải thiện trải nghiệm chọn bài học </li>' +
          '<li>Tối ưu hiển thị và tốc độ load </li>' +
          '</ul>',
          date : 'Ngày 6 tháng 9, 2018',
          version : 'Phiên bản 5.1.6',
          index : 14
      },
      {
          description : '<ul>' +
          '<li>Bổ sung 2 khoá học mới: giao tiếp cơ bản và ngữ pháp cơ bản</li>' +
          '<li>Bổ sung phần tính điểm cho bài học </li>' +
          '<li>Cập nhật hệ thống danh hiệu </li>' +
          '<li>Tối ưu giao diện hiển thị </li>' +
          '</ul>',
          date : 'Ngày 20 tháng 7, 2018',
          version : 'Phiên bản 5.1.0',
          index : 13
      },{
          description : '<ul>' +
          '<li>Cập nhật Language Brazil</li>' +
          '<li>Sửa lỗi</li>' +
          '</ul>',
          date : 'Ngày 25 tháng 5, 2018',
          version : 'Phiên bản 4.3.0',
          index : 12
      },
      {
          description : '<ul>' +
          '<li>Cập nhật UI Video mới</li>' +
          '<li>Sửa lỗi</li>' +
          '</ul>',
          date : 'Ngày 8 tháng 5, 2018',
          version : 'Phiên bản 4.2.2',
          index : 11
      },
      {
          description : '<ul>' +
          '<li>Thêm danh sách Video Elightube</li>' +
          '<li>Sửa lỗi</li>' +
          '</ul>',
          date : 'Ngày 4 tháng 5, 2018',
          version : 'Phiên bản 4.2.0',
          index : 10
      },{
          description : '<ul>' +
          '<li>Off tính năng chơi theo mùa giải</li>' +
          '<li>Sửa lỗi</li>' +
          '</ul>',
          date : 'Ngày 3 tháng 5, 2018',
          version : 'Phiên bản 4.1.5',
          index : 9
      },
      {
          description : '<ul>' +
          '<li>Cập nhật tính năng mời người chơi trong War</li>' +
          '<li>Bổ sung chế độ chơi theo mùa giải</li>' +
          '<li>Sửa lỗi</li>' +
          '<li>Cập nhật giao diện</li>' +
          '</ul>',
          date : 'Ngày 26 tháng 2, 2018',
          version : 'Phiên bản 4.1.0',
          index : 8
      },
      {
          description : '<ul>' +
          '<li>Sửa lỗi phần học từ</li>' +
          '<li>Tối ưu tốc độ tải trang</li>' +
          '<li>Cải thiện Newsline</li>' +
          '<li>Cập nhật dữ liệu các chủ đề Toeic</li>' +
          '</ul>',
          date : 'Ngày 16 tháng 12, 2017',
          version : 'Phiên bản 3.6.0',
          index : 7
      },
      {
          description : '<ul>' +
          '<li>Cập nhật từ điển Elight</li>' +
          '<li>Tối ưu tốc độ tải trang</li>' +
          '<li>Sửa các lỗi liên quan đến tốc độ tải trang và thư viện Video</li>' +
          '</ul>',
          date : 'Ngày 9 tháng 12, 2017',
          version : 'Phiên bản 3.5.0',
          index : 6
      },
      {
          description : '<ul>' +
          '<li>Sửa các lỗi về hình ảnh</li>' +
          '<li>Cải thiện tính năng thách đấu </li>' +
          '<li>Tối ưu tốc độ tải trang</li>' +
          '<li>Cải thiện Newsline</li>' +
          '<li>Bổ sung chức năng mời bạn bè và nhận quà</li>' +
          '</ul>',
          date : 'Ngày 1 tháng 12, 2017',
          version : 'Phiên bản 3.4.0',
          index : 5
      },
	  {
          description : '<ul>' +
          '<li>Bổ sung hướng dẫn sử dụng Extension</li>' +
          '<li>Sửa các lỗi về nội dung</li>' +
          '<li>Tối ưu tốc độ tải trang</li>' +
          '<li>Cải thiện tính năng thách đấu (thêm danh sách trường học và bảng xếp hạng theo trường)</li>' +
          '</ul>',
          date : 'Ngày 24 tháng 11, 2017',
          version : 'Phiên bản 3.3',
          index : 4
	  },
	  {
          description : '<ul>' +
			  '<li>Cải thiện Setting</li>' +
			  '<li>Cập nhật user Profile</li>' +
			  '<li>Sửa các lỗi nội dung</li>' +
			  '<li>Tối ưu tốc độ tải trang</li>' +
			  '<li>Bổ sung Newsline</li>' +
			  '<li>Cải thiện tính năng War</li>' +
		  '</ul>',
          date : 'Ngày 16 tháng 11, 2017',
		  version : 'Phiên bản 3.2',
		  index : 3
	  },
      {
          description : '<ul>' +
			  '<li>Thêm tình nắng War cùng người chơi</li>' +
			  '<li>Thêm tính năng Streak Day</li>' +
			  '<li>Cải thiện nội dung Quotation</li>' +
			  '<li>Cập nhật UI sau khi học từ</li>' +
			  '<li>Thêm 30 ảnh nền</li>' +
		  '</ul>',
          date : 'Ngày 10 tháng 11, 2017',
          version : 'Phiên bản 3.1',
          index : 2
      },
      {
          description : '<ul>' +
			  '<li>Cập nhật nội dung học và giao diện</li>' +
			  '<li>Cập nhật nội dung Quotation và giao diện</li>' +
			  '<li>Thêm tính năng Đăng nhập</li>' +
			  '<li>Cập nhật ảnh nền theo thời gián (sáng, chiều, tối)</li>' +
		  '</ul>',
          date : 'Ngày 3 tháng 11, 2017',
          version : 'Phiên bản 3.0',
          index : 1
      }
  ],
  featureOfNewVersion = {
      "version": ee_update_version,
      "features": ee_update_history[0].description
  },
  Opponent_identity = [
    {
      "AI_name": "Trong Nguyen",
      "imageUrl": "https://graph.facebook.com/v2.5/800942020014875/picture?type=normal",
      "school": "Trường Cao đẳng Kinh tế Kỹ thuật Thương mại"
    },
    {
      "AI_name": "Vũ Văn Dương",
      "imageUrl": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=f2a67d28b2c5825839d0bf36c6194d65&oe=57FC792F&__gda__=1476185095_5866cbbd0221c63eb2fdc67254f25731",
      "school": "Trường Cao đẳng Kinh tế Kỹ thuật Thương mại"
    },
    {
      "AI_name": "Zu Midori",
      "imageUrl": "https://graph.facebook.com/v2.5/945229488869358/picture?type=normal",
      "school": "Trường Sĩ quan Pháo binh"
    },
    {
      "AI_name": "vu Quang Huy",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng nghề Công nghệ cao Hà Nội"
    },
    {
      "AI_name": "Thùy Dương",
      "imageUrl": "https://lh5.googleusercontent.com/-3YA4AEm9tTk/AAAAAAAAAAI/AAAAAAAAAKM/CEUrFKhW8mQ/photo.jpg?sz=50",
      "school": "Viện Đại học Mở Hà Nội"
    },
    {
      "AI_name": "Dat Nguyen",
      "imageUrl": "https://graph.facebook.com/v2.5/598865906946336/picture?type=normal",
      "school": "Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "huypro41999",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Công nghệ và Quản lý Hữu nghị"
    },
    {
      "AI_name": "Hồng Nhung",
      "imageUrl": "https://graph.facebook.com/v2.5/898272660318150/picture?type=normal",
      "school": "Học viện Thiết kế và Thời trang London"
    },
    {
      "AI_name": "Ngan Huynh",
      "imageUrl": "https://graph.facebook.com/v2.5/242733362756209/picture?type=normal",
      "school": "Trường Đại học Công nghệ Dệt may Hà Nội"
    },
    {
      "AI_name": "Hải yến",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Điện lực"
    },
    {
      "AI_name": "Linhhhh",
      "imageUrl": "https://lh6.googleusercontent.com/-jUirLEobj-M/AAAAAAAAAAI/AAAAAAAAAPE/lJEDAF08Qds/photo.jpg?sz=50",
      "school": "Trường Đại học Hòa Bình"
    },
    {
      "AI_name": "LUONGTHEU",
      "imageUrl": "https://lh4.googleusercontent.com/-aXMiuXi-uNI/AAAAAAAAAAI/AAAAAAAAAEM/IyKLTbnkksM/photo.jpg?sz=50",
      "school": "Trường Đại học Lao động - Xã hội"
    },
    {
      "AI_name": "Minh Hân",
      "imageUrl": "https://graph.facebook.com/v2.5/293013054369475/picture?type=normal",
      "school": "Trường Cao đẳng Công nghệ và Kinh tế Hà Nội"
    },
    {
      "AI_name": "Nguyenthichien",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Công nghệ Dệt may Hà Nội"
    },
    {
      "AI_name": "Tường",
      "imageUrl": "https://lh6.googleusercontent.com/-LgSiVtKA_Ec/AAAAAAAAAAI/AAAAAAAAABo/PfZq7PKbH_A/photo.jpg?sz=50",
      "school": "Học viện Tài chính"
    },
    {
      "AI_name": "phamthuy1801",
      "imageUrl": "https://lh6.googleusercontent.com/-f-chCMYnYqc/AAAAAAAAAAI/AAAAAAAACwg/h0EdbKdgiFw/photo.jpg?sz=50",
      "school": "Học viện Quân y"
    },
    {
      "AI_name": "huế",
      "imageUrl": "https://graph.facebook.com/v2.5/638011953022210/picture?type=normal",
      "school": "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "lengohtuan09",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Nghệ thuật Hà Nội"
    },
    {
      "AI_name": "Chánh Quang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Nghệ thuật Hà Nội"
    },
    {
      "AI_name": "Anh Anh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Cộng đồng Hà Nội"
    },
    {
      "AI_name": "Chieu Ly",
      "imageUrl": "https://lh6.googleusercontent.com/-3lmOT1CYVrI/AAAAAAAAAAI/AAAAAAAAAMY/4wZXU9A23kc/photo.jpg?sz=50",
      "school": "Học viện Nông nghiệp Việt Nam"
    },
    {
      "AI_name": "HOÀNG THỊ HỒNG",
      "imageUrl": "https://lh5.googleusercontent.com/-sjRXzNkUgsQ/AAAAAAAAAAI/AAAAAAAAAA0/zJL24FmjPJA/photo.jpg?sz=50",
      "school": "Trường Đại học Thủy lợi"
    },
    {
      "AI_name": "Hồ Thanh Tín",
      "imageUrl": "https://lh3.googleusercontent.com/-eF5pCIJ41Mg/AAAAAAAAAAI/AAAAAAAACAE/Zu-hDaI21vg/photo.jpg?sz=50",
      "school": "Học viện Chính trị"
    },
    {
      "AI_name": "Nguyet Nguyen",
      "imageUrl": "https://lh3.googleusercontent.com/-oDwyzh4wMTE/AAAAAAAAAAI/AAAAAAAAAOo/s3YR1GGjdso/photo.jpg?sz=50",
      "school": "Trường Đại học Đại Nam"
    },
    {
      "AI_name": "DungTi",
      "imageUrl": "https://lh5.googleusercontent.com/-MXFnPJx4B5Y/AAAAAAAAAAI/AAAAAAAAAjI/W8eZFMCH5y4/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kỹ thuật Công nghệ Bách Khoa"
    },
    {
      "AI_name": "Hòa",
      "imageUrl": "https://graph.facebook.com/v2.5/1000636206721540/picture?type=normal",
      "school": "Học viện Cảnh sát Nhân dân"
    },
    {
      "AI_name": "LE THANH HA",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kỹ thuật Công nghệ Bách Khoa"
    },
    {
      "AI_name": "Hằng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công nghiệp In"
    },
    {
      "AI_name": "bảo ny",
      "imageUrl": "https://graph.facebook.com/v2.5/251697298534155/picture?type=normal",
      "school": "Trường Đại học Thành Đô"
    },
    {
      "AI_name": "thuydung",
      "imageUrl": "https://lh5.googleusercontent.com/-JyJgbjH1MdY/AAAAAAAAAAI/AAAAAAAAFuM/7ixpL42xGGA/photo.jpg?sz=50",
      "school": "Học viện Ngoại giao"
    },
    {
      "AI_name": "nguyễn cường",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Thiết kế và Thời trang London"
    },
    {
      "AI_name": "Jobatio",
      "imageUrl": "https://lh6.googleusercontent.com/-Cx36i1U0yjc/AAAAAAAAAAI/AAAAAAAAABE/8-q40jVBte0/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Đại Việt"
    },
    {
      "AI_name": "Wendy",
      "imageUrl": "https://lh3.googleusercontent.com/-1tYF_B-TLEw/AAAAAAAAAAI/AAAAAAAAAC4/F9dwK_phFL0/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Xây dựng số 1 (Quận Nam Từ Liêm)"
    },
    {
      "AI_name": "Hino",
      "imageUrl": "https://graph.facebook.com/v2.5/1683826365229562/picture?type=normal",
      "school": "Trường Đại học Công nghệ Dệt may Hà Nội"
    },
    {
      "AI_name": "tuyet",
      "imageUrl": "https://lh6.googleusercontent.com/-9R_ncwP34C4/AAAAAAAAAAI/AAAAAAAAABs/YkmF2S17AtQ/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Xây dựng Công trình Đô thị"
    },
    {
      "AI_name": "Tý Hồ",
      "imageUrl": "https://graph.facebook.com/v2.5/480954245421988/picture?type=normal",
      "school": "Trường Cao đẳng Xây dựng Công trình Đô thị"
    },
    {
      "AI_name": "Nguyenthilan",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Điện lực"
    },
    {
      "AI_name": "Nhung",
      "imageUrl": "https://lh4.googleusercontent.com/-Gp4fzERawrA/AAAAAAAAAAI/AAAAAAAAAGg/Oo0YKsGICPI/photo.jpg?sz=50",
      "school": "Trường Đại học Thủ đô Hà Nội"
    },
    {
      "AI_name": "Xuân",
      "imageUrl": "https://graph.facebook.com/v2.5/435956866598215/picture?type=normal",
      "school": "Trường Đại học Kinh tế - Kỹ thuật Công nghiệp"
    },
    {
      "AI_name": "HoaVan",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Y dược học cổ truyền Việt Nam"
    },
    {
      "AI_name": "Pé Duyền pig",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Quốc tế Bắc Hà"
    },
    {
      "AI_name": "trang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Lê Quý Đôn"
    },
    {
      "AI_name": "Lê Vũ Nhất Hạnh",
      "imageUrl": "https://graph.facebook.com/v2.5/1072988789435142/picture?type=normal",
      "school": "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Toàn",
      "imageUrl": "https://lh6.googleusercontent.com/-6wxe23xqlnM/AAAAAAAAAAI/AAAAAAAAABU/C3Y7tgCL6iU/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Đô"
    },
    {
      "AI_name": "Hoàng Cầm",
      "imageUrl": "https://lh6.googleusercontent.com/-kAX2P697BE0/AAAAAAAAAAI/AAAAAAAABjk/P7nEQw2FasY/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Truyền hình"
    },
    {
      "AI_name": "Dat Nguyen",
      "imageUrl": "https://lh3.googleusercontent.com/-0vndCs8RhPI/AAAAAAAAAAI/AAAAAAAAAL4/wJag5Rzq4iY/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công nghiệp In"
    },
    {
      "AI_name": "thaongoc1609",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công nghệ và Kinh tế Hà Nội"
    },
    {
      "AI_name": "Trịnh thanh hải",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "hongdinh",
      "imageUrl": "https://lh4.googleusercontent.com/-lvvgFzYKFWE/AAAAAAAAAAI/AAAAAAAAAMM/io34HNod1fE/photo.jpg?sz=50",
      "school": "Trường Sĩ quan Lục quân 1"
    },
    {
      "AI_name": "Le Na",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Nguyễn Trãi"
    },
    {
      "AI_name": "Cường_ĐôLa",
      "imageUrl": "https://lh6.googleusercontent.com/-aaNHNdSVPBQ/AAAAAAAAAAI/AAAAAAAAACI/U5t5Rri55ik/photo.jpg?sz=50",
      "school": "Trường Đại học Tài nguyên và Môi trường Hà Nội"
    },
    {
      "AI_name": "Thi Vũ",
      "imageUrl": "https://graph.facebook.com/v2.5/819581974852461/picture?type=normal",
      "school": "Trường Đại học Kinh doanh và Công nghệ Hà Nội"
    },
    {
      "AI_name": "tonnydang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế Kỹ thuật Hà Nội"
    },
    {
      "AI_name": "Đào Văn Dũng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Cộng đồng Hà Nội"
    },
    {
      "AI_name": "",
      "imageUrl": "https://lh6.googleusercontent.com/-7KdfVy2f1fQ/AAAAAAAAAAI/AAAAAAAAABA/9njtn8VgXgM/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Xây dựng Công trình Đô thị"
    },
    {
      "AI_name": "Thanh Nga",
      "imageUrl": "https://lh3.googleusercontent.com/-wpHnQCeeFBg/AAAAAAAAAAI/AAAAAAAAAAA/t3zd6urJPwQ/photo.jpg?sz=50",
      "school": "Học viện Công nghệ Bưu chính Viễn thông"
    },
    {
      "AI_name": "Thái Thanh Thảo",
      "imageUrl": "https://graph.facebook.com/v2.5/1391173804233552/picture?type=normal",
      "school": "Trường Đại học Lao động - Xã hội"
    },
    {
      "AI_name": "minhnguyet",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Y tế Hà Đông"
    },
    {
      "AI_name": "Phuc Nguyen",
      "imageUrl": "https://graph.facebook.com/v2.5/915037751976371/picture?type=normal",
      "school": "Trường Đại học Nội vụ Hà Nội"
    },
    {
      "AI_name": "khanh xuan",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thủy lợi"
    },
    {
      "AI_name": "Hiền Nguyễn",
      "imageUrl": "https://graph.facebook.com/v2.5/1828149564080162/picture?type=normal",
      "school": "Trường Đại học Công nghiệp Hà Nội"
    },
    {
      "AI_name": "swiftie13",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Truyền hình"
    },
    {
      "AI_name": "Tha Vi",
      "imageUrl": "https://graph.facebook.com/v2.5/1748614748714634/picture?type=normal",
      "school": "Trường Đại học Luật Hà Nội"
    },
    {
      "AI_name": "Julia",
      "imageUrl": "https://graph.facebook.com/v2.5/1754749198073603/picture?type=normal",
      "school": "Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Vũ Thị Hải Anh",
      "imageUrl": "https://graph.facebook.com/v2.5/960059680770312/picture?type=normal",
      "school": "Trường Cao đẳng nghề cơ điện Hà Nội"
    },
    {
      "AI_name": "Nguyễn Hữu Diệp",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Lao động - Xã hội"
    },
    {
      "AI_name": "Ngocdiem ",
      "imageUrl": "https://graph.facebook.com/v2.5/1776135275979536/picture?type=normal",
      "school": "Trường Cao đẳng Múa Việt Nam"
    },
    {
      "AI_name": "Vulieu",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện An ninh Nhân dân"
    },
    {
      "AI_name": "Nguyenthilien",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Onlyyou97",
      "imageUrl": "https://lh3.googleusercontent.com/-fAlGOquOPvY/AAAAAAAAAAI/AAAAAAAAABE/n0SjgfPJLpI/photo.jpg?sz=50",
      "school": "Trường Đại học Thăng Long"
    },
    {
      "AI_name": "My Linh",
      "imageUrl": "https://lh3.googleusercontent.com/-LgpTIbzMNog/AAAAAAAAAAI/AAAAAAAAAVU/AlqxJvDaOdk/photo.jpg?sz=50",
      "school": "Học viện Phụ nữ Việt Nam"
    },
    {
      "AI_name": "lenguyenkimmy",
      "imageUrl": "https://lh5.googleusercontent.com/-5ZnlFZokJEw/AAAAAAAAAAI/AAAAAAAAAAs/P98pgMaNZjU/photo.jpg?sz=50",
      "school": "Học viện Nông nghiệp Việt Nam"
    },
    {
      "AI_name": "Trần Lệ Xuân",
      "imageUrl": "https://graph.facebook.com/v2.5/664474557039765/picture?type=normal",
      "school": "Trường Cao đẳng nghề Phú Châu"
    },
    {
      "AI_name": "Ngô Anh Lâm",
      "imageUrl": "https://lh5.googleusercontent.com/-MP77CakL5ho/AAAAAAAAAAI/AAAAAAAAARM/mxAU8T7KT_Q/photo.jpg?sz=50",
      "school": "Học viện Phòng không - Không quân"
    },
    {
      "AI_name": "Trương Vy",
      "imageUrl": "https://lh3.googleusercontent.com/-SeASnOugxTc/AAAAAAAAAAI/AAAAAAAAACQ/QfB7G4xxw3I/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế - Kỹ thuật Trung ương"
    },
    {
      "AI_name": "NGUYẾN BÌNH",
      "imageUrl": "https://graph.facebook.com/v2.5/2069575773267656/picture?type=normal",
      "school": "Trường Cao đẳng Truyền hình"
    },
    {
      "AI_name": "Song Myclass",
      "imageUrl": "https://graph.facebook.com/v2.5/1159318864089572/picture?type=normal",
      "school": "Trường Đại học Kiến trúc Hà Nội"
    },
    {
      "AI_name": "Cuty",
      "imageUrl": "https://graph.facebook.com/v2.5/266714987036901/picture?type=normal",
      "school": "Trường Cao đẳng Công nghệ và Kinh tế Hà Nội"
    },
    {
      "AI_name": "Huyen",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng nghề Phú Châu"
    },
    {
      "AI_name": "Nhật Hoàng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Công nghệ Giao thông Vận tải"
    },
    {
      "AI_name": "Vu thị ngọc ánh",
      "imageUrl": "https://lh4.googleusercontent.com/-8X8QavzOlV8/AAAAAAAAAAI/AAAAAAAAevU/dLDW4oKSQ9c/photo.jpg?sz=50",
      "school": "Học viện Thiết kế và Thời trang London"
    },
    {
      "AI_name": "Bean Huyền",
      "imageUrl": "https://lh6.googleusercontent.com/-OkBg8cmsMyM/AAAAAAAAAAI/AAAAAAAAAAw/Rh5eu6ur0H0/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã"
    },
    {
      "AI_name": "nguyenxuantinh",
      "imageUrl": "https://lh4.googleusercontent.com/-I6_s4FgvXpM/AAAAAAAAAAI/AAAAAAAAADM/QMa7aCss8Gc/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Thực hành FPT"
    },
    {
      "AI_name": "luyen anh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Múa Việt Nam"
    },
    {
      "AI_name": "Trang Nguyen",
      "imageUrl": "https://lh4.googleusercontent.com/-kX8NeaeRCFo/AAAAAAAAAAI/AAAAAAAAAAA/dTcI0uC1wq0/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã"
    },
    {
      "AI_name": "letan",
      "imageUrl": "https://lh4.googleusercontent.com/-3b3fuHGqByc/AAAAAAAAAAI/AAAAAAAAAcU/VUoPAgGTsXI/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Xây dựng số 1 (Quận Nam Từ Liêm)"
    },
    {
      "AI_name": "okokok",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Viện Đại học Mở Hà Nội"
    },
    {
      "AI_name": "Windy_77",
      "imageUrl": "https://graph.facebook.com/v2.5/555265541312624/picture?type=normal",
      "school": "Trường Đại học Công nghệ Dệt may Hà Nội"
    },
    {
      "AI_name": "TRẦN QUỲNH",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Sĩ quan Phòng hóa"
    },
    {
      "AI_name": "tomato2609",
      "imageUrl": "https://graph.facebook.com/v2.5/10206888859806427/picture?type=normal",
      "school": "Học viện Thanh thiếu niên Việt Nam"
    },
    {
      "AI_name": "Nguyen Thi Tam",
      "imageUrl": "https://lh6.googleusercontent.com/-bIy5VQ2ye-g/AAAAAAAAAAI/AAAAAAAAAAs/hlh5hGaFjRg/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Sư phạm Trung ương"
    },
    {
      "AI_name": "Nguyễn Yến Nhi",
      "imageUrl": "https://lh4.googleusercontent.com/-3wqwgoDk3NY/AAAAAAAAAAI/AAAAAAAAAGA/CltuTJH_7WU/photo.jpg?sz=50",
      "school": "Trường Đại học Nguyễn Trãi"
    },
    {
      "AI_name": "Thinh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Sĩ quan Lục quân 1"
    },
    {
      "AI_name": "Thủy Nguyễn",
      "imageUrl": "https://graph.facebook.com/v2.5/928701613942213/picture?type=normal",
      "school": "Trường Cao đẳng Thương mại và du lịch Hà Nội"
    },
    {
      "AI_name": "Nguyễn Thị Mai",
      "imageUrl": "https://lh6.googleusercontent.com/-Jzw54FWQnFM/AAAAAAAAAAI/AAAAAAAAAJo/yknxw2ztKCs/photo.jpg?sz=50",
      "school": "Trường Đại học Thăng Long"
    },
    {
      "AI_name": "Luyen Nguyen",
      "imageUrl": "https://lh3.googleusercontent.com/-dAjypn_mccc/AAAAAAAAAAI/AAAAAAAAAAA/RvrXfdOvZao/photo.jpg?sz=50",
      "school": "Học viện Phụ nữ Việt Nam"
    },
    {
      "AI_name": "MaiLinh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Văn hóa Hà Nội"
    },
    {
      "AI_name": "Trang trang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Tài nguyên và Môi trường Hà Nội"
    },
    {
      "AI_name": "Tien",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Y tế Công cộng"
    },
    {
      "AI_name": "Tùng Bèng",
      "imageUrl": "https://lh5.googleusercontent.com/-BQk49tgHh8M/AAAAAAAAAAI/AAAAAAAAAuU/3oP-lIeybkg/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã"
    },
    {
      "AI_name": "nguyen ngoc",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Quân y"
    },
    {
      "AI_name": "ngan",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Nông nghiệp và phát triển nông thôn Bắc Bộ"
    },
    {
      "AI_name": "phuonghoa",
      "imageUrl": "https://lh6.googleusercontent.com/-ObXCDzcGPdA/AAAAAAAAAAI/AAAAAAAAAA8/ZChJQey_RGI/photo.jpg?sz=50",
      "school": "Trường Đại học Tài nguyên và Môi trường Hà Nội"
    },
    {
      "AI_name": "vuvanhuyen",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Công nghệ Bưu chính Viễn thông"
    },
    {
      "AI_name": "ngocphi0608",
      "imageUrl": "https://graph.facebook.com/v2.5/1012071658909587/picture?type=normal",
      "school": "Trường Đại học Hà Nội"
    },
    {
      "AI_name": "truong thi mai",
      "imageUrl": "https://graph.facebook.com/v2.5/636154916552154/picture?type=normal",
      "school": "Trường Đại học Hà Nội"
    },
    {
      "AI_name": "Vy Thao Le",
      "imageUrl": "https://graph.facebook.com/v2.5/1125988487480054/picture?type=normal",
      "school": "Trường Đại học Sư phạm Thể dục Thể thao Hà Nội"
    },
    {
      "AI_name": "Nguyễn Kim Ngân",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "khanh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Cộng đồng Hà Tây"
    },
    {
      "AI_name": "Tuankiet2011",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Công nghệ Bưu chính Viễn thông"
    },
    {
      "AI_name": "thư",
      "imageUrl": "https://lh6.googleusercontent.com/-6k493KtSvAw/AAAAAAAAAAI/AAAAAAAAAKE/b6WTL_WWVmU/photo.jpg?sz=50",
      "school": "Trường Đại học Công đoàn"
    },
    {
      "AI_name": "Maihien",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã"
    },
    {
      "AI_name": "Hoàng Linh",
      "imageUrl": "https://graph.facebook.com/v2.5/281771895512952/picture?type=normal",
      "school": "Trường Đại học Công nghiệp Việt Hung"
    },
    {
      "AI_name": "nhungcp01",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Điện tử - Điện lạnh Hà Nội"
    },
    {
      "AI_name": "PHUNG",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Đô"
    },
    {
      "AI_name": "dang tho",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Du lịch Hà Nội"
    },
    {
      "AI_name": "Lưu Nhung",
      "imageUrl": "https://graph.facebook.com/v2.5/640476099438967/picture?type=normal",
      "school": "Trường Cao đẳng Múa Việt Nam"
    },
    {
      "AI_name": "MỸ LỘC",
      "imageUrl": "https://lh3.googleusercontent.com/-oPhGmpiV99E/AAAAAAAAAAI/AAAAAAAAABI/VioX4idho4c/photo.jpg?sz=50",
      "school": "Trường Đại học FPT"
    },
    {
      "AI_name": "Tú Trầm",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Sĩ quan Lục quân 1"
    },
    {
      "AI_name": "Trần Ngọc Tân",
      "imageUrl": "https://lh6.googleusercontent.com/-we8hJsbJntw/AAAAAAAAAAI/AAAAAAAAAvQ/vBEPXmbo69A/photo.jpg?sz=50",
      "school": "Trường Đại học Thủ đô Hà Nội"
    },
    {
      "AI_name": "Vân Thùy",
      "imageUrl": "https://graph.facebook.com/v2.5/720954454674981/picture?type=normal",
      "school": "Trường Đại học Khoa học và Công nghệ Hà Nội"
    },
    {
      "AI_name": "buingochamy",
      "imageUrl": "https://graph.facebook.com/v2.5/1027937940661107/picture?type=normal",
      "school": "Trường Cao đẳng nghề cơ điện Hà Nội"
    },
    {
      "AI_name": "vuminhanh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Tài chính Ngân hàng Hà Nội"
    },
    {
      "AI_name": "tuyet",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công nghiệp In"
    },
    {
      "AI_name": "Mr Tuan",
      "imageUrl": "https://lh5.googleusercontent.com/-snfpnFceBEE/AAAAAAAAAAI/AAAAAAAAAH0/f3kpTn91wYQ/photo.jpg?sz=50",
      "school": "Trường Đại học Hà Nội"
    },
    {
      "AI_name": "thanhtuyen_neu",
      "imageUrl": "https://graph.facebook.com/v2.5/1207194515999684/picture?type=normal",
      "school": "Học viện Thiết kế và Thời trang London"
    },
    {
      "AI_name": "Mai Huong",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - Kỹ thuật Công nghiệp"
    },
    {
      "AI_name": "Trường",
      "imageUrl": "https://lh3.googleusercontent.com/-HNkVWQwrrBA/AAAAAAAAAAI/AAAAAAAAAEM/fwPOZJIbdXE/photo.jpg?sz=50",
      "school": "Học viện Chính sách và Phát triển"
    },
    {
      "AI_name": "Thanh Trang",
      "imageUrl": "https://graph.facebook.com/v2.5/1145817675482531/picture?type=normal",
      "school": "Học viện Tư pháp Việt Nam"
    },
    {
      "AI_name": "Tuyen ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Sư phạm Hà Tây"
    },
    {
      "AI_name": "Trang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Đại Việt"
    },
    {
      "AI_name": "Quang PhamHuy",
      "imageUrl": "https://lh5.googleusercontent.com/-wUbbU-hLUQY/AAAAAAAAAAI/AAAAAAAAAIk/Hy6V9-7_Mbs/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Thực hành FPT"
    },
    {
      "AI_name": "Vân Thảo",
      "imageUrl": "https://lh6.googleusercontent.com/-swkovgUDZZs/AAAAAAAAAAI/AAAAAAAAAKE/HbD8O0aF4II/photo.jpg?sz=50",
      "school": "Học viện Ngoại giao"
    },
    {
      "AI_name": "Mỹ tiên",
      "imageUrl": "https://lh3.googleusercontent.com/-5zbW-idwCUA/AAAAAAAAAAI/AAAAAAAABWo/oBmVafz2L9g/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công nghiệp In"
    },
    {
      "AI_name": "thùy",
      "imageUrl": "https://lh5.googleusercontent.com/-aqIx10kUOHo/AAAAAAAAAAI/AAAAAAAAAAA/Cl_hVedydd0/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Du lịch Hà Nội"
    },
    {
      "AI_name": "diệu anh",
      "imageUrl": "https://lh6.googleusercontent.com/-Jp-nRBw-LmE/AAAAAAAAAAI/AAAAAAAAADM/Pj2abftIKvs/photo.jpg?sz=50",
      "school": "Viện Đại học Mở Hà Nội"
    },
    {
      "AI_name": "Kin Nguyen",
      "imageUrl": "https://lh4.googleusercontent.com/-7fCkwUtGy6E/AAAAAAAAAAI/AAAAAAAACOk/qh2iF-spTLY/photo.jpg?sz=50",
      "school": "Trường Đại học Điện lực"
    },
    {
      "AI_name": "vu duc canh",
      "imageUrl": "https://graph.facebook.com/v2.5/668229559994778/picture?type=normal",
      "school": "Trường Đại học Công nghệ Dệt may Hà Nội"
    },
    {
      "AI_name": "Anna phạm",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Biên phòng"
    },
    {
      "AI_name": "Kim Anh",
      "imageUrl": "https://lh6.googleusercontent.com/-qTodpuMSM8U/AAAAAAAAAAI/AAAAAAAAANA/iDzPIxYVZYY/photo.jpg?sz=50",
      "school": "Trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Trần Thanh Phong",
      "imageUrl": "https://graph.facebook.com/v2.5/1079641498739879/picture?type=normal",
      "school": "Trường Cao đẳng nghề Phú Châu"
    },
    {
      "AI_name": "Volinh",
      "imageUrl": "https://lh4.googleusercontent.com/-3O0NE-kJ8sY/AAAAAAAAAAI/AAAAAAAAABs/9v7E5-k7ysI/photo.jpg?sz=50",
      "school": "Trường Đại học Nguyễn Trãi"
    },
    {
      "AI_name": "Maovan",
      "imageUrl": "https://graph.facebook.com/v2.5/673622792791676/picture?type=normal",
      "school": "Trường Cao đẳng Thực hành FPT"
    },
    {
      "AI_name": "nguyễn minh Phượng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Đô"
    },
    {
      "AI_name": "Nhan",
      "imageUrl": "https://lh6.googleusercontent.com/-I-Vov6AA1Y8/AAAAAAAAAAI/AAAAAAAACz8/JnpYcorcCvQ/photo.jpg?sz=50",
      "school": "Học viện Báo chí và Tuyên truyền"
    },
    {
      "AI_name": "Siny",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Truyền hình"
    },
    {
      "AI_name": "Kim Tuyen",
      "imageUrl": "https://lh3.googleusercontent.com/-g5689TRAKf0/AAAAAAAAAAI/AAAAAAAAABA/EqBRKwUp66g/photo.jpg?sz=50",
      "school": "Viện Đại học Mở Hà Nội"
    },
    {
      "AI_name": "Trần Hằng",
      "imageUrl": "https://lh3.googleusercontent.com/-UH_6FsIE3RI/AAAAAAAAAAI/AAAAAAAAABU/m4ErmzDq6mU/photo.jpg?sz=50",
      "school": "Trường Đại học Y Hà Nội"
    },
    {
      "AI_name": "Như Thuỳ",
      "imageUrl": "https://lh6.googleusercontent.com/-86yVBEdXUXc/AAAAAAAAAAI/AAAAAAAAABo/Sngrd4OUcEw/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Đại Việt"
    },
    {
      "AI_name": "le nguyen loc",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Hữu Thắng",
      "imageUrl": "https://graph.facebook.com/v2.5/163705034051652/picture?type=normal",
      "school": "Học viện Tài chính"
    },
    {
      "AI_name": "hung",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Viện Đại học Mở Hà Nội"
    },
    {
      "AI_name": "GIÓ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "mtcuong",
      "imageUrl": "https://lh6.googleusercontent.com/-3ueqF9uV_FM/AAAAAAAAAAI/AAAAAAAAAI4/KWqtGaf-SZw/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã"
    },
    {
      "AI_name": "nguyenthimung",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Hà Nội"
    },
    {
      "AI_name": "Nhậtminhvt ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Cộng đồng Hà Nội"
    },
    {
      "AI_name": "Lee Sin",
      "imageUrl": "https://graph.facebook.com/v2.5/1004793059638766/picture?type=normal",
      "school": "Trường Đại học Đông Đô"
    },
    {
      "AI_name": "HOA",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Hòa Bình"
    },
    {
      "AI_name": "Lê Đức Minh",
      "imageUrl": "https://lh3.googleusercontent.com/-TmeOsfSY_4U/AAAAAAAAAAI/AAAAAAAAABk/j96LMip_h4E/photo.jpg?sz=50",
      "school": "Trường Đại học Giáo dục, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "nguyenthoa",
      "imageUrl": "https://graph.facebook.com/v2.5/928014747308570/picture?type=normal",
      "school": "Trường Cao đẳng Công nghệ và Kinh tế Hà Nội"
    },
    {
      "AI_name": "Ngọc tít",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Công nghệ và Quản lý Hữu nghị"
    },
    {
      "AI_name": "dan",
      "imageUrl": "https://lh4.googleusercontent.com/-x18eJwStnUE/AAAAAAAAAAI/AAAAAAAAAFo/4WHmeHuZl28/photo.jpg?sz=50",
      "school": "Trường Đại học Công nghệ và Quản lý Hữu nghị"
    },
    {
      "AI_name": "Trang Nguyễn",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đại Nam"
    },
    {
      "AI_name": "Ánh Lụa",
      "imageUrl": "https://lh5.googleusercontent.com/-aow5jEbs1Xo/AAAAAAAAAAI/AAAAAAAAABg/XjvmPlQwWR0/photo.jpg?sz=50",
      "school": "Trường Đại học Xây dựng"
    },
    {
      "AI_name": "Nguyễn Thị Hoa",
      "imageUrl": "https://graph.facebook.com/v2.5/641989785976045/picture?type=normal",
      "school": "Trường Đại học Công nghiệp Việt Hung"
    },
    {
      "AI_name": "Vũ Minh Trung",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - Kỹ thuật Công nghiệp"
    },
    {
      "AI_name": "Muopdang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế Kỹ thuật Hà Nội"
    },
    {
      "AI_name": "Trọng Quy",
      "imageUrl": "https://lh3.googleusercontent.com/-Dtir1DabcUs/AAAAAAAAAAI/AAAAAAAAB5w/S3AwSfQoCNI/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã"
    },
    {
      "AI_name": "Dung Pi",
      "imageUrl": "https://lh4.googleusercontent.com/-5WS5lOhL1cQ/AAAAAAAAAAI/AAAAAAAAAB8/W1thq0U0-l4/photo.jpg?sz=50",
      "school": "Trường Đại học Nội vụ Hà Nội"
    },
    {
      "AI_name": "Nguyễn Thị Hiền",
      "imageUrl": "https://graph.facebook.com/v2.5/1067485886633713/picture?type=normal",
      "school": "Trường Đại học Kỹ thuật Lê Quý Đôn"
    },
    {
      "AI_name": "Hảo",
      "imageUrl": "https://lh6.googleusercontent.com/-JyUgEy2hJbA/AAAAAAAAAAI/AAAAAAAAAAs/XMvIi8OH9G8/photo.jpg?sz=50",
      "school": "Trường Đại học Nội vụ Hà Nội"
    },
    {
      "AI_name": "Minh Khải",
      "imageUrl": "https://lh5.googleusercontent.com/-iu6ji5YDwjw/AAAAAAAAAAI/AAAAAAAABPo/WY--3Y7W-rc/photo.jpg?sz=50",
      "school": "Trường Đại học Bách khoa Hà Nội"
    },
    {
      "AI_name": "Diệm Võ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Giáo dục, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Vu Thi Binh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Xây dựng Công trình Đô thị"
    },
    {
      "AI_name": "Nguyễn Đức An",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Chính trị - Hành chính Quốc gia Hồ Chí Minh"
    },
    {
      "AI_name": "Mạnh Linh",
      "imageUrl": "https://lh5.googleusercontent.com/-yX4AGM5nT8I/AAAAAAAAAAI/AAAAAAAAAF0/qzxxoDDkNOs/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Cộng đồng Hà Nội"
    },
    {
      "AI_name": "thanh thanh",
      "imageUrl": "https://lh5.googleusercontent.com/-97JzgQXzEsA/AAAAAAAAAAI/AAAAAAAAABY/fYZq6mS02k8/photo.jpg?sz=50",
      "school": "Học viện Ngoại giao"
    },
    {
      "AI_name": "Thanh Hương Đỗ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thành Đô"
    },
    {
      "AI_name": "Giang Pham",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế Kỹ thuật Thương mại"
    },
    {
      "AI_name": "phạm thị hảo",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Sư phạm Trung ương"
    },
    {
      "AI_name": "Thu Hieu",
      "imageUrl": "https://lh4.googleusercontent.com/-E4YE-aIy5vY/AAAAAAAAAAI/AAAAAAAAABo/cUfFjhbaDUw/photo.jpg?sz=50",
      "school": "Trường Đại học Điện lực"
    },
    {
      "AI_name": "Huyền",
      "imageUrl": "https://lh6.googleusercontent.com/-uZ9gSIPqZn4/AAAAAAAAAAI/AAAAAAAAACo/-ooKNMRbkqE/photo.jpg?sz=50",
      "school": "Trường Đại học Công nghiệp Hà Nội"
    },
    {
      "AI_name": "Lê Thanh Thảo",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Hà Nội"
    },
    {
      "AI_name": "Thu Hồng ",
      "imageUrl": "https://lh4.googleusercontent.com/-xgZEiA-MjQw/AAAAAAAAAAI/AAAAAAAAABo/_Mfuhv7MMZ0/photo.jpg?sz=50",
      "school": "Viện Đại học Mở Hà Nội"
    },
    {
      "AI_name": "thanhtam",
      "imageUrl": "https://lh4.googleusercontent.com/-agI7a83iA5Q/AAAAAAAAAAI/AAAAAAAAADA/UnG7TposRYU/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công nghệ Hà Nội"
    },
    {
      "AI_name": "Hồ Xuân Diện",
      "imageUrl": "https://lh6.googleusercontent.com/-Q7uyYF8tzfk/AAAAAAAAAAI/AAAAAAAAADc/X3ZWsKlrjko/photo.jpg?sz=50",
      "school": "Học viện Phòng không - Không quân"
    },
    {
      "AI_name": "Van Xu",
      "imageUrl": "https://lh6.googleusercontent.com/-TPhn-avUCvI/AAAAAAAAAAI/AAAAAAAAAZ4/SZtNzgmGgg4/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế - Kỹ thuật Trung ương"
    },
    {
      "AI_name": "Vivian",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm Hà Nội"
    },
    {
      "AI_name": "Nam Hoàng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Sư phạm Trung ương"
    },
    {
      "AI_name": "daihuynh336",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Sư phạm Trung ương"
    },
    {
      "AI_name": "LDP",
      "imageUrl": "https://lh6.googleusercontent.com/-DP4ONoD6NcU/AAAAAAAAAAI/AAAAAAAAABY/ZbcJScfqrUg/photo.jpg?sz=50",
      "school": "Trường Đại học Đại Nam"
    },
    {
      "AI_name": "YY",
      "imageUrl": "https://lh3.googleusercontent.com/-WJIAiqdFWh4/AAAAAAAAAAI/AAAAAAAAACk/LIdtimOwFL0/photo.jpg?sz=50",
      "school": "Trường Đại học Mỹ thuật Công nghiệp Hà Nội"
    },
    {
      "AI_name": "tranhieu1501",
      "imageUrl": "https://lh4.googleusercontent.com/-UAKZa-U6khU/AAAAAAAAAAI/AAAAAAAAABc/RStvYy6urKk/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm Thể dục Thể thao Hà Nội"
    },
    {
      "AI_name": "Dương Kim Loan",
      "imageUrl": "https://lh3.googleusercontent.com/-B2K0IFUBGt8/AAAAAAAAAAI/AAAAAAAAC-Y/CVYDD5C1y1U/photo.jpg?sz=50",
      "school": "Trường Cao đẳng nghề cơ điện Hà Nội"
    },
    {
      "AI_name": "Lan Hương",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Xây dựng Công trình Đô thị"
    },
    {
      "AI_name": "Richard Annowit",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế Kỹ thuật Thương mại"
    },
    {
      "AI_name": "Đức Toản",
      "imageUrl": "https://lh3.googleusercontent.com/-q9TycvI7jdw/AAAAAAAAAAI/AAAAAAAAABI/uiTWZxG9_PQ/photo.jpg?sz=50",
      "school": "Trường Đại học Tài chính Ngân hàng Hà Nội"
    },
    {
      "AI_name": "Hùng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Tư pháp Việt Nam"
    },
    {
      "AI_name": "thu hiền",
      "imageUrl": "https://lh6.googleusercontent.com/-FZXtMhqTtn4/AAAAAAAAAAI/AAAAAAAAABo/9vdLnKGWjGQ/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế, Đại học Quốc gia Hà Nội"
    },
    {
      "AI_name": "Sống Bằng Tình Cảm",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thành Tây"
    },
    {
      "AI_name": "Thanhmilano",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế Quốc dân"
    },
    {
      "AI_name": "nguyễn thái lộc",
      "imageUrl": "https://graph.facebook.com/v2.5/669825576489496/picture?type=normal",
      "school": "Học viện Kỹ thuật Quân sự cơ sở 2"
    },
    {
      "AI_name": "LeKha0312",
      "imageUrl": "https://graph.facebook.com/v2.5/313814578966219/picture?type=normal",
      "school": "Trường Cao đẳng Xây dựng số 2"
    },
    {
      "AI_name": "Mia2907",
      "imageUrl": "https://lh6.googleusercontent.com/-o402IG6j_b8/AAAAAAAAAAI/AAAAAAAAALE/AgrQczIyukY/photo.jpg?sz=50",
      "school": "Trường ĐH Mở TP.HCM"
    },
    {
      "AI_name": "Trần Thu Hương",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Khoa học Xã hội và Nhân văn, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Thanh Tùng",
      "imageUrl": "https://graph.facebook.com/v2.5/518601538338111/picture?type=normal",
      "school": "Trường Cao đẳng Sân khấu Điện ảnh Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Ducvt",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Sư phạm Kỹ thuật TP.HCM"
    },
    {
      "AI_name": "vo hang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng nghề Việt Mỹ"
    },
    {
      "AI_name": "hoàng hồng",
      "imageUrl": "https://lh4.googleusercontent.com/-gCzjtFnU810/AAAAAAAAAAI/AAAAAAAAABo/6KXvI1jRTJs/photo.jpg?sz=50",
      "school": "Trường ĐH Nông Lâm TP.HCM"
    },
    {
      "AI_name": "Quoc Khanh",
      "imageUrl": "https://lh6.googleusercontent.com/-fgG1DQaPCFU/AAAAAAAAAAI/AAAAAAAAAHg/apjNiV2NarA/photo.jpg?sz=50",
      "school": "Trường ĐH Văn Hiến"
    },
    {
      "AI_name": "pelu",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Điện Lực Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "DAO THANH QUANG",
      "imageUrl": "https://lh6.googleusercontent.com/-Jn-S7YFxHAg/AAAAAAAAAAI/AAAAAAAAAA4/MHgbXBkHlWM/photo.jpg?sz=50",
      "school": "Trường ĐH Trần Đại Nghĩa"
    },
    {
      "AI_name": "Marry Nhím",
      "imageUrl": "https://graph.facebook.com/v2.5/287145704974970/picture?type=normal",
      "school": "Trường ĐH Thủy lợi cơ sở 2"
    },
    {
      "AI_name": "Linh Lê",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế TP.HCM"
    },
    {
      "AI_name": "Thương Thương",
      "imageUrl": "https://graph.facebook.com/v2.5/237158990012613/picture?type=normal",
      "school": "Trường ĐH Ngoại ngữ - Tin học TP.HCM"
    },
    {
      "AI_name": "nguyễn hạnh",
      "imageUrl": "https://lh5.googleusercontent.com/-MlNRHUkmwHI/AAAAAAAAAAI/AAAAAAAAABs/rhjVMZl4OPA/photo.jpg?sz=50",
      "school": "Trường ĐH Ngoại thương cơ sỏ phía Nam"
    },
    {
      "AI_name": "Phước An",
      "imageUrl": "https://lh5.googleusercontent.com/-wDA-d8bOlyM/AAAAAAAAAAI/AAAAAAAAAAs/naPbtSJczY0/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kỹ thuật Lý Tự Trọng"
    },
    {
      "AI_name": "Phương Đông",
      "imageUrl": "https://lh5.googleusercontent.com/-w5WP13BEFiU/AAAAAAAAAAI/AAAAAAAAADM/f8L5KTW31wQ/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã cơ sở phía Nam"
    },
    {
      "AI_name": "LeThuy",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Giao thông Vận tải - cơ sở 2"
    },
    {
      "AI_name": "Hoàng Minh Tuấn",
      "imageUrl": "https://graph.facebook.com/v2.5/1675287812792704/picture?type=normal",
      "school": "Trường Cao đẳng Công Thương Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Nguyễn Trương Thị Như Quỳnh",
      "imageUrl": "https://graph.facebook.com/v2.5/1799447850339438/picture?type=normal",
      "school": "Trường Cao đẳng Sư phạm Trung ương"
    },
    {
      "AI_name": "nguyễn ninh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Tôn Đức Thắng"
    },
    {
      "AI_name": "Anhle",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Dân lập Văn Lang"
    },
    {
      "AI_name": "Vũ Thế Khoa",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Sài Gòn"
    },
    {
      "AI_name": "Đình Hà",
      "imageUrl": "https://lh6.googleusercontent.com/-AyqQplB58WE/AAAAAAAAAAI/AAAAAAAAAAs/ahd6-_fCZDU/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Điện Lực Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "phanhuong",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Giao thông Vận tải"
    },
    {
      "AI_name": "Hoang Khiem",
      "imageUrl": "https://graph.facebook.com/v2.5/947741865337316/picture?type=normal",
      "school": "Trường ĐH Dân lập Văn Lang"
    },
    {
      "AI_name": "kepbaongan",
      "imageUrl": "https://lh3.googleusercontent.com/-_P7qTGeQ5Xc/AAAAAAAAAAI/AAAAAAAABd8/dH1igpP1Xds/photo.jpg?sz=50",
      "school": "Trường ĐH Nông Lâm TP.HCM"
    },
    {
      "AI_name": "My Lien Nguyen",
      "imageUrl": "https://lh4.googleusercontent.com/-PAHRp50fg4E/AAAAAAAAAAI/AAAAAAAAB0M/9n3oN1Xw5PM/photo.jpg?sz=50",
      "school": "Trường ĐH Kinh tế - Luật, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Lathilien",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Quốc tế Hồng Bàng"
    },
    {
      "AI_name": "Ly tran",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Ngoại ngữ - Tin học TP.HCM"
    },
    {
      "AI_name": "VY",
      "imageUrl": "https://lh5.googleusercontent.com/-BWGIPQ5eFwc/AAAAAAAAAAI/AAAAAAAAAGk/lzdg6ZFMw68/photo.jpg?sz=50",
      "school": "Trường ĐH Thể dục Thể thao TP.HCM"
    },
    {
      "AI_name": "kieuchef",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Tài chính - Hải quan"
    },
    {
      "AI_name": "ly thu hong",
      "imageUrl": "https://graph.facebook.com/v2.5/733965506741995/picture?type=normal",
      "school": "Trường ĐH Công nghiệp Thực phẩm TP.HCM"
    },
    {
      "AI_name": "Hieu",
      "imageUrl": "https://lh3.googleusercontent.com/-EB3rtieTTvw/AAAAAAAAAAI/AAAAAAAAAUI/SsRBqZ3D0aQ/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghệ Thông tin, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "cóchíthìnên",
      "imageUrl": "https://graph.facebook.com/v2.5/666115636873182/picture?type=normal",
      "school": "Trường ĐH Nông Lâm TP.HCM"
    },
    {
      "AI_name": "Thien vu",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Tài chính - Marketing"
    },
    {
      "AI_name": "Giang Pham",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Điện Lực Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Diệp Anh",
      "imageUrl": "https://lh3.googleusercontent.com/-ZUZDfuX2haU/AAAAAAAAAAI/AAAAAAAAAA4/i2p31Cfs8U0/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế TP.HCM"
    },
    {
      "AI_name": "vohuybao",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Lao động - Xã hội (cơ sở 2 TP.HCM)"
    },
    {
      "AI_name": "Lâm Công Danh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Khoa Y - ĐH Quốc gia Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Julia Nguyễn",
      "imageUrl": "https://graph.facebook.com/v2.5/841790852624022/picture?type=normal",
      "school": "Trường Cao đẳng Công nghiệp Dệt may Thời trang"
    },
    {
      "AI_name": "",
      "imageUrl": "https://graph.facebook.com/v2.5/663921303774561/picture?type=normal",
      "school": "Học viện Hành chính cơ sở phía Nam"
    },
    {
      "AI_name": "laovoicogiao",
      "imageUrl": "https://graph.facebook.com/v2.5/1009764682469648/picture?type=normal",
      "school": "Trường Cao đẳng Giao thông Vận tải"
    },
    {
      "AI_name": "Đậu Thị Kiều ",
      "imageUrl": "https://graph.facebook.com/v2.5/1050989065016788/picture?type=normal",
      "school": "Trường Cao đẳng Công nghiệp Dệt may Thời trang"
    },
    {
      "AI_name": "Nhung Nguyen",
      "imageUrl": "https://graph.facebook.com/v2.5/304410419904769/picture?type=normal",
      "school": "Trường Cao đẳng Điện Lực Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Thu Thảo",
      "imageUrl": "https://lh6.googleusercontent.com/-iTVM5uxkclE/AAAAAAAAAAI/AAAAAAAAADU/IoIUfwZdzoY/photo.jpg?sz=50",
      "school": "Trường ĐH Nông Lâm TP.HCM"
    },
    {
      "AI_name": "lap bui",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Tôn Đức Thắng"
    },
    {
      "AI_name": "Thanh Binh",
      "imageUrl": "https://lh4.googleusercontent.com/-2d1basxZqrU/AAAAAAAAAAI/AAAAAAAAACs/JE5_QCrClzg/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Nguyễn Tất Thành"
    },
    {
      "AI_name": "Thảo",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Ngoại ngữ - Tin học TP.HCM"
    },
    {
      "AI_name": "nguyen viet vu",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Hoa Sen"
    },
    {
      "AI_name": "tuowng.anh",
      "imageUrl": "https://graph.facebook.com/v2.5/331065317234238/picture?type=normal",
      "school": "Trường Cao đẳng Kinh tế TP.HCM"
    },
    {
      "AI_name": "Thuhang79",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghệ thông tin Gia Định"
    },
    {
      "AI_name": "phạm vũ phương",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Sư phạm Thể dục Thể thao TP.HCM"
    },
    {
      "AI_name": "anh.stella",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng nghề iSPACE"
    },
    {
      "AI_name": "thuthanh2911",
      "imageUrl": "https://lh4.googleusercontent.com/-5PeykCNigSA/AAAAAAAAAAI/AAAAAAAAADM/Fo-G5NFuR9E/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kĩ thuật Công nghệ Vạn Xuân"
    },
    {
      "AI_name": "mỹ hạnh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Kiến trúc TP.HCM"
    },
    {
      "AI_name": "Thao",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Y Dược TP.HCM"
    },
    {
      "AI_name": "nguyễn sơn hùng",
      "imageUrl": "https://lh5.googleusercontent.com/-trSXic1phGY/AAAAAAAAAAI/AAAAAAAAAE0/ROiBlwbXJmA/photo.jpg?sz=50",
      "school": "Trường Cao đẳng nghề Việt Mỹ"
    },
    {
      "AI_name": "Ngoc Hanh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Sân khấu, Điện ảnh TP.HCM"
    },
    {
      "AI_name": "tuấn",
      "imageUrl": "https://lh3.googleusercontent.com/-uQt-JS2Sc2E/AAAAAAAAAAI/AAAAAAAAABQ/I5hzGn-sZ7Q/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghiệp TP.HCM"
    },
    {
      "AI_name": "Tess",
      "imageUrl": "https://lh3.googleusercontent.com/-emdDTNFjU70/AAAAAAAAAAI/AAAAAAAAAmg/HeQ7pO72ufM/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghệ Thông tin, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Nguyễn Quang Khải",
      "imageUrl": "https://lh3.googleusercontent.com/-Xcm7tps0lkc/AAAAAAAAAAI/AAAAAAAABdo/jW9Rvel3_8U/photo.jpg?sz=50",
      "school": "Trường ĐH Văn hóa TP.HCM"
    },
    {
      "AI_name": "Hồng Nhung",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Giao thông Vận tải - cơ sở 2"
    },
    {
      "AI_name": "Trần Nam Giang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kĩ thuật Công nghệ Vạn Xuân"
    },
    {
      "AI_name": "Mai Nguyên",
      "imageUrl": "https://lh3.googleusercontent.com/-YuAco6bxeec/AAAAAAAAAAI/AAAAAAAAALc/I-WOeVMWYQ8/photo.jpg?sz=50",
      "school": "Trường ĐH Quốc tế, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Ngoc93",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng kinh tế - kỹ thuật Phú Lâm"
    },
    {
      "AI_name": "nguyễn quang khải",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghệ Thông tin, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Mạn lệ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghệ TP.HCM (HUTECH)"
    },
    {
      "AI_name": "Huy Cadastre",
      "imageUrl": "https://lh5.googleusercontent.com/-PGi859cm3mM/AAAAAAAAAAI/AAAAAAAAAHU/3LuE2nKjMC8/photo.jpg?sz=50",
      "school": "Trường ĐH Ngoại ngữ - Tin học TP.HCM"
    },
    {
      "AI_name": "Giang Se",
      "imageUrl": "https://graph.facebook.com/v2.5/592581340929409/picture?type=normal",
      "school": "Trường Cao đẳng Văn hóa nghệ thuật và du lịch Sài Gòn"
    },
    {
      "AI_name": "Nguyễn Thu Hiền",
      "imageUrl": "https://lh3.googleusercontent.com/-E_vn6483lqw/AAAAAAAAAAI/AAAAAAAAACk/0beCI6qtR4w/photo.jpg?sz=50",
      "school": "Trường Cao đẳng kinh tế - kỹ thuật Phú Lâm"
    },
    {
      "AI_name": "Nguyễn Thị Hoa Hằng",
      "imageUrl": "https://lh4.googleusercontent.com/-xn-VjZgUCXs/AAAAAAAAAAI/AAAAAAAAAA4/oR6u9zBpZm0/photo.jpg?sz=50",
      "school": "Trường ĐH Bách khoa, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Anh Tuyet",
      "imageUrl": "https://lh3.googleusercontent.com/-z3KK-M2Xdek/AAAAAAAAAAI/AAAAAAAAAD0/ReX4pT5-kVA/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kỹ nghệ dân lập"
    },
    {
      "AI_name": "Xuan Nguyen",
      "imageUrl": "https://graph.facebook.com/v2.5/2073806422843556/picture?type=normal",
      "school": "Trường Cao đẳng Văn hóa nghệ thuật và du lịch Sài Gòn"
    },
    {
      "AI_name": "nguyen bui",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Trần Đại Nghĩa"
    },
    {
      "AI_name": "thuyhien2552003",
      "imageUrl": "https://lh4.googleusercontent.com/-HZPeP9YAbmQ/AAAAAAAAAAI/AAAAAAAAADg/U0GSL1MbtHs/photo.jpg?sz=50",
      "school": "Cao đẳng Kinh tế Đối ngoại"
    },
    {
      "AI_name": "Trần Mai",
      "imageUrl": "https://lh3.googleusercontent.com/-Ty7ygxrMwKc/AAAAAAAAAAI/AAAAAAAAAbI/O8yWbGBBL4o/photo.jpg?sz=50",
      "school": "Trường ĐH Sư phạm TP.HCM"
    },
    {
      "AI_name": "Tùng Đỗ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH An ninh Nhân dân"
    },
    {
      "AI_name": "jenny",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Kinh tế TP.HCM"
    },
    {
      "AI_name": "Phan Hằng ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Nông Lâm TP.HCM"
    },
    {
      "AI_name": "Ngocha",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Kinh tế - Tài chính TP.HCM"
    },
    {
      "AI_name": "bích ngọc",
      "imageUrl": "https://lh5.googleusercontent.com/-TdGEc0LISxw/AAAAAAAAAAI/AAAAAAAAAGA/rqsyJOTrq-g/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Nguyễn Tất Thành"
    },
    {
      "AI_name": "Trà Mi",
      "imageUrl": "https://lh5.googleusercontent.com/-RY9RRv3UbY4/AAAAAAAAAAI/AAAAAAAAAFU/wo_IeLggoxg/photo.jpg?sz=50",
      "school": "Trường ĐH Sư phạm TP.HCM"
    },
    {
      "AI_name": "nguyenthuhoai",
      "imageUrl": "https://graph.facebook.com/v2.5/1731578117104087/picture?type=normal",
      "school": "Trường ĐH Khoa học Tự nhiên, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Chung",
      "imageUrl": "https://graph.facebook.com/v2.5/998931356891595/picture?type=normal",
      "school": "Trường Cao đẳng Công Thương Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Đỗ Hương",
      "imageUrl": "https://lh6.googleusercontent.com/-xs7ygSYVVds/AAAAAAAAAAI/AAAAAAAAAHk/BWvMMt6po74/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Tài chính - Hải quan"
    },
    {
      "AI_name": "Ruby",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghiệp Thực phẩm TP.HCM"
    },
    {
      "AI_name": "Vương Ngọc Hải",
      "imageUrl": "https://lh6.googleusercontent.com/-i-C23s8J3bU/AAAAAAAAAAI/AAAAAAAAAIc/RUK6ZPOAG0o/photo.jpg?sz=50",
      "school": "Trường ĐH Văn Hiến"
    },
    {
      "AI_name": "HUNG",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Văn hóa nghệ thuật và du lịch Sài Gòn"
    },
    {
      "AI_name": "Sơn Đz",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Học viện Hàng không Việt Nam"
    },
    {
      "AI_name": "jack",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Công Thương Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Công Hòa",
      "imageUrl": "https://lh6.googleusercontent.com/-YeA3pXQlE5c/AAAAAAAAAAI/AAAAAAAAAHM/ip6NkhtSWlg/photo.jpg?sz=50",
      "school": "Trường ĐH Khoa học Xã hội và Nhân văn, ĐHQG Tp.HCM"
    },
    {
      "AI_name": "Nani",
      "imageUrl": "https://lh6.googleusercontent.com/-MLOoFc6aWN0/AAAAAAAAAAI/AAAAAAAAAtY/-gLqe17YLpA/photo.jpg?sz=50",
      "school": "Học viện Kỹ thuật Mật mã cơ sở phía Nam"
    },
    {
      "AI_name": "Nghia",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường ĐH Công nghệ thông tin Gia Định"
    },
    {
      "AI_name": "thanh nga",
      "imageUrl": "https://graph.facebook.com/v2.5/1373585472671644/picture?type=normal",
      "school": "Trường ĐH Cảnh sát Nhân dân"
    },
    {
      "AI_name": "Vic",
      "imageUrl": "https://lh3.googleusercontent.com/-BczQ_a8FAW4/AAAAAAAAAAI/AAAAAAAAAGA/hbN3eIWZc10/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Sân khấu Điện ảnh Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "thach.cq",
      "imageUrl": "https://lh3.googleusercontent.com/-TIm2tJ1n0A0/AAAAAAAAAAI/AAAAAAAAACY/-M0BtsQKn8g/photo.jpg?sz=50",
      "school": "Trường ĐH Mỹ thuật TP.HCM"
    },
    {
      "AI_name": "Trinh Dương",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Cao đẳng Giao thông Vận tải 3"
    },
    {
      "AI_name": "HaLich",
      "imageUrl": "https://lh4.googleusercontent.com/-B2Y0Ghr5lPg/AAAAAAAAAAI/AAAAAAAAAA0/Wtp6aWCUqWg/photo.jpg?sz=50",
      "school": "Nhạc viện Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "thùy",
      "imageUrl": "https://graph.facebook.com/v2.5/648632401980443/picture?type=normal",
      "school": "Trường Cao đẳng Sân khấu Điện ảnh Thành phố Hồ Chí Minh"
    },
    {
      "AI_name": "Thanh Bình",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Đỗ Thị Hoa",
      "imageUrl": "https://graph.facebook.com/v2.5/777167565756389/picture?type=normal",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Ngọc Trâm",
      "imageUrl": "https://lh6.googleusercontent.com/-azR2MXmx8HA/AAAAAAAAAAI/AAAAAAAACAI/u5bcqnZ7dTQ/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "vân ánh",
      "imageUrl": "https://graph.facebook.com/v2.5/1573806876248281/picture?type=normal",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "vân ánh",
      "imageUrl": "https://graph.facebook.com/v2.5/1695263144129707/picture?type=normal",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Minh Phúc",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "VTDD",
      "imageUrl": "https://graph.facebook.com/v2.5/514778428721473/picture?type=normal",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Khuong Lam",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "tungbui",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Toàn",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Le Anh",
      "imageUrl": "https://graph.facebook.com/v2.5/757048474397709/picture?type=normal",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Hiền",
      "imageUrl": "https://graph.facebook.com/v2.5/625899627572284/picture?type=normal",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Nguyễn Thi Bích Phương",
      "imageUrl": "https://lh6.googleusercontent.com/-ylQVsr1UAdM/AAAAAAAAAAI/AAAAAAAABPU/KMeEELUga34/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "quynhnhu",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Trần Tuyết Lan",
      "imageUrl": "https://graph.facebook.com/v2.5/541669919345904/picture?type=normal",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Anh Thi",
      "imageUrl": "https://graph.facebook.com/v2.5/1614267275533416/picture?type=normal",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "phuong",
      "imageUrl": "https://lh3.googleusercontent.com/-4oIdUN5AOi8/AAAAAAAAAAI/AAAAAAAAAAA/GbwjG0wowCQ/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Nguyen Hieu",
      "imageUrl": "https://graph.facebook.com/v2.5/1316666878350941/picture?type=normal",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Hồng",
      "imageUrl": "https://lh6.googleusercontent.com/-N8h-uP1c2Eo/AAAAAAAAAAI/AAAAAAAAFq8/oEFIUs2Dh-U/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Hạnh elight",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "nguyen tinh",
      "imageUrl": "https://lh3.googleusercontent.com/-C6dRRd5uWmw/AAAAAAAAAAI/AAAAAAAAAEM/58vYEallxMw/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "hằng hải",
      "imageUrl": "https://graph.facebook.com/v2.5/1218131134878571/picture?type=normal",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Ng duy nghia",
      "imageUrl": "https://lh5.googleusercontent.com/-hmzWPH7VG3Y/AAAAAAAAAAI/AAAAAAAAAHw/txIrZ3ENuaY/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Huyen",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Khánh Trang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Vũ Long",
      "imageUrl": "https://lh6.googleusercontent.com/-jx4mfH92UI8/AAAAAAAAAAI/AAAAAAAAAfA/w-JCeblIOGE/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Chienhvtc",
      "imageUrl": "https://lh6.googleusercontent.com/-oiZxSVYKq4c/AAAAAAAAAAI/AAAAAAAAAEU/6_i0pf5JcmY/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "vosongtoan",
      "imageUrl": "https://lh5.googleusercontent.com/-z_U1EEw7z4I/AAAAAAAAAAI/AAAAAAAAABE/kZqK5B1DGkI/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Bá Sơn",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Bin",
      "imageUrl": "https://graph.facebook.com/v2.5/218687711817928/picture?type=normal",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Trang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Đỗ Đức Anh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "tamalrado",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Bùi Thị Dinh",
      "imageUrl": "https://graph.facebook.com/v2.5/504373419758679/picture?type=normal",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Ngoc Nguyen Duy",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Link",
      "imageUrl": "https://lh4.googleusercontent.com/-QHL6ZH7BN68/AAAAAAAAAAI/AAAAAAAAAJ4/BNF2HUFOAR0/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Mai Hương",
      "imageUrl": "https://lh6.googleusercontent.com/-Zcurn6U6GHQ/AAAAAAAAAAI/AAAAAAAAAnk/26yLO_A3Ow0/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Trần Vân Ngọc",
      "imageUrl": "https://lh4.googleusercontent.com/-Cqdvghb_1XQ/AAAAAAAAAAI/AAAAAAAAACU/8vWtPFT5adc/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "CU NGOC LUONG",
      "imageUrl": "https://graph.facebook.com/v2.5/690593431097580/picture?type=normal",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "NGUYỄN HƯỞNG",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "khuenguyen",
      "imageUrl": "https://graph.facebook.com/v2.5/888174914649783/picture?type=normal",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "duongduong1308",
      "imageUrl": "https://lh3.googleusercontent.com/-QApe2GcB5pg/AAAAAAAAAAI/AAAAAAAAANE/qUOMQtKR6do/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Do",
      "imageUrl": "https://lh6.googleusercontent.com/-eQ5qOcHLIWk/AAAAAAAAAAI/AAAAAAAAAG8/BnI8ELFnnDo/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Trần Văn Toán",
      "imageUrl": "https://lh3.googleusercontent.com/-B_ZuQI14i5U/AAAAAAAAAAI/AAAAAAAAApE/UL7ABAlNJ-8/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Hienbuihb",
      "imageUrl": "https://lh3.googleusercontent.com/-tTopd7dDP0A/AAAAAAAAAAI/AAAAAAAAABs/ylnOdY5f2mI/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Phạm thảo",
      "imageUrl": "https://lh3.googleusercontent.com/-dFlE_GzhlnQ/AAAAAAAAAAI/AAAAAAAABio/xMT0T2wzfsM/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "daophuc",
      "imageUrl": "https://lh5.googleusercontent.com/-PEt1Ptym-Ns/AAAAAAAAAAI/AAAAAAAAAE4/BXO8Tn3jgF8/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Nguyễn Văn An",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "tina thanh ",
      "imageUrl": "https://lh4.googleusercontent.com/-twey9_7khTE/AAAAAAAAAAI/AAAAAAAAACQ/zQqhP2df02c/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "dinhthangdd",
      "imageUrl": "https://lh3.googleusercontent.com/-iyIC1OUDnCk/AAAAAAAAAAI/AAAAAAAAADU/nQFlExkcrUI/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "hongthamhuynh2000",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "hoàng sim",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Pha Lê Tuyết",
      "imageUrl": "https://lh4.googleusercontent.com/-bEZoN4a-f3k/AAAAAAAAAAI/AAAAAAAAABA/4Eq4pUVgOiQ/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "trang.do",
      "imageUrl": "https://lh3.googleusercontent.com/--wT4Iiy7oyo/AAAAAAAAAAI/AAAAAAAAABQ/pIEKGUF4UWk/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "nguyễn cường",
      "imageUrl": "https://graph.facebook.com/v2.5/344898959232392/picture?type=normal",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Phạm Anh Pha",
      "imageUrl": "https://graph.facebook.com/v2.5/313480452337231/picture?type=normal",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Mai",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "kunkunte",
      "imageUrl": "https://lh3.googleusercontent.com/-Fge5exN1D38/AAAAAAAAAAI/AAAAAAAAAVg/COddM_JTOuA/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Bích Lệ",
      "imageUrl": "https://lh5.googleusercontent.com/-_fN2KCRVkVs/AAAAAAAAAAI/AAAAAAAAAnw/IGjN5gzu6XA/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Nguyenchuong",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "team5ds222",
      "imageUrl": "https://lh4.googleusercontent.com/-0YcpwoV96dc/AAAAAAAAAAI/AAAAAAAAAGs/vTEux37tknQ/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "candy",
      "imageUrl": "https://graph.facebook.com/v2.5/1658585191135229/picture?type=normal",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "vũ thị nhàn",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Đào Quốc Toàn",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Đỗ Thị Hoài",
      "imageUrl": "https://graph.facebook.com/v2.5/756382241168855/picture?type=normal",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Nguyễn Minh Đức",
      "imageUrl": "https://lh4.googleusercontent.com/-4J8F175fDE4/AAAAAAAAAAI/AAAAAAAAAAw/A4uB3IwEfyM/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Anniexinh",
      "imageUrl": "https://lh3.googleusercontent.com/-5hVp10e7oq4/AAAAAAAAAAI/AAAAAAAAASA/73SoMuuUkH8/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Thùy Linh",
      "imageUrl": "https://lh4.googleusercontent.com/-nRg1gD1-mzQ/AAAAAAAAAAI/AAAAAAAAAAs/FvTl6R_ZZe8/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Trà My",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Thao",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Nhật Hạ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "đông nguyễn",
      "imageUrl": "https://lh4.googleusercontent.com/-ThHUntVTNR8/AAAAAAAAAAI/AAAAAAAAAEs/_PcWwv7kBsY/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "MINH",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Gia Bảo",
      "imageUrl": "https://lh3.googleusercontent.com/-BzG8hwRYu0w/AAAAAAAAAAI/AAAAAAAAAEk/4zWLKY32AH0/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Luc",
      "imageUrl": "https://graph.facebook.com/v2.5/683518845139167/picture?type=normal",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "patoak92",
      "imageUrl": "https://lh4.googleusercontent.com/-WuhJ7Dc3WW4/AAAAAAAAAAI/AAAAAAAAACw/jJUKxdg774Y/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "NBPhuong89",
      "imageUrl": "https://lh6.googleusercontent.com/-6eNr0lstQvk/AAAAAAAAAAI/AAAAAAAAAxk/XQwDxTfj0mY/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Đức Phi",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Nguyễn Thị Hoa",
      "imageUrl": "https://graph.facebook.com/v2.5/554210304764542/picture?type=normal",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "linh",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Luc",
      "imageUrl": "https://graph.facebook.com/v2.5/683518845139167/picture?type=normal",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "TUẤN",
      "imageUrl": "https://graph.facebook.com/v2.5/1159662737409927/picture?type=normal",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "leloan",
      "imageUrl": "https://lh3.googleusercontent.com/-ZHvD5EJaY54/AAAAAAAAAAI/AAAAAAAABaM/ytkXaXRVMeY/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "TruyenTDM",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Diễm Phạm",
      "imageUrl": "https://graph.facebook.com/v2.5/1101436866618228/picture?type=normal",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Minh Tấn",
      "imageUrl": "https://lh4.googleusercontent.com/-niQRe9-vQaw/AAAAAAAAAAI/AAAAAAAAADc/q3j56DUsKuk/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Trịnh Quang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "01677672887",
      "imageUrl": "https://lh6.googleusercontent.com/-RLhaDmWelxw/AAAAAAAAAAI/AAAAAAAAAEQ/b4ndYA0HUAE/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Vinh",
      "imageUrl": "https://lh5.googleusercontent.com/-xFibRt3F5gU/AAAAAAAAAAI/AAAAAAAAAA0/clelFCeXtJA/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Ngọc Trần",
      "imageUrl": "https://graph.facebook.com/v2.5/1164022770325998/picture?type=normal",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "dungnv",
      "imageUrl": "https://lh5.googleusercontent.com/-N2DFQDgOkF4/AAAAAAAAAAI/AAAAAAAB2Xs/oHdZNhUYNtc/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Nguyễn Hoài Linh",
      "imageUrl": "https://lh3.googleusercontent.com/-k7_H8k-cWjM/AAAAAAAAAAI/AAAAAAAAGdY/WRdXWfDbx5o/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Ngọc Hương",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "NGANPTK",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "quyen",
      "imageUrl": "https://graph.facebook.com/v2.5/729847740487308/picture?type=normal",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Ellie",
      "imageUrl": "https://graph.facebook.com/v2.5/847103168753996/picture?type=normal",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Bích VCT",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Thu Trang",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Huyền Trang",
      "imageUrl": "https://graph.facebook.com/v2.5/1025847484195128/picture?type=normal",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "tuanbnlt",
      "imageUrl": "https://lh6.googleusercontent.com/-HzikVJD47aA/AAAAAAAAAAI/AAAAAAAAABU/MLxVSv8Qi9s/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "Lê Hữu Anh",
      "imageUrl": "https://lh4.googleusercontent.com/-prnwhr4h8l8/AAAAAAAAAAI/AAAAAAAAAG8/SWzl5OEPb9s/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "KJS eks",
      "imageUrl": "https://lh4.googleusercontent.com/-Gg4RCrlmpVU/AAAAAAAAAAI/AAAAAAAAABM/I7rTxVSUVUQ/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "duclinh",
      "imageUrl": "https://lh6.googleusercontent.com/-1GAWosji_Ys/AAAAAAAAAAI/AAAAAAAAAC8/gnAz9jF_UWc/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "nguyenducloc",
      "imageUrl": "https://lh5.googleusercontent.com/-lGKS_4jg5EU/AAAAAAAAAAI/AAAAAAAAAfk/EKlles2tUHo/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "",
      "imageUrl": "https://graph.facebook.com/v2.5/1036445969803109/picture?type=normal",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Nguyễn Văn Bách",
      "imageUrl": "https://lh5.googleusercontent.com/-jaBpSTG_x8o/AAAAAAAAAAI/AAAAAAAAAxA/3rKcfE1kmb8/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Tinguyen",
      "imageUrl": "https://lh5.googleusercontent.com/-Rk4gbmI-Cc4/AAAAAAAAAAI/AAAAAAAAAG0/uBzyJYY4BKI/photo.jpg?sz=50",
      "school": "Trường Đại học Sư phạm - ĐH Đà Nẵng"
    },
    {
      "AI_name": "tathitongpho",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Ngọc Hân",
      "imageUrl": "https://graph.facebook.com/v2.5/667070686790379/picture?type=normal",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "lê đình thắng",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Nguyễn Đào",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "jenny le",
      "imageUrl": "https://graph.facebook.com/v2.5/1672189323098746/picture?type=normal",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "hphong196",
      "imageUrl": "https://lh4.googleusercontent.com/-ZaaZDiLO7Hg/AAAAAAAAAAI/AAAAAAAAA2o/kajaZM1m2Jg/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Ngoc Mai",
      "imageUrl": "https://graph.facebook.com/v2.5/1775262499355436/picture?type=normal",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Phạm Bá Dân",
      "imageUrl": "https://lh3.googleusercontent.com/-4ZI_pjKhs6w/AAAAAAAAAAI/AAAAAAAADXE/lpbJ4rD6jPc/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Lilya",
      "imageUrl": "https://lh4.googleusercontent.com/-ErQnU49G5RE/AAAAAAAAAAI/AAAAAAAAAXM/6hyIIn4N3po/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "lê dương",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "lê minh",
      "imageUrl": "https://lh4.googleusercontent.com/-BGZoXKOU-VU/AAAAAAAAAAI/AAAAAAAAAEM/eUKY2Mrt4UM/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    },
    {
      "AI_name": "Hoang Duong",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "khanh",
      "imageUrl": "https://lh6.googleusercontent.com/-MbdAerLGUGY/AAAAAAAAAAI/AAAAAAAAADg/APF1MIBwy74/photo.jpg?sz=50",
      "school": "Trường Đại học Kiến trúc Đà Nẵng"
    },
    {
      "AI_name": "Hà Cẩm Trinh ",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Jessica",
      "imageUrl": "https://lh3.googleusercontent.com/-M_06uP3wXLc/AAAAAAAAAAI/AAAAAAAAAA0/P390qiHFc28/photo.jpg?sz=50",
      "school": "Trường Đại học Kinh tế - ĐH Đà Nẵng"
    },
    {
      "AI_name": "phuong thuy",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "Lý Trần",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Đông Á"
    },
    {
      "AI_name": "phuongtran",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Rain",
      "imageUrl": "https://graph.facebook.com/v2.5/669790899838812/picture?type=normal",
      "school": "Trường Đại học Duy Tân"
    },
    {
      "AI_name": "Dothibichhuyen",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Hoàng Thị Duyên",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Kỹ thuật Y - Dược Đà Nẵng"
    },
    {
      "AI_name": "Tuyết",
      "imageUrl": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
      "school": "Trường Đại học Thể dục thể thao Đà Nẵng"
    }
  ],
  tutorialData = [{"word":"literature","image":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Từ vựng cơ bản tiếng anh/literature.png","audio":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Từ vựng cơ bản tiếng anh/Từ/literature.mp3","translate":"Môn Văn","phonetic":"/ˈlɪtrətʃər/","enermyCheck":false,"checked":false},{"word":"hose","image":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Từ vựng cơ bản tiếng anh/hose.png","audio":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Từ vựng cơ bản tiếng anh/Từ/hose.mp3","translate":"Vòi tưới nước","phonetic":"/hoʊz/","enermyCheck":false,"checked":false},{"word":"cash","image":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Từ vựng cơ bản tiếng anh/cash.png","audio":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Từ vựng cơ bản tiếng anh/Từ/cash.mp3","translate":"tiền mặt ","phonetic":"/kæʃ/ ","enermyCheck":false,"checked":false},{"word":"machine","image":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Từ vựng cơ bản tiếng anh/machine.png","audio":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Từ vựng cơ bản tiếng anh/Từ/machine.mp3","translate":"máy móc","phonetic":" /məˈʃiːn/","enermyCheck":false,"checked":false},{"word":"friday","image":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Từ vựng cơ bản tiếng anh/friday.png","audio":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Từ vựng cơ bản tiếng anh/Từ/friday.mp3","translate":"Thứ sáu","phonetic":"/ˈfraɪdeɪ/","enermyCheck":false,"checked":false},{"word":"Car","image":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Từ vựng cơ bản tiếng anh/Car.png","audio":"https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Từ vựng cơ bản tiếng anh/Từ/Car.mp3","translate":"Ô tô","phonetic":"/kɑːr/","enermyCheck":false,"checked":false}],
  toeicUnits = [
          {
              "id": 11,
              "title": "Distribution activities",
              "description": "Mục phân phối bao gồm các hoạt động đặt hàng, phân phối và giao nhận  ",
              "topics": [
                  {
                      "id": 1,
                      "title": "Bài 1: Hợp đồng (Contract)",
                      "words": [
                          {
                              "word": "abide by",
                              "translate": "tuân theo",
                              "phonetic": "/əˈbaɪd baɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/abide_by.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/abide_by.mp3"
                          },
                          {
                              "word": "agreement",
                              "translate": "hợp đồng, hiệp định",
                              "phonetic": "/əˈɡriːmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/agreement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/agreement.mp3"
                          },
                          {
                              "word": "assurance",
                              "translate": "sự cam đoan, đảm bảo",
                              "phonetic": "/əˈʃʊrəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/assurance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/assurance.mp3"
                          },
                          {
                              "word": "determine",
                              "translate": "xác định",
                              "phonetic": "/dɪˈtɜːrmɪn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/determine.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/determine.mp3"
                          },
                          {
                              "word": "engage",
                              "translate": "tham gia",
                              "phonetic": "/ɪnˈɡeɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/engage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/engage.mp3"
                          },
                          {
                              "word": "establish",
                              "translate": "thành lập",
                              "phonetic": "/ɪˈstæblɪʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/establish.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/establish.mp3"
                          },
                          {
                              "word": "obligate",
                              "translate": "bắt buộc",
                              "phonetic": " /ˈɑːblɪɡeɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/obligate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/obligate.mp3"
                          },
                          {
                              "word": "party",
                              "translate": "bên tham gia hợp đồng",
                              "phonetic": " /ˈpɑːrti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/party.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/party.mp3"
                          },
                          {
                              "word": "provision",
                              "translate": "điều khoản",
                              "phonetic": "/prəˈvɪʒn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/provision.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/provision.mp3"
                          },
                          {
                              "word": "specify",
                              "translate": "chỉ rõ, ghi rõ",
                              "phonetic": "/ˈspesɪfaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/specify.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/specify.mp3"
                          }
                      ]
                  },
                  {
                      "id": 5,
                      "title": "Bài 7: Ngành vận tải và giao nhận (Transportation and shipment)",
                      "words": [
                          {
                              "word": "bill of lading (B/L)",
                              "translate": "vận đơn đường biển",
                              "phonetic": "/ˌbɪl əv ˈleɪdɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/bill_of_lading.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Missing files/L).mp3"
                          },
                          {
                              "word": "cargo",
                              "translate": "hàng hóa (vận chuyển bằng tàu thủy hoặc máy bay)",
                              "phonetic": "/ˈkɑːrɡoʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/cargo.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/cargo.mp3"
                          },
                          {
                              "word": "container",
                              "translate": "thùng đựng hàng",
                              "phonetic": "/kənˈteɪnər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/container.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/container.mp3"
                          },
                          {
                              "word": "delivery",
                              "translate": "giao hàng",
                              "phonetic": "/dɪˈlɪvəri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/delivery.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/delivery.mp3"
                          },
                          {
                              "word": "freight forwarder",
                              "translate": "người giao nhận",
                              "phonetic": "/freɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/freight_forwarder.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/freight_forwarder.mp3"
                          },
                          {
                              "word": "packing list",
                              "translate": "phiếu đóng gói hàng",
                              "phonetic": "/ˈpækɪŋ lɪst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/packing_list.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/packing_list.mp3"
                          },
                          {
                              "word": "port",
                              "translate": "cảng",
                              "phonetic": "/pɔːrt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/port.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/port.mp3"
                          },
                          {
                              "word": "shipment",
                              "translate": "gửi hàng bằng đường biển",
                              "phonetic": "/ˈʃɪpmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/shipment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/shipment.mp3"
                          },
                          {
                              "word": "shipping agent",
                              "translate": "đại lí tàu biển",
                              "phonetic": "/ˈʃɪpɪŋ ˈeɪdʒənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Shipping_agent.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/shipping_agent.mp3"
                          },
                          {
                              "word": "transportation",
                              "translate": "ngành vận tải",
                              "phonetic": "/ˌtrænspɔːrˈteɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/transportation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/transportation.mp3"
                          }
                      ]
                  },
                  {
                      "id": 6,
                      "title": "Bài 8: Đặt hàng (Order)",
                      "words": [
                          {
                              "word": "accept the order",
                              "translate": "chấp nhận đơn đặt hàng",
                              "phonetic": "/əkˈsept ði ˈɔːrdər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/accept_the_order.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/accept_the_order.mp3"
                          },
                          {
                              "word": "complete the order",
                              "translate": "hoàn thành đơn đặt hàng",
                              "phonetic": "/kəmˈpliːt ði ˈɔːrdər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/complete_the_order.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/complete_the_order.mp3"
                          },
                          {
                              "word": "confirm",
                              "translate": "xác nhận",
                              "phonetic": "/kənˈfɜːrm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/confirm.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/confirm.mp3"
                          },
                          {
                              "word": "decline the order",
                              "translate": "từ chối đơn đặt hàng",
                              "phonetic": "/dɪˈklaɪn ði ˈɔːrdər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/decline_the_order.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/decline_the_order.mp3"
                          },
                          {
                              "word": "enclose",
                              "translate": "đính kèm",
                              "phonetic": "/ɪnˈkloʊz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/enclose.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/enclose.mp3"
                          },
                          {
                              "word": "handle",
                              "translate": "giải quyết",
                              "phonetic": "/ˈhændl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/handle.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/handle.mp3"
                          },
                          {
                              "word": "instruct",
                              "translate": "giới thiệu",
                              "phonetic": "/ɪnˈstrʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/instruct.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/instruct.mp3"
                          },
                          {
                              "word": "place an order",
                              "translate": "đặt hàng",
                              "phonetic": "/pleɪs ən ˈɔːrdər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/place_an_order.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/place_an_order.mp3"
                          },
                          {
                              "word": "process",
                              "translate": "xử lí",
                              "phonetic": "/ˈprɑːses/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/process.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/process.mp3"
                          },
                          {
                              "word": "reply",
                              "translate": "trả lời",
                              "phonetic": "/rɪˈplaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/reply.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/reply.mp3"
                          }
                      ]
                  },
                  {
                      "id": 8,
                      "title": "Chiết khấu",
                      "words": [
                          {
                              "word": "allow a discount",
                              "translate": "đồng ý chiết khấu",
                              "phonetic": "/əˈlaʊ ə ˈdɪskaʊnt / ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/allow_a_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/allow_a_discount.mp3"
                          },
                          {
                              "word": "allowance",
                              "translate": "tiền hoa hồng",
                              "phonetic": "/əˈlaʊəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/allowance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/allowance.mp3"
                          },
                          {
                              "word": "discount",
                              "translate": "chiết khấu",
                              "phonetic": "/ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/discount.mp3"
                          },
                          {
                              "word": "discount rate",
                              "translate": "tỉ lệ chiết khấu",
                              "phonetic": "/ˈdɪskaʊnt reɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/discount_rate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/discount_rate.mp3"
                          },
                          {
                              "word": "employee discount",
                              "translate": "chiết khấu cho nhân viên",
                              "phonetic": "/ɪmˈplɔɪiː ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/employee_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/employee_discount.mp3"
                          },
                          {
                              "word": "offer a discount",
                              "translate": "đề nghị chiết khấu",
                              "phonetic": "/ˈɑːfər ə ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/offer_a_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/offer_a_discount.mp3"
                          },
                          {
                              "word": "promotional discount",
                              "translate": "chiết khấu quảng cáo sản phẩm",
                              "phonetic": "/prəˈmoʊʃənl ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/promotional_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/promotional_discount.mp3"
                          },
                          {
                              "word": "quantity discount",
                              "translate": "chiết khấu theo số lượng",
                              "phonetic": "/ˈkwɑːntəti ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/quantity_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/quantity_discount.mp3"
                          },
                          {
                              "word": "seasonal discount",
                              "translate": "chiết khấu theo mùa",
                              "phonetic": "/ˈsiːzənl ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/seasonal_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/seasonal_discount.mp3"
                          },
                          {
                              "word": "trade discount",
                              "translate": "chiết khấu thương mại",
                              "phonetic": "/treɪd ˈdɪskaʊnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/trade_discount.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/trade_discount.mp3"
                          }
                      ]
                  },
                  {
                      "id": 10,
                      "title": "Hóa đơn",
                      "words": [
                          {
                              "word": "compile",
                              "translate": "tổng hợp",
                              "phonetic": "/kəmˈpaɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/compile.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/compile.mp3"
                          },
                          {
                              "word": "efficient",
                              "translate": "hiệu quả",
                              "phonetic": "/ɪˈfɪʃnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/efficient.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/efficient.mp3"
                          },
                          {
                              "word": "estimate",
                              "translate": "ước tính",
                              "phonetic": "/ˈestɪmət/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/estimate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/estimate.mp3"
                          },
                          {
                              "word": "impose",
                              "translate": "đánh thuế",
                              "phonetic": "/ɪmˈpoʊz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/impose.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/impose.mp3"
                          },
                          {
                              "word": "incur risk",
                              "translate": "chịu rủi ro",
                              "phonetic": "/ɪnˈkɜːr rɪsk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/incur_risk.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/incur_risk.mp3"
                          },
                          {
                              "word": "invoice",
                              "translate": "hóa đơn",
                              "phonetic": "/ˈɪnvɔɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/invoice.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/invoice.mp3"
                          },
                          {
                              "word": "promptly",
                              "translate": "đúng lúc",
                              "phonetic": "/ˈprɑːmptli/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/promptly.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/promptly.mp3"
                          },
                          {
                              "word": "receipt",
                              "translate": "biên lai",
                              "phonetic": "/rɪˈsiːt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/receipt_.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/receipt_.mp3"
                          },
                          {
                              "word": "rectify",
                              "translate": "sửa chữa",
                              "phonetic": "/ˈrektɪfaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/rectify.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/rectify.mp3"
                          },
                          {
                              "word": "term",
                              "translate": "điều khoản",
                              "phonetic": "/tɜːrm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/term.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/term.mp3"
                          }
                      ]
                  },
                  {
                      "id": 24,
                      "title": "Phân phối",
                      "words": [
                          {
                              "word": "commission",
                              "translate": "tiền hoa hồng",
                              "phonetic": "/kəˈmɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/commission.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/commission.mp3"
                          },
                          {
                              "word": "commodity",
                              "translate": "hàng tiêu dùng",
                              "phonetic": "/kəˈmɑːdəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/commodity.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/commodity.mp3"
                          },
                          {
                              "word": "confiscate",
                              "translate": "thu hồi",
                              "phonetic": "/ˈkɑːnfɪskeɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/confiscate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/confiscate.mp3"
                          },
                          {
                              "word": "deposit",
                              "translate": "tiền đặt cọc",
                              "phonetic": "/dɪˈpɑːzɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/deposit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/deposit.mp3"
                          },
                          {
                              "word": "depreciation",
                              "translate": "sự mất giá, khấu hao",
                              "phonetic": "/dɪpriːʃiˈeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/depreciation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/depreciation.mp3"
                          },
                          {
                              "word": "distribute",
                              "translate": "phân phối",
                              "phonetic": "/dɪˈstrɪbjuːt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/distribute.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/distribute.mp3"
                          },
                          {
                              "word": "dumping",
                              "translate": "bán phá giá",
                              "phonetic": "/ˈdʌmpɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/dumping.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/dumping.mp3"
                          },
                          {
                              "word": "retailer",
                              "translate": "nhà bán lẻ",
                              "phonetic": " /ˈriːteɪlər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/retailer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/retailer.mp3"
                          },
                          {
                              "word": "supplier",
                              "translate": "nhà cung cấp",
                              "phonetic": "/səˈplaɪər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/supplier.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/supplier.mp3"
                          },
                          {
                              "word": "warehouse",
                              "translate": "nhà kho",
                              "phonetic": "/ˈwerhaʊs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/warehouse.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/warehouse.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 12,
              "title": "Sales activities",
              "description": "Mục kinh doanh bao gồm các hoạt động bán hàng, tiếp thị và giao dịch",
              "topics": [
                  {
                      "id": 2,
                      "title": "Marketing",
                      "words": [
                          {
                              "word": "attract ",
                              "translate": "thu hút",
                              "phonetic": "/əˈtrækt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/attract.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/attract.mp3"
                          },
                          {
                              "word": "brand ",
                              "translate": "thương hiệu",
                              "phonetic": "/brænd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/brand.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/brand.mp3"
                          },
                          {
                              "word": "channel ",
                              "translate": "kênh",
                              "phonetic": "/ˈtʃænl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/channel.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/channel.mp3"
                          },
                          {
                              "word": "consume ",
                              "translate": "tiêu dùng",
                              "phonetic": "/kənˈsuːm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/consume.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/consume.mp3"
                          },
                          {
                              "word": "consumer ",
                              "translate": "người tiêu dùng, khách hàng",
                              "phonetic": "/kənˈsuːmər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/consumer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/consumer.mp3"
                          },
                          {
                              "word": "convince ",
                              "translate": "thuyết phục",
                              "phonetic": "/kənˈvɪns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/convince.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/convince.mp3"
                          },
                          {
                              "word": "coverage ",
                              "translate": "độ bao phủ",
                              "phonetic": "/ˈkʌvərɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/coverage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/coverage.mp3"
                          },
                          {
                              "word": "marketing ",
                              "translate": "tiếp thị",
                              "phonetic": "/ˈmɑːrkɪtɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/marketing.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/marketing.mp3"
                          },
                          {
                              "word": "preference ",
                              "translate": "ưu ái hơn",
                              "phonetic": "/ˈprefrəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/preference.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/preference.mp3"
                          },
                          {
                              "word": "satisfy ",
                              "translate": "làm thoả mãn",
                              "phonetic": "/ˈsætɪsfaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/satisfy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/satisfy.mp3"
                          },
                          {
                              "word": "cash rebate",
                              "translate": "giảm giá sau bán hàng",
                              "phonetic": "/kæʃ ˈriːbeɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/cash_rebate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/cash_rebate.mp3"
                          },
                          {
                              "word": "catalogue",
                              "translate": "danh mục sản phẩm",
                              "phonetic": "/ˈkætəlɔːɡ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/catalogue.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/catalogue.mp3"
                          },
                          {
                              "word": "end-user",
                              "translate": "người tiêu dùng cuối cùng",
                              "phonetic": "/end ˈjuːzər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/end-user.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/end-user.mp3"
                          },
                          {
                              "word": "label",
                              "translate": "nhãn",
                              "phonetic": "/ˈleɪbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/label.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/label.mp3"
                          },
                          {
                              "word": "price list",
                              "translate": "bảng giá",
                              "phonetic": "/praɪs lɪst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/price_list.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/price_list.mp3"
                          },
                          {
                              "word": "product launch",
                              "translate": "buổi ra mắt sản phẩm",
                              "phonetic": "/ˈprɑːdʌkt lɔːntʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/product_launch.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/product_launch.mp3"
                          },
                          {
                              "word": "public relations",
                              "translate": "quan hệ công chúng",
                              "phonetic": "/ˈpʌblɪk rɪˈleɪʃns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/public_relations.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/public_relations.mp3"
                          },
                          {
                              "word": "register",
                              "translate": "đăng kí",
                              "phonetic": "/ˈredʒɪstər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/register.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/register.mp3"
                          },
                          {
                              "word": "segment",
                              "translate": "phân khúc",
                              "phonetic": "/ˈseɡmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/segment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/segment.mp3"
                          },
                          {
                              "word": "sponsor",
                              "translate": "tài trợ",
                              "phonetic": "/ˈspɑːnsər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sponsor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sponsor.mp3"
                          },
                          {
                              "word": "auction-type pricing",
                              "translate": "định giá trên cơ sở đấu giá",
                              "phonetic": "/ˈɔːkʃn taɪp ˈpraɪsɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/2016080307461143039aution-type_pricing.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/auction-type_pricing.mp3"
                          },
                          {
                              "word": "brand loyalty",
                              "translate": "sự trung thành với thương hiệu",
                              "phonetic": "/brænd ˈlɔɪəlti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/brand_loyalty.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/brand_loyalty.mp3"
                          },
                          {
                              "word": "captive-product pricing",
                              "translate": "định giá sản phẩm bắt buộc",
                              "phonetic": "/ˈkæptɪv ˈprɑːdʌkt  ˈpraɪsɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/captive-product_pricing.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/captive-product_pricing.mp3"
                          },
                          {
                              "word": "channel management",
                              "translate": "quản trị kênh phân phối",
                              "phonetic": "/ˈtʃænl ˈmænɪdʒmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/channel_management.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/channel_management.mp3"
                          },
                          {
                              "word": "distribution channel",
                              "translate": "kênh phân phối",
                              "phonetic": "/ˌdɪstrɪˈbjuːʃn ˈtʃænl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/distribution_channel.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/distribution_channel.mp3"
                          },
                          {
                              "word": "early adopter",
                              "translate": "nhóm khách hàng thích nghi nhanh",
                              "phonetic": "/ˈɜːrli əˈdɑːptər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/early_adopter.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/early_adopter.mp3"
                          },
                          {
                              "word": "post-purchase behavior",
                              "translate": "hành vi sau mua",
                              "phonetic": "/poʊst ˈpɜːrtʃəs bɪˈheɪvjər/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/post-purchase_behavior.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/post-purchase_behavior.mp3"
                          },
                          {
                              "word": "retail",
                              "translate": "bán lẻ",
                              "phonetic": "/ˈriːteɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/retail.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/retail.mp3"
                          },
                          {
                              "word": "target marketing",
                              "translate": "mục tiêu tiếp thị",
                              "phonetic": "/ˈtɑːrɡɪt ˈmɑːrkɪtɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/target_marketing.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/target_marketing.mp3"
                          },
                          {
                              "word": "wholesaler",
                              "translate": "nhà bán buôn (bán sỉ)",
                              "phonetic": "/ˈhoʊlseɪlər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/wholesaler.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/wholesaler.mp3"
                          }
                      ]
                  },
                  {
                      "id": 7,
                      "title": "Chào hàng",
                      "words": [
                          {
                              "word": "a selection of new product",
                              "translate": "bộ sưu tập sản phẩm mới",
                              "phonetic": "/ə sɪˈlekʃn əv nuː ˈprɑːdʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/a_selection_of_new_product.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/a_selection_of_new_product.mp3"
                          },
                          {
                              "word": "deal on",
                              "translate": "giảm giá",
                              "phonetic": "/diːl ɑːn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/deal_on.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/deal_on.mp3"
                          },
                          {
                              "word": "favorable",
                              "translate": "hợp lí",
                              "phonetic": "/ˈfeɪvərəbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/favorable.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/favorable.mp3"
                          },
                          {
                              "word": "goods on approval basis",
                              "translate": "hàng dùng thử",
                              "phonetic": "/ɡʊdz ɔːn əˈpruːvl ˈbeɪsiːz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/goods_on_approval_basis.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/goods_on_approval_basis.mp3"
                          },
                          {
                              "word": "invite tender",
                              "translate": "mời thầu",
                              "phonetic": "/ɪnˈvaɪt ˈtendər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/invite_tender.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/invite_tender.mp3"
                          },
                          {
                              "word": "make enquiry",
                              "translate": "chào hàng",
                              "phonetic": "/meɪk ɪnˈkwaɪəri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/make_enquiry.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/make_enquiry.mp3"
                          },
                          {
                              "word": "pattern",
                              "translate": "mô hình, kiểu",
                              "phonetic": "/ˈpætərn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/pattern.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/pattern.mp3"
                          },
                          {
                              "word": "quotation",
                              "translate": "bảng dự kê giá",
                              "phonetic": "/kwoʊˈteɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/quotation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/quotation.mp3"
                          },
                          {
                              "word": "sample",
                              "translate": "hàng mẫu",
                              "phonetic": "/ˈsæmpl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sample.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sample.mp3"
                          },
                          {
                              "word": "supplier",
                              "translate": "nhà cung cấp",
                              "phonetic": "/səˈplaɪər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/supplier.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/supplier.mp3"
                          }
                      ]
                  },
                  {
                      "id": 9,
                      "title": "Giao dịch",
                      "words": [
                          {
                              "word": "business meeting",
                              "translate": "cuộc họp kinh doanh",
                              "phonetic": "/ˈbɪznəs ˈmiːtɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/business_meeting.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/business_meeting.mp3"
                          },
                          {
                              "word": "charge a fee",
                              "translate": "trả phí",
                              "phonetic": "/tʃɑːrdʒ ə fiː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/charge_a_fee.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/charge_a_fee.mp3"
                          },
                          {
                              "word": "cooperate",
                              "translate": "hợp tác",
                              "phonetic": "/koʊˈɑːpəreɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/cooperate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/cooperate.mp3"
                          },
                          {
                              "word": "implement",
                              "translate": "thi hành",
                              "phonetic": "/ˈɪmplɪment/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/implement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/implement.mp3"
                          },
                          {
                              "word": "negotiate",
                              "translate": "thương lượng",
                              "phonetic": "/nɪˈɡoʊʃieɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/negotiate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/negotiate.mp3"
                          },
                          {
                              "word": "partner",
                              "translate": "đối tác",
                              "phonetic": "/ˈpɑːrtnər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/partner.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/partner.mp3"
                          },
                          {
                              "word": "purchase",
                              "translate": "mua",
                              "phonetic": "/ˈpɜːrtʃəs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/purchase.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/purchase.mp3"
                          },
                          {
                              "word": "sign a contract",
                              "translate": "kí hợp đồng",
                              "phonetic": "/saɪn ə ˈkɑːntrækt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sign_a_contract.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sign_a_contract.mp3"
                          },
                          {
                              "word": "transaction",
                              "translate": "giao dịch",
                              "phonetic": "/trænˈzækʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/transaction.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/transaction.mp3"
                          },
                          {
                              "word": "transfer money",
                              "translate": "chuyển tiền",
                              "phonetic": "/trænsˈfɜːr ˈmʌni/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/transfer_money.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/transfer_money.mp3"
                          }
                      ]
                  },
                  {
                      "id": 25,
                      "title": "Bán hàng",
                      "words": [
                          {
                              "word": "amicable sale",
                              "translate": "thuận mua vừa bán",
                              "phonetic": "/ˈæmɪkəbl seɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/amicable_sale.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/amicable_sale.mp3"
                          },
                          {
                              "word": "auction",
                              "translate": "bán đấu giá",
                              "phonetic": " /ˈɔːkʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/auction.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/auction.mp3"
                          },
                          {
                              "word": "bargain",
                              "translate": "mặc cả",
                              "phonetic": "/ˈbɑːrɡən/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/bargain.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/bargain.mp3"
                          },
                          {
                              "word": "clearance sale",
                              "translate": "bán thanh lý",
                              "phonetic": "/ˈklɪrəns  seɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/clearance_sale.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/clearance_sale.mp3"
                          },
                          {
                              "word": "firm-sale",
                              "translate": "bán đứt",
                              "phonetic": "/fɜːrm seɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/firm-sale.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/firm-sale.mp3"
                          },
                          {
                              "word": "on sale",
                              "translate": "giảm giá",
                              "phonetic": "/ɔːn seɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/on_sale.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/on_sale.mp3"
                          },
                          {
                              "word": "put up for sale",
                              "translate": "đưa ra bán",
                              "phonetic": "/pʊt ʌp fər seɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/put_up_for_sale.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/put_up_for_sale.mp3"
                          },
                          {
                              "word": "sell in bulk",
                              "translate": "bán buôn",
                              "phonetic": "/seɪl ɪn bʌlk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sell_in_bulk.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sell_in_bulk.mp3"
                          },
                          {
                              "word": "sell like hot cakes",
                              "translate": "bán chạy như tôm tươi",
                              "phonetic": "/seɪl laɪk hɑːt keɪkz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sell_like_hot_cakes.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sell_like_hot_cakes.mp3"
                          },
                          {
                              "word": "sell on credit",
                              "translate": "bán chịu",
                              "phonetic": "/seɪl ɔːn ˈkredɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sell_on_credit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sell_on_credit.mp3"
                          },
                          {
                              "word": "cashier",
                              "translate": "nhân viên thu ngân",
                              "phonetic": " /kæˈʃɪr/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/cashier.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/cashier.mp3"
                          },
                          {
                              "word": "door-to-door salesman",
                              "translate": "người bán hàng tận nhà",
                              "phonetic": "/dɔːr tə dɔːr ˈseɪlzmən/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/door-to-door_salesman.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/door-to-door_salesman.mp3"
                          },
                          {
                              "word": "exchange",
                              "translate": "trao đổi",
                              "phonetic": "/ɪksˈtʃeɪndʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/exchange.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/exchange.mp3"
                          },
                          {
                              "word": "in stock",
                              "translate": "còn hàng",
                              "phonetic": "/ɪn stɑːk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/in_stock.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/in_stock.mp3"
                          },
                          {
                              "word": "out of stock",
                              "translate": "hết hàng",
                              "phonetic": "/aʊt ʌv stɑːk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/out_of_stock.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/out_of_stock.mp3"
                          },
                          {
                              "word": "sale information system",
                              "translate": "hệ thống thông tin bán hàng",
                              "phonetic": "/seɪl ˌɪnfərˈmeɪʃn ˈsɪstəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sale_information_system.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sale_information_system.mp3"
                          },
                          {
                              "word": "salesperson",
                              "translate": "nhân viên bán hàng",
                              "phonetic": "/ˈseɪlzpɜːrsn",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/salesperson.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/salesperson.mp3"
                          },
                          {
                              "word": "satisfaction",
                              "translate": "sự thỏa mãn",
                              "phonetic": "/ˌsætɪsˈfækʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/satisfaction.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/satisfaction.mp3"
                          },
                          {
                              "word": "segment",
                              "translate": "phân khúc",
                              "phonetic": "/ˈseɡmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/segment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/segment.mp3"
                          },
                          {
                              "word": "treasurer",
                              "translate": "thủ quỹ",
                              "phonetic": "/ˈtreʒərər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/treasurer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/treasurer.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 13,
              "title": "Personal Finance Economics",
              "description": "Kinh tế học tài chính cá nhân bao gồm các chủ đề như tín dụng, bảo hiểm và đầu tư",
              "topics": [
                  {
                      "id": 3,
                      "title": "Bảo hiểm",
                      "words": [
                          {
                              "word": "beneficiary",
                              "translate": "người thụ hưởng",
                              "phonetic": "/ˌbenɪˈfɪʃieri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/beneficiary.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/beneficiary.mp3"
                          },
                          {
                              "word": "claim specialist",
                              "translate": "người giải quyết quyền lợi bảo hiểm",
                              "phonetic": "/kleɪm ˈspeʃəlɪst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/claim_specialist.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/claim_specialist.mp3"
                          },
                          {
                              "word": "critical illness coverage",
                              "translate": "bảo hiểm bệnh hiểm nghèo",
                              "phonetic": "/ˈkrɪtɪkl ˈɪlnəs ˈkʌvərɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/critical_illness_coverage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/critical_illness_coverage.mp3"
                          },
                          {
                              "word": "health insurance",
                              "translate": "bảo hiểm sức khoẻ",
                              "phonetic": "/helθ ɪnˈʃʊrəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/health_insurance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/health_insurance.mp3"
                          },
                          {
                              "word": "life insurance",
                              "translate": "bảo hiểm nhân thọ",
                              "phonetic": "/laɪf ɪnˈʃʊrəns//",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/life_insurance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/life_insurance.mp3"
                          },
                          {
                              "word": "morbidity table",
                              "translate": "bảng tỷ lệ thương tật",
                              "phonetic": "/mɔːrˈbɪdəti ˈteɪbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/morbidity_table.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/morbidity_table.mp3"
                          },
                          {
                              "word": "pension plan",
                              "translate": "bảo hiểm hưu trí",
                              "phonetic": "/ˈpenʃn plæn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/pension_plan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/pension_plan.mp3"
                          },
                          {
                              "word": "premium",
                              "translate": "phí bảo hiểm",
                              "phonetic": "/ˈpriːmiəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/premium.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/premium.mp3"
                          },
                          {
                              "word": "social insurance",
                              "translate": "bảo hiểm xã hội",
                              "phonetic": "/ˈsoʊʃl ɪnˈʃʊrəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/social_insurance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/social_insurance.mp3"
                          },
                          {
                              "word": "unemployment insurance",
                              "translate": "bảo hiểm thất nghiệp",
                              "phonetic": "/ˌʌnɪmˈplɔɪmənt ɪnˈʃʊrəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/unemployment_insurance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/unemployment_insurance.mp3"
                          }
                      ]
                  },
                  {
                      "id": 11,
                      "title": "Thanh toán (Payment)",
                      "words": [
                          {
                              "word": "abolish",
                              "translate": "hủy bỏ",
                              "phonetic": "/əˈbɑːlɪʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/abolish.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/abolish.mp3"
                          },
                          {
                              "word": "accompany",
                              "translate": "đi kèm",
                              "phonetic": "/əˈkʌmpəni/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/accompany.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/accompany.mp3"
                          },
                          {
                              "word": "clearing system",
                              "translate": "hệ thống thanh toán bù trừ",
                              "phonetic": "/ˈklɪrɪŋ ˈsɪstəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/clearing_system.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/clearing_system.mp3"
                          },
                          {
                              "word": "debit",
                              "translate": "ghi nợ",
                              "phonetic": "/ˈdebɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/debit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/debit.mp3"
                          },
                          {
                              "word": "get deducted",
                              "translate": "được khấu trừ",
                              "phonetic": "/ɡet dɪˈdʌktid/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/get_deducted.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/get_deducted.mp3"
                          },
                          {
                              "word": "honour",
                              "translate": "chấp nhận thanh toán",
                              "phonetic": "/ˈɑːnər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/honour.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/honour.mp3"
                          },
                          {
                              "word": "loan",
                              "translate": "khoản tiền cho vay",
                              "phonetic": "/loʊn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/loan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/loan.mp3"
                          },
                          {
                              "word": "make out",
                              "translate": "kí phát (séc)",
                              "phonetic": "/meɪk aʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/make_out.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/make_out.mp3"
                          },
                          {
                              "word": "pay into",
                              "translate": "nộp vào",
                              "phonetic": "/peɪ ˈɪntu/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/pay_into.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/pay_into.mp3"
                          },
                          {
                              "word": "refund",
                              "translate": "trả lại",
                              "phonetic": "/ˈriːfʌnd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/refund.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/refund.mp3"
                          }
                      ]
                  },
                  {
                      "id": 12,
                      "title": "Tín dụng",
                      "words": [
                          {
                              "word": "bill of exchange",
                              "translate": "hối phiếu",
                              "phonetic": "/bɪl ɒv ɪksˈtʃeɪndʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/bill_of_exchange.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/bill_of_exchange.mp3"
                          },
                          {
                              "word": "credit",
                              "translate": "khoản vay tín dụng",
                              "phonetic": "/ˈkredɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/credit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/credit.mp3"
                          },
                          {
                              "word": "credit card",
                              "translate": "thẻ tín dụng",
                              "phonetic": "/ˈkredɪt kɑːrd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/credit_card.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/credit_card.mp3"
                          },
                          {
                              "word": "credit crunch",
                              "translate": "thắt chặt tín dụng",
                              "phonetic": "/ˈkredɪt krʌntʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/credit_crunch.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/credit_crunch.mp3"
                          },
                          {
                              "word": "credit limit",
                              "translate": "hạn mức tín dụng",
                              "phonetic": "/ˈkredɪt ˈlɪmɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/credit_limit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/credit_limit.mp3"
                          },
                          {
                              "word": "credit period",
                              "translate": "kì hạn tín dụng",
                              "phonetic": "/ˈkredɪt ˈpɪriəd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/credit_period.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/credit_period.mp3"
                          },
                          {
                              "word": "creditor",
                              "translate": "người cho vay",
                              "phonetic": "/ˈkredɪtər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/creditor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/creditor.mp3"
                          },
                          {
                              "word": "debit credit",
                              "translate": "thẻ ghi nợ",
                              "phonetic": "/ˈdebɪt ˈkredɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/debit_credit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/debit_credit.mp3"
                          },
                          {
                              "word": "irrevocable",
                              "translate": "không thể hủy ngang",
                              "phonetic": "/ɪˈrevəkəbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/irrevocable.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/irrevocable.mp3"
                          },
                          {
                              "word": "letter of credit (L/C)",
                              "translate": "thư tín dụng",
                              "phonetic": "/ˈletər ɒv ˈkredɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/letter_of_credit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Missing files/C).mp3"
                          }
                      ]
                  },
                  {
                      "id": 15,
                      "title": "Báo cáo tài chính",
                      "words": [
                          {
                              "word": "analyse",
                              "translate": "phân tích",
                              "phonetic": "/ˈænəlaɪz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/analyse.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/analyse.mp3"
                          },
                          {
                              "word": "bankrupt",
                              "translate": "vỡ nợ, phá sản",
                              "phonetic": "/ˈbæŋkrʌpt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/bankrupt.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/bankrupt.mp3"
                          },
                          {
                              "word": "financial leverage",
                              "translate": "đòn bẩy tài chính",
                              "phonetic": "/faɪˈnænʃl ˈlevərɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/financial_leverage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/financial_leverage.mp3"
                          },
                          {
                              "word": "financial statement",
                              "translate": "báo cáo tài chính",
                              "phonetic": "/fəˈnænʃl ˈsteɪtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/financial_statement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/financial_statement.mp3"
                          },
                          {
                              "word": "forecast",
                              "translate": "dự báo",
                              "phonetic": "/ˈfɔːrkæst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/forecast.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/forecast.mp3"
                          },
                          {
                              "word": "in debt",
                              "translate": "nợ nần",
                              "phonetic": "/ɪn det/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/in_debt.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/in_debt.mp3"
                          },
                          {
                              "word": "perspective",
                              "translate": "quan niệm",
                              "phonetic": "/pərˈspektɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/perspective.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/perspective.mp3"
                          },
                          {
                              "word": "projected",
                              "translate": "ước tính",
                              "phonetic": "/ˈprɑːdʒekt/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/projected.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/projected.mp3"
                          },
                          {
                              "word": "typical",
                              "translate": "tiêu biểu, điển hình",
                              "phonetic": "/ˈtɪpɪkl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/typical.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/typical.mp3"
                          },
                          {
                              "word": "yield",
                              "translate": "sản lượng, lợi tức",
                              "phonetic": "/jiːld/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/yield.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/yield.mp3"
                          }
                      ]
                  },
                  {
                      "id": 16,
                      "title": "Thuế",
                      "words": [
                          {
                              "word": "declare",
                              "translate": "khai báo thuế",
                              "phonetic": "/dɪˈkler/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/declare.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/declare.mp3"
                          },
                          {
                              "word": "environment tax",
                              "translate": "thuế bảo vệ môi trường",
                              "phonetic": "/ɪnˈvaɪrənmənt tæks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/environment_tax_.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/environment_tax_.mp3"
                          },
                          {
                              "word": "personal income tax",
                              "translate": "thuế thu nhập cá nhân",
                              "phonetic": "/ˈpɜːrsənl ˈɪnkʌm tæks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/personal_income_tax.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/personal_income_tax.mp3"
                          },
                          {
                              "word": "special consumption tax",
                              "translate": "thuế tiêu thụ đặc biệt",
                              "phonetic": "/ˈspeʃl kənˈsʌmpʃn tæks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/special_consumption_tax.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/special_consumption_tax.mp3"
                          },
                          {
                              "word": "tax abatement",
                              "translate": "sự khấu trừ thuế",
                              "phonetic": "/tæks əˈbeɪtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/tax_abatement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/tax_abatement.mp3"
                          },
                          {
                              "word": "tax directorate",
                              "translate": "tổng cục thuế",
                              "phonetic": "/tæks dəˈrektərət/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/tax_directorate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/tax_directorate.mp3"
                          },
                          {
                              "word": "tax policy",
                              "translate": "chính sách thuế",
                              "phonetic": "/tæks ˈpɑːləsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/tax_policy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/tax_policy.mp3"
                          },
                          {
                              "word": "tax rate",
                              "translate": "thuế suất",
                              "phonetic": "/tæks reɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/tax_rate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/tax_rate.mp3"
                          },
                          {
                              "word": "taxable",
                              "translate": "có thể chịu thuế",
                              "phonetic": "/ˈtæksəbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/taxable.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/taxable.mp3"
                          },
                          {
                              "word": "value added tax (VAT)",
                              "translate": "thuế giá trị gia tăng",
                              "phonetic": "/ˈvæljuː ædid tæks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/value_added_tax_(VAT).png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/value_added_tax_(VAT).mp3"
                          }
                      ]
                  },
                  {
                      "id": 17,
                      "title": "Đầu tư",
                      "words": [
                          {
                              "word": "capital",
                              "translate": "vốn",
                              "phonetic": "/ˈkæpɪtl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/capital.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/capital.mp3"
                          },
                          {
                              "word": "capital investment",
                              "translate": "vốn đầu tư",
                              "phonetic": "/ˈkæpɪtl ɪnˈvestmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/capital_investment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/capital_investment.mp3"
                          },
                          {
                              "word": "foreign direct investment (FDI)",
                              "translate": "vốn đầu tư trực tiếp nước ngoài",
                              "phonetic": "/ˈfɔːrən dəˈrekt ɪnˈvestmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/foreign_direct_investment_(FDI).png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/foreign_direct_investment_(FDI).mp3"
                          },
                          {
                              "word": "fund",
                              "translate": "quỹ",
                              "phonetic": "/fʌnd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/fund.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/fund.mp3"
                          },
                          {
                              "word": "invest",
                              "translate": "đầu tư",
                              "phonetic": "/ɪnˈvest/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/invest.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/invest.mp3"
                          },
                          {
                              "word": "investment license",
                              "translate": "giấy phép đầu tư",
                              "phonetic": "/ɪnˈvestmənt ˈlaɪsns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/investment_license.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/investment_license.mp3"
                          },
                          {
                              "word": "investment plan",
                              "translate": "kế hoạch đầu tư",
                              "phonetic": "/ɪnˈvestmənt plæn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/investment_plan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/investment_plan.mp3"
                          },
                          {
                              "word": "investor",
                              "translate": "nhà đầu tư",
                              "phonetic": "/ɪnˈvestər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/investor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/investor.mp3"
                          },
                          {
                              "word": "portfolio",
                              "translate": "danh mục vốn đầu tư",
                              "phonetic": "/pɔːrtˈfoʊlioʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/portfolio.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/portfolio.mp3"
                          },
                          {
                              "word": "pull out",
                              "translate": "rút khỏi, ngừng tham gia",
                              "phonetic": "/pʊl aʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/pull_out.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/pull_out.mp3"
                          }
                      ]
                  },
                  {
                      "id": 30,
                      "title": "Thăng tiến",
                      "words": [
                          {
                              "word": "achievement",
                              "translate": "thành tựu",
                              "phonetic": "/əˈtʃiːvmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/achievement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/achievement.mp3"
                          },
                          {
                              "word": "appoint",
                              "translate": "bổ nhiệm",
                              "phonetic": "/əˈpɔɪnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/appoint.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/appoint.mp3"
                          },
                          {
                              "word": "contribute to",
                              "translate": "đóng góp",
                              "phonetic": "/ˈkɒntrɪbjuːt tə/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/contribute_to.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/contribute_to.mp3"
                          },
                          {
                              "word": "dedication",
                              "translate": "sự cống hiến",
                              "phonetic": "/ˌdedɪˈkeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/dedication.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/dedication.mp3"
                          },
                          {
                              "word": "devoted",
                              "translate": "tận tâm, tận tụy",
                              "phonetic": "/dɪˈvoʊtɪd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/devoted.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/devoted.mp3"
                          },
                          {
                              "word": "evaluation",
                              "translate": "sự đánh giá",
                              "phonetic": "/ɪˌvæljuˈeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/evaluation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/evaluation.mp3"
                          },
                          {
                              "word": "incentive",
                              "translate": "phần thưởng",
                              "phonetic": "/ɪnˈsentɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/incentive.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/incentive.mp3"
                          },
                          {
                              "word": "prize",
                              "translate": "giải thưởng",
                              "phonetic": "/praɪz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/prize.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/prize.mp3"
                          },
                          {
                              "word": "promote",
                              "translate": "thăng chức",
                              "phonetic": "/prəˈmoʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/promote.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/promote.mp3"
                          },
                          {
                              "word": "reward",
                              "translate": "ghi nhận, thưởng",
                              "phonetic": "/rɪˈwɔːrd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/reward.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/reward.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 14,
              "title": "Production activities",
              "description": "Mục sản xuất bao gồm các hoạt động sản xuất, phát triển và kiểm soát chất lượng sản phẩm",
              "topics": [
                  {
                      "id": 4,
                      "title": "Bảo hành",
                      "words": [
                          {
                              "word": "assurance",
                              "translate": "sự cam đoan",
                              "phonetic": "/əˈʃʊrəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/assurance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/assurance.mp3"
                          },
                          {
                              "word": "complain",
                              "translate": "phàn nàn",
                              "phonetic": "/kəmˈpleɪn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/complain.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/complain.mp3"
                          },
                          {
                              "word": "cover",
                              "translate": "bao phủ, bao gồm",
                              "phonetic": "/ˈkʌvər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/cover.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/cover.mp3"
                          },
                          {
                              "word": "expire",
                              "translate": "hết hạn",
                              "phonetic": "/ɪkˈspaɪər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/expire.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/expire.mp3"
                          },
                          {
                              "word": "guarantee certificate",
                              "translate": "phiếu bảo hành",
                              "phonetic": "/ˌɡærənˈtiː sərˈtɪfɪkət/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/guarantee_certificate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/guarantee_certificate.mp3"
                          },
                          {
                              "word": "limitations",
                              "translate": "giới hạn bảo hành",
                              "phonetic": "/ˌlɪmɪˈteɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/limitations.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/limitations.mp3"
                          },
                          {
                              "word": "protect",
                              "translate": "bảo vệ",
                              "phonetic": "/prəˈtekt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/protect.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/protect.mp3"
                          },
                          {
                              "word": "refund",
                              "translate": "hoàn tiền",
                              "phonetic": "/ˈriːfʌnd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/refund.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/refund.mp3"
                          },
                          {
                              "word": "warranty period",
                              "translate": "thời hạn bảo hành",
                              "phonetic": "/ˈwɑːrənti ˈpɪriəd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/warranty_period.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/warranty_period.mp3"
                          },
                          {
                              "word": "warranty service",
                              "translate": "dịch vụ bảo hành",
                              "phonetic": "/ˈwɔːrənti ˈsɜːrvɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/warranty_service.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/warranty_service.mp3"
                          }
                      ]
                  },
                  {
                      "id": 21,
                      "title": "Sản xuất",
                      "words": [
                          {
                              "word": "assemble line",
                              "translate": "dây chuyền sản xuất",
                              "phonetic": "/əˈsembl laɪn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/assemble_line.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/assemble_line.mp3"
                          },
                          {
                              "word": "fossil fuel",
                              "translate": "nhiên liệu hóa thạch",
                              "phonetic": "/ˈfɑːsl ˈfjuːəl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/fossil_fuel.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/fossil_fuel.mp3"
                          },
                          {
                              "word": "material",
                              "translate": "nguyên liệu",
                              "phonetic": "/məˈtɪriəl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/material.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/material.mp3"
                          },
                          {
                              "word": "producer",
                              "translate": "nhà sản xuất",
                              "phonetic": "/prəˈduːsər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/producer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/producer.mp3"
                          },
                          {
                              "word": "product",
                              "translate": "sản xuất",
                              "phonetic": "/ˈprɑːdʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/product.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/product.mp3"
                          },
                          {
                              "word": "productive",
                              "translate": "có năng suất",
                              "phonetic": "/prəˈdʌktɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/productive.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/productive.mp3"
                          },
                          {
                              "word": "productivity",
                              "translate": "năng suất",
                              "phonetic": "/ˌprɑːdʌkˈtɪvəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/productivity.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/productivity.mp3"
                          },
                          {
                              "word": "semi-finished",
                              "translate": "bán thành phẩm",
                              "phonetic": "/ˈsemiˈfɪnɪʃd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/semi-finished.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/semi-finished.mp3"
                          },
                          {
                              "word": "stagnant ",
                              "translate": "đình trệ",
                              "phonetic": "/ˈstæɡnənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/stagnant_.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/stagnant_.mp3"
                          },
                          {
                              "word": "surplus",
                              "translate": "dư thừa",
                              "phonetic": "/ˈsɜːrpləs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/surplus.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/surplus.mp3"
                          }
                      ]
                  },
                  {
                      "id": 22,
                      "title": "Phát triển sản phẩm",
                      "words": [
                          {
                              "word": "ascertain",
                              "translate": "biết chắc",
                              "phonetic": "/ˌæsərˈteɪn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/ascertain.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/ascertain.mp3"
                          },
                          {
                              "word": "assume",
                              "translate": "đảm đương",
                              "phonetic": "/əˈsuːm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/assume.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/assume.mp3"
                          },
                          {
                              "word": "competitive",
                              "translate": "có tính cạnh tranh",
                              "phonetic": "/kəmˈpetətɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/competitive.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/competitive.mp3"
                          },
                          {
                              "word": "experiment",
                              "translate": "thử nghiệm",
                              "phonetic": "/ɪkˈsperɪmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/experiment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/experiment.mp3"
                          },
                          {
                              "word": "launch a product",
                              "translate": "ra mắt sản phẩm",
                              "phonetic": "/lɔːntʃ ə ˈprɑːdʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/launch_a_product.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/launch_a_product.mp3"
                          },
                          {
                              "word": "mass production",
                              "translate": "sản xuất đại trà",
                              "phonetic": "/mæs prəˈdʌkʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/mass_production.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/mass_production.mp3"
                          },
                          {
                              "word": "research",
                              "translate": "cuộc nghiên cứu",
                              "phonetic": "/rɪˈsɜːrtʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/research.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/research.mp3"
                          },
                          {
                              "word": "supervise",
                              "translate": "giám sát",
                              "phonetic": "/ˈsuːpərvaɪz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/supervise.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/supervise.mp3"
                          },
                          {
                              "word": "survey",
                              "translate": "cuộc khảo sát",
                              "phonetic": "/ˈsɜːrveɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/survey.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/survey.mp3"
                          },
                          {
                              "word": "systematically",
                              "translate": "một cách hệ thống",
                              "phonetic": "/ˌsɪstəˈmætɪkli/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/systematically.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/systematically.mp3"
                          }
                      ]
                  },
                  {
                      "id": 23,
                      "title": "Kiểm soát chất lượng",
                      "words": [
                          {
                              "word": "Bureau of food safety and hygiene",
                              "translate": "Chi cục vệ sinh an toàn thực phẩm",
                              "phonetic": "/ˈbjʊroʊ əv fuːd ˈseɪfti ænd ˈhaɪdʒiːn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Bureau_of_food_safety_and_hygiene.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Bureau_of_food_safety_and_hygiene.mp3"
                          },
                          {
                              "word": "conform",
                              "translate": "tuân theo",
                              "phonetic": "/kənˈfɔːrm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/conform.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/conform.mp3"
                          },
                          {
                              "word": "defect",
                              "translate": "thiếu sót, sai sót",
                              "phonetic": "/ˈdiːfekt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/defect.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/defect.mp3"
                          },
                          {
                              "word": "enhance",
                              "translate": "nâng cao",
                              "phonetic": "/ɪnˈhæns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/enhance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/enhance.mp3"
                          },
                          {
                              "word": "inspect",
                              "translate": "thanh tra",
                              "phonetic": "/ɪnˈspekt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/inspect.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/inspect.mp3"
                          },
                          {
                              "word": "quality control",
                              "translate": "kiểm soát chất lượng",
                              "phonetic": "/ˈkwɑːləti kənˈtroʊl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/quality_control.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/quality_control.mp3"
                          },
                          {
                              "word": "recall",
                              "translate": "thu hồi",
                              "phonetic": "/rɪˈkɔːl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/recall.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/recall.mp3"
                          },
                          {
                              "word": "reputation",
                              "translate": "danh tiếng",
                              "phonetic": "/ˌrepjuˈteɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/reputation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/reputation.mp3"
                          },
                          {
                              "word": "safety standard",
                              "translate": "tiêu chuẩn an toàn",
                              "phonetic": "/ˈseɪfti ˈstændərd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/safety_standard.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/safety_standard.mp3"
                          },
                          {
                              "word": "throw out",
                              "translate": "vứt bỏ",
                              "phonetic": "/θroʊ aʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/throw_out.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/throw_out.mp3"
                          }
                      ]
                  },
                  {
                      "id": 26,
                      "title": "Hàng tồn kho",
                      "words": [
                          {
                              "word": "adjustment",
                              "translate": "điều chỉnh",
                              "phonetic": "/əˈdʒʌstmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/adjustment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/adjustment.mp3"
                          },
                          {
                              "word": "automatically",
                              "translate": "tự động",
                              "phonetic": "/ˌɔːtəˈmætɪkli/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/automatically.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/automatically.mp3"
                          },
                          {
                              "word": "crucial",
                              "translate": "then chốt",
                              "phonetic": "/ˈkruːʃl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/crucial.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/crucial.mp3"
                          },
                          {
                              "word": "discrepancy",
                              "translate": "sự khác biêt",
                              "phonetic": " /dɪsˈkrepənsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/discrepancy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/discrepancy.mp3"
                          },
                          {
                              "word": "disturb",
                              "translate": "làm phiền",
                              "phonetic": "/dɪˈstɜːrb/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/disturb.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/disturb.mp3"
                          },
                          {
                              "word": "goods received note",
                              "translate": "phiếu nhập kho",
                              "phonetic": "/ɡʊd rɪˈsiːvd noʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/goods_received_note.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/goods_received_note.mp3"
                          },
                          {
                              "word": "liability",
                              "translate": "nghĩa vụ, trách nhiệm",
                              "phonetic": " /ˌlaɪəˈbɪləti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/liability.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/liability.mp3"
                          },
                          {
                              "word": "run",
                              "translate": "vận hành",
                              "phonetic": "/rʌn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/run.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/run.mp3"
                          },
                          {
                              "word": "scan",
                              "translate": "xem lướt qua",
                              "phonetic": "/skæn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/scan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/scan.mp3"
                          },
                          {
                              "word": "verify",
                              "translate": "xác thực",
                              "phonetic": "/ˈverɪfaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/verify.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/verify.mp3"
                          }
                      ]
                  },
                  {
                      "id": 33,
                      "title": "Các hoạt động nghiên cứu và phát triển",
                      "words": [
                          {
                              "word": "carry out",
                              "translate": "tiến hành",
                              "phonetic": "/ˈkæri aʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/carry_out.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/carry_out.mp3"
                          },
                          {
                              "word": "discover",
                              "translate": "khám phá, phát hiện",
                              "phonetic": "/dɪˈskʌvər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/discover.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/discover.mp3"
                          },
                          {
                              "word": "function",
                              "translate": "chức năng",
                              "phonetic": "/ˈfʌŋkʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/function.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/function.mp3"
                          },
                          {
                              "word": "improve",
                              "translate": "cải thiện",
                              "phonetic": "/ɪmˈpruːv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/improve.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/improve.mp3"
                          },
                          {
                              "word": "knowledge",
                              "translate": "kiến thức",
                              "phonetic": " /ˈnɑːlɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/knowledge.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/knowledge.mp3"
                          },
                          {
                              "word": "purpose",
                              "translate": "mục đích",
                              "phonetic": "/ˈpɜːrpəs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/purpose.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/purpose.mp3"
                          },
                          {
                              "word": "questionnaire",
                              "translate": "bảng câu hỏi điều tra",
                              "phonetic": "/ˌkwestʃəˈner/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/questionnaire.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/questionnaire.mp3"
                          },
                          {
                              "word": "research and development activity",
                              "translate": "hoạt động nghiên cứu và phát triển",
                              "phonetic": "/rɪˈsɜːrtʃ ənd dɪˈveləpmənt ækˈtɪvəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/research_and_development_activity.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/research_and_development_activity.mp3"
                          },
                          {
                              "word": "scientific",
                              "translate": "thuộc về khoa học",
                              "phonetic": "/ˌsaɪənˈtɪfɪk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/scientific.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Missing files/scientific_.mp3"
                          },
                          {
                              "word": "technological",
                              "translate": "thuộc về công nghệ",
                              "phonetic": "/ˌteknəˈlɑːdʒɪkl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/technological.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/technological.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 15,
              "title": "Economic organization",
              "description": "Tổ chức kinh tế bao gồm các tổ chức, cơ cấu tổ chức và các hoạt động liên quan",
              "topics": [
                  {
                      "id": 13,
                      "title": "Ngân hàng",
                      "words": [
                          {
                              "word": "a sight draft",
                              "translate": "hối phiếu trả ngay",
                              "phonetic": "/ə saɪt dræft/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/a_sight_draft.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/a_sight_draft.mp3"
                          },
                          {
                              "word": "accept the bill",
                              "translate": "chấp nhận hối phiếu",
                              "phonetic": "/əkˈsept ðə bɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/accept_the_bill.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/accept_the_bill.mp3"
                          },
                          {
                              "word": "assess",
                              "translate": "định giá",
                              "phonetic": "/əˈses/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/assess.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/assess.mp3"
                          },
                          {
                              "word": "asset",
                              "translate": "tài sản",
                              "phonetic": "/ˈæset/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/asset.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/asset.mp3"
                          },
                          {
                              "word": "cash flow",
                              "translate": "lưu lượng tiền mặt",
                              "phonetic": "/kæʃ floʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/cash_flow.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/cash_flow.mp3"
                          },
                          {
                              "word": "crossed cheque ",
                              "translate": "séc gạch chéo",
                              "phonetic": "/krɔːs tʃek/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/2016080309540142684crossed_cheque.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/crossed_cheque .mp3"
                          },
                          {
                              "word": "demand loan",
                              "translate": "khoản vay không kì hạn",
                              "phonetic": "/dɪˈmænd loʊn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/demand_loan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/demand_loan.mp3"
                          },
                          {
                              "word": "fiduciary loan",
                              "translate": "cho vay ủy thác",
                              "phonetic": "/fɪˈduːʃieri loʊn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/fiduciary_loan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/fiduciary_loan.mp3"
                          },
                          {
                              "word": "remote banking",
                              "translate": "dịch vụ ngân hàng từ xa",
                              "phonetic": "/rɪˈmoʊt /ˈbæŋkɪŋ//",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/remote_banking.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/remote_banking.mp3"
                          },
                          {
                              "word": "withdraw",
                              "translate": "rút tiền",
                              "phonetic": "/wɪθˈdrɔː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/withdraw.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/withdraw.mp3"
                          }
                      ]
                  },
                  {
                      "id": 14,
                      "title": "Kế toán",
                      "words": [
                          {
                              "word": "accumulate",
                              "translate": "cộng dồn",
                              "phonetic": "/əˈkjuːmjəleɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/accumulate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/accumulate.mp3"
                          },
                          {
                              "word": "audit",
                              "translate": "kiểm tra sổ sách",
                              "phonetic": "/ˈɔːdɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/audit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/audit.mp3"
                          },
                          {
                              "word": "balance sheet",
                              "translate": "bảng cân đối kế toán",
                              "phonetic": "/ˈbæləns ʃiːt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/balance_sheet.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/balance_sheet.mp3"
                          },
                          {
                              "word": "budget",
                              "translate": "ngân sách",
                              "phonetic": "/ˈbʌdʒɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/budget.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/budget.mp3"
                          },
                          {
                              "word": "check and take over",
                              "translate": "nghiệm thu",
                              "phonetic": "/tʃek ænd teɪk ˈoʊvər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/check_and_take_over.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/check_and_take_over.mp3"
                          },
                          {
                              "word": "client",
                              "translate": "khách hàng",
                              "phonetic": "/ˈklaɪənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/client.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/client.mp3"
                          },
                          {
                              "word": "inventory",
                              "translate": "hàng tồn kho",
                              "phonetic": "/ˈɪnvəntɔːri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/inventory.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/inventory.mp3"
                          },
                          {
                              "word": "liquidation",
                              "translate": "sự thanh lí (để trả nợ)",
                              "phonetic": "/ˌlɪkwɪˈdeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/liquidation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/liquidation.mp3"
                          },
                          {
                              "word": "profitable",
                              "translate": "có lợi nhuận",
                              "phonetic": "/ˈprɑːfɪtəbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/profitable.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/profitable.mp3"
                          },
                          {
                              "word": "revenue",
                              "translate": "doanh thu",
                              "phonetic": "/ˈrevənuː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/revenue.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/revenue.mp3"
                          }
                      ]
                  },
                  {
                      "id": 18,
                      "title": "Kế hoạch kinh doanh",
                      "words": [
                          {
                              "word": "address",
                              "translate": "quan tâm, chú tâm",
                              "phonetic": "/əˈdres/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/address.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/address.mp3"
                          },
                          {
                              "word": "alternative plan",
                              "translate": "kế hoạch thay thế",
                              "phonetic": "/ɔːlˈtɜːrnətɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/alternative_plan.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/alternative_plan.mp3"
                          },
                          {
                              "word": "avoid",
                              "translate": "tránh",
                              "phonetic": "/əˈvɔɪd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/avoid.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/avoid.mp3"
                          },
                          {
                              "word": "demonstrate",
                              "translate": "chứng minh",
                              "phonetic": "/ˈdemənstreɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/demonstrate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/demonstrate.mp3"
                          },
                          {
                              "word": "develop",
                              "translate": "phát triển",
                              "phonetic": "/dɪˈveləp/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/develop.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/develop.mp3"
                          },
                          {
                              "word": "evaluate",
                              "translate": "đánh giá",
                              "phonetic": "/ɪˈvæljueɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/evaluate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/evaluate.mp3"
                          },
                          {
                              "word": "gather information",
                              "translate": "thu thập thông tin",
                              "phonetic": "/ˈɡæðər ˌɪnfərˈmeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/gather_information.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/gather_information.mp3"
                          },
                          {
                              "word": "offer",
                              "translate": "đề nghị",
                              "phonetic": "/ˈɔːfər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/offer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/offer.mp3"
                          },
                          {
                              "word": "risk",
                              "translate": "rủi ro",
                              "phonetic": "/rɪsk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/risk.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/risk.mp3"
                          },
                          {
                              "word": "strategy",
                              "translate": "chiến lược",
                              "phonetic": "/ˈstrætədʒi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/strategy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/strategy.mp3"
                          }
                      ]
                  },
                  {
                      "id": 19,
                      "title": "Công ty",
                      "words": [
                          {
                              "word": "affiliate",
                              "translate": "công ty liên kết",
                              "phonetic": "/əˈfɪlieɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/affiliate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/affiliate.mp3"
                          },
                          {
                              "word": "branch office",
                              "translate": "văn phòng chi nhánh",
                              "phonetic": "/bræntʃ ˈɔːfɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/branch_office.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/branch_office.mp3"
                          },
                          {
                              "word": "company",
                              "translate": "công ty",
                              "phonetic": "/ˈkʌmpəni/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/company.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/company.mp3"
                          },
                          {
                              "word": "corporation",
                              "translate": "tập đoàn",
                              "phonetic": "/ˌkɔːrpəˈreɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/corporation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/corporation.mp3"
                          },
                          {
                              "word": "headquarter",
                              "translate": "trụ sở chính",
                              "phonetic": "/ˈhedkwɔːrtər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/headquarter.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/headquarter.mp3"
                          },
                          {
                              "word": "joint stock company",
                              "translate": "công ty cổ phần",
                              "phonetic": "/dʒɔɪnt stɑːk ˈkʌmpəni/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/joint_stock_company.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/joint_stock_company.mp3"
                          },
                          {
                              "word": "limited liability company",
                              "translate": "công ty trách nhiệm hữu hạn",
                              "phonetic": "/ˈlɪmɪtɪdˌlaɪəˈbɪləti ˈkʌmpəni/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/limited_liability_company.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/limited_liability_company.mp3"
                          },
                          {
                              "word": "private company",
                              "translate": "công ty tư nhân",
                              "phonetic": "/ˈpraɪvət ˈkʌmpəni/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/private_company.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/private_company.mp3"
                          },
                          {
                              "word": "representative office",
                              "translate": "văn phòng đại diện",
                              "phonetic": "/ˌreprɪˈzentətɪv ˈɔːfɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/representative_office.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/representative_office.mp3"
                          },
                          {
                              "word": "subsidiary",
                              "translate": "công ty con",
                              "phonetic": "/səbˈsɪdieri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/subsidiary.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/subsidiary.mp3"
                          },
                          {
                              "word": "Accounting department",
                              "translate": "phòng kế toán",
                              "phonetic": "/əˈkaʊntɪŋ dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Accounting_department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Accounting_department.mp3"
                          },
                          {
                              "word": "board of directors",
                              "translate": "hội đồng quản trị",
                              "phonetic": "/bɔːrd əv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/board_of_directors.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/board_of_directors.mp3"
                          },
                          {
                              "word": "department",
                              "translate": "phòng ban",
                              "phonetic": "/dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/department.mp3"
                          },
                          {
                              "word": "deputy of department",
                              "translate": "phó trưởng phòng",
                              "phonetic": "/ˈdepjuti əv dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/deputy_of_department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/deputy_of_department.mp3"
                          },
                          {
                              "word": "founder",
                              "translate": "người sáng lập",
                              "phonetic": "/ˈfaʊndər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/founder.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/founder.mp3"
                          },
                          {
                              "word": "head of department",
                              "translate": "trưởng phòng",
                              "phonetic": "/hed əv dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/head_of_department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/head_of_department.mp3"
                          },
                          {
                              "word": "Human resource department",
                              "translate": "phòng nhân sự",
                              "phonetic": "/ˈhjuːmən ˈriːsɔːrs dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Human_resource_department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Human_resource_department.mp3"
                          },
                          {
                              "word": "Marketing department",
                              "translate": "phòng tiếp thị",
                              "phonetic": "/ˈmɑːrkɪtɪŋ dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Marketing_department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Marketing_department.mp3"
                          },
                          {
                              "word": "organizational structure",
                              "translate": "cấu trúc tổ chức",
                              "phonetic": "/ˌɔːrɡənəˈzeɪʃənl ˈstrʌktʃər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/organizational_structure.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/organizational_structure.mp3"
                          },
                          {
                              "word": "Sales department",
                              "translate": "phòng kinh doanh",
                              "phonetic": "/seɪlz dɪˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Sales_department.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Sales_department.mp3"
                          }
                      ]
                  },
                  {
                      "id": 20,
                      "title": "Đại lý và cơ quan",
                      "words": [
                          {
                              "word": "agency",
                              "translate": "cơ quan, hãng",
                              "phonetic": "/ˈeɪdʒənsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/agency.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/agency.mp3"
                          },
                          {
                              "word": "agent",
                              "translate": "đại lí",
                              "phonetic": "/ˈeɪdʒənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/agent.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/agent.mp3"
                          },
                          {
                              "word": "downsize",
                              "translate": "cắt giảm nhân công",
                              "phonetic": "/ˈdaʊnsaɪz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/downsize.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/downsize.mp3"
                          },
                          {
                              "word": "franchise",
                              "translate": "nhượng quyền thương hiệu",
                              "phonetic": "/ˈfræntʃaɪz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/franchise.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/franchise.mp3"
                          },
                          {
                              "word": "merge",
                              "translate": "sáp nhập",
                              "phonetic": "/mɜːrdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/merge.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/merge.mp3"
                          },
                          {
                              "word": "outlet",
                              "translate": "cửa hàng bán lẻ",
                              "phonetic": "/ˈaʊtlet/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/outlet.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/outlet.mp3"
                          },
                          {
                              "word": "outsource",
                              "translate": "thuê ngoài",
                              "phonetic": "/ˈaʊtsɔːrs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/outsource.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/outsource.mp3"
                          },
                          {
                              "word": "representative",
                              "translate": "người đại diện",
                              "phonetic": "/ˌreprɪˈzentətɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/representative.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/representative.mp3"
                          },
                          {
                              "word": "wholesaler",
                              "translate": "cửa hàng bán sỉ",
                              "phonetic": "/ˈhoʊlseɪlər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/wholesaler.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/wholesaler.mp3"
                          }
                      ]
                  },
                  {
                      "id": 27,
                      "title": "Hội nghị",
                      "words": [
                          {
                              "word": "accommodation",
                              "translate": "chỗ ở",
                              "phonetic": "/əˌkɑːməˈdeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/accommodation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/accommodation.mp3"
                          },
                          {
                              "word": "agenda",
                              "translate": "chương trình nghị sự",
                              "phonetic": " /əˈdʒendə/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/agenda.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/agenda.mp3"
                          },
                          {
                              "word": "arrange",
                              "translate": "sắp xếp",
                              "phonetic": "/əˈreɪndʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/arrange.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/arrange.mp3"
                          },
                          {
                              "word": "association",
                              "translate": "hiệp hội",
                              "phonetic": "/əˌsoʊʃiˈeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/association.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/association.mp3"
                          },
                          {
                              "word": "attend",
                              "translate": "tham dự",
                              "phonetic": "/əˈtend/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/attend.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/attend.mp3"
                          },
                          {
                              "word": "get in touch",
                              "translate": "liên lạc",
                              "phonetic": "/ɡet ɪn tʌtʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/get_in_touch.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/get_in_touch.mp3"
                          },
                          {
                              "word": "hold",
                              "translate": "tổ chức",
                              "phonetic": "/hoʊld",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/hold.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/hold.mp3"
                          },
                          {
                              "word": "register",
                              "translate": "đăng kí",
                              "phonetic": "/ˈredʒɪstər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/register.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/register.mp3"
                          },
                          {
                              "word": "session",
                              "translate": "phiên họp, kì họp",
                              "phonetic": "/ˈseʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/session.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/session.mp3"
                          },
                          {
                              "word": "take part in",
                              "translate": "tham gia",
                              "phonetic": "/teɪk pɑːrt ɪn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/take_part_in.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/take_part_in.mp3"
                          }
                      ]
                  },
                  {
                      "id": 28,
                      "title": "Biên bản họp và báo cáo",
                      "words": [
                          {
                              "word": "announce",
                              "translate": "thông báo",
                              "phonetic": "/əˈnaʊns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/announce.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/announce.mp3"
                          },
                          {
                              "word": "conclusion",
                              "translate": "kết luận",
                              "phonetic": "/kənˈkluːʒn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/conclusion.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/conclusion.mp3"
                          },
                          {
                              "word": "memo",
                              "translate": "biên bản họp",
                              "phonetic": "/ˈmemoʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/memo.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/memo.mp3"
                          },
                          {
                              "word": "procedure",
                              "translate": "thủ tục",
                              "phonetic": "/prəˈsiːdʒər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/procedure.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/procedure.mp3"
                          },
                          {
                              "word": "recommendation",
                              "translate": "lời khuyên, giải pháp",
                              "phonetic": "/ˌrekəmenˈdeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/recommendation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/recommendation.mp3"
                          },
                          {
                              "word": "report",
                              "translate": "bản báo cáo",
                              "phonetic": "/rɪˈpɔːrt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/report.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/report.mp3"
                          },
                          {
                              "word": "section",
                              "translate": "phần",
                              "phonetic": "/ˈsekʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/section.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/section.mp3"
                          },
                          {
                              "word": "solution",
                              "translate": "sự giải quyết",
                              "phonetic": "/səˈluːʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/solution.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/solution.mp3"
                          },
                          {
                              "word": "submit",
                              "translate": "nộp",
                              "phonetic": "/səbˈmɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/submit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/submit.mp3"
                          },
                          {
                              "word": "title",
                              "translate": "tiêu đề",
                              "phonetic": "/ˈtaɪtl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/title.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/title.mp3"
                          }
                      ]
                  },
                  {
                      "id": 29,
                      "title": "Thuê nhà, thuê mặt bằng",
                      "words": [
                          {
                              "word": "circumstance",
                              "translate": "trường hợp, hoàn cảnh",
                              "phonetic": "/ˈsɜːrkəmstæns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/circumstance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/circumstance.mp3"
                          },
                          {
                              "word": "condition",
                              "translate": "điều kiện",
                              "phonetic": "/kənˈdɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/condition.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/condition.mp3"
                          },
                          {
                              "word": "lease",
                              "translate": "cho thuê mặt bằng",
                              "phonetic": "/liːs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/lease.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/lease.mp3"
                          },
                          {
                              "word": "leave",
                              "translate": "rời khỏi",
                              "phonetic": "/liːv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/leave.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/leave.mp3"
                          },
                          {
                              "word": "lock into",
                              "translate": "cam kết",
                              "phonetic": "/lɑːk ˈɪntə/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/lock_into.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/lock_into.mp3"
                          },
                          {
                              "word": "move",
                              "translate": "dọn đi",
                              "phonetic": "/muːv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/move.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/move.mp3"
                          },
                          {
                              "word": "occupany",
                              "translate": "thời gian sống",
                              "phonetic": "",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/occupany.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/occupany.mp3"
                          },
                          {
                              "word": "option",
                              "translate": "lựa chọn",
                              "phonetic": "/ˈɑːpʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/option.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/option.mp3"
                          },
                          {
                              "word": "rent",
                              "translate": "cho thuê nhà",
                              "phonetic": " /rent/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/rent.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/rent.mp3"
                          },
                          {
                              "word": "subject to",
                              "translate": "phụ thuộc vào",
                              "phonetic": "/ˈsʌbdʒɪkt tə/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/subject_to.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/subject_to.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 16,
              "title": "International Economics",
              "description": "Kinh tế học quốc tế bao gồm các hoạt động xuất nhập khẩu và hợp tác kinh tế quốc tế",
              "topics": [
                  {
                      "id": 32,
                      "title": "Xuất nhập khẩu",
                      "words": [
                          {
                              "word": "carrier",
                              "translate": "người chuyên chở",
                              "phonetic": "/ˈkæriər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/carrier.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/carrier.mp3"
                          },
                          {
                              "word": "combined transport",
                              "translate": "vận tải đa phương thức",
                              "phonetic": "",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/combined_transport.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/combined_transport.mp3"
                          },
                          {
                              "word": "consignee",
                              "translate": "người nhận hàng",
                              "phonetic": "",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/consignee.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/consignee.mp3"
                          },
                          {
                              "word": "consignor",
                              "translate": "người gửi hàng",
                              "phonetic": "",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/consignor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/consignor.mp3"
                          },
                          {
                              "word": "container",
                              "translate": "thùng hàng",
                              "phonetic": "/kənˈteɪnər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/container.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/container.mp3"
                          },
                          {
                              "word": "customs declaration form",
                              "translate": "tờ khai hải quan",
                              "phonetic": "/ˈkʌstəmz ˌdekləˈreɪʃn ɔːrm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/customs_declaration_form.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/customs_declaration_form.mp3"
                          },
                          {
                              "word": "customs gate",
                              "translate": "cửa khẩu hải quan",
                              "phonetic": "/ˈkʌstəmz ɡeɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/customs_gate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/customs_gate.mp3"
                          },
                          {
                              "word": "export",
                              "translate": "xuất khẩu",
                              "phonetic": "/ɪkˈspɔːrt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/export.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/export.mp3"
                          },
                          {
                              "word": "import",
                              "translate": "nhập khẩu",
                              "phonetic": "/ˈɪmpɔːrt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/import.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/import.mp3"
                          },
                          {
                              "word": "packing note",
                              "translate": "phiếu đóng gói",
                              "phonetic": "/ˈpækɪŋ noʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/packing_note.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/packing_note.mp3"
                          }
                      ]
                  },
                  {
                      "id": 41,
                      "title": "Môi trường kinh doanh",
                      "words": [
                          {
                              "word": "business environment",
                              "translate": "môi trường kinh doanh",
                              "phonetic": "/ˈbɪznəs ɪnˈvaɪrənmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/business_environment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/business_environment.mp3"
                          },
                          {
                              "word": "constraint",
                              "translate": "khó khăn",
                              "phonetic": "/kənˈstreɪnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/constraint.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/constraint.mp3"
                          },
                          {
                              "word": "external factor",
                              "translate": "nhân tố bên ngoài",
                              "phonetic": "/ɪkˈstɜːrnl ˈfæktər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/external_factor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/external_factor.mp3"
                          },
                          {
                              "word": "flexible",
                              "translate": "linh hoạt",
                              "phonetic": "/ˈfleksəbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/flexible.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/flexible.mp3"
                          },
                          {
                              "word": "influence",
                              "translate": "sự ảnh hưởng",
                              "phonetic": "/ˈɪnfluəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/influence.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/influence.mp3"
                          },
                          {
                              "word": "internal factor",
                              "translate": "nhân tố bên trong",
                              "phonetic": " /ɪnˈtɜːrnl ˈfæktər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/internal_factor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/internal_factor.mp3"
                          },
                          {
                              "word": "motivation",
                              "translate": "động lực",
                              "phonetic": "/ˌmoʊtɪˈveɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/motivation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/motivation.mp3"
                          },
                          {
                              "word": "regulation",
                              "translate": "qui định",
                              "phonetic": "/ˌreɡjuˈleɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/regulation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/regulation.mp3"
                          },
                          {
                              "word": "related to",
                              "translate": "liên quan tới",
                              "phonetic": " /rɪˈleɪtɪd tə/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/related_to.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/related_to.mp3"
                          },
                          {
                              "word": "transition",
                              "translate": "sự chuyển đổi",
                              "phonetic": "/trænˈzɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/transition.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/transition.mp3"
                          }
                      ]
                  },
                  {
                      "id": 55,
                      "title": "Kinh doanh quốc tế",
                      "words": [
                          {
                              "word": "adapt",
                              "translate": "thích nghi",
                              "phonetic": "/əˈdæpt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/adapt.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/adapt.mp3"
                          },
                          {
                              "word": "focus on",
                              "translate": "tập trung vào",
                              "phonetic": "/ˈfoʊkəs ɔːn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/focus_on.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/focus_on.mp3"
                          },
                          {
                              "word": "framework",
                              "translate": "khung, sườn",
                              "phonetic": "/ˈfreɪmwɜːrk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/framework.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/framework.mp3"
                          },
                          {
                              "word": "interdependent",
                              "translate": "phụ thuộc lẫn nhau",
                              "phonetic": "/ˌɪntərdɪˈpendənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/interdependent.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/interdependent.mp3"
                          },
                          {
                              "word": "international business",
                              "translate": "kinh doanh quốc tế",
                              "phonetic": "/ˌɪntərˈnæʃnəl ˈbɪznəs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/international_business.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/international_business.mp3"
                          },
                          {
                              "word": "modify",
                              "translate": "điều chỉnh (cho phù hợp với môi trường)",
                              "phonetic": "/ˈmɑːdɪfaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/modify.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/modify.mp3"
                          },
                          {
                              "word": "orient",
                              "translate": "định hướng",
                              "phonetic": "/ˈɔːrient/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/orient.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/orient.mp3"
                          },
                          {
                              "word": "strategic management",
                              "translate": "quản lí chiến lược",
                              "phonetic": "/strəˈtiːdʒɪk ˈmænɪdʒmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/strategic_management.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/strategic_management.mp3"
                          },
                          {
                              "word": "threat",
                              "translate": "mối đe dọa",
                              "phonetic": "/θret/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/threat.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/threat.mp3"
                          }
                      ]
                  },
                  {
                      "id": 53,
                      "title": "Tổ chức thương mại TG",
                      "words": [
                          {
                              "word": "ASEAN Economic Community",
                              "translate": "cộng đồng kinh tế ASEAN",
                              "phonetic": "/ˈæsiæn iːkəˈnɑːmɪk kəˈmjuːnəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/ASEAN_Economic_Community.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/ASEAN_Economic_Community.mp3"
                          },
                          {
                              "word": "Asia-Pacific Economic Cooperation",
                              "translate": "diễn đàn hợp tác kinh tế Châu Á Thái Bình Dương",
                              "phonetic": "/ˈeɪʒə pəˈsɪfɪk iːkəˈnɑːmɪk koʊˌɑːpəˈreɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Asia-Pacific_Economic_Cooperation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Asia-Pacific_Economic_Cooperation.mp3"
                          },
                          {
                              "word": "Association of Southeast Asian Nations",
                              "translate": "hiệp hội các quốc gia Đông Nam Á",
                              "phonetic": "/əˌsoʊʃiˈeɪʃn əv saʊθiːst ˈæsiæn ˈneɪʃnz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Association_of_Southeast_Asian_Nations.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Association_of_Southeast_Asian_Nations.mp3"
                          },
                          {
                              "word": "Free trade agreement",
                              "translate": "hiệp định thương mại tự do",
                              "phonetic": "/friː treɪd əˈɡriːmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Free_trade_agreements.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Free_trade_agreements.mp3"
                          },
                          {
                              "word": "International Monetary Fund",
                              "translate": "quỹ tiền tệ thế giới",
                              "phonetic": "/ˌɪntərˈnæʃnəl ˈmʌnɪteri fʌnd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/International_Monetary_Fund.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/International_Monetary_Fund.mp3"
                          },
                          {
                              "word": "Organisation of Petroleum Exporting Countries",
                              "translate": "tổ chức các nước xuất khẩu dầu mỏ",
                              "phonetic": "/ˌɔːrɡənəˈzeɪʃn əv pəˈtroʊliəm ɪkˈspɔːrtɪŋ ˈkʌntriz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Organisation_of_Petroleum_Exporting_Countries.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Organisation_of_Petroleum_Exporting_Countries.mp3"
                          },
                          {
                              "word": "Regional Comprehensive Economic Partnership",
                              "translate": "hiệp định đối tác toàn diện khu vực",
                              "phonetic": "/ˈriːdʒənl ˌkɑːmprɪˈhensɪv ˌiːkəˈnɑːmɪk ˈpɑːrtnərʃɪp/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Regional_Comprehensive_Economic_Partnership.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Regional_Comprehensive_Economic_Partnership.mp3"
                          },
                          {
                              "word": "Trans-Pacific Partnership Agreement",
                              "translate": "hiệp định đối tác xuyên Thái Bình Dương",
                              "phonetic": "/trænz pəˈsɪfɪk ˈpɑːrtnərʃɪp əˈɡriːmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Trans-Pacific_Partnership_Agreement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Trans-Pacific_Partnership_Agreement.mp3"
                          },
                          {
                              "word": "World Bank",
                              "translate": "ngân hàng thế giới",
                              "phonetic": "/wɜːrld bæŋk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/World_Bank.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/World_Bank.mp3"
                          },
                          {
                              "word": "World Trade Organization",
                              "translate": "tổ chức thương mại thế giới",
                              "phonetic": "/wɜːrld treɪd  ˌɔːrɡənəˈzeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/World_Trade_Organization.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/World_Trade_Organization.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 17,
              "title": "Market",
              "description": "Mục thị trường bao gồm các hoạt động như nghiên cứu và tìm hiểu những thị trường kinh doanh khác nhau",
              "topics": [
                  {
                      "id": 36,
                      "title": "Thị trường",
                      "words": [
                          {
                              "word": "balance",
                              "translate": "cân bằng",
                              "phonetic": "/ˈbæləns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/balance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/balance.mp3"
                          },
                          {
                              "word": "crisis",
                              "translate": "khủng hoảng",
                              "phonetic": "/ˈkraɪsɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/crisis.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/crisis.mp3"
                          },
                          {
                              "word": "demand",
                              "translate": "nhu cầu",
                              "phonetic": "/dɪˈmænd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/demand.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/demand.mp3"
                          },
                          {
                              "word": "domestic market",
                              "translate": "thị trường nội địa",
                              "phonetic": "/dəˈmestɪk ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/domestic_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/domestic_market.mp3"
                          },
                          {
                              "word": "financial market",
                              "translate": "thị trường tài chính",
                              "phonetic": " /faɪˈnænʃl ˈmɑːrkɪt/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/financial_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/financial_market.mp3"
                          },
                          {
                              "word": "foreign market",
                              "translate": "thị trường nước ngoài",
                              "phonetic": " /ˈfɑːrən ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/foreign_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/foreign_market.mp3"
                          },
                          {
                              "word": "market",
                              "translate": "thị trường",
                              "phonetic": "/ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/market.mp3"
                          },
                          {
                              "word": "market economy",
                              "translate": "nền kinh tế thị trường",
                              "phonetic": "/ˈmɑːrkɪt  ɪˈkɑːnəmi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/market_economy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/market_economy.mp3"
                          },
                          {
                              "word": "perfectly competitive market",
                              "translate": "thị trường cạnh tranh hoàn hảo",
                              "phonetic": "/ˈpɜːrfɪktli  kəmˈpetətɪv ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/perfectly_competitive_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/perfectly_competitive_market.mp3"
                          },
                          {
                              "word": "supply",
                              "translate": "nguồn cung",
                              "phonetic": "/səˈplaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/supply.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/supply.mp3"
                          }
                      ]
                  },
                  {
                      "id": 37,
                      "title": "Nghiên cứu thị trường",
                      "words": [
                          {
                              "word": "anticipate",
                              "translate": "dự đoán",
                              "phonetic": "/ænˈtɪsɪpeɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/anticipate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/anticipate.mp3"
                          },
                          {
                              "word": "attract",
                              "translate": "thu hút",
                              "phonetic": "/əˈtrækt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/attract.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/attract.mp3"
                          },
                          {
                              "word": "business partner",
                              "translate": "đối tác kinh doanh",
                              "phonetic": "/ˈbɪznəs  partner/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/business_partner.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/business_partner.mp3"
                          },
                          {
                              "word": "compare",
                              "translate": "so sánh",
                              "phonetic": "/kəmˈper/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/compare.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/compare.mp3"
                          },
                          {
                              "word": "conduct",
                              "translate": "tiến hành",
                              "phonetic": "/kənˈdʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/conduct.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/conduct.mp3"
                          },
                          {
                              "word": "market research",
                              "translate": "nghiên cứu thị trường",
                              "phonetic": "/ˈmɑːrkɪt rɪˈsɜːrtʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/market_research.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/market_research.mp3"
                          },
                          {
                              "word": "potential market",
                              "translate": "thị trường tiềm năng",
                              "phonetic": " /pəˈtenʃl ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/potential_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/potential_market.mp3"
                          },
                          {
                              "word": "project",
                              "translate": "dự án",
                              "phonetic": "/ˈprɑːdʒekt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/project.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/project.mp3"
                          },
                          {
                              "word": "reaction",
                              "translate": "sự phản ứng",
                              "phonetic": "/riˈækʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/reaction.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/reaction.mp3"
                          },
                          {
                              "word": "target",
                              "translate": "mục tiêu",
                              "phonetic": "/ˈtɑːrɡɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/target.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/target.mp3"
                          }
                      ]
                  },
                  {
                      "id": 38,
                      "title": "Thị trường chứng khoán",
                      "words": [
                          {
                              "word": "bond",
                              "translate": "trái phiếu",
                              "phonetic": "/bɑːnd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/bond.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/bond.mp3"
                          },
                          {
                              "word": "financial statement",
                              "translate": "báo cáo tài chính",
                              "phonetic": "/faɪˈnænʃl ˈsteɪtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/financial_statement.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/financial_statement.mp3"
                          },
                          {
                              "word": "market capitalization",
                              "translate": "giá trị vốn hóa thị trường",
                              "phonetic": "/ˈmɑːrkɪt ˌkæpɪtələˈzeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/market_capitalization.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/market_capitalization.mp3"
                          },
                          {
                              "word": "mortage",
                              "translate": "tài sản thế chấp",
                              "phonetic": "",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/mortgage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/mortage.mp3"
                          },
                          {
                              "word": "securities",
                              "translate": "chứng khoán",
                              "phonetic": "/səˈkjʊrəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/securities.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/securities.mp3"
                          },
                          {
                              "word": "share",
                              "translate": "cổ phần",
                              "phonetic": " /ʃer/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/share.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/share.mp3"
                          },
                          {
                              "word": "stock",
                              "translate": "cổ phiếu",
                              "phonetic": "/stɑːk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/stock.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/stock.mp3"
                          },
                          {
                              "word": "stock market",
                              "translate": "thị trường chứng khoán",
                              "phonetic": "/stɑːk ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/stock_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/stock_market.mp3"
                          },
                          {
                              "word": "underwrite",
                              "translate": "bảo lãnh",
                              "phonetic": "/ˌʌndərˈraɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/underwrite.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/underwrite.mp3"
                          }
                      ]
                  },
                  {
                      "id": 39,
                      "title": "Thị trường bất động sản",
                      "words": [
                          {
                              "word": "apartment",
                              "translate": "căn hộ chung cư",
                              "phonetic": "/əˈpɑːrtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/apartment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/apartment.mp3"
                          },
                          {
                              "word": "appraisal",
                              "translate": "văn bản định giá",
                              "phonetic": "/əˈpreɪzl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/appraisal.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/appraisal.mp3"
                          },
                          {
                              "word": "architect",
                              "translate": "kiến trúc sư",
                              "phonetic": "/ˈɑːrkɪtekt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/architect.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/architect.mp3"
                          },
                          {
                              "word": "broker",
                              "translate": "nhà môi giới",
                              "phonetic": "/ˈbroʊkər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/broker.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/broker.mp3"
                          },
                          {
                              "word": "constructor",
                              "translate": "nhà thầu thi công",
                              "phonetic": "/kənˈstrʌktər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/constructor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/constructor.mp3"
                          },
                          {
                              "word": "flat",
                              "translate": "căn hộ chung cư",
                              "phonetic": "/flæt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/flat.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/flat.mp3"
                          },
                          {
                              "word": "landscape",
                              "translate": "quang cảnh",
                              "phonetic": "/ˈlændskeɪp/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/landscape.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/landscape.mp3"
                          },
                          {
                              "word": "real estate",
                              "translate": "bất động sản",
                              "phonetic": "/ˈriːəl ɪˈsteɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/real_estate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/real_estate.mp3"
                          },
                          {
                              "word": "residence",
                              "translate": "khu dân cư",
                              "phonetic": "/ˈrezɪdəns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/residence.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/residence.mp3"
                          },
                          {
                              "word": "supervisory staff",
                              "translate": "nhân viên giám sát",
                              "phonetic": "/ˌsjuːpəˈvaɪzəri stæf/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/supervisory_staff.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/supervisory_staff.mp3"
                          }
                      ]
                  },
                  {
                      "id": 40,
                      "title": "Thị trường lao động",
                      "words": [
                          {
                              "word": "ambitious",
                              "translate": "tham vọng",
                              "phonetic": "/æmˈbɪʃəs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/ambitious.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/ambitious.mp3"
                          },
                          {
                              "word": "apply for",
                              "translate": "ứng tuyển",
                              "phonetic": "/əˈplaɪ fər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/apply_for.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/apply_for.mp3"
                          },
                          {
                              "word": "candidate",
                              "translate": "ứng viên",
                              "phonetic": "/ˈkændɪdət/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/candidate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/candidate.mp3"
                          },
                          {
                              "word": "enthusiastic",
                              "translate": "nhiệt tình",
                              "phonetic": "/ɪnˌθuːziˈæstɪk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/enthusiastic.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/enthusiastic.mp3"
                          },
                          {
                              "word": "fire",
                              "translate": "sa thải",
                              "phonetic": "/ˈfaɪər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/fire.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/fire.mp3"
                          },
                          {
                              "word": "hire",
                              "translate": "thuê",
                              "phonetic": "/ˈhaɪər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/hire.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/hire.mp3"
                          },
                          {
                              "word": "labour market",
                              "translate": "thị trường lao động",
                              "phonetic": "/ˈleɪbər ˈmɑːrkɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/labour_market.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/labour_market.mp3"
                          },
                          {
                              "word": "qualification",
                              "translate": "trình độ chuyên môn",
                              "phonetic": "/ˌkwɑːlɪfɪˈkeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/qualification.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/qualification.mp3"
                          },
                          {
                              "word": "recruitment",
                              "translate": "tuyển dụng",
                              "phonetic": "/rɪˈkruːtmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/recruitment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/recruitment.mp3"
                          },
                          {
                              "word": "vacancy",
                              "translate": "vị trí trống",
                              "phonetic": "/ˈveɪkənsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/vacancy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/vacancy.mp3"
                          }
                      ]
                  },
                  {
                      "id": 31,
                      "title": "Cạnh tranh",
                      "words": [
                          {
                              "word": "active",
                              "translate": "chủ động",
                              "phonetic": "/ˈæktɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/active.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/active.mp3"
                          },
                          {
                              "word": "capability",
                              "translate": "năng lực",
                              "phonetic": " /ˌkeɪpəˈbɪləti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/capability.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/capability.mp3"
                          },
                          {
                              "word": "compete",
                              "translate": "cạnh tranh",
                              "phonetic": "/kəmˈpiːt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/compete.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/compete.mp3"
                          },
                          {
                              "word": "competition",
                              "translate": "sự cạnh tranh",
                              "phonetic": " /ˌkɑːmpəˈtɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/competition.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/competition.mp3"
                          },
                          {
                              "word": "competitive",
                              "translate": "tính cạnh tranh",
                              "phonetic": "/kəmˈpetətɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/competitive.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/competitive.mp3"
                          },
                          {
                              "word": "competitor",
                              "translate": "đối thủ cạnh tranh",
                              "phonetic": " /kəmˈpetɪtər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/competitor.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/competitor.mp3"
                          },
                          {
                              "word": "endure",
                              "translate": "chịu đựng",
                              "phonetic": "/ɪnˈdʊr/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/endure.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/endure.mp3"
                          },
                          {
                              "word": "make progress",
                              "translate": "cố gắng",
                              "phonetic": " /meɪk ˈprɑːɡres/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/make_progress.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/make_progress.mp3"
                          },
                          {
                              "word": "opportunity",
                              "translate": "cơ hội",
                              "phonetic": " /ˌɑːpərˈtuːnəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/opportunity.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/opportunity.mp3"
                          },
                          {
                              "word": "potential",
                              "translate": "tiềm năng",
                              "phonetic": "/pəˈtenʃl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/potential.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/potential.mp3"
                          }
                      ]
                  },
                  {
                      "id": 34,
                      "title": "Sát nhập và mua lại",
                      "words": [
                          {
                              "word": "absorb into",
                              "translate": "hợp nhất",
                              "phonetic": "/əbˈzɔːrb ˈɪntə/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/absorb_into.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/absorb_into.mp3"
                          },
                          {
                              "word": "arbitration",
                              "translate": "trọng tài",
                              "phonetic": "/ˌɑːrbɪˈtreɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/arbitration.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/arbitration.mp3"
                          },
                          {
                              "word": "brand value",
                              "translate": "giá trị thương hiệu",
                              "phonetic": "/brænd ˈvæljuː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/brand_value.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/brand_value.mp3"
                          },
                          {
                              "word": "compensation",
                              "translate": "sự bồi thường",
                              "phonetic": "/ˌkɑːmpenˈseɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/compensation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/compensation.mp3"
                          },
                          {
                              "word": "merge and acquisition",
                              "translate": "sáp nhập và mua lại",
                              "phonetic": "/mɜːrdʒ ənd ˌækwɪˈzɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/merge_and_acquisition.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/merge_and_acquisition.mp3"
                          },
                          {
                              "word": "ownership",
                              "translate": "quyền sở hữu",
                              "phonetic": "/ˈoʊnərʃɪp/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/ownership.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/ownership.mp3"
                          },
                          {
                              "word": "purchase",
                              "translate": "mua",
                              "phonetic": "/ˈpɜːrtʃəs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/purchase.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/purchase.mp3"
                          },
                          {
                              "word": "separate",
                              "translate": "tách ra",
                              "phonetic": "/ˈseprət/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/separate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/separate.mp3"
                          },
                          {
                              "word": "shrink",
                              "translate": "thu hẹp",
                              "phonetic": " /ʃrɪŋk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/shrink.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/shrink.mp3"
                          },
                          {
                              "word": "take over",
                              "translate": "tiếp quản",
                              "phonetic": "/teɪk ˈoʊvər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/take_over.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/take_over.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 18,
              "title": "Fundamental Economics 2",
              "description": "Kinh tế học căn bản 2 bao gồm các yếu tố ảnh hưởng bên ngoài như các hệ thống tiền tệ, kinh tế và những yếu tố nội tại như đạo đức kinh doanh ",
              "topics": [
                  {
                      "id": 42,
                      "title": "Đạo đức kinh doanh",
                      "words": [
                          {
                              "word": "bribery",
                              "translate": "tội hối lộ",
                              "phonetic": "/ˈbraɪbəri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/bribery.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/bribery.mp3"
                          },
                          {
                              "word": "business ethics",
                              "translate": "đạo đức kinh doanh",
                              "phonetic": "/ˈbɪznəs ˈeθɪk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/business_ethics.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/business_ethics.mp3"
                          },
                          {
                              "word": "commit",
                              "translate": "vi phạm",
                              "phonetic": "/kəˈmɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/commit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/commit.mp3"
                          },
                          {
                              "word": "corruption",
                              "translate": "sự tham nhũng",
                              "phonetic": "/kəˈrʌpʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/corruption.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/corruption.mp3"
                          },
                          {
                              "word": "ethical principle",
                              "translate": "nguyên tắc đạo đức",
                              "phonetic": "/ˈeθɪkl ˈprɪnsəpl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/ethical_principle.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/ethical_principle.mp3"
                          },
                          {
                              "word": "justice",
                              "translate": "sự công bằng",
                              "phonetic": "/ˈdʒʌstɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/justice.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/justice.mp3"
                          },
                          {
                              "word": "lobby",
                              "translate": "vận động hành lang",
                              "phonetic": "/ˈlɑːbi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/lobby.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/lobby.mp3"
                          },
                          {
                              "word": "social responsibility",
                              "translate": "trách nhiệm xã hội",
                              "phonetic": "/ˈsoʊʃl rɪˌspɑːnsəˈbɪləti/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/social_responsibility.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/social_responsibility.mp3"
                          },
                          {
                              "word": "stakeholder",
                              "translate": "cổ đông",
                              "phonetic": "/ˈsteɪkhoʊldər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/stakeholder.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/stakeholder.mp3"
                          },
                          {
                              "word": "transparency",
                              "translate": "sự minh bạch",
                              "phonetic": "/trænsˈpærənsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/transparency.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/transparency.mp3"
                          }
                      ]
                  },
                  {
                      "id": 43,
                      "title": "Tinh thần doanh nhân",
                      "words": [
                          {
                              "word": "come up with",
                              "translate": "nảy ra",
                              "phonetic": "/kʌm ʌp wɪð/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/come_up_with.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/come_up_with.mp3"
                          },
                          {
                              "word": "desire",
                              "translate": "khát khao, mong ước",
                              "phonetic": "/dɪˈzaɪər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/desire.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/desire.mp3"
                          },
                          {
                              "word": "entrepreneur",
                              "translate": "doanh nhân",
                              "phonetic": "/ˌɑːntrəprəˈnɜːr/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/entrepreneur.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/entrepreneur.mp3"
                          },
                          {
                              "word": "entrepreneurship",
                              "translate": "tinh thần doanh nhân",
                              "phonetic": "/ˌɑːntrəprəˈnɜːrʃɪp/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/entrepreneurship.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/entrepreneurship.mp3"
                          },
                          {
                              "word": "innovation",
                              "translate": "sự đổi mới",
                              "phonetic": "/ˌɪnəˈveɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/innovation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/innovation.mp3"
                          },
                          {
                              "word": "pioneer",
                              "translate": "người tiên phong",
                              "phonetic": "/ˌpaɪəˈnɪr/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/pioneer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/pioneer.mp3"
                          },
                          {
                              "word": "possess",
                              "translate": "sở hữu",
                              "phonetic": "/pəˈzes/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/possess.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/possess.mp3"
                          },
                          {
                              "word": "pursue",
                              "translate": "theo đuổi",
                              "phonetic": "/pərˈsuː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/pursue.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/pursue.mp3"
                          },
                          {
                              "word": "start-up",
                              "translate": "khởi nghiệp",
                              "phonetic": "/stɑːrt ʌp/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/start-up.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/start-up.mp3"
                          },
                          {
                              "word": "venture capital",
                              "translate": "vốn mạo hiểm",
                              "phonetic": "/ˈventʃər ˈkæpɪtl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/venture_capital.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/venture_capital.mp3"
                          }
                      ]
                  },
                  {
                      "id": 44,
                      "title": "Toàn cầu hóa",
                      "words": [
                          {
                              "word": "developed country",
                              "translate": "quốc gia phát triển",
                              "phonetic": "/dɪˈveləpt ˈkʌntri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/developed_country.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/embargo.mp3"
                          },
                          {
                              "word": "developing country",
                              "translate": "quốc gia đang phát triển",
                              "phonetic": " /dɪˈveləpɪŋ ˈkʌntri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/developing_country.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/enact_a_law.mp3"
                          },
                          {
                              "word": "exploit",
                              "translate": "khai thác",
                              "phonetic": "/ɪkˈsplɔɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/exploit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/privilege.mp3"
                          },
                          {
                              "word": "global warming",
                              "translate": "tình trạng nóng lên toàn cầu",
                              "phonetic": "/ˈɡloʊbl ˈwɔːrmɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/global_warming.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/protect.mp3"
                          },
                          {
                              "word": "globalization",
                              "translate": "toàn cầu hóa",
                              "phonetic": " /ˌɡloʊbələˈzeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/globalization.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/government_intervention.mp3"
                          },
                          {
                              "word": "immigration",
                              "translate": "sự nhập cư",
                              "phonetic": " /ˌɪmɪˈɡreɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/immigration.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/equality.mp3"
                          },
                          {
                              "word": "industrialize",
                              "translate": "công nghiệp hóa",
                              "phonetic": " /ɪnˈdʌstriəlaɪz",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/industrialize.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/policy.mp3"
                          },
                          {
                              "word": "integrate",
                              "translate": "hội nhập",
                              "phonetic": "/ˈɪntɪɡreɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/integrate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/fiscal_policy.mp3"
                          },
                          {
                              "word": "universal",
                              "translate": "toàn cầu",
                              "phonetic": "/ˌjuːnɪˈvɜːrsl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/universal.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/quota.mp3"
                          }
                      ]
                  },
                  {
                      "id": 45,
                      "title": "Sự can thiệp của chính phủ",
                      "words": [
                          {
                              "word": "embargo",
                              "translate": "cấm vận",
                              "phonetic": "/ɪmˈbɑːrɡoʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/embargo.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/embargo.mp3"
                          },
                          {
                              "word": "enact a law",
                              "translate": "ban hành một bộ luật",
                              "phonetic": "/ɪˈnækt ə lɔː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/enact_a_law.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/enact_a_law.mp3"
                          },
                          {
                              "word": "equality",
                              "translate": "sự bình đẳng",
                              "phonetic": "/iˈkwɑːləti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/equality.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/equality.mp3"
                          },
                          {
                              "word": "fiscal policy",
                              "translate": "chính sách tài khóa",
                              "phonetic": " /ˈfɪskl ˈpɑːləsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/fiscal_policy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/fiscal_policy.mp3"
                          },
                          {
                              "word": "government intervention",
                              "translate": "sự can thiệp của chính phủ",
                              "phonetic": "/ˈɡʌvərnmənt ˌɪntərˈvenʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/government_intervention.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/government_intervention.mp3"
                          },
                          {
                              "word": "policy",
                              "translate": "chính sách",
                              "phonetic": "/ˈpɑːləsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/policy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/policy.mp3"
                          },
                          {
                              "word": "privilege",
                              "translate": "đặc quyền",
                              "phonetic": " /ˈprɪvəlɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/privilege.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/privilege.mp3"
                          },
                          {
                              "word": "protect",
                              "translate": "bảo vệ, bảo hộ",
                              "phonetic": "/prəˈtekt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/protect.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/protect.mp3"
                          },
                          {
                              "word": "quota",
                              "translate": "hạn ngạch",
                              "phonetic": "/ˈkwoʊtə/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/quota.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/quota.mp3"
                          },
                          {
                              "word": "subsidy",
                              "translate": "trợ cấp",
                              "phonetic": "/ˈsʌbsədi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/subsidy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/subsidy.mp3"
                          }
                      ]
                  },
                  {
                      "id": 46,
                      "title": "Hệ thống tiền tệ",
                      "words": [
                          {
                              "word": "central bank",
                              "translate": "ngân hàng trung ương",
                              "phonetic": "/ˈsentrəl bæŋk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/central_bank.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/central_bank.mp3"
                          },
                          {
                              "word": "credit union",
                              "translate": "công đoàn tín dụng",
                              "phonetic": " /ˈkredɪt ˈjuːniən/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/credit_union.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/credit_union.mp3"
                          },
                          {
                              "word": "exchange rate",
                              "translate": "tỉ giá hối đoái",
                              "phonetic": "/ɪksˈtʃeɪndʒ reɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/exchange_rate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/exchange_rate.mp3"
                          },
                          {
                              "word": "financial institution",
                              "translate": "tổ chức tài chính",
                              "phonetic": " /faɪˈnænʃl ˌɪnstɪˈtuːʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/financial_institution.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/financial_institution.mp3"
                          },
                          {
                              "word": "financial intermediary",
                              "translate": "trung gian tài chính",
                              "phonetic": "/faɪˈnænʃl ˌɪntərˈmiːdieri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/financial_intermediary.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/financial_intermediary.mp3"
                          },
                          {
                              "word": "interest",
                              "translate": "lãi suất",
                              "phonetic": "/ˈɪntrəst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/interest.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/interest.mp3"
                          },
                          {
                              "word": "major currency",
                              "translate": "đồng tiền mạnh",
                              "phonetic": "/ˈmeɪdʒər ˈkɜːrənsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/major_currency.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/major_currency.mp3"
                          },
                          {
                              "word": "monetary system",
                              "translate": "hệ thống tiền tệ",
                              "phonetic": "/ˈmʌnɪteri ˈsɪstəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/monetary_system.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/monetary_system.mp3"
                          },
                          {
                              "word": "mutual fund",
                              "translate": "quỹ tương hỗ",
                              "phonetic": "/ˈmjuːtʃuəl fʌnd/ ",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/mutual_fund.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/mutual_fund.mp3"
                          },
                          {
                              "word": "required reserve ratio",
                              "translate": "tỉ lệ dự trữ bắt buộc",
                              "phonetic": "/rɪˈkwaɪər rɪˈzɜːrv ˈreɪʃioʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/required_reserve_ratio.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/required_reserve_ratio.mp3"
                          }
                      ]
                  },
                  {
                      "id": 47,
                      "title": "Hệ thống kinh tế",
                      "words": [
                          {
                              "word": "capitalism",
                              "translate": "chủ nghĩa tư bản",
                              "phonetic": "/ˈkæpɪtəlɪzəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/capitalism.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/capitalism.mp3"
                          },
                          {
                              "word": "centrally planned economy",
                              "translate": "nền kinh tế kế hoạch hóa tập trung",
                              "phonetic": "ɪˈkɑːnəmi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/centrally_planned_economy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/centrally_planned_economy.mp3"
                          },
                          {
                              "word": "democracy",
                              "translate": "chế độ dân chủ",
                              "phonetic": "/dɪˈmɑːkrəsi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/democracy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/democracy.mp3"
                          },
                          {
                              "word": "economic system",
                              "translate": "hệ thống kinh tế",
                              "phonetic": "/ˌiːkəˈnɑːmɪk ˈsɪstəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/economic_system.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/economic_system.mp3"
                          },
                          {
                              "word": "economic transition",
                              "translate": "sự chuyển đổi kinh tế",
                              "phonetic": "/ˌiːkəˈnɑːmɪk trænˈzɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/economic_transition.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/economic_transition.mp3"
                          },
                          {
                              "word": "index",
                              "translate": "chỉ số",
                              "phonetic": "/ˈɪndeks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/index.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/index.mp3"
                          },
                          {
                              "word": "market economy",
                              "translate": "nền kinh tế thị trường",
                              "phonetic": "/ˈmɑːrkɪt ɪˈkɑːnəmi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/market_economy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/market_economy.mp3"
                          },
                          {
                              "word": "mixed economy",
                              "translate": "nền kinh tế hỗn hợp",
                              "phonetic": "/mɪkst ɪˈkɑːnəmi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/mixed_economy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/mixed_economy.mp3"
                          },
                          {
                              "word": "reform",
                              "translate": "tái cấu trúc",
                              "phonetic": "/rɪˈfɔːrm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/reform.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/reform.mp3"
                          },
                          {
                              "word": "socialism",
                              "translate": "chủ nghĩa xã hội",
                              "phonetic": " /ˈsoʊʃəlɪzəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/socialism.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/socialism.mp3"
                          }
                      ]
                  },
                  {
                      "id": 54,
                      "title": "Thương mại điện tử",
                      "words": [
                          {
                              "word": "authenticate",
                              "translate": "chứng thực",
                              "phonetic": "/ɔːˈθentɪkeɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/authenticate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/authenticate.mp3"
                          },
                          {
                              "word": "consumer behavior",
                              "translate": "hành vi người tiêu dùng",
                              "phonetic": "/kənˈsuːmər  bɪˈheɪvjər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/consumer_behavior.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/consumer_behavior.mp3"
                          },
                          {
                              "word": "ebook",
                              "translate": "sách điện tử",
                              "phonetic": "/ˈiː bʊk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/ebook.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/ebook.mp3"
                          },
                          {
                              "word": "electronic commerce",
                              "translate": "thương mại điện tử",
                              "phonetic": "/ɪˌlekˈtrɑːnɪk  ˈkɑːmɜːrs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/electronic_commerce.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/electronic_commerce.mp3"
                          },
                          {
                              "word": "electronic wallet",
                              "translate": "ví tiền điện tử",
                              "phonetic": "/ɪˌlekˈtrɑːnɪk  ˈwɑːlɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/electronic_wallet.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/electronic_wallet.mp3"
                          },
                          {
                              "word": "licensed",
                              "translate": "được cấp phép",
                              "phonetic": "/ˈlaɪsnst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/licensed.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/licensed.mp3"
                          },
                          {
                              "word": "online payment methods",
                              "translate": "các phương thức thanh toán trực tuyến",
                              "phonetic": "/ˌɑːnˈlaɪn ˈpeɪmənt ˈmeθədz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/online_payment_methods.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/online_payment_methods.mp3"
                          },
                          {
                              "word": "online shopping platform",
                              "translate": "trang mua sắm trực tuyến",
                              "phonetic": "/ˌɑːnˈlaɪn ˈʃɑːpɪŋ ˈplætfɔːrm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/online_shopping_platform.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/online_shopping_platform.mp3"
                          },
                          {
                              "word": "payment portal",
                              "translate": "cổng thanh toán",
                              "phonetic": "/ˈpeɪmənt ˈpɔːrtl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/payment_portal.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/payment_portal.mp3"
                          },
                          {
                              "word": "revolution",
                              "translate": "cuộc cách mạng",
                              "phonetic": "/ˌrevəˈluːʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/revolution.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/revolution.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
          {
              "id": 19,
              "title": "Fundamental Economics 1",
              "description": "Kinh tế học căn bản 1 bao gồm Kinh tế vĩ mô, vi mô cùng các học thuyết, luật lệ và chỉ số kinh tế",
              "topics": [
                  {
                      "id": 48,
                      "title": "Kinh tế vĩ mô",
                      "words": [
                          {
                              "word": "aggregate demand",
                              "translate": "tổng cầu",
                              "phonetic": "/ˈæɡrɪɡət dɪˈmænd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/aggregate_demand.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/aggregate_demand.mp3"
                          },
                          {
                              "word": "aggregate supply",
                              "translate": "tổng cung",
                              "phonetic": "/ˈæɡrɪɡət səˈplaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/aggregate_supply.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/aggregate_supply.mp3"
                          },
                          {
                              "word": "deflation",
                              "translate": "giảm phát",
                              "phonetic": "/ˌdiːˈfleɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/deflation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/deflation.mp3"
                          },
                          {
                              "word": "enterprise",
                              "translate": "doanh nghiệp",
                              "phonetic": "/ˈentərpraɪz/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/enterprise.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/enterprise.mp3"
                          },
                          {
                              "word": "inflation",
                              "translate": "lạm phát",
                              "phonetic": "/ɪnˈfleɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/inflation.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/inflation.mp3"
                          },
                          {
                              "word": "input",
                              "translate": "yếu tố đầu vào",
                              "phonetic": "/ˈɪnpʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/input.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/input.mp3"
                          },
                          {
                              "word": "macroeconomics",
                              "translate": "kinh tế vĩ mô",
                              "phonetic": "/ˌmækroʊˌekəˈnɑːmɪks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/macroeconomics.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/macroeconomics.mp3"
                          },
                          {
                              "word": "national income",
                              "translate": "thu nhập quốc dân",
                              "phonetic": "/ˈnæʃnəl ˈɪnkʌm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/national_income.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/national_income.mp3"
                          },
                          {
                              "word": "output",
                              "translate": "sản lượng đầu ra",
                              "phonetic": "/ˈaʊtpʊt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/output.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/output.mp3"
                          },
                          {
                              "word": "unemployment rate",
                              "translate": "tỉ lệ thất nghiệp",
                              "phonetic": "/ˌʌnɪmˈplɔɪmənt reɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/unemployment_rate.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/unemployment_rate.mp3"
                          }
                      ]
                  },
                  {
                      "id": 49,
                      "title": "Kinh tế vi mô",
                      "words": [
                          {
                              "word": "consumption",
                              "translate": "sự tiêu dùng",
                              "phonetic": "/kənˈsʌmpʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/consumption.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/consumption.mp3"
                          },
                          {
                              "word": "elasticity",
                              "translate": "độ co dãn",
                              "phonetic": "/ˌiːlæˈstɪsəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/elasticity.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/elasticity.mp3"
                          },
                          {
                              "word": "equilibrium",
                              "translate": "điểm cân bằng",
                              "phonetic": " /ˌiːkwɪˈlɪbriəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/equilibrium.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/equilibrium.mp3"
                          },
                          {
                              "word": "marginal utility",
                              "translate": "lợi ích cận biên",
                              "phonetic": "/ˈmɑːrdʒɪnl juːˈtɪləti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/marginal_utility.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/marginal_utility.mp3"
                          },
                          {
                              "word": "microeconomics",
                              "translate": "kinh tế vi mô",
                              "phonetic": "/ˈmaɪkroʊˌiːkəˈnɑːmɪks",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/microeconomics.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/microeconomics.mp3"
                          },
                          {
                              "word": "monopoly",
                              "translate": "độc quyền",
                              "phonetic": "/məˈnɑːpəli/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/monopoly.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/monopoly.mp3"
                          },
                          {
                              "word": "opportunity cost",
                              "translate": "chi phí cơ hội",
                              "phonetic": "/ˌɑːpərˈtuːnəti kɔːst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/opportunity_cost.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/opportunity_cost.mp3"
                          },
                          {
                              "word": "scarcity",
                              "translate": "sự khan hiếm",
                              "phonetic": "/ˈskersəti/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/scarcity.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/scarcity.mp3"
                          },
                          {
                              "word": "specialization",
                              "translate": "chuyên môn hóa",
                              "phonetic": "/ˌspeʃələˈzeɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/specialization.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/specialization.mp3"
                          },
                          {
                              "word": "substitution",
                              "translate": "sự thay thế",
                              "phonetic": "/ˌsʌbstɪˈtuːʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/substitution.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/substitution.mp3"
                          }
                      ]
                  },
                  {
                      "id": 35,
                      "title": "Chuỗi cung ứng",
                      "words": [
                          {
                              "word": "advantage",
                              "translate": "thuận lợi",
                              "phonetic": " /ədˈvæntɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/advantage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/advantage.mp3"
                          },
                          {
                              "word": "coordination",
                              "translate": "sự phối hợp",
                              "phonetic": "/koʊˌɔːrdɪˈneɪʃn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/coordination.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/coordination.mp3"
                          },
                          {
                              "word": "effective",
                              "translate": "hiệu quả",
                              "phonetic": "/ɪˈfektɪv/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/effective.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/effective.mp3"
                          },
                          {
                              "word": "logistics",
                              "translate": "ngành hậu cần",
                              "phonetic": "/ləˈdʒɪstɪks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/logistics.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/logistics.mp3"
                          },
                          {
                              "word": "manufacturer",
                              "translate": "nhà sản xuất",
                              "phonetic": "/ˌmænjuˈfæktʃərər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/manufacturer.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/manufacturer.mp3"
                          },
                          {
                              "word": "maximize",
                              "translate": "tối đa hóa",
                              "phonetic": "/ˈmæksɪmaɪz",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/maximize.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/maximize.mp3"
                          },
                          {
                              "word": "product flow",
                              "translate": "dòng sản phẩm",
                              "phonetic": "/ˈprɑːdʌkt floʊ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/product_flow.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/product_flow.mp3"
                          },
                          {
                              "word": "supply chain",
                              "translate": "chuỗi cung ứng",
                              "phonetic": " /səˈplaɪ tʃeɪn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/supply_chain.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/supply_chain.mp3"
                          },
                          {
                              "word": "sustainable",
                              "translate": "bền vững",
                              "phonetic": " /səˈsteɪnəbl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/sustainable.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/sustainable.mp3"
                          },
                          {
                              "word": "transmit an order",
                              "translate": "truyền lệnh",
                              "phonetic": "/trænsˈmɪt ən ˈɔːrdər/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/transmit_an_order.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/transmit_an_order.mp3"
                          }
                      ]
                  },
                  {
                      "id": 50,
                      "title": "Học thuyết kinh tế",
                      "words": [
                          {
                              "word": "absolute advantage",
                              "translate": "lý thuyết lợi thế tuyệt đối",
                              "phonetic": "/ˈæbsəluːt ədˈvæntɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/absolute_advantage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/absolute_advantage.mp3"
                          },
                          {
                              "word": "apply",
                              "translate": "ứng dụng",
                              "phonetic": "/əˈplaɪ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/apply.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/apply.mp3"
                          },
                          {
                              "word": "comparative advantage",
                              "translate": "lý thuyết lợi thế so sánh",
                              "phonetic": "/kəmˈpærətɪv ədˈvæntɪdʒ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/comparative_advantage.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/comparative_advantage.mp3"
                          },
                          {
                              "word": "economic theory",
                              "translate": "học thuyết kinh tế",
                              "phonetic": "/ˌiːkəˈnɑːmɪk ˈθiːəri/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/economic_theory.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/economic_theory.mp3"
                          },
                          {
                              "word": "invisible hand",
                              "translate": "lý thuyết bàn tay vô hình",
                              "phonetic": "/ɪnˈvɪzəbl hænd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/invisible_hand.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/invisible_hand.mp3"
                          },
                          {
                              "word": "mercantilism",
                              "translate": "chủ nghĩa trọng thương",
                              "phonetic": "/mɜːrˈkæntɪlɪzəm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/mercantilism.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/mercantilism.mp3"
                          },
                          {
                              "word": "philosophy",
                              "translate": "triết học",
                              "phonetic": "/fəˈlɑːsəfi/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/philosophy.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/philosophy.mp3"
                          },
                          {
                              "word": "put into practice",
                              "translate": "đưa vào thực tiễn",
                              "phonetic": "/pʊt ˈɪntə ˈpræktɪs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/put_into_practice.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/put_into_practice.mp3"
                          },
                          {
                              "word": "scale",
                              "translate": "quy mô",
                              "phonetic": "/skeɪl/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/scale.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/scale.mp3"
                          },
                          {
                              "word": "trade",
                              "translate": "thương mại",
                              "phonetic": "/treɪd/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/trade.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/trade.mp3"
                          }
                      ]
                  },
                  {
                      "id": 51,
                      "title": "Luật kinh doanh",
                      "words": [
                          {
                              "word": "anti-dumping",
                              "translate": "luật chống bán phá giá",
                              "phonetic": "/ˈænti ˈdʌmpɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/anti-dumping.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/anti-dumping.mp3"
                          },
                          {
                              "word": "anti-money laundering",
                              "translate": "luật phòng chống rửa tiền",
                              "phonetic": "/ˈænti ˈmʌni ˈlɔːndərɪŋ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/anti-money_laundering.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/anti-money_laundering.mp3"
                          },
                          {
                              "word": "antitrust",
                              "translate": "luật chống độc quyền",
                              "phonetic": "/ˌæntiˈtrʌst/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/antitrust.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/antitrust.mp3"
                          },
                          {
                              "word": "copyright",
                              "translate": "bản quyền",
                              "phonetic": "/ˈkɑːpiraɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/copyright.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/copyright.mp3"
                          },
                          {
                              "word": "economic law",
                              "translate": "luật kinh tế",
                              "phonetic": "/ˌiːkəˈnɑːmɪk lɔː/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/economic_law.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/economic_law.mp3"
                          },
                          {
                              "word": "intellectual property right",
                              "translate": "luật sở hữu trí tuệ",
                              "phonetic": " /ˌɪntəˈlektʃuəl ˈprɑːpərti raɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/intellectual_property_right.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/intellectual_property_right.mp3"
                          },
                          {
                              "word": "patent",
                              "translate": "bằng sáng chế",
                              "phonetic": "/ˈpætnt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/patent.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/patent.mp3"
                          },
                          {
                              "word": "punish",
                              "translate": "phạt",
                              "phonetic": "/ˈpʌnɪʃ/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/punish.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/punish.mp3"
                          },
                          {
                              "word": "tax evasion",
                              "translate": "sự trốn thuế",
                              "phonetic": "/tæks ɪˈveɪʒn/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/tax_evasion.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/tax_evasion.mp3"
                          },
                          {
                              "word": "trademark",
                              "translate": "thương hiệu",
                              "phonetic": "/ˈtreɪdmɑːrk/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/trademark.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/trademark.mp3"
                          }
                      ]
                  },
                  {
                      "id": 52,
                      "title": "Chỉ số kinh tế",
                      "words": [
                          {
                              "word": "balance of payment",
                              "translate": "cán cân thanh toán",
                              "phonetic": "/ ˈbæləns əv ˈpeɪmənt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/balance_of_payment.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/balance_of_payment.mp3"
                          },
                          {
                              "word": "Consumer Price Index",
                              "translate": "chỉ số giá tiêu dùng",
                              "phonetic": "/kənˈsuːmər praɪs ˈɪndeks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Consumer_Price_Index.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Consumer_Price_Index.mp3"
                          },
                          {
                              "word": "deficit",
                              "translate": "thâm hụt",
                              "phonetic": "/ˈdefɪsɪt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/deficit.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/deficit.mp3"
                          },
                          {
                              "word": "economic index",
                              "translate": "chỉ số kinh tế",
                              "phonetic": "/ˌiːkəˈnɑːmɪk ˈɪndeks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/economic_index.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/economic_index.mp3"
                          },
                          {
                              "word": "Gross Domestic Product",
                              "translate": "tổng sản phẩm quốc nội",
                              "phonetic": "/ɡroʊs dəˈmestɪk ˈprɑːdʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Gross_Domestic_Product.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Gross_Domestic_Product.mp3"
                          },
                          {
                              "word": "Gross National Product",
                              "translate": "tổng sản phẩm quốc dân",
                              "phonetic": "/ɡroʊs ˈnæʃnəl ˈprɑːdʌkt/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Gross_National_Product.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Gross_National_Product.mp3"
                          },
                          {
                              "word": "Human Development Index",
                              "translate": "chỉ số phát triển con người",
                              "phonetic": "/ˈhjuːmən dɪˈveləpmənt ˈɪndeks/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Human_Development_Index.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Human_Development_Index.mp3"
                          },
                          {
                              "word": "Net National Income",
                              "translate": "tổng thu nhập quốc dân ròng",
                              "phonetic": "/net næʃnəl ˈɪnkʌm/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/Net_National_Income.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/Net_National_Income.mp3"
                          },
                          {
                              "word": "surplus",
                              "translate": "",
                              "phonetic": "/ˈsɜːrpləs/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/surplus.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/surplus.mp3"
                          },
                          {
                              "word": "trade balance",
                              "translate": "cán cân thương mại",
                              "phonetic": "/treɪd ˈbæləns/",
                              "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/600 từ vựng Kinh tế/trade_balance.png",
                              "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/600 từ vựng Kinh tế/Từ/trade_balance.mp3"
                          }
                      ]
                  }
              ],
              "type": 2
          },
      ],
  grammarUnits = [
      {
          "id": 20,
          "title": "Các thì",
          "description": "Các thì cơ bản trong tiếng Anh",
          "topics": [
              {
                  "id": 1,
                  "title": "Hiện tại đơn",
                  "words": [
                      {
                          "word": "sad",
                          "translate": "buồn",
                          "phonetic": "/sæd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/sad.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/sad.mp3"
                      },
                      {
                          "word": "sun",
                          "translate": "mặt trời",
                          "phonetic": "/sʌn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/sun.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/sun.mp3"
                      },
                      {
                          "word": "East",
                          "translate": "phía đông",
                          "phonetic": "/iːst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/East.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/East.mp3"
                      },
                      {
                          "word": "plane",
                          "translate": "máy bay",
                          "phonetic": "/pleɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/plane.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/plane.mp3"
                      },
                      {
                          "word": "take off",
                          "translate": "cất cánh",
                          "phonetic": "/teɪk/ /ɔːf/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/take_off.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/take_off.mp3"
                      }
                  ]
              },
              {
                  "id": 2,
                  "title": "Hiện tại tiếp diễn",
                  "words": [
                      {
                          "word": "learn",
                          "translate": "học",
                          "phonetic": "/lɜːrn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/learn.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/learn.mp3"
                      },
                      {
                          "word": "fly",
                          "translate": "bay",
                          "phonetic": "/flaɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/fly.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/fly.mp3"
                      },
                      {
                          "word": "lose",
                          "translate": "mất, đánh mất",
                          "phonetic": "/luːz/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/lose.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/lose.mp3"
                      },
                      {
                          "word": "swim",
                          "translate": "bơi",
                          "phonetic": "/swɪm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/swim.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/swim.mp3"
                      },
                      {
                          "word": "cook",
                          "translate": "nấu",
                          "phonetic": "/kʊk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/cook.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/cook.mp3"
                      }
                  ]
              },
              {
                  "id": 3,
                  "title": "Quá khứ đơn",
                  "words": [
                      {
                          "word": "visit",
                          "translate": "thăm",
                          "phonetic": "/ˈvɪzɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/visit.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/visit.mp3"
                      },
                      {
                          "word": "run",
                          "translate": "chạy",
                          "phonetic": "/rʌn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/run.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/run.mp3"
                      },
                      {
                          "word": "museum",
                          "translate": "bảo tàng",
                          "phonetic": "/mjuˈziːəm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/museum.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/museum.mp3"
                      },
                      {
                          "word": "buy",
                          "translate": "mua",
                          "phonetic": "/baɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/buy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/buy.mp3"
                      }
                  ]
              },
              {
                  "id": 4,
                  "title": "Quá khứ tiếp diễn",
                  "words": [
                      {
                          "word": "neighbor",
                          "translate": "hàng xóm",
                          "phonetic": "/ˈneɪbər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/neighbor.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/neighbor.mp3"
                      },
                      {
                          "word": "leave",
                          "translate": "rời đi",
                          "phonetic": "/liːv/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/leave.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/leave.mp3"
                      },
                      {
                          "word": "call",
                          "translate": "gọi",
                          "phonetic": "/kɔːl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/call.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/call.mp3"
                      },
                      {
                          "word": "homework",
                          "translate": "bài tập về nhà",
                          "phonetic": "/ˈhoʊmwɜːrk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/homework.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/homework.mp3"
                      }
                  ]
              },
              {
                  "id": 5,
                  "title": "Hiện tại hoàn thành",
                  "words": [
                      {
                          "word": "see",
                          "translate": "nhìn, gặp",
                          "phonetic": "/siː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/see.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/see.mp3"
                      },
                      {
                          "word": "old friend",
                          "translate": "người bạn cũ",
                          "phonetic": "/oʊld/ /frend/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/old_friend.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/old_friend.mp3"
                      },
                      {
                          "word": "street",
                          "translate": "phố",
                          "phonetic": "/striːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/street.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/street.mp3"
                      },
                      {
                          "word": "live",
                          "translate": "sống",
                          "phonetic": "/lɪv/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/live.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/live.mp3"
                      }
                  ]
              },
              {
                  "id": 6,
                  "title": "Hiện tại hoàn thành tiếp diễn",
                  "words": [
                      {
                          "word": "minute",
                          "translate": "phút",
                          "phonetic": "/ˈmɪnɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/minute.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/minute.mp3"
                      },
                      {
                          "word": "sleep",
                          "translate": "ngủ",
                          "phonetic": "/sliːp/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/sleep.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/sleep.mp3"
                      },
                      {
                          "word": "eat",
                          "translate": "ăn",
                          "phonetic": "/iːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/eat.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/eat.mp3"
                      },
                      {
                          "word": "exhausted",
                          "translate": "kiệt sức",
                          "phonetic": "/ɪgˈzɔːstɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/exhausted.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/exhausted.mp3"
                      },
                      {
                          "word": "hair",
                          "translate": "tóc",
                          "phonetic": "/her/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/hair.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/hair.mp3"
                      },
                      {
                          "word": "mess",
                          "translate": "đống lộn xộn",
                          "phonetic": "/mes/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/mess.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/mess.mp3"
                      }
                  ]
              },
              {
                  "id": 7,
                  "title": "Quá khứ hoàn thành",
                  "words": [
                      {
                          "word": "police",
                          "translate": "cảnh sát",
                          "phonetic": "/pəˈliːs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/police.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/police.mp3"
                      },
                      {
                          "word": "clean",
                          "translate": "dọn dẹp",
                          "phonetic": "/kliːn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/clean.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/clean.mp3"
                      },
                      {
                          "word": "meet",
                          "translate": "gặp gỡ",
                          "phonetic": "/miːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/meet.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/meet.mp3"
                      }
                  ]
              },
              {
                  "id": 8,
                  "title": "Tương lai đơn và Tương lai gần",
                  "words": [
                      {
                          "word": "tomorrow",
                          "translate": "ngày mai",
                          "phonetic": "/təˈmɔːroʊ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/tomorrow.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/tomorrow.mp3"
                      },
                      {
                          "word": "think",
                          "translate": "suy nghĩ",
                          "phonetic": "/θɪŋk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/think.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/think.mp3"
                      },
                      {
                          "word": "rain",
                          "translate": "mưa",
                          "phonetic": "/reɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/rain.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/rain.mp3"
                      },
                      {
                          "word": "get married",
                          "translate": "kết hôn",
                          "phonetic": "/ɡet/ /ˈmærid/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/get_married.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/get_married.mp3"
                      },
                      {
                          "word": "actor",
                          "translate": "nam diễn viên",
                          "phonetic": "/ˈæktər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/an_actor.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/an_actor.mp3"
                      }
                  ]
              },
              {
                  "id": 9,
                  "title": "Tương lai tiếp diễn",
                  "words": [
                      {
                          "word": "come",
                          "translate": "đến",
                          "phonetic": "/kʌm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/come.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/come.mp3"
                      },
                      {
                          "word": "dance",
                          "translate": "nhảy múa",
                          "phonetic": "/dæns/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/dance.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/dance.mp3"
                      },
                      {
                          "word": "lie",
                          "translate": "nằm",
                          "phonetic": "/laɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/lie.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/lie.mp3"
                      }
                  ]
              },
              {
                  "id": 10,
                  "title": "Tương lai hoàn thành",
                  "words": [
                      {
                          "word": "finish",
                          "translate": "kết thúc, hoàn thành",
                          "phonetic": "/ˈfɪnɪʃ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/finish.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/finish.mp3"
                      },
                      {
                          "word": "stay",
                          "translate": "ở",
                          "phonetic": "/steɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/stay.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/stay.mp3"
                      },
                      {
                          "word": "watch",
                          "translate": "xem",
                          "phonetic": "/wɑːtʃ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/watch.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/watch.mp3"
                      }
                  ]
              },
              {
                  "id": 11,
                  "title": "Tương lai hoàn thành tiếp diễn",
                  "words": [
                      {
                          "word": "work",
                          "translate": "làm việc",
                          "phonetic": "/wɜːrk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/work.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/work.mp3"
                      },
                      {
                          "word": "wait for",
                          "translate": "đợi chờ",
                          "phonetic": "/weɪt/ /fɔːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/wait_for.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/wait_for.mp3"
                      },
                      {
                          "word": "play tennis",
                          "translate": "chơi quần vợt",
                          "phonetic": "/pleɪ/ /ˈtenɪs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/play_tennis.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/play_tennis.mp3"
                      },
                      {
                          "word": "September",
                          "translate": "tháng Chín",
                          "phonetic": "/sepˈtembər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/september.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/september.mp3"
                      }
                  ]
              }
          ],
          "type": 3
      },
      {
          "id": 21,
          "title": "Các loại từ",
          "description": "Các loại từ quan trọng cần biết trong tiếng Anh",
          "topics": [
              {
                  "id": 12,
                  "title": "Tổng quan danh từ",
                  "words": [
                      {
                          "word": "mother",
                          "translate": "người mẹ",
                          "phonetic": "/ˈmʌðər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/mother.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/mother.mp3"
                      },
                      {
                          "word": "dog",
                          "translate": "con chó",
                          "phonetic": "/dɔːɡ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/dog.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/dog.mp3"
                      },
                      {
                          "word": "house",
                          "translate": "ngôi nhà",
                          "phonetic": "/haʊs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/house.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/house.mp3"
                      },
                      {
                          "word": "city",
                          "translate": "thành phố",
                          "phonetic": "/ˈsɪti/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/city.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/city.mp3"
                      },
                      {
                          "word": "church",
                          "translate": "nhà thờ",
                          "phonetic": "/ʧɜːrʧ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/church.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/church.mp3"
                      },
                      {
                          "word": "beauty",
                          "translate": "vẻ đẹp",
                          "phonetic": "/ˈbjuːti/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/beauty.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/beauty.mp3"
                      },
                      {
                          "word": "happiness",
                          "translate": "niềm hạnh phúc",
                          "phonetic": "/ˈhæpinəs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/happiness.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/happiness.mp3"
                      },
                      {
                          "word": "cough",
                          "translate": "cơn ho",
                          "phonetic": "/kɔːf/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/cough.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/cough.mp3"
                      },
                      {
                          "word": "water",
                          "translate": "nước",
                          "phonetic": "/ˈwɔːtər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/water.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/water.mp3"
                      },
                      {
                          "word": "bread",
                          "translate": "bánh mì",
                          "phonetic": "/bred/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/bread.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/bread.mp3"
                      }
                  ]
              },
              {
                  "id": 13,
                  "title": "Danh từ đếm",
                  "words": [
                      {
                          "word": "baby",
                          "translate": "em bé",
                          "phonetic": "/ˈbeɪbi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/baby.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/baby.mp3"
                      },
                      {
                          "word": "box",
                          "translate": "cái hộp",
                          "phonetic": "/bɑːks/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/box.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/box.mp3"
                      },
                      {
                          "word": "dancer",
                          "translate": "vũ công",
                          "phonetic": "/ˈdænsər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/dancer.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/dancer.mp3"
                      },
                      {
                          "word": "dollar",
                          "translate": "đồng đô la",
                          "phonetic": "/ˈdɑːlər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/dollar.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/dollar.mp3"
                      },
                      {
                          "word": "bear",
                          "translate": "con gấu",
                          "phonetic": "/ber/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/bear.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/bear.mp3"
                      },
                      {
                          "word": "beer",
                          "translate": "bia",
                          "phonetic": "/bɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/beer.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/beer.mp3"
                      },
                      {
                          "word": "nature",
                          "translate": "tự nhiên, thiên nhiên",
                          "phonetic": "/ˈneɪʧər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/nature.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/nature.mp3"
                      },
                      {
                          "word": "weather",
                          "translate": "thời tiết",
                          "phonetic": "/ˈweðər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/weather.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/weather.mp3"
                      },
                      {
                          "word": "money",
                          "translate": "tiền",
                          "phonetic": "/ˈmʌni/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/money.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/money.mp3"
                      },
                      {
                          "word": "fear",
                          "translate": "nỗi sợ",
                          "phonetic": "/fɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/fear.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/fear.mp3"
                      }
                  ]
              },
              {
                  "id": 14,
                  "title": "Tính từ",
                  "words": [
                      {
                          "word": "warm",
                          "translate": "ấm",
                          "phonetic": "/wɔːrm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/warm.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/warm.mp3"
                      },
                      {
                          "word": "interesting",
                          "translate": "thú vị",
                          "phonetic": "/ˈɪntrəstɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/interesting.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/interesting.mp3"
                      }
                  ]
              },
              {
                  "id": 15,
                  "title": "Động từ",
                  "words": [
                      {
                          "word": "surprise",
                          "translate": "gây bất ngờ",
                          "phonetic": "/sərˈpraɪz/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/surprise.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/suprise.mp3"
                      },
                      {
                          "word": "invite",
                          "translate": "mời",
                          "phonetic": "/ɪnˈvaɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/invite.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/invite.mp3"
                      },
                      {
                          "word": "play",
                          "translate": "chơi",
                          "phonetic": "/pleɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/play.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/play.mp3"
                      },
                      {
                          "word": "move",
                          "translate": "di chuyển",
                          "phonetic": "/muːv/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/move.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/move.mp3"
                      },
                      {
                          "word": "remind",
                          "translate": "nhắc nhở",
                          "phonetic": "/ˈrɪmaɪnd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/remind.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/remind.mp3"
                      },
                      {
                          "word": "blame",
                          "translate": "đổ lỗi",
                          "phonetic": "/bleɪm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/blame.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/blame.mp3"
                      },
                      {
                          "word": "can",
                          "translate": "có thể",
                          "phonetic": "/kæn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/can.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/can.mp3"
                      },
                      {
                          "word": "may",
                          "translate": "có lẽ",
                          "phonetic": "/meɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/may.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/may.mp3"
                      }
                  ]
              },
              {
                  "id": 16,
                  "title": "Trạng từ",
                  "words": [
                      {
                          "word": "beautifully",
                          "translate": "một cách đẹp đẽ",
                          "phonetic": "/ˈbjuːtɪfli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/beautifully.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/beautifully.mp3"
                      },
                      {
                          "word": "slowly",
                          "translate": "một cách chậm rãi",
                          "phonetic": "/ˈsloʊli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/slowly.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/slowly.mp3"
                      },
                      {
                          "word": "hard",
                          "translate": "một cách chăm chỉ",
                          "phonetic": "/hɑːrd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/hard.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/hard.mp3"
                      },
                      {
                          "word": "clearly",
                          "translate": "một cách rõ ràng",
                          "phonetic": "/ˈklɪrli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/clearly.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/clearly.mp3"
                      },
                      {
                          "word": "well",
                          "translate": "một cách tốt",
                          "phonetic": "/wel/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/well.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/well.mp3"
                      },
                      {
                          "word": "fast",
                          "translate": "một cách nhanh",
                          "phonetic": "/fæst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/fast.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/fast.mp3"
                      },
                      {
                          "word": "never",
                          "translate": "không bao giờ",
                          "phonetic": "/ˈnɛvər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/never.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/never.mp3"
                      },
                      {
                          "word": "always",
                          "translate": "luôn luôn",
                          "phonetic": "/ˈɔːlweɪz/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/always.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/always.mp3"
                      }
                  ]
              },
              {
                  "id": 17,
                  "title": "Giới từ in/on/at",
                  "words": [
                      {
                          "word": "North",
                          "translate": "phía bắc",
                          "phonetic": "/nɔːrθ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/in_the_north.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/north.mp3"
                      },
                      {
                          "word": "at home",
                          "translate": "ở nhà",
                          "phonetic": "/æt/ /hoʊm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/at_home.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/at_home.mp3"
                      },
                      {
                          "word": "on the left",
                          "translate": "ở bên trái",
                          "phonetic": "/ɔːn/ /ðə/ /left/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/on_the_left.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/on_the_left.mp3"
                      },
                      {
                          "word": "next to",
                          "translate": "ở bên cạnh",
                          "phonetic": "/nekst/ /tu/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/next_to.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/next_to.mp3"
                      },
                      {
                          "word": "on the train",
                          "translate": "đi tàu hỏa",
                          "phonetic": "/ɔːn/ /ðə/ /treɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/on_the_train.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/on_the_train.mp3"
                      }
                  ]
              },
              {
                  "id": 18,
                  "title": "Đại từ nhân xưng",
                  "words": [
                      {
                          "word": "hamster",
                          "translate": "chuột hamster",
                          "phonetic": "/ˈhæmstər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/hamster.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/hamster.mp3"
                      },
                      {
                          "word": "chubby",
                          "translate": "mũm mĩm",
                          "phonetic": "/ˈʧʌbi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/chubby.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/chubby.mp3"
                      },
                      {
                          "word": "grandchildren",
                          "translate": "các cháu",
                          "phonetic": "/ˈgrænʧɪldrən/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/grandchildren.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/grandchildren.mp3"
                      },
                      {
                          "word": "intelligent",
                          "translate": "thông minh",
                          "phonetic": "/ɪnˈtelɪʤənt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/intelligent.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/intelligent.mp3"
                      },
                      {
                          "word": "heater",
                          "translate": "lò sưởi",
                          "phonetic": "/ˈhiːtər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/heater.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/heater.mp3"
                      },
                      {
                          "word": "cozy",
                          "translate": "ấm cúng",
                          "phonetic": "/ˈkoʊzi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/cozy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/cozy.mp3"
                      },
                      {
                          "word": "seafood",
                          "translate": "hải sản",
                          "phonetic": "/ˈsiːfuːd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/seafood.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/seafood.mp3"
                      },
                      {
                          "word": "present",
                          "translate": "món quà",
                          "phonetic": "/ˈpreznt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/present.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/present.mp3"
                      },
                      {
                          "word": "football player",
                          "translate": "cầu thủ bóng đá",
                          "phonetic": "/ˈfʊtbɔːl/ /ˈpleɪər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/football-player.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/football-player.mp3"
                      },
                      {
                          "word": "boyfriend",
                          "translate": "bạn trai",
                          "phonetic": "/ˈbɔɪˌfrend/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/boyfriend.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/boyfriend.mp3"
                      }
                  ]
              }
          ],
          "type": 3
      },
      {
          "id": 22,
          "title": "Các dạng câu đặc biệt",
          "description": "Một số dạng câu đặc biệt trong tiếng Anh",
          "topics": [
              {
                  "id": 19,
                  "title": "Câu bị động (P1)",
                  "words": [
                      {
                          "word": "flowerpot",
                          "translate": "chậu hoa",
                          "phonetic": "/ˈflaʊərpɑːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/flowerpot.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/flowerpot.mp3"
                      },
                      {
                          "word": "repair",
                          "translate": "sửa chữa",
                          "phonetic": "/rɪˈper/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/repair.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/repair.mp3"
                      },
                      {
                          "word": "water",
                          "translate": "tưới nước",
                          "phonetic": "/ˈwɔːtər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/water.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/water.mp3"
                      },
                      {
                          "word": "hit",
                          "translate": "đâm, đánh",
                          "phonetic": "/hɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/hit.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/hit.mp3"
                      },
                      {
                          "word": "report",
                          "translate": "báo cáo",
                          "phonetic": "/rɪˈpɔːrt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/report.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/report.mp3"
                      },
                      {
                          "word": "cancel",
                          "translate": "hủy bỏ",
                          "phonetic": "/ˈkænsl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/cancel.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/cancel.mp3"
                      }
                  ]
              },
              {
                  "id": 20,
                  "title": "Câu bị động (P2)",
                  "words": [
                      {
                          "word": "prisoner",
                          "translate": "tù nhân",
                          "phonetic": "/ˈprɪznər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/prisoner.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/prisoner.mp3"
                      },
                      {
                          "word": "destroy",
                          "translate": "phá hủy",
                          "phonetic": "/dɪˈstrɔɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/destroy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/destroy.mp3"
                      },
                      {
                          "word": "design",
                          "translate": "thiết kế",
                          "phonetic": "/dɪˈzaɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/design.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/design.mp3"
                      },
                      {
                          "word": "thief",
                          "translate": "tên trộm",
                          "phonetic": "/θiːf/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/thief.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/thief.mp3"
                      },
                      {
                          "word": "market",
                          "translate": "thị trường",
                          "phonetic": "/ˈmɑːrkɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/market.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/market.mp3"
                      },
                      {
                          "word": "develop",
                          "translate": "phát triển",
                          "phonetic": "/dɪˈveləp/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/develop.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/develop.mp3"
                      },
                      {
                          "word": "book",
                          "translate": "đặt",
                          "phonetic": "/bʊk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/book.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/book.mp3"
                      },
                      {
                          "word": "catch",
                          "translate": "bắt",
                          "phonetic": "/kæʧ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/catch.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/catch.mp3"
                      },
                      {
                          "word": "build",
                          "translate": "xây dựng",
                          "phonetic": "/bɪld/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/build.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/build.mp3"
                      },
                      {
                          "word": "research",
                          "translate": "nghiên cứu",
                          "phonetic": "/ˈriːsɜːrtʃ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/research.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/research.mp3"
                      }
                  ]
              },
              {
                  "id": 21,
                  "title": "Câu điều kiện loại 0",
                  "words": [
                      {
                          "word": "beloved",
                          "translate": "thân yêu",
                          "phonetic": "/bɪˈlʌvd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/beloved.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/beloved.mp3"
                      },
                      {
                          "word": "silly",
                          "translate": "ngớ ngẩn",
                          "phonetic": "/ˈsɪli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/silly.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/silly.mp3"
                      },
                      {
                          "word": "mix",
                          "translate": "trộn",
                          "phonetic": "/mɪks/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/mix.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/mix.mp3"
                      },
                      {
                          "word": "sleepy",
                          "translate": "buồn ngủ",
                          "phonetic": "/ˈsliːpi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/sleepy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/sleepy.mp3"
                      },
                      {
                          "word": "salty",
                          "translate": "mặn",
                          "phonetic": "/ˈsɔːlti/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/salty.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/salty.mp3"
                      },
                      {
                          "word": "snowy",
                          "translate": "có tuyết",
                          "phonetic": "/ˈsnoʊi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/snowy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/snowy.mp3"
                      },
                      {
                          "word": "plant",
                          "translate": "thực vật, cây cối",
                          "phonetic": "/plænt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/plant.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/plant.mp3"
                      },
                      {
                          "word": "toy",
                          "translate": "đồ chơi",
                          "phonetic": "/tɔɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/toy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/toy.mp3"
                      },
                      {
                          "word": "boil",
                          "translate": "đun sôi",
                          "phonetic": "/bɔɪl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/boil.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/boil.mp3"
                      }
                  ]
              },
              {
                  "id": 22,
                  "title": "Câu điều kiện loại 1",
                  "words": [
                      {
                          "word": "vacation",
                          "translate": "kỳ nghỉ",
                          "phonetic": "/vəˈkeɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/vacation.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/vacation.mp3"
                      },
                      {
                          "word": "member",
                          "translate": "thành viên",
                          "phonetic": "/ˈmembər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/member.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/member.mp3"
                      },
                      {
                          "word": "pass",
                          "translate": "vượt qua",
                          "phonetic": "/pæs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/pass.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/pass.mp3"
                      },
                      {
                          "word": "agree",
                          "translate": "đồng ý",
                          "phonetic": "/əˈgriː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/agree.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/agree.mp3"
                      },
                      {
                          "word": "backpack",
                          "translate": "ba lô",
                          "phonetic": "/ˈbækˌpæk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/backpack.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/backpack.mp3"
                      },
                      {
                          "word": "back",
                          "translate": "lưng",
                          "phonetic": "/bæk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/back.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/back.mp3"
                      },
                      {
                          "word": "speech",
                          "translate": "bài phát biểu",
                          "phonetic": "/spiːʧ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/speech.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/speech.mp3"
                      },
                      {
                          "word": "iron",
                          "translate": "là (quần áo)",
                          "phonetic": "/ˈaɪərn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/do_the_ironing.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/iron.mp3"
                      },
                      {
                          "word": "truth",
                          "translate": "sự thật",
                          "phonetic": "/truːθ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/tell_the_truth.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/truth.mp3"
                      }
                  ]
              },
              {
                  "id": 23,
                  "title": "Câu điều kiện loại 2",
                  "words": [
                      {
                          "word": "wing",
                          "translate": "cánh",
                          "phonetic": "/wɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/wing.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/wing.mp3"
                      },
                      {
                          "word": "snowman",
                          "translate": "người tuyết",
                          "phonetic": "/ˈsnoʊmæn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/snowman.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/snowman.mp3"
                      },
                      {
                          "word": "angry",
                          "translate": "tức giận",
                          "phonetic": "/ˈæŋgri/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/angry.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/angry.mp3"
                      },
                      {
                          "word": "lose temper",
                          "translate": "mất bình tĩnh",
                          "phonetic": "/luːz/ /ˈtempər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/loose_temper.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/loose_temper.mp3"
                      },
                      {
                          "word": "dentist",
                          "translate": "nha sĩ",
                          "phonetic": "/ˈdentɪst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/dentist.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/dentist.mp3"
                      },
                      {
                          "word": "bumblebee",
                          "translate": "ong vò vẽ",
                          "phonetic": "/ˈbʌmblbiː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/bumblebee.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/bumblebee.mp3"
                      },
                      {
                          "word": "situation",
                          "translate": "tình huống",
                          "phonetic": "/ˌsɪtʃuˈeɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/situation.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/situation.mp3"
                      },
                      {
                          "word": "luxurious",
                          "translate": "sang trọng",
                          "phonetic": "/lʌɡˈʒʊriəs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/luxurious.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/luxurious.mp3"
                      }
                  ]
              },
              {
                  "id": 24,
                  "title": "Câu điều kiện loại 3",
                  "words": [
                      {
                          "word": "absent",
                          "translate": "vắng mặt",
                          "phonetic": "/ˈæbsənt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/absent.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/absent.mp3"
                      },
                      {
                          "word": "cheat",
                          "translate": "gian lận",
                          "phonetic": "/ʧiːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/cheat.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/cheat.mp3"
                      },
                      {
                          "word": "reach",
                          "translate": "đạt đến",
                          "phonetic": "/riːtʃ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/reach.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/reach.mp3"
                      },
                      {
                          "word": "target",
                          "translate": "mục tiêu",
                          "phonetic": "/ˈtɑːrgɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/target.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/target.mp3"
                      },
                      {
                          "word": "qualification",
                          "translate": "trình độ chuyên môn",
                          "phonetic": "/ˌkwɑːlɪfɪˈkeɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/qualification.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/qualification.mp3"
                      }
                  ]
              },
              {
                  "id": 25,
                  "title": "Câu so sánh",
                  "words": [
                      {
                          "word": "desert",
                          "translate": "sa mạc",
                          "phonetic": "/ˈdezərt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/desert.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/desert.mp3"
                      },
                      {
                          "word": "bright",
                          "translate": "tươi sáng",
                          "phonetic": "/braɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/bright.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/bright.mp3"
                      },
                      {
                          "word": "watermelon",
                          "translate": "dưa hấu",
                          "phonetic": "/ˈwɑːtərmelən/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/watermelon.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/watermelon.mp3"
                      },
                      {
                          "word": "comic book",
                          "translate": "truyện tranh",
                          "phonetic": "/ˈkɑːmɪk/ /bʊk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/comic_book.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/comic_book.mp3"
                      },
                      {
                          "word": "temperature",
                          "translate": "nhiệt độ",
                          "phonetic": "/ˈtemprətʃər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/temperature.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/temperature.mp3"
                      },
                      {
                          "word": "handsome",
                          "translate": "đẹp trai",
                          "phonetic": "/ˈhænsəm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/handsome.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/handsome.mp3"
                      },
                      {
                          "word": "expensive",
                          "translate": "đắt",
                          "phonetic": "/ɪkˈspensɪv/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/expensive.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/expensive.mp3"
                      },
                      {
                          "word": "cute",
                          "translate": "dễ thương",
                          "phonetic": "/kjuːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Ngữ pháp cơ bản/cute.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Ngữ pháp cơ bản/cute.mp3"
                      }
                  ]
              }
          ],
          "type": 3
      }
  ],
  communicationUnit = [
      {
          "id": 23,
          "title": "Greetings & Introduction",
          "description": "Từ vựng về chào hỏi và giới thiệu bản thân",
          "topics": [
              {
                  "id": 1,
                  "title": "Greetings",
                  "words": [
                      {
                          "word": "Good morning",
                          "translate": "Chào buổi sáng",
                          "phonetic": "/ˌɡʊd ˈmɔːrnɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Good_morning.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Good_morning.mp3"
                      },
                      {
                          "word": "Good afternoon",
                          "translate": "Chào buổi chiều",
                          "phonetic": "/ˌɡʊd/ /æftərˈnuːn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Good_afternoon.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Good_afternoon.mp3"
                      },
                      {
                          "word": "Good evening",
                          "translate": "Chào buổi tối",
                          "phonetic": "/ˌɡʊd/ /ˈiːvnɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Good_evening.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Good_evening.mp3"
                      }
                  ]
              },
              {
                  "id": 2,
                  "title": "What's your name?",
                  "words": [
                      {
                          "word": "introduce",
                          "translate": "giới thiệu",
                          "phonetic": "/ˌɪntrəˈduːs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/introduce.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/introduce.mp3"
                      }
                  ]
              },
              {
                  "id": 3,
                  "title": "Where are you from?",
                  "words": [
                      {
                          "word": "America",
                          "translate": "Mỹ",
                          "phonetic": "/əˈmerɪkə/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/America.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/America.mp3"
                      },
                      {
                          "word": "France",
                          "translate": "Pháp",
                          "phonetic": "/fræns/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/France.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/France.mp3"
                      },
                      {
                          "word": "Germany",
                          "translate": "Đức",
                          "phonetic": "/ˈdʒɜːrməni/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Germany.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Germany.mp3"
                      },
                      {
                          "word": "Spain",
                          "translate": "Tây Ban Nha",
                          "phonetic": "/speɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Spain.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Spain.mp3"
                      }
                  ]
              },
              {
                  "id": 4,
                  "title": "How old are you?",
                  "words": [
                      {
                          "word": "university",
                          "translate": "trường đại học",
                          "phonetic": "/ˌjuːnɪˈvɜːrsəti/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/university.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/university.mp3"
                      },
                      {
                          "word": "academy",
                          "translate": "học viện",
                          "phonetic": "/əˈkædəmi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/academy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/academy.mp3"
                      },
                      {
                          "word": "freshman",
                          "translate": "sinh viên năm nhất",
                          "phonetic": "/ˈfreʃmən/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/freshman.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/freshman.mp3"
                      },
                      {
                          "word": "sophomore",
                          "translate": "sinh viên năm hai",
                          "phonetic": "/ˈsɑːfəmɔːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sophomore.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sophomore.mp3"
                      },
                      {
                          "word": "junior",
                          "translate": "sinh viên năm ba",
                          "phonetic": "/ˈdʒuːniər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/junior.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/junior.mp3"
                      },
                      {
                          "word": "senior",
                          "translate": "sinh viên năm cuối",
                          "phonetic": "/ˈsiːniər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/senior.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/senior.mp3"
                      }
                  ]
              },
              {
                  "id": 5,
                  "title": "What do you do?",
                  "words": [
                      {
                          "word": "doctor",
                          "translate": "bác sĩ",
                          "phonetic": "/ˈdɑːktər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/doctor.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/doctor.mp3"
                      },
                      {
                          "word": "teacher",
                          "translate": "giáo viên",
                          "phonetic": "/ˈtiːtʃər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/teacher.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/teacher.mp3"
                      },
                      {
                          "word": "architect",
                          "translate": "kiến trúc sư",
                          "phonetic": "/ˈɑːrkɪtekt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/architect.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/architect.mp3"
                      },
                      {
                          "word": "driver",
                          "translate": "người lái xe",
                          "phonetic": "/ˈdraɪvər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/driver.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/driver.mp3"
                      },
                      {
                          "word": "engineer",
                          "translate": "kỹ sư",
                          "phonetic": "/ˌendʒɪˈnɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/engineer.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/engineer.mp3"
                      },
                      {
                          "word": "accountant",
                          "translate": "kế toán",
                          "phonetic": "/əˈkaʊntənt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/accountant.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/accountant.mp3"
                      }
                  ]
              },
              {
                  "id": 6,
                  "title": "When is your birthday? ",
                  "words": [
                      {
                          "word": "Monday",
                          "translate": "Thứ hai",
                          "phonetic": "/ˈmʌndeɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Monday.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Monday.mp3"
                      },
                      {
                          "word": "Thursday",
                          "translate": "Thứ năm",
                          "phonetic": "/ˈθɜːrzdeɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Thursday.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Thursday.mp3"
                      },
                      {
                          "word": "Saturday",
                          "translate": "Thứ bảy",
                          "phonetic": "/ˈsætərdeɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Saturday.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Saturday.mp3"
                      }
                  ]
              },
              {
                  "id": 7,
                  "title": "Where do you live?",
                  "words": [
                      {
                          "word": "lane",
                          "translate": "ngõ",
                          "phonetic": "/leɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/lane.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/lane.mp3"
                      },
                      {
                          "word": "alley",
                          "translate": "hẻm",
                          "phonetic": "/ˈæli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/alley.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/alley.mp3"
                      },
                      {
                          "word": "ward",
                          "translate": "phường",
                          "phonetic": "/wɔːrd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/ward.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/ward.mp3"
                      },
                      {
                          "word": "district",
                          "translate": "quận",
                          "phonetic": "/ˈdɪstrɪkt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/district.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/district.mp3"
                      }
                  ]
              },
              {
                  "id": 8,
                  "title": "What's your hometown like?",
                  "words": [
                      {
                          "word": "hometown",
                          "translate": "quê hương",
                          "phonetic": "/ˈhoʊmtaʊn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/hometown.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/hometown.mp3"
                      },
                      {
                          "word": "coastal city",
                          "translate": "thành phố ven biển",
                          "phonetic": "/ˈkoʊstl/ /ˈsɪti/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/coastal_city.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/coastal_city.mp3"
                      },
                      {
                          "word": "beautiful",
                          "translate": "tươi đẹp",
                          "phonetic": "/ˈbjuːtɪfl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/beautiful.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/beautiful.mp3"
                      },
                      {
                          "word": "peaceful",
                          "translate": "yên bình",
                          "phonetic": "/ˈpiːsfl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/peaceful.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/peaceful.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 24,
          "title": "Getting to know each other",
          "description": "Từ vựng để nói về bản thân và hỏi về người khác",
          "topics": [
              {
                  "id": 10,
                  "title": "Hobbies",
                  "words": [
                      {
                          "word": "book worm",
                          "translate": "mọt sách",
                          "phonetic": "/bʊk/ /wɜːrm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_book_worm.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_book_worm.mp3"
                      }
                  ]
              },
              {
                  "id": 13,
                  "title": "Leisure Activities",
                  "words": [
                      {
                          "word": "leisure activities",
                          "translate": "hoạt động giải trí",
                          "phonetic": "/ˈliːʒər/ /ækˈtɪvətiz/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/leisure_activities.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/leisure_activities.mp3"
                      },
                      {
                          "word": "talented",
                          "translate": "có tài năng",
                          "phonetic": "/ˈtæləntɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/talented.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/talented.mp3"
                      }
                  ]
              },
              {
                  "id": 14,
                  "title": "On the weekend ",
                  "words": [
                      {
                          "word": "music festival",
                          "translate": "lễ hội âm nhạc",
                          "phonetic": "/ˈmjuːzɪk/ /ˈfestɪvl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/music_festival.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/music_festival.mp3"
                      },
                      {
                          "word": "beach",
                          "translate": "bãi biển",
                          "phonetic": "/biːtʃ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/beach.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/beach.mp3"
                      }
                  ]
              },
              {
                  "id": 15,
                  "title": "Habits",
                  "words": [
                      {
                          "word": "engrossed in",
                          "translate": "chăm chú",
                          "phonetic": "/ɪnˈgroʊst/ /ɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/engrossed_in.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/engrossed_in.mp3"
                      },
                      {
                          "word": "library",
                          "translate": "thư viện",
                          "phonetic": "/ˈlaɪbreri/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/library.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/library.mp3"
                      },
                      {
                          "word": "quiet atmosphere",
                          "translate": "bầu không khí yên tĩnh",
                          "phonetic": "/ˈkwaɪət/ /ˈætməsfɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/quiet_atmosphere.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/quiet_atmosphere.mp3"
                      },
                      {
                          "word": "focus on",
                          "translate": "tập trung vào",
                          "phonetic": "/ˈfoʊkəs/ /ɔn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/focus_on.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/focus_on.mp3"
                      }
                  ]
              },
              {
                  "id": 21,
                  "title": "Family",
                  "words": [
                      {
                          "word": "sibling",
                          "translate": "anh chị em ruột",
                          "phonetic": "/ˈsɪblɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sibling.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sibling.mp3"
                      },
                      {
                          "word": "twin",
                          "translate": "sinh đôi",
                          "phonetic": "/twɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_twin_sister.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/twin.mp3"
                      },
                      {
                          "word": "grow up",
                          "translate": "lớn lên",
                          "phonetic": "/ɡroʊ/ /ʌp/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/grow_up.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/grow_up.mp3"
                      }
                  ]
              },
              {
                  "id": 22,
                  "title": "Relatives",
                  "words": [
                      {
                          "word": "relative",
                          "translate": "người họ hàng",
                          "phonetic": "/ˈrelətɪv/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/relatives.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/relatives.mp3"
                      },
                      {
                          "word": "cousin",
                          "translate": "anh chị em họ",
                          "phonetic": "/ˈkʌzn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/cousin.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/cousin.mp3"
                      },
                      {
                          "word": "catch up",
                          "translate": "trò chuyện sau một thời gian không gặp nhau",
                          "phonetic": "/kæʧ/ /ʌp/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/catch_up.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/catch_up.mp3"
                      },
                      {
                          "word": "family gathering",
                          "translate": "gia đình tụ họp",
                          "phonetic": "/ˈfæməli/ /ˈɡæðərɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/family_gathering.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/family_gathering.mp3"
                      },
                      {
                          "word": "extended family",
                          "translate": "gia đình mở rộng (bao gồm cả ông bà, cô dì chú bác, ...)",
                          "phonetic": "/ɪkˈstendɪd/ /ˈfæməli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/extended_family.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/extended_family.mp3"
                      }
                  ]
              },
              {
                  "id": 30,
                  "title": "Reading Books",
                  "words": [
                      {
                          "word": "addicted to",
                          "translate": "nghiện, say mê",
                          "phonetic": "/əˈdɪktɪd/ /tu/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/addicted_to.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/addicted_to.mp3"
                      },
                      {
                          "word": "novel",
                          "translate": "tiểu thuyết",
                          "phonetic": "/ˈnɑːvl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/novel.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/novel.mp3"
                      },
                      {
                          "word": "chapter",
                          "translate": "chương",
                          "phonetic": "/ˈtʃæptər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/chapter.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/chapter.mp3"
                      },
                      {
                          "word": "spoil the ending",
                          "translate": "tiết lộ kết thúc",
                          "phonetic": "/spɔɪl/ /ðə/ /ˈendɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/spoil_the_ending.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/spoil_the_ending.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 25,
          "title": "Relationship",
          "description": "Từ vựng về các mối quan hệ",
          "topics": [
              {
                  "id": 9,
                  "title": "Relationship Status",
                  "words": [
                      {
                          "word": "propose to",
                          "translate": "cầu hôn",
                          "phonetic": "/prəˈpoʊz/ /tu/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/propose_to.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/propose_to.mp3"
                      },
                      {
                          "word": "single",
                          "translate": "độc thân",
                          "phonetic": "/ˈsɪŋɡl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/single.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/single.mp3"
                      },
                      {
                          "word": "divorce",
                          "translate": "ly hôn, ly dị",
                          "phonetic": "/dɪˈvɔːrs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/divorce.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/divorce.mp3"
                      },
                      {
                          "word": "get engaged",
                          "translate": "đính hôn",
                          "phonetic": "/ɡet/ /ɪnˈɡeɪdʒd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/engage.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/engage.mp3"
                      }
                  ]
              },
              {
                  "id": 23,
                  "title": "Friend",
                  "words": [
                      {
                          "word": "wonder",
                          "translate": "tự hỏi",
                          "phonetic": "/ˈwʌndər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/wonder.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/wonder.mp3"
                      },
                      {
                          "word": "occasion",
                          "translate": "dịp",
                          "phonetic": "/əˈkeɪʒn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/occasion.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/occasion.mp3"
                      },
                      {
                          "word": "housemate",
                          "translate": "bạn cùng nhà",
                          "phonetic": "/ˈhaʊsmeɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Housemate.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Housemate.mp3"
                      }
                  ]
              },
              {
                  "id": 24,
                  "title": "Congratulations",
                  "words": [
                      {
                          "word": "promote",
                          "translate": "thăng chức",
                          "phonetic": "/prəˈmoʊt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/promote.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/promote.mp3"
                      },
                      {
                          "word": "manager",
                          "translate": "người quản lý",
                          "phonetic": "/ˈmænɪdʒər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/manager.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/manager.mp3"
                      },
                      {
                          "word": "position",
                          "translate": "vị trí",
                          "phonetic": "/pəˈzɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/position.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/position.mp3"
                      },
                      {
                          "word": "deserve",
                          "translate": "xứng đáng",
                          "phonetic": "/dɪˈzɜːrv/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/deserve.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/deserve.mp3"
                      }
                  ]
              },
              {
                  "id": 25,
                  "title": "Lovers",
                  "words": [
                      {
                          "word": "stay in",
                          "translate": "ở nhà",
                          "phonetic": "/steɪ/ /ɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/stay_in.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/stay_in.mp3"
                      }
                  ]
              },
              {
                  "id": 26,
                  "title": "Hanging out",
                  "words": [
                      {
                          "word": "wine",
                          "translate": "rượu",
                          "phonetic": "/waɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/wine.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/wine.mp3"
                      }
                  ]
              },
              {
                  "id": 27,
                  "title": "Going to the cinema",
                  "words": [
                      {
                          "word": "genre",
                          "translate": "thể loại",
                          "phonetic": "/ˈʒɑːnrə/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/genre.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/genre.mp3"
                      },
                      {
                          "word": "romantic movie",
                          "translate": "phim tình cảm lãng mạn",
                          "phonetic": "/roʊˈmæntɪk/ /ˈmuːvi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/romance_movie.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/romantic_movie.mp3"
                      },
                      {
                          "word": "comedy",
                          "translate": "phim hài",
                          "phonetic": "/ˈkɑːmədi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/comedy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/comedy.mp3"
                      },
                      {
                          "word": "action movie",
                          "translate": "phim hành động",
                          "phonetic": "/ˈækʃn/ /ˈmuːvi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/action_movie.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/action_movie.mp3"
                      },
                      {
                          "word": "fiction movie",
                          "translate": "phim viễn tưởng",
                          "phonetic": "/ˈfɪkʃn/ /ˈmuːvi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/fiction_movie.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/fiction_movie.mp3"
                      }
                  ]
              },
              {
                  "id": 28,
                  "title": "Going to the concert",
                  "words": [
                      {
                          "word": "concert",
                          "translate": "buổi hòa nhạc",
                          "phonetic": "/ˈkɑːnsərt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/concert.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/concert.mp3"
                      },
                      {
                          "word": "tight budget",
                          "translate": "ngân sách eo hẹp",
                          "phonetic": "/taɪt/ /ˈbʌdʒɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/tight_budget.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/tight_budget.mp3"
                      },
                      {
                          "word": "take place",
                          "translate": "diễn ra",
                          "phonetic": "/teɪk pleɪs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/take_place.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/take_place.mp3"
                      }
                  ]
              },
              {
                  "id": 29,
                  "title": "Going to the park ",
                  "words": [
                      {
                          "word": "crystal clear",
                          "translate": "trong xanh",
                          "phonetic": "/ˈkrɪstl/ /klɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/crystal_clear.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/crystal_clear.mp3"
                      },
                      {
                          "word": "bloom",
                          "translate": "nở",
                          "phonetic": "/bluːm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/bloom.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/bloom.mp3"
                      },
                      {
                          "word": "gorgeous",
                          "translate": "tuyệt đẹp, lộng lẫy",
                          "phonetic": "/ˈɡɔːrdʒəs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/gorgeous.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/gorgeous.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 26,
          "title": "Places",
          "description": "Từ vựng về các nơi chốn",
          "topics": [
              {
                  "id": 31,
                  "title": "In the coffee shop",
                  "words": [
                      {
                          "word": "flavor",
                          "translate": "hương vị",
                          "phonetic": "/ˈfleɪvər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/flavor.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/flavor.mp3"
                      },
                      {
                          "word": "topping",
                          "translate": "lớp phủ trên bề mặt đồ tráng miệng",
                          "phonetic": "/ˈtɑːpɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/topping.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/topping.mp3"
                      }
                  ]
              },
              {
                  "id": 32,
                  "title": "At the restaurant ",
                  "words": [
                      {
                          "word": "starter",
                          "translate": "món khai vị",
                          "phonetic": "/ˈstɑːrtər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/starter.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/starter.mp3"
                      },
                      {
                          "word": "main course",
                          "translate": "món chính",
                          "phonetic": "/meɪn/ /kɔːrs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/main_course.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/main_course.mp3"
                      },
                      {
                          "word": "dessert",
                          "translate": "món tráng miệng",
                          "phonetic": "/dɪˈzɜːrt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/dessert.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/dessert.mp3"
                      },
                      {
                          "word": "steak",
                          "translate": "bít tết",
                          "phonetic": "/steɪk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/grilled_beef_steak.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/steak.mp3"
                      }
                  ]
              },
              {
                  "id": 33,
                  "title": "At the store",
                  "words": [
                      {
                          "word": "pasta",
                          "translate": "mì ống",
                          "phonetic": "/ˈpɑːstə/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/pasta.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/pasta.mp3"
                      },
                      {
                          "word": "bakery",
                          "translate": "quầy bánh mì",
                          "phonetic": "/ˈbeɪkəri/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/bakery.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/bakery.mp3"
                      },
                      {
                          "word": "dairy section",
                          "translate": "khu vực bơ sữa",
                          "phonetic": "/ˈderi/ /ˈsekʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/dairy_section.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/dairy_section.mp3"
                      }
                  ]
              },
              {
                  "id": 34,
                  "title": "Fast food",
                  "words": [
                      {
                          "word": "eat in",
                          "translate": "ăn tại cửa hàng",
                          "phonetic": "/iːt/ /ɪn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/eat_in.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/eat_in.mp3"
                      },
                      {
                          "word": "take away",
                          "translate": "mang đồ ăn đi",
                          "phonetic": "/teɪk/ /əˈweɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/take_away.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/take_away.mp3"
                      }
                  ]
              },
              {
                  "id": 41,
                  "title": "Laundry",
                  "words": [
                      {
                          "word": "laundry",
                          "translate": "giặt là",
                          "phonetic": "/ˈlɔːndri/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/laundry.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/laundry.mp3"
                      },
                      {
                          "word": "fee",
                          "translate": "phí (dịch vụ)",
                          "phonetic": "/fiː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/fee.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/fee.mp3"
                      },
                      {
                          "word": "weigh",
                          "translate": "cân",
                          "phonetic": "/weɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/weigh.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/weigh.mp3"
                      },
                      {
                          "word": "collect",
                          "translate": "lấy đồ, thu thập",
                          "phonetic": "/kəˈlekt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/collect.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/collect.mp3"
                      }
                  ]
              },
              {
                  "id": 42,
                  "title": "Going shopping",
                  "words": [
                      {
                          "word": "style",
                          "translate": "phong cách",
                          "phonetic": "/staɪl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/style.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/style.mp3"
                      },
                      {
                          "word": "tight",
                          "translate": "chật",
                          "phonetic": "/taɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/tight.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/tight.mp3"
                      },
                      {
                          "word": "changing room",
                          "translate": "phòng thay đồ",
                          "phonetic": "/ˈtʃeɪndʒɪŋ/ /ruːm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/changing_room.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/changing_room.mp3"
                      },
                      {
                          "word": "evening wear",
                          "translate": "đồ dạ hội",
                          "phonetic": "/ˈiːvnɪŋ/ /wer/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/evening_wear.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/evening_wear.mp3"
                      },
                      {
                          "word": "look for",
                          "translate": "tìm kiếm",
                          "phonetic": "/lʊk/ /fɔːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/look_for.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/look_for.mp3"
                      }
                  ]
              },
              {
                  "id": 43,
                  "title": "Booking a hotel room",
                  "words": [
                      {
                          "word": "vacancy",
                          "translate": "phòng trống, chỗ trống",
                          "phonetic": "/ˈveɪkənsi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/vacancy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/vacancy.mp3"
                      },
                      {
                          "word": "reservation",
                          "translate": "sự đặt chỗ trước",
                          "phonetic": "/ˌrezərˈveɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/make_a_reservation.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/reservation.mp3"
                      },
                      {
                          "word": "double room",
                          "translate": "phòng đôi",
                          "phonetic": "/ˈdʌbl/ /rʊm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_double_room.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_double_room.mp3"
                      },
                      {
                          "word": "single room",
                          "translate": "phòng đơn",
                          "phonetic": "/ˈsɪŋɡl/ /rʊm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_single_room.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_single_room.mp3"
                      },
                      {
                          "word": "detailed information",
                          "translate": "thông tin chi tiết",
                          "phonetic": "/dɪˈteɪld/ /ˌɪnfərˈmeɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/detailed_information.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/detailed_information.mp3"
                      }
                  ]
              },
              {
                  "id": 45,
                  "title": "At the bank",
                  "words": [
                      {
                          "word": "make a transfer",
                          "translate": "chuyển tiền",
                          "phonetic": "/meɪk/ /ə/ /trænsˈfɜːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/make_a_transfer.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/make_a_transfer.mp3"
                      },
                      {
                          "word": "checking account",
                          "translate": "tài khoản thanh toán",
                          "phonetic": "/ˈtʃekɪŋ/ /əˈkaʊnt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/checking_account.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/checking_account.mp3"
                      },
                      {
                          "word": "account number",
                          "translate": "số tài khoản",
                          "phonetic": "/əˈkaʊnt/ /ˈnʌmbər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/account_number.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/account_number.mp3"
                      },
                      {
                          "word": "recipient",
                          "translate": "người nhận",
                          "phonetic": "/rɪˈsɪpiənt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/recipient.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/recipient.mp3"
                      },
                      {
                          "word": "process",
                          "translate": "xử lý",
                          "phonetic": "/ˈprɑːses/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/process.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/process.mp3"
                      },
                      {
                          "word": "complete",
                          "translate": "hoàn thành",
                          "phonetic": "/kəmˈpliːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/complete.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/complete.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 27,
          "title": "Expressing ideas",
          "description": "Từ vựng để bày tỏ các ý kiến cá nhân",
          "topics": [
              {
                  "id": 16,
                  "title": "Asking and giving opinions",
                  "words": [
                      {
                          "word": "hospitable",
                          "translate": "mến khách",
                          "phonetic": "/ˈhɑːspɪtəbl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/hospitable.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/hospitable.mp3"
                      },
                      {
                          "word": "local people",
                          "translate": "người dân địa phương",
                          "phonetic": "/ˈloʊkl/ /ˈpiːpl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/local_people.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/local_people.mp3"
                      },
                      {
                          "word": "overcrowded",
                          "translate": "đông đúc",
                          "phonetic": "/ˌoʊvərˈkraʊdɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/overcrowded.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/overcrowded.mp3"
                      },
                      {
                          "word": "chaotic",
                          "translate": "lộn xộn, hỗn loạn",
                          "phonetic": "/keɪˈɑːtɪk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/chaotic.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/chaotic.mp3"
                      }
                  ]
              },
              {
                  "id": 17,
                  "title": "Asking and giving advice",
                  "words": [
                      {
                          "word": "appreciate",
                          "translate": "trân trọng",
                          "phonetic": "/əˈpriːʃieɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/appreciate.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/appreciate.mp3"
                      },
                      {
                          "word": "unsure about",
                          "translate": "không chắc chắn",
                          "phonetic": "/ˌʌnˈʃʊr/ /əˈbaʊt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/unsure_about.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/unsure_about.mp3"
                      },
                      {
                          "word": "well-paid",
                          "translate": "được trả lương hậu hĩnh",
                          "phonetic": "/ˌwel ˈpeɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/well_paid.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/well_paid.mp3"
                      },
                      {
                          "word": "advice",
                          "translate": "lời khuyên",
                          "phonetic": "/ədˈvaɪs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_piece_of_advice.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/advice.mp3"
                      }
                  ]
              },
              {
                  "id": 18,
                  "title": "Showing Sympathy",
                  "words": [
                      {
                          "word": "pass away",
                          "translate": "qua đời",
                          "phonetic": "/pæs/ /əˈweɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/pass_away.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/pass_away.mp3"
                      },
                      {
                          "word": "loss",
                          "translate": "sự mất mát",
                          "phonetic": "/lɔːs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/loss.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/loss.mp3"
                      },
                      {
                          "word": "upset",
                          "translate": "buồn bã",
                          "phonetic": "/ʌpˈset/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/upset.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/upset.mp3"
                      }
                  ]
              },
              {
                  "id": 19,
                  "title": "Making a complaint",
                  "words": [
                      {
                          "word": "ridiculous",
                          "translate": "kỳ cục",
                          "phonetic": "/rɪˈdɪkjələs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/ridiculous.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/ridiculous.mp3"
                      },
                      {
                          "word": "order",
                          "translate": "đơn đặt hàng, thứ tự sắp xếp",
                          "phonetic": "/ˈɔːrdər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/place_an_order.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/order.mp3"
                      },
                      {
                          "word": "refund",
                          "translate": "sự hoàn tiền",
                          "phonetic": "/ˈriːfʌnd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/refund.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/refund.mp3"
                      },
                      {
                          "word": "apology",
                          "translate": "lời xin lỗi",
                          "phonetic": "/əˈpɑːlədʒi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/apology.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/apology.mp3"
                      },
                      {
                          "word": "poor service",
                          "translate": "dịch vụ kém",
                          "phonetic": "/pʊr/ /ˈsɜːrvɪs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/poor_service.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/poor_service.mp3"
                      }
                  ]
              },
              {
                  "id": 20,
                  "title": "Making a request",
                  "words": [
                      {
                          "word": "comfortable",
                          "translate": "thoải mái",
                          "phonetic": "/ˈkʌmfərtəbl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/comfortable.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/comfortable.mp3"
                      },
                      {
                          "word": "do a favor",
                          "translate": "giúp đỡ",
                          "phonetic": "/duː/ /ə/ /ˈfeɪvər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/do_a_favor.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/do_a_favor.mp3"
                      },
                      {
                          "word": "grateful",
                          "translate": "biết ơn",
                          "phonetic": "/ˈɡreɪtfl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/grateful.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/grateful.mp3"
                      },
                      {
                          "word": "request",
                          "translate": "yêu cầu",
                          "phonetic": "/rɪˈkwest/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/make_a_request.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/request.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 28,
          "title": "Travel & Transportation",
          "description": "Từ vựng về du lịch và các phương tiện giao thông",
          "topics": [
              {
                  "id": 36,
                  "title": "Asking and giving directions ",
                  "words": [
                      {
                          "word": "intersection",
                          "translate": "ngã tư",
                          "phonetic": "/ˌɪntərˈsekʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/intersection.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/intersection.mp3"
                      },
                      {
                          "word": "roundabout",
                          "translate": "vòng xuyến",
                          "phonetic": "/ˈraʊndəbaʊt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/roundabout.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/roundabout.mp3"
                      },
                      {
                          "word": "opposite",
                          "translate": "đối diện",
                          "phonetic": "/ˈɑːpəzət/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/opposite.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/opposite.mp3"
                      },
                      {
                          "word": "get lost",
                          "translate": "lạc đường",
                          "phonetic": "/ɡet/ /lɔːst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/get_lost.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/get_lost.mp3"
                      }
                  ]
              },
              {
                  "id": 37,
                  "title": "Catch a taxi",
                  "words": [
                      {
                          "word": "airport",
                          "translate": "sân bay",
                          "phonetic": "/ˈerpɔːrt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/airport.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/airport.mp3"
                      },
                      {
                          "word": "traffic congestion",
                          "translate": "tắc nghẽn giao thông",
                          "phonetic": "/ˈtræfɪk/ /kənˈdʒestʃən/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/traffic_congestion.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/traffic_congestion.mp3"
                      },
                      {
                          "word": "fare",
                          "translate": "tiền xe, tiền vé",
                          "phonetic": "/fer/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/fare.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/fare.mp3"
                      },
                      {
                          "word": "roughly",
                          "translate": "xấp xỉ",
                          "phonetic": "/ˈrʌfli/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/roughly.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/roughly.mp3"
                      }
                  ]
              },
              {
                  "id": 38,
                  "title": "At the train station",
                  "words": [
                      {
                          "word": "return ticket",
                          "translate": "vé khứ hồi",
                          "phonetic": "/rɪˈtɜːrn/ /ˈtɪkɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_return_ticket.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_return_ticket.mp3"
                      },
                      {
                          "word": "one-way ticket",
                          "translate": "vé một chiều",
                          "phonetic": "/ˈwʌnˈweɪ/ /ˈtɪkɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_one_way_ticket.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_one_way_ticket.mp3"
                      },
                      {
                          "word": "credit card",
                          "translate": "thẻ tín dụng",
                          "phonetic": "/ˈkrɛdət/ /kɑrd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/credit_card.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/credit_card.mp3"
                      },
                      {
                          "word": "receipt",
                          "translate": "hóa đơn",
                          "phonetic": "/rɪˈsiːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/receipt.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/receipt.mp3"
                      },
                      {
                          "word": "seat number",
                          "translate": "số ghế ngồi",
                          "phonetic": "/siːt/ /ˈnʌmbər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/seat_number.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/seat_number.mp3"
                      }
                  ]
              },
              {
                  "id": 39,
                  "title": "At the airport ",
                  "words": [
                      {
                          "word": "passport",
                          "translate": "hộ chiếu",
                          "phonetic": "/ˈpæspɔːrt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/passport.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/passport.mp3"
                      },
                      {
                          "word": "luggage",
                          "translate": "hành lý",
                          "phonetic": "/ˈlʌɡɪdʒ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/luggage.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/luggage.mp3"
                      },
                      {
                          "word": "aisle seat",
                          "translate": "ghế cạnh lối đi",
                          "phonetic": "/aɪl/ /siːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/aisle_seat.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/aisle_seat.mp3"
                      },
                      {
                          "word": "window seat",
                          "translate": "ghế cạnh cửa sổ",
                          "phonetic": "/ˈwɪndoʊ/ /siːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/window_seat.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/window_seat.mp3"
                      },
                      {
                          "word": "boarding",
                          "translate": "lên máy bay",
                          "phonetic": "/ˈbɔːrdɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/boarding.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/boarding.mp3"
                      },
                      {
                          "word": "take off",
                          "translate": "cất cánh",
                          "phonetic": "/teɪk/ /ɔːf/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/take_off.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/take_off.mp3"
                      }
                  ]
              },
              {
                  "id": 40,
                  "title": "Traffic jam",
                  "words": [
                      {
                          "word": "frustrating",
                          "translate": "gây bực mình",
                          "phonetic": "/frʌˈstreɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/frustrating.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/frustrating.mp3"
                      },
                      {
                          "word": "stuck",
                          "translate": "mắc kẹt",
                          "phonetic": "/stʌk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/stuck.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/stuck.mp3"
                      },
                      {
                          "word": "traffic jam",
                          "translate": "tắc đường",
                          "phonetic": "/ˈtræfɪk/ /ʤæm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/traffic_jam.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/traffic_jam.mp3"
                      },
                      {
                          "word": "rush hour",
                          "translate": "giờ cao điểm",
                          "phonetic": "/rʌʃ/ /ˈaʊər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/rush_hour.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/rush_hour.mp3"
                      },
                      {
                          "word": "gridlock",
                          "translate": "bị kẹt cứng",
                          "phonetic": "/ˈɡrɪdlɑːk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/gridlock.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/gridlock.mp3"
                      },
                      {
                          "word": "route",
                          "translate": "tuyến đường",
                          "phonetic": "/ruːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/route.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/route.mp3"
                      }
                  ]
              },
              {
                  "id": 44,
                  "title": "Tourism",
                  "words": [
                      {
                          "word": "postcard",
                          "translate": "bưu thiếp",
                          "phonetic": "/ˈpoʊstkɑːrd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/postcard.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/postcard.mp3"
                      },
                      {
                          "word": "exhibition",
                          "translate": "buổi triển lãm",
                          "phonetic": "/ˌeksɪˈbɪʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/exhibition.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/exhibition.mp3"
                      },
                      {
                          "word": "admission fee",
                          "translate": "phí vào cửa",
                          "phonetic": "/ədˈmɪʃn/ /fiː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/admission_fee.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/admission_fee.mp3"
                      },
                      {
                          "word": "concession fee",
                          "translate": "phí vào cửa đặc biệt (cho sinh viên, trẻ nhỏ, người già)",
                          "phonetic": "/kənˈseʃn/ /fiː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/concession_fee.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/concession_fee.mp3"
                      },
                      {
                          "word": "attraction",
                          "translate": "địa điểm hấp dẫn",
                          "phonetic": "/əˈtrækʃn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/attraction.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/attraction.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 29,
          "title": "Schools",
          "description": "Từ vựng về trường học",
          "topics": [
              {
                  "id": 51,
                  "title": "Registering for a class",
                  "words": [
                      {
                          "word": "register for",
                          "translate": "đăng kí",
                          "phonetic": "/ˈredʒɪstər/ /fɔːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/register_for.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/register_for.mp3"
                      },
                      {
                          "word": "psychology class",
                          "translate": "lớp Tâm lý học",
                          "phonetic": "/saɪˈkɑːlədʒi/ /klæs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/Psychology_class.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/Psychology_class.mp3"
                      },
                      {
                          "word": "sign up",
                          "translate": "đăng kí",
                          "phonetic": "/saɪn/ /ʌp/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sign_up.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sign_up.mp3"
                      },
                      {
                          "word": "available",
                          "translate": "sẵn có",
                          "phonetic": "/əˈveɪləbl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/available.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/available.mp3"
                      },
                      {
                          "word": "suitable",
                          "translate": "phù hợp",
                          "phonetic": "/ˈsuːtəbl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/suitable.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/suitable.mp3"
                      }
                  ]
              },
              {
                  "id": 52,
                  "title": "In the classroom",
                  "words": [
                      {
                          "word": "classmate",
                          "translate": "bạn cùng lớp",
                          "phonetic": "/ˈklæsmeɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/classmate.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/classmate.mp3"
                      },
                      {
                          "word": "take notes",
                          "translate": "ghi chép bài",
                          "phonetic": "/teɪk/ /noʊts/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/take_notes.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/take_notes.mp3"
                      },
                      {
                          "word": "lecture",
                          "translate": "bài giảng",
                          "phonetic": "/ˈlektʃər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/lecture.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/lecture.mp3"
                      }
                  ]
              },
              {
                  "id": 54,
                  "title": "Extra curricular activities",
                  "words": [
                      {
                          "word": "club",
                          "translate": "câu lạc bộ",
                          "phonetic": "/klʌb/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/club.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/club.mp3"
                      },
                      {
                          "word": "volunteer",
                          "translate": "tình nguyện",
                          "phonetic": "/ˌvɑːlənˈtɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/volunteer.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/volunteer.mp3"
                      },
                      {
                          "word": "rewarding",
                          "translate": "đáng để",
                          "phonetic": "/rɪˈwɔːrdɪŋ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/rewarding.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/rewarding.mp3"
                      },
                      {
                          "word": "participate",
                          "translate": "tham gia",
                          "phonetic": "/pɑːrˈtɪsɪpeɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/participate.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/participate.mp3"
                      }
                  ]
              },
              {
                  "id": 55,
                  "title": "Examination ",
                  "words": [
                      {
                          "word": "review",
                          "translate": "ôn tập",
                          "phonetic": "/rɪˈvjuː/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/review.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/review.mp3"
                      },
                      {
                          "word": "textbook",
                          "translate": "sách giáo khoa",
                          "phonetic": "/ˈtekstbʊk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/textbook.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/textbook.mp3"
                      },
                      {
                          "word": "materials",
                          "translate": "tài liệu",
                          "phonetic": "/məˈtɪriəlz/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/materials.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/materials.mp3"
                      },
                      {
                          "word": "borrow",
                          "translate": "mượn",
                          "phonetic": "ˈbɑːroʊ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/borrow.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/borrow.mp3"
                      },
                      {
                          "word": "lend",
                          "translate": "cho mượn",
                          "phonetic": "/lend/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/lend.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/lend.mp3"
                      }
                  ]
              },
              {
                  "id": 60,
                  "title": "Graduation",
                  "words": [
                      {
                          "word": "graduate",
                          "translate": "tốt nghiệp",
                          "phonetic": "/ˈɡrædʒuət/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/graduate.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/graduate.mp3"
                      },
                      {
                          "word": "apply for",
                          "translate": "ứng tuyển",
                          "phonetic": "/əˈplaɪ/ /fɔːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/apply_for.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/apply_for.mp3"
                      },
                      {
                          "word": "prepare for",
                          "translate": "chuẩn bị",
                          "phonetic": "/prɪˈper/ /fɔːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/prepare_for.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/prepare_for.mp3"
                      },
                      {
                          "word": "study abroad",
                          "translate": "du học",
                          "phonetic": "/ˈstʌdi/ /əˈbrɔːd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/study_abroad.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/study_abroad.mp3"
                      },
                      {
                          "word": "proud",
                          "translate": "tự hào",
                          "phonetic": "/praʊd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/proud.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/proud.mp3"
                      },
                      {
                          "word": "career",
                          "translate": "sự nghiệp",
                          "phonetic": "/kəˈrɪr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/career.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/career.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 30,
          "title": "Health",
          "description": "Từ vựng về sức khỏe",
          "topics": [
              {
                  "id": 46,
                  "title": "Making an emergency call",
                  "words": [
                      {
                          "word": "fall off",
                          "translate": "ngã xuống",
                          "phonetic": "/fɔːl/ /ɔːf/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/fall_off.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/fall_off.mp3"
                      },
                      {
                          "word": "calm down",
                          "translate": "bình tĩnh lại",
                          "phonetic": "/kɑːm/ /daʊn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/calm_down.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/calm_down.mp3"
                      },
                      {
                          "word": "ambulance",
                          "translate": "xe cứu thương",
                          "phonetic": "/ˈæmbjələns/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/ambulance.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/ambulance.mp3"
                      },
                      {
                          "word": "critical",
                          "translate": "nguy kịch",
                          "phonetic": "/ˈkrɪtɪkl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/critical.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/critical.mp3"
                      }
                  ]
              },
              {
                  "id": 47,
                  "title": "At the hospital",
                  "words": [
                      {
                          "word": "swollen",
                          "translate": "bị sưng",
                          "phonetic": "/ˈswoʊlən/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/swollen.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/swollen.mp3"
                      },
                      {
                          "word": "pain relief medicine",
                          "translate": "thuốc giảm đau",
                          "phonetic": "/peɪn/ /rɪˈliːf/ /ˈmedɪsn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/pain_relief_medicine.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/pain_relief_medicine.mp3"
                      },
                      {
                          "word": "heal",
                          "translate": "chữa lành",
                          "phonetic": "/hiːl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/heal.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/heal.mp3"
                      },
                      {
                          "word": "cast",
                          "translate": "băng bó bột",
                          "phonetic": "/kæst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/cast.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/cast.mp3"
                      }
                  ]
              },
              {
                  "id": 48,
                  "title": "Seeing a doctor",
                  "words": [
                      {
                          "word": "a sore throat",
                          "translate": "đau họng",
                          "phonetic": "/ə/ /sɔːr/ /θroʊt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_sore_throat.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_sore_throat.mp3"
                      },
                      {
                          "word": "a bad cough",
                          "translate": "cơn ho nặng",
                          "phonetic": "/ə/ /bæd/ /kɔːf/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_bad_cough.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_bad_cough.mp3"
                      },
                      {
                          "word": "symptom",
                          "translate": "triệu chứng",
                          "phonetic": "/ˈsɪmptəm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/symptom.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/symptom.mp3"
                      },
                      {
                          "word": "a cold",
                          "translate": "cảm lạnh",
                          "phonetic": "/ə/ /koʊld/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/a_cold.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/a_cold.mp3"
                      }
                  ]
              },
              {
                  "id": 49,
                  "title": "Stay healthy and keep fit",
                  "words": [
                      {
                          "word": "avoid",
                          "translate": "tránh",
                          "phonetic": "/əˈvɔɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/avoid.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/avoid.mp3"
                      },
                      {
                          "word": "whole grains",
                          "translate": "ngũ cốc",
                          "phonetic": "/hoʊl/ /greɪnz/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/whole_grains.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/whole_grains.mp3"
                      },
                      {
                          "word": "balanced diet",
                          "translate": "chế độ ăn cân bằng",
                          "phonetic": "/ˈbælənst/ /ˈdaɪət/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/balanced_diet.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/balanced_diet.mp3"
                      },
                      {
                          "word": "physical exercise",
                          "translate": "bài tập thể dục",
                          "phonetic": "/ˈfɪzɪkl/ /ˈeksərsaɪz/ ",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/physical_exercise.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/physical_exercise.mp3"
                      },
                      {
                          "word": "stay healthy",
                          "translate": "khỏe mạnh",
                          "phonetic": "/steɪ/ /ˈhelθi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/stay_healthy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/stay_healthy.mp3"
                      },
                      {
                          "word": "keep fit",
                          "translate": "giữ cơ thể cân đối",
                          "phonetic": "/kiːp/ /fɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/keep_fit.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/keep_fit.mp3"
                      }
                  ]
              },
              {
                  "id": 50,
                  "title": "On a diet",
                  "words": [
                      {
                          "word": "low-carb",
                          "translate": "ít tinh bột (chế độ ăn)",
                          "phonetic": "/loʊ kɑːrb/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/low_carb.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/low_carb.mp3"
                      },
                      {
                          "word": "determined",
                          "translate": "quyết tâm",
                          "phonetic": "/dɪˈtɜːrmɪnd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/determined.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/determined.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 31,
          "title": "Special days",
          "description": "Từ vựng về các ngày lễ đặc biệt",
          "topics": [
              {
                  "id": 56,
                  "title": "Birthday party ",
                  "words": [
                      {
                          "word": "present",
                          "translate": "món quà",
                          "phonetic": "/ˈpreznt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/present.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/present.mp3"
                      },
                      {
                          "word": "necklace",
                          "translate": "dây chuyền",
                          "phonetic": "/ˈnɛkləs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/necklace.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/necklace.mp3"
                      },
                      {
                          "word": "thoughtful",
                          "translate": "chu đáo",
                          "phonetic": "/ˈθɔːtfl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/thoughtful.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/thoughtful.mp3"
                      }
                  ]
              },
              {
                  "id": 57,
                  "title": "Vacations ",
                  "words": [
                      {
                          "word": "visit",
                          "translate": "thăm",
                          "phonetic": "/ˈvɪzɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/visit.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/visit.mp3"
                      },
                      {
                          "word": "discover",
                          "translate": "khám phá",
                          "phonetic": "/dɪˈskʌvər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/discover.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/discover.mp3"
                      },
                      {
                          "word": "magical",
                          "translate": "tuyệt diệu",
                          "phonetic": "/ˈmædʒɪkl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/magical_place.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/magical.mp3"
                      }
                  ]
              },
              {
                  "id": 58,
                  "title": "Tet holiday",
                  "words": [
                      {
                          "word": "blossom",
                          "translate": "cây hoa đào",
                          "phonetic": "/ˈblɑːsəm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/blossom.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/blossom.mp3"
                      },
                      {
                          "word": "apricot",
                          "translate": "cây hoa mai",
                          "phonetic": "/ˈæprɪkɑːt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/apricot.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/apricot.mp3"
                      },
                      {
                          "word": "sticky rice cake",
                          "translate": "bánh chưng",
                          "phonetic": "/ˈstɪki/ /raɪs/ /keɪk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sticky_rice_cake.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sticky_rice_cake.mp3"
                      },
                      {
                          "word": "decorate",
                          "translate": "trang trí",
                          "phonetic": "/ˈdekəreɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/decorate.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/decorate.mp3"
                      },
                      {
                          "word": "traditional food",
                          "translate": "món ăn truyền thống",
                          "phonetic": "/trəˈdɪʃənl/ /fuːd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/traditional_food.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/traditional_food.mp3"
                      },
                      {
                          "word": "pray",
                          "translate": "cầu nguyện",
                          "phonetic": "/preɪ/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/pray_to_ancestors.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/pray.mp3"
                      }
                  ]
              },
              {
                  "id": 59,
                  "title": "Wedding",
                  "words": [
                      {
                          "word": "bride",
                          "translate": "cô dâu",
                          "phonetic": "/braɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/bride.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/bride.mp3"
                      },
                      {
                          "word": "bridesmaid",
                          "translate": "phù dâu",
                          "phonetic": "/ˈbraɪdzmeɪd/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/bridesmaid.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/bridesmaid.mp3"
                      },
                      {
                          "word": "groom",
                          "translate": "chú rể",
                          "phonetic": "/ɡruːm/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/groom.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/groom.mp3"
                      },
                      {
                          "word": "honeymoon",
                          "translate": "tuần trăng mật",
                          "phonetic": "/ˈhʌnimuːn/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/honeymoon.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/honeymoon.mp3"
                      },
                      {
                          "word": "romantic",
                          "translate": "lãng mạn",
                          "phonetic": "/roʊˈmæntɪk/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/romantic.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/romantic.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      },
      {
          "id": 32,
          "title": "Other",
          "description": "Các chủ đề khác",
          "topics": [
              {
                  "id": 11,
                  "title": "What time is it?",
                  "words": [
                      {
                          "word": "busy",
                          "translate": "bận rộn",
                          "phonetic": "/ˈbɪzi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/busy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/busy.mp3"
                      }
                  ]
              },
              {
                  "id": 12,
                  "title": "Weather",
                  "words": [
                      {
                          "word": "sunny",
                          "translate": "có nắng",
                          "phonetic": "/ˈsʌni/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sunny.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sunny.mp3"
                      },
                      {
                          "word": "weather forecast",
                          "translate": "dự báo thời tiết",
                          "phonetic": "/ˈweðər/ /ˈfɔːrkæst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/weather_forecast.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/weather_forecast.mp3"
                      },
                      {
                          "word": "brighten up",
                          "translate": "hửng nắng",
                          "phonetic": "/ˈbraɪtn/ /ʌp/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/brighten_up.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/brighten_up.mp3"
                      },
                      {
                          "word": "windy",
                          "translate": "có gió",
                          "phonetic": "/ˈwɪndi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/windy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/windy.mp3"
                      },
                      {
                          "word": "snowy",
                          "translate": "có tuyết",
                          "phonetic": "/ˈsnoʊi/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/snowy.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/snowy.mp3"
                      }
                  ]
              },
              {
                  "id": 35,
                  "title": "Recipe",
                  "words": [
                      {
                          "word": "sauce",
                          "translate": "nước sốt",
                          "phonetic": "/sɔːs/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sauce.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sauce.mp3"
                      },
                      {
                          "word": "flour",
                          "translate": "bột mì",
                          "phonetic": "/ˈflaʊər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/flour.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/flour.mp3"
                      },
                      {
                          "word": "boil",
                          "translate": "luộc, đun sôi",
                          "phonetic": "/bɔɪl/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/boil.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/boil.mp3"
                      },
                      {
                          "word": "stir",
                          "translate": "đảo, khuấy",
                          "phonetic": "/stɜːr/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/stir.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/stir.mp3"
                      },
                      {
                          "word": "melt",
                          "translate": "tan chảy",
                          "phonetic": "/melt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/melt.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/melt.mp3"
                      }
                  ]
              },
              {
                  "id": 53,
                  "title": "Going camping",
                  "words": [
                      {
                          "word": "pitch a tent",
                          "translate": "dựng trại, dựng lều",
                          "phonetic": "/pɪʧ/ /ə/ /tent/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/pitch_a_tent.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/pitch_a_tent.mp3"
                      },
                      {
                          "word": "rainforest",
                          "translate": "rừng mưa nhiệt đới",
                          "phonetic": "/ˈreɪnfɔːrɪst/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/rainforest.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/rainforest.mp3"
                      },
                      {
                          "word": "campsite",
                          "translate": "khu vực cắm trại",
                          "phonetic": "/ˈkæmpsaɪt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/campsite.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/campsite.mp3"
                      },
                      {
                          "word": "campfire",
                          "translate": "lửa trại",
                          "phonetic": "/ˈkæmpfaɪər/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/campfire.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/campfire.mp3"
                      },
                      {
                          "word": "sleeping bag",
                          "translate": "túi ngủ",
                          "phonetic": "/ˈsliːpɪŋ/ /bæg/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/sleeping_bag.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/sleeping_bag.mp3"
                      },
                      {
                          "word": "insect repellent",
                          "translate": "bình xịt côn trùng",
                          "phonetic": "/ˈɪnsekt/ /rɪˈpelənt/",
                          "image": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/question/Image/Tiếng anh giao tiếp cơ bản/insect_repellant.png",
                          "audio": "https://s3-ap-northeast-1.amazonaws.com/elifile/public/audios/question/Audio/Tiếng anh giao tiếp cơ bản/Từ/insect_repellant.mp3"
                      }
                  ]
              }
          ],
          "type": 4
      }
  ],
  streak_data = {
      "vn" : [
          {
              day : 0,
              image : "assets/images/streak/0-streak.png",
              congrat : "You got a seed!",
              info_before : "Hãy ươm hạt giống tiếng Anh của bạn bằng cách học một bài nào",
              info_after : 'Hãy học thêm 1 ngày nữa để cây của bạn nảy mầm nào?'
          },
          {
              day : 1,
              image : "assets/images/streak/1-streak.png",
              congrat : "You won a sprout!",
              info_before : 'Hãy hoàn thành bài học hôm nay để nhận được "mầm cây" nhé',
              info_after : 'Hãy học thêm 1 ngày nữa để nhận được cây tí hon nhé'
          },
          {
              day : 2,
              image : "assets/images/streak/1-streak.png",
              congrat : "Your sprout looks a little bigger now",
              info_before : 'Còn hai ngày học liên tục nữa để nhận được "cây tí hon"',
              info_after : 'Hãy học một 1 ngày nữa để nhận được "cây tí hon", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 3,
              image : "assets/images/streak/3-streak.png",
              congrat : "You won a tiny tree!",
              info_before : 'Hãy hoàn thành bài học hôm nay để nhận được "cây tí hon" nhé',
              info_after : 'Hãy học thêm 3 ngày nữa để nhận được "cây nhi đồng", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 4,
              image : "assets/images/streak/3-streak.png",
              congrat : "You made it!",
              info_before : 'Còn 3 ngày học liên tục để nhận được "cây nhi đồng"',
              info_after : 'Hãy học thêm 2 ngày nữa để nhận được "cây nhi đồng", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 5,
              image : "assets/images/streak/3-streak.png",
              congrat : "You nailed it!",
              info_before : 'Còn 2 ngày học liên tục để nhận được "cây nhi đồng",',
              info_after : 'Hãy học một 1 ngày nữa để nhận được "cây nhi đồng", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 6,
              image : "assets/images/streak/6-streak.png",
              congrat : 'What a lovely tree you have!',
              info_before : 'Hãy hoàn thành bài học hôm nay để nhận được "cây nhi đồng" nhé',
              info_after : 'Hãy học một thêm 4 ngày nữa để nhận được "cây thiếu niên", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 7,
              image : "assets/images/streak/6-streak.png",
              congrat : 'Your tree must be happy now',
              info_before : 'Còn 4 ngày học liên tục để nhận được "cây thiếu niên"',
              info_after : 'Hãy học thêm 3 ngày nữa để nhận được "cây thiếu niên", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 8,
              image : "assets/images/streak/6-streak.png",
              congrat : 'Your tree looks a little bigger',
              info_before : 'Còn 3 ngày học liên tục để nhận được "cây thiếu niên"',
              info_after : 'Hãy học thêm 2 ngày nữa để nhận được "cây thiếu niên", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 9,
              image : "assets/images/streak/6-streak.png",
              congrat : 'Your tree has grown a lot',
              info_before : 'Chỉ còn  2 ngày học liên tục để nhận được "cây thiếu niên"',
              info_after : 'Hãy học thêm 1 ngày nữa để nhận được "cây thiếu niên", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 10,
              image : "assets/images/streak/10-streak.png",
              congrat : 'You won a minimum tree!',
              info_before : 'Hãy hoàn thành bài học hôm nay để nhận được "cây thiếu niên" nhé',
              info_after : 'Hãy học thêm 5 ngày nữa để nhận được "cây trưởng thành", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 11,
              image : "assets/images/streak/10-streak.png",
              congrat : 'You nailed it!',
              info_before : 'Còn 5 ngày học liên tục để nhận được "cây trưởng thành" nha',
              info_after : 'Hãy học thêm 4 ngày nữa để nhận được "cây trưởng thành", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 12,
              image : "assets/images/streak/10-streak.png",
              congrat : 'Your tree has grown very fast',
              info_before : 'Còn 4 ngày học liên tục để nhận được "cây trưởng thành" nha',
              info_after : 'Hãy học thêm 3 ngày nữa để nhận được "cây trưởng thành", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 13,
              image : "assets/images/streak/10-streak.png",
              congrat : 'Your tree has grown a lot',
              info_before : 'Còn 3 ngày học liên tục để nhận được "cây trưởng thành" nha',
              info_after : 'Hãy học thêm 2 ngày nữa để nhận được "cây trưởng thành", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 14,
              image : "assets/images/streak/10-streak.png",
              congrat : 'You naild it!',
              info_before : 'Chỉ còn  2 ngày học liên tục để nhận được "cây trưởng thành" nha',
              info_after : 'Hãy học thêm 1 ngày nữa để nhận được "cây trưởng thành", hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 15,
              image : "assets/images/streak/15-streak.png",
              congrat : 'You won a grown tree',
              info_before : 'Hãy hoàn thành bài học hôm nay để nhận được "cây trưởng thành" nhé',
              info_after : 'Hãy học thêm 6 ngày nữa để cây của bạn trổ hoa, hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 16,
              image : "assets/images/streak/15-streak.png",
              congrat : 'Your tree looks so much bigger',
              info_before : 'Còn 6 ngày học liên tục để nhận được "cây trổ hoa" nha',
              info_after : 'Hãy học thêm 5 ngày nữa để cây của bạn trổ hoa, hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 17,
              image : "assets/images/streak/15-streak.png",
              congrat : 'Your tree has grown a lot',
              info_before : 'Còn 5 ngày học liên tục để nhận được "cây trổ hoa" nha',
              info_after : 'Hãy học thêm 4 ngày nữa để cây của bạn trổ hoa, hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 18,
              image : "assets/images/streak/15-streak.png",
              congrat : 'You naild it!',
              info_before : 'Còn 4 ngày học liên tục để nhận được "cây trổ hoa" nha',
              info_after : 'Hãy học thêm 3 ngày nữa để cây của bạn trổ hoa, hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 19,
              image : "assets/images/streak/15-streak.png",
              congrat : 'Were you born to be a gardener',
              info_before : 'Còn 3 ngày học liên tục để nhận được "cây trổ hoa" nha',
              info_after : 'Hãy học thêm 2 ngày nữa để cây của bạn trổ hoa, hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 20,
              image : "assets/images/streak/15-streak.png",
              congrat : 'Your tree looks so much taller',
              info_before : 'Chỉ còn  2 ngày học liên tục để nhận được "cây trổ hoa" nha',
              info_after : 'Hãy học thêm 1 ngày nữa để cây của bạn trổ hoa, hẹn gặp bạn ngày mai nhé'
          },
          {
              day : 21,
              image : "assets/images/streak/21-streak.png",
              congrat : 'Your tree has bloomed beautifully',
              info_before : 'Hoàn thành bài học hôm nay là bạn sẽ nhận được "cây trổ hoa" nhé',
              info_after : 'Chỉ còn 7 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé'
          },
          {
              day : 22,
              image : "assets/images/streak/21-streak.png",
              congrat : 'You are so good at planting',
              info_before : 'Còn 7 ngày học liên tục để cây của bạn kết quả đó',
              info_after : 'Chỉ còn 6 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé'
          },
          {
              day : 23,
              image : "assets/images/streak/21-streak.png",
              congrat : 'You are a skillful gaderner',
              info_before : 'Còn 6 ngày học liên tục để cây của bạn kết quả đó',
              info_after : 'Chỉ còn 5 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé'
          },
          {
              day : 24,
              image : "assets/images/streak/21-streak.png",
              congrat : 'You did a good job',
              info_before : 'Còn 5 ngày học liên tục để cây của bạn kết quả đó',
              info_after : 'Chỉ còn 4 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé'
          },
          {
              day : 25,
              image : "assets/images/streak/21-streak.png",
              congrat : 'You naild it!',
              info_before : 'Còn 4 ngày học liên tục để cây của bạn kết quả đó',
              info_after : 'Chỉ còn 3 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé '
          },
          {
              day : 26,
              image : "assets/images/streak/21-streak.png",
              congrat : 'Were you born to be a gardener',
              info_before : 'Còn 3 ngày học liên tục để cây của bạn kết quả đó',
              info_after : 'Chỉ còn 2 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé'
          },
          {
              day : 27,
              image : "assets/images/streak/21-streak.png",
              congrat : 'Your tree looks so much prettier',
              info_before : 'Chỉ còn 2 ngày học liên tục để cây của bạn kết quả đó',
              info_after : 'Chỉ còn 1 ngày học nữa là cây của bạn kết quả rồi đó, đừng quên nhé'
          },
          {
              day : 28,
              image : "assets/images/streak/28-streak.png",
              congrat : 'You deserve these fruits!',
              info_before : 'Hoàn thành bài học hôm nay là bạn nhận được "cây kết quả" rồi',
              info_after : 'Chúc mừng bạn, bạn đã trở thành "Thần cây tiếng Anh" rồi đó. Hãy thưởng thức các trái táo tươi ngon nhé'
          },
      ],
      "por" : [
            {
                "day": "0",
                "image": "assets/images/streak/0-streak.png",
                "congrat": "You got a seed!",
                "info_before": "germinando essa semente",
                "info_after": " à medida que vai avançando",
                "": " por mais um dia. Como será que as raízes de sua planta florescerão ?"
            },
            {
                "day": "1",
                "image": "assets/images/streak/1-streak.png",
                "congrat": "You won a sprout!",
                "info_before": "complete a lição de hoje",
                "info_after": " para poder ganhar sua muda",
                "": " para ganhar uma mudinha"
            },
            {
                "day": "2",
                "image": "assets/images/streak/1-streak.png",
                "congrat": "Your sprout looks a little bigger now",
                "info_before": "continue aprendendo",
                "info_after": " por mais 2 dias",
                "": " um pouco maior"
            },
            {
                "day": "3",
                "image": "assets/images/streak/3-streak.png",
                "congrat": "You won a tiny tree!",
                "info_before": "complete a lição atual",
                "info_after": " para fazer sua muda crescer",
                "": " por mais 3 dias"
            },
            {
                "day": "4",
                "image": "assets/images/streak/3-streak.png",
                "congrat": "You made it!",
                "info_before": "continue aprendendo",
                "info_after": " por 3 dias",
                "": " por mais 2 dias"
            },
            {
                "day": "5",
                "image": "assets/images/streak/3-streak.png",
                "congrat": "You nailed it!",
                "info_before": "continue aprendendo",
                "info_after": " por 2 dias",
                "": " por mais 1 dia"
            },
            {
                "day": "6",
                "image": "assets/images/streak/6-streak.png",
                "congrat": "What a lovely tree you have!",
                "info_before": "complete  a lição de hoje",
                "info_after": " para ganhar a ",
                "": " para ganhar a planta infantojuvenil. até amanhã "
            },
            {
                "day": "7",
                "image": "assets/images/streak/6-streak.png",
                "congrat": "Your tree must be happy now",
                "info_before": "continue aprendendo",
                "info_after": " por 4 dias",
                "": " por mais 3 dias"
            },
            {
                "day": "8",
                "image": "assets/images/streak/6-streak.png",
                "congrat": "Your tree looks a little bigger",
                "info_before": "continue aprendendo",
                "info_after": " por 3 dias",
                "": " por mais 2 dias"
            },
            {
                "day": "9",
                "image": "assets/images/streak/6-streak.png",
                "congrat": "Your tree has grown a lot",
                "info_before": "continue aprendendo",
                "info_after": " por 2 dias",
                "": " por mais 1 dia"
            },
            {
                "day": "10",
                "image": "assets/images/streak/10-streak.png",
                "congrat": "You won a minimum tree!",
                "info_before": "complete a lição de hoje",
                "info_after": " para ganhar a ",
                "": " para ganhar a árvore"
            },
            {
                "day": "11",
                "image": "assets/images/streak/10-streak.png",
                "congrat": "You nailed it!",
                "info_before": "continue a aprender",
                "info_after": " por mais 5 dias",
                "": " por mais 4 dias"
            },
            {
                "day": "12",
                "image": "assets/images/streak/10-streak.png",
                "congrat": "Your tree has grown very fast",
                "info_before": "continue a aprender",
                "info_after": " por mais 4 dias",
                "": " por mais 3 dias"
            },
            {
                "day": "13",
                "image": "assets/images/streak/10-streak.png",
                "congrat": "Your tree has grown a lot",
                "info_before": "continue a aprender",
                "info_after": " por mais 3 dias",
                "": " por mais 2 dias"
            },
            {
                "day": "14",
                "image": "assets/images/streak/10-streak.png",
                "congrat": "You naild it!",
                "info_before": "continue a aprender",
                "info_after": " por mais 2 dias",
                "": " por mais 1 dia"
            },
            {
                "day": "15",
                "image": "assets/images/streak/15-streak.png",
                "congrat": "You won a grown tree",
                "info_before": "complete a lição de hoje",
                "info_after": " para ganhar a nossa árvore ",
                "": " até o desabrochar das flores de sua árvore. Até amanhã "
            },
            {
                "day": "16",
                "image": "assets/images/streak/15-streak.png",
                "congrat": "Your tree looks so much bigger",
                "info_before": "continua a aprender em 6 dias para ganhar uma árvore bem ",
                "info_after": "Aprenda",
                "": " até amanhã "
            },
            {
                "day": "17",
                "image": "assets/images/streak/15-streak.png",
                "congrat": "Your tree has grown a lot",
                "info_before": "continua a aprender em 5 dias para ganhar uma árvore bem ",
                "info_after": "Aprenda",
                "": ""
            },
            {
                "day": "18",
                "image": "assets/images/streak/15-streak.png",
                "congrat": "You naild it!",
                "info_before": "continua a aprender em 4 dias para ganhar uma árvore bem ",
                "info_after": "Aprenda",
                "": ""
            },
            {
                "day": "19",
                "image": "assets/images/streak/15-streak.png",
                "congrat": "Were you born to be a gardener",
                "info_before": "continua a aprender em 3 dias para ganhar uma árvore bem ",
                "info_after": "Aprenda",
                "": ""
            },
            {
                "day": "20",
                "image": "assets/images/streak/15-streak.png",
                "congrat": "Your tree looks so much taller",
                "info_before": "continua a aprender em 2 dias para ganhar uma árvore bem ",
                "info_after": "Aprenda",
                "": ""
            },
            {
                "day": "21",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "Your tree has bloomed beautifully",
                "info_before": "complete a lição de hoje",
                "info_after": " para ganhar uma árvore bem ",
                "": ""
            },
            {
                "day": "22",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "You are so good at planting",
                "info_before": "continue aprendendo",
                "info_after": " por mais 7 dias",
                "": ""
            },
            {
                "day": "23",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "You are a skillful gaderner",
                "info_before": "continue aprendendo",
                "info_after": " por mais 6 dias",
                "": ""
            },
            {
                "day": "24",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "You did a good job",
                "info_before": "continue aprendendo",
                "info_after": " por mais 5 dias",
                "": ""
            },
            {
                "day": "25",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "You naild it!",
                "info_before": "continue aprendendo",
                "info_after": " por mais 4 dias",
                "": ""
            },
            {
                "day": "26",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "Were you born to be a gardener",
                "info_before": "continue aprendendo",
                "info_after": " por mais 3 dias",
                "": ""
            },
            {
                "day": "27",
                "image": "assets/images/streak/21-streak.png",
                "congrat": "Your tree looks so much prettier",
                "info_before": "continue aprendendo",
                "info_after": " por mais 2 dias",
                "": " de aprendizagem"
            },
            {
                "day": "28",
                "image": "assets/images/streak/28-streak.png",
                "congrat": "You deserve these fruits!",
                "info_before": "Complete a lição de hoje e",
                "info_after": " então",
                "": " da árvore de inglês! Por favor"
            }
        ]
    };
  _.map(toeicUnits, function(toeic) {
      let words = [];
      _.each(toeic.topics, function(value) {
          _.each(value.words, function (list) {
              words.push(list);
          })
      });
      toeic.words = words;
  });

  _.map(grammarUnits, function(grammar) {
      let words = [];
      _.each(grammar.topics, function(value) {
          _.each(value.words, function (list) {
              words.push(list);
          })
      });
      grammar.words = words;
  });

  _.map(communicationUnit, function(communication) {
      let words = [];
      _.each(communication.topics, function(value) {
          _.each(value.words, function (list) {
              words.push(list);
          })
      });
      communication.words = words;
    });
