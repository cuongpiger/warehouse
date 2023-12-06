/**
* Created by akira on 3/30/17.
*/
"use strict";
angular.module('app.service',[]).service('mainService', mainService);

mainService.$inject = ['$http'];
function mainService($http) {
  var service = {};
  let lemmatizer;

  service.search = function (key_word, callback) {
    if (key_word == "") {
      callback({status : 400})
    } else {
      $http({
        method: 'GET',
        url: "https://www.google.com/complete/search",
        params: {
          client: "firefox",
          ie: "utf-8",
          oe: "utf-8",
          hl: "en-US",
          gl: "",
          q: key_word == "" ? "" : key_word
        }
      }).then(function successCallback(response) {
        callback(response);
      }, function errorCallback(response) {
        callback(response);
      });
    }
  };

  service.getWeather = function (key_word, callback) {
    var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+key_word.address+","+key_word.city+"') and u='c'";
    $http({
      method: 'GET',
      url: "https://query.yahooapis.com/v1/public/yql",
      params: {
        q: searchtext,
        format : "json"
      }
    }).then(function successCallback(response) {
      callback(response);
    }, function errorCallback(response) {
      callback(response);
    });
  };

  service.getCityFromLatlong = function (lat, long, callback) {
    $http({
      method: 'GET',
      url: 'https://maps.google.com/maps/api/geocode/json',
      params: {
        latlng: lat+','+long,
        sensor : true
      }
    }).then(function successCallback(response) {
      callback(response.data);
    }, function errorCallback(response) {
      callback(response.data);
    });
  };

  service.getStudent = function (code, callback) {
    $http({
      method: 'GET',
      url: 'https://api.elight.edu.vn/v3/extension/check',
      params: {
        code: code
      }
    }).then(function successCallback(response) {
      callback(response.data);
    }, function errorCallback(response) {
      callback(response.data);
    });
  };

  service.getUserId = function (callback) {
    $http({
      method: 'GET',
      url: 'https://elight.edu.vn/test-extension',
      params: {
      }
    }).then(function successCallback(response) {
      callback(response.data);
    }, function errorCallback(response) {
      callback(response.data);
    });
  };

  service.queryFirebase = function (word, callback) {
    // if (angular.isUndefined(lemmatizer)) {
    //   var Lemmatizer;
    //   require(["/libs/javascript-lemmatizer/js/lemmatizer.js"], function (Lemmatizer) {
    //     console.log(Lemmatizer);
    //     let lemmatizer = new Lemmatizer();
    //     // console.log(lemmatizer.lemmas("books"));
    //   });
    //   console.log(Lemmatizer);
    //   setTimeout(function () {
    //     // lemmatizer = new Lemmatizer();
    //     console.log(Lemmatizer);
    //     // console.log(lemmatizer.lemmas("books"));
    //   },100);
    // };
    $http({
      method: 'GET',
      url: 'https://akira-extension.firebaseio.com/'+ word +'.json'
    }).then(function successCallback(res) {
      callback(res);
    }, function errorCallback(res) {
      callback(res);
    })
  };

  service.queryGoogleTranslate = function (word) {
    return getFullTranslate(word);
  };

  service.videoLibraryDictionary = function(word, callback){
    $http({
        method : "GET",
        url: 'https://api.elight.edu.vn/v3/translate?content=' + word
    }).then(function successCallback(res){
      callback(res);
    }, function errorCallback(res){
      callback(res);
      });
  }

  service.getPopupTime = function (callback) {
    $http({
      method: "GET",
      url: 'https://elight.edu.vn/extension-popup'
    }).then(function successCallback(res) {
      callback(res);
    }, function errorCallback(res) {
      callback(res);
    })
  };

  service.getShareNumber = (callback) => {
      callback(false, '0');
    // $.ajax({ url: `https://www.facebook.com/v2.9/plugins/share_button.php?app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FXBwzv5Yrm_1.js%3Fversion%3D42%23cb%3Dfc724308d23d5c%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff19e20ac6931598%26relation%3Dparent.parent&container_width=613&href=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fh%25E1%25BB%258Dc-ti%25E1%25BA%25BFng-anh-c%25C3%25B9ng-elight%2Fpdmlbmfblcdpblihlamlldplkpghhiio&layout=button_count&locale=en_US&mobile_iframe=true&sdk=joey`})
    // .then(function(data) {
    //   let a = $.parseHTML(data);
    //   let shareNumber = a[5].innerText.replace("Share", "");
    //   console.log(shareNumber);
    //   callback(true, shareNumber);
    // }, function(error) {
    //   callback(false, error);
    // })
  };

  service.contribute = function () {
    _gaq.push(['_trackEvent', 'EE Features', 'Contribution', 'open link']);
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSctUEPkJtK351xR3QSUMMdMsFrqE8AZayhoWvhmjFIZQE_AUg/viewform?usp=sf_link");
  };

  service.getVideoList = () => {
    let videoList = JSON.parse(localStorage.getItem("videoList"));
    if (videoList == undefined || videoList == null || videoList == []) {
      return fetchVideo().then((data) => {
        return data;
      })
    } else {
      setTimeout(function () {
        fetchVideo();
      });
      return Promise.resolve(videoList);
    };
  };

  function fetchVideo() {
    return fetch("https://api.elight.edu.vn/v3/list-video-library?skip=0&take=7&user_token=")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let videoList = [];
      for (var i = 0; i < data.data.newest_videos.length; i++) {
        let video = {
          title : data.data.newest_videos[i].title,
          description : data.data.newest_videos[i].description,
          poster :'https://api.elight.edu.vn/public/images/video/' + data.data.newest_videos[i].poster,
          url : `https://elight.edu.vn/hoc-tieng-anh-qua-video/${convertVietnameseToEnglishString(data.data.newest_videos[i].title)}/${data.data.newest_videos[i].id}`
        };
        videoList.push(video);
      };
      localStorage.setItem("videoList", JSON.stringify(videoList))
      return videoList;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function convertVietnameseToEnglishString(str) {
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    str= str.replace(/-+-/g,"-");
    str= str.replace(/^\-+|\-+$/g,"");

    return str;
  };

    service.getQuotes = function(callback) {
        $http({
            method: 'GET',
            url: 'http://elight.edu.vn/quotations/'
        }).then(function successCallback(res) {
            callback(res);
        }, function errorCallback(err) {
            callback(err);
        })
    }

    service.getNewsline = function(callback){
        $http({
            method: 'GET',
            url: 'https://api.elight.edu.vn/v3/news/get'
        }).then(function successCallback(res){
          callback(res);
        }, function errorCallback(err){
          callback(err);
        })
    };

    service.getGuestId = function(callback){
        $http({
            method: 'GET',
            url: 'http://elight.edu.vn/test-extension/'
        }).then(function successCallback(res) {
            callback(res);
        }, function errorCallback(err) {
            callback(err);
        })
    };

    service.syncGuestAndUserId = function(guest_id, user_token, callback){
      $http({
          method: 'POST',
          url : 'https://api.elight.edu.vn/v3/extension/sync?user_token=' + user_token + '&guest_id=' + guest_id
      }).then(function successCallback(res){
        callback(res);
      }, function errorCallback(err){
        callback(err);
      })
    };

  return service;
}
