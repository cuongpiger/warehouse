"use strict";
angular.module('aki.progressbar')
        .factory('progressLineService', progressLineService);

progressLineService.$inject = ['$http' , 'API_URL', '$q', '$localStorage'];
function progressLineService($http, API_URL, $q, $localStorage){
    var service = {};
    var user_token = $localStorage.auth ? $localStorage.auth.user_token : 0;
    service.getAllStar = function(lesson_id, game_type, skillId){
        var deferred = $q.defer();
        var  urlApi = { url : API_URL+'user/total-score',   method  : 'GET' };
        $http({
            method: urlApi.method,
            url: urlApi.url,
            params: {
                user_token: user_token,
                lesson_id : lesson_id,
            }
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response){
            deferred.reject(response);
        });
        return deferred.promise;
    };
    service.getBadgeLevel = function () {
        var deferred = $q.defer();
        deferred.resolve(badge_level);
        return deferred.promise;
    };
    service.updateScore = function (score) {
        var deferred = $q.defer();
        var  urlApi = { url : API_URL+'extension/score/update',   method  : 'POST' };
        $http({
            method: urlApi.method,
            url: urlApi.url,
            params: {
                user_token: user_token,
                score : score,
            }
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response){
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}