"use strict";

angular.module("dailyTask.service", []).service("dailyTaskService", ["$rootScope", "$injector",
	function dailyTaskService($rootScope, $injector) {
		let service = {};
		let tasks = JSON.parse(localStorage.getItem("dailyTask"));

		service.generateTask = function () {
			let genDate = localStorage.getItem("genDate");
			if (genDate == null || genDate == undefined) {
				genDate = 0;
			};
			let today = new Date();
			today.setHours(0, 0, 0, 0);
			today = today.getTime();
			if (genDate < today || (tasks == null || tasks == undefined)) {
				tasks = [];
				genDate = Date.now();
				localStorage.setItem('genDate', genDate);
				let wordMemo;
				if (!wordMemo) {
					wordMemo = $injector.get("wordMemo");
				};
				localStorage.setItem("finished", 0);
				let needReview = wordMemo.checkReview();
				let randomNumArr = [];
				if (needReview.length > 0) {
					randomNumArr = _.sample(_.range(5), 3);
				} else {
					randomNumArr = _.sample(_.range(1, 5), 3);
				};
				for (var i = 0; i < randomNumArr.length; i++) {
					let newTask = angular.copy(dailyTasks[randomNumArr[i]]);
					newTask.current = 0;
					newTask.id = i;
					if (newTask.type === 'practice') {
						newTask.target = needReview.length;
					} else if (newTask.type === 'newWord') {
						newTask.target = Math.floor(Math.random() * 8 + 3);
					} else if (newTask.type === 'challenge') {
						newTask.target = Math.floor(Math.random() * 3 + 1);
					} else if (newTask.type === 'like') {
						newTask.target = Math.floor(Math.random() * 3 + 1);
						if (newTask.target === 1) {
							newTask.targetType = _.sample(["collocation", "quote", "idiom"]);
							newTask.type = newTask.type + "_" + newTask.targetType;
						} else {
							newTask.targetType = _.sample(["collocations", "quotes", "idioms"]);
							newTask.type = newTask.type + "_" + newTask.targetType;
							newTask.type = newTask.type.slice(0, -1);
						};
					} else if (newTask.type === 'save') {
						newTask.target = Math.floor(Math.random() * 5 + 3);
					};
					tasks.push(newTask);
				};
			};
			return tasks;
		};

		// service.changeTask = function (logined) {
		// 	if (logined) {
		//
		// 	} else {
		//
		// 	}
		// };

		service.updateTask = function (type) {
			if (tasks == null || tasks == undefined) {
				return;
			} else {
				let updateTask = _.findWhere(tasks, {type : type});
				if (updateTask == null || updateTask == undefined) {
					return;
				} else {
					if (updateTask.current < updateTask.target) {
						updateTask.current++;
						if (updateTask.current === updateTask.target) {
							let finished = localStorage.getItem("finished");
							finished++;
							localStorage.setItem("finished", finished);
							if (tasks.indexOf(updateTask) < tasks.length - finished) {
								let temp = tasks[tasks.indexOf(updateTask)].id;
								tasks[tasks.indexOf(updateTask)].id = tasks[tasks.length - finished].id;
								tasks[tasks.length - finished].id = temp;

								temp = tasks[tasks.indexOf(updateTask)];
								tasks[tasks.indexOf(updateTask)] = tasks[tasks.length - finished];
								tasks[tasks.length - finished] = temp;
							};
							$rootScope.$broadcast("taskFinished", updateTask.type, finished);
						};
					};
				};
			};
		};

		service.checkDone = function () {
			if (tasks == null || tasks == undefined) {
				return false;
			} else {
				let done = _.every(tasks, function (task) {
					return task.current === task.target;
				});
				return done;
			};
		};

		window.onbeforeunload = function () {
			localStorage.setItem('dailyTask', JSON.stringify(tasks));
		};

		return service;
	}
])
