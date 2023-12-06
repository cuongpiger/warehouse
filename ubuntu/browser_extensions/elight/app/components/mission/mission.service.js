"use strict";
angular.module('aki.mission')
    .factory('MissionService', MissionService);

MissionService.$inject = ['$http', '$q', 'API_URL'];
function MissionService($http, $q, API_URL) {
    var service = {};
    service.getMissions = function(user_token, course_id){
        var deferred = $q.defer();
        var urlApi = {url  : API_URL+'user/course/task', method : 'GET'};
        $http({
            method : urlApi.method,
            url : urlApi.url,
            params: {
                user_token: user_token,
                course_id : course_id,
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

    service.getScoreLesson = function(user_token, lesson_id){
        var deferred = $q.defer();
        var urlApi = {url  : API_URL + 'user/lesson/score', method : 'GET'};
        $http({
            method : urlApi.method,
            url : urlApi.url,
            params: {
                user_token: user_token,
                lesson_id : lesson_id,
            }
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

    service.finishTaskNew = function (user_token, task_id) {
        var deferred = $q.defer();
        var  urlApi = {url  : API_URL+'user/course/task/finish', method : 'POST'};
        $http({
            method: urlApi.method,
            url: urlApi.url,
            params: {
                user_token: user_token,
                task_id: task_id
            }
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };
    return service;
}