'use strict';

angular.module('profile.service', []).service('ProfileService', ['$http', '$q', 'API_URL',
    function($http, $q, API_URL) {
        var service = {};

        service.updateAvatar = function(url, token) {
            var data = {
                url: url,
                user_token: token
            };
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: API_URL + 'change-avatar-user',
                data: data
            }).then(function(response) {
                deferred.resolve(response)
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        service.updateProfile = function(displayName, school, userToken) {
            var data = {
                display_name: displayName,
                school: school,
                user_token: userToken
            };

            var deferred = $q.defer();
            $http({
                method: apis.profileUpdate.method,
                url: apis.profileUpdate.url,
                params: data
            }).then(function(response) {
                deferred.resolve(response);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        service.updateUserInfo = function(guestId, username, avatar, schoolId, schoolName) {
            var data = {
                guestId,
                username,
                avatar,
                schoolId,
                schoolName
            };

            var deferred = $q.defer();
            $http({
                method: apis.updateUserInfo.method,
                url: apis.updateUserInfo.url,
                params: data
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return service;
    }
]);
