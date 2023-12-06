"use strict";
angular.module('aki.mission')
    .controller('MissionController', MissionController )
    .controller('MissionControllerDetail', MissionControllerDetail)
    .directive('akiMission', akiMission)
    .directive('akiMissionDetail', akiMissionDetail)
    .directive('akiMissionItem', akiMissionItem);
/**
 * TODO: Controller Mission
 * @type {string[]}
 */

MissionController.$inject = ['$scope', 'MissionService' ,'$rootScope', '$localStorage'];
function MissionController($scope, MissionService, $rootScope, $localStorage) {
    $scope.completed = false;
    $scope.minimum = $localStorage.minimumClap ? $localStorage.minimumClap : false;
    $scope.hide = true;
    let user_token = $localStorage.auth ? $localStorage.auth.user_token : '';
    $scope.hideMission = function (value) {
        $scope.minimum = !value;
        $localStorage.minimumClap = !value;
    };
    if (user_token && ( $localStorage.auth.actived_code.count_use_code > 0 || $localStorage.auth.actived_code.count_user_courses > 0)) {
        getMissions();
    } else {
        $scope.hide = true;
    }
    function getMissions() {
        MissionService.getMissions(user_token, 37)
            .then(function (response) {
                if (response.status === 2) {
                    $scope.completed = true;
                } else {
                    $scope.tasks = response.data;
                }
                $scope.hide = false;
            })
            .catch(function (error) {
                $scope.hide = true;
            });
    }
}

MissionControllerDetail.$inject = ['$scope'];
function MissionControllerDetail($scope) {
    $scope.$on('mission_update', function () {
        $scope.mission = localDB.getCollection('mission').data;
    });
}

/**
 * TODO: directive Mission: Global
 * @type {Array}
 */
akiMission.$inject = [];
function akiMission() {
    function link(scope, element, attrs) {

    }
    return {
        scope: {
            old: '='
        },
        restrict: 'E',
        templateUrl: 'app/components/mission/index.html',
        link: link,
        controller: "MissionController"
    };
}


/**
 * TODO: directive Mission: List Mission
 * @type {Array}
 */
akiMissionDetail.$inject = [];
function akiMissionDetail() {
    function link(scope, element, attrs) {

    }
    return {
        scope: {
            mission: '='
        },
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'app/components/mission/list.html',
        link: link,
        controller: "MissionControllerDetail"
    };
}

/**
 * TODO: directive Mission: Mission Item
 * @type {Array}
 */
akiMissionItem.$inject = ['$rootScope', '$localStorage', 'MissionService'];
function akiMissionItem($rootScope, $localStorage, MissionService) {
    function link(scope, element, attrs) {
        scope.dateMission = new Date();
        let user_token = $localStorage.auth.user_token;
        scope.toDoMission = function (type) {
            let typeInt = parseInt(type);
            switch(typeInt) {
                case 1:
                    $localStorage.auth.current_lesson = scope.data.title.split('Hoàn thành')[1].trim();
                    location.href = 'https://elight.edu.vn/tieng-anh-online/dashboard/game/' + scope.data.link;
                    break; //1: học bài mới
                case 2:
                    $localStorage.auth.current_lesson =  scope.data.title.split('Ôn tập')[1].trim();
                    location.href = 'https://elight.edu.vn/tieng-anh-online/dashboard/game/' + scope.data.link;
                    break; //2: ôn bài cũ (học game thực hành)
                case 3:
                    location.href = 'https://elight.edu.vn/tieng-anh-online';
                    break; //3: Coaching
                case 4:
                    if ( scope.total.status === 0 ) {
                        MissionService.finishTaskNew(user_token, scope.data.id);
                        scope.fullStar = { current : 1, total: 1 };
                    }
                    break; //4: cài extension
                case 5:
                    location.href = 'https://elight.edu.vn/tieng-anh-online';
                    break; //5: profile
                case 6:
                    location.href = 'https://elight.edu.vn/tieng-anh-online';
                    break; //6: biography
                default:
            }
        };
        if (parseInt(scope.type) === 1 && scope.data.status === 0) {
            let user_token = $localStorage.auth.user_token;
            let lesson_id = scope.data.asset;
            MissionService.getScoreLesson(user_token, parseInt(lesson_id))
                .then(function (response) {
                    let percent = response.total_score/response.number_of_question;
                    if (percent >= 0.8) {
                        MissionService.finishTaskNew(user_token, scope.data.id);
                        scope.fullStar = { current : 1, total: 1};
                    } else {
                        scope.fullStar = {
                            current : response.total_score,
                            total: response.number_of_question
                        };
                    }
                })
                .catch(function (error) {
                    console.log(response)
                })
        }
        if (parseInt(scope.type) === 4 && scope.total.status === 0 ) {
            MissionService.finishTaskNew(user_token, scope.data.id);
            scope.fullStar = { current : 1, total: 1 };
        }
    }
    return {
        scope: {
            'current'       : '@',
            'total'         : '@',
            'title'         : '@',
            'description'   : '@',
            'day'           : '@',
            'type'          : '@',
            'data'          : '='
        },
        restrict: 'E',
        templateUrl: 'app/components/mission/item.html',
        link: link
    };
}
