"use strict";

angular.module("challenge.service", []).service("challengeService", ["$http", "$localStorage", "$q",
function challengeService($http, $localStorage, $q) {
  let service = {};
  var user = JSON.parse(localStorage.getItem("user"));
  if(user && user.user_token){
    var user_token = user.user_token;
  }else{
    var user_token = '';
  }
  if (localStorage.getItem("war-updating")) {
    resendDataIfFail();
  };

  service.createSchool = function(schoolName) {
    return $http({
      method : apis.createSchool.method,
      url : apis.createSchool.url,
      data : {schoolName: schoolName}
    }).then(function(res) {
        return res.data;
    }).catch(function (err) {
        console.log(err);
    })
  }

  service.getPlayerStat = function () {
    let stat = $localStorage.warPlayerState;
    if (stat === null || stat === undefined) {
      return getStatFromServer()
        .then(function (data) {
          if (data === null) {
            $localStorage.warPlayerState =  [] ;
          } else {
            $localStorage.warPlayerState =  data;
            $localStorage.lastTimeGetPlayerStat = new Date().getTime();
          }
          return data;
        });
    } else {
      //check if data is synced
      var distanceDay = (new Date().getTime() - $localStorage.lastTimeGetPlayerStat)/86400000;

      if (!$localStorage.lastTimeGetPlayerStat || distanceDay >= 1) {
        getStatFromServer()
          .then(function(data) {
            $localStorage.lastTimeGetPlayerStat = new Date().getTime();
            if (!_.isEqual(data, stat) && !localStorage.getItem("war-updating")) {
              $localStorage.warPlayerState =  data ;
            };
          });
        return Promise.resolve(stat);
      }else {
        return Promise.resolve(stat);
      }
    };
  };
  service.updatePlayerStat = function (result, score) {
    $localStorage.warPlayerState = updateStatFromLocal(result, score);
    if (result === 'win' && $localStorage.auth && $localStorage.auth.school) {
      $localStorage.auth.school.score += 1;
    }
  };

  service.updateUserScoreAfterLogin = function(winNumber, loseNumber, totalScore, userToken) {
    //   var stat = $localStorage.warGuestState;
      return $http({
          method : apis.warUpdate.method,
          url : apis.warUpdate.url,
          params : {
            user_token : ($localStorage.auth && $localStorage.auth.user_token) ? $localStorage.auth.user_token : '',
            win_number : winNumber,
            lose_number : loseNumber,
            total_score : totalScore
          }
      }).then(function (res) {
        localStorage.removeItem("war-updating");
        delete $localStorage.warGuestState;
        return res;
      }).then(function (data) {
        console.log(data);
      }).catch(function (err) {
        resendDataIfFail();
        console.log(err);
      })
  }
  /*
  *  update Rank ()
  * */
  function updateRank(user_rank, dataRank){
      if(dataRank ){
          if(user_rank && user_rank.id){
              var user_rank_index = _.findIndex(dataRank, {id : user_rank.id});
              if(user_rank_index === -1){
                  dataRank.concat(user_rank);
              }else{
                  dataRank[user_rank_index] = user_rank;
              }
          }
          return dataRank;
      }else{
          return undefined;
      }

  }
  
  function resendDataIfFail() {
    let stat = $localStorage.warPlayerState;
    if (stat != null || stat != undefined) {
      return $http({
          method : apis.warUpdate.method,
          url : apis.warUpdate.url,
          params : {
            user_token: ($localStorage.auth && $localStorage.auth.user_token) ? $localStorage.auth.user_token : '',
            win_number : stat.win_number,
            lose_number : stat.lose_number,
            total_score : stat.total_score
          }
      }).then(function (res) {
        localStorage.removeItem("war-updating");
        return res;
      }).catch(function (err) {
        console.log(err);
      })
    };
  };

  function getStatFromServer() {
    // console.log('token guest id ', $localStorage.token_guest_id)
    return $http({
        method : apis.getPlayerStat.method,
        url : apis.getPlayerStat.url,
        headers: {
          tokens: $localStorage.token_guest_id || ""
        }
    })
    .then(function (res) {
      if (!res.data.data) {

      } else {
        var war_player = res.data.data;
        war_player.win_number = war_player.score;
        war_player.win_rate = win_rate(war_player.score, war_player.lose_number);
      }
      return war_player;
    }).catch(function (err) {
      console.log(err);
    })
  };

  function updateStatFromLocal(result, score) {
    let stat = $localStorage.warPlayerState;
    if (stat == null || stat == undefined) {
      return stat = {
        total_score : score,
        win_number : result == 'win' ? 1 : 0,
        lose_number : result == 'win' ? 0 : 1,
        winrate : result == 'win' ? 100 : 0
      };
    } else {
      if (result == 'win') {
        stat.win_number++;
      } else {
        stat.lose_number++;
      };
      stat.total_score += score;
      $localStorage.warPlayerState = stat;
      return stat;
    }
  };

  function win_rate (win_number, lose_number){
      if(win_number){
          return (win_number /(win_number + lose_number )).toFixed(2)*100;
      }else{
          return 0;
      }
  }
  /*
   * feedback content
   * */
    service.feedbackContent = function (params) {
        return $http({
          method : apis.feedbackContent.method,
          url : apis.feedbackContent.url,
          data : params
        }).then(function(res) {
            return res.data;
        }).catch(function (err) {
            console.log(err);
        })
    };

    service.findCurrentSeason = function(cb) {
      return $http({
        method : apis.currentSeason.method,
        url : apis.currentSeason.url
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null, err);
        });
    }

    /*
    * api get rank
    * */

    service.getTopUsers = function(limit, cb) {
      return $http({
        method: apis.getTopUsers.method,
        url: apis.getTopUsers.url,
        params: {limit: limit} 
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null ,err);
        });
    }

    service.getTopUserBySchool = function(limit, school, cb) {
      return $http({
        method: apis.getTopUserBySchool.method,
        url: apis.getTopUserBySchool.url,
        params: {
          limit: limit,
          school: school
        } 
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null ,err);
        });
    }

    service.getTopSchools = function(limit, cb) {
      return $http({
        method: apis.getTopSchools.method,
        url: apis.getTopSchools.url,
        params: {
          limit: limit
        } 
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null ,err);
        });
    }

    service.getTopSchoolByTotalStudent = function(cb) {
      return $http({
        method: apis.getTopSchoolByTotalStudent.method,
        url: apis.getTopSchoolByTotalStudent.url
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null ,err);
        });
    }

    service.getUserRank = function(guestId, schoolId, cb) {
      return $http({
        method: apis.getUserRank.method,
        url: apis.getUserRank.url,
        params: {
          guestId: guestId,
          schoolId: schoolId
        } 
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null ,err);
        });
    }

    service.getSchoolRank = function(schoolId, cb) {
      return $http({
        method: apis.getSchoolRank.method,
        url: apis.getSchoolRank.url,
        params: {
          schoolId: schoolId
        }
      })
        .then(function(res) {
          cb(res.data);
        })
        .catch(function(err) {
          cb(null ,err);
        }); 
    }

    service.sendInfoToReceiveGift = function(guestId, name, phoneNum, email, address, cb) {
      return $http({
        method: apis.newUserReceiveGift.method,
        url: apis.newUserReceiveGift.url,
        data: {
          guestId: guestId,
          name: name,
          phoneNum: phoneNum,
          email: email,
          address: address
        }
      })
        .then(function(res) {
          if (cb) {
            cb(res.data);
          }
        })
        .catch(function(err) {
          if (cb) {
            cb(null, err);
          }
        });
    }

  return service;
}])
