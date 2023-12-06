"use strict";

angular.module("preload.service", []).service("preloadService", [
	function preloadService() {
		var service = {};

		/* NOTE:
			input: an array of url
			return: a promise that resolve when all images has been loaded or
							throw an error.
							the promise return an array contain true if the image in the
							same index in the input array has been loaded successfully
							otherwise return false.
		*/
		service.preloadImages = function (imageUrlArray) {
			var promiseArray = [];
			imageUrlArray.map((url) => {
				promiseArray.push(new Promise(function(resolve, reject) {
					var image = new Image();
					image.src = url;
					image.onload = function (event) {
						resolve(true);
					};
					image.onerror = function (event) {
						resolve(false);
					};
				}))
			});
			return Promise.all(promiseArray);
		};

		/* NOTE:
			input: an array of url
			return: a promise that resolve when all audios has been loaded or
							throw an error.
							the promise return an array contain true if the audio in the
							same index in the input array CAN PLAY THROUGH (not fully loaded)
							otherwise return false.
		*/
		service.preloadAudios = function (audioUrlArray) {
			var promiseArray = [];
			audioUrlArray.map((url) => {
				promiseArray.push(new Promise(function(resolve, reject) {
					var audio = new Audio();
					audio.src = url;
					audio.oncanplaythrough = function (event) {
						resolve(true);
					};
					audio.onerror = function (event) {
						resolve(false);
					};
				}))
			});
			return Promise.all(promiseArray);
		};

		return service;
	}
]);
