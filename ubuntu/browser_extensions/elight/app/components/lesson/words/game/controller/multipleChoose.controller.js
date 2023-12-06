angular.module('lesson.word')
    .controller('multipleChooseController', multipleChooseController);
multipleChooseController.$inject = ['$scope', '$rootScope', '$localStorage'];
function multipleChooseController($scope, $rootScope, $localStorage) {
    var checked = false;
    let times = 0;
    var sound = new Audio($scope.answer.audio);
    $scope.disableButton = false;
    $scope.localesMessage = wordLocales;
    if($scope.template === 'app/components/lesson/words/game/views/choose_picture_3.html'){
        playSound(sound);
    }
    var doItAtFirstTime = true;
    function initScope(){
        $scope.shuffledData = _.shuffle($scope.data);
    }

    function nextStep(){
        checked = false;
        $scope.disableButton = false;
        $scope.$parent.nextStep();
    }

    initScope();

    $scope.$on('chooseAnswer', function (value, key) {
        $('.trigger-click-'+key.key).trigger('click')
    });

    $scope.checkResult = function(val, key){
        times++;
        if(checked) return;
        else {
            $scope.shuffledData[key].checked = true;
            if(val.word == $scope.answer.word){
                checked = true;
                if(doItAtFirstTime) $rootScope.correctAnswer++;
                $scope.disableButton = true;
                var trueAudio = new Audio('assets/audio/true.mp3');
                trueAudio.play();
                setTimeout(function(){
                    nextStep();
                    applyScope($scope);
                }, 1000);
                if (times === 1) {
                    $rootScope.$broadcast('timesCount')
                }
            }
            else {
                var falseAudio = new Audio('assets/audio/fail.mp3');
                falseAudio.play();
                doItAtFirstTime = false;
            }
        }
    };

    function playSound(audio){
        try {
            $scope.playing = true;
            audio.play();

        } catch (e) {
            console.log("Error playing file!");
        }
    };

    $scope.playSound = function(){
        playSound(sound);
    }

    sound.onended = function(){
        $scope.playing = false;
    };
}
