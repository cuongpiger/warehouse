'use strict';
angular.module('profile').component('profile', {
    templateUrl: "app/components/profile/profile.template.html",
    controller: ["$scope", "$rootScope", "$localStorage", 'ProfileService', 'user.service',
    function($scope, $rootScope, $localStorage, ProfileService, userService) {
        var self = this;
        var profile_menu = $('#profile_menu');
        profile_menu.on('hide.bs.modal', function() {
            $scope.closeModal = true;
        });
        profile_menu.on('show.bs.modal', function() {
            $scope.closeModal = false;
        });
        $rootScope.$on('loggedin', function () {
            $scope.user = $localStorage.auth;
            $rootScope.auth = $localStorage.auth;
        });
        $rootScope.auth = $localStorage.auth;
        self.init = function() {
            $scope.user = $localStorage.auth;
            if ($scope.user) {
                $scope.login = true;
            }else {
                $scope.login = false;
            }
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

        self.closeProfileModal = function() {
            delete $scope.openModal;
        };

        self.openProfileDetail = function() {
            self.showProfileDetail = true;
        };

        function openModalDetail() {
            self.showProfileMenu = !self.showProfileMenu;
            self.showProfileDetail = false;
        }
    }]
});
