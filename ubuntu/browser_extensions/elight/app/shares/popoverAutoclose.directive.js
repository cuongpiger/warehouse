"use strict";

angular.module('popoverAutoclose.directive', []).directive('popoverAutoclose', ["$timeout", function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function (event) {
        event.stopImmediatePropagation();
        $timeout(function () {
          if (element.next().hasClass('popover')) {
            element.trigger('click');
          }
        }, attrs.popoverAutoclose);
      })
    }
  }
}]);
