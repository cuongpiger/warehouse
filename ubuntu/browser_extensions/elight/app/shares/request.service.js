'use strict';

angular.module('app.request', [])
.service('app.request.service', appRequestService);

appRequestService.$inject = ['$http', '$q'];

function appRequestService($http, $q) {
  return {
    send: sendRequest
  }

  function sendRequest(method, url, data) {
    method = method.toUpperCase();

    let options = {
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    if (method == 'POST' || methos == 'PUT') {
      options.data = data;
    } else {
      options.params = data;
    }

    return $http(options).then(
      (successResponse) => {
        return successResponse.data;
      },
      (errorResponse) => {
        return $q.reject(errorResponse);
      }
    );
  }
}