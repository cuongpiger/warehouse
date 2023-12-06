'use strict';

angular.module("login").component("login", {
    templateUrl : 'app/components/login/login.template.html',
    bindings: {
        showSection: '@'
    },
    controller	:	["loginService", "$scope", "$rootScope", "$localStorage","mainService", "wordMemo", 'challenge.io.service',
    function loginController(loginService, $scope, $rootScope, $localStorage, $service, wordMemo, socketService) {
        var self = this;
        self.loading = false;
        self.formState = 'login';
        self.showSection = 'recommend'; // test
        self.localesMessage = loginLocales;
        self.$onInit = function() {
            self.openRegisterForm = function() {
                _gaq.push(['_trackEvent', 'INTRO', 'Register', '']);
                self.showSection = 'register-form';
                delete self.error;
            };

            self.openLoginForm = function() {
                _gaq.push(['_trackEvent', 'INTRO', 'Login', '']);
                self.showSection = 'login-form';
                delete self.error;
            };

            self.removeshowSection = function () {
                $('.welcome_box').hide();
                $rootScope.showWelcome = null;
                $('#profile_modal').modal('hide');
            };

            self.login = function(email, password) {
                if(!$localStorage.guest_id){
                    $service.getGuestId(function(res){
                        $localStorage.guest_id = res.data;
                    });
                }
                if (!angular.isUndefined(email, password)) {
                    self.loading = true;
                    loginService.login(email, password)
                        .then(function (res) {
                            if (res.code === 1) {
                                $rootScope.$broadcast('loggedin', {});
                                self.messsync = self.localesMessage[27][$rootScope.language];
                                return wordMemo.getWordByUser(res.user.user_token)
                            } else {
                                self.messsync = "";
                                self.loading = false;
                                if (res.error && (res.error.data === "" || res.error.data === null )) {
                                    throw self.localesMessage[28][$rootScope.language];
                                } else {
                                    throw self.localesMessage[29][$rootScope.language];
                                }
                            }
                        })
                        .then(function (response) {
                            self.messsync = "";
                            let wordUser = response.data;
                            let listWords = [];
                            let unitsConcat = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);
                            _.map(unitsConcat, function (value) {
                                _.map(value.words, function (word) {
                                    word.unitId = value.id;
                                    listWords.push(word);
                                });
                            });
                            let wordReview = [];
                            _.map(wordUser, function (value) {
                                let issetWord = _.find(listWords, function (word) {
                                    return value.detail.word.toLowerCase() === word.word.toLowerCase();
                                });
                                if (issetWord) {
                                    wordReview.push({
                                        word      : value.detail.word,
                                        reviewDate: new Date(value.review_date).getTime(),
                                        EF        : value.current_EF,
                                        Q         : value.proficiency,
                                        I         : value.current_I,
                                        meaning   : issetWord.translate,
                                        image     : issetWord.image,
                                        audio     : issetWord.audio,
                                        phonetic  : issetWord.phonetic,
                                        updated_at: Date.now(),
                                        unitId    : issetWord.unitId
                                    })
                                } else {
                                    console.log(value.detail.word)
                                }

                            });
                            $localStorage.wordReview = wordReview;
                            // get list active UnitID
                            //Sync Guest Id and User Id
                            var userToken = JSON.parse(localStorage.getItem('user')).user_token;
                            $service.syncGuestAndUserId(Number($localStorage.guest_id), userToken, function(res){
                                if(res.status == 200 && res.data.code == 1){
                                    $rootScope.$broadcast('deny-invite');
                                    socketService.disconnect($localStorage.guest_id)
                                        .then(() => {
                                            $localStorage.guest_id = res.data.real_guest_id.toString();
                                            var userInfo = {
                                                email: $localStorage.auth.email,
                                                username: $localStorage.auth.display_name,
                                                userId: $localStorage.auth.id,
                                                avatar: $localStorage.auth.avatar,
                                                guestId: $localStorage.guest_id,
                                                school: $localStorage.auth.school
                                            };
                                            socketService.subcribeUser(userInfo.email, userInfo.username, userInfo.userId, userInfo.guestId, userInfo.avatar, userInfo.school)
                                                .then((response) => {
                                                    // console.log('subcribe after login: ', response);
                                                    if (response.status == 1) {
                                                        delete $localStorage.rank;
                                                        delete $localStorage.schoolmateRank;
                                                        if (response.new_token) {
                                                            $localStorage.token_guest_id = response.new_token;
                                                        }
                                                        $localStorage.auth.school = response.school;
                                                        localStorage.setItem('user', JSON.stringify($localStorage.auth));
                                                    }
                                                })
                                                .catch((error) => {
                                                    // TODO
                                                    console.log('login', error);
                                                })
                                            })
                                }
                            });

                            _gaq.push(['_trackEvent', 'Extension Account', 'Log in', '']);
                            let userAuth = $localStorage.auth;
                            $localStorage.unit = Array.from({length: 100}, (v, k) => k+1);
                            if (userAuth.actived_code.count_use_code > 0 || userAuth.actived_code.count_user_courses > 0) {
                                let unitsConcat = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);
                                // unitsConcat.forEach(function(element, index) {
                                //     $localStorage.unit[index] = element.id;
                                // });
                                $rootScope.avatar = JSON.parse(localStorage.getItem('user')).avatar;
                                if ($scope.$parent.loginFromProfile) {
                                    self.loginFromProfile = true;
                                    $rootScope.welcome = true;
                                    $localStorage.welcome = true;
                                    $('.welcome_box').hide();
                                    $rootScope.showWelcome = null;
                                }

                                self.showSection = 'login-success';
                                $rootScope.freeUser = 'studentAccount';
                                // $scope.$parent.showSectionLogin = '';
                            }else {
                                let listUnit = _.uniq(_.pluck(wordReview, 'unitId'));
                                if (listUnit.length < 2) {
                                    _.unique($localStorage.unit.concat(listUnit));
                                } else {
                                    //$localStorage.unit = listUnit;
                                }
                                self.showSection = 'login-success';
                                $rootScope.freeUser = 'studentAccount';
                                if ($localStorage.unit.length < 2) {
                                    $rootScope.freeUser = 'freeUser1';
                                    if ($scope.$parent.loginFromProfile) {
                                        $rootScope.showWelcome = 'topic2';
                                    }
                                } else {

                                }
                                if ($scope.$parent.loginFromProfile) {
                                    self.loginFromProfile = true;
                                }
                                $rootScope.avatar = JSON.parse(localStorage.getItem('user')).avatar;
                            }
                            self.loginFromProfile = true;
                            $rootScope.welcome = true;
                            $localStorage.welcome = true;
                            $rootScope.showWelcome = false;
                            $localStorage.lastTimeGetVideos = false;
                            $('.welcome_box').hide();
                            $('.login-form').modal('hide');
                            $('.modal-backdrop').remove();
                            self.loading = false;
                        })
                        .catch(function (error) {
                            self.loading = false;
                            self.messsync = "";
                            error = error.data ? self.localesMessage[30][$rootScope.language] : error;
                            self.error = error
                        });
                }
            };
            self.signup = function(username, email, password, re_password){
                var data = {
                    username: username,
                    email: email,
                    password: password,
                    re_password: re_password
                };
                if (!angular.isUndefined(data)) {
                    self.loading = true;
                    loginService.signUp(data).then(function(res) {
                        if (res.code === 1) {
                            _gaq.push(['_trackEvent', 'Extension Account', 'Register', '']);
                            self.login(data.email, data.password);
                        } else {
                            self.error = res;
                        }
                        self.loading = false;
                    }).catch(function(err) {
                        self.loading = false;
                        self.error = self.localesMessage[30][$rootScope.language];
                    })
                }
            }
        }
    }
  ]
})
