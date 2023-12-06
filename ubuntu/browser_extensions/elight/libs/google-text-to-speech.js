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
 	return `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&client=t&ttsspeed=1&tl=${tl}&tk=${tk}&q=${q}&textlen=${q.length}`;
}

function generateGoogleTSLLink(q, tkk) {
	var tk = calcHash(q, tkk);
	return `https://translate.google.com/translate_a/single?client=t&sl=auto&tl=vi&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&ssel=0&tsel=4&kc=0&tk=${tk}&q=${encodeURIComponent(q)}`
}

// var TKK = window.TKK;
var TKK = "416330.2969107344";

function getRawTranslate(q) {
	var link = generateGoogleTSLLink(q, TKK);
	return new Promise((resolve, reject) => {
		$.ajax({ url: link})
		.then(function(data) {
			// console.log(data);
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
				// console.log(stringArray);
				let audioArray = [];
				for (var i = 0; i < stringArray.length; i++) {
					let audio = generateGoogleTTSLink(stringArray[i], raw[2], TKK);
					let audioObj = new Audio(audio);
					audioObj.load();
					audioArray.push(audioObj);
				};
				// console.log(audioArray);
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
