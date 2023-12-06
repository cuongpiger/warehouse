/**
 * TODO : Paid or MKT
 * @type {string}
 */
let statusGame = {
    waiting: "Waiting",
    ready: "Ready"
};

let config_app = "MKT";
let config_url = {
    "url_redirect" : config_app === "Paid" ? 'http://bit.ly/2mSao10' : 'https://elight.edu.vn/landing-page-extension/?utm_source=extension&utm_medium=button',
    "url_logo" : 'https://elight.edu.vn/khoa-toan-dien-3-trong-1-trial-extension/?utm_source=Extension&utm_medium=logo',
    "url_logo_paid_user" : 'https://elight.edu.vn/tieng-anh-online'
};
let score_level = [
    {
        "level": 1,
        "min_star": 0,
        "max_star": 9,
        "image": "assets/images/level_badges/1.png",
        "grade": 1
    },
    {
        "level": 2,
        "min_star": 10,
        "max_star": 23,
        "image": "assets/images/level_badges/1.png",
        "grade": 1
    },
    {
        "level": 3,
        "min_star": 24,
        "max_star": 44,
        "image": "assets/images/level_badges/1.png",
        "grade": 1
    },
    {
        "level": 4,
        "min_star": 45,
        "max_star": 70,
        "image": "assets/images/level_badges/1.png",
        "grade": 1
    },
    {
        "level": 5,
        "min_star": 71,
        "max_star": 105,
        "image": "assets/images/level_badges/2.png",
        "grade": 2
    },
    {
        "level": 6,
        "min_star": 106,
        "max_star": 153,
        "image": "assets/images/level_badges/2.png",
        "grade": 2
    },
    {
        "level": 7,
        "min_star": 154,
        "max_star": 217,
        "image": "assets/images/level_badges/2.png",
        "grade": 2
    },
    {
        "level": 8,
        "min_star": 218,
        "max_star": 298,
        "image": "assets/images/level_badges/2.png",
        "grade": 2
    },
    {
        "level": 9,
        "min_star": 299,
        "max_star": 400,
        "image": "assets/images/level_badges/2.png",
        "grade": 2
    },
    {
        "level": 10,
        "min_star": 401,
        "max_star": 525,
        "image": "assets/images/level_badges/3.png",
        "grade": 3
    },
    {
        "level": 11,
        "min_star": 526,
        "max_star": 675,
        "image": "assets/images/level_badges/3.png",
        "grade": 3
    },
    {
        "level": 12,
        "min_star": 676,
        "max_star": 853,
        "image": "assets/images/level_badges/3.png",
        "grade": 3
    },
    {
        "level": 13,
        "min_star": 854,
        "max_star": 1060,
        "image": "assets/images/level_badges/3.png",
        "grade": 3
    },
    {
        "level": 14,
        "min_star": 1061,
        "max_star": 1300,
        "image": "assets/images/level_badges/3.png",
        "grade": 3
    },
    {
        "level": 15,
        "min_star": 1301,
        "max_star": 1575,
        "image": "assets/images/level_badges/4.png",
        "grade": 4
    },
    {
        "level": 16,
        "min_star": 1576,
        "max_star": 1887,
        "image": "assets/images/level_badges/4.png",
        "grade": 4
    },
    {
        "level": 17,
        "min_star": 1888,
        "max_star": 2239,
        "image": "assets/images/level_badges/4.png",
        "grade": 4
    },
    {
        "level": 18,
        "min_star": 2240,
        "max_star": 2632,
        "image": "assets/images/level_badges/4.png",
        "grade": 4
    },
    {
        "level": 19,
        "min_star": 2633,
        "max_star": 3070,
        "image": "assets/images/level_badges/4.png",
        "grade": 4
    },
    {
        "level": 20,
        "min_star": 3071,
        "max_star": 3555,
        "image": "assets/images/level_badges/5.png",
        "grade": 5
    },
    {
        "level": 21,
        "min_star": 3556,
        "max_star": 4089,
        "image": "assets/images/level_badges/5.png",
        "grade": 5
    },
    {
        "level": 22,
        "min_star": 4090,
        "max_star": 4675,
        "image": "assets/images/level_badges/5.png",
        "grade": 5
    },
    {
        "level": 23,
        "min_star": 4676,
        "max_star": 5314,
        "image": "assets/images/level_badges/5.png",
        "grade": 5
    },
    {
        "level": 24,
        "min_star": 5315,
        "max_star": 6010,
        "image": "assets/images/level_badges/5.png",
        "grade": 5
    },
    {
        "level": 25,
        "min_star": 6011,
        "max_star": 6765,
        "image": "assets/images/level_badges/6.png",
        "grade": 6
    },
    {
        "level": 26,
        "min_star": 6766,
        "max_star": 7581,
        "image": "assets/images/level_badges/6.png",
        "grade": 6
    },
    {
        "level": 27,
        "min_star": 7582,
        "max_star": 8461,
        "image": "assets/images/level_badges/6.png",
        "grade": 6
    },
    {
        "level": 28,
        "min_star": 8462,
        "max_star": 9406,
        "image": "assets/images/level_badges/6.png",
        "grade": 6
    },
    {
        "level": 29,
        "min_star": 9407,
        "max_star": 10420,
        "image": "assets/images/level_badges/6.png",
        "grade": 6
    },
    {
        "level": 30,
        "min_star": 10421,
        "max_star": 11495,
        "image": "assets/images/level_badges/7.png",
        "grade": 7
    },
    {
        "level": 31,
        "min_star": 11496,
        "max_star": 12634,
        "image": "assets/images/level_badges/7.png",
        "grade": 7
    },
    {
        "level": 32,
        "min_star": 12635,
        "max_star": 13842,
        "image": "assets/images/level_badges/7.png",
        "grade": 7
    },
    {
        "level": 33,
        "min_star": 13843,
        "max_star": 15122,
        "image": "assets/images/level_badges/7.png",
        "grade": 7
    },
    {
        "level": 34,
        "min_star": 15123,
        "max_star": 16466,
        "image": "assets/images/level_badges/7.png",
        "grade": 7
    },
    {
        "level": 35,
        "min_star": 16467,
        "max_star": 17864,
        "image": "assets/images/level_badges/8.png",
        "grade": 8
    },
    {
        "level": 36,
        "min_star": 17865,
        "max_star": 19318,
        "image": "assets/images/level_badges/8.png",
        "grade": 8
    },
    {
        "level": 37,
        "min_star": 19319,
        "max_star": 20830,
        "image": "assets/images/level_badges/8.png",
        "grade": 8
    },
    {
        "level": 38,
        "min_star": 20831,
        "max_star": 22403,
        "image": "assets/images/level_badges/8.png",
        "grade": 8
    },
    {
        "level": 39,
        "min_star": 22404,
        "max_star": 24022,
        "image": "assets/images/level_badges/8.png",
        "grade": 8
    },
    {
        "level": 40,
        "min_star": 24023,
        "max_star": 25674,
        "image": "assets/images/level_badges/9.png",
        "grade": 9
    },
    {
        "level": 41,
        "min_star": 25675,
        "max_star": 27359,
        "image": "assets/images/level_badges/9.png",
        "grade": 9
    },
    {
        "level": 42,
        "min_star": 27360,
        "max_star": 29078,
        "image": "assets/images/level_badges/9.png",
        "grade": 9
    },
    {
        "level": 43,
        "min_star": 29079,
        "max_star": 30831,
        "image": "assets/images/level_badges/9.png",
        "grade": 9
    },
    {
        "level": 44,
        "min_star": 30832,
        "max_star": 32611,
        "image": "assets/images/level_badges/9.png",
        "grade": 9
    },
    {
        "level": 45,
        "min_star": 32612,
        "max_star": 34408,
        "image": "assets/images/level_badges/10.png",
        "grade": 10
    },
    {
        "level": 46,
        "min_star": 34409,
        "max_star": 36223,
        "image": "assets/images/level_badges/10.png",
        "grade": 10
    },
    {
        "level": 47,
        "min_star": 36224,
        "max_star": 38057,
        "image": "assets/images/level_badges/10.png",
        "grade": 10
    },
    {
        "level": 48,
        "min_star": 38058,
        "max_star": 39908,
        "image": "assets/images/level_badges/10.png",
        "grade": 10
    },
    {
        "level": 49,
        "min_star": 39909,
        "max_star": 41779,
        "image": "assets/images/level_badges/10.png",
        "grade": 10
    },
    {
        "level": 50,
        "min_star": 41780,
        "max_star": 43668,
        "image": "assets/images/level_badges/11.png",
        "grade": 11
    }
];
let badge_level = [
    {
        "level": 1,
        "min_star": 0,
        "max_star": 70,
        "image": "assets/images/level_badges/1.png",
        "content": "Level 0 : Novice 1"
    },
    {
        "level": 2,
        "min_star": 71,
        "max_star": 400,
        "image": "assets/images/level_badges/2.png",
        "content": "Level 5 : Novice 2"
    },
    {
        "level": 3,
        "min_star": 401,
        "max_star": 1300,
        "image": "assets/images/level_badges/3.png",
        "content": "Level 10 : Beginner 1"
    },
    {
        "level": 4,
        "min_star": 1301,
        "max_star": 3070,
        "image": "assets/images/level_badges/4.png",
        "content": "Level 15 : Beginner 2"
    },
    {
        "level": 5,
        "min_star": 3071,
        "max_star": 6010,
        "image": "assets/images/level_badges/5.png",
        "content": "Level 20 : Competent"
    },
    {
        "level": 6,
        "min_star": 6011,
        "max_star": 10420,
        "image": "assets/images/level_badges/6.png",
        "content": "Level 25 : Proficient"
    },
    {
        "level": 7,
        "min_star": 10421,
        "max_star": 16466,
        "image": "assets/images/level_badges/7.png",
        "content": "Level 30 : Expert 1"
    },
    {
        "level": 8,
        "min_star": 16467,
        "max_star": 24022,
        "image": "assets/images/level_badges/8.png",
        "content": "Level 35 : Expert 2"
    },
    {
        "level": 9,
        "min_star": 24023,
        "max_star": 32611,
        "image": "assets/images/level_badges/9.png",
        "content": "Level 40 : Master 1"
    },
    {
        "level": 10,
        "min_star": 32612,
        "max_star": 41779,
        "image": "assets/images/level_badges/10.png",
        "content": "Level 45 : Master 2"
    },
    {
        "level": 11,
        "min_star": 41780,
        "max_star": 43668,
        "image": "assets/images/level_badges/11.png",
        "content": "Level 50 : Professor"
    }
];
let config_image_url = {
  "chat_banner"   : "assets/images/chat/banner.png",
  "diary_product" : "assets/images/teachers/Product.png",
  "ads_goPremium" : "assets/images/ads/go_premium.png",
  "elight_logo"   : "assets/images/elight_logo_300.png",
  "right_check"   : "assets/images/practice/right-check.png",
  "wrong_check"   : "assets/images/practice/wrong-check.png",
  "next_word"     : "assets/images/green_arrow.jpg",
  "speaker"       : "assets/images/speaker.png",
  "speaker_no"    : "assets/images/speaker_no.png"
};

let linkFreeUser = [
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=tuvung01", "title": "Học thêm nhiều chủ đề từ vựng khác"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=tuvung02", "title": "Củng cố thêm vốn từ vựng khác"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=tuvung03", "title": "Luyện tập từ vựng với phương pháp Gamification"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=tuvung04", "title": "Luyện tập phát âm các từ vựng đã học"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=nguphap01", "title": "Học thêm các chủ điểm ngữ pháp"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=giaotiep01", "title": "Thực hành giao tiếp cùng Elight"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=lotrinh01", "title": "Học tiếng Anh với lộ trình dành riêng cho bạn"},
    {"url": "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=khoahoc01", "title": "Học thêm các khoá học khác"}
];
let right = new Audio('assets/audio/true.mp3');
let wrong = new Audio('assets/audio/fail.mp3');

(function() {
    let ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-47075723-19']); //UA-93546727-1 && UA-47075723-19
_gaq.push(['_trackPageview']);
_gaq.push(['_trackEvent', 'Elight Extension', (config_app === 'Paid' ? 'Elight Online Paid' : 'Elight MKT')]);

let utils = {
    resetClickHandler : function(element, handler){
        element.off('click');
        element.on('click', handler);
    },
    resetMouseEnterHandler : function(element, handler){
        element.off('mouseenter');
        element.on('mouseenter', handler);
    },
    customizePerDay : function(name,condition,callback) {
        let _start = localStorage.getItem(name);
        if (_start === undefined && _start ===  null) {
            let time = new Date();
            let hours = time.getHours();
            time = (time.getMonth() + 1)  + '/' + (time.getDate() - 1) + '/' + time.getFullYear();
            localStorage.setItem(name, time);
            if (_.contains(condition, hours)) {
                callback(true)
            }
        } else {
            let current_date = new Date();
            let used_date = new Date(_start);
            let rest = current_date.getTime() - used_date.getTime();
            let days = Math.floor(rest / 1000 / 60 / 60 / 24);
            if ( days > 0 && _.contains(condition, current_date.getHours())) {
                let a = new Date();
                a = (a.getMonth() + 1)  + '/' + a.getDate() + '/' + a.getFullYear();
                localStorage.setItem(name, a);
                callback(true)
            } else {
                callback(false)
            }
        }
    },
    customizePerDayClick : function(name_date,name_num_click,click,callback) {
        let _start = localStorage.getItem(name_date);
        let num_click =  localStorage.getItem(name_num_click);
        if (_start === undefined && _start ===  null) {
            let time = new Date();
            time = (time.getMonth() + 1)  + '/' + (time.getDate() - 1) + '/' + time.getFullYear();
            localStorage.setItem(name_date, time);
            localStorage.setItem(name_num_click, 0);

        } else {
            num_click = JSON.parse(num_click);
            let current_date = new Date();
            let used_date = new Date(_start);
            let rest = current_date.getTime() - used_date.getTime();
            let days = Math.floor(rest / 1000 / 60 / 60 / 24);
            if ( days > 0 && num_click === click ) {
                let a = new Date();
                a = (a.getMonth() + 1)  + '/' + a.getDate() + '/' + a.getFullYear();
                localStorage.setItem(name_date, a);
                localStorage.setItem(name_num_click, 0);
                callback(true)
            } else if (days === 0) {

            } else {
                callback(false);
                localStorage.setItem(name_num_click, num_click + 1);
            }
        }
    }
};

function applyScope($scope){
    if ($scope.$root) {
        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply();
        }
    }
}


function sendGa(auth, catagory, action, label) {
    if (auth) {
        if (auth.actived_code.count_use_code > 0 || auth.actived_code.count_user_courses > 0) {
            _gaq.push(['_trackEvent', catagory, action, 'Paid_'+label]);
        } else {
            _gaq.push(['_trackEvent', catagory, action, 'Free_'+label]);
        }
    } else {
        _gaq.push(['_trackEvent', catagory, action, 'Free_'+label]);
    }
}
window.utils = utils;

Array.zip = function(left, right, combinerFunction) {
	var counter, results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
		results.push(combinerFunction(left[counter], right[counter]));
  }

	return results;
};
/*---- api user war score----*/
var server_url = window.ENV.socketHost;
server_environment = 'production'; //production turn off - development
var api = window.ENV.apiHost;
var apis = {
    warRank       : { url : api + 'user-war-score/new-rank',   method  : 'GET'},
    warUpdate     : { url : api + 'user-war-score/new-update', method  : 'POST'},
    warGet        : { url : api + 'user-war-score/get',    method  : 'GET'},
    profileUpdate : { url : api + 'user-war-score/update-profile', method : 'POST'},

    invite              : {url : api + 'extension/invitation', method : 'POST'},
    getInviteByUserId   : {url : api + 'extension/invitation', method : 'GET'},
    updateInvitation    : {url : api + 'extension/add-info', method : 'POST'},
    getWordByUser       : {url : api + 'notebook/get', method : 'GET'},
    storeWordByUser     : {url : api + 'notebook/update', method : 'POST'},
    feedbackContent     : {url : api + 'api/user-record/create', method : 'POST'},

    // profile
    getPlayerStat       : {url: server_url + '/getPlayerStat', method: 'GET'},

    // route socket
    getUser             : {method: 'post', url : '/getUserOnline'},
    subcribeUser        : {method: 'post', url: '/subcribeUser'},
    removeUserSocket    : {url: '/removeSocket'},

    getQuestionData                 : {method: 'get',  url: '/getQuestionData'},
    checkCountDownReady             : {method: 'post', url: '/countDownReady'},
    finishPreload                   : {method: 'get',  url: '/finishPreload'},
    answer                          : {method: 'post', url: '/answer'},
    useSkill                        : {method: 'post', url: '/useSkill'},
    inviteByUserId                  : {method: 'post', url: '/inviteUser'},
    leaveRoom                       : {method: 'post', url: '/leaveRoom'},
    acceptInvite                    : {method: 'post', url: '/acceptInvite'},
    denyInvite                      : {method: 'post', url: '/denyInvite'},
    updateOpponentLoadDataProgress  : {method: 'post', url: '/updateOpponentLoadDataProgress'},
    updateUserStatus                : {method: 'post', url: '/updateUserStatus'},
    getUserStatus                   : {method: 'post', url: '/getUserStatus'},
    disconnect                      : {method: 'post', url: '/disconnect'},
    getRecentOpponents              : {method: 'get', url: '/getRecentOpponents'},

    // socket actions
    updateUser                  : {url : 'getUserOnline' },
    onSubcribeUser              : {url: 'subcribeUser'},
    onUpdateUserStatusInGame    : {url: 'updateUserStatusInGame'},
    onUpdateUserStatusLeaveGame : {url: 'updateUserStatusLeaveGame'},
    onDisconnect                : {url: 'userDisconnected'},
    onInviteUser                : {url: 'inviteUser'},
    onDenyInvite                : {url: 'denyInvite'},
    onAcceptInvite              : {url: 'acceptInvite'},
    onReadyToCountDown          : {url: 'countDownReady'},
	onOpponetLoadData           : {url: 'opponent-load-data'},

    // User items (socket)
    syncLocalItems              : {method: 'post', url: '/user/sync_local_items'},
    fetchItems                  : {method: 'get',  url: '/user/items'},
    useItem                     : {method: 'post', url: '/game/use_item'},
    fetchBonusStat              : {method: 'get',  url: '/user/bonus_stat'},
    openGoldChest               : {method: 'post', url: '/user/open_gold_chest'},
    openSilverChest             : {method: 'post', url: '/user/open_silver_chest'},
    openWinChest                : {method: 'post', url: '/user/open_win_chest'},
    receiveInviteBonus          : {method: 'post', url: '/user/receive_invite_bonus'},

    //ending actions
    finish                      : {method: 'post', url : '/finish', },
    playAgain                   : {method: 'post', url : '/playAgain'},
    rejectPlayAgain             : {method: 'post', url : '/rejectPlayAgain'},
    acceptPlayAgain             : {method: 'post', url : '/acceptPlayAgain'},

    // season
    currentSeason               : {url: server_url + '/currentSeason', method: 'GET'},
    getTopUsers                 : {url: server_url + '/getTopUsers', method: 'GET'},
    getTopUserBySchool          : {url: server_url + '/getTopUserBySchool', method: 'GET'},
    getTopSchools               : {url: server_url + '/getTopSchools', method: 'GET'},
    getTopSchoolByTotalStudent  : {url: server_url + '/getTopSchoolByTotalStudent', method: 'GET'},
    getUserRank                 : {url: server_url + '/getUserRank', method: 'GET'},
    getSchoolRank               : {url: server_url + '/getSchoolRank', method: 'GET'},
    getTokenGuestId             : {method: 'get', url: server_url + '/user/getToken'},
    createSchool                : {url: server_url + '/createSchool', method: 'POST'},
    updateUserInfo              : {url: server_url + '/updateUser', method: 'POST'},

    // receive gift
    newUserReceiveGift          : {method: 'post', url: server_url + '/newUserReceiveGift'},
    getBotInfo                  : {method: 'get', url: '/user/getBot'},
};

/*----./END api user war score----*/

/*
* get date yy/mm/dd
* */
function getDate(){
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + "/" + month + "/" + day;
    return newdate;
}
/*
* minus day_date
* */
function minusDayDate(old_date, new_date){
    let date1 = new Date(old_date);
    let date2 = new Date(new_date);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}
/*
* minus hours_date
* */
function minuHourDate(old_date, new_date){
    let minus = (new_date - old_date)/60/60/1000;
    return minus;
}
