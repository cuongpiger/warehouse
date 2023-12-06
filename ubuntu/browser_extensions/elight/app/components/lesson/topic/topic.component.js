'use strict';

angular.module("lesson.topic")
    .component("topic", {
        templateUrl : 'app/components/lesson/topic/topic.template.html',
        controller : ["$scope", "$localStorage", "$rootScope",'$sce', '$timeout',
            function topicController($scope, $localStorage, $rootScope, $sce, $timeout) {
                let self = this;
                self.localesMessage = settingLocales;
                self.showing = self.localesMessage[0][$rootScope.language];
                let buttonReadMore = self.localesMessage[17][$rootScope.language];
                let buttonRegister = self.localesMessage[18][$rootScope.language];
                self.allOpened = false;
                self.loginViewList = true;
                $scope.openSettingModal = true;
                self.isToeic = false;
                self.loginView = false;
                self.isBasic = true;
                self.unitType = 1;
                self.isCommunication = false;
                self.thankYouCard = false;
                self.user = $localStorage.auth;
                self.resetParams = function () {
                    self.unitDetail = false;
                    self.messagePremium = false;
                    self.form_support = {
                        name : '',
                        email : $localStorage.email,
                        phone : '',
                        content : '',
                    };
                    self.form_feedback = {
                        email : $localStorage.email,
                        content : ""
                    }
                };
                $rootScope.$on('loggedin', function () {
                    self.reloadUnit();
                });

                self.openProfileModal = function() {
                    $scope.user = $localStorage.auth;
                    if (!$scope.user) {
                        $scope.loginFromProfile = true;
                        $('.login-form').modal('show');
                        $scope.login = false;
                    }else {
                        userService.fetch();
                        $scope.login = true;
                        $scope.openModal = true;
                        openModalDetail();
                    }
                    delete $rootScope.avatar;
                };

                self.returnLearnWord = function() {
                    $rootScope.topic = false;
                    $rootScope.isLearn_word = true;
                };

                self.resetParams();

                self.updateHistory = ee_update_history;
                self.selectedUnits = $localStorage.unitSettingSelected.length > 1 ? [91] : $localStorage.unitSettingSelected;
                self.reloadUnit = function () {
                    if (!$localStorage.unitSettingSelected) {
                        $localStorage.unitSettingSelected = angular.copy($localStorage.unit)
                    }
                    let unitLocal = $localStorage.unit;
                    let userAuth = $localStorage.auth;
                    if (userAuth && (userAuth.actived_code.count_use_code > 0 || userAuth.actived_code.count_user_courses > 0 )) {
                        let unitsConcat = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);
                        // unitsConcat.forEach(function(element, index) {
                        //     $localStorage.unit[index] = element.id;
                        // });
                        unitLocal = $localStorage.unit;
                    }
                    let unitsConcat = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);

                    _.map(unitsConcat, function ($value) {
                        if (unitLocal) {
                            let unlock = _.contains(unitLocal, $value.id);

                            let wordReview;
                            wordReview = $localStorage.wordReview;
                            let allWords = $value.words;
                            let allOldWords = wordReview ? wordReview.slice(0) : [];
                            let allWordsTemp = _.pluck(allWords, 'word');
                            let oldWordsTemp = _.pluck(allOldWords, 'word');
                            let newWordsTemp = _.difference(allWordsTemp, oldWordsTemp);
                            $value.total = allWords.length;
                            $value.learned = allWords.length - newWordsTemp.length;
                            if  (unlock) {
                                let activeUnit = _.contains($localStorage.unitSettingSelected, $value.id);
                                if (activeUnit) {
                                    $value.actived = true;
                                } else {
                                    $value.actived = false;
                                }
                                $value.lock = false;
                            }
                        }
                    });
                    self.units = unitsConcat;
                };

                self.reloadUnit();

                self.trustAsHtml = function (value) {
                    return $sce.trustAsHtml(value);
                };

                self.toCategory = function(variable){
                    self.showing = variable;
                    applyScope($scope);
                    self.resetParams();
                    self.thankYouCard = false;
                };

                self.changeStatus = function(isBasic, isToeic, isGrammar, isCommunication, type ) {
                    self.isBasic = isBasic;
                    self.isToeic = isToeic;
                    self.isGrammar = isGrammar;
                    self.isCommunication = isCommunication;
                    self.unitType = type;
                };

                self.index_topic = $rootScope.selectedUnit ;

                self.popup_landing_page = function(index){
                    if(index !== self.index_topic){
                        $('#popup_landing_page').modal('toogle');
                    }

                };

                self.chooseTopic = function (id, title) {
                    let array_units = $localStorage.unit ;
                    let index = array_units.indexOf(id);
                    if ($localStorage.auth) {
                        let actived_code = $localStorage.auth.actived_code;
                        if (actived_code.count_use_code === 0 && actived_code.count_user_courses === 0) {
                            // Nếu đã đăng nhập và chỉ có 1 unit cho phép mở thêm 1 Unit bất kỳ ngược lại thì thông báo mở cần mở hết khóa
                            if (array_units.length === 1) {
                                _.unique($localStorage.unit.push(id));
                            } else {
                                if(index === -1){
                                    _gaq.push(['_trackEvent', 'SET_', 'Choose unit', title]);
                                    self.openAllUnit();
                                }
                            }
                        } else {
                            self.allOpened = true;
                        }
                    } else {
                        if(index === -1){
                            _gaq.push(['_trackEvent', 'SET_', 'Choose unit', title]);
                            self.openOnUnit();
                        }
                    }
                    self.chooseOneTopic(id, index);
                    // reload unit
                    self.reloadUnit();
                    reloadLearningWordState();
                    self.returnLearnWord();
                    $rootScope.$broadcast('change_course', function () {

                    })
                };

                $scope.$on('open_setting', function () {
                    self.toggleSetting();
                });

                self.chooseMultiTopic =  function (id, index) {
                    let unitSettingSelected = $localStorage.unitSettingSelected;
                    if(index !== -1) {
                        let indexUnit = _.indexOf(unitSettingSelected, id);
                        if (indexUnit === -1) {
                            $localStorage.unitSettingSelected.push(id)
                        } else {
                            if (unitSettingSelected.length !== 1) {
                                unitSettingSelected.splice(indexUnit, 1);
                                $localStorage.unitSettingSelected = unitSettingSelected;
                            } else {
                                //TODO cần thông báo phải chọn ít nhất 1 Unit
                            }

                        }
                    }
                };

                self.chooseOneTopic =  function (id, index) {
                    let unitSettingSelected = $localStorage.unitSettingSelected;
                    if(index !== -1) {
                        // $rootScope.$emit("updateLearnWord");
                        let indexUnit = _.indexOf(unitSettingSelected, id);
                        $localStorage.unitSettingSelected = [id];
                    }
                };

                self.goLandingPage = function(){
                    _gaq.push(['_trackEvent', 'SET_', 'Open landing page', 'Open landing page']);
                };

                self.closeMessagePremium = function () {
                    self.messagePremium = false;
                };

                self.openRegister = function (title) {
                    self.messagePremium = false;
                    if (title === buttonRegister) {
                        if (!localStorage.getItem('user')) {
                            self.loginViewList = false;
                            $timeout(function () {
                                self.loginView = true;
                            }, 500);
                            $rootScope.openLoginFromOutside = true;
                        }
                    } else if (title === buttonReadMore) {
                        chrome.tabs.create({url: "https://elight.edu.vn/khoa-toan-dien-3-trong-1/?utm_source=extension&utm_medium=setting&utm_campaign=course"});
                    }
                };

                self.openUnit = function (id) {
                    let array_units = $localStorage.unit ;
                    let index = array_units.indexOf(id);
                    if ($localStorage.auth) {
                        let actived_code = $localStorage.auth.actived_code;
                        if (actived_code.count_use_code === 0 && actived_code.count_user_courses === 0) {
                            // Nếu đã đăng nhập và chỉ có 1 unit cho phép mở thêm 1 Unit bất kỳ ngược lại thì thông báo mở cần mở hết khóa
                            if (array_units.length === 1) {
                                _.unique($localStorage.unit.push(id));
                                self.unitInfor.unlock = true;
                            } else {
                                if (index === -1) {
                                    self.openAllUnit();
                                }
                            }
                        } else {
                            self.unitInfor.unlock = true;
                            self.allOpened = true;
                        }
                    } else {
                        if ($localStorage.unit.length > 1) {
                            self.openAllUnit();
                        } else {
                            self.openOnUnit();
                        }
                    }
                };

                // Open Message Unit
                self.openAllUnit = function () {
                    self.messagePremium = true;
                    self.messageHead = {
                        first : "Trở thành học viên VIP để mở toàn bộ chủ đề từ vựng",
                        second : self.localesMessage[20][$rootScope.language],
                        button: buttonReadMore
                    }
                };

                self.openOnUnit = function () {
                    self.messagePremium = true;
                    self.messageHead = {
                        first : self.localesMessage[19][$rootScope.language],
                        second : self.localesMessage[21][$rootScope.language],
                        button: buttonRegister
                    }
                };

                // getDetail Unit
                self.getDetailUnit = function (id, title, unlock, type) {
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
                        title : title,
                        newWord: newWordsTemp.length,
                        detail : $rootScope.language === 'vn' ? unitsConcats[id - 1].description : unitsConcats[id - 1].description_por,
                        unlock : unlock,
                        index : id
                    };
                    let oldWord = self.unitInfor.total - self.unitInfor.newWord;
                    let newWord = self.unitInfor.newWord - 3;
                    AmCharts.makeChart( "process_unit_setting", {
                        "type": "pie",
                        "theme": "light",
                        "dataProvider": [ {
                            "title": self.localesMessage[22][$rootScope.language],
                            "value": oldWord,
                            "color": "#c0c0c0",
                            "colorTitle": "#000000"
                        }, {
                            "title": self.localesMessage[23][$rootScope.language],
                            "value": newWord,
                            "color": "#E5E6E5",
                            "colorTitle": "#000000"
                        } ],
                        "titleField": "title",
                        "valueField": "value",
                        "labelRadius": 10 ,
                        "radius": "22%",
                        "colorField": "color",
                        "innerRadius": "80%",
                        "labelColorField": "colorTitle",
                        "labelText": "[[title]]: [[value]] ",
                        "startDuration": 0,
                    } );
                };

                self.backToListUnit = function () {
                    self.resetParams();
                    self.reloadUnit();
                };

                function reloadLearningWordState(){
                    $rootScope.$broadcast('reinit', {});
                }
            }
        ]
    });
