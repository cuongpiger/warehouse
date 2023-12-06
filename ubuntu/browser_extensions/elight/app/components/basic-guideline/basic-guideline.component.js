"use strict";

angular.module("basic-guideline").component("guideline", {
    templateUrl: "app/components/basic-guideline/basic-guideline.template.html",
    controller: ["$scope", "$localStorage", "$rootScope",
        function ($scope, $localStorage, $rootScope, $sce) {
            $rootScope.random = 1;
            $rootScope.isLearn_word = true;
            $rootScope.isQuote = false;
            $rootScope.guideStep = 1;
            $('.topic_box').addClass('guideline_focus');
            $scope.nextStep = function(){
                $rootScope.guideStep++;
                if($rootScope.guideStep == 3){
                    $rootScope.quoteCategory = 'work';
                    $rootScope.isLearn_word = false;
                    $rootScope.isQuote = true;
                    $rootScope.elightube = false;
                    $rootScope.topic = false;
                    $('.quote_box').addClass('guideline_focus');
                }
                else if($rootScope.guideStep == 4){
                    $rootScope.quoteCategory = 'newsline-v1';
                    $rootScope.$broadcast('reinit-quote', {});
                }
                else if($rootScope.guideStep == 5){
                    $rootScope.isLearn_word = true;
                    $rootScope.elightube = false;
                    $rootScope.topic = false;
                    $rootScope.isQuote = false;
                    $('.topic_box').removeClass('guideline_focus guideline-basic-box');
                    $('.notebook_btn').addClass('guideline_focus');
                }
                else if($rootScope.guideStep == 6){
                    $('.notebook_btn').removeClass('guideline_focus');
                    $('.challenge_btn').addClass('guideline_focus');
                }
                else if($rootScope.guideStep == 7){
                    $('.challenge_btn').removeClass('guideline_focus');
                    $('.video_btn').addClass('guideline_focus');
                }
                else if($rootScope.guideStep == 8){
                    $('.video_btn').removeClass('guideline_focus');
                    $('.profile').addClass('guideline_focus');
                }
                else if($rootScope.guideStep == 9){
                    $('.profile').removeClass('guideline_focus');
                    $('.new_setting').addClass('guideline_focus');
                }
                else if($rootScope.guideStep == 10){
                    $('.new_setting').removeClass('guideline_focus');
                }
                else if($rootScope.guideStep == 11){
                    $scope.finish();
                }
            };

            $scope.finish = function(){
                $rootScope.guideStep = 1;
                if(!$localStorage.basicGuideline) {
                    $localStorage.basicGuideline = true;

                }
                $('.topic_box').removeClass('guideline_focus');
                $('.quote_box').removeClass('guideline_focus');
                $('.video_btn').removeClass('guideline_focus');
                $('.notebook_btn').removeClass('guideline_focus');
                $('.challenge_btn').removeClass('guideline_focus');
                $('.profile').removeClass('guideline_focus');
                $('.new_setting').removeClass('guideline_focus');
                $rootScope.basicGuideline = false;
                $rootScope.$broadcast('guideline', {});
                applyScope($scope);
            }
        }]
});