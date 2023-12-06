"use strict";

angular.module("footer.setting").component("setting", {
	templateUrl : "app/components/footer/setting/setting.template.html",
	controller : ["$scope", "$localStorage", "$rootScope",'$sce',
		function settingController($scope, $localStorage, $rootScope, $sce) {
            let self = this;
            self.localesMessage = settingLocales;
            self.showing = self.localesMessage[3][$rootScope.language];
			let buttonReadMore = self.localesMessage[17][$rootScope.language];
			let buttonRegister = self.localesMessage[18][$rootScope.language];
            self.allOpened = false;
            self.isToeic = false;
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

            self.resetParams();

			self.updateHistory = ee_update_history;

			self.selectedUnits = $localStorage.unit;

            self.reloadUnit = function () {
                if (!$localStorage.unitSettingSelected) {
                    $localStorage.unitSettingSelected = angular.copy($localStorage.unit)
                }
                let unitLocal = $localStorage.unit;
                let userAuth = $localStorage.auth;
                if (userAuth && (userAuth.actived_code.count_use_code > 0 || userAuth.actived_code.count_user_courses > 0 )) {
                    let unitsConcat = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);
                    unitsConcat.forEach(function(element, index) {
                        $localStorage.unit[index] = element.id;
                    });
                    unitLocal = $localStorage.unit;
                }
                let unitsConcat = units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit);
                _.map(unitsConcat, function ($value) {
                    if (unitLocal) {
                        let unlock = _.contains(unitLocal, $value.id);
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

			self.toggleSetting = function(){
                _gaq.push(['_trackEvent', 'SET_', 'Open', "Open"]);
                $scope.openSettingModal = true;
                applyScope($scope);
                console.log('scope setting', $scope.openSettingModal);
                $('#setting_modal').modal('show');
                if ($localStorage.auth) {
                    let actived_code = $localStorage.auth.actived_code;
                    self.allOpened = true;
                }
                self.reloadUnit();
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
                        $rootScope.openLoginFromOutside = true;
                        $('.login-form').modal('show');
                    }
                } else if (title === buttonReadMore) {
                    chrome.tabs.create({url: "https://elight.edu.vn/khoa-toan-dien-3-trong-1-extension?utm_source=extension&utm_medium=setting&utm_campaign=course"});
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
                    first : self.localesMessage[19][$rootScope.language],
                    second : self.localesMessage[20][$rootScope.language],
                    button: buttonReadMore
                }
            };

            self.openOnUnit = function () {
                self.messagePremium = true;
                self.messageHead = {
                    first : self.localesMessage[18][$rootScope.language],
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
                        "colorTitle": "#ffffff"
                    }, {
                        "title": self.localesMessage[23][$rootScope.language],
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
                    "labelColorField": "colorTitle",
                    "labelText": "[[title]]: [[value]] ",
                    "startDuration": 0,
                } );
            };

            self.backToListUnit = function () {
                self.resetParams();
                self.reloadUnit();
            };

            self.sendFeedback = function () {
                self.loading = true;
                $localStorage.email = self.form_feedback.email;
                let form = {
                    'emailAddress' : self.form_feedback.email,
                    'entry.1037456847' : self.form_feedback.content,
                };
                let url = 'https://docs.google.com/forms/d/e/1FAIpQLSd8_NNRWAE5y25WlBr__SHvIZtu43gfuenykhGZcjk8Lj5rPw/formResponse';
                $.ajax({
                    method: 'POST',
                    url: url,
                    data: form
                });
                self.loading = false;
                self.resetParams();
                self.thankYouCard = true;
            };

            self.sendSupport = function () {
                self.loading = true;
                $localStorage.email = self.form_support.email;
                let form = {
                    'entry.347563705' : self.form_support.name,
                    'emailAddress' : self.form_support.email,
                    'entry.1037456847' : self.form_support.phone,
                    'entry.543144169' : self.form_support.content,
                };
                let url = 'https://docs.google.com/forms/d/e/1FAIpQLSf87cB5XSSJ7h8XipcNwOJZ7yzEVS2ByuQgrfN0MWkKg3Lu2g/formResponse';
                $.ajax({
                    method: 'POST',
                    url: url,
                    data: form
                });
                self.loading = false;
                self.resetParams();
                self.thankYouCard = true;
            };

            function reloadLearningWordState(){
                $rootScope.$broadcast('reinit', {});
            }
		}
	]
});
