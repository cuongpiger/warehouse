'use strict';

angular.module("lesson.challenge_new").component("challengeNew", {
    templateUrl: "app/components/lesson/challenge-new/challenge.template.html",
    controller: ["$scope", "$rootScope", "$localStorage", "$interval", "$timeout", "challengeService", 'challenge.io.service', "$sce", "challenge.items.service",
        function challengeController($scope, $rootScope, $localStorage, $interval, $timeout, challengeService, socketService, $sce, ChallengeItem) {
            this.challengeItems = ChallengeItem.get();
            this.bonusStat = ChallengeItem.getBonusStat();
            $scope.localesMessage = challengeLocales;

            sendGa($localStorage.auth, 'War', 'Use', 'War_use');

            $rootScope.io.on('connect', () => {
                $scope.connectServer = true;
                Promise.all([
                    ChallengeItem.fetch(),
                    ChallengeItem.fetchBonusStat()
                ]).then(() => {
                    this.challengeItems = ChallengeItem.get();
                    this.bonusStat = ChallengeItem.getBonusStat();
                    this.init();
                })
                .catch((error) => {
                    // TODO
                    console.log('error', error);
                });
            });

            this.init = () => {
                // thông báo nếu đã mở được gold chest
                if (this.bonusStat.gold_chest >= 3) {
                    self.tooltipMessage = 'Gold chest available';
                    chestNotiEffect();
                    if (!$localStorage.showHint) {
                        self.isClose = true;
                    }
                }
            };

            $(".challenge_btn").tooltip({});
            $localStorage.auth = $rootScope.loggedIn ? ($localStorage.auth ? $localStorage.auth : localStorage.getItem('user')) : '';
            var user_token = $localStorage.auth ? $localStorage.auth.user_token : '';
            let self = this;
            self.auth = $localStorage.auth;
            self.localesMessage = settingLocales;
            self.titleCourse = $rootScope.language === 'vn' ? 'Từ vựng cơ bản' : "Vocabulário básico";
            self.titleBtn = $rootScope.language === 'vn' ? 'Thách đấu' : "Challenge";
            var broadcastFinished = false;
            var opponentHasLeft = false;
            var currentItemInLeaderboard = 0;
            var currentItemInRankBySchool = 0;
            var closeDisconnectNoti;
            var ending = new Audio('assets/audio/ending_sound.wav');
            var startingSound = new Audio('assets/audio/starting_sound.mp3');
            var notice = new Audio('assets/audio/notice.mp3');
            var botCorrectSound;
            var countdown;
            var countdownStart;
            var freezedCountdown;
            var ticktock;
            let finished = false;
            var nextQuestionStep;
            var answeredWords = [];
            var flagToPreventStartTwice = false;
            var flagToPreventInviteTwice = false;
            var challengeConfig = {
                time: 59,
                opponent: {
                    freezedChance: 30,
                    minAnswer: 10,
                    maxAnswer: 15,
                    boomChance: 40,
                    eatHpChance: 10,
                    randomLoseHpChance: 40,
                    randomBotScoreChance: 5
                },
                freezedTime: 10000
            };
            var checkedTrue;
            var questionIndex = 0;
            var botAnswerTimeout;
            var usedwordData = [];
            var usedCorrectWord = [];
            var wordData;
            var countImage = 0, countAudio = 0;
            $rootScope.challengeState = 'preparing';
            var inviteTimeout;
            var startCountdown;
            var clientFinish;

            $rootScope.userAccept = [];
            var invitation = {};
            $scope.userWord = [];
            if ($localStorage.unitSettingSelected) {
                const stIndex = $localStorage.unitSettingSelected.length >= 100 ? 90 : 0;
                getDetailUnit($localStorage.unitSettingSelected[stIndex])
            }
            $scope.$on('change_course', function () {
                if ($localStorage.unitSettingSelected) {
                    getDetailUnit($localStorage.unitSettingSelected[0])
                }
            });
            
            self.toggleSetting = function () {
                if (!$localStorage.isSetUnit) {
                    $localStorage.unit = Array.from({length: 100}, (v, k) => k+1);
                    $localStorage.isSetUnit = true;
                }
                $rootScope.random = 1;
                $rootScope.isLearn_word = false;
                $rootScope.isQuote = false;
                $rootScope.elightube = false;
                $rootScope.topic = true;
            };
            
            function getDetailUnit (id) {
                let unitsConcats = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);
                self.unitDetail = true;
                let wordReview;
                wordReview = $localStorage.wordReview;
                let allWords = unitsConcats[id - 1].words;
                let allOldWords = wordReview ? wordReview.slice(0) : [];
                let allWordsTemp = _.pluck(allWords, 'word');
                let oldWordsTemp = _.pluck(allOldWords, 'word');
                let newWordsTemp = _.difference(allWordsTemp, oldWordsTemp);

                self.unitInfor = {
                    total :allWords.length,
                    image: allWords[0].image,
                    title : unitsConcats[id - 1].title,
                    newWord: newWordsTemp.length,
                    detail : $rootScope.language === 'vn' ? unitsConcats[id - 1].description : unitsConcats[id - 1].description_por,
                    index : id
                };
                let oldWord = self.unitInfor.total - self.unitInfor.newWord;
                let newWord = self.unitInfor.newWord - 3;
                AmCharts.makeChart( "process_unit_course", {
                    "type": "pie",
                    "theme": "light",
                    "dataProvider": [ {
                        "title": self.localesMessage[22][$rootScope.language],
                        "value": oldWord,
                        "color": "#FFCB08",
                        "colorTitle": "#ffffff"
                    }, {
                        "title": self.localesMessage[23][$rootScope.language],
                        "value": newWord,
                        "color": "#E5E6E5",
                        "colorTitle": "#ffffff"
                    } ],
                    "percentPrecision": 2,
                    "precision": 1,
                    "titleField": "title",
                    "valueField": "value",
                    "labelRadius": 3,
                    "radius": "22%",
                    "pullOutDuration": 0,
                    "pullOutRadius": 0,
                    "colorField": "color",
                    "innerRadius": "90%",
                    "labelColorField": "colorTitle",
                    "labelText": "[[title]]: [[value]] ",
                    "startDuration": 0,
                } );
            }
            self.tooltipMessage = $rootScope.language === 'vn' ? 'Thách đấu cùng eLight' : "Elight's Challenge";
            // A/B testing hiển thị chest noti
            if ($localStorage.auth) {
                self.userGroupChestNoti = 1;
                self.userGroup = $localStorage.auth.id % 3;
                self.messageInRankBySchool = false;
            } else if ($localStorage.guest_id) {
                self.userGroupChestNoti = 1;
                self.userGroup = $localStorage.guest_id % 3;
            }
            self.userBannerType = $localStorage.guest_id % 2;

            if ($localStorage.auth && $localStorage.auth.actived_code && ($localStorage.auth.actived_code.new_code > 0 || $localStorage.auth.actived_code.count_use_code > 0 || $localStorage.auth.actived_code.count_user_courses > 0)) {
                self.isCloseBanner = true;
            }

            self.trackingBanner = function (bannerType) {
                var banner = bannerType.toString();
                _gaq.push(['_trackEvent', 'War BN', 'Go To LP', banner]);
            };
            // thông báo nếu đã mở được gold chest
            if ($rootScope.warWin >= 100) {
                self.goldBonusProgress = $rootScope.warWin;
                self.tooltipMessage = 'Gold chest available';
                chestNotiEffect();
                if (!$localStorage.showHint) {
                    self.isClose = true;
                }
            }

            function chestNotiEffect() {
                if (self.userGroupChestNoti == 1) {
                    $timeout(function () {
                        $('#chest-noti').addClass('chest-noti-message-display');
                    }, 100);
                }
            }

            self.trackingChestNotiPostion = function () {
                if (self.userGroupChestNoti == 0) {
                    _gaq.push(['_trackEvent', 'CHEST_NOTI', 'main screen', '']);
                } else if (self.userGroupChestNoti == 1) {
                    _gaq.push(['_trackEvent', 'CHEST_NOTI', 'bottom right', '']);
                }
            };

            // CHALLENGE NOTI
            // tạo 1 ngày ngẫu nhiên để thông báo challenge
            if (!$localStorage.dayPushChallengeNoti) {
                createDayPushChallengeNoti();
            }

            function createDayPushChallengeNoti() {
                var distanceDay = Math.floor((Math.random() * 3) + 1);
                var dayPushNoti = new Date().setHours(0, 0, 0, 0) + distanceDay * 24 * 60 * 60 * 1000;
                $localStorage.dayPushChallengeNoti = dayPushNoti;
            }

            // sử dụng biến để kiểm tra khi tương tác trên các phần khác
            $rootScope.checkConditionPushChallengeNoti = function () {
                var today = new Date().setHours(0, 0, 0, 0);
                if (today == $localStorage.dayPushChallengeNoti && !$localStorage.isPushChallengeNoti) {
                    var messages = ['Có người đã thách đấu bạn', 'Chơi ngay để nhận quà'];
                    var index = Math.floor(Math.random(messages.length));
                    self.messageNoti = messages[index];
                    $rootScope.showChallengeNoti = true;
                    notice.play();
                    self.userGroupChestNoti = 1;
                    $localStorage.isPushChallengeNoti = true;
                    self.timeShowNoti = Date.now() + 10000;
                    challengeNotiEffect();
                    createDayPushChallengeNoti();
                } else {
                    $localStorage.isPushChallengeNoti = false;
                    delete $rootScope.showChallengeNoti;
                }
            };

            $scope.inviteRecent = (guestId) => {
                self.recentGuestId = guestId;

                $scope.invite(guestId);
            };

            $scope.reInvite = () => {
                if (self.recentGuestId) {
                    $scope.invite(self.recentGuestId);
                } else {
                    $scope.invite();
                }
            };

            /**
             * Invite
             * @param  {mix} guest_id
             * @return {void}
             */
            $scope.invite = function (guest_id) {
                self.isPlayingWithBot = false;
                let searchStr;
                if (guest_id) {
                    searchStr = guest_id;
                } else {
                    self.recentGuestId = null;
                    searchStr = $rootScope.searchStr;
                }

                if (invitation && !angular.equals({}, invitation) && $rootScope.showChallengeInvited) {
                    var opponentGuessId = invitation.hostGuestId
                        ? invitation.hostGuestId
                        : invitation.guest_id;
                    if (opponentGuessId == guest_id) {
                        self.userAcceptPlay();
                    } else {
                        challengeNoti($rootScope.language === 'vn' ? "Bạn không thể mời chơi lúc này" : "You cannot invite now.");
                    }

                    return;
                }

                if (flagToPreventInviteTwice) {
                    return;
                }

                delete self.rematchStatus;
                delete $rootScope.messageError;

                if (searchStr && searchStr == $localStorage.guest_id) {
                    $rootScope.messageError = $rootScope.language === 'vn' ? "Bạn không thể thách đấu với chính mình" : "You cannot challenge yourself!";
                    return;
                }

                $scope.inviteUser(searchStr);

                flagToPreventInviteTwice = true;
                setTimeout(function () {
                    flagToPreventInviteTwice = false;
                }, 500);
                applyScope($scope);
            };

            $scope.inviteUser = (guestId) => {
                socketService.inviteUserByUserId($localStorage.auth, guestId)
                    .then((response) => {
                        console.log(response);
                        if (response.status == 1) {
                            delete $rootScope.userAccept;
                            $scope.showOpponent = false;
                            invitation = {};
                            $rootScope.challengeState = 'waitingUser';
                            $rootScope.playRealtimeMode = true;
                            delete $scope.AI;

                            response.opponentInfo = response.opponentInfo || {}

                            if ($rootScope.stepInvite) {
                                $rootScope.stepInvite++;
                            } else {
                                $rootScope.stepInvite = 1;
                            }
                            self.hostSocketId = response.hostSocketId;
                            $rootScope.roomName = response.roomName;
                            $rootScope.userAccept = {};
                            $rootScope.userAccept.waiting = statusGame.waiting;
                            $rootScope.userAccept.ready = false;
                            $('.spinner').hide();

                            $rootScope.userAccept.avatar = response.opponentInfo.avatar;
                            $rootScope.userAccept.school = response.opponentInfo.school;
                            $rootScope.userAccept.username = response.opponentInfo.username;
                            $rootScope.userAccept.guest_id = response.opponentInfo.guest_id;
                            applyScope($scope);
                            inviteTimeout = setTimeout(function () {
                                self.finishCountDown();
                                applyScope($scope);
                            }, 10000);
                        } else if (response.status == 0) {
                            // $rootScope.messageError = response.message;

                            if (response.code == 'IN_GAME') {
                                challengeNoti($rootScope.language === 'vn' ? response.message : "You are in a room at the moment.");
                                $scope.exitGameScreen();
                            } else if (response.code == 'NO_ONLINE') {
                                // if dont have user online then switch to play with bot mode
                                playGameWithBot();
                            } else {
                                if($rootScope.language === 'vn') {
                                    challengeNoti(response.message);
                                }
                                else {
                                    if(response.code == 'OPP_IN_GAME'){
                                        challengeNoti("Your opponent is in a room at the moment.");
                                    }
                                    else if(response.code == 'OPP_OFFLINE'){
                                        challengeNoti("Your opponent is currently offline.");
                                    }
                                    else if(response.code == 'UNKNOWN' || response.code == 'OPP_UNKNOWN'){
                                        challengeNoti("Something went wrong. Please try again!");
                                    }
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        $rootScope.messageError = $rootScope.language === 'vn' ? "Đã có lỗi xảy ra, vui lòng thử lại." : "Something went wrong. Please try again.";
                    })
            }

            $scope.inviteSpecificUser = (exist, guestId) => {
                socketService.inviteUserByUserId($localStorage.auth, guestId)
                    .then((response) => {
                      _gaq.push(['_trackEvent', 'WAR_', 'Invite', 'Specific']);
                        $localStorage.opponentGuestId = guestId;
                        if (response.status == 1) {
                            exist.waiting = statusGame.waiting;
                            exist.messageDeny = "";
                            exist.ready = false;
                            $rootScope.userAccept = exist;
                            applyScope($rootScope);
                            $('.spinner').hide();
                            $scope.showOpponent = false;
                            $rootScope.challengeState = 'waitingUser';
                            if (!localStorage.realtimePlayerScore) {
                                $localStorage.realtimePlayerScore = {};
                                $localStorage.realtimePlayerScore[guestId] = 0;
                                $localStorage.realtimePlayerScore[$localStorage.guest_id] = 0;
                            }
                            $rootScope.playRealtimeMode = true;
                            delete $scope.AI;

                            if ($rootScope.stepInvite) {
                                $rootScope.stepInvite++;
                            } else {
                                $rootScope.stepInvite = 1;
                            }
                            self.hostSocketId = response.hostSocketId;
                            $rootScope.roomName = response.roomName;
                            inviteTimeout = setTimeout(function () {
                                self.finishCountDown();
                                applyScope($scope);
                            }, 10000);
                        } else if (response.status == 0) {
                            // $rootScope.messageError = response.message;
                            challengeNoti(response.message);

                            if (response.code == 'IN_GAME') {
                                $scope.exitGameScreen();
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        $rootScope.messageError = "Đã có lỗi xảy ra, vui lòng thử lại."
                    })
            }

            $scope.inviteRandomUser = () => {
                socketService.inviteUserByUserId($localStorage.auth, null)
                    .then((response) => {
                      _gaq.push(['_trackEvent', 'WAR_', 'Invite', 'Random']);
                        if (response.status == 1) {
                            delete $rootScope.userAccept;
                            $scope.showOpponent = false;
                            invitation = {};
                            $rootScope.challengeState = 'waitingUser';
                            $rootScope.playRealtimeMode = true;
                            delete $scope.AI;

                            response.opponentInfo = response.opponentInfo || {}

                            if ($rootScope.stepInvite) {
                                $rootScope.stepInvite++;
                            } else {
                                $rootScope.stepInvite = 1;
                            }
                            self.hostSocketId = response.hostSocketId;
                            $rootScope.roomName = response.roomName;
                            $rootScope.userAccept = {};
                            $rootScope.userAccept.waiting = statusGame.waiting;
                            $rootScope.userAccept.ready = false;
                            $('.spinner').hide();

                            $rootScope.userAccept.avatar = response.opponentInfo.avatar;
                            $rootScope.userAccept.school = response.opponentInfo.school;
                            $rootScope.userAccept.username = response.opponentInfo.username;
                            $rootScope.userAccept.guest_id = response.opponentInfo.guest_id;
                            //$('#opponent-avatar').attr('src', $rootScope.userAccept.avatar);
                            applyScope($scope);
                            inviteTimeout = setTimeout(function () {
                                self.finishCountDown();
                                applyScope($scope);
                            }, 10000);
                        } else if (response.status == 0) {
                            // $rootScope.messageError = response.message;

                            if (response.code == 'IN_GAME') {
                                challengeNoti(response.message);
                                $scope.exitGameScreen();
                            } else if (response.code == 'NO_ONLINE') {
                                // if dont have user online then switch to play with bot mode
                                playGameWithBot();
                            } else {
                                challengeNoti(response.message);
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        $rootScope.messageError = "Đã có lỗi xảy ra, vui lòng thử lại."
                    })
            }

            socketService.onInviteUser(function (response) {
                clearTimeout(closeDisconnectNoti);
                $rootScope.messageError = "";
                self.opponentStatus = '';
                $rootScope.showChallengeInvited = false;
                applyScope($scope);
                $rootScope.roomName = response.roomName;
                invitation = {
                    username: response.username,
                    avatar: response.avatar,
                    school: response.school ? response.school.school_name : '',
                    hostGuestId: response.hostGuestId,
                    specialAvatar: $localStorage.season.schoolWinLastSeason !== undefined && response.school == $localStorage.season.schoolWinLastSeason
                };
                self.messageInvite = response.message;
                $rootScope.showChallengeInvited = true;
                self.timeShowNoti = Date.now() + 10000;
                let notice = new Audio('assets/audio/notice.mp3');
                notice.play();
                applyScope($scope);
            });

            self.userAcceptPlay = function () {
                _gaq.push(['_trackEvent', 'WAR_', 'Invite', 'Accept invite']);
                self.isUserAccept = true;
                self.isPlayingGame = true;
                broadcastFinished = false;
                $rootScope.random = 3;
                $rootScope.challengeScreen = 1;
                $rootScope.userAccept = invitation;
                $rootScope.playRealtimeMode = true;
                delete $scope.AI;
                delete $rootScope.showChallengeNoti;
                delete $rootScope.showChallengeInvited;
                $scope.showOpponent = false;
                $rootScope.challengeState = 'waitingUser';
                let userAccept = $rootScope.userAccept;
                userAccept.waiting = false;
                userAccept.ready = true;
                getPlayerStat();
                socketService.acceptInvite($rootScope.roomName, userAccept.hostGuestId, $localStorage.guest_id)
                    .then(function (response) {
                        wordData = response.questions;
                        self.isUserAccept = false;
                        if (!localStorage.realtimePlayerScore) {
                            $localStorage.realtimePlayerScore = {};
                            $localStorage.realtimePlayerScore[userAccept.hostGuestId] = 0;
                            $localStorage.realtimePlayerScore[$localStorage.guest_id] = 0;
                        }
                        self.joinGame(response.questions, $rootScope.roomName);
                        $localStorage.opponentGuestId = userAccept.hostGuestId;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            self.finishCountDown = function () {
                delete $rootScope.showChallengeInvited;
                $rootScope.playRealtimeMode = false;
                socketService.denyInvite($rootScope.roomName, self.hostSocketId)
                    .then(function (response) {
                      console.log('response');
                        invitation.waiting = false;
                        invitation.ready = false;
                        if($rootScope.userAccept){
                            $rootScope.userAccept.waiting = false;
                            $rootScope.userAccept.ready = false;
                        }
                        applyScope($scope);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            $rootScope.$on('deny-invite', function(){
                self.finishCountDown();
            })

            socketService.onDenyInvite(function (response) {
                clearTimeout(inviteTimeout);
                $rootScope.playRealtimeMode = false;
                if ($rootScope.userAccept && $rootScope.userAccept.waiting && $rootScope.userAccept.waiting) {
                    $rootScope.userAccept.waiting = false;
                    $rootScope.userAccept.ready = false;
                    $rootScope.userAccept.messageDeny = response.message;
                }
            });

            socketService.onAcceptInvite(function (response) {
              $localStorage.opponentGuestId = $rootScope.userAccept.guest_id;
              if (!localStorage.realtimePlayerScore) {
                  $localStorage.realtimePlayerScore = {};
                  $localStorage.realtimePlayerScore[$rootScope.userAccept.guest_id] = 0;
                  $localStorage.realtimePlayerScore[$localStorage.guest_id] = 0;
              }
                self.isPlayingWithBot = false;
                clearTimeout(inviteTimeout);
                self.isPlayingGame = true;
                self.chooseOpponentRandomly = false;
                delete $rootScope.stepInvite;
                self.rematchStatus = "READY";
                let userAccept = $rootScope.userAccept;
                userAccept.waiting = false;
                userAccept.ready = true;
                wordData = response.questions;
                $rootScope.roomName = response.roomName;
                self.joinGame(response.questions, response.roomName);
            });

            socketService.onReadyBeforeLoadGame(function (response) {
                delete $rootScope.showChallengeInvited;
            });


            /**
             * End Invite
             */
            function challengeNotiEffect() {
                if (self.userGroupChestNoti == 1) {
                    $timeout(function () {
                        $('#challenge-noti').addClass('chest-noti-message-display');
                    }, 100);
                }
            }

            self.joinGame = function (listQuestions, roomName) {
                $rootScope.random = 3;
                $rootScope.challengeScreen = 1;
                delete $rootScope.showChallengeInvited;
                playGamePvP(listQuestions, roomName);
            };

            function playGamePvP(listQuestions, roomName) {
                if (ending) {
                    ending.pause();
                }
                audio_click();
                loadWordData(listQuestions, roomName);
            }

            socketService.onReadyToCountDown(function () {
                startingCountdown();
            });

            function loadWordData(listQuestions, roomName) {
                var words = listQuestions.map(function (question) {
                    return question.words;
                }).reduce(function (prevArray, nextArray) {
                    return prevArray.concat(nextArray);
                }, []);
                $rootScope.challengeState = 'loading';

                // Reset loading counter
                countImage = 0;
                countAudio = 0;

                Promise.all(preloadImage(words, roomName).concat(preloadAudio(words, roomName))).then(function () {
                    socketService.checkCountDownReady($rootScope.roomName)
                        .then(function (response) {
                            if (response.status == 0) {
                                self.readyMessage = response.message;
                            }
                        })
                        .catch(function (error) {
                            // return "preload error";
                        });
                }).catch(function (err) {
                    // return "preload error";
                });
            }

            // START IN GAME
            function createQuestionGamePvP(listQuestions) {
                self.displayAnswerResult = false;
                $scope.question_answers = listQuestions[questionIndex].words;
                $scope.question = $scope.question_answers[listQuestions[questionIndex].correct];
                $scope.question.result = false;
                // use for review section
                $scope.userWord.push($scope.question);

                var audio = new Audio($scope.question.audio);
                if ($scope.time > 0) {
                    audio.play();
                }

                if (questionIndex > 0) {
                    checkedTrue = false;
                    $('#challenge_question_div').animate({ 'opacity': 0 }, 300);
                    $('#challenge_question_div').animate({ 'opacity': 1 }, 300);
                }
                questionIndex++;
                applyScope($scope);
            }

            self.checkAnswerGamePvP = function (answer, question, key) {
                if (checkedTrue || $scope.player.state.freezed || $scope.question_answers[key].checked) {
                    return;
                }

                $scope.question_answers[key].checked = true;

                if (answer == question) {
                    checkedTrue = true;
                    // use for review section
                    // change result of question if user answer correct
                    if ($scope.userWord.length > 0) {
                        var lastUserWord = $scope.userWord.length - 1;
                        $scope.userWord[lastUserWord].result = true;
                    }
                }

                socketService.answer(answer, (questionIndex - 1), $rootScope.roomName);
            };

            socketService.onPlayerAnswer(function (response) {
                checkedTrue = true;
            });

            socketService.onPlayerAnswerResult(function (response) {
                let answerResult = response.result.status;
                let scores = response.result.score;
                let health = response.result.health;
                let guestId = $localStorage.guest_id;

                self.displayAnswerResult = true;
                if (answerResult == 1) {
                    if (response.userAnswer != guestId) { // opponent answer correct
                        $rootScope.botCorrectAnswer = scores[response.userAnswer];
                        $localStorage.realtimePlayerScore[response.userAnswer] = scores[response.userAnswer];
                        $scope.question_answers[_.findIndex($scope.question_answers, { word: $scope.question.word })].enermyCheck = true;
                    } else { // user answer correct
                        playAudio('assets/audio/right.mp3');
                        animation_change_score('.challenge_score_player');
                        $rootScope.correctAnswer = scores[guestId];
                        $localStorage.realtimePlayerScore[guestId] = scores[guestId];
                    }

                    $timeout(function () {
                        if (!finished && response.currentQuestionIndex == (questionIndex - 1)) {
                            createQuestionGamePvP(wordData);
                        }
                    }, 1000);
                } else if (answerResult == 0) {
                    checkedTrue = false;
                    if (response.userAnswer != guestId) { // Opponent answer incorrect
                        $scope.bot.state.health = health[response.userAnswer];
                        if ($scope.bot.state.health.length == 0) {
                            $scope.bot.state.die = true;
                        }
                    } else { // user answer incorrect
                        playAudio('assets/audio/wrong.mp3');
                        if ($scope.player.state.health.length > 0) {
                            $scope.player.state.health.splice(0, 1);
                            if (self.challengeItems.heart != 0 && !$scope.usedAbilities.heart) {
                                $('.challenge_3_ability_heart').addClass('challenge_ability_icon_scaling');
                            }
                        }
                        if ($scope.player.state.health.length == 0) {
                            $scope.player.state.die = true;
                            checkedTrue = true;
                            // broadCastFinish();
                        }
                    }
                }
            });

            self.initGamePvP = function () {
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Play game PvP']);
                opponentHasLeft = false;
                questionIndex = 0;
                countImage = 0;
                countAudio = 0;
                usedCorrectWord = [];
                usedwordData = [];
                $scope.userWord = [];
                $scope.usedAbilities = {
                    freeze: false,
                    unfreeze: false,
                    bomb: false,
                    heart: false
                };
                reset_game();
                initVariables();
                $scope.time = challengeConfig.time;
                createQuestionGamePvP(wordData);
                countdown = setInterval(function () {
                    if ($scope.time > 0) {
                        $scope.time--;
                        //last 10 seconds sound
                        if ($scope.time == 10) {
                            ticktock = new Audio('assets/audio/ticktock.mp3');
                            ticktock.play();
                        }
                        $scope.$apply();
                    } else {
                        clearInterval(countdown);
                        clearInterval(freezedCountdown);
                        checkedTrue = true;
                        if($rootScope.userAccept && $rootScope.userAccept.hostGuestId){
                          broadCastFinish();
                        }
                        if(!clientFinish) {
                            clientFinish = setTimeout(function () {
                                pvpFinish();
                            }, 3000)
                        }
                    }
                }, 1000);
            }
            // END IN GAME

            // open challenge from button
            self.showChallenge = function () {
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Open game']);
                if ($rootScope.random != 3) {
                    $rootScope.random = 3;
                    $rootScope.challengeScreen = 1;
                    self.closeChestNotiModal();
                    if (!socketService.isConnected()) {
                        $scope.connectServer = false;
                    }else {
                        $scope.connectServer = true;
                    }
                } else {
                    return;
                }
            };

            $rootScope.io.on('disconnect', function(){
              $scope.connectServer = false;
            });
            initGamers();

            $scope.showRejectedText = function () {
                return $rootScope.userAccept && !$rootScope.userAccept.waiting && !$rootScope.userAccept.ready || self.rematchStatus == 'Rejected';
            };

            //back to screen
            $scope.backScreen = function () {
                $scope.exitGameScreen();

                socketService.leaveRoom($rootScope.roomName);
                // getLeaderboard(10, 0, true);
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Back home screen']);
                if (!$rootScope.loggedIn && $rootScope.playAtleastOne) {
                    $("#war__requestLogin").modal('show');
                    $rootScope.playerStat = $localStorage.warGuestState;
                    delete $localStorage.warPlayerState;
                } else {
                    // Ugly fix where display_name is not saved :(
                    // TODO: Check where display_name is added to playerStat
                    $localStorage.warPlayerState = $localStorage.warPlayerState || {};
                    $localStorage.warPlayerState.display_name = $rootScope.playerStat.display_name;

                    $rootScope.playerStat = $localStorage.warPlayerState;
                }

                if (ending) {
                    ending.pause();
                }
            };

            $scope.exitGameScreen = () => {
                self.isPlayingGame = false;
                clearStateVariables();
                delete $rootScope.searchStr;
                delete $rootScope.playRealtimeMode;
                applyScope($scope);
                $rootScope.challengeState = 'preparing';
            };

            // start a game from main screen (random popup to main screen)
            self.readyFromMainScreen = function () {
                $rootScope.challengeScreen = 1;
                self.replay();
            };

            // start game from main menu
            $scope.play_game = function (time) {
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Play game']);
                //check status before get to play
                $('.spinner').show();
                if (!flagToPreventStartTwice) {
                    if (invitation && !angular.equals({}, invitation) && $rootScope.showChallengeInvited && !self.endingInvite) {
                    // if (invitation && $rootScope.showChallengeInvited && !self.endingInvite) {
                        self.userAcceptPlay();
                    } else {
                        self.chooseOpponentRandomly = true;
                        invitation = {};
                        delete $rootScope.userAccept;
                        // in case dont have any user online or user send invite request twice
                        // => play with bot
                            //fake test
                        let maximumStepInvite = 0;
                        if ($rootScope.stepInvite > maximumStepInvite) {
                            _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Play game with bot']);
                            playGameWithBot();
                        } else {
                            $scope.invite();
                        }
                    }

                    flagToPreventStartTwice = true;
                    setTimeout(function () {
                        flagToPreventStartTwice = false;
                    }, 500);
                    applyScope($scope);
                }
                else return;
            };

            function challengeNoti(message) {
                $rootScope.showNoti = message;
                applyScope($scope);
                setTimeout(function () {
                    delete $rootScope.showNoti;
                    applyScope($scope);
                }, 4000)
            }

            function playGameWithBot() {
              _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Play game with bot']);
                self.isPlayingWithBot = true;
                self.chooseOpponentRandomly = false;
                delete $rootScope.playRealtimeMode;
                delete $rootScope.stepInvite;
                if (socketService.isConnected()) {
                    searching();
                    // socketService.updateUserStatus($localStorage.guest_id, 2)
                    //     .then(function (response) {
                    //         if (response.status === 1) {
                    //             if (ending) {
                    //                 ending.pause();
                    //             }
                    //             searching();
                    //         } else {
                    //             console.log(response.err);
                    //         }
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error)
                    //     });
                } else {
                    challengeNoti('Không thể kết nối tới server.');
                    // searching();
                }
            }

            self.playQuestionAudio = function (questionAudio) {
                var audio = new Audio(questionAudio);
                if ($scope.time > 0) {
                    audio.play();
                }
            };

            // check if answer is correct
            self.checkAnswer = function (answer, key) {
                if (!checkedTrue && !$scope.player.state.freezed && !$scope.question_answers[key].checked) {
                    $scope.question_answers[key].checked = true;
                    if (answer == $scope.answer[0].word) {
                        $timeout.cancel(botAnswerTimeout);
                        playAudio('assets/audio/right.mp3');
                        checkedTrue = true;
                        animation_change_score('.challenge_score_player');
                        $rootScope.correctAnswer++;
                        nextQuestionStep = $timeout(function () {
                            if (!finished) {
                                nextStep(true, $scope.answer[0]);
                            }
                        }, 1000);
                    } else {
                        playAudio('assets/audio/wrong.mp3');
                        if ($scope.player.state.health.length > 0) {
                            $scope.player.state.health.splice(0, 1);
                            if (self.challengeItems.heart != 0 && !$scope.usedAbilities.heart) {
                                $('.challenge_3_ability_heart').addClass('challenge_ability_icon_scaling');
                            }
                        }
                        if ($scope.player.state.health.length == 0) {
                            $scope.player.state.die = true;
                            checkedTrue = true;
                            setTimeout(function () {
                                finish(false, $scope.answer[0]);
                                applyScope($scope);
                            }, 500);
                        }
                    }
                } else return;
            };

            // when player use an ability
            self.useAbility = (ability) => {
                if ($rootScope.challengeState == 'question') {
                    if (ability == 'freeze' && ChallengeItem.canUse('freeze') && !$scope.usedAbilities.freeze) {
                        _gaq.push(['_trackEvent', 'WAR_', 'Using freeze item', 'Using freeze item']);
                        // if ($rootScope.playRealtimeMode) {
                            ChallengeItem.useFreeze($rootScope.roomName)
                                .then((result) => { })
                                .catch((error) => { });
                        // }

                        // TODO: assuming request will be success, so user can see item reduced immediately
                        // Test the latency later
                        $scope.usedAbilities.freeze = true;
                        $scope.bot.state.freezed = true;
                        setTimeout(function () {
                            if ($scope.bot.state.freezed) {
                                playAudio('assets/audio/smash.mp3');
                                $scope.bot.state.freezed = false;
                                $scope.$apply();
                            }
                        }, challengeConfig.freezedTime);
                        playAudio('assets/audio/freeze.mp3');
                    } else if (ability == 'unfreeze' && ChallengeItem.canUse('unfreeze') && $scope.player.state.freezed == true && !$scope.usedAbilities.unfreeze) {
                        _gaq.push(['_trackEvent', 'WAR_', 'Using unfreeze item', 'Using freeze item']);
                        // if ($rootScope.playRealtimeMode) {
                            ChallengeItem.useUnfreeze($rootScope.roomName)
                                .then((result) => { })
                                .catch((error) => { });
                        // }

                        // TODO: assuming request will be success, so user can see item reduced immediately
                        // Test the latency later
                        $('.challenge_freezed_div').fadeOut(1000);
                        $('.challenge_3_ability_unfreeze').removeClass('challenge_ability_icon_scaling');
                        playAudio('assets/audio/smash.mp3')

                        $scope.usedAbilities.unfreeze = true;
                        setTimeout(function () {
                            $scope.player.state.freezed = false;
                            $scope.$apply();
                        }, 400);
                    } else if (ability == 'bomb' && ChallengeItem.canUse('bomb') && !$scope.usedAbilities.bomb) {
                        _gaq.push(['_trackEvent', 'WAR_', 'Using boom item', 'Using freeze item']);
                        // if ($rootScope.playRealtimeMode) {
                            ChallengeItem.useBomb($rootScope.roomName)
                                .then((result) => { })
                                .catch((error) => { });
                        // }
                        $(".challenge_opponent_bombed").css('background-image', `url('/assets/images/war/smoke2.gif?${$scope.time}')`)

                        $scope.usedAbilities.bomb = true;

                        $scope.bot.state.bombed = true;
                        setTimeout(function () {
                            $(".challenge_opponent_bombed").css('background-image', ``)
                            $scope.bot.state.bombed = false;
                            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                                $scope.$apply();
                            }
                        }, 700);
                        playAudio('assets/audio/boom.mp3');
                        $scope.bot.state.health.splice(0, 1);
                        if ($scope.bot.state.health.length == 0) {
                            $scope.bot.state.die = true;
                            finish();
                        }
                    } else if (ability == 'health' && ChallengeItem.canUse('health') && !$scope.usedAbilities.heart) {
                        _gaq.push(['_trackEvent', 'WAR_', 'Using heart item', 'Using freeze item']);
                        // if ($rootScope.playRealtimeMode) {
                            ChallengeItem.useHealth($rootScope.roomName)
                                .then((result) => { })
                                .catch((error) => { });
                        // }

                        // TODO: assuming request will be success, so user can see item reduced immediately
                        // Test the latency later
                        $scope.usedAbilities.heart = true;
                        $scope.player.state.health.push(1);

                        $('.challenge_3_ability_heart').removeClass('challenge_ability_icon_scaling');
                        $('.challenge_hp_img').removeClass('challenge_ability_icon_scaling');
                        playAudio('assets/audio/health.mp3');
                    }
                }
            };

            socketService.onPlayerUseSkill(function (response) {
                if (response.item == 'freeze') {
                    playAudio('assets/audio/freeze.mp3');
                    $scope.player.state.freezed = true;
                    if (!$scope.usedAbilities.unfreeze) {
                        $('.challenge_3_ability_unfreeze').addClass('challenge_ability_icon_scaling');
                    }
                    if ($scope.player.state.freezed = true) {
                        $scope.freezedCountdown = 9;
                        freezedCountdown = setInterval(function () {
                            $scope.freezedCountdown--;
                            if ($scope.freezedCountdown <= 0) {
                                clearInterval(freezedCountdown);
                            }
                        }, 1000);
                        setTimeout(function () {
                            $('.challenge_freezed_div').fadeOut(1000);
                            if ($scope.player.state.freezed) {
                                playAudio('assets/audio/smash.mp3');
                            }
                            setTimeout(function () {
                                $scope.player.state.freezed = false;
                                $('.challenge_3_ability_unfreeze').removeClass('challenge_ability_icon_scaling');
                                applyScope($scope);
                            }, 400);
                        }, challengeConfig.freezedTime);
                    }
                } else if (response.item == 'bomb') {
                    $(".challenge_boom_div").css('background-image', `url('/assets/images/war/boom.gif?${$scope.time}')`)
                    playAudio('assets/audio/boom.mp3');
                    $scope.player.state.bombed = true;
                    $scope.player.state.health.splice(0, 1);
                    // $scope.bot.ability.boom--;
                    setTimeout(function () {
                        $scope.player.state.bombed = false;
                        $(".challenge_boom_div").css('background-image', ``)
                        if ($scope.player.state.health <= 0) {
                            $scope.player.state.die = true;
                            finish();
                        }
                        applyScope($scope);
                    }, 1500);
                } else if (response.item == 'health') {
                    $scope.bot.state.health.push(1);
                    $scope.bot.ability.heart--;
                } else if (response.item == 'unfreeze') {
                    playAudio('assets/audio/smash.mp3');
                    $scope.bot.state.freezed = false;
                    applyScope($scope);
                }
            });

            // open chest at winning ending game
            self.openChest = () => {
                if (!$scope.reward) {
                    ChallengeItem.openWinChest()
                        .then((bonusItem) => {
                          _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Open win chest']);
                            $scope.reward = true;
                            openChestBonus(3, bonusItem.item, bonusItem.quantity);
                            setTimeout(function () {
                                $('#victoryModal').modal('hide');
                                playAudio('assets/audio/war/winningEndingSound.mp3');
                                setTimeout(function () {
                                    $scope.reward = false;
                                    applyScope($scope);
                                }, 1000);
                                applyScope($scope);
                            }, 2400);
                        })
                        .catch((error) => { });

                    // TODO
                    // Handle result
                } else {
                    // TODO
                }
            };

            // replay game
            self.replay = function (action) {
                $scope.level = getLevelTime();
                content_flat = [];
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Replay']);
                questionIndex = 0;
                countImage = 0;
                countAudio = 0;
                usedCorrectWord = [];
                usedwordData = [];
                $scope.usedAbilities = {
                    freeze: false,
                    unfreeze: false,
                    bomb: false,
                    heart: false
                };
                reset_game();
                if (action == 'button') {
                    playAudio('assets/audio/click.mp3');
                }
                initVariables();
                createQuestion();
                $scope.time = challengeConfig.time;
                countdown = setInterval(function () {
                    if ($scope.time > 0) {
                        $scope.time--;
                        //last 10 seconds sound
                        if ($scope.time == 10) {
                            ticktock = new Audio('assets/audio/ticktock.mp3');
                            ticktock.play();
                        }
                        if ($scope.time > 1) {
                            AIDecisionMaking();
                        }
                    } else {
                        clearInterval(countdown);
                        clearInterval(freezedCountdown);
                        checkedTrue = true;
                        setTimeout(function () {
                            finish();
                        }, 500);
                    }
                    applyScope($scope);
                }, 1000)
            };

            // UX bonus chest
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

            // update reward
            function updateReward(reward, number) {
                number = number ? number : 1;
                switch (reward) {
                    case 1:
                        self.challengeItems.unfreeze += number;
                        break;
                    case 2:
                        self.challengeItems.freeze += number;
                        break;
                    case 3:
                        self.challengeItems.boom += number;
                        break;
                    case 4:
                        self.challengeItems.heart += number;
                        break;
                }
            }

            // get leaderboard
            function getLeaderboard(take, skip, reset, school) {
                self.loading_rank = true;
                var params = {
                    user_token: user_token,
                    take: take,
                    skip: skip,
                    school: school
                }
                return challengeService.getLeaderboard(params).then(function (data) {
                    self.loading_rank = false;
                    if (data) {
                        if (school) {
                            if (!self.leaderboardRankBySchool || reset) {
                                self.leaderboardRankBySchool = data.data;
                            } else {
                                self.leaderboardRankBySchool.push.apply(self.leaderboardRankBySchool, data.data);
                            }
                            currentItemInRankBySchool += data.data.length;
                        } else {
                            if (!self.leaderboardValues || reset) {
                                self.leaderboardValues = data.data;
                            } else {
                                self.leaderboardValues.push.apply(self.leaderboardValues, data.data);
                            }
                            currentItemInLeaderboard += data.data.length;
                        }
                    }
                });
            }

            //NOTE: gameplay functions
            function initVariables() {
                initGamers();
                answeredWords = [];
                $rootScope.correctAnswer = 0;
                $rootScope.botCorrectAnswer = 0;
                // $rootScope.opponentCorrectAnswer = 0;
                $rootScope.challengeState = 'question';
                checkedTrue = false;
            }

            function initGamers() {
                $scope.player = {
                    ability: {
                        freeze: $localStorage.ability ? $localStorage.ability.freeze : 1,
                        unfreeze: $localStorage.ability ? $localStorage.ability.unfreeze : 1,
                        boom: $localStorage.ability ? $localStorage.ability.boom : 1,
                        heart: $localStorage.ability ? $localStorage.ability.heart : 1
                    },
                    state: {
                        freezed: false,
                        bombed: false,
                        die: false,
                        health: [1, 1, 1],
                        win: false
                    }
                };

                $scope.bot = {
                    ability: {
                        freeze: 1,
                        unfreeze: 1,
                        boom: 1,
                        heart: 1
                    },
                    state: {
                        freezed: false,
                        bombed: false,
                        die: false,
                        health: [1, 1, 1],
                        win: false
                    }
                };
            }

            function getDataforMakingQuestions(numberOfWords) {
                let words = [];
                _.each(units, function (value) {
                    words = words.concat(value.words)
                });
                return angular.copy(_.sample(words, numberOfWords))
            }

            // preload image
            function preloadImage(wordData, roomName) {
                var promiseArray = [];
                wordData.map(function (item) {
                    promiseArray.push(new Promise(function (resolve, reject) {
                        var image = new Image();
                        image.src = item.image;
                        image.onload = function (event) {
                            if (roomName && roomName == $rootScope.roomName) {
                                countImage++;
                                updateLoadingProgress(countImage, countAudio, wordData.length)
                            }

                            resolve();
                        };
                        image.onerror = function (event) {
                            if (roomName && roomName == $rootScope.roomName) {
                                countImage++;
                                updateLoadingProgress(countImage, countAudio, wordData.length)
                            }

                            resolve();
                            reject();
                        };
                    }))
                })
                return promiseArray;
            }

            // preload audio
            function preloadAudio(wordData, roomName) {
                var promiseArray = [];
                wordData.map(function (item) {
                    promiseArray.push(new Promise(function (resolve, reject) {
                        fetch(item.audio).then(function (res) {
                            return res.blob()
                        }).then(function (data) {
                            if (roomName && roomName == $rootScope.roomName) {
                                countAudio++;
                                updateLoadingProgress(countImage, countAudio, wordData.length)
                            }

                            resolve();
                        }).catch(function (err) {
                            if (roomName && roomName == $rootScope.roomName) {
                                countAudio++;
                                updateLoadingProgress(countImage, countAudio, wordData.length)
                            }

                            resolve();
                        })
                    }))
                })
                return promiseArray;
            }

            //update loading progress
            function updateLoadingProgress(image, audio, total) {
                var prevStep = self.loadingProgress ? (Math.floor(self.loadingProgress) - (Math.floor(self.loadingProgress) % 10)) : 0;
                self.loadingProgress = ((image + audio) * 50) / total;
                var currentStep = (Math.floor(self.loadingProgress) - (Math.floor(self.loadingProgress) % 10));
                if ($rootScope.playRealtimeMode && (currentStep - prevStep) == 10) {
                    socketService.updateOpponentLoadDataProgress($rootScope.roomName, self.loadingProgress);
                }
                applyScope($scope);
            }

            socketService.onOpponetLoadData(function (response) {
                self.opponentLoadingProgress = response.opponentProgress;
            })

            // set number of answer
            function setNumberOfAnswer(questionIndex) {
                var numberOfAnswer = 2;
                if (questionIndex < 2) {
                    numberOfAnswer = 2;
                } else if (questionIndex < 4) {
                    numberOfAnswer = 4;
                } else if (questionIndex < 6) {
                    numberOfAnswer = 6;
                } else if (questionIndex < 8) {
                    numberOfAnswer = 8;
                } else {
                    numberOfAnswer = 12;
                }
                return numberOfAnswer;
            }

            // create question
            function createQuestion() {
                var numberOfAnswer = setNumberOfAnswer(questionIndex);

                var unusedwordData = _.difference(wordData, usedwordData);
                if (unusedwordData.length <= numberOfAnswer) {
                    usedwordData = [];
                    unusedwordData = wordData;
                }
                $scope.question_answers = _.sample(unusedwordData, numberOfAnswer);
                usedwordData = usedwordData.concat($scope.question_answers);

                var unusedCorrectWord = _.difference($scope.question_answers, usedCorrectWord);
                if (unusedCorrectWord.length <= 0) {
                    unusedCorrectWord = $scope.question_answers;
                }
                $scope.answer = [_.sample(unusedCorrectWord)];
                usedCorrectWord = usedCorrectWord.concat($scope.answer);

                $scope.time = typeof ($scope.time) === 'undefined' ? challengeConfig.time : $scope.time;

                var audio = new Audio($scope.answer[0].audio);
                if ($scope.time > 0) {
                    audio.play();
                }
                _.each($scope.question_answers, function (val, key) {
                    val.enermyCheck = false;
                    val.checked = false;
                });
                applyScope($scope);
                setBotAnswerTime(numberOfAnswer);
            }

            var content_flat = [];
            // create next question
            function nextStep(result, content) {
                if (content) {
                    content.result = result;
                    content_flat.push(content);
                }
                questionIndex++;
                $('#challenge_question_div').animate({ 'opacity': 0 }, 300);
                $('#challenge_question_div').animate({ 'opacity': 1 }, 300);
                setTimeout(function () {
                    createQuestion();
                    checkedTrue = false;
                    $scope.$apply();
                }, 300);
            }

            function gameReult(dieBot, diePlayer, botScore, playerScore, playerDisconnect, opponentDisconnect, winner) {
                _gaq.push(['_trackEvent', 'WAR_', 'Score', playerScore]);
                var result = false;
                let draw = false;
                if (winner || (winner !== undefined && winner === null) ) {
                    if (winner == $localStorage.guest_id || winner == null) result = true;
                    else {
                        result = false;
                    }
                }
                else {
                    if (diePlayer) {
                        result = false;
                    } else if (dieBot) {
                        result = true;
                    } else if (botScore < playerScore) {
                        result = true;
                    } else if (botScore > playerScore) {
                        result = false;
                    } else {
                        result = "draw";
                        draw = true
                    }
                }
                if (playerDisconnect) result = false;
                else if (opponentDisconnect) result = true;
                return announceGameResult(result, draw);
            }

            function announceGameResult(result, draw) {
                if ($localStorage.auth && $localStorage.auth.id) {
                    var user_id = $localStorage.auth.id;
                } else {
                    var user_id = 0;
                }
                let winner;
                let loser;
                if (result || draw) {
                    _gaq.push(['_trackEvent', 'WAR_', 'Win', user_id]);
                    $scope.player.state.win = true;
                    $('#victoryModal').modal('show');
                    playAudio('assets/audio/war/rewardSound.wav');
                    $rootScope.$broadcast('updateGoldBonusProgress', {});
                    updateGoldBonusProgress();
                    var player_status = 'win';
                    winner = $localStorage.guest_id;
                    loser = $scope.AI ? $scope.AI.guest_id : $localStorage.opponentGuestId;
                    applyScope($scope);
                } else {
                    _gaq.push(['_trackEvent', 'WAR_', 'Lose', user_id]);
                    $scope.player.state.win = false;
                    playAudio('assets/audio/war/losingEndingSound.mp3');
                    var player_status = 'lose';
                    winner = $scope.AI ? $scope.AI.guest_id : $localStorage.opponentGuestId;
                    loser = $localStorage.guest_id;
                    applyScope($scope);
                }
                if ($scope.AI) {
                    let score_with_bot = {draw : draw, winner: winner, loser: loser };
                    socketService.sendFinishStatus($rootScope.roomName, winner, score_with_bot);
                }
                return player_status;
            }
            // finish game
            function finish(result, content, playerDisconnect, opponentDisconnect, winner) {
                self.isPlayingGame = false;
                sendGa($localStorage.auth, 'War', 'Completed', 'War_completed game');
                if (!finished) {
                    $rootScope.playAtleastOne = true;
                    //clear interval
                    clearInterval(countdownStart);
                    clearInterval(countdown);
                    clearInterval(freezedCountdown);
                    $timeout.cancel(botAnswerTimeout);
                    $timeout.cancel(nextQuestionStep);
                    // content flat card
                    if (content) {
                        content.result = result;
                        content_flat.push(content);
                    }
                    if (!$rootScope.playRealtimeMode) {
                        $scope.userWord = content_flat;
                    }

                    //.END content flat card
                    finished = true;
                    $('.challenge_hp_img').removeClass('challenge_ability_icon_scaling');
                    _gaq.push(['_trackEvent', 'WAR_', 'Finish', 'War New - Finish']);

                    if (ticktock) {
                        ticktock.pause();
                    }
                    if ($scope.player.state) {
                        $scope.player.state.freezed = false;
                        $scope.player.state.bombed = false;
                        var player_status = gameReult($scope.bot.state.die, $scope.player.state.die, $rootScope.botCorrectAnswer, $rootScope.correctAnswer, playerDisconnect, opponentDisconnect, winner);
                        var currentTime = new Date().getTime();
                        if ($localStorage.season && currentTime >= $localStorage.season.startTime && currentTime <= $localStorage.season.endingTime) {
                            if ($rootScope.loggedIn) {
                                challengeService.updatePlayerStat(player_status, $rootScope.correctAnswer);
                            } else {
                                $localStorage.warGuestState = updateStatFromLocal(player_status, $rootScope.correctAnswer);
                                if ($localStorage.playedWithoutLogin) {
                                    $localStorage.playedWithoutLogin++;
                                } else {
                                    $localStorage.playedWithoutLogin = 1;
                                }
                            }
                        }else if ($rootScope.loggedIn) {
                            $localStorage.warPlayerState.win_number = 0;
                            $localStorage.warPlayerState.lose_number = 0;
                        }
                    }
                    $scope.showOpponent = false;
                    $scope.userResult = player_status;
                    $rootScope.challengeState = 'result';
                    applyScope($scope);
                }
                else return;
            }

            function updateStatFromLocal(result, score) {
                let stat = $localStorage.warGuestState;
                if (stat == null || stat == undefined) {
                    return stat = {
                        total_score: score,
                        win_number: result == 'win' ? 1 : 0,
                        lose_number: result == 'win' ? 0 : 1,
                        win_rate: result == 'win' ? 100 : 0
                    };
                } else {
                    if (result == 'win') {
                        stat.win_number++;
                    } else {
                        stat.lose_number++;
                    };
                    stat.total_score += score;
                    stat.win_rate = (stat.win_number * 100) / (stat.win_number + stat.lose_number) ? stat.win_number : 0;
                    return stat;
                }
            };

            // search for opponent
            function searching(guestId) {
                socketService.getBotInfo(guestId)
                    .then(function (response) {
                        if (response.status == 1) {
                            $rootScope.correctAnswer = 0;
                            $rootScope.challengeState = 'searching';

                            $scope.AI = {
                                "AI_name"   : response.user.username,
                                "imageUrl"  : response.user.avatar,
                                "guest_id"  : response.user.guest_id,
                                "school"    : response.user.school
                            };
                            $rootScope.roomName = response.room.id;

                            // start loading data
                            loadingWithBot();
                        } else {
                            challengeNoti(response.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        let random_ai = Opponent_identity[Math.floor(Math.random() * Opponent_identity.length)];
                        if(random_ai){
                            $scope.AI = random_ai;
                        }
                    });
            }

            function loadingWithBot() {
                $rootScope.challengeState = 'loading';
                $('.finding').hide();
                $scope.showOpponent = true;

                wordData = getDataforMakingQuestions(60);
                var preloadPromise = Promise.all(preloadImage(wordData).concat(preloadAudio(wordData)))
                    .then(function () {
                        $rootScope.challengeState = 'new_found';
                        $('.finding').hide();
                        $scope.showOpponent = true;
                        startingSound.play();
                        startingCountdown();
                        $scope.$apply();
                    }).catch(function (err) {
                        return "preload error";
                    });
            }

            // start countdown when an opponent is found
            function startingCountdown() {
                startCountdown = setTimeout(function () {
                    $rootScope.challengeState = 'countdown';
                    $scope.countdownTime = 5;
                    playAudio('assets/audio/countdown.mp3');
                    self.loadingProgress = 0;
                    self.opponentLoadingProgress = 0;

                    countdownStart = setInterval(function () {
                        if ($scope.countdownTime > 1) {
                            $scope.countdownTime--;
                        } else if ($scope.countdownTime <= 1) {
                            clearInterval(countdownStart);
                            if ($rootScope.playRealtimeMode) {
                                self.initGamePvP();
                            } else {
                                self.replay();
                            }
                        };
                        $scope.$apply();
                    }, 1000);
                    $scope.$apply();
                }, 1000);
            }


            function AIDecisionMaking() {
                //bot ability: freeze
                if ($scope.bot.ability && $scope.bot.ability.freeze == 1) {
                    var randomFreeze = Math.floor(Math.random() * challengeConfig.opponent.freezedChance);
                    if (randomFreeze == 0 && !$scope.player.state.freezed) {
                        playAudio('assets/audio/freeze.mp3');
                        $scope.player.state.freezed = true;
                        if (!$scope.usedAbilities.unfreeze) {
                            $('.challenge_3_ability_unfreeze').addClass('challenge_ability_icon_scaling');
                        }
                        if ($scope.player.state.freezed = true) {
                            $scope.freezedCountdown = 9;
                            freezedCountdown = setInterval(function () {
                                $scope.freezedCountdown--;
                                if ($scope.freezedCountdown <= 0) {
                                    clearInterval(freezedCountdown);
                                }
                            }, 1000);
                            setTimeout(function () {
                                $('.challenge_freezed_div').fadeOut(1000);
                                if ($scope.player.state.freezed) {
                                    playAudio('assets/audio/smash.mp3');
                                }
                                setTimeout(function () {
                                    $scope.player.state.freezed = false;
                                    $('.challenge_3_ability_unfreeze').removeClass('challenge_ability_icon_scaling');
                                    $scope.$apply();
                                }, 400);
                            }, challengeConfig.freezedTime);
                        }
                        $scope.bot.ability.freeze--;
                    }
                }

                //bot ability: heart
                var randomEatHp = Math.floor(Math.random() * challengeConfig.opponent.eatHpChance);
                if (randomEatHp == 0 && $scope.bot.state.health < 3 && $scope.bot.ability && $scope.bot.ability.heart) {
                    $scope.bot.state.health.push(1);
                    $scope.bot.ability.heart--;
                }

                //bot ability: boom
                if ($scope.bot.ability && $scope.bot.ability.boom >= 1) {
                    if ($scope.player && $scope.player.state.health.length == 1) {
                        var randomBoomChance = challengeConfig.opponent.boomChance - 15;
                    } else {
                        var randomBoomChance = challengeConfig.opponent.boomChance;
                    }
                    var randomBotBombed = Math.floor(Math.random() * randomBoomChance);
                    if (randomBotBombed == 0) {
                        $(".challenge_boom_div").css('background-image', `url('/assets/images/war/boom.gif?${$scope.time}')`)
                        playAudio('assets/audio/boom.mp3');
                        $scope.player.state.bombed = true;
                        $scope.player.state.health.splice(0, 1);
                        $scope.bot.ability.boom--;
                        setTimeout(function () {
                            $scope.player.state.bombed = false;
                            $(".challenge_boom_div").css('background-image', ``)
                            if ($scope.player.state.health <= 0) {
                                $scope.player.state.die = true;
                                finish();
                            }
                            $scope.$apply();
                        }, 1500);
                    }
                }

                //bot wrong answer
                if ($scope.bot.state.health.length > 1) {
                    var randomLoseHp = Math.floor(Math.random() * challengeConfig.opponent.randomLoseHpChance);
                    if (randomLoseHp == 0) {
                        $scope.bot.state.health.splice(0, 1);
                    }
                }
            }

            // time bot random answer
            function time_bot_random(numberOfAnswer) {
                if (numberOfAnswer == 2) {
                    return getRandomSeconds(0.7, 1.5);
                } else if (numberOfAnswer == 4) {
                    return getRandomSeconds(1, 1.8);
                } else if (numberOfAnswer == 6) {
                    return getRandomSeconds(1.3, 2.1);
                } else if (numberOfAnswer == 8) {
                    return getRandomSeconds(1.6, 2.4);
                } else if (numberOfAnswer == 12) {
                    return getRandomSeconds(2, 3);
                }
            }
            function setLevelBot(x, y, z) {
                var ran = Math.floor(Math.random() * 10) + 1;
                if (ran >= 1 && ran <= 2) {
                    var level = x;
                } else if (ran >= 3 && ran <= 5) {
                    var level = y
                } else {
                    var level = z;
                }
                return level;
            }
            function getLevelBot() {
                if ($localStorage.warPlayerState && $localStorage.warPlayerState.win_number) {
                    // var guest_id = $localStorage.guest_id;
                    var win = $localStorage.warPlayerState.win_number;

                    var ran = Math.floor(Math.random() * 10) + 1;
                    if (win >= 0 && win < 10) {
                        var level = setLevelBot('C', 'D', 'E');
                    } else if (win >= 10 && win < 20) {
                        var level = setLevelBot('E', 'C', 'D');
                    } else if (win >= 20 && win < 30) {
                        var level = setLevelBot('B', 'C', 'D');
                    } else if (win >= 30 && win < 40) {
                        var level = setLevelBot('D', 'B', 'C');
                    } else if (win >= 40 && win < 50) {
                        var level = setLevelBot('A', 'B', 'C');
                    } else if (win >= 50 && win < 60) {
                        var level = setLevelBot('C', 'A', 'B');
                    } else if (win >= 60) {
                        var level = setLevelBot('C', 'B', 'A');
                    }
                } else {
                    // var win = $localStorage.warGuestState.win_number;
                    var level = 'E';
                }
                return level;
            }
            function getLevelTime() {
                var level = getLevelBot();
                if (level == 'A') {
                    var time = -400;
                } else if (level == 'B') {
                    var time = -200;
                } else if (level == 'D') {
                    var time = 1000;
                } else if (level == 'E') {
                    var time = 2000;
                } else {
                    var time = 0;
                }
                return time;
            }
            // get random seconds from min to max
            function getRandomSeconds(min, max) {
                var rd = Math.max(1000 * min, (Math.min(1000 * max, Math.floor(Math.random() * max * 1000))));
                return rd + $scope.level;
            }

            // bot answer
            function setBotAnswerTime(numberOfAnswer) {
                $timeout.cancel(botAnswerTimeout);
                botAnswerTimeout = $timeout(function () {
                    if (!checkedTrue && !$scope.bot.state.freezed) {
                        animation_change_score('.challenge_score_bot');
                        $rootScope.botCorrectAnswer++;
                        checkedTrue = true;
                        $scope.question_answers[_.findIndex($scope.question_answers, { word: $scope.answer[0].word })].enermyCheck = true;
                        if (!botCorrectSound) {
                            botCorrectSound = new Audio("/assets/audio/war/botCorrectSound.wav");
                        }
                        botCorrectSound.pause();
                        botCorrectSound.currentTime = 0;
                        botCorrectSound.play();
                        $timeout(function () {
                            if (!finished) {
                                nextStep(false, $scope.answer[0]);
                            }
                        }, 1000);
                    } else {
                        setBotAnswerTime(numberOfAnswer)
                    }
                }, time_bot_random(numberOfAnswer));
            }

            // clicking sound
            function audio_click(audio) {
                playAudio('assets/audio/click.mp3');
            }
            // play adio using javascript
            function playAudio(audio) {
                var audio = new Audio(audio);
                audio.play();
            }
            // reset game configuration when play a new game
            function reset_game() {
                finished = false;
                $('#treasure_chest').removeClass('challenge_victory_chest_gif');
                $("#treasure_chest .challenge_reward_icon").hide().animate({ left: "30%", top: "30%", opacity: '1' });
                $(".end_card").removeClass('flipCus');
            }

            // flip score card
            function animation_change_score(class_name) {
                $(class_name).addClass('rotateCus');
                setTimeout(function () {
                    $(class_name).removeClass('rotateCus');
                }, 100);
            }

            self.flip = function (index, audio, word) {
                if ($(".end_card[data-item=" + index + "]").hasClass('flipCus')) {
                    $(".end_card[data-item=" + index + "]").removeClass('flipCus');
                } else {
                    playAudio(audio);
                    $(".end_card[data-item=" + index + "]").addClass('flipCus');
                    _gaq.push(['_trackEvent', 'WAR_', 'View word', word]);
                }
            };
            //.END flat card ending game

            // back to main screen
            $scope.learnWord = function () {
                if ($rootScope.challengeState === 'preparing') {
                    clearStateVariables();
                    $rootScope.random = 1;
                    $rootScope.isLearn_word = true;
                    $rootScope.elightube = false;
                    $rootScope.topic = false;
                    $rootScope.isQuote = false;
                    self.leaderboardLazyload = false;
                    self.leaderboardRankBySchool = false;
                    self.messageInRankBySchool = false;
                    delete $scope.userBySchool;
                    $rootScope.$broadcast('reInit', {});
                    socketService.leaveRoom($rootScope.roomName);
                    applyScope($scope);
                } else {
                    //
                }
            };
            self.review_word = function () {
                _gaq.push(['_trackEvent', 'WAR_', 'Review all words', 'Review all words']);
            };

            self.openLoginForm = function () {
                $rootScope.openLoginFromOutside = true;
            };

            // TODO: remove
            // $scope.challengeState = 'result';

            self.endTutorial = function () {
                $rootScope.challengeState = 'preparing';
                $rootScope.endTutorial = false;
                _gaq.push(['_trackEvent', 'WAR_', 'Click', 'Finish-Tutorial']);
                applyScope($scope);
            };

            self.closeChestNotiModal = function () {
                self.isClose = true;
            };

            $rootScope.$on('hide-tutorial', function () {
                self.endTutorial();
            });

            $rootScope.$on('loggedin', function () {
                self.isCloseBanner = true;
                getPlayerStat();
            });

            $scope.sendRequestRematch = function () {
                broadcastFinished = false;
                if ($rootScope.userAccept) {
                    var opponentGuessId = $rootScope.userAccept.hostGuestId ? $rootScope.userAccept.hostGuestId : $rootScope.userAccept.guest_id;
                    if(opponentHasLeft){
                        notiOpponentLeft();
                        $scope.backScreen();
                    } else {
                        // if (!$rootScope.userOnline || $rootScope.userOnline.length == 0) {
                        //     socketService.getUserList($localStorage.guest_id)
                        //         .then(function (response) {
                        //             $rootScope.userOnline = response;
                        //             $scope.invite(opponentGuessId);
                        //         })
                        //         .catch(function (error) {
                        //             console.log(error);
                        //         });
                        // } else {
                        //     $scope.invite(opponentGuessId);
                        // }
                        $scope.invite(opponentGuessId);
                    }
                } else {
                    // play again with bot
                    searching($scope.AI.guest_id);
                }

            };

            function broadCastFinish() {
                if (!broadcastFinished) {
                    socketService.sendFinishStatus($rootScope.roomName, $localStorage.guest_id)
                        .then(function (response) {
                            if(response.code == 1){
                              broadcastFinished = true;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }

            function pvpFinish(playerDisconnect, opponentDisconnect, winner) {
              _gaq.push(['_trackEvent', 'WAR_', 'Finish', 'PVP']);
                clearTimeout(clientFinish);
                clientFinish = null;
                $rootScope.challengeState = 'result';
                finish('', '', playerDisconnect, opponentDisconnect, winner);
                applyScope($scope);
            }

            socketService.onFinish(function (res) {
                if($rootScope.challengeState != 'result'){
                    let winner;
                    if (res && res.score && (res.winner || res.winner == null)) {
                        // Update game status
                        winner = res.winner;
                        Object.keys(res.score).forEach(function (key) {
                            if (key == $localStorage.guest_id) {
                                $rootScope.correctAnswer = res.score[key];
                                $scope.player.state.health = res.health[key];
                            } else {
                                $rootScope.botCorrectAnswer = res.score[key];
                                $scope.bot.state.health = res.health[key];
                            }
                        });
                    } else if ($localStorage.realtimePlayerScore) {
                        Object.keys.forEach($localStorage.realtimePlayerScore)(function (key) {
                            if (key == $localStorage.guest_id) {
                                $rootScope.correctAnswer = $localStorage.realtimePlayerScore[key];
                            } else {
                                $rootScope.botCorrectAnswer = $localStorage.realtimePlayerScore[key];
                            }
                        })
                    }

                    pvpFinish(false, false, winner);
                } else {
                    return;
                }
            });

            socketService.onDisconnect((response) => {
                if ($rootScope.userAccept && $rootScope.userAccept.waiting && $rootScope.userAccept.guest_id == response.guest_id && response.status == 0) {
                    clearTimeout(inviteTimeout);
                    invitation = {};
                    $rootScope.showChallengeInvited = false;
                    $rootScope.challengeState = 'preparing';
                    challengeNoti($rootScope.language === 'vn' ? "Lời thách đấu đã bị hủy." : "The invitation has been canceled");
                }
            });

            socketService.onOpponentDisconnect(function (res) {
                if(invitation && !angular.equals({}, invitation) && $rootScope.showChallengeInvited) {
                    invitation = {};
                    $rootScope.showChallengeInvited = false;
                    challengeNoti($rootScope.language === 'vn' ? "Lời thách đấu đã bị hủy." : "The invitation has been canceled");
                }
                else {
                    opponentHasLeft = true;
                    notiOpponentLeft();
                    if ($rootScope.challengeState === 'question') {
                        pvpFinish(false, true);
                    } else {
                        clearStateVariables();
                        clearInterval(countdownStart);
                        clearTimeout(startCountdown);
                        clearTimeout(clientFinish);
                        $scope.backScreen();
                    }
                }
            });

            function initRematchStatus() {
                self.rematchStatus = "Waiting";
            }

            function notiOpponentLeft() {
                $rootScope.showChallengeInvited = true;
                self.opponentStatus = $rootScope.language === 'vn' ? "Đối thủ đã rời phòng chơi." : "Your opponent has left.";
                applyScope($scope);
                closeDisconnectNoti = setTimeout(function () {
                    self.opponentStatus = '';
                    $rootScope.showChallengeInvited = false;
                    applyScope($scope);
                }, 5000);
            }

            //Utility Functions

            self.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };

            function updateGoldBonusProgress(reset) {
                if (self.bonusStat.gold_chest == 0) {
                    self.tooltipMessage = $rootScope.language === 'vn' ? 'Thách đấu cùng eLight' : "Elight's Challenge";
                }

                if (self.bonusStat.gold_chest >= 3) {
                    chestNotiEffect();
                    self.tooltipMessage = 'Gold chest available';
                }

                if (!$localStorage.showHint) {
                    self.isClose = true;
                }
            }

            // get play state
            function getPlayerStat() {
                $rootScope.playerStat = {
                    'user_id': $localStorage.auth ? $localStorage.auth.id : '',
                    'display_name': $localStorage.auth ? $localStorage.auth.display_name : '',
                    'avatar': $localStorage.auth ? $localStorage.auth.avatar : '',
                    'school': $localStorage.auth ? ($localStorage.auth.school ? $localStorage.auth.school.school_name : '') : ''
                };
                if ($rootScope.loggedIn) {
                    challengeService.getPlayerStat().then(function (data) {
                        if (data) {
                            $rootScope.playerStat.win_number = parseInt(data.win_number);
                            $rootScope.playerStat.lose_number = parseInt(data.lose_number);
                            $rootScope.playerStat.display_name = data.display_name ? data.display_name : $rootScope.playerStat.display_name;
                            $rootScope.playerStat.avatar = data.avatar ? data.avatar : $rootScope.playerStat.avatar;
                            $rootScope.playerStat.school = data.school ? data.school : $rootScope.playerStat.school;
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

            function clearStateVariables() {
                delete self.rematchStatus;
                delete $rootScope.roomName;
                delete $rootScope.userAccept;
                invitation = {};
                finished = false;
                $rootScope.correctAnswer = 0;
                $rootScope.botCorrectAnswer = 0;
                broadcastFinished = false;
                opponentHasLeft = false;
                $rootScope.challengeState = 'preparing';
            }
        }
    ]
});
