/**
 * Created by Designer on 5/31/2017.
 */
"use strict";
angular.module('app.controller', ['ui.bootstrap']).controller('mainController', mainController);

mainController.$inject = ['$scope', 'mainService', '$rootScope', '$timeout', '$localStorage', 'challenge.io.service', 'challenge.items.service', 'user.service'];
function mainController($scope, $service, $rootScope, $timeout, $localStorage, socketService, ChallengeItem, userService) {
    this.bonusStat = ChallengeItem.getBonusStat();

  // NOTE: HOT FIX 3.5.4, delete this after 3.5.4 is published
  chrome.runtime.onInstalled.addListener((detail) => {
    let allKeys = Object.keys(localStorage);
    allKeys.splice(allKeys.indexOf("_start"), 1);
    allKeys.splice(allKeys.indexOf("ee_update_version"), 1);
    allKeys.map((key) => {
      try {
        let json = JSON.parse(localStorage.getItem(key));
      } catch (e) {
        _gaq.push(['_trackEvent', 'Error extesion', key, ($localStorage.auth && $localStorage.auth.id) ? $localStorage.auth.id : ($localStorage.guest_id || 0)]);
        localStorage.removeItem(key);
      }
    })
  });

    //$localStorage.unit = _.difference($localStorage.unit, _.range(32, 66));
    //Init Variable Parameter
    $localStorage.language = $localStorage.language ? $localStorage.language : "vn";
    $rootScope.language = $localStorage.language;
    $rootScope.backgroundMusic = '';
    $rootScope.version = ee_update_version;
    //clear cache at first time in this version
    if(!$localStorage.cacheCleared){
        $localStorage.$reset();
        localStorage.clear();
        $localStorage.cacheCleared = true;
    }

	if ($localStorage.auth) {
      var userInfo = {
        email: $localStorage.auth.email,
        username: $localStorage.auth.display_name,
        userId: $localStorage.auth.id,
        avatar: $localStorage.auth.avatar,
        guestId: $localStorage.guest_id,
		school: $localStorage.auth.school
      }
  	}else {
	  var userInfo = {
        guestId: $localStorage.guest_id
      }
  	}

    $rootScope.io.on('connect', function(){
        if ($localStorage.guest_id) {
            if (!$localStorage.token_guest_id) {
                socketService.getTokenGuestId($localStorage.guest_id)
                    .then(function (response) {
                        $localStorage.token_guest_id = response.data;
                        useSubcribeUser();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            } else {
                useSubcribeUser();
            }
        }else {
            $service.getGuestId(function(res){
                $localStorage.guest_id = res.data;
                var userInfo = {
                  guestId: $localStorage.guest_id
                };
                socketService.getTokenGuestId(res.data)
                    .then(function (response) {
                        $localStorage.token_guest_id = response.data;
                        useSubcribeUser();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            });
        }
    });

	function useSubcribeUser() {
        socketService.subcribeUser(userInfo.email, userInfo.username, userInfo.userId, userInfo.guestId, userInfo.avatar, userInfo.school)
            .then((response) => {
                if (response.status == 1) {
                    if (response.new_token) {
                        $localStorage.token_guest_id = response.new_token;
                    }
                    if ($localStorage.auth) {
                        $localStorage.auth.school = response.school;
                        localStorage.setItem('user', JSON.stringify($localStorage.auth));
                        userService.fetch();
                    }
                }
            })
            .catch((error) => {
                // TODO
                console.log('useSubcribeUser', error);
            })
    }

    $scope.changeLanguage = function(lang){
        $rootScope.language = lang;
    }

    $scope.invite = function () {
        socketService.inviteUserByUserId()
    };

    // $localStorage.streak.day = 2;
    // $localStorage.streak.update = (new Date("November 28, 2017 0:00:00")).getTime();

    if(!$localStorage.currentVersion){
        $localStorage.currentVersion = ee_update_version;
        _gaq.push(['_trackEvent', 'Extension Installation', 'Install', ee_update_version])
    }
    else if($localStorage.currentVersion !== ee_update_version) {
        if ($localStorage.currentVersion === '4.0.0') {
            delete $localStorage.schoolmateRank;
            delete $localStorage.allRank;
            delete $localStorage.schoolRank;
        }
        $localStorage.currentVersion = ee_update_version;
        $localStorage.quotes = [];
        localStorage.removeItem('_qd');
        _gaq.push(['_trackEvent', 'Extension Installation', 'Install', ee_update_version])
    }

    //Check offline extension
    $rootScope.network = navigator.onLine;
    window.addEventListener('online', function(e) {
        $rootScope.network = navigator.onLine;
        $rootScope.$broadcast('reInit', {});
        applyScope($scope);
    });
    window.addEventListener('offline', function(e) {
        $('.enjoyhint_close_btn').click();
        $rootScope.$broadcast('hide-tutorial', {});
        $rootScope.network = navigator.onLine;
        applyScope($scope);
    });

    // TODO start setbackGround and Random Background
    let background_morning = [
        {id : 1, image: '../assets/images/background/elight-extension1.jpg'},
        {id : 2, image: '../assets/images/background/elight-extension2.jpg'},
        {id : 3, image: '../assets/images/background/elight-extension3.jpg'},
        {id : 4, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/morning/elight-extension4.jpg'},
        {id : 5, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/morning/elight-extension5.jpg'},
        {id : 6, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/morning/elight-extension6.jpg'},
        {id : 7, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/morning/elight-extension7.jpg'},
        {id : 8, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/morning/elight-extension8.jpg'},
        {id : 9, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/morning/elight-extension9.jpg'},
        {id : 10, image: '../assets/images/background/elight-extension10.jpg'}
    ];
    let localBackgroundMorning = [
        {id : 1, image: '../assets/images/background/elight-extension1.jpg'},
        {id : 2, image: '../assets/images/background/elight-extension2.jpg'},
        {id : 3, image: '../assets/images/background/elight-extension3.jpg'},
        {id : 10, image: '../assets/images/background/elight-extension10.jpg'}
    ];
    let background_afternoon = [
        {id : 1, image: '../assets/images/background/elight-ex-afternoon1.jpg'},
        {id : 2, image: '../assets/images/background/elight-ex-afternoon2.jpg'},
        {id : 3, image: '../assets/images/background/elight-ex-afternoon3.jpg'},
        {id : 4, image: '../assets/images/background/elight-ex-afternoon4.jpg'},
        {id : 5, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/afternoon/elight-ex-afternoon5.jpg'},
        {id : 6, image: '../assets/images/background/elight-ex-afternoon6.jpg'},
        {id : 7, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/afternoon/elight-ex-afternoon7.jpg'},
        {id : 8, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/afternoon/elight-ex-afternoon8.jpg'},
        {id : 9, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/afternoon/elight-ex-afternoon9.jpg'},
        {id : 10, image: 'https://s3-ap-northeast-1.amazonaws.com/elifile/public/images/extension/afternoon/elight-ex-afternoon10.jpg'},
    ];
    let localBackgroundAfternoon = [
        {id : 1, image: '../assets/images/background/elight-ex-afternoon1.jpg'},
        {id : 2, image: '../assets/images/background/elight-ex-afternoon2.jpg'},
        {id : 3, image: '../assets/images/background/elight-ex-afternoon3.jpg'},
        {id : 4, image: '../assets/images/background/elight-ex-afternoon4.jpg'},
        {id : 6, image: '../assets/images/background/elight-ex-afternoon6.jpg'}
    ];
    let background_evening = [
        {id : 1, image: '../assets/images/background/elight-ex-night1.jpg'},
        {id : 2, image: '../assets/images/background/elight-ex-night2.jpg'},
        {id : 3, image: '../assets/images/background/elight-ex-night3.jpg'},
        {id : 4, image: '../assets/images/background/elight-ex-night4.jpg'}
    ];
    let localBackgroundEvening = [
        {id : 1, image: '../assets/images/background/elight-ex-night1.jpg'},
        {id : 2, image: '../assets/images/background/elight-ex-night2.jpg'},
        {id : 3, image: '../assets/images/background/elight-ex-night3.jpg'},
        {id : 4, image: '../assets/images/background/elight-ex-night4.jpg'}
    ];

    let defaultTimeWaiting = 1500;
    let defaultBackground = '../assets/images/default.jpg';

    checkDailyTimeBackground();

    var usingDefaultBG = false;
    var defaultBG = $timeout(function(){
        $scope.background = $scope.localBackground ? $scope.localBackground.image : defaultBackground;
        usingDefaultBG = true;
        var imageBackground = new Image();
        imageBackground.src = $scope.background;
        imageBackground.onload = function(){
            $('.placeholder-background').css('background-image', 'url('+$scope.background+')').addClass('background-fade');
        };
        applyScope($scope);
    }, defaultTimeWaiting);

    window.onload = function() {
        $timeout.cancel(defaultBG);

        $rootScope.slowNetwork = false;
        $rootScope.network = navigator.onLine;
        if(!usingDefaultBG){
            var placeholder = document.querySelector('.backgroundp-ex');

            // 2: load large image
            var imgLarge = new Image();
            imgLarge.src = placeholder.dataset.large;

            imgLarge.onload = function () {
                if ($localStorage.welcome) {
                    $('.placeholder-background').css('background-image', 'url('+placeholder.dataset.large+')').addClass('background-fade');
                } else {
                    $('.placeholder-background').css('background-image', 'url('+$scope.background+')').addClass('background-fade');
                }
            };
            imgLarge.onerror = function () {
                $('.placeholder-background').css('background-image', 'url(../assets/images/default.jpg)').addClass('background-fade');
            }
        }
    };

    $scope.version = ee_update_version;


    //TODO: Random background
    function cacheBackgroundObject(time){
        if(time === 'morning'){
            if(!$localStorage.bg_morning || $localStorage.bg_morning && (!$localStorage.bg_morning.images || $localStorage.bg_morning.images.length <= 0)){
                $localStorage.bg_morning = {
                    'images' : background_morning,
                    'preload' : ''
                };
                if(!$localStorage.bg_morning.local || $localStorage.bg_morning.local.length <= 0){
                    $localStorage.bg_morning.local = localBackgroundMorning;
                }
            }
        }
        else if(time === 'afternoon'){
            if(!$localStorage.bg_afternoon || $localStorage.bg_afternoon && (!$localStorage.bg_afternoon.images || $localStorage.bg_afternoon.images.length <= 0)){
                $localStorage.bg_afternoon = {
                    'images' : background_afternoon,
                    'preload' : ''
                };
                if(!$localStorage.bg_afternoon.local || $localStorage.bg_afternoon.local.length <= 0){
                    $localStorage.bg_afternoon.local = localBackgroundAfternoon;
                }
            }
        }
        else if(time === 'evening'){
            if(!$localStorage.bg_evening || $localStorage.bg_evening && (!$localStorage.bg_evening.images || $localStorage.bg_evening.images.length <= 0)){
                $localStorage.bg_evening = {
                    'images' : background_evening,
                    'preload' : ''
                };
                if(!$localStorage.bg_evening.local || $localStorage.bg_evening.local.length <= 0){
                    $localStorage.bg_evening.local = localBackgroundEvening;
                }
            }
        }
    }

    function randomImage(array){
        if(!array || array.length === 0) return 0;
        else {
            var random = Math.floor(Math.random * array.length);
            var image = array.splice(random, 1)[0];
            return image;
        }
    }

    function cachePreloadImage(time){
        if(time === 'morning'){
            if(!$localStorage.bg_morning.preload){
                $localStorage.bg_morning.preload = randomImage($localStorage.bg_morning.images);
            }
            else return;
        }
        else if(time === 'afternoon'){
            if(!$localStorage.bg_afternoon.preload){
                $localStorage.bg_afternoon.preload = randomImage($localStorage.bg_afternoon.images);
            }
            else return;
        }
        else if(time === 'evening'){
            if(!$localStorage.bg_evening.preload){
                $localStorage.bg_evening.preload = randomImage($localStorage.bg_evening.images);
            }
            else return;
        }
        else return;
    }

    function cacheLocalImage(time){
        if(time === 'morning'){
            if(!$localStorage.bg_morning.currentLocalImage){
                $localStorage.bg_morning.currentLocalImage = randomImage($localStorage.bg_morning.local);
            }
            else return;
        }
        else if(time === 'afternoon'){
            if(!$localStorage.bg_afternoon.currentLocalImage){
                $localStorage.bg_afternoon.currentLocalImage = randomImage($localStorage.bg_afternoon.local);
            }
            else return;
        }
        else if(time === 'evening'){
            if(!$localStorage.bg_evening.currentLocalImage){
                $localStorage.bg_evening.currentLocalImage = randomImage($localStorage.bg_evening.local);
            }
            else return;
        }
        else return;
    }

    function updateBackground(time){
        cacheBackgroundObject(time);
        if(time === 'morning'){
            $localStorage.background = $localStorage.bg_morning.preload;
            $localStorage.bg_morning.preload = '';
            $localStorage.bg_morning.currentLocalImage = '';
            cachePreloadImage(time);
            cacheLocalImage(time);
        }
        if(time === 'afternoon'){
            $localStorage.background = $localStorage.bg_afternoon.preload;
            $localStorage.bg_afternoon.preload = '';
            $localStorage.bg_afternoon.currentLocalImage = '';
            cachePreloadImage(time);
            cacheLocalImage(time);
        }
        if(time === 'evening'){
            $localStorage.background = $localStorage.bg_evening.preload;
            $localStorage.bg_evening.preload = '';
            $localStorage.bg_evening.currentLocalImage = '';
            cachePreloadImage(time);
            cacheLocalImage(time);
        }
    }

    function checkDailyTimeBackground(){
        var hour = new Date().getHours();
        var date = new Date().getDate();
        var time;
        if(hour > 0 && hour <= 11){
            time = 'morning';
        }
        else if(hour > 11 && hour <= 19){
            time = 'afternoon';
        }
        else {
            time = 'evening';
        }

        if(!$localStorage.currentTime || $localStorage.currentTime !== time || !$localStorage.background || !$localStorage.oldDate || $localStorage.oldDate !== date){
            $localStorage.oldDate = date;
            $localStorage.currentTime = time;
            updateBackground(time);
            initScopeAndCheckNetwork(time);
        }
        else {
            initScopeAndCheckNetwork(time);
        }
    }

    function initScopeAndCheckNetwork(time){
        $scope.background = navigator.onLine ? $localStorage.background.image : 'assets/images/default.jpg';
        switch(time){
            case 'morning' :
                $scope.preload = $localStorage.bg_morning.preload.image;
                $scope.localBackground = $localStorage.bg_morning.currentLocalImage;
                break;
            case 'afternoon' :
                $scope.preload = $localStorage.bg_afternoon.preload.image;
                $scope.localBackground = $localStorage.bg_afternoon.currentLocalImage;
                break;
            case 'evening' :
                $scope.preload = $localStorage.bg_evening.preload.image;
                $scope.localBackground = $localStorage.bg_evening.currentLocalImage;
                break;
            default :
                $scope.preload = '';
        }
        applyScope($scope);
    }


    // TODO Background music flag
    if(typeof($localStorage.volume) === 'undefined'){
        $localStorage.volume = 1;
        $rootScope.volume = 1;
    }
    else {
        $rootScope.volume = $localStorage.volume;
    }
    // End Background music flag
    let today = new Date();
    if(!$localStorage.randomScreen || $localStorage.randomScreen.length === 0){
        $localStorage.randomScreen = [1, 2];
    }
    if($rootScope.language === 'vn'){
      let random = _.sample([1, 2, 3]);
      // let random = _.sample([1]);
      if (random === 1) {
          $rootScope.random = 1;
          $rootScope.isLearn_word = true;
          $rootScope.isQuote = false;
          $rootScope.elightube = false;
          $rootScope.topic = false;
      } else if (random === 2){
          $rootScope.random = 1;
          $rootScope.isLearn_word = false;
          $rootScope.isQuote = true;
          $rootScope.elightube = false;
          $rootScope.topic = false;
      } else if (random === 3){
        $rootScope.random = 1;
        if (_.isEmpty($localStorage.videos)) {
          $rootScope.isLearn_word = false;
          $rootScope.isQuote = true;
          $rootScope.elightube = false;
          $rootScope.topic = false;
        } else {
          $rootScope.isLearn_word = false;
          $rootScope.isQuote = false;
          $rootScope.elightube = true;
          $rootScope.topic = false;
        }
      } else {
            $rootScope.random = 1;
            $rootScope.isLearn_word = false;
            $rootScope.isQuote = false;
            $rootScope.elightube = false;
            $rootScope.topic = true;
        }
    }
    else {
        $rootScope.random = 1;
        $rootScope.isLearn_word = true;
        $rootScope.isQuote = false;
        $rootScope.elightube = false;
        $rootScope.topic = false;
    }
    
  $rootScope.random = 1;
  $rootScope.challengeScreen = 0;

  $service.getShareNumber(function(status, res) {
    if (status) {
      $rootScope.shareNumber = res;
    } else {
      $rootScope.shareNumber = "";
    }
  });

  //update ee update version in localStorage
  let ee_update_version_temp = localStorage.getItem("ee_update_version");
  if (ee_update_version_temp) {
    if (ee_update_version_temp !== ee_update_version) {
      localStorage.ee_update_version = ee_update_version;
      _gaq.push(['_trackEvent', 'Upgrade Extension', 'Upgrade', ee_update_version]);
    }
  } else {
    localStorage.ee_update_version = ee_update_version;
    _gaq.push(['_trackEvent', 'Upgrade Extension', 'Upgrade', ee_update_version]);
  }

  //check for update
  chrome.runtime.onUpdateAvailable.addListener(function (details) {
    chrome.runtime.reload();
  });

  chrome.runtime.requestUpdateCheck(function (status) {
    if (status === "update_available") {
        $scope.is_update = true;
        localStorage._wupdate = false;
    } else if (status === "no_update") {
        $scope.is_update = false;
        localStorage._wupdate = false;
    } else if (status === "throttled") {
        $scope.is_update = false;
        localStorage._wupdate = false;
    }
  });
}
