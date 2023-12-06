/**
 * @ngdoc service
 * @name challenge.service:challenge.io.service
 *
 * @description
 * use sails socket ios
 *
 * */
angular.module('challenge.service.io', [])
.service('challenge.io.service', function($localStorage, $rootScope){
  let service = {};
  let listUserOnline = [];
  let socketAT = $rootScope.io;
  let APIURL = apis;
  /**
   * check if connecting to socket
  */
  service.isConnected = function() {
    return socketAT.isConnected();
  };
  /**
   * subcribe user
	 *	@param: email, username, userId, guestId, avatar, cb
  */
  service.subcribeUser = function(email, username, userId, guestId, avatar, school, cb) {
      let data = {
          username: username,
          userId: userId,
          guestId: guestId,
          email: email,
          avatar: avatar,
          school: school
      };
      let options = {
          method : APIURL.subcribeUser.method,
          url : APIURL.subcribeUser.url,
          data: data
      };
      return sendRequest(options);
  };

  service.onSubcribeUser = function(cb) {
    socketAT.on(APIURL.onSubcribeUser.url, function(event){
      cb(event);
    });
  };

  service.onUpdateUserStatusInGame = function(cb) {
    socketAT.on(APIURL.onUpdateUserStatusInGame.url, function(event) {
      cb(event);
    });
  };

  service.onUpdateUserStatusLeaveGame = function(cb) {
    socketAT.on(APIURL.onUpdateUserStatusLeaveGame.url, function(event) {
      cb(event);
    });
  };
  /**
   * get list user with state is online
   * @status  1 online, 0 offline
   */
  service.getUserList = function(userIgnore) {
      let options = {
          method : APIURL.getUser.method,
          url : APIURL.getUser.url,
          data: {
            userIgnore: userIgnore
          }
      };
      return sendRequest(options);
  };
  /**
   * update list user
   * @status  1 online, 0 offline
   */
  service.updateUserList = function(cb) {
    socketAT.on(APIURL.updateUser.url, function(response){
      cb(response);
    });
  };
  /**
  * listen disconnect event
  */
  service.onDisconnect = function(cb) {
    socketAT.on(APIURL.onDisconnect.url, function(event){
      cb(event);
    });
  };
  // NOTE: ingame socket event
  service.getQuestionData = () => {
      let options = {
          method : APIURL.getQuestionData.method,
          url : APIURL.getQuestionData.url,
          data: {roomName : roomName}
      };
      return sendRequest(options);
  };

  service.checkCountDownReady = (roomName) => {
      let options = {
          method : APIURL.checkCountDownReady.method,
          url : APIURL.checkCountDownReady.url,
          data: {roomName: roomName}
      };
      return sendRequest(options);
  };

  service.updateOpponentLoadDataProgress = (roomName, opponentProgress) => {
	let data = {
		roomName: roomName,
		opponentProgress: opponentProgress
	};
    let options = {
        method : APIURL.updateOpponentLoadDataProgress.method,
        url : APIURL.updateOpponentLoadDataProgress.url,
        data: data
    };
    return sendRequest(options);
  };

  service.finishPreload = () => {
      let data = {roomName : roomName};
      let options = {
          method : APIURL.finishPreload.method,
          url : APIURL.finishPreload.url,
          data: data
      };
      return sendRequest(options);
  };

  /**
     * Answer
     * @param userAnswer
     * @param answerKey
     * @param currentQuestionIndex
     * @param roomName
     */
  service.answer = (answer, currentQuestionIndex, roomName) => {
    let data = {
      answer : answer,
      currentQuestionIndex: currentQuestionIndex,
      roomName : roomName
    };
    let options = {
        method : APIURL.answer.method,
        url : APIURL.answer.url,
        data: data
    };
    return sendRequest(options);
  };

  service.useSkill = (skill, roomName, guestId) => {
      let data = {
          skill : skill,
          roomName : roomName,
          guestId: guestId
      };
      let options = {
          method : APIURL.useSkill.method,
          url : APIURL.useSkill.url,
          data: data
      };
      return sendRequest(options);
  };

  // NOTE: use function pass from controller as socket event handler
  // each function will receive "data" as its 1st parameter
  // all function below must be called after a player accept invitation from the other
  service.onQuestionDataRes = (callback) => {
    socketAT.on("sendQuestionData", callback);
  };

  service.onMatchStart = (callback) => {
    socketAT.on("matchStart", callback);
  };

  service.onPlayerAnswer = (callback) => {
    socketAT.on("playerAnswer", function(response) {
      callback(response);
    });
  };

  service.onPlayerAnswerResult = (callback) => {
    socketAT.on("playerAnswerResult", function(response) {
      callback(response);
    });
  };

  service.onPlayerUseSkill = (callback) => {
    socketAT.on("playerUseSkill", function(response) {
      callback(response);
    });
  };

  service.onMatchEnd = (callback) => {
    socketAT.on("matchEnd", callback);
  };

  service.onOpponetLoadData = (callback) => {
	socketAT.on(APIURL.onOpponetLoadData.url, function(response) {
		callback(response);
	});
  };

  service.onReadyToCountDown = (callback) => {
    socketAT.on(APIURL.onReadyToCountDown.url, callback);
  };
  /**
     * invite user by userID
     * @param user
     * @param guest_id
     */
  service.inviteUserByUserId = function (user, guest_id) {
    let data = {
      username: user.display_name,
      userId: user.id,
      hostGuestId: $localStorage.guest_id,
      opponentGuestId: guest_id,
      avatar: user.avatar,
			school: user.school
    };
    let options = {
        method : APIURL.inviteByUserId.method,
        url : APIURL.inviteByUserId.url,
        data: data
    };
    return sendRequest(options);
  };
  /**
   * listen invite for a user
   * @param cb
   */
  service.onInviteUser = function (cb) {
    socketAT.on(APIURL.onInviteUser.url, function(response){
      cb(response);
    });
  };
  /**
   * update user status in case play with bot
   * @param guestId
   * @param status
   */
  service.updateUserStatus = function (guestId, status) {
    let data = {
      guestId: guestId,
      status: status
    };
    let options = {
        method : APIURL.updateUserStatus.method,
        url : APIURL.updateUserStatus.url,
        data: data
    };
    return sendRequest(options);
  };
  /**
   * get user status
   * @param guestId, cb
   */
  service.getUserStatus = function(guestId){
    let data = {
      guestId : guestId
    };
    let options = {
        method : APIURL.getUserStatus.method,
        url : APIURL.getUserStatus.url,
        data: data
    };
    return sendRequest(options);
  };

  /**
   * rest user status
   * @param guestId
   */

  service.disconnect = function(guestId){
      let data = {
          guestId : guestId
      };
      let options = {
          method : APIURL.disconnect.method,
          url : APIURL.disconnect.url,
          data : data
      };
      return sendRequest(options);
  }

  /**
   * get user's recent opponents
   * @param guestId, cb
   */
  service.getRecentOpponents = function(guestId, cb){
      let data = {
          guestId : guestId
      };
      let options = {
          method : APIURL.getRecentOpponents.method,
          url : APIURL.getRecentOpponents.url,
          data : data
      }
      return sendRequest(options);
  }

  /**
   * leave all member in Room
   * @param roomName
   */

  service.leaveRoom = function (roomName) {
    let data = {
      roomName: roomName
    };
    let options = {
        method : APIURL.leaveRoom.method,
        url : APIURL.leaveRoom.url,
        data: data
    };
    return sendRequest(options);
  };

  service.onLeaveRoom = function(cb){
    socketAT.on('opponent-leave-room', function(res){
    	cb(res);
    })
  };

  /**
   * leave all member in Room
   * @param roomName
   * @param hostSocketId
   * @param cb
   */

  service.denyInvite = function(roomName, hostSocketId){
    let data = {
      roomName : roomName,
      hostSocketId: hostSocketId
    };
    let options = {
        method : APIURL.denyInvite.method,
        url : APIURL.denyInvite.url,
        data: data
    };
    return sendRequest(options);
  };
  service.onDenyInvite = function (cb) {
    socketAT.on(APIURL.onDenyInvite.url, function(response){
      cb(response);
    });
  };
  /**
   * when user accept Invite
   * @param roomName
   * @param player1
   * @param player2
   */
  service.acceptInvite =  function (roomName, player1, player2) {
    let data = {
      roomName: roomName,
      player1: player1,
      player2: player2
    };
    let options = {
        method : APIURL.acceptInvite.method,
        url : APIURL.acceptInvite.url,
        data: data
    };
    return sendRequest(options);
  };
  /**
   * accept
   * @param cb
   */
  service.onAcceptInvite =  function (cb) {
    socketAT.on(APIURL.onAcceptInvite.url, function(response){
      cb(response);
    });
  };

  /**
   * prevent other tab action when load game
  */
  service.onReadyBeforeLoadGame = function(cb) {
    socketAT.on('readyBeforeLoadGame', function(response) {
      cb(response);
    })
  };
  /**
   * listen event from room
   * @param cb
   */
  service.oneMessage = function (cb) {
    socketAT.on('message', function (response){
      cb(response);
    });
  };
  /**
   * finish
   * @param roomName
   * @param guestId
   * @returns {*}
   */
  service.sendFinishStatus = function(roomName, guestId, is_bot){
    let data = {
      roomName : roomName,
      guestId : guestId,
      is_bot: is_bot
    };
    let options = {
        method : APIURL.finish.method,
        url : APIURL.finish.url,
        data: data
    };
    return sendRequest(options);
  };

  service.onFinish = function(cb){
    socketAT.on('match-finish', function(response){
      cb(response);
    })
  };
  /**
   * Send Invite Invite Play Continue
   * @param roomName
   * @returns {*}
   */
  service.sendRematchRequest = function(roomName){
    let data = {
      roomName : roomName
    };
    let options = {
        method : APIURL.playAgain.method,
        url : APIURL.playAgain.url,
        data: data
    };
    return sendRequest(options);
  };

  service.acceptRematchRequest = function(roomName, player1, player2){
    let data = {
      roomName : roomName,
      player1 : player1,
      player2 : player2
    };
    let options = {
        method : APIURL.acceptPlayAgain.method,
        url : APIURL.acceptPlayAgain.url,
        data: data
    };
    return sendRequest(options);
  };
  /**
    * Deny Rematch
    * @param roomName
    * @returns {*}
    */
  service.rejectRematchRequest = function(roomName){
    let data = {
      roomName : roomName
    };
    let options = {
      method : APIURL.rejectPlayAgain.method,
      url : APIURL.rejectPlayAgain.url,
      data: data
    };
    return sendRequest(options);
  };

  service.onReceiveRematchRequest = function(cb){
    socketAT.on('request-play-again', function(res){
      cb(res);
    })
  };

  service.onRejectRematchRequest = function(cb){
    socketAT.on('play-again-request-rejected', function(res){
      cb(res);
    })
  };

  service.onAcceptRematchRequest = function(cb){
    socketAT.on('play-again-request-accepted', function(res){
      cb(res);
    })
  };

  service.onOpponentDisconnected = function(cb){
    socketAT.on('opponent-disconnect', function(res){
      cb(res);
    })
  };

  service.onPlayerDisconnected = function(cb){
    socketAT.on('opponent-disconnect', function(res){
      cb(res);
    })
  };

  service.onOpponentRequestFinish = function(cb){
    socketAT.on('request-finish', function(res){
      cb(res);
    })
  };

  service.onOpponentDoneRequestFinish = function(cb){
    socketAT.on('done-request-finish', function(res){
      cb(res);
    })
  };

  service.onOpponentDisconnect = function(cb){
    socketAT.on('opponent-disconnect', function(res){
      cb(res);
    })
  };

  // User items
  service.syncLocalItems = (data) => {
    let options = {
      method: APIURL.syncLocalItems.method,
      url: APIURL.syncLocalItems.url,
      data: data
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.fetchItems = (data) => {
    let options = {
      method: APIURL.fetchItems.method,
      url: APIURL.fetchItems.url,
      data: { guest_id: data.guest_id}
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.useItem = (item, roomName, guestId) => {
    let options = {
      method: APIURL.useItem.method,
      url: APIURL.useItem.url,
      data: {
        item: item,
        roomName: roomName,
        guestId: guestId
      }
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.fetchBonusStat = () => {
    let options = {
      method: APIURL.fetchBonusStat.method,
      url: APIURL.fetchBonusStat.url
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.openGoldChest = () => {
    let options = {
      method: APIURL.openGoldChest.method,
      url: APIURL.openGoldChest.url
    };


    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.openSilverChest = () => {
    let options = {
      method: APIURL.openSilverChest.method,
      url: APIURL.openSilverChest.url
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.openWinChest = () => {
    let options = {
      method: APIURL.openWinChest.method,
      url: APIURL.openWinChest.url
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.receiveInviteItems = () => {
    let options = {
      method: APIURL.receiveInviteItems.method,
      url: APIURL.receiveInviteItems.url
    };

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };


  /*
   * Send request to update items in db via invite
   */
  service.openInviteChest = () => {
    let options = {
      method : APIURL.openInviteChest.method,
      url : APIURL.openInviteChest.url
    }

    return sendRequest(options)
      .then((response) => {
        return response;
      })
  };

  service.getTokenGuestId = (guestId) => {
      let options = {
          method : APIURL.getTokenGuestId.method,
          url : APIURL.getTokenGuestId.url,
          data: {
              guest_id: guestId
          }
      };
      return sendRequest(options);
  };

  service.getBotInfo = (guestId) => {
    let url = APIURL.getBotInfo.url;
    if (guestId) {
      url = `${url}?guest_id=${guestId}`;
    }
    let options = {
      method: APIURL.getBotInfo.method,
      url: url
    };

    return sendRequest(options);
  };
   return service;

  function sendRequest(options) {
    let auth = $localStorage.auth || {};
    let token_guest_id = $localStorage.token_guest_id || "";
    options = options || {};
    options.headers = {
      authorization: `Bearer ${auth.user_token}`,
      tokens: token_guest_id
    };

    return new Promise((resolve, reject) => {
      socketAT.request(options, (response, jwres) => {
        return resolve(response);
      });
    });
  }
});
