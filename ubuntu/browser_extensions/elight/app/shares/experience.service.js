"use strict";

angular.module("experience.service", []).service("levelExpService", [
	function levelExpService() {
		let service = {};

		service.initializing = function () {
			localStorage.setItem("exp", 0);
			localStorage.setItem("lvl", 1);
		};

		service.getRequireExp = function (level) {
			return Math.round(1.5*Math.max(50*Math.log(level)/Math.log(15), Math.sqrt(Math.max(0, level - 2))/(0.048*Math.sqrt(2)), Math.sqrt(Math.max(0, level - 5)/0.004)));
		};

		service.getCurrentExp = function () {
			return localStorage.getItem('exp');
		};

		service.getCurrentLevel = function () {
			return localStorage.getItem('lvl');
		};

		service.gainExp = function (action, correct, time) {
			if (action === 'newWord-save' && action === 'newWord-next' && action === 'notebook-search' && action === 'notebook-save' && action === 'like') {
				localStorage.setItem("exp", localStorage.getItem('exp') + 1);
			} else if (action === 'flashcard') {
				localStorage.setItem("exp", localStorage.getItem('exp') + 2);
			} else if (action === "practice" && action === "recording") {
				localStorage.setItem("exp", localStorage.getItem('exp') + correct);
			} else if (action === "war") {
				localStorage.setItem("exp", localStorage.getItem('exp') + correct + (15 - Math.ceil(Math.max(0, time - 30)/3)));
			};

			if (localStorage.getItem('exp') >= service.getRequireExp(service.getCurrentLevel())) {
				localStorage.setItem('exp', 0);
				localStorage.setItem('lvl', service.getCurrentLevel() + 1);
			};
		};

		return service;
	}
])
