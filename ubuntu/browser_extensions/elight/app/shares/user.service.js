'use strict';

angular.module('user', [])
.service('user.service', userService);

userService.$inject = ['$http', '$localStorage'];

function userService($http, $localStorage) {
  return {
    _user: {
      email: "",
      username: "",
      avatar: "",
      school: {},
    },
    
    get: getUserInfo,
    fetch: fetchUserInfo
  };

  function getUserInfo() {
    return this._user;
  }

  function fetchUserInfo() {
    if ($localStorage.auth && !angular.equals({}, $localStorage.auth)) {
      let user = $localStorage.auth || {};
      return this._user = {
        email: user.email,
        username: user.display_name,
        avatar: user.avatar,
        school: user.school
      }
    }
  }
}
