"use strict";

angular.module("inviteFriend", []).service("inviteFriendService", ["$http",
function inviteFriendService($http) {
  let service = {};
  /*
  * get intive data using user_id
  * */
  service.getInviteByUserId = function (params) {
    return $http({
      method : apis.getInviteByUserId.method,
      url : apis.getInviteByUserId.url,
      params : {
        guest_id   : params.guest_id,
      }
    }).then(function(res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    })
  };
  /*
  * store invite
  * */
  service.invite = function (params) {
      return $http({
          method : apis.invite.method,
          url : apis.invite.url,
          data : {
              guest_id   : params.guest_id,
          }
      }).then(function(res) {
          return res.data;
      }).catch(function (err) {
          console.log(err);
      })
  };
    /*
     * save user detail -  invitation
     * */
    service.updateUserInvitation = function (params) {
        return $http({
            method : apis.updateInvitation.method,
            url : apis.updateInvitation.url,
            data : params
        }).then(function(res) {
            return res.data;
        }).catch(function (err) {
            console.log(err);
        })
    };
  return service;
}
]);
