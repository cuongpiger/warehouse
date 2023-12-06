"use strict";

angular.module("focus.directive", []).directive('focusMe', ["$timeout", "$parse", function ($timeout, $parse) {
  return {
    link: function (scope, element, attrs) {
      //var model = $parse("sample["+attrs.focusMe+"]");
      var model = $parse(attrs.focusMe);
			scope.$watch(model, function (value) {
        if (value === true) {
          $timeout(function () {
            element[0].focus();
          });
        }
      });
      element.bind('blur', function () {
        if (typeof model.assign == 'function') {
          scope.$apply(model.assign(scope, false));
        }
      })
    }
  };
}]);
