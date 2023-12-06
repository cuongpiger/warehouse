'use strict';

angular.module("footer.video").component("videoLibrary", {
	templateUrl : 'app/components/footer/video/video.template.html',
	controller	:	["$rootScope", "firebaseService", '$scope', '$localStorage',
		function recordingController($rootScope, firebaseService, $scope, $localStorage){
			var self = this;
            checkCallAPIVideo();
            //initScope();

            self.clickVideo = function () {
                _gaq.push(['_trackEvent', 'VIDEO_', 'See notification', 'See notification']);
                $("#video_modal").modal('show');
                $localStorage.numberOfNewVideos = $scope.numberOfNewVideos = 0;
            };

			self.watchVideos = function(val, key){
                _gaq.push(['_trackEvent', 'VIDEO_', 'View page', val.id+"_"+val.title]);
                var index = _.findLastIndex($localStorage.videos, {
                    id : val.id
                });
                $scope.videos[index].view = true;
                $localStorage.videos = $scope.videos;

                window.open("https://elight.edu.vn/hoc-tieng-anh-qua-video/"+val.meta_url+'/'+val.id);
			};

            function checkCallAPIVideo(){
                var d = new Date();
                if(!$localStorage.lastTimeGetVideos || d.getDate() !== $localStorage.lastTimeGetVideos.day){
                    $localStorage.lastTimeGetVideos = {
                        'am' : d.getHours() < 12,
                        'pm' : d.getHours() >= 12,
                        'day' : d.getDate()
                    };
                    getVideo(8);
                }
                else {
                    if(d.getHours() < 12){
                        if($localStorage.lastTimeGetVideos.am) return;
                        else {
                            $localStorage.lastTimeGetVideos.am = true;
                            getVideo(8);
                        }
                    }
                    else {
                        if($localStorage.lastTimeGetVideos.pm) return;
                        else {
                            $localStorage.lastTimeGetVideos.pm = true;
                            getVideo(8);
                        }
                    }
                }
            }

            function getVideo(take){
                firebaseService.getLibraryVideos('', take, 0)
                .then(function(response) {
                    if(response.status == 200 && response.data){
                        var videos = response.data.data.newest_videos;
                        var numberOfNewVideos = 0;
                        if($localStorage.videos && $localStorage.videos.length > 0){
                            _.each(videos, function(val, key){
                                var exist_video = _.where($localStorage.videos, {id: val.id});
                                if(!exist_video || (exist_video && exist_video.length == 0)){
                                    videos[key].view = false;
                                    numberOfNewVideos++;
                                }
                                else {
                                    videos[key].view = true;
                                }
                            });
                        }
                        else {
                            numberOfNewVideos = 1 ;
                        }
                        $localStorage.videos = videos;
                        $scope.videos = $localStorage.videos;
                        $localStorage.numberOfNewVideos = $scope.numberOfNewVideos = numberOfNewVideos;
                        initScope();
                    }
                })
                .catch(function(error) {
                    console.log(error)
                });
            }

            function initScope(){
                $scope.videos = $localStorage.videos;
                $scope.numberOfNewVideos = $localStorage.numberOfNewVideos;
                applyScope($scope);
            }

		}
	]
});
