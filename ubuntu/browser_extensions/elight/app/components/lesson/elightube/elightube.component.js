'use strict';

angular.module("lesson.elightube").component("elightube", {
    templateUrl : 'app/components/lesson/elightube/elightube.template.html',
    controller : ["$localStorage", '$timeout',
        function notebookController($localStorage, $timeout) {
            let self = this;
            self.videos = $localStorage.videos;
            self.first_video = _.first($localStorage.videos);
            self.rest_video = _.rest($localStorage.videos);
            self.url_poster = function (poster){
                return "https://api.elight.edu.vn/public/images/video/" + poster +  '?v=' + ee_update_version;
            };
            sendGa($localStorage.auth, 'Video library', 'Display', 'Video library_display');
            let options = {
                dots: false,
                lazyLoad: 'ondemand',
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                prevArrow: '<i class="fa fa-chevron-left slick-prev-customer hidden"></i>',
                nextArrow: '<i class="fa fa-chevron-right slick-next-customer"></i>'
            };
            self.showItem = 4;
            $timeout(function () {
                self.showItem = 50;
                let slick_contener = $('.video_card_small');
                slick_contener.not('.slick-initialized').slick(options);
                slick_contener.on('afterChange', function(event, slick, currentSlide) {
                    _gaq.push(['_trackEvent', 'VIDEO_', 'Next and Prev Button Video From Extension', 'Next and Prev Button']);
                    let type = $(this).data().type;
                    let maxSlide = slick.slideCount;
                    let id = $(this).data().id;
                    let self = $(this);
                    if(currentSlide >= maxSlide - 3) {
                        $(this).find('.slick-next-customer').addClass('hidden');
                    }
                    else {
                        $(this).find('.slick-next-customer').removeClass('hidden');
                    }

                    if(currentSlide === 0) {
                        $(this).find('.slick-prev-customer').addClass('hidden');
                    }
                    else {
                        $(this).find('.slick-prev-customer').removeClass('hidden');
                    }
                });
            });

            self.redirectLinkVideo  = function (item) {
                sendGa($localStorage.auth, 'Video library', 'Click', 'Video library_use');
                _gaq.push(['_trackEvent', 'VIDEO_', 'redirectLinkVideo From Extension', 'From Extension']);
                window.open("https://elightube.com/"+item.meta_url+'/'+item.id);
            }
        }
    ]
});
