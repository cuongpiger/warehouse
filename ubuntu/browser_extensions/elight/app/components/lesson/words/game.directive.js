"use strict";
angular.module('lesson.word')
    .directive('gameDirective', gameDirective);

function gameDirective(){
    function link(scope, element, attrs) {

    }
    return {
        scope: {
            template : '=',
            data : '=',
            index : '=',
            answer : '='
        },
        restrict: 'E',
        template: "<div ng-include='template' id='game_main_div' class=''></div>",
        link: link,
        controller: ['$scope', '$attrs', '$timeout', function ($scope, $attrs, $timeout) {
            var nextAudio = new Audio('assets/audio/learn_word/next_question.mp3');
            nextAudio.volume = 0.4;
            $scope.nextStep = function(){
                $scope.$parent.nextStep();
                applyScope($scope);
                AkiraAnimation('#main_flow_box', 'zoomOut');
                $timeout(function () {
                    AkiraAnimation('#main_flow_box', 'zoomIn');
                },100);
                nextAudio.play();

            };
        }]
    };
}