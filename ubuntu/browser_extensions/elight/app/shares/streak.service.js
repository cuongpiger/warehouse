"use strict";

angular.module("streak.service", []).service("streakService", ["$localStorage","$rootScope",
	function streakService($localStorage , $rootScope) {
		let service = {};

		service.getStreak = () => (!$localStorage.streak || isStreakBroken()) ? resetStreak() : angular.copy($localStorage.streak);

		service.getStreakData = (day) => {
			var n = 0, i = 0;
			while (n <= day) {
				n += ++i;
			}
			var obj = streak_data[$rootScope.language].filter((item) => item.day == day)[0];
			obj.info = isTodayStreakFinished() ? obj.info_after : obj.info_before;
			obj.max = n;
			return angular.copy(obj);
		};

		service.increaseStreak = () => isTodayStreakFinished() ? false : increaseStreak();

		function resetStreak() {
			var time = new Date();
			time = time.setHours(-24, 0, 0, 0);
			$localStorage.streak = {day: 0, update: time};
			return angular.copy($localStorage.streak);
		}

		function isStreakBroken() {
			let isStreakBroken = false;
			if (Date.now() - $localStorage.streak.update >= 2 * 86400000) {
                isStreakBroken = true;
			}
            return isStreakBroken;
		}

		function isTodayStreakFinished() {
			if ($localStorage.streak) {
                if (Date.now() - $localStorage.streak.update >= 86400000) {
                    return false;
                } else {
                    return true;
                }
			} else {
                return true;
			}

		}

		function increaseStreak() {
			$localStorage.streak.day++;
			$localStorage.streak.update = (new Date()).setHours(0, 0, 0, 0);
			return {
				old : $localStorage.streak.day - 1,
				new : $localStorage.streak.day,
				update : $localStorage.streak.update,
			}
		}

		return service;
	}
]);
