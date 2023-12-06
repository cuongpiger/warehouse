"use strict";

angular.module("login.service", []).service("loginService", ["$http", "$rootScope", "$localStorage", 'API_URL',
	function loginService($http, $rootScope, $localStorage, API_URL) {
		let service = {};
		let user;

		if (JSON.parse(localStorage.getItem("user"))) {
			$rootScope.loggedIn = true;
		} else {
			$rootScope.loggedIn = false;
		};

		service.login = function (email, password) {
			let data = {};
			data.email = email;
			data.password = password;
			data.end_point = '404';
			data.type_of_device = '1';
			return $http({
				method: 'post',
				url: API_URL + 'signin-email',
				data: data
			}).then(function (response) {
				if (response.data.code === 1) {
					// console.log(response);
					user = response.data.user;
					localStorage.setItem("user", JSON.stringify(user));
					$rootScope.loggedIn = true;
                    $localStorage.auth = user;
                    // location.reload();
					// return true;
					return response.data;
				} else {
					return response.data;
				};
			}).catch(function (error) {
				console.log(error);
				throw error;
			})
		};

		service.signUp = function (data) {
			return fetch(API_URL + `register?confirm=${data.re_password}&display_name=${data.username}&email=${data.email}&password=${data.password}&password_confirmation=${data.re_password}`, {
				method : "POST"
			}).then((res) => {
				return res.json()
			});
		};

		service.logOut = function () {
            $localStorage.auth = undefined;
			localStorage.removeItem("user");
			localStorage.removeItem("war-player-stat");
			localStorage.removeItem("war-win");
			$rootScope.loggedIn = false;
            location.reload();
		};

		service.updateInfo = function (data) {
			if (angular.isUndefined(user)) {
				user = JSON.parse(localStorage.getItem("user"));
			};
			if (!angular.isUndefined(data)) {
				data = _.extend(data, data.information);
				let payload = {
					address : data.address || user.information.address,
					company : data.company || user.information.company,
					display_name : data.display_name || user.display_name,
					facebook : data.facebook || user.information.facebook,
					fullname : data.fullname || user.information.fullname,
					phone : data.phone || user.information.phone,
					user_token : user.user_token
				};
				return fetch(API_URL + "profile/edit", {
					method : "POST",
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body : JSON.stringify(payload)
				}).then((res) => {
					return res.json();
				}).then((code) => {
					if (code.code = 1) {
						user.information.address = data.address,
						user.information.company = data.company,
						user.display_name = data.display_name,
						user.information.facebook = data.facebook,
						user.information.fullname = data.fullname,
						user.information.phone = data.phones
						localStorage.setItem("user", JSON.stringify(user));
						return true;
					} else {
						return false;
					};
				}).catch((err) => {
					console.log(err);
					return false;
				})
			} else {
				return Promise.resolve(false);
			};
		};

		service.changePass = function (data) {
			if (angular.isUndefined(user)) {
				user = JSON.parse(localStorage.getItem("user"));
			};
			if (!angular.isUndefined(data)) {
				let payload = {
					password_new : data.password,
					password_new_confirmation : data.re_password,
					user_token : user.user_token
				};
				return fetch(API_URL + "users/change-password", {
					method : "POST",
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body : JSON.stringify(payload)
				}).then((res) => {
					return res.json();
				}).then((code) => {
					if (code.code = 1) {
						return true;
					} else {
						return false;
					};
				}).catch((err) => {
					console.log(err);
					return false;
				})
			} else {
				return Promise.resolve(false);
			}
		}

		service.getUser = function () {
			if (angular.isUndefined(user)) {
				user = JSON.parse(localStorage.getItem("user"));
			};
			return angular.copy(user);
		};

		return service;
	}
])
