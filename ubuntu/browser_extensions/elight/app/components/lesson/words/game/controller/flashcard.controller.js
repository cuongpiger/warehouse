angular.module('lesson.word')
    .controller('flashcardController', flashcardController);
flashcardController.$inject = ['$scope', '$rootScope', '$localStorage' ];
function flashcardController($scope, $rootScope, $localStorage) {
    $scope.flag = false;
    $scope.activeContinue = true;
    $scope.localesMessage = wordLocales;

    var image = new Image();
    $(image).load(function(){
        $('.flashcard_image_cover').hide(50);
    });
    image.src = $scope.data[0] ? $scope.data[0].image : "";
    function resetState(){
        $scope.flag = false;
        $scope.flipped = false;
        $('.show_back').hide();
        $('.not_show_back').show();
        if ($(".topic_flashcard_container").hasClass("flipped")) {
            $(".topic_flashcard_container").removeClass("flipped");
        }
    }

    function playBackgroundAudio(){
        if(!$rootScope.backgroundMusic || $rootScope.backgroundMusic == ''){
            $rootScope.backgroundMusic = 'assets/audio/learn_word/background.mp3';
        }
        else return;
    }
    $scope.classAudio = 'fa-play';
    $scope.playAudio = function() {
        $scope.classAudio = 'fa-pause';
        var audio = new Audio($scope.data[0].audio);
        audio.onended = function() {
            $scope.classAudio = 'fa-play';
            applyScope($scope);
        };
        audio.play();
    };
    $scope.$on('flipCard', function () {
        $scope.flip();
    });

    $scope.flip = function (action) {
        playBackgroundAudio();
        sendGa($localStorage.auth, 'Learn word', 'Use', 'Learn_use');
        if(action === 'button'){
            var buttonAudio = new Audio('assets/audio/learn_word/btn_push.mp3');
            buttonAudio.volume = 0.2;
            buttonAudio.play();
        }
        var flip = new Audio('assets/audio/learn_word/flip.mp3');
        flip.volume = 0.2;
        flip.play();
        if($scope.template === 'app/components/lesson/words/game/views/flashcard.html' && !$scope.flag){
            $scope.flag = true;
                setTimeout(function () {
                $scope.flag = false;
                applyScope($scope);
            }, 500);
            _gaq.push(['_trackEvent', 'EE Features', 'Topics', 'flipFlashcard']);
            $('.show_back').show();
            $('.not_show_back').hide();
            var text_guide = $('.guide-text-flip');
            var topic_flashcard_container = $(".topic_flashcard_container");
            if (topic_flashcard_container.hasClass("flipped")) {
                text_guide.html('Ấn [dấu cách] để lật card');
                $scope.flipped = false;
                $scope.activeContinue = false;

                topic_flashcard_container.removeClass("flipped guide_flip ");
            } else {
                $scope.flipped = true;
                text_guide.html('Ấn [ENTER] để tiếp tục');
                var audio = new Audio($scope.data[0].audio);
                audio.onended = function() {
                    $scope.activeContinue = false;
                    applyScope($scope);
                };
                audio.play();

                topic_flashcard_container.addClass("flipped");
                topic_flashcard_container.removeClass("guide_flip");
            }
        } else {
            $scope.activeContinue = false;
            return;
        }
    };
    $scope.$on('checkEnter', function () {
        if (!$scope.activeContinue) {
            $scope.activeContinue = true;
            $scope.nextStep();
        }
    });
    $scope.nextStep = function(){
        $rootScope.correctAnswer++;
        $rootScope.$broadcast('timesCount');
        $scope.activeContinue = true;
        playBackgroundAudio();
        var text_guide = $('.guide-text-flip');
        text_guide.html('Ấn [dấu cách] để lật card');
        var trueAudio = new Audio('assets/audio/true.mp3');
        trueAudio.play();
        resetState();
        $scope.$parent.nextStep();
        applyScope($scope);
    }
}