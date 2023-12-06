'use strict';

angular.module("notebook").component("notebook", {
	templateUrl : "app/components/notebook/notebook.template.html",
	controller : ["mainService", "ngAudio", "$rootScope", "$scope", "$timeout", 'wordMemo', "dailyTaskService", "levelExpService","$sce", "$localStorage",
		function notebookController($service, ngAudio, $rootScope, $scope, $timeout, wordMemo, dailyTaskService, levelExpService, $sce, $localStorage) {
			let self = this;
			let newWord;
			self.reminderLoading = false;
			self.noWord = '';
            self.notFound = '';
            let flashCardWordList = [];
            let flashCardWordIndex = 0;
            let unrememberedWord = [];
            let ending = new Audio('assets/audio/ending_sound.wav');
			self.user = $localStorage.auth;
			$(".notebook_btn").click(function () {
				_gaq.push(['_trackEvent', 'EE Features', 'Word Notebook', 'Open Notebook']);
				$("#notebook_modal").modal('show');
				$("#notebook_carousel").carousel(0);
				$(".notebook_btn").css('z-index', 1050);
				self.loading = false;
			});

			$(".yourWord_btn").click(function () {
				_gaq.push(['_trackEvent', 'EE Features', 'Word Notebook', 'Open savedWords']);
				$("#yourWord_modal").modal('show');
				$(".yourWord_btn").css('z-index', 1050);
				$(".word_star").tooltip({show: { effect: "blind", duration: 800 }});
				getReviewInfo();
			});

			$("#notebook_modal").on("hidden.bs.modal", function () {
				$(".notebook_btn").css('z-index', 0);
			});

			$("#yourWord_modal").on("hidden.bs.modal", function () {
				$(".yourWord_btn").css('z-index', 0);
			});

			$(".notebook_btn").tooltip({show: { effect: "blind", duration: 800 }});
			$(".yourWord_btn").tooltip({show: { effect: "blind", duration: 800 }});

			$(".icon_star").popover();
			$(".icon_star").on('shown.bs.popover', function () {
				setTimeout(function () {
					$(".icon_star").popover('hide');
				}, 1000);
			});

            function querySearch() {
                resetStateFeedback();
                self.notFound = '';
                _gaq.push(['_trackEvent', 'EE Features', 'Word Notebook', 'Search']);
                sendGa($localStorage.auth, 'Dictionary', 'Use', 'Dictionary_use');
                newWord = $("#notebook_modal input").val();
                newWord = newWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                newWord = newWord.replace(/đ/g, 'd');
                newWord = newWord.replace(/[^a-zA-Z- ]/g, "");
                if (newWord) {
                    self.loading = true;
                    $("#notebook_modal input").val(newWord);
                    if (!self.searched) {
                        self.searched = true;
                    }
                    $scope.$apply();

                    $service.videoLibraryDictionary(newWord.toLowerCase(), function(res){
                        self.loading = false;
                        if(res.data.code == 1){
                            self.found = true;
                            self.wordData = res.data.data;
                            if(self.wordData.full_text_translated) $scope.full_text_translated = "<div>" +  self.wordData.full_text_translated + "</div>";
                            console.log($scope.full_text_translated);
                            self.wordData.example = self.wordData.example.split('<br>')
                        }
                        else {
                        	self.found = false;
                        	self.notFound = 'Xin lỗi, chúng tôi không tìm thấy từ bạn tìm kiếm.'
						}
                    });
                }
            }

			$("#notebook_modal .search_icon").click(function() {
                querySearch();
                self.searchWord = true;
            });

			$('#notebook_modal .search_input').bind('keyup', function(event) {
				if (event.keyCode === 13) {
					querySearch();
                    self.searchWord = true;
				}
			});

            // CHALLENGE NOTI
            // hiện challenge noti sau đóng modal và đã tra từ + chưa hiện noti trước đó
            $('#notebook_modal').on('hidden.bs.modal', function() {
                if (self.searchWord && !$rootScope.showChallengeNoti) {
                    $timeout($rootScope.checkConditionPushChallengeNoti, 500);
                }
            });

			self.saveWord = function () {
				_gaq.push(['_trackEvent', 'EE Features', 'Word Notebook', 'Save Word']);
				wordMemo.save(newWord.toLowerCase(), self.wordData.translated);
				self.saved = true;
			};

            self.pronounce = function(audio) {
                let pronounce = new Audio(audio);
                pronounce.play();
            };

            $scope.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };

			// NOTE: flash card section
			$rootScope.$on("openFlashCard", function (event, requestedWord) {
				calculateFlashCard(requestedWord);
			});

			self.flip = function (event) {
				_gaq.push(['_trackEvent', 'EE Features', 'Flashcard', 'flip']);
				if ($(".flip_container .flipper").hasClass("flipped")) {
					$(".flip_container .flipper").removeClass("flipped");
					self.flashCardWord.audio.play();
				} else {
					$(".flip_container .flipper").addClass("flipped");
				}
			};

			self.flashCardButton = function(result) {
				if (result === 'remembered') {
					_gaq.push(['_trackEvent', 'EE Features', 'Flashcard', 'remembered']);
					right.pause();
					right.currentTime = 0;
					right.play();
				} else if (result === 'notRemembered') {
					_gaq.push(['_trackEvent', 'EE Features', 'Flashcard', 'unremembered']);
					wrong.pause();
					wrong.currentTime = 0;
					wrong.play();
					unrememberedWord.push(flashCardWordList[flashCardWordIndex - 1]);
				}
				displayFlashCard();
			};

			self.startFlashcard = function (difficult) {
				self.flashCardState = 'test';
				self.reminderLoading = true;
				let wordList = wordMemo.getDesiredDifficult(difficult);
				let promiseArray = [];
				for (let i = 0; i < wordList.length; i++) {
					let getWord = new Promise(function(resolve, reject) {
						if (wordList[i].meaning) {
							$service.queryFirebase(wordList[i].word.toLowerCase(), function (res) {
								resolve(res.data);
							});
						} else {
							let result = angular.copy(_.findWhere(word_day, {content: wordList[i]}));
							result.word = result.content;
							result.translated = result.content_vi;
							delete result.content;
							delete result.content_vi;
							resolve(result);
						}
					});
					promiseArray.push(getWord);
				}
				Promise.all(promiseArray).then((data) => {
					flashCardWordList = _.shuffle(data);
					self.reminderLoading = false;
					displayFlashCard();
					$scope.$apply();
				});
			};


			function calculateFlashCard(requestedWord) {
				flashCardWordList = [];
				flashCardWordIndex = 0;
				unrememberedWord = [];
				if (requestedWord) {
					for (var i = 0; i < requestedWord.length; i++) {
						let flashCardWord = {
							word 				: word_day[requestedWord[i]].content,
							translated  : word_day[requestedWord[i]].content_vi,
							audio 			: word_day[requestedWord[i]].audio,
							phonetic 		: word_day[requestedWord[i]].phonetic
						};
						flashCardWordList.push(flashCardWord);
					}
					self.flashCardState = 'test';
					displayFlashCard();
					$("#flashCard_modal").modal('show');
				} else {
					let wordReview = JSON.parse(localStorage.getItem("wordReview"));
					if (wordReview === null || wordReview === undefined || wordReview.length < 10) {
						self.flashCardState = 'end';
						self.unrememberedWord = [];
						self.ending_message = "Bạn hãy lưu ít nhất 10 từ để ôn bằng Flashcard nhé";
						if ($(".flip_container .flipper").hasClass("flipped")) {
							$(".flip_container .flipper").removeClass("flipped");
						}
						$("#flashCard_modal").modal('show');
					} else {
						self.flashCardState = 'start';
						if ($(".flip_container .flipper").hasClass("flipped")) {
							$(".flip_container .flipper").removeClass("flipped");
						}
						$("#flashCard_modal").modal('show');
					}
				}
			}

			function displayFlashCard() {
				if (flashCardWordIndex >= flashCardWordList.length) {
					if ($(".flip_container .flipper").hasClass("flipped")) {
						$(".flip_container .flipper").removeClass("flipped");
					}
					self.flashCardState = 'end';
					// levelExpService.gainExp("flashcard");
					ending.play();
					if (unrememberedWord.length === 0) {
						self.unrememberedWord = [];
						self.ending_message = "Wow, bạn thật là xuất sắc";
					} else {
						self.unrememberedWord = unrememberedWord;
						self.ending_message = "Đây là những từ bạn chưa nhớ, hãy cố gắng lên nhé"
					}
				} else {
					self.flashCardWord = angular.copy(flashCardWordList[flashCardWordIndex]);
					if (self.flashCardWord.phonetic === null || self.flashCardWord.phonetic === undefined) {
						self.flashCardWord.phonetic = "";
					} else {
						self.flashCardWord.phonetic = "/" + self.flashCardWord.phonetic + "/";
					}
					self.flashCardWord.audio = new Audio(flashCardWordList[flashCardWordIndex].audio);
					self.flashCardWord.audio.play();
					if ($(".flip_container .flipper").hasClass("flipped")) {
						$(".flip_container .flipper").removeClass("flipped");
					}
					flashCardWordIndex++;
				}
			}

			// NOTE: your word section
			function getReviewInfo() {
				self.total = wordMemo.getLength();
				self.easy = wordMemo.getDifficultLength('easy');
				self.medium = wordMemo.getDifficultLength('medium');
				self.hard = wordMemo.getDifficultLength('hard');
				$scope.$apply();
			}

			self.openPractice = function () {
				$timeout(function () {
					$(".practice_btn").trigger('click');
					$("#yourWord_modal").modal('hide');
				})
			};

			let words = JSON.parse(localStorage.getItem('wordReview'));
			self.wordLength = words? words.length:0;
			self.toNewWord = function(){
				$('#flashCard_modal').modal('hide');
				$rootScope.random = 1;
				$rootScope.isLearn_word = true;
				$rootScope.isQuote = false;
                $rootScope.elightube = false;
                $rootScope.topic = false;
			};

			$scope.survey = true;
            $scope.disabledSendBtn = true;
            $scope.checkDisable = function(){
                setTimeout(function(){
                    if ($("#survey_dict_form input:checkbox:checked").length > 0){
                        $scope.disabledSendBtn = false;
                    }
                    else{
                        $scope.disabledSendBtn = true;
                    }
                    applyScope($scope);
                }, 300);
            };
            $scope.showFeedbackDiv = function(){
                $('.dictionary_arrow_box').toggle(300);
            };

            $scope.sendReport = function(){
            	let word = $("#notebook_modal input").val();
                let content = $('#phonetic').prop('checked')? 'Yes' : 'No';
                let translate = $('#translate').prop('checked')? 'Yes' : 'No';
                let translate_yet = $('#translate_yet').prop('checked')? 'Yes' : 'No';
                let form = {
                    'entry.23121512' : word,
                    'entry.1826879993' : content,
                    'entry.1328524160' : translate,
                    'entry.1765249265' : translate_yet,
                };
                let url = 'https://docs.google.com/forms/d/e/1FAIpQLSc75THqvPqI9JC0UPtRqE3ymyTg1sPkRhahuNXR5MLFWc1-RQ/formResponse';
                if(word){
                $.ajax({
    	                method: 'POST',
        	            url: url,
            	        data: form
	                });
                }

                $('.survey_div').fadeOut(500, function(){
                    $scope.survey = false;
                    applyScope($scope);
                    $('.elight_thank_you').fadeIn(500);
                });
            };


            $(document).mouseup(function(e)
            {
                let container = $('.dictionary_arrow_box');

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0 && !$('.dictionary_feedback_icon').is(e.target)) {
                    container.hide();
                }
            });

            function resetStateFeedback(){
                $('.ui_input').attr('checked', false);
                $scope.survey = true;
                $scope.disabledSendBtn = true;
            }
		}
	]
});
