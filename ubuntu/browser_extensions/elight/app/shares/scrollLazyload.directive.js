"use strict";

angular.module("scrollLazyload.directive", []).directive("scrollLazyload", [function () {
	return {
		restrict: 'A',
		scope : {
			scrollLazyload : "<"
		},
		link : function (scope, element, attrs) {
			element.on("wheel", function (event) {
				if ((element[0].scrollHeight - element[0].scrollTop - element[0].clientHeight) <= 80) {
					scope.scrollLazyload();
				}
			});

			element.on("$destroy", function (event) {
				element.off("wheel");
			})
		}
	}
}])
