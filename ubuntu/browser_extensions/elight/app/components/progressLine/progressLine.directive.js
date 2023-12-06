"use strict";
angular.module('aki.progressbar')
    .controller('progressLineController',progressLineController )
    .directive('progressLine',progressLine);
progressLineController.$inject = ['$scope', '$localStorage' , 'progressLineService', '$rootScope'];
function progressLineController ($scope, $localStorage, service, $rootScope) {
    var lesson_id = 326;
    $scope.error = false;
    $scope.auth = $localStorage.auth;
    if ($scope.auth && ( $scope.auth.actived_code.count_use_code > 0 || $scope.auth.actived_code.count_user_courses > 0)) {
        service.getAllStar(lesson_id)
            .then(function(response){
                if(response.data.code === 1){
                    $localStorage.auth.total_score = response.data.total_score;
                    var badge = _.find(score_level,function(value){
                        return $localStorage.auth.total_score >=  value.min_star  && $localStorage.auth.total_score <= value.max_star
                    });
                    if (!badge) {
                        badge = score_level[29];
                    }
                    $localStorage.badge = badge;
                    $rootScope.badge = badge;
                }
            })
            .catch(function(error) {
                console.log(error);
                $scope.error = true;
            });
    } else {
        $scope.error = true;
    }

    service.getBadgeLevel().then(function (response) {
        $scope.all_score_badges = response;
    });
}
progressLine.$inject = ['$rootScope'];
function progressLine($rootScope){
    function link(scope, element, attrs) {

    }
    return {
        link: link,
        restrict: 'E',
        scope: {
        },
        templateUrl: 'app/components/progressLine/index.html',
        controller: 'progressLineController'
    };
}


