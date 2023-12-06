'use strict';

angular.module("offline").component("offline", {
    templateUrl : "app/components/offline/offline.template.html",
    controller : ["$scope", "$rootScope", "$localStorage","$interval", function ($scope, $rootScope, $localStorage, $interval){
        let timer = function(){
            $scope.clock = Date.now();
        };
        timer();
        $interval(timer, 1000);
    }]
});
