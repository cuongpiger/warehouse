"use strict";

angular.module("firebase.service", []).service("firebaseService", ["$http", '$q',
	function firebaseService($http, $q) {
		let service = {};

		service.getNewVideo = function () {
			return $http({
				method : 'GET',
				url : "https://elightvideonotifications.firebaseio.com/Videos.json"
			}).then(function (res) {
				return res.data;
			}).then(function (data) {
				if (!lastVideoKey) {
					var lastVideoKey = localStorage.getItem("lastVideoKey");
					if (lastVideoKey == null || lastVideoKey == undefined || lastVideoKey == "") {
						lastVideoKey = "-KsRG_GXsh0TQL2g74mO"
					};
				};
				let videoKeys = Object.keys(data);
				let lastVideoKeyIndex = videoKeys.indexOf(lastVideoKey);
				if (lastVideoKeyIndex < videoKeys.length - 1) {
					if (localStorage.getItem("videoClicked")) {
						lastVideoKey = videoKeys[lastVideoKeyIndex + 1];
						localStorage.setItem("videoClicked", false);
					};
					data[lastVideoKey].source = JSON.parse(_.unescape(data[lastVideoKey].source));
					localStorage.setItem('lastVideoKey', lastVideoKey);
					return data[lastVideoKey];
				} else {
					return null
				}
			}).catch(function (error) {
				console.log(error);
			})
		};
        service.getLibraryVideos = function (user_token, take, skip) {
            var deferred = $q.defer();
            var  urlApi = {
                url  : 'https://api.elight.edu.vn/v3/list-video-library',
				method : 'GET'
			};
            $http({
                method: urlApi.method,
                url: urlApi.url,
                params: {
                    user_token: user_token,
                    take: take,
                    skip: skip
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

		return service;
	}
])
