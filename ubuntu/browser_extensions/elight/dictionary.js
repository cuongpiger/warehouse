var audioObjArr = [];
let detectedLanguage;
function shiftLeftOrRightThenSumOrXor(num, opArray) {
	return opArray.reduce((acc, opString) => {
		var op1 = opString[1];	//	'+' | '-' ~ SUM | XOR
		var op2 = opString[0];	//	'+' | '^' ~ SLL | SRL
		var xd = opString[2];	//	[0-9a-f]

		var shiftAmount = hexCharAsNumber(xd);
		var mask = (op1 == '+') ? acc >>> shiftAmount : acc << shiftAmount;
		return (op2 == '+') ? (acc + mask & 0xffffffff) : (acc ^ mask);
	}, num);
}

function hexCharAsNumber(xd) {
	return (xd >= 'a') ? xd.charCodeAt(0) - 87 : Number(xd);
}

function transformQuery(query) {
	for (var e = [], f = 0, g = 0; g < query.length; g++) {
	  var l = query.charCodeAt(g);
	  if (l < 128) {
		e[f++] = l;					//	0{l[6-0]}
	  } else if (l < 2048) {
		e[f++] = l >> 6 | 0xC0;		//	110{l[10-6]}
		e[f++] = l & 0x3F | 0x80;	//	10{l[5-0]}
	  } else if (0xD800 == (l & 0xFC00) && g + 1 < query.length && 0xDC00 == (query.charCodeAt(g + 1) & 0xFC00)) {
		//	that's pretty rare... (avoid ovf?)
		l = (1 << 16) + ((l & 0x03FF) << 10) + (query.charCodeAt(++g) & 0x03FF);
		e[f++] = l >> 18 | 0xF0;		//	111100{l[9-8*]}
		e[f++] = l >> 12 & 0x3F | 0x80;	//	10{l[7*-2]}
		e[f++] = l & 0x3F | 0x80;		//	10{(l+1)[5-0]}
	  } else {
		e[f++] = l >> 12 | 0xE0;		//	1110{l[15-12]}
		e[f++] = l >> 6 & 0x3F | 0x80;	//	10{l[11-6]}
		e[f++] = l & 0x3F | 0x80;		//	10{l[5-0]}
	  }
	}
	return e;
}

function normalizeHash(encondindRound2) {
	if (encondindRound2 < 0) {
		encondindRound2 = (encondindRound2 & 0x7fffffff) + 0x80000000;
	}
	return encondindRound2 % 1E6;
}

function calcHash(query, windowTkk) {
	//	STEP 1: spread the the query char codes on a byte-array, 1-3 bytes per char
	var bytesArray = transformQuery(query);

	//	STEP 2: starting with TKK index, add the array from last step one-by-one, and do 2 rounds of shift+add/xor
	var d = windowTkk.split('.');
	var tkkIndex = Number(d[0]) || 0;
	var tkkKey = Number(d[1]) || 0;

	var encondingRound1 = bytesArray.reduce((acc, current) => {
		acc += current;
		return shiftLeftOrRightThenSumOrXor(acc, ['+-a', '^+6'])
	}, tkkIndex);

	//	STEP 3: apply 3 rounds of shift+add/xor and XOR with they TKK key
	var encondingRound2 = shiftLeftOrRightThenSumOrXor(encondingRound1, ['+-3', '^+b', '+-f']) ^ tkkKey;

	//	STEP 4: Normalize to 2s complement & format
	var normalizedResult = normalizeHash(encondingRound2);

	return normalizedResult.toString() + "." + (normalizedResult ^ tkkIndex)
}

function generateGoogleTTSLink(q, tl, tkk) {
	var tk = calcHash(q, tkk);
	return `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&client=t&ttsspeed=1&tl=${tl}&tk=${tk}&q=${encodeURIComponent(q)}&textlen=${q.length}`;
}

function generateGoogleTSLLink(q, tkk) {
	var tk = calcHash(q, tkk);
	return `https://translate.googleapis.com/translate_a/single?client=t&sl=auto&tl=vi&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&ssel=0&tsel=4&kc=0&tk=${tk}&q=${encodeURIComponent(q)}`
}

// var TKK = window.TKK;
var TKK = "416330.2969107344";

function getRawTranslate(q) {
	var link = generateGoogleTSLLink(q, TKK);
	return new Promise((resolve, reject) => {
		$.ajax({ url: link})
		.then(function(data) {
			resolve(data);
		}, function(error) {
			console.log(error);
			resolve(null);
		})
	})
};

function getFullTranslate(word) {
	return new Promise((resolve, reject) => {
		getRawTranslate(word).then((raw) => {
			try {
				try {
					translated = raw[0] ? raw[0] : "";
					if (translated) {
						let translated1 = "";
						for (var i=0; i<translated.length; i++) if (translated[i][0]) translated1+=translated[i][0];
						translated = translated1;
					}
				} catch (e) {translated=""}
				try {meaning = raw[1][0] ? raw[1][0][1][0] : ""; } catch (e) {meaning=null}
				try {type = raw[1][0] ? raw[1][0][0] : ""; } catch (e) {type=null}
				try {phonetic = raw[0][1] ? raw[0][1][3] : ""; } catch (e) {phonetic=null}
				examples = [];
				if (raw[12]) {
					for (var i=0; i<raw[12].length; i++) {
						for (var j=0; j<raw[12][i][1].length; j++) {
							if (raw[12][i][1][j][2]) {
								examples.push(raw[12][i][1][j][2])
							}
						}
					}
				};
				// console.log(word);
				// console.log(word.length);
				let stringArray = [];
				if (word.length > 200) {
					let wordList = word.split(" ");
					let concatWord = "";
					let i = 0;
					while (i < wordList.length) {
						while (i < wordList.length && (concatWord.length + wordList[i].length) < 200) {
							concatWord = concatWord + wordList[i] + " ";
							i++;
						};
						stringArray.push(concatWord);
						concatWord = "";
					};
				} else {
					stringArray.push(word);
				};
				let audioArray = [];
				for (var i = 0; i < stringArray.length; i++) {
					let audio = generateGoogleTTSLink(stringArray[i], raw[2], TKK);
					let audioObj = new Audio(audio);
					audioObj.load();
					audioArray.push(audioObj);
				};
				detectedLanguage = raw[2];

				let result = {translated, phonetic, type, meaning, audioArray, examples, word};
				resolve(result);
			}
			catch (e) {
				resolve(null);
			}
		});
	});
}

function getTrimmedSelection() {
	var selection = window.getSelection();
    var sel = window.getSelection && window.getSelection();
	if (sel && sel.rangeCount > 0) {
        var coordinate = selection.getRangeAt(0).getBoundingClientRect();
        selection = String(selection).replace(/^\s+|\s+$/g, '');
        return {selection, coordinate}
	} else {
		return false;
	}

}

function getWord(word) {
	return new Promise(function (resolve, reject) {
		url = `https://akira-extension.firebaseio.com/${word.toLowerCase()}.json`;
		fetch(url)
		.then(function (resp) {
			if (!resp.ok) {
				resolve(null);
			};
			return resp.json()
		})
		.then(function (json) {
			resolve(json);
		})
		.catch(function (err) {
			console.log(err);
			resolve(null);
		});
	});
}

function showDict(word_json) {
	if (!word_json) {
		return;
	};
	if (word_json.phonetic == "" || word_json.phonetic == null || word_json.phonetic == undefined) {
		word_json.phonetic = "";
	} else {
		word_json.phonetic = "/" + word_json.phonetic + "/";
	};
	let dictionary_modal = document.createElement('div');
	dictionary_modal.id = 'dictionary_modal';
	if (word_json.word.split(" ").length <= 1 && detectedLanguage == 'en') {
		dictionary_modal.innerHTML = `
			<div class="wordAndSave">
				<div class="word">${word_json.word}</div>
				<div class="save_btn">
					<i class="fa fa-star-o icon_star" aria-hidden="true"></i>
				</div>
			</div>
			<div class="sound">
				<div class="audio">
					<i class="fa fa-volume-up" aria-hidden="true"></i>
				</div>
			</div>
			<div class="meaning">
				<div class="meanings">
					${word_json.translated || ""}
				</div>
				<div class="types">
					${word_json.type || ""}
				</div>
				<div class="examples"></div>
			</div>
		`;

		for (var i = 0; i < word_json.examples.length; i++) {
			let example = document.createElement('div');
			example.className = "example";
			example.innerHTML = word_json.examples[i];
			dictionary_modal.querySelector('.examples').appendChild(example);
		};

		dictionary_modal.querySelector(".save_btn").addEventListener('click', function () {
			if (dictionary_modal.querySelector(".fa-star-o")) {
				dictionary_modal.querySelector(".save_btn").removeChild(dictionary_modal.querySelector(".icon_star"));
				dictionary_modal.querySelector(".save_btn").innerHTML = `<i class="fa fa-star icon_star" aria-hidden="true"></i>`
				saveWord(word_json.word, word_json.translated);
			};
		});
	}	else if (word_json.word.split(" ").length <= 1 && detectedLanguage != 'en') {
		dictionary_modal.innerHTML = `
			<div class="wordAndSave">
				<div class="word">${word_json.word}</div>
			</div>
			<div class="sound">
				<div class="audio">
					<i class="fa fa-volume-up" aria-hidden="true"></i>
				</div>
			</div>
			<div class="meaning">
				<div class="meanings">
					${word_json.translated || ""}
				</div>
				<div class="types">
					${word_json.type || ""}
				</div>
				<div class="examples"></div>
			</div>
		`;

		for (var i = 0; i < word_json.examples.length; i++) {
			let example = document.createElement('div');
			example.className = "example";
			example.innerHTML = word_json.examples[i];
			dictionary_modal.querySelector('.examples').appendChild(example);
		};
	} else if (word_json.word.split(" ").length <= 5) {
		dictionary_modal.innerHTML = `
			<div class="wordAndSave">
				<div class="word">${word_json.word}</div>
			</div>
			<div class="sound">
				<div class="audio">
					<i class="fa fa-volume-up" aria-hidden="true"></i>
				</div>
			</div>
			<div class="meaning">
				<div class="meanings">
					${word_json.translated || ""}
				</div>
			</div>
		`;
	} else {
		dictionary_modal.innerHTML = `
			<div class="sound">
				<div class="audio">
					<i class="fa fa-volume-up" aria-hidden="true"></i>
				</div>
			</div>
			<div class="meaning">
				<div class="meanings">
					${word_json.translated || ""}
				</div>
			</div>
		`;
	}

	dictionary_modal.querySelector(".audio").addEventListener('click', function () {
		audioObjArr = word_json.audioArray;
		var delay = 0;
		for (let i=0; i<word_json.audioArray.length-1; i++) {
			delay+= word_json.audioArray[i].duration-0.5;
			setTimeout(function () {
				word_json.audioArray = audioObjArr;
				if (word_json.audioArray[i+1]) {
					word_json.audioArray[i+1].play();
				}
			}, delay*1000);
		}
		word_json.audioArray[0].play();
	});

	return dictionary_modal;
}

let meta;
function showIcon(selection, mousePos) {
	let dictionaryContainer = document.createElement('div');
	dictionaryContainer.id = "dictionaryContainer";
	let shadowDictionary = dictionaryContainer.attachShadow({mode : 'open'});
	shadowDictionary.innerHTML = `
		<link href=${chrome.runtime.getURL("css/font-awesome.min.css")} type="text/css" rel="stylesheet">
		<link href=${chrome.runtime.getURL("css/content-script.css")} type="text/css" rel="stylesheet">

		<button class="btn bufferIcon" style="left: ${mousePos.x + 20 - selection.coordinate.left}px; top: ${mousePos.y + 10 - selection.coordinate.bottom}px"></button>
	`;
	$(dictionaryContainer).css({'position' : 'absolute', 'top' : selection.coordinate.bottom + document.documentElement.scrollTop + "px", 'left' : selection.coordinate.left + document.documentElement.scrollLeft - 10 + "px"});
	$(dictionaryContainer).on('click', function (event) {
		event.stopPropagation();
		if (shadowDictionary.querySelector(".bufferIcon")) {
			shadowDictionary.removeChild(shadowDictionary.querySelector(".bufferIcon"));
		};
		meta = document.createElement('meta');
		meta.name = "referrer";
		meta.content = "no-referrer";
		document.head.appendChild(meta);
		//send data to Google Analytics
		chrome.runtime.sendMessage("GetGA-Cookie", function (res) {
			fetch(`https://www.google-analytics.com/collect?v=1&tid=UA-47075723-19&cid=${res}&t=event&ec=EE%20Features&ea=Univesal%20Dictionary&el=Search`)
			.then((data) => {

			})
			.catch((err) => {
				console.log(err);
			});
		});

		getFullTranslate(selection.selection)
		.then(showDict)
		.then((element) => {
			shadowDictionary.appendChild(element);
			document.head.removeChild(meta);
		});
		$(dictionaryContainer).off('click');
	});
	document.body.appendChild(dictionaryContainer);
};

function saveWord(word, meaning) {
	chrome.runtime.sendMessage({word: word, meaning: meaning}, function (res) {
		console.log(res);
	});
};

window.addEventListener('click', function(event) {
	if (event.target.id !== "dictionaryContainer") {
		if (document.querySelector("#dictionaryContainer")) {
			document.body.removeChild(document.querySelector("#dictionaryContainer"));
			if (document.head.contains(meta)) {
				document.head.removeChild(meta);
			};
			if (audioObjArr && audioObjArr.length>0) {
				for (var i=0; i<audioObjArr.length; i++) {
					audioObjArr[i].pause();
				};
				audioObjArr = [];
			};
		};
	};
	let selection = getTrimmedSelection();
	if (selection.selection) {
		let mousePos = {
			x : event.clientX,
			y : event.clientY
		};
		showIcon(selection, mousePos);
	};
});

// let checkExtDiv = document.createElement('div');
// checkExtDiv.id = "elight_extension_has_been_installed";
// chrome.runtime.sendMessage("request login information", function (res) {
// 	if (res) {
// 		checkExtDiv.dataset.email = res;
// 	};
// 	document.body.appendChild(checkExtDiv);
// })
