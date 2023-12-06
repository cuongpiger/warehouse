'use strict';
angular.module("mainScreen").component("mainScreen", {
  templateUrl: "app/components/mainScreen/mainScreen.template.html",
  controller: ['$scope', '$rootScope', "mainService", "$timeout",
    function ($scope, $rootScope, $service, $timeout) {
      var self = this;
      self.openPractice = function(){
        $timeout(function () {
          $('#practice_btn').click();
        });
        _gaq.push(['_trackEvent', 'EE Features', 'From Main Screen', 'Practice']);
      };

      self.findOppClick = function(opponent){
        $(".main_screen_chal").prop('disabled', true);
        $rootScope.$broadcast("triggerChallengeScreen1", {opponent : opponent});
        _gaq.push(['_trackEvent', 'EE Features', 'From Main Screen', 'War - Normal']);
      };

      if ($rootScope.random == 4) {
        $service.getVideoList().then((data) => {
          self.videoList = data;
          console.log(data);
          $scope.$apply();
        });

        self.goToVideoPage = function (url) {
          _gaq.push(['_trackEvent', 'EE Features', 'VideoLibrary', 'open video link']);
          window.open(url);
        };
      }
    }
  ]
});
