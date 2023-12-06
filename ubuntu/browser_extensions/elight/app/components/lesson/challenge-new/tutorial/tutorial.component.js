'use strict';

angular.module("lesson.challenge_new").component("challengeTutorial", {
    templateUrl	:	"app/components/lesson/challenge-new/tutorial/tutorial.template.html",
    controller	: ["$scope", "$rootScope","$localStorage", "$interval", "$timeout", "challengeService",
        function ($scope, $rootScope, $localStorage, $interval, $timeout, challengeService) {
            ///init scope
            var self = this;
            var checkedTrue = false;
            $rootScope.tutorialCorrect = 0;
            $scope.question_answers = tutorialData;
            _.each($scope.question_answers, function(val,key){
                $scope.question_answers[key].checked = false;
            });
            $scope.answer = tutorialData[2];
            $rootScope.endTutorial = false;

            function playAudio(audio){
                var audio = new Audio(audio);
                audio.play();
            }

            function animation_change_score(class_name){
                $(class_name).addClass('rotateCus');
                setTimeout(function(){
                    $(class_name).removeClass('rotateCus');
                }, 500);
            }

            function closeTutorial(){
                $rootScope.endTutorial = true;
                applyScope($scope);
            }

            function guideLine() {
                var enjoyhint_instance = new EnjoyHint({
                    onEnd:function(){
                        closeTutorial();
                        $("body").css({overflow: hidden});
                    },
                    onSkip:function(){
                        closeTutorial();
                    }
                });
                var enjoyhint_script_steps = [{
                    'click #tutorial_answer_2' : challengeLocales[30][$rootScope.language],
                    'showSkip' : false
                }, {
                    'next .challenge_score_player_div' : challengeLocales[31][$rootScope.language],
                    'showSkip' : true
                }, {
                    'next .challenge_3_heart_left' : challengeLocales[32][$rootScope.language] + ' <i class="fa fa-heart heart_red" aria-hidden="true"></i>',
                    'showSkip' : true
                }, {
                    'next .challenge_clock' : challengeLocales[33][$rootScope.language] + ' <i class="fa fa-heart heart_red" aria-hidden="true"></i>',
                    'showSkip' : true
              }, {
                    'next .challenge_your_info' : challengeLocales[34][$rootScope.language],
                    'showSkip' : true
                }, {
                    'next .challenge_3_weapon' : challengeLocales[35][$rootScope.language],
                    'showSkip' : true
                }, {
                    'next .challenge_3_ability_freeze' : challengeLocales[8][$rootScope.language],
                    'showSkip' : true
                }, {
                    'next .challenge_3_ability_unfreeze' : challengeLocales[9][$rootScope.language],
                    'showSkip' : true
                }, {
                    'next .challenge_3_ability_boom' : challengeLocales[10][$rootScope.language],
                    'showSkip' : true
                }, {
                    'next .challenge_3_ability_heart' : challengeLocales[36][$rootScope.language] + '<i class="fa fa-heart heart_red" aria-hidden="true"></i>',
                    'showSkip' : true
                }];

                enjoyhint_instance.set(enjoyhint_script_steps);
                enjoyhint_instance.run();
                // $('.enjoyhint_close_btn').hide();
            }

            guideLine();

            self.checkAnswer = function(answer, key){
                if(!checkedTrue){
                    $scope.question_answers[key].checked = true;
                    if(answer == $scope.answer.word){
                        playAudio('assets/audio/right.mp3');
                        checkedTrue = true;
                        animation_change_score('.challenge_score_player');
                        $rootScope.tutorialCorrect++;
                    } else {
                        playAudio('assets/audio/wrong.mp3');
                    }
                } else return;
            };
        }]
})
