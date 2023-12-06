'use strict';

angular.module('login')
.directive('loginSuccess', loginSuccess);

function loginSuccess() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'app/components/login/login-success.template.html',
        controller: ['$scope', '$rootScope', '$localStorage', function($scope, $rootScope, $localStorage) {
            $scope.chooseTopic = function() {
                $('#logedin_success_modal').modal('hide');
                $('#profile_modal').modal('hide');
                $(".modal-backdrop.in").hide();
                $rootScope.showWelcome = 'topic2';
                delete $rootScope.freeUser;
                delete $rootScope.openLoginFromOutside;
            };

            $scope.learn = function() {
                $('#logedin_success_modal').modal('hide');
                $('#profile_modal').modal('hide');
                $(".modal-backdrop.in").hide();
                $rootScope.welcome = true;
                $localStorage.welcome = true;
                $rootScope.showWelcome = '';
                delete $rootScope.freeUser;
                delete $rootScope.openLoginFromOutside;
            };

            $scope.localesMessage = loginLocales;
        }]
    };
}
