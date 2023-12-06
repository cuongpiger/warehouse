'use strict';

angular.module("lesson.challenge_new").component("challengeMenu", {
    templateUrl: "app/components/lesson/challenge-new/menu/menu.template.html",
    controller: ["$scope", "$rootScope", "$localStorage", "$interval", "$timeout", "challengeService", "challenge.io.service", "challenge.items.service","$sce",
        function ($scope, $rootScope, $localStorage, $interval, $timeout, challengeService, socketService, ChallengeItem, $sce) {
            $scope.localesMessage = challengeLocales;
            let self = this;
            self.challengeItems = ChallengeItem.get();
            self.bonusStat = ChallengeItem.getBonusStat();
            var user_token = $localStorage.auth ? $localStorage.auth.user_token : '';
            var currentItemInLeaderboard = 0;
            var currentItemInRankBySchool = 0;
            $rootScope.stepInvite = 0;
            self.guest_id = $localStorage.guest_id;

            self.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };

            if ($rootScope.updateGoldBonusProgressListener) {
                $rootScope.updateGoldBonusProgressListener();
                delete $rootScope.updateGoldBonusProgressListener;
            }

            $rootScope.updateGoldBonusProgressListener = $rootScope.$on('updateGoldBonusProgress', () => {
                self.bonusStat.gold_chest++;
            });

            // START GET LIST USER ONLINE
            // listen event when new user online
            socketService.onSubcribeUser(function (response) {
                if (!$rootScope.userOnline) {
                    $rootScope.userOnline = [response];
                } else {
                    $rootScope.userOnline = $rootScope.userOnline.filter(function (user) {
                        return user.user_id != response.user_id;
                    });
                    if ($localStorage.guest_id != response.guestId) {
                        $rootScope.userOnline.push(response);
                    }
                }
            });

            socketService.onDisconnect(function (response) {
                if ($rootScope.userOnline && $rootScope.userOnline.length > 0) {
                    $rootScope.userOnline.splice($rootScope.userOnline.indexOf(response), 1);
                }
            });

            $scope.play_game = $scope.$parent.play_game;
            $scope.inviteRecent = $scope.$parent.inviteRecent;
            $scope.invite = $scope.$parent.invite;
            $scope.inviteByGuestId = function(){
                if($rootScope.searchStr) {
                    $rootScope.messageError = "";
                    $scope.invite();
                }
                else {
                    $rootScope.messageError = $rootScope.language === 'vn' ? "Bạn cần nhập Guest ID của đối thủ!" : "Enter opponent's Guest ID only!"
                }
            }

            // callInitAPI();
            function callInitAPI() {
                getPlayerStat();
                getListUserOnline($localStorage.guest_id);
                if ($localStorage.auth) {
                    var user = $localStorage.auth;
                    if (user.school) {
                        $scope.userBySchool = true;
                        getUserLeaderboard(50, user.school.id);
                        getOwnerRank($localStorage.guest_id, user.school.id);
                    } else if (!user.school) {
                        delete $scope.userBySchool;
                        getUserLeaderboard(50);
                        getOwnerRank($localStorage.guest_id);
                    }
                } else {
                    getUserLeaderboard(50);
                    getOwnerRank($localStorage.guest_id);
                }
            }

            function getListUserOnline(userIgnore) {
                socketService.getUserList(userIgnore)
                    .then(function (response) {
                        if (!$rootScope.userOnline) {
                            $rootScope.userOnline = response;
                        } else {
                            response.forEach(function (element) {
                                $rootScope.userOnline = $rootScope.userOnline.filter(function (user) {
                                    return user.user_id != element.user_id;
                                });
                                $rootScope.userOnline.push(element);
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            // END GET LIST USER ONLINE
            $interval(function () {
                getSilverBonusProgress();
            }, 1000);

            self.win_rate = function (win_number, lose_number) {
                return win_number ? (win_number / (win_number + lose_number)).toFixed(2) * 100 : 0;
            };

            this.openWinningBonus = () => {
                if (this.bonusStat.gold_chest >= 3) {
                    ChallengeItem.openGoldChest()
                        .then((bonusItem) => {
                            if (bonusItem) {
                                this.winningBonusOpenned = true;
                                openChestBonus(1, bonusItem.item, bonusItem.quantity);
                                $timeout(() => {
                                    this.winningBonusOpenned = false;
                                    updateGoldBonusProgress(true);
                                }, 1500);
                            }
                        })
                        .catch((error) => { });
                }
            };

            self.openDailyBonus = () => {
                let now = Date.now();
                if (self.bonusStat.silver_chest !== null && now >= (self.bonusStat.silver_chest + 60 * 60 * 12 * 1000)) {
                    ChallengeItem.openSilverChest()
                        .then((result) => {
                            if (result) {
                                self.dailyBonusOpenned = true;
                                self.tooltipMessage = 'Thách đấu cùng eLight';
                                openChestBonus(2, result.item, result.quantity);
                                $timeout(() => {
                                    self.dailyBonusOpenned = false;
                                    getSilverBonusProgress()
                                }, 2000);
                            }
                        })
                        .catch((error) => { });
                }
            };

            function getSilverBonusProgress() {
                if (self.bonusStat.silver_chest === null) {
                    return;
                }

                let nextBonus = self.bonusStat.silver_chest + 60 * 60 * 12 * 1000;
                // let nextBonus = localStorage.getItem("next-silver-bonus");

                // if (nextBonus == null || nextBonus == undefined) {
                //     nextBonus = Date.now() + 60*60*12*1000;
                //     localStorage.setItem("next-silver-bonus", nextBonus);
                // }

                let remainingTime = (nextBonus - Date.now()) / 1000;
                if (remainingTime > 0) {
                    let hour = Math.floor(remainingTime / 3600);
                    let minute = Math.floor((remainingTime - hour * 3600) / 60);
                    let second = Math.floor(remainingTime - hour * 3600 - minute * 60);
                    self.remainingTime = `${hour}:${minute < 10 ? ('0' + minute) : minute}:${second < 10 ? ('0' + second) : second}`;
                } else {
                    // ready phase
                    self.remainingTime = `0:00:00`;
                    if (!$localStorage.showHint) {
                        self.isClose = true;
                    }
                    if (self.bonusStat.gold_chest < 3) {
                        self.tooltipMessage = 'Silver chest available';
                        chestNotiEffect();
                    }
                }
            }

            // NOTE: starting screen functions
            // update gold bonus progress
            function updateGoldBonusProgress(reset) {
                self.tooltipMessage = 'Thách đấu cùng eLight';
                if (self.bonusStat.gold_chest == 0) {
                    self.tooltipMessage = 'Thách đấu cùng eLight';
                }

                if (self.bonusStat.gold_chest >= 3) {
                    chestNotiEffect();
                    self.tooltipMessage = 'Gold chest available';
                }

                if (!$localStorage.showHint) {
                    self.isClose = true;
                }
            }

            // lazy load leaderboard
            self.leaderboardLazyload = function () {
                if (!self.sendingRequest && self.leaderboardValues && self.leaderboardValues.length < 50 && !$scope.userBySchool) {
                    self.sendingRequest = true;
                    getUserLeaderboard(50).then(function () {
                        self.sendingRequest = false;
                    });
                }

                if (!self.sendingRequest && self.leaderboardRankBySchool && self.leaderboardRankBySchool.length < 50 && (self.leaderboardRankBySchool.length >= 10 * currentItemInRankBySchool) && $scope.userBySchool) {
                    self.sendingRequest = true;
                    getUserLeaderboard(50).then(function () {
                        self.sendingRequest = false;
                    });
                }
            };

            self.leaderboardLazyload();

            self.openProfile = function () {
                if (!$rootScope.loggedIn) {
                    $rootScope.random = 1;
                    $rootScope.isLearn_word = true;
                    $rootScope.isQuote = false;
                    $rootScope.elightube = false;
                    $rootScope.topic = false;
                    $rootScope.$broadcast('reInit', {});
                    applyScope($scope);
                    $('#profile_modal').modal('show');
                } else {
                    self.openProfileBox = true;
                }
            };

            self.startTutorial = function () {
                $rootScope.challengeState = 'tutorial';
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Start-Tutorial']);
            }

            // get play state
            function getPlayerStat() {
                $rootScope.playerStat = {
                    'user_id': $localStorage.auth ? $localStorage.auth.id : '',
                    'display_name': $localStorage.auth ? $localStorage.auth.display_name : '',
                    'avatar': $localStorage.auth ? $localStorage.auth.avatar : '',
                    'school': $localStorage.auth ? ($localStorage.auth.school ? $localStorage.auth.school.school_name : '') : ''
                };

                if ($localStorage.warPlayerState) {
                    $localStorage.warPlayerState.school = $localStorage.auth ? ($localStorage.auth.school ? $localStorage.auth.school.school_name : '') : '';
                }
                if ($rootScope.loggedIn) {
                    challengeService.getPlayerStat().then(function (data) {
                        // console.log('player stat:',  data)
                        if (data) {
                            $rootScope.playerStat.win_number = parseInt(data.win_number);
                            $rootScope.playerStat.lose_number = parseInt(data.lose_number);
                        }
                        if ($localStorage.warGuestState) {
                            var playerGameResult = {
                                totalScore: $localStorage.warGuestState.total_score,
                                winNumber: $localStorage.warGuestState.win_number,
                                loseNumber: $localStorage.warGuestState.lose_number
                            };

                            $localStorage.warPlayerState.total_score += playerGameResult.totalScore;
                            $localStorage.warPlayerState.win_number += playerGameResult.winNumber;
                            $localStorage.warPlayerState.lose_number += playerGameResult.loseNumber;
                            $localStorage.warPlayerState.win_rate = (playerGameResult.winNumber / (playerGameResult.winNumber + playerGameResult.loseNumber)).toFixed(2) * 100;

                            $rootScope.playerStat.total_score = $localStorage.warPlayerState.total_score;
                            $rootScope.playerStat.win_number = $localStorage.warPlayerState.win_number;
                            $rootScope.playerStat.lose_number = $localStorage.warPlayerState.lose_number;
                            $rootScope.playerStat.win_rate = $localStorage.warPlayerState.win_rate;

                            challengeService.updateUserScoreAfterLogin($rootScope.playerStat.win_number, $rootScope.playerStat.lose_number, $rootScope.playerStat.total_score, $localStorage.auth.user_token);
                        }
                    });
                } else if ($localStorage.warGuestState) {
                    $rootScope.playerStat.win_number = $localStorage.warGuestState.win_number;
                    $rootScope.playerStat.lose_number = $localStorage.warGuestState.lose_number;
                    $rootScope.playerStat.win_rate = $localStorage.warGuestState.win_rate;
                }

                applyScope($scope);
            }

            function openChestBonus(type, item, quantity) {
                // 1 : gold, 2: silver, 3 : win
                let chestType = (type == 1) ? "Gold Chest" : ((type == 2) ? "Silver Chest" : "Win Chest");
                _gaq.push(['_trackEvent', 'WAR_', 'Open ' + chestType, 'Open item(s)']);

                let postionChest = {
                    1: {
                        left: { 1: '130px', 2: '20px', 3: '130px', 4: '20px' },
                        top: { 1: '235px', 2: '235px', 3: '300px', 4: '300px' }
                    },
                    2: {
                        left: { 1: '130px', 2: '20px', 3: '130px', 4: '20px' },
                        top: { 1: '130px', 2: '130px', 3: '210px', 4: '210px' }
                    },
                    3: {
                        left: { 1: '585px', 2: '585px', 3: '585px', 4: '585px' }, // old : 460; new: 585px
                        top: { 1: '-110px', 2: '-190px', 3: '-32px', 4: '51px' } // -110, -190 -32; 51
                    }
                };

                let left = postionChest[type].left;
                let top = postionChest[type].top;
                // 1 : búa, 2: băng, 3 : boom; 4 :tim
                let bonusItems = {
                    'unfreeze': { left: left[1], top: top[1], class_name: '' },
                    'freeze': { left: left[2], top: top[2], class_name: 'freeze_item' },
                    'bomb': { left: left[3], top: top[3], class_name: 'boom_item' },
                    'health': { left: left[4], top: top[4], class_name: 'heart_item' }
                }
                let posItem = bonusItems[item];
                playAudio('assets/audio/treasure.mp3');

                let classReward = $(".chest_bonus .item_bonus");
                classReward.css({ opacity: 1 }).addClass(posItem.class_name);
                setTimeout(function () {
                    classReward.animate({ left: posItem.left, top: posItem.top, opacity: '0' }, 1000);
                    classReward.animate({ left: "50%", top: "50%" });
                }, 500);
                setTimeout(function () {
                    ChallengeItem.onOpenBonus(item, quantity);
                    // updateReward(item, quantity);
                    applyScope($scope);
                    classReward.removeClass(posItem.class_name);
                }, 1500)
            }

            self.closeProfile = function () {
                callInitAPI();
                self.openProfileBox = false;
            }

            self.toggleInvitePopup = function () {
                $('.js-challenge-popup').toggle(200);
                $rootScope.searchStr = '';
                $rootScope.messageError = '';
                self.refreshRecentOpponents();
            }

            self.refreshRecentOpponents = function () {
                //Loading animation
                $('.js-challenge-popup__refresh-button-div__glyphicon-refresh').hide();
                $('.js-challenge-popup__refresh-button-div__loading-image').show();
                socketService.getRecentOpponents($localStorage.guest_id)
                    .then((res) => {
                        //Timeout to remove loading animation
                        setTimeout(function () {
                            $('.js-challenge-popup__refresh-button-div__loading-image').hide();
                            $('.js-challenge-popup__refresh-button-div__glyphicon-refresh').show();
                        }, 300);
                        if (res.code == 1) {
                            $scope.recentOpponents = res.data;
                        }
                        else $scope.recentOpponents = [];
                    })
                    .catch((err) => {
                        console.log(err);
                        $('.js-challenge-popup__refresh-button-div__loading-image').hide();
                        $('.js-challenge-popup__refresh-button-div__glyphicon-refresh').show();
                    })
            }

            self.openTapRankAllUser = function () {
                delete $scope.userBySchool;
                delete self.ownerRank;
                getUserLeaderboard(50);
                getOwnerRank($localStorage.guest_id);
            }

            self.openTapRankBySchool = function () {
                $scope.userBySchool = true;
                if ($rootScope.playerStat.school) {
                    getUserLeaderboard(50, $localStorage.auth.school.id);
                    getOwnerRank($localStorage.guest_id, $localStorage.auth.school.id);
                } else {
                    self.messageInRankBySchool = $rootScope.language === 'vn' ? 'Bạn chưa cập nhật thông tin trường học' : 'Not available in your country';
                    delete self.leaderboardValues;
                }
            }

            self.openUserTap = function () {
                delete $scope.schoolTabOpenning;
                delete self.leaderboardSchoolRank;
                delete self.leaderboardValues;
                delete $scope.showSchoolScore;
                delete $scope.showSchoolTotalStudent;
                if ($localStorage.auth.school) {
                    self.openTapRankBySchool();
                } else {
                    self.openTapRankAllUser();
                }
            }

            self.openSchoolTap = function () {
                if (!$scope.showSchoolScore) {
                    $scope.schoolTabOpenning = true;
                    $scope.showSchoolScore = true;
                    delete self.ownerRank;
                    delete $scope.showSchoolTotalStudent;
                    getSchoolLeaderboard(50);
                    if ($localStorage.auth && ($localStorage.auth.school || $rootScope.playerStat.school.id)) {
                        getSchoolRank($localStorage.auth.school.id);
                    }
                }
            };

            self.openSchoolTotalStudentTap = function () {
                if (!$scope.showSchoolTotalStudent) {
                    $scope.showSchoolTotalStudent = true;
                    delete $scope.showSchoolScore;
                    delete self.ownerRank;
                    getSchoolLeaderboard();
                }
            };

            function reorderLeaderboardFromLocal(array, owner, score) {
                var replace = false;
                var newLeaderboard;
                var ownerIndex = array.findIndex(function(item) {
                    return (item.guest_id === owner.guest_id && owner.guest_id != undefined) || (item.id === owner.id && owner.id != undefined)
                });
                if (ownerIndex >= 0) {
                    array[ownerIndex].score = score;
                    newLeaderboard = array;
                    replace = true;
                    newLeaderboard.sort(function (prevEle, nextEle) {
                        return nextEle.score - prevEle.score;
                    });
                }else {
                    for (var i = 0; i < array.length; i++) {
                        if (((array[i].guest_id !== owner.guest_id && owner.guest_id != undefined)
                            || (array[i].id !== owner.id && owner.id != undefined))
                            && array[i].score < score && !replace) {
                                var subArrLength = array.length - i;
                                var newArr = array;
                                newLeaderboard = newArr.splice(i, subArrLength, owner).concat(array.splice(0, i + 1));
                                replace = true;
                                break;
                        }
                    }
                }

                if (!replace) {
                    newLeaderboard = array;
                }

                return newLeaderboard;
            }

            function getUserLeaderboard(limit, school) {
                self.loading_rank = true;
                var currentTime = new Date().getTime();
                $localStorage.timeCallRank = $localStorage.timeCallRank ? $localStorage.timeCallRank : {};
                if (school == undefined) {
                    if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.all
                        || timeFromLastUpdate($localStorage.timeCallRank.all, currentTime) > 2
                        || !$localStorage.allRank || $localStorage.allRank.length === 0) {
                        $localStorage.timeCallRank.all = new Date().getTime();
                        challengeService.getTopUsers(limit, function (data, err) {
                            self.loading_rank = false;
                            if (data) {
                                self.leaderboardValues = data.data;
                                $localStorage.allRank = data.data;
                                self.loading_rank = false;
                            }
                        });
                    } else {
                        self.loading_rank = false;
                        if ($localStorage.warPlayerState) {
                            var leaderboard = $localStorage.allRank;
                            var user = {
                                guest_id: $localStorage.guest_id,
                                avatar: $localStorage.auth.avatar,
                                username: $localStorage.auth.display_name,
                                school: $localStorage.auth.school,
                                score: $localStorage.warPlayerState.win_number
                            };
                            var userScore = $localStorage.warPlayerState.win_number;
                            self.leaderboardValues = reorderLeaderboardFromLocal(leaderboard, user, userScore);
                            $localStorage.allRank = self.leaderboardValues;
                        } else {
                            self.leaderboardValues = $localStorage.allRank;
                        }
                    }
                } else {
                    if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.schoolmate
                        || timeFromLastUpdate($localStorage.timeCallRank.schoolmate, currentTime) > 2
                        || !$localStorage.schoolmateRank || $localStorage.schoolmateRank.length === 0) {
                        $localStorage.timeCallRank.schoolmate = new Date().getTime();
                        challengeService.getTopUserBySchool(limit, school, function (data, err) {
                            self.loading_rank = false;
                            if (data) {
                                self.leaderboardValues = data.data;
                                $localStorage.schoolmateRank = data.data;
                                self.loading_rank = false;
                            }
                        });
                    } else {
                        self.loading_rank = false;

                        if ($localStorage.warPlayerState && $localStorage.auth) {
                            var leaderboard = $localStorage.schoolmateRank;
                            var user = {
                                guest_id: $localStorage.guest_id,
                                avatar: $localStorage.auth.avatar,
                                username: $localStorage.auth.display_name,
                                school: $localStorage.auth.school,
                                score: $localStorage.warPlayerState.win_number
                            };
                            var userScore = $localStorage.warPlayerState.win_number;
                            self.leaderboardValues = reorderLeaderboardFromLocal(leaderboard, user, userScore);
                        } else {
                            self.leaderboardValues = $localStorage.schoolmateRank;
                        }
                    }
                }
                console.log('leaderboard', self.leaderboardValues);
            }

            function getOwnerRank(guestId, schoolId) {
                $localStorage.rank = $localStorage.rank ? $localStorage.rank : {};
                var currentTime = new Date().getTime();
                if (!schoolId || !$localStorage.auth || !$localStorage.auth.school) {
                    if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.all
                        || timeFromLastUpdate($localStorage.timeCallRank.all, currentTime) > 2
                        || !$localStorage.rank.all) {
                        $localStorage.timeCallRank.all = new Date().getTime();
                        challengeService.getUserRank($localStorage.guest_id, null, function (rank) {
                            if (rank) {
                                self.ownerRank = rank.data;
                                $localStorage.rank.all = rank.data;
                            }
                        })
                    } else {
                        self.ownerRank = $localStorage.rank.all;
                        self.ownerRank.score = $localStorage.warPlayerState ? $localStorage.warPlayerState.win_number : self.ownerRank.score;
                        if ($localStorage.allRank) {
                            var userRank = $localStorage.allRank.findIndex(function(item) {
                                return item.guest_id === $localStorage.guest_id;
                            });
                            self.ownerRank.userRank = userRank >= 0 ? userRank + 1 : self.ownerRank.userRank;
                        }
                    }
                } else {
                    if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.schoolmate
                        || timeFromLastUpdate($localStorage.timeCallRank.schoolmate, currentTime) > 2
                        || !$localStorage.rank.schoolmate) {
                        $localStorage.timeCallRank.schoolmate = new Date().getTime();
                        challengeService.getUserRank($localStorage.guest_id, schoolId, function (rank) {
                            if (rank) {
                                self.ownerRank = rank.data;
                                $localStorage.rank.schoolmate = rank.data;
                            }
                        });
                    } else {
                        self.ownerRank = $localStorage.rank.schoolmate;
                        self.ownerRank.score = $localStorage.warPlayerState ? $localStorage.warPlayerState.win_number : self.ownerRank.score;
                        if ($localStorage.schoolmateRank) {
                            var userRank = $localStorage.schoolmateRank.findIndex(function(item) {
                                return item.guest_id === $localStorage.guest_id;
                            });
                            self.ownerRank.userRank = userRank >= 0 ? userRank + 1 : self.ownerRank.userRank;
                        }
                    }
                }
            }

            function getSchoolLeaderboard(limit) {
                self.loading_rank = true;
                $localStorage.timeCallRank = $localStorage.timeCallRank ? $localStorage.timeCallRank : {};
                $localStorage.rank = $localStorage.rank ? $localStorage.rank : {};
                var currentTime = new Date().getTime();
                if ($scope.showSchoolScore) {
                    if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.school
                        || timeFromLastUpdate($localStorage.timeCallRank.school, currentTime) > 2
                        || !$localStorage.schoolRank || $localStorage.schoolRank.length === 0) {
                        $localStorage.timeCallRank.school = new Date().getTime();
                        challengeService.getTopSchools(limit, function (data, err) {
                            self.loading_rank = false;
                            if (data) {
                                self.leaderboardSchoolRank = data.data;
                                $localStorage.schoolRank = data.data;
                            }
                        });
                    } else {
                        self.loading_rank = false;
                        if ($localStorage.auth && $localStorage.auth.school) {
                            var leaderboard = $localStorage.schoolRank;
                            var school = $localStorage.auth.school;
                            var schoolScore = $localStorage.auth.school.score;
                            self.leaderboardSchoolRank = reorderLeaderboardFromLocal(leaderboard, school, schoolScore);
                        } else {
                            self.leaderboardSchoolRank = $localStorage.schoolRank;
                        }
                    }
                } else if ($scope.showSchoolTotalStudent) {
                    if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.totalStudent
                        || timeFromLastUpdate($localStorage.timeCallRank.totalStudent, currentTime) > 2
                        || !$localStorage.schoolRankByTotalStudent || $localStorage.schoolRankByTotalStudent.length === 0) {
                        $localStorage.timeCallRank.totalStudent = new Date().getTime();
                        challengeService.getTopSchoolByTotalStudent(function (data, err) {
                            self.loading_rank = false;
                            if (data) {
                                self.leaderboardSchoolRank = data.data.length > 50 ? data.data.slice(0, 49) : data.data;
                                $localStorage.schoolRankByTotalStudent = data.data;
                                var ownerRank = data.data.filter(function (school) {
                                    return school.school == $localStorage.auth.school.id;
                                });
                                self.ownerRank = ownerRank[0] ? ownerRank[0] : {};
                                self.ownerRank.schoolRank = data.data.indexOf(ownerRank[0]) + 1;
                            }
                        });
                    } else {
                        self.loading_rank = false;
                        self.leaderboardSchoolRank = $localStorage.schoolRankByTotalStudent.length > 50 ? $localStorage.schoolRankByTotalStudent.slice(0, 49) : $localStorage.schoolRankByTotalStudent;
                        if ($localStorage.auth && $localStorage.auth.school) {
                            var ownerRank = $localStorage.schoolRankByTotalStudent.filter(function (school) {
                                return school.school == $localStorage.auth.school.id;
                            });
                            self.ownerRank = ownerRank[0] ? ownerRank[0] : {};
                            self.ownerRank.schoolRank = $localStorage.schoolRankByTotalStudent.indexOf(ownerRank[0]) + 1;
                        }
                    }
                }
            }

            function getSchoolRank(schoolId) {
                self.loading_rank = true;
                $localStorage.rank = $localStorage.rank ? $localStorage.rank : {};
                var currentTime = new Date().getTime();
                if (!$localStorage.timeCallRank || !$localStorage.timeCallRank.school
                    || timeFromLastUpdate($localStorage.timeCallRank.school, currentTime) > 2
                    || !$localStorage.rank.school) {
                    $localStorage.timeCallRank.school = new Date().getTime();
                    challengeService.getSchoolRank(schoolId, function (data, err) {
                        self.loading_rank = false;
                        if (data) {
                            self.ownerRank = data.data;
                            $localStorage.rank.school = data.data;
                        }
                    });
                } else {
                    self.loading_rank = false;
                    self.ownerRank = $localStorage.rank.school;
                    if ($localStorage.auth && $localStorage.auth.school && $localStorage.schoolRank && $localStorage.schoolRank.length > 0) {
                        self.ownerRank.score = $localStorage.auth.school.score;
                        if ($localStorage.schoolRank) {
                            var schoolRank = $localStorage.schoolRank.findIndex(function(item) {
                                return item.id === $localStorage.auth.school.id;
                            });
                            self.ownerRank.schoolRank = schoolRank >= 0 ? schoolRank + 1 : self.ownerRank.schoolRank;
                        }
                    }
                }
            }

            function timeFromLastUpdate(startTime, currentTime) {
                return (currentTime - startTime) / 3600000;
            }

            function initSkills() {
                $scope.player = {
                    state: {
                        freezed: false,
                        bombed: false,
                        die: false,
                        health: [1, 1, 1],
                        win: false
                    }
                };
            }

            function chestNotiEffect() {
                if (self.userGroupChestNoti == 1) {
                    $timeout(function () {
                        $('#chest-noti').addClass('chest-noti-message-display');
                    }, 100);
                }
            }

            function playAudio(audio) {
                var audio = new Audio(audio);
                audio.play();
            }

            function updateReward(reward, number) {
                number = number || 1;

                switch (reward) {
                    case 'unfreeze':
                        // $scope.player.ability.unfreeze = $scope.player.ability.unfreeze + number;
                        break;
                    case 'freeze':
                        // $scope.player.ability.freeze = $scope.player.ability.freeze + number;
                        break;
                    case 'bomb':
                        // $scope.player.ability.boom = $scope.player.ability.boom + number;
                        break;
                    case 'health':
                        // $scope.player.ability.heart = $scope.player.ability.heart + number;
                        break;
                }

                // $localStorage.ability = $scope.player.ability;
            }
            let myIndex = 0;
            function carousel() {
              const ele = document.getElementsByClassName("slider");
              for (let i = 0; i < ele.length; i++) {
                ele[i].style.display = 'none';
              }
              myIndex++;
              if (myIndex > ele.length) {myIndex = 1}
              ele[myIndex-1].style.display = 'block';
              setTimeout(carousel, 10000);
            }
            carousel();
            callInitAPI();
            initSkills();
        }]
})
