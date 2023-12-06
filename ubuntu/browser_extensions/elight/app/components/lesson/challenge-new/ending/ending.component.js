'use strict';

angular.module("lesson.challenge_new").component("challengeEnding", {
    templateUrl: "app/components/lesson/challenge-new/ending/ending.template.html",
    controller: ["$scope", "$rootScope", "$localStorage", "$interval", "$timeout", "challengeService", "challenge.io.service", "challenge.items.service",
        function ($scope, $rootScope, $localStorage, $interval, $timeout, challengeService, socketService, ChallengeItem) {
            this.challengeItems = ChallengeItem.get();

            let self = this;
            $scope.userWord = $scope.$parent.userWord;
            $scope.player = $scope.$parent.player;
            $scope.showOpponent = $scope.$parent.showOpponent;
            $scope.userResult = $scope.$parent.userResult;
            $scope.bot = $scope.$parent.bot;
            $scope.backScreen = $scope.$parent.backScreen;
            $scope.AI = $scope.$parent.AI;

            $scope.sendRequestRematch = $scope.$parent.sendRequestRematch;
        }]
})
