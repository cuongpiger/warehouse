/**
 * Created by Designer on 5/31/2017.
 */
'use strict';

Raven.config(window.ENV.sentry.dns, {
    shouldSendCallback: () => {
        return window.ENV.sentry.enable;
    }
}).install();
var app = angular.module('main', [
    'ngRaven',
    //main
    'app.controller',
    'app.service',
    "focus.directive",
    "tooltip.directive",
    'dailyTask.service',
    'wordMemo.service',
    'popoverAutoclose.directive',
    'scrollLazyload.directive',
    'interpolate.filter',
    'login.service',
    'profile.service',
    'challenge.service',
    'challenge.service.io',
    'challenge.items',
    'preload.service',
    'streak.service',
    'mainScreen',
    'mainScreen.end-game',
    //user
    'user',
    //header
    'header.navigator',
    'header.searchBox',
    //guideline
    // 'basic-guideline',
    //lesson
    'lesson.quote',
    'lesson.word',
    'lesson.elightube',
    'lesson.challenge_new',
    'lesson.topic',
    // //footer
    'footer.setting',
    'footer.video',
    //offline
    'offline',
    //something else
    'ngAudio',
    'ngStorage',
    'pr.longpress',
    "oc.lazyLoad",
    'login',
    'notebook',
    'ngAnimate',
    'experience.service',
    'firebase.service',
    'angular-svg-round-progressbar',
    'welcome',
    'profile',
    'inviteFriend',
    'ngFileUpload',
    'ngImgCrop',
    'timer',
    'aki.mission',
    'aki.progressbar'
]);

app.config(function ($compileProvider, $httpProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    $httpProvider.defaults.headers.post["Access-Control-Allow-Headers"] ="Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Access-Control-Allow-Origin";
    $httpProvider.useApplyAsync(true);
});
app.constant('API_URL', 'https://api.elight.edu.vn/v3/');
app.run(function ($rootScope) {
    $rootScope.io = io.sails.connect();
    function keyUpFunc(e) {
        if($('.modal.in').length <= 1){
            if (e.keyCode === 13) {
                try {
                    $rootScope.$broadcast("checkEnter", { key : e.keyCode});
                } catch(ex) {
                    console.log('error ENTER PRESS');
                }

            } if(e.key === "1" || e.key === "2" || e.key === "3"){
                $rootScope.$broadcast('chooseAnswer', { key : e.key});
            } if(e.keyCode === 32){
                $rootScope.$broadcast('flipCard', { key : e.keyCode});
            }
        }
    }
    $(document).ready( function (){
        $(document).keypress(keyUpFunc);
    });

});

app.filter('dateFormat', function () {
    return function (value) {
        return value.getDate() + '/' + (value.getMonth() + 1) +'/'+ value.getFullYear()
    }
});
app.filter('validateEmailDomain', function(){
    return function(html){
        var isValid = false;
        if (html) {
            var emailArray = html.split('@');
            if (emailArray.length === 2) {
                var splitDot = emailArray[1].split('.');
                if (splitDot[length - 1] !== '' && splitDot[0] !== '') {
                    return true;
                }
            }
        }
        return isValid
    }
});
app.directive('onError', function() {
    return {
        restrict:'A',
        scope : {
            classLoading : '@',
        },
        link: function(scope, element, attr) {
            if (scope.classLoading) {
                $('.loading-' +scope.classLoading ).show();
            }
            let item =  'imageError.png';
            if (angular.isUndefined(attr.ngSrc) || attr.ngSrc === '' ) {
                attr.$set('src', 'assets/images/'+item);
            }
            element.bind('load', function() {
                if (scope.classLoading) {
                    $('.loading-' +scope.classLoading ).hide();
                }
            });
            element.bind('error', function() {
                if (attr.src !== attr.errSrc) {
                    attr.$set('src', 'assets/images/'+item);
                }
            });
        }
    }
});
app.directive('focusMe', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            //var model = $parse("sample["+attrs.focusMe+"]");
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            element.bind('blur', function () {
                if (typeof model.assign == 'function') {
                    scope.$apply(model.assign(scope, false));
                }
            })
        }
    };
});
app.directive('onErrorAvatar', function($localStorage) {
    return {
        restrict:'A',
        link: function(scope, element, attr) {
            var random_avatar =  'assets/images/avatar/ava'+Math.round(attr.alt ? attr.alt.length%19 + 1 : 1)+'.png';
                if (angular.isUndefined(attr.ngSrc) || attr.ngSrc === '' ) {
                    attr.$set('src', random_avatar);
                }
                element.bind('error', function() {
                    if (attr.src != attr.errSrc) {
                        attr.$set('src', random_avatar);
                    }
                });
        }
    }
});
window.fbAsyncInit = function() {
    FB.init({
        appId      : "223689894808165",
        // appId      : "1650116071882329",
        xfbml      : true,
        version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
};