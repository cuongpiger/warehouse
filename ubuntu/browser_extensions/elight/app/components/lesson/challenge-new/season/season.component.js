'use strict';

angular.module("lesson.challenge_new").component("season", {
    templateUrl	:	"app/components/lesson/challenge-new/season/season.template.html",
    controller	: ["$scope", "$rootScope","$localStorage", "$interval", "$timeout", "challengeService",
    function ($scope, $rootScope, $localStorage, $interval, $timeout, challengeService) {
        let self = this;
        const SECONDS_PER_DAY = 60 * 60 * 24;

        if (!$localStorage.season) {
            $localStorage.season = {};
        }

        updateSeasonTime();
        // $interval(function() {
        //     updateSeasonTime();
        // }, 3600 * 1000);

        function updateSeasonTime() {
            let now = new Date().getTime();

            // if (!$localStorage.season || !$localStorage.season.endingTime || $localStorage.season.endingTime < now) {
                challengeService.findCurrentSeason(function(response, err) {
                    if (err) {
                        // TODO
                        console.log('findCurrentSeason', err);
                        return;
                    }

                    if (response.code == 1) {
                        let now = new Date().getTime();
                        let startTime = new Date(response.data.time_start_season).getTime();
                        let endTime = new Date(response.data.time_end_season).getTime();

                        $localStorage.season = {
                            count: response.data.count,
                            startTime: startTime,
                            endingTime: endTime,
                            topUserLastSeason: response.data.top_users_last_season,
                            schoolWinLastSeason: response.data.school_win_last_season
                        };

                        postUpdateSeasonTime();
                    } else {
                        // TODO
                    }
                });
            // } else {
            //     postUpdateSeasonTime();
            // }
        }

        function postUpdateSeasonTime() {
            let now = Date.now();
            let count = $localStorage.season.count;
            let startTime = $localStorage.season.startTime;
            let endTime = $localStorage.season.endingTime;

            if (startTime > now) {
                // Season is preparing
                self.started = false;
                self.remainingTime = Math.floor((startTime - now) / 1000);
                self.seasonTimeLeftText = `Season ${count} bắt đầu trong`;
            } else {
                // Season is running
                self.started = true;
                self.remainingTime = Math.floor((endTime - now) / 1000);
                self.seasonTimeLeftText = `Season ${count} kết thúc trong`;
            }

            if ($localStorage.season.schoolWinLastSeason !== undefined && $rootScope.playerStat.school == $localStorage.season.schoolWinLastSeason) {
                $rootScope.playerStat.specialAvatar = true;
            }

            clearCountdownInterval();

            self.countdownInterval = $interval(() => {
                countdownSeason();
            }, 1000);
        }

        /**
         * Countdown for season
         * @param  {integer} remainingTime: season time left in milliseconds
         * @return {void}
         */
        function countdownSeason() {
            if (self.remainingTime <= 0) {
                let count = $localStorage.season.count;

                if (self.started) {
                    clearCountdownInterval();
                    self.seasonTimeLeft = `Season ${count} đã kết thúc.`;
                    self.ended = true;
                    return;
                } else {
                    let now = new Date().getTime();
                    self.started = true;
                    self.remainingTime = Math.floor(($localStorage.season.endingTime - now) / 1000);

                    self.seasonTimeLeftText = `Season ${count} kết thúc trong`;
                }
            }

            self.remainingTime -= 1;
            if (self.remainingTime < SECONDS_PER_DAY) {
                let hour = Math.floor(self.remainingTime / (60 * 60));
                let minute = Math.floor((self.remainingTime - hour * 60 * 60) / 60);
                let second = Math.floor(self.remainingTime - hour * 60 * 60 - minute * 60);

                if (hour < 10) {
                    hour = `0${hour}`;
                }

                if (minute < 10) {
                    minute = `0${minute}`;
                }

                if (second < 10) {
                    second = `0${second}`;
                }

                self.seasonTimeLeft = `${hour}:${minute}:${second}`;
            } else {
                let day = Math.floor(self.remainingTime / SECONDS_PER_DAY);
                let hour = Math.floor((self.remainingTime - day * SECONDS_PER_DAY) / (60 * 60));

                self.seasonTimeLeft = `${day} ngày ${hour < 10 ? ('0' + hour) : hour} giờ`;
            }
        }

        function clearCountdownInterval() {
            if (self.countdownInterval !== undefined) {
                $interval.cancel(self.countdownInterval);
                self.countdownInterval = undefined;
            }
        }

        function getTopUsersOfSeason(cb) {
            challengeService.getTopUsers(20, function(response, err) {
                if (response.code === 1 && response.data && response.data.length > 0) {
                	$localStorage.season.topUserLastSeason = response.data;
                    return response.data;
                } else {
                	console.log(err);
                	return;
                }
            });
        }

        self.showSeasonModal = function() {
        	self.seasonModal = true;
        	if (self.remainingTime <= 0 || !self.started) {
        		// TODO: optimize
        		challengeService.findCurrentSeason(function(season, err) {
                    if (season) {
                        let endTime = new Date(season.data.time_end_season).getTime();
                        let now = new Date().getTime();

                        if ((endTime <= now || !self.started) && $localStorage.season.count != 1) {
                            if ($localStorage.warPlayerState) {
                                $localStorage.warPlayerState.win_number = 0;
                                $localStorage.warPlayerState.lose_number = 0;
                            }
                        	self.schoolWinSeason = season.data.school_win_last_season ? season.data.school_win_last_season.school_name : '';
                        	self.userMVP = season.data.user_mvp ? season.data.user_mvp : '';
                        	self.topUsersOfSeason = season.data.top_users_last_season;
                        	self.showSeasonResultModal = true;

                        	self.topUsersOfSeason.forEach(function(user) {
                        		if ($localStorage.guest_id === user.guest_id) {
                        		    self.showBtnReceiveGift = true;
                        	    }
                        	});
                        } else {
                        	self.showSeasonAnnouncementModal = true;
                            let endTime = new Date(season.data.time_end_season).getTime();
                        	$localStorage.season = {
                                count: season.data.count,
	                            endingTime: endTime,
	                            topUserLastSeason: [],
	                            schoolWinLastSeason: {}
	                        };

	                        self.seasonTimeLeft = (endTime - Date.now()) / 1000;
                        }
                    } else {
                        console.log(err);
                    }
                });
        	} else {
        		self.showSeasonAnnouncementModal = true;
                if ($localStorage.season) {
                    $localStorage.season.topUserLastSeason = [];
                    $localStorage.season.schoolWinLastSeason = {};
                }
        	}
        }

        self.closeSeasonModal = function() {
        	self.seasonModal = false;
        }

        self.openReceiveGiftForm = function() {
            self.receiveGift_name = null;
            self.receiveGift_phoneNum = null;
            self.receiveGift_email = null;
            self.receiveGift_address = null;

        	self.receiveGiftForm = true;
        }

        self.closeReceiveGiftForm = function() {
        	self.receiveGiftForm = false;
        }

        self.closeSuccessModal = function() {
        	delete self.successMsg;
        }

        self.sendInfoToReceiveGift = function() {
        	var allNumberExpress = new RegExp('^[0-9]+$');
        	var emailExpress = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        	if (!self.receiveGift_name || !self.receiveGift_phoneNum
        		|| !self.receiveGift_email || !self.receiveGift_address) {
        		self.errorMsg = 'Vui lòng nhập đầy đủ thông tin!';
        	} else if (!allNumberExpress.test(self.receiveGift_phoneNum) || self.receiveGift_phoneNum.length < 10) {
        		self.errorMsg = 'Vui lòng nhập số điện thoại hợp lệ!';
        	} else if (!emailExpress.test(self.receiveGift_email)) {
        		self.errorMsg = 'Vui lòng nhập email hợp lệ!'
        	} else {
        		self.isReceivedInfoFromUser = true;
                challengeService.sendInfoToReceiveGift($localStorage.guest_id, self.receiveGift_name, self.receiveGift_phoneNum,
        			self.receiveGift_email, self.receiveGift_address, function(result, err) {
        				self.isReceivedInfoFromUser = false;
                    if (result && result.code === 1) {
                    	delete self.receiveGiftForm;
                    	self.successMsg = 'Elight đã nhận được thông tin của bạn!';
                    } else if (result && result.code === 0){
                    	self.errorMsg = result.message;
                    } else {
                    	console.log(err);
                    }
        		});
        	}
        }
    }]
})