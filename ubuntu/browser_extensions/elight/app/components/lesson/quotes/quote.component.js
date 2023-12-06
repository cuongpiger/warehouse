'use strict';

angular.module("lesson.quote").component("quote", {
  templateUrl: 'app/components/lesson/quotes/quote.template.html',
  bindings: {
      sampleQuote: '='
  },
  controller: ["dailyTaskService", "levelExpService", "mainService", "$rootScope", "$scope", "$timeout", "$localStorage","$sce",
    function quoteController(dailyTaskService, levelExpService, $service, $rootScope, $scope, $timeout, $localStorage, $sce) {
      var self = this;
      let bubbleSound = new Audio("assets/audio/fork_media_cartoon_bubbles_bubbling.mp3");
      var nextQuote = 0;
      var isVip = false;
        if ($localStorage.auth && ($localStorage.auth.actived_code.new_code > 0 || $localStorage.auth.actived_code.count_use_code > 0 || $localStorage.auth.actived_code.count_user_courses > 0)) {
            isVip = true;
        }
      sendGa($localStorage.auth, 'Quotation', 'Display', 'Quotation_display');
      this.$onInit = function () {
        let likedQuote = JSON.parse(localStorage.getItem('likedQuote'));

        let init = function() {
            if (!$localStorage.showHint) {
                $localStorage.timeNotShowNewsline = 1;
                guideLine();
                $localStorage.showHint = true;
            }
            getQuotes();
        };
        init();

        $rootScope.$on('reinit-quote', function(){
           getQuotes($rootScope.quoteCategory);
        });

        function getQuotes(quoteCategory) {
            let currentDate = new Date().setHours(0, 0, 0, 0);
            let lastTimeUpdateQuotation = $localStorage.lastTimeUpdateQuotation !== null ? $localStorage.lastTimeUpdateQuotation : new Date().setHours(0, 0, 0, 0);
            let days = (currentDate - lastTimeUpdateQuotation) / 86400000;

            if (days >= 1 || !$localStorage.quotes || $localStorage.quotes.length === 0) {
                $localStorage.quotes = [];
                $service.getQuotes(function(res) {
                    $localStorage.quotes = res.data;
                        let quotes = _.filter($localStorage.quotes, function(item) {
                            return item.category !== 'newsline-v1';
                        });
                        $localStorage.lastTimeUpdateQuotation = new Date().setHours(0, 0, 0, 0);

                        let quotesDisplayed = JSON.parse(localStorage.getItem('_qd'));
                        let quoteGroup = randomCategory(quotes, quotesDisplayed, quoteCategory);
                        self.quoteGroup = quoteGroup;
                        self.quote = showOneQuote(quoteGroup.quotes, quoteGroup.category);
                        self.heart_quote = checkLikedQuote(self.quote.id);
                });
            }else {
                let quotes = _.filter($localStorage.quotes, function(item) {
                    return item.category !== 'newsline-v1';
                });
                let quotesDisplayed = JSON.parse(localStorage.getItem('_qd'));
                let quoteGroup = randomCategory(quotes, quotesDisplayed, quoteCategory);
                self.quoteGroup = quoteGroup;
                self.quote = showOneQuote(quoteGroup.quotes, quoteGroup.category);
                self.heart_quote = checkLikedQuote(self.quote.id);
            }
        }

        function randomCategory(quoteGroupArray, quotesDisplayed, quoteCategory) {
            if(!quoteCategory){
                return _.sample(quoteGroupArray);
            }
            else {
                return _.findWhere(quoteGroupArray, {category : quoteCategory});
            }
        }

        function showOneQuote(quotesArray, category) {
            var _qd, quote;
            let isDisplay = JSON.parse(localStorage.getItem('_qd'));
            if (isDisplay) {
                if (isDisplay[category] != undefined) {
                    var lastQuote = isDisplay[category].length;
                    if (lastQuote >= quotesArray.length) {
                        isDisplay[category] = [];
                        if (category == 'newsline-v1') {
                            lastQuote = 0;
                            quote = quotesArray[lastQuote];
                            isDisplay[category].push(quote.id);
                            localStorage.setItem('_qd', JSON.stringify(isDisplay));
                            self.heart_quote = checkLikedQuote(quote.id);
                        }else {
                            localStorage.setItem('_qd', JSON.stringify(isDisplay));
                            let quotes = _.filter($localStorage.quotes, function(item) {
                                return item.category !== 'newsline-v1';
                            });
                            var newQuoteGroup = _.sample(quotes);
                            self.quoteGroup = newQuoteGroup;
                            quote = showOneQuote(newQuoteGroup.quotes, newQuoteGroup.category);
                        }
                    }else {
                        quote = quotesArray[lastQuote];
                        isDisplay[category].push(quote.id);
                        localStorage.setItem('_qd', JSON.stringify(isDisplay));
                        self.heart_quote = checkLikedQuote(quote.id);
                    }
                } else {
                    quote = chooseFirstQuote(quotesArray, category);
                    self.heart_quote = checkLikedQuote(quote.id);
                }
            }else {
                quote = chooseFirstQuote(quotesArray, category);
                self.heart_quote = checkLikedQuote(quote.id);
            }

            return quote;
        }

        function chooseFirstQuote(quotesArray, category) {
            var _isqd = quotesArray[0];
            var new_local = {};
            let isDisplay = JSON.parse(localStorage.getItem('_qd'));
            if (isDisplay) {
                new_local = isDisplay;
            }
            new_local[category] = [];
            new_local[category].push(_isqd.id);
            localStorage.setItem('_qd', JSON.stringify(new_local));
            return _isqd;
        }

        function checkLikedQuote(quoteId) {
            if (likedQuote === null || likedQuote === undefined) {
                likedQuote = [];
            //   self.heart_quote = false;
                return false;
            } else {
              if (likedQuote.indexOf(quoteId) !== -1) {
                // self.heart_quote = true;
                return true;
              } else {
                // self.heart_quote = false;
                return false;
              }
            }
        }

        function guideLine() {
            var enjoyhint_instance = new EnjoyHint({
                onEnd:function(){
                    $("body").css({overflow: 'hidden'});
                },
                onSkip:function(){
                    $("body").css({overflow: 'hidden    '});
                }
            });
            var enjoyhint_script_steps = [{
                'next .btn_translate' : 'Nhấn và giữ để dịch cả câu',
                showSkip: false
            }, {
                'next .eng_word' : 'Click vào từ để dịch từ',
                showSkip: false
            }, {
                'next .btn_like' : 'Thả tim cho quote',
                showSkip: false
            }, {
                'next .btn_learn' : 'Xem thêm câu mới',
                showSkip: false
            }];

            enjoyhint_instance.set(enjoyhint_script_steps);
            enjoyhint_instance.run();
        }

        self.translateWord = function($event, word) {
            resetStateFeedback();
            self.showWordTranslated = true;
            self.searching = true;
            self.wordLeftPos = $event.pageX;
            self.wordTopPos = $event.pageY - 220;
            word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            word = word.replace(/đ/g, 'd');
            word = word.replace(/[^a-zA-Z ]/g, "");
            self.wordBeingTranslated = word;
            sendGa($localStorage.auth, 'Quotation', 'Use', 'Quotation_use');
            $service.videoLibraryDictionary(word.toLowerCase(), function(res) {
                self.searching = false;
                if(res.data.code == 1){
                    self.wordData = res.data.data;
                    self.wordData.example = self.wordData.example.split('<br>');
                    self.wordData.full_text_translated =  self.wordData.full_text_translated? "<div>" + self.wordData.full_text_translated + "</div>" : "";
                    self.found = true;
                }
                else {
                    self.wordData = '';
                    self.found = false
                }

                _gaq.push(['_trackEvent', 'quote', 'translateWord', '']);

                // CHALLENGE NOTI
                if (!$rootScope.showChallengeNoti) {
                    $timeout($rootScope.checkConditionPushChallengeNoti, 500);
                }
            });
        };

        $('html').click(function(e) {
          // toggel drop menu
          if (e.target.className === 'eng_word') {
            self.showWordTranslated = true;
          }

          // close drop menu to when click out of it
          if (!$(e.target).closest('.quote').length) {
            $(".vi_word_modal").hide();
            self.showWordTranslated = false;
          }
        });

        self.trustAsHtml = function(value){
            return $sce.trustAsHtml(value);
        };

        self.translate = function() {
            self.showQuoteVi = true;
            _gaq.push(['_trackEvent', 'quote', 'translateSentence', '']);

            // CHALLENGE NOTI
            if (!$rootScope.showChallengeNoti) {
                $timeout($rootScope.checkConditionPushChallengeNoti, 500);
            }
        };

        self.cancelTranslate = function() {
            self.showQuoteVi = false;
        };

        $('.btn_translate').mouseout(function() {
            self.showQuoteVi = false;
        });

        self.pronounce = function(audio) {
            let pronounce = new Audio(audio);
            pronounce.play();
        };

        self.learnWord = function(){
            // self.heart_quote = false;
            $rootScope.random = 1;
            $rootScope.isLearn_word = false;
            $rootScope.isQuote = true;
            $rootScope.elightube = false;
            $rootScope.topic = false;
            $rootScope.isSearch = false;
            $rootScope.isIdioms = false;
            $rootScope.isCollocation = false;
            $rootScope.isGrammar = false;
            nextQuote++;
            applyScope($scope);
            if(isVip) self.quote = showOneQuote(self.quoteGroup.quotes, self.quoteGroup.category);
            else {
                if(nextQuote != 3) {
                    self.quote = showOneQuote(self.quoteGroup.quotes, self.quoteGroup.category);
                }
                else {
                    if(self.quoteGroup.category == 'newsline-v1'){
                        self.quote = {
                            "content" : "Ngày 05/12 Elight chào mừng học viên thứ 40.000. Trở thành học viên VIP để trải nghiệm ứng dụng học tiếng Anh siêu hấp dẫn tại đây: <a href='https://elight.edu.vn/khoa-toan-dien-3-trong-1-trial-extension/?utm_source=Extension&utm_medium=newsline' target='_blank'>'http://bit.ly/HocvienVIP'</a>",
                            "content_vi" : "Ngày 05/12 Elight chào mừng học viên thứ 40.000. Trở thành học viên VIP để trải nghiệm ứng dụng học tiếng Anh siêu hấp dẫn tại đây: <a href='https://elight.edu.vn/khoa-toan-dien-3-trong-1-trial-extension/?utm_source=Extension&utm_medium=newsline' target='_blank'>http://bit.ly/HocvienVIP</a>",
                            "id" : "0",
                            "tag" : "newsline",
                            "type" : "marketing"
                        }
                    }
                    else {
                        self.quote = {
                            "content" : "Ngày 05/12 Elight chào mừng học viên thứ 40.000. Trở thành học viên VIP để trải nghiệm ứng dụng học tiếng Anh siêu hấp dẫn tại đây: <a href='https://elight.edu.vn/khoa-toan-dien-3-trong-1-trial-extension/?utm_source=Extension&utm_medium=quotes' target='_blank'>'http://bit.ly/HocvienVIP'</a>",
                            "content_vi" : "Ngày 05/12 Elight chào mừng học viên thứ 40.000. Trở thành học viên VIP để trải nghiệm ứng dụng học tiếng Anh siêu hấp dẫn tại đây: <a href='https://elight.edu.vn/khoa-toan-dien-3-trong-1-trial-extension/?utm_source=Extension&utm_medium=quotes' target='_blank'>http://bit.ly/HocvienVIP</a>",
                            "id" : "0",
                            "tag" : "quotation",
                            "type" : "marketing"
                        }
                    }
                }
            }

            // CHALLENGE NOTI
            if (!$rootScope.showChallengeNoti) {
                $timeout($rootScope.checkConditionPushChallengeNoti, 500);
            }
        }

        self.heart = function (){
          self.heart_quote = true;
          likedQuote.push(self.quote.id);
          localStorage.setItem('likedQuote', JSON.stringify(likedQuote));
          dailyTaskService.updateTask('like_quote');

          // floating heart animation
          setTimeout(function () {
            bubbleSound.play();
            setTimeout(function () {
              bubbleSound.pause();
            }, 1300);
          }, 600);
            let time = 0;
            let love = setInterval(function() {
                let r_num = Math.floor(Math.random() * 40) + 1;
                let r_size = Math.floor(Math.random() * 65) + 10;
                let r_left = Math.floor(Math.random() * 100) + 1;
                let r_bg = Math.floor(Math.random() * 25) + 100;
                let r_time = Math.floor(Math.random() * 5) + 5;
                $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");
                $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");
                $('.heart').each(function() {
                    let top = $(this).css("top").replace(/[^-\d\.]/g, '');
                    let width = $(this).css("width").replace(/[^-\d\.]/g, '');
                    if (top <= -100 || width >= 150) {
                        $(this).detach();
                    }
                });
                time++;
            if (time >= 3) {
              clearInterval(love);
            }
          }, 500);
          var category = self.quoteGroup.category;
          if (category != 'newsline-v1') {
              _gaq.push(['_trackEvent', 'quote', 'like', category]);
          }else {
              _gaq.push(['_trackEvent', 'newsline', 'like', category]);
          }

          sendGa($localStorage.auth, 'Quotation', 'Use', 'Quotation_use');

          // CHALLENGE NOTI
          if (!$rootScope.showChallengeNoti) {
              $timeout($rootScope.checkConditionPushChallengeNoti, 1000);
          }
        };

        self.contribute = function () {
          $service.contribute();
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
              $('.quote_arrow_box').toggle(300);
          };

          $scope.sendReport = function(){
              let word = self.wordData ? self.wordData.word : self.wordBeingTranslated;
              let content = $('#content_quote_error').prop('checked')? 'Yes' : 'No';
              let translate = $('#translate_quote').prop('checked')? 'Yes' : 'No';
              let form = {
                  'entry.1559549395' : word,
                  'entry.135539557' : content,
                  'entry.348269786' : translate,
              };
              let url = 'https://docs.google.com/forms/d/11NVklaG6ySKyj62qiOgU8ooA4Pvf4aIV6ezmufHKoAI/formResponse';
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

          function resetStateFeedback(){
              self.wordBeingTranslated = '';
              $('.ui_input').attr('checked', false);
              $scope.survey = true;
              $scope.disabledSendBtn = true;
          }
      };
    }
  ]
});
