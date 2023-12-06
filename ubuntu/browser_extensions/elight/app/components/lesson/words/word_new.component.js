'use strict';

angular.module("lesson.word").component("word", {
    templateUrl : 'app/components/lesson/words/word_new.template.html',
    bindings		:	{
        sampleNumber	:	'='
    },
    controller	: wordController
});
wordController.$inject = ['$rootScope', '$scope', '$localStorage', 'wordMemo', '$timeout', 'streakService', 'preloadService'];
function wordController ($rootScope, $scope, $localStorage, wordMemo, $timeout, streakService, preloadService) {
    /**
     * Define Variable
     */

    let self            = this;
    self.localesMessage = wordLocales;
    // let user            = $localStorage.auth;
    let unitIndex       = $localStorage.unitSettingSelected ? $localStorage.unitSettingSelected : ($localStorage.unit && $localStorage.unit.length > 0 ? $localStorage.unit : [0]);
    let allWords = [];
    let wordReviews     = $localStorage.wordReview;
    let titleUnit       = "";
    let wordConfig      = {
        numberOfWords : 3,
        step : 7,
        fadeTimeAudio : 1000
    };
    $rootScope.timesCorrect = 0;
    let today           = new Date();
    self.endingWords    = $localStorage.learnedWord;
    $scope.disabledSend   = true;
    $scope.survey         = true;
    $rootScope.correctAnswer = 0;
    let steps = [];
    sendGa($localStorage.auth, 'Learn word', 'Display', 'Learn_display');
    /**
     * TODO Check and Update UnitId for WordReviews
     *
     */

    function checkUpdateUnitId () {

        if (!$localStorage.wordReview && localStorage.wordReview) {
            $localStorage.wordReview = angular.copy(JSON.parse(localStorage.wordReview));
        }
        updateUnitIdForWordReviews();

    }

    function updateUnitIdForWordReviews() {
        let listWords = [];
        let unitConcat = $rootScope.language === 'vn' ? units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit) : units;
        _.map(unitConcat, function (value) {
            _.map(value.words, function (word) {
                word.unitId = value.id;
                listWords.push({unitId: value.id, word: word.word});
            });
        });
        _.map($localStorage.wordReview, function (value) {
            let word = _.find(listWords, function(wordFind){ return value.word === wordFind.word });
            if (word) {
                return value.unitId = word.unitId
            }
        })
    }

    $rootScope.$on('timesCount', function () {
        $rootScope.timesCorrect++;
    });

    $rootScope.$on("updateLearnWord", function (event) {
        $localStorage.preloadWords = undefined;
        let learnedWord = $localStorage.learnedWord;
        $localStorage.learnedWord = undefined;
        defineVariable();
        conditionRandomWord();
        $localStorage.learnedWord = learnedWord;
    });

    $rootScope.$on("reinit", function(){
        $localStorage.preloadWords = [];
        $localStorage.selectedUnits = {};
        unitIndex = $localStorage.unitSettingSelected ? $localStorage.unitSettingSelected : ($localStorage.unit && $localStorage.unit.length > 0 ? $localStorage.unit : [0]);
        checkUpdateUnitId();
        syncWord($localStorage.wordReview);
        initGame();
    });

    function defineVariable() {
        if($localStorage.usedDate && $localStorage.usedDate !== today.getDate()){
            $localStorage.learnedWord = [];
        }
        //define background music volume
        if($localStorage.volume >= 0){
            $rootScope.volume = $localStorage.volume;
        }
        else {
            $localStorage.volume = 1;
            $rootScope.volume = 1;
        }
        $('#background_music').animate({volume : $localStorage.volume}, 1000);
    }
    function conditionRandomWord() {
        let count = localStorage.getItem('count');
        const indexArr = _.isEmpty(count) ? [91] : unitIndex;
        localStorage.setItem('count', JSON.stringify([1]));

        // Random Unit and getAll words Information Unit
        self.unitId = _.sample(indexArr);
        let unitConcat = $rootScope.language === 'vn' ? units.concat(toeicUnits).concat(grammarUnits).concat(communicationUnit) : units;
        let unit    =  _.find(unitConcat, function(value) { return value.id === self.unitId ;});
        allWords    = unit ? unit.words : [];
        titleUnit   = unit ? unit.title : '';
        let wordReviews     = $localStorage.wordReview;
        // classify list new word and old word
        let oldWordByUnitId = _.filter(wordReviews, function (value) {
            return value.unitId === self.unitId;
        });
        oldWordByUnitId = _.sortBy(oldWordByUnitId, function (event) {
            return new Date(event.reviewDate);
        });

        // if number of old word >= 20 => use 1 new word : 2 old words in unit learn max 5 new words
        if (oldWordByUnitId.length >= 20) {
            let numberWordOnDay = conditionNumberWordOnDay(unit.id);
            if (numberWordOnDay > 5) {
                getWordPractice(0, 3, oldWordByUnitId);
            } else {
                getWordPractice(1, 2, oldWordByUnitId);
            }
       } else {
            //allway show new word
            getWordPractice(3, 0, oldWordByUnitId);
       }

        // cần sử lý trường hợp với user mở hết khóa mới cài extension không thể tối đa 20 từ được
        // có thể phải xử lý case khi 20 từ của 1 unit  thì mới luyện tập theo công thức
    }
    function getWordPractice(numberNew, numberOld,  oldWordByUnitId) {
        self.game = true;
        self.ending = false;
        self.topic_show = 0;
        self.main_box = true;
        $rootScope.checkLogin = false;
        let wordNeedPracticeFullInfor = [];
        let allWordsTemp     = _.pluck(allWords, 'word').map(v => v.toLowerCase());
        let oldWordsTemp    = _.pluck(oldWordByUnitId, 'word').map(v => v.toLowerCase());
        let newWordsTemp    = _.difference(allWordsTemp, oldWordsTemp);
        // New word
        let selectedNew     = _.sample(newWordsTemp, numberNew);
        _.map(selectedNew, function (value) {
            let find = _.find(allWords, function (information) { return information.word.toLowerCase() === value.toLowerCase() });
            if (find) {
                find.old = false;
                wordNeedPracticeFullInfor.push(find)
            }
        });
        // Old Word condition when not getting anything from newWordsTemp then get 3 words from oldWord
        if (selectedNew.length === 0) {
            numberOld = numberOld + numberNew
        } else if (selectedNew.length < 3) {
            numberOld = 3 - selectedNew.length;
        }
        let selectedOld = oldWordsTemp.slice(0, 10); // lấy 10 từ cần luyện tập th1: có thể đã để ngày hoặc qua ngày luyện tập, th2 ngày cần phải luyện tập gần nhất
        selectedOld = _.sample(selectedOld, numberOld); // random ra số lượng cần thiết trong đống 10 từ cần luyện tập
        _.map(selectedOld, function (value) {
            let find = _.find(allWords, function (information) { return information.word.toLowerCase() === value.toLowerCase() });
            if (find) {
                find.old = true;
                wordNeedPracticeFullInfor.push(find)
            }
        });

        if ($localStorage.preloadWords && $localStorage.preloadWords.length === 3) {
            $localStorage.learnedWord = $localStorage.preloadWords;
            let getJustWord = _.pluck( $localStorage.preloadWords, 'word').map(v => v.toLowerCase());
            getDataPreLoad(numberNew, numberOld, oldWordByUnitId, getJustWord)
        } else {
            $localStorage.learnedWord = _.shuffle(wordNeedPracticeFullInfor);
            let getJustWord = _.pluck(wordNeedPracticeFullInfor, 'word').map(v => v.toLowerCase());
            getDataPreLoad(numberNew, numberOld, oldWordByUnitId, getJustWord)
        }
        let current_word = _.pluck( $localStorage.learnedWord, 'word').map(v => v.toLowerCase());
        let wordNewStep = _.difference(current_word, oldWordsTemp);
        $localStorage.selectedUnit = {total :allWords.length, image: allWords[0].image,  new_learn : wordNewStep.length, title : titleUnit, newWord: newWordsTemp.length };
    }
    function getDataPreLoad (numberNew, numberOld,  oldWordByUnitId, except) {

        let wordNeedPracticeFullInfor = [];
        let allWordsTemp    = _.pluck(allWords, 'word').map(v => v.toLowerCase());
        allWordsTemp        = _.difference(allWordsTemp, except); // lấy data khác với data cần loại bỏ except

        let oldWordsTemp    = _.pluck(oldWordByUnitId, 'word').map(v => v.toLowerCase());
        oldWordsTemp        = _.difference(oldWordsTemp, except); // lấy data khác với data cần loại bỏ except

        let newWordsTemp    = _.difference(allWordsTemp, oldWordsTemp);

        // New word
        let selectedNew     = _.sample(newWordsTemp, numberNew);
        _.map(selectedNew, function (value) {
            let find = _.find(allWords, function (information) { return information.word.toLowerCase() === value.toLowerCase() });
            if (find) {
                find.old = false;
                wordNeedPracticeFullInfor.push(find)
            }
        });
        // Old Word condition when not getting anything from newWordsTemp then get 3 words from oldWord
        if (selectedNew.length === 0) {
            numberOld = numberOld + numberNew
        }
        let selectedOld = oldWordsTemp.slice(0, 10); // lấy 10 từ cần luyện tập th1: có thể đã để ngày hoặc qua ngày luyện tập, th2 ngày cần phải luyện tập gần nhất
        selectedOld = _.sample(selectedOld, numberOld); // random ra số lượng cần thiết trong đống 10 từ cần luyện tập
        _.map(selectedOld, function (value) {
            let find = _.find(allWords, function (information) { return information.word.toLowerCase() === value.toLowerCase() });
            if (find) {
                find.old = true;
                wordNeedPracticeFullInfor.push(find)
            }
        });
        let images = _.pluck(wordNeedPracticeFullInfor, 'image');
        preloadService.preloadImages(images);
        let audios = _.pluck(wordNeedPracticeFullInfor, 'audio');
        preloadService.preloadAudios(audios);
        $localStorage.preloadWords = _.shuffle(wordNeedPracticeFullInfor);
    }
    function initStep() {
        steps = [
            {
                template : 'app/components/lesson/words/game/views/flashcard.html',
                data : [$localStorage.learnedWord[0]]
            },
            {
                template : 'app/components/lesson/words/game/views/flashcard.html',
                data : [$localStorage.learnedWord[1]]
            },
            {
                template : 'app/components/lesson/words/game/views/choose_word.html',
                data : [$localStorage.learnedWord[0], $localStorage.learnedWord[1]],
                answer : $localStorage.learnedWord[0]
            },
            {
                template : 'app/components/lesson/words/game/views/choose_picture_3.html',
                data : $localStorage.learnedWord,
                answer : $localStorage.learnedWord[1]
            },
            {
                template : 'app/components/lesson/words/game/views/flashcard.html',
                data : [$localStorage.learnedWord[2]]
            },
            {
                template : 'app/components/lesson/words/game/views/choose_picture_3.html',
                data : $localStorage.learnedWord,
                answer : $localStorage.learnedWord[0]
            },
            {
                template : 'app/components/lesson/words/game/views/choose_word.html',
                data : [$localStorage.learnedWord[1], (Math.floor(Math.random()*2 + 1) == 2) ? $localStorage.learnedWord[0] : $localStorage.learnedWord[2]],
                answer: $localStorage.learnedWord[1]
            },
            {
                template : 'app/components/lesson/words/game/views/choose_picture_3.html',
                data : $localStorage.learnedWord,
                answer : $localStorage.learnedWord[2]
            }
        ];
    }
    /**
     *
     * @param unitId
     * @returns {number}
     */
    function conditionNumberWordOnDay(unitId) {
        let currentDateStorage = $localStorage.currentDate;
        let currentDateByUnit;
        if (!currentDateStorage) {
            $localStorage.currentDate = { data: [], version: 1 }; //version for after change structure
            currentDateByUnit = {
                date : new Date().toISOString().slice(0,10),
                num: 0,
                unit: unitId
            };
            $localStorage.currentDate.data.push(currentDateByUnit)
        } else {
            let findByUnit = _.find(currentDateStorage.data, function (value) {
               return  value.unit === unitId;
            });
            if (findByUnit) {
                let currentDate = new Date(new Date().toISOString().slice(0,10)) - new Date(findByUnit  .date);
                let dayNumber = currentDate /1000 /60 /60 /24;
                if (dayNumber >= 1) {
                    findByUnit = {
                        date : new Date().toISOString().slice(0,10),
                        num: 0,
                        unit: unitId
                    };
                } else {
                    findByUnit.num++;
                }
                currentDateByUnit = findByUnit

            } else {
                currentDateByUnit = {
                    date : new Date().toISOString().slice(0,10),
                    num: 0,
                    unit: unitId
                };
                $localStorage.currentDate.data.push(currentDateByUnit)
            }
        }
        return currentDateByUnit.num;
    }

    $scope.nextStep = function (){
        $scope.survey = true;
        $scope.disabledSend = true;
        _gaq.push(['_trackEvent', 'EE Features', 'Topics', 'Step']);
        $rootScope.progress++;
        //if the variable progress is bigger than steps, finish.
        if($rootScope.progress > wordConfig.step){
            self.finishGame();
        }
        else {
            //re-init data, template and answer from the steps variable above.
            self.data = steps[$rootScope.progress].data;
            self.answer = steps[$rootScope.progress].answer;
            $rootScope.template = steps[$rootScope.progress].template;
            //re-init $scope.data to clear checked property.
            _.each(self.data, function(val, key){
                if(val.checked) self.data[key].checked = false;
            });
        }
    };
    $scope.nextGame = function(){
        //re-init all variables, reset progress and fade in background music.
        if($rootScope.backgroundMusic && !$rootScope.checkLogin ){
            $('#background_music').animate({volume : $localStorage.volume }, wordConfig.fadeTimeAudio);
        }
        $('.arrow_box').hide(200);
        $rootScope.progress = 0;
        $rootScope.correctAnswer = 0;
        resetStateAndVariable();

    };
    self.finishGame = function () {
        // update word and save word
        sendGa($localStorage.auth, 'Learn word', 'Completed', 'Learn_completed game');
        $('.class-word').hide();
        saveWords();
        $localStorage.learned = true;
        self.endingWords = $localStorage.learnedWord;
        $localStorage.learnedWord = [];
        $localStorage.updatedWord = [];
        if($rootScope.backgroundMusic && $localStorage.volume == 1){
            $('#background_music').animate({volume : 0.4}, wordConfig.fadeTimeAudio);
        }
        // CHALLENGE NOTI
        if (!$rootScope.showChallengeNoti) {
            $timeout($rootScope.checkConditionPushChallengeNoti, 1000);
        }
        self.game = false;
        self.ending = true;
    };
    self.startGame = function () {
        $rootScope.progress = 0;
        self.data = steps[$rootScope.progress].data;
        $rootScope.template = steps[$rootScope.progress].template;
    };
    function resetStateAndVariable () {
        $('.ui_input').attr('checked', false);
        $scope.survey = true;
        $scope.disabledSend = true;
        initGame();
    }

    /**
     * TODO Code Javascript
     */

    $(document).mouseup(function(e) {
        let container = $('.arrow_box');

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 && !$('.feedback_icon').is(e.target)) {
            container.hide();
        }
    });
    self.showFeedbackDiv = function(){
        $('.arrow_box').toggle(300);
    };
    self.checkDisable = function(){
        let surveyLength = $("#survey_form input:checkbox:checked").length;
        setTimeout(function(){
            if (surveyLength.length > 0){
                $scope.disabledSend = false;
            } else{
                $scope.disabledSend = true;
            }
        }, 300);
    };
    self.calculatePercent = function(a, b) {
        return Math.floor(a / b * 100) + '%';
    };
    self.toggleVolume = function(){
        if(typeof($localStorage.volume) === 'undefined'){
            $localStorage.volume = 1;
            $rootScope.volume = 1;
            $('#background_music').animate({volume : $localStorage.volume}, 500);
        }
        else {
            $localStorage.volume = ($localStorage.volume == 0) ? 1 : 0;
            $rootScope.volume = $localStorage.volume;
            $('#background_music').animate({volume : $localStorage.volume}, 500);
        }
    };

    function saveWords(){
        //save new words to notebook.
        wordMemo.storeWord($localStorage.learnedWord)
            .then(function (response) {
                syncWord(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        if (!$localStorage.syncWord) {
            syncWord($localStorage.wordReview);
            $localStorage.syncWord = true;
        }

    }

    function syncWord(words) {
        let auth = $localStorage.auth;
        if (auth && auth.user_token) {
            let word_convert = [];
            _.map(words, function (value) {
                word_convert.push({w : value.word, e: value.EF, i: value.I, a: value.Q, rd: value.reviewDate})
            });
            wordMemo.syncWords(auth.user_token, word_convert);
        }
    }

    /**
     * TODO send report error when practice word
     */

    $scope.sendReport = function(){
        $('.survey_div').fadeOut(500, function(){
            $scope.survey = false;
            $('.elight_thank_you').fadeIn(500);
        });
        let content = $('#content_error').prop('checked')? 'Yes' : 'No';
        let image = $('#image').prop('checked')? 'Yes' : 'No';
        let form = {
            'entry.23121512' : self.data[0] ? self.data[0].word : 0,
            'entry.1328524160' : content,
            'entry.1765249265' : image,
        };
        let url = 'https://docs.google.com/forms/d/1kMxdmoIBoXhONiaSafDHGGNB-k8I5owZ63lpOaTfhYU/formResponse';
        $.ajax({
            method: 'POST',
            url: url,
            data: form
        });
    };

    /**
     * TODO Start Run Functions
     */
    checkUpdateUnitId();
    function initGame () {
        defineVariable();
        conditionRandomWord();
        initStep();
        self.startGame();
    }
    initGame();

    // End Run Functions
}
