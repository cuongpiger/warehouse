"use strict";
angular.module("wordMemo.service", [])
	.service("wordMemo", wordSuperMemoService );
wordSuperMemoService.$inject = ["$localStorage", "$q", '$http'];
function wordSuperMemoService ($localStorage, $q, $http) {
    let service = {};
    const EF 	= 2.5;
    const A 	= 50; // theo công thức: thì set Q = A
    const I		= 1;
    //variable "deltaT" time now - updated_at follow by day

    /** TODO Công thức
     * t = 0        | I = 0
     *              | EF  = 2.5
     *              | A   = 50
     *
     * t = detalT   |   I = theo A
     *              |   EF  += 0.02
     *              |   reviewDate = EF*I tính theo ngày
     *              |   A   += detalT * (A/20)
     * I = theo A
     * I = 1 => 0 <=  A < 60
     * I = 2 => 60 <= A < 70
     * I = 3 => 70 <= A < 80
     * I = 4 => 80 <= A < 90
     * I = 5 => 90 <= A
     */

    /**
	 * TODO save word for word reviews
     * @param word
     * @param meaning
     * @param image
     * @param audio
     * @param phonetic
     * @param id
     */
    service.storeWord = function (learnedWord) {
        let deferred = $q.defer();
        let results = [];
        _.each(learnedWord, function(val){
            let word = val.word;
            let meaning = val.translate;
            let image = val.image;
            let audio = val.audio;
            let phonetic = val.phonetic;
            let id = val.unitId;
            let timeCurrent = Date.now();
            let newWord = {
                word		: word,
                meaning		: meaning,
                reviewDate 	: Date.now() + (2.5 * 86400000),
                image 		: image,
                audio 		: audio,
                phonetic 	: phonetic,
                updated_at  : timeCurrent,
                EF 			: EF,
                Q 			: A,
                I 			: I,
                unitId		: id
            };

            service.existWordReview();

            let wordReview = $localStorage.wordReview;
            // check word exist in wordReview
            let existInWordReview = _.find(wordReview, function (value) {
                return value.word === word
            });
            let result;
            if (!existInWordReview) {
                $localStorage.wordReview.push(newWord);
                result = newWord
            } else {
                //Update review Date
                let detalT;
                if (existInWordReview.updated_at) {
                    detalT = (Date.now() - existInWordReview.updated_at) / 1000 / 60 / 60 / 24;
                } else {
                    detalT = 43200000 / 1000 / 60 / 60 / 24;
                }
                existInWordReview.EF            += 0.02;
                let A                           = existInWordReview.Q + (detalT * (existInWordReview.Q / 20));
                existInWordReview.Q             = A;
                existInWordReview.I             = service.getIForSuperMemo(A);
                existInWordReview.reviewDate    = Date.now() + (existInWordReview.EF * existInWordReview.I * 86400000);
                existInWordReview.updated_at    = Date.now();
                result = existInWordReview
            }
            results.push(result)
        });
        deferred.resolve(results);
        return deferred.promise;
    };
    service.existWordReview = function () {
        let wordReview = $localStorage.wordReview;
        if (wordReview === null || wordReview === undefined) {
            $localStorage.wordReview = [];
		}
    };
    service.getIForSuperMemo = function (A) {
        let variableI ;
        if (0 <= A && A < 60) {
            variableI = 1;
        } else if (60 <= A && A < 70) {
            variableI = 2;
        } else if (70 <= A && A < 80) {
            variableI = 3;
        } else if (80 <= A && A < 90) {
            variableI = 4;
        } else if  (90 <= A ) {
            variableI = 5;
        } else {
            variableI = 5;
        }
        return variableI;
    };
    service.syncWords = function (user_token, words) {
        let deferred = $q.defer();
        $http({
            method : apis.storeWordByUser.method,
            url : apis.storeWordByUser.url,
            data : {
                user_token : user_token,
                words : words
            }
        }).then(function(res) {
            return res.data;
        }).then(function (data) {
            deferred.resolve(data);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.getWordByUser = function (user_token) {
        let deferred = $q.defer();
        $http({
            method : apis.getWordByUser.method,
            url : apis.getWordByUser.url,
            params : {
                user_token : user_token
            }
        }).then(function(res) {
            return res.data;
        }).then(function (data) {
            deferred.resolve(data);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return service;
}

