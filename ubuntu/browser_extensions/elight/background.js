OneSignal.init({appId: "1cc66608-dc19-4703-bd34-bd072751fba0",
		googleProjectNumber: "446782418269"});

OneSignal.addListenerForNotificationOpened(function(data) {
		console.log("Received NotificationOpened:");
		console.log(data);
});

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (details.method==="POST" && /facebook\.com.+\/dialog\/share\/submit/.test(details.url) && details.requestHeaders) {
			let isShared = details.requestHeaders.some(header => {
				return (header.name==='Referer' && (header.value.indexOf(chrome.runtime.id)!==-1))
			});

			if (isShared) {
				localStorage.setItem('isShared', Date.now());
				console.log("Shared");
			}
		}
	},
	{urls: ["<all_urls>"]},
	["requestHeaders"]
);

chrome.webRequest.onHeadersReceived.addListener(details => {
	for (var i = 0; i < details.responseHeaders.length; i++) {
		if (details.responseHeaders[i].name.toLowerCase() === "content-security-policy") {
			details.responseHeaders[i].value = details.responseHeaders[i].value.replace("media-src 'none';", "media-src *.google.com; ");
			arr = details.responseHeaders[i].value.split(" ");
			for (var j = 0; j < arr.length; j++) {
				if (arr[j].indexOf("connect-src") !== -1) {
					arr[j] += " *.google.com "
					details.responseHeaders[i].value = arr.join(" ");
					break;
				};
			};
			break;
		};
	};
	return {
		responseHeaders: details.responseHeaders
	}
}, {
	urls: ['<all_urls>']
}, ["blocking", "responseHeaders"])

chrome.runtime.onMessage.addListener(function (mes, sender, callback) {
	if (mes === 'request login information') {
		// let auth = localStorage.getItem('auth');
		// callback(auth);
	} else if (mes.word && mes.meaning) {
		let newWord = {
			word : mes.word.toLowerCase(),
			reviewDate : Date.now() + 86400000,
			EF : 1.9,
			Q : 0,
			I : 1,
			meaning : mes.meaning
		}
		let wordReview = JSON.parse(localStorage.getItem('wordReview'));
		if (wordReview == null || wordReview == undefined) {
			wordReview = [];
		};
		if (wordReview.length > 50) {
			callback("full");
		} else {
			if (_.findIndex(wordReview, {word : newWord.word}) === -1) {
				wordReview.splice(_.sortedIndex(wordReview, newWord, 'reviewDate'), 0, newWord);
				localStorage.setItem('wordReview', JSON.stringify(wordReview));
				callback("done");
				return true;
			} else {
				callback("Already saved")
				return 'Already saved';
			}
		}
	} else if (mes === "GetGA-Cookie") {
		let allCookies = document.cookie.split(';');
		let cookie;
		for (var i = 0; i < allCookies.length; i++) {
			if (allCookies[i].indexOf("__utma=") == 0) {
				cookie = allCookies[i].split('=');
				break
			};
		}
		callback(cookie[1]);
	}
});
