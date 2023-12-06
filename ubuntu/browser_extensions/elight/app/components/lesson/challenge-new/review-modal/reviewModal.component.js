'use strict';

angular.module("lesson.challenge_new").component("challengeReview", {
    templateUrl: "app/components/lesson/challenge-new/review-modal/reviewModal.template.html",
    controller: ["$scope", "$rootScope", "$localStorage", "$interval", "$timeout", "challengeService", "challenge.io.service",
        function ($scope, $rootScope, $localStorage, $interval, $timeout, challengeService, socketService) {
            let self = this;
            $scope.userWord = $scope.$parent.userWord;
            $scope.player = $scope.$parent.player;
            $scope.showOpponent = $scope.$parent.showOpponent;
            $scope.userResult = $scope.$parent.userResult;
            $scope.bot = $scope.$parent.bot;
            $scope.localesMessage = challengeLocales;

            self.flip = function(index, audio, word){
                if($(".end_card[data-item="+index+"]").hasClass('flipCus')){
                    $(".end_card[data-item="+index+"]").removeClass('flipCus');
                }else{
                    playAudio(audio);
                    $(".end_card[data-item="+index+"]").addClass('flipCus');
                    _gaq.push(['_trackEvent', 'WAR_', 'View word', word]);
                }
            };

            function playAudio(audio){
                var audio = new Audio(audio);
                audio.play();
            }

            // báo lỗi từ vựng
            self.survey = true;
            self.disabledSendBtn = true;
            self.showArrowBox = [];
            self.showFeedbackDiv = function(index){
                self.disabledSendBtn = true;
                self.showArrowBox.forEach(function(val,key){
                    if(key != index) self.showArrowBox[key] = false;
                });
                self.showArrowBox[index] = !self.showArrowBox[index];
            };

            self.checkDisable = function(){
                setTimeout(function(){
                    if ($("#challenge_survey_form .challenge_checkbox:checked").length > 0){
                        self.disabledSendBtn = false;
                    }
                    else{
                        self.disabledSendBtn = true;
                    }
                    applyScope($scope);
                }, 300);
            };

            self.sendReport = function(word){
                let content = $('#content_error').prop('checked')? 'Yes' : 'No';
                let image = $('#image').prop('checked')? 'Yes' : 'No';
                let form = {
                    'entry.23121512' : word ? word : 0,
                    'entry.1328524160' : content,
                    'entry.1765249265' : image,
                };
                let url = 'https://docs.google.com/forms/d/1kMxdmoIBoXhONiaSafDHGGNB-k8I5owZ63lpOaTfhYU/formResponse';
                $.ajax({
                    method: 'POST',
                    url: url,
                    data: form
                });

                $('.survey_div').fadeOut(500, function(){
                    $scope.survey = false;
                    applyScope($scope);
                    $('.elight_thank_you').fadeIn(500);
                });
            };
        }]
});
