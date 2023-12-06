'use strict';

angular.module('welcome').component('welcome', {
    templateUrl: 'app/components/welcome/welcome.template.html',
    controller: ['$scope', '$rootScope', '$sce', '$localStorage', 'loginService', function($scope, $rootScope, $sce, $localStorage, loginService) {
        var self = this;
        self.loading = false;
        self.localesMessage = welcomeLocales;
        if (!$localStorage.unit) {
            $localStorage.unit = [];
        }
        if (!$localStorage.welcome) {
            $localStorage.welcome = false;
            $rootScope.welcome = $localStorage.welcome;
            // self.showSection = 'recommend-choose-topic';
            _gaq.push(['_trackEvent', 'INTRO', 'Welcome screen', '']);
            self.showSection = 'intro';
        }else {
            $rootScope.welcome = true;
        }

        self.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        self.init = function() {
            if ($localStorage.timeUnactive == null) {
                $localStorage.timeUnactive = 1;
                // self.timeUnactive = 1;
            }else {
                if ((!$localStorage.unit || $localStorage.unit.length == 0) && $localStorage.timeUnactive >= 3) {
                    self.announcementActive = true;
                    self.version = featureOfNewVersion.version;
                    self.features = featureOfNewVersion.features;
                }else {
                    self.announcementActive = false;
                    $localStorage.timeUnactive++;
                }
            }
        };
        self.init();

        self.trustAsHtml = function (value) {
          return $sce.trustAsHtml(value);
        };

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

        self.openListTopic = function(id) {
            // $rootScope.showWelcome = 'topic';
            self.showSection = 'topic';
            var unitLocal = $localStorage.unit;
            _gaq.push(['_trackEvent', 'INTRO', 'List topic screen', '']);
            if (id) {
                unitLocal = _.initial($localStorage.unit);
                $localStorage.unit = unitLocal;
                $('body').removeClass("modal-open").css("padding-right","");
            }
            _.map(units, function ($value) {
                if (unitLocal) {
                    var unlock = _.contains(unitLocal, $value.id);
                    if  (unlock) {
                        $value.lock = false;
                    }
                }
            });
            self.units = units;
        };

        self.chooseTopic = function(unitId, unitName) {
            _gaq.push(['_trackEvent', 'INTRO', 'Choose topic', '']);
            self.unitName = unitName;
            self.unitId = unitId;
            let unlock = _.contains($localStorage.unit, self.unitId);
            $rootScope.selectedUnit = $localStorage.unit;
            if (!unlock) {
                $('#confirm-topic-box').modal('show');
                $('.modal-backdrop').appendTo('#list_topic_1');
                //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
                $('body').removeClass("modal-open").css("padding-right","");
            }
        };

        self.closeConfirmTopicModal = function() {
            $('#confirm-topic-box').modal('hide');
            $('.list_topic').removeClass('modal-backdrop');
        };

        self.confirmTopic = function() {
            _gaq.push(['_trackEvent', 'INTRO', 'Comfirm topic', '']);
            //Available Unit
            _.unique($localStorage.unit.push(self.unitId));

            $rootScope.welcome = true;
            $localStorage.welcome = true;
            $rootScope.random = 1;
            $rootScope.isLearn_word = true;
            $rootScope.isQuote = false;
            $rootScope.elightube = false;
            $rootScope.topic = false;
            applyScope($scope);
            self.removeshowSection();
        };

        self.openRegisterForm = function() {
            _gaq.push(['_trackEvent', 'INTRO', 'Register', '']);
            $rootScope.showWelcome = 'register-form';
            self.showSection = 'register-form';
        };

        self.removeshowSection = function () {

            $rootScope.showWelcome = null;
        };

        self.openListTopic2 = function() {
            _gaq.push(['_trackEvent', 'INTRO', 'List topic screen 2', '']);
            $rootScope.showWelcome = 'topic2';
            self.showSection = 'topic2';
            var unitLocal = $localStorage.unit;
            unitLocal = _.initial($localStorage.unit);
            $('body').removeClass("modal-open").css("padding-right","");

            _.map(units, function ($value) {
                if (unitLocal) {
                    let unlock = _.contains(unitLocal, $value.id);
                    if  (unlock) {
                        $value.lock = false;
                    }
                }
            });
            self.units = units;
        };

        self.chooseTopic2 = function(unitId, unitName) {
            _gaq.push(['_trackEvent', 'INTRO', 'Choose topic 2', '']);
            self.unitName = unitName;
            self.unitId = unitId;
            $rootScope.selectedUnit = $localStorage.unit;
            let unlock = _.contains($localStorage.unit, self.unitId);
            if (!unlock) {
                $('#confirm-topic-box2').modal('show');
                $('.modal-backdrop').appendTo('#list_topic_2');
                //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
                $('body').removeClass("modal-open").css("padding-right","");
            }
        };



        self.closeConfirmTopicModal2 = function() {
            $('#confirm-topic-box2').modal('hide');
            $('.list_topic').removeClass('modal-backdrop');
        };

        self.confirmTopic2 = function() {
            _gaq.push(['_trackEvent', 'INTRO', 'Comfirm topic 2', '']);
            //Available Unit
            _.unique($localStorage.unit.push(self.unitId));
            console.log($localStorage.unit);
            //availableTopics
            var topicsInUnit = units[self.unitId - 1].topics;
            console.log(topicsInUnit);
            // for (var i = 0; i < topicsInUnit.length; i++) {
            //     for (var j = 0; j < topics.length; j++) {
            //         if (topicsInUnit[i].id === topics[j].id) {
            //             $localStorage.availableTopics.push(j);
            //         }
            //     }
            // }
            $rootScope.welcome = true;
            $localStorage.welcome = true;
            self.removeshowSection();

        };

        if ($rootScope.showWelcome === 'topic2') {
            self.openListTopic2();
        }
    }]
});
