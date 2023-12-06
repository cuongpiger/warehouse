'use strict';

angular.module("lesson.word")
    .component("streak", {
        templateUrl : 'app/components/lesson/streak/streak.template.html',
        controller	: streakController,
    });
streakController.$inject = ['$rootScope', '$scope', '$localStorage', 'streakService', '$timeout'];
function streakController ($rootScope, $scope, $localStorage, streakService, $timeout) {
    /**
     * TODO define StreakDay
     *
     */
    var self = this;
    var scopeStreakEventHandlers = [];

    self.streak         = $localStorage.streak;
    self.streak = streakService.getStreak();

    self.streak_text = self.streak.day;

    if (self.streak_text >= 2 && !$localStorage.streak.status) {
        $localStorage.streak.status = true;
        sendGa($localStorage.auth, 'Streak day', 'Use', '_Streakday');
    }

    self.streakData = streakService.getStreakData(self.streak.day);
    self.animationDuration = 800;
    self.todayStreak = isTodayStreakFinished();
    self.auth = $localStorage.auth;
    $rootScope.$on("today_streak_completed--start", function (event) {
        let handler = $scope.$on("today_streak_completed--new_tree--start", function (event) {
            self.animationDuration = 0;
            self.streak.day = 0;
            $(".word_tree_image").fadeOut(100);
            $timeout(function () {
                self.streakData = {};
            }, 100);

            let handler2 = $rootScope.$on("today_streak_completed--new_tree--end", function (event) {
                self.animationDuration = 800;
                self.todayStreak = true;
                $timeout(() => {
                    self.streak = streakService.getStreak();
                    self.streak_text = self.streak.day;
                    self.streakData = streakService.getStreakData(self.streak.day);
                    $(".word_tree_image").fadeIn(500);
                }, 100)
            });
            scopeStreakEventHandlers.push(handler2);
        });

        scopeStreakEventHandlers.push(handler)
    });

    self.$onDestroy = function () {
        scopeStreakEventHandlers.map(function (item) {
            item();
        });
    };

    self.toLearningWord = function(){
        $rootScope.random = 1;
        $rootScope.isLearn_word = true;
        $rootScope.isQuote = false;
        $rootScope.elightube = false;
        $rootScope.topic = false;
    };

    $rootScope.$on("today_streak_completed--old_tree", function (event) {
        self.streak = streakService.getStreak();
        self.todayStreak = true;
        self.streak_text = self.streak.day;
        self.streakData = streakService.getStreakData(self.streak.day);
    });

    function isTodayStreakFinished() {
        if(!$localStorage.streak) return false;
        else {
            if (Date.now() - $localStorage.streak.update >= 86400000) {
                return false;
            } else {
                return true;
            }
        }
    }

    let index = 0;
    function carousel() {
      const ele = document.getElementsByClassName("streak-slide");
      for (let i = 0; i < ele.length; i++) {
        ele[i].style.display = 'none';
      }
      index++;
      if (index > ele.length) {index = 1}
      ele[index-1].style.display = 'block';
      setTimeout(carousel, 10000);
    }
    carousel();
}
