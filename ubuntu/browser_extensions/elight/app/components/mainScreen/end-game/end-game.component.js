'use strict';

angular.module("mainScreen.end-game")
.component("endGame", {
    templateUrl : 'app/components/mainScreen/end-game/end-game.template.html',
    controller	: endGameController,
    bindings    : {
    link: '@',
    number: '@',
    className : '@',
    words: '='
    }
});
endGameController.$inject = ['$timeout', 'ngAudio', 'ngAudioGlobals', '$scope', '$rootScope', '$localStorage', "streakService", 'progressLineService'];
function endGameController ($timeout, ngAudio, ngAudioGlobals, $scope, $rootScope, $localStorage, streakService, progressLineService) {
    ngAudioGlobals.unlock = true;
    let self = this;
    self.userBannerType = $localStorage.guest_id % 2;
    let timeoutArray = [];
    if (!$localStorage.rating) {
        $localStorage.rating = 0;
    }
	if ($localStorage.auth && ( $localStorage.auth.actived_code.count_use_code > 0 || $localStorage.auth.actived_code.count_user_courses > 0)) {
        self.isClose = true;
    }
    self.auth = $localStorage.auth;
    $rootScope.auth = $localStorage.auth;
    $scope.timesCorrect = $rootScope.timesCorrect;
    $scope.showTitle = false;
    $scope.showProgress = false;
    $scope.showScore = false;
    $scope.showNextTitle = "";
    $scope.titleEnd = 'Bạn vừa đạt được';
    $scope.badge = $rootScope.badge || $localStorage.badge;
    let unit = $localStorage.selectedUnit;
    $scope.unit = unit;

    timeoutArray.push($timeout(function () {
        let woosh = ngAudio.load('assets/audio/woosh.mp3');
        woosh.setVolume(0.2);
        woosh.play();
    },600));

    timeoutArray.push($timeout(function () {
        let correct_trimmed =  ngAudio.load('assets/audio/correct_trimmed.mp3');
        correct_trimmed.setVolume(0.1);
        correct_trimmed.play();
    },3000));

    timeoutArray.push($timeout(function () {
        let newLearnWord = unit.new_learn;
        let oldWord = unit.total - unit.newWord;
        let newWord = unit.newWord - newLearnWord;
        AmCharts.makeChart( "process_unit", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
                "title": $rootScope.language === 'vn' ? "Đã học" : "Aprendido",
                "value": oldWord,
                "color": "#c0c0c0",
                "colorTitle": "#ffffff"
            },{
                "title": $rootScope.language === 'vn' ? "Luyện tập" : "Prática",
                "value": 3 - newLearnWord,
                "color": "#fff3a6",
                "colorTitle": "#ffffff"
            },{
                "title": $rootScope.language === 'vn' ? "Mới học" : "Novo estudo",
                "value": newLearnWord,
                "color": "#f59000",
                "colorTitle": "#ffffff"
            }, {
                "title": $rootScope.language === 'vn' ? "Chưa học" : "Ainda não aprendeu",
                "value": newWord,
                "color": "#E5E6E5",
                "colorTitle": "#ffffff"
            } ],
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 10 ,
            "radius": "22%",
            "colorField": "color",
            "innerRadius": "80%",
            "labelText": "[[title]]: [[value]] ",
            "startDuration": 0,
        } );
    },3500));

    if ($rootScope.auth && ($rootScope.auth.actived_code.count_user_courses > 0 || $rootScope.auth.actived_code.count_use_code > 0)) {
        timeoutArray.push(
            $timeout((...args) => args, 3000, true)
                .then(function (res) {
                    $('.contain_progress').fadeOut(2000);
                    return $timeout((...args) => args, 2000, true, res);
                })
                .then(function (res) {
                    $scope.showScore = true;
                    return $timeout((...args) => args, 1000, true, res);
                })
                .then(function (res) {
                    $scope.showProgress = true;
                    return $timeout((...args) => args, 1000, true, res);
                })
                .then(function (res) {
                    $rootScope.auth.total_score = parseInt($rootScope.auth.total_score ? $rootScope.auth.total_score : 0 ) + parseInt($scope.timesCorrect);
                    var badge = _.find(score_level,function(value){
                        return $rootScope.auth.total_score >=  value.min_star  && $rootScope.auth.total_score <= value.max_star
                    });
                    if ($localStorage.badge && $localStorage.badge.grade !== badge.grade) {
                        $scope.nextGrade = true;
                    }
                    $scope.grade_levels = _.where(score_level, { grade : $rootScope.badge.grade});
                    $scope.grade = badge_level[$rootScope.badge.grade-1];
                    $rootScope.badge = badge;

                    return progressLineService.updateScore($rootScope.timesCorrect)
                })
                .then(function (res) {
                    if ($scope.nextGrade) {
                        $('.progress-wrapper').removeClass('zoomIn').fadeOut();
                        $('.header-score').removeClass('bounceIn').fadeOut();
                        $('.progress_detail').removeClass('zoomIn').fadeOut();
                        return $timeout((...args) => args, 1000, true, res);
                    }
                })
                .then(function (res) {
                    if ($scope.nextGrade) {
                        $('.header-score').fadeIn(1000);
                        $scope.showScore = false;
                        $scope.showNextTitle = $scope.grade;
                        $scope.titleEnd = 'Bạn đã thăng cấp lên "'+badge.content.split(':')[1].trim()+'"';
                    }
                })
        );
    }

    let streak = streakService.increaseStreak();
    if ($localStorage.auth && streak) {
        $scope.$emit("today_streak_completed--start");
        let oldData = streakService.getStreakData(streak.old);
        let newData = streakService.getStreakData(streak.new);
        self.streak = streak.old;
        if (oldData.image !== newData.image) {
                self.streakData = oldData;

                timeoutArray.push($timeout(function () {
                    let chimes =  ngAudio.load('assets/audio/CHIMES.WAV');
                    chimes.setVolume(0.1);
                    chimes.play();
                },7000));
            // NOTE: it seems that $timeout.cancel() only cancel the passed function, not the
            // returned promise, so all the timeout below CANNOT be canceled
        $timeout((...args) => args, 9500, true, newData).then(
            function (res) {
                $rootScope.$broadcast("today_streak_completed--new_tree--start");
                // $('.streak--fadeIn').fadeIn(1000);
                return $timeout((...args) => args, 1000, true, res);
            }).then(function (res) {
                self.streak = _.flatten(res)[0].day;
                // return $timeout((...args) => args, 1200, true, res);
            }).then(function (res) {
                // $(".ending_tree .round-progress-wrapper").fadeOut(500);
                // $(".ending_tree_image").fadeOut(500);
                return $timeout((...args) => args, 500, true, res);
            }).then(function (res) {
                self.streakData = _.flatten(res)[0];
                // $(".ending_tree_image").fadeIn(500);
                return $timeout((...args) => args, 500, true);
            }).then(function () {
                $rootScope.$broadcast("today_streak_completed--new_tree--end");
                // let number = self.streak;
                // _gaq.push(['_trackEvent', 'Streak Day', number.toString() , ""]);
                $('.learn-continue').fadeIn(500);
            })
        } else {
            self.streakData = newData;
            timeoutArray.push(
                $timeout(function () {
                    // $('.streak--fadeIn').fadeIn(1000);
                    timeoutArray.push(
                        $timeout(() => {
                            $rootScope.$broadcast("today_streak_completed--old_tree");
                            self.streak++;
                            let number = self.streak;
                            _gaq.push(['_trackEvent', 'Streak Day', number.toString() , ""]);
                            $('.learn-continue').fadeIn(500);

                        },1000)
                    );
                },9500)
            );
        }
    }
    else {
        $timeout(function () {
            if (!$localStorage.auth || ($localStorage.auth && $localStorage.auth.actived_code.count_use_code > 0 || $localStorage.auth.actived_code.count_user_courses > 0 || $localStorage.auth.actived_code.new_code > 0) ) {
                self.freeUser = _.sample(linkFreeUser);
            }
            $('.learn-continue, .link_FreeUser').fadeIn(500);
        },3500);
    }

    self.$onDestroy = function () {
        timeoutArray.map((item) => $timeout.cancel(item));
    };

    self.trackingFreeUser = function (url, title) {
        _gaq.push(['_trackEvent', 'Ending Game Call to action', url, title]);
        chrome.tabs.create({url: url });
    };

    $scope.nextGame = function(){
        let login = localStorage.user;
        if (login) {
            let user = JSON.parse(login);
            $scope.$parent.nextGame();
            sendGa(self.words,user.id);

            // chọn thêm chủ đề nếu chưa đủ 2 unit
            if ($localStorage.unit.length < 2) {
                $rootScope.showWelcome = 'topic2';
            }
        } else {
            sendGa(self.words);
            $rootScope.checkLogin = true;
            $scope.$parent.nextGame();
            $('#background_music').animate({volume : 0}, 1000);
            $rootScope.showWelcome = 'recommend';
        }
        if ($localStorage.rating < 3) {
            $localStorage.rating++;
        }

        if ($localStorage.rating === 2) {
            ratingFunction();
        }
        $rootScope.timesCorrect = 0;

    };

    // Function rating
    function ratingFunction() {
        swal({
            title: $rootScope.language === 'vn' ? "Bạn có thích tiện ích học từ vựng của Elight không?" : "Do you like Learning English With Elight?",
            imageUrl: "assets/images/heart.png",
            showCancelButton: true,
            customClass: "customRating",
            cancelButtonText: $rootScope.language === 'vn' ? "Không thích" : "Dislike",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: $rootScope.language === 'vn' ? "Rất thích" : "Like",
            closeOnConfirm: false
        }, function(isConfirm){
            if (isConfirm) {
                swal({
                    title: $rootScope.language === 'vn' ? "Hãy tặng Elight 5 sao để cổ vũ chúng mình nhé" : "Give us 5 stars will you?",
                    imageUrl: "assets/images/star.png",
                    confirmButtonColor: "#DD6B55",
                    customClass: "customRating",
                    confirmButtonText: $rootScope.language === 'vn' ? "Tặng ngay" : "Okay",
                    allowOutsideClick : true,
                    closeOnConfirm: true
                }, function(confirm){
                    if (confirm) {
                        chrome.tabs.create({url: "https://chrome.google.com/webstore/detail/"+chrome.runtime.id+"/reviews" });
                    }
                });

            } else {
                chrome.tabs.create({url: "https://docs.google.com/forms/d/e/1FAIpQLSd8_NNRWAE5y25WlBr__SHvIZtu43gfuenykhGZcjk8Lj5rPw/viewform?c=0&w=1" });
            }
        });
    }

    function sendGa(words, id) {
        _gaq.push(['_trackEvent', 'Word practice', 'Practice', "Completed a word practice"]);
        _.map(words, function (value) {
            let lable = id ? (id + '_' + value.word) : "";
            _gaq.push(['_trackEvent', 'Word notebook', 'Add', lable]);
        });
    }

	self.trackingBanner = function(bannerType) {
		var banner = bannerType.toString();
		_gaq.push(['_trackEvent', 'Game BN', 'Go To LP', banner]);
	}

    self.closeBanner = function() {
        self.isClose = true;
    }
}
