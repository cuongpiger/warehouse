"use strict";

angular.module("interpolate.filter", []).filter("interpolate", ["$interpolate",
	function interpolateFilter($interpolate) {
		return function (input, scope) {
			return $interpolate(input)(scope);
		}
	}
])
