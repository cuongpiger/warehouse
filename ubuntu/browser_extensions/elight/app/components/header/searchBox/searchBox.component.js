'use strict';

angular.module("header.searchBox").component("searchBox", {
	templateUrl : 'app/components/header/searchBox/searchBox.template.html',
	controller	:	["mainService", "$localStorage", function seachBoxController($service, $localStorage) {
		let self = this;
	 	let selectedRow = -1;
		let resultsLength = 0;
		let textBox = $('input#search-input');
	    self.listSearch = [];

	    textBox.click(function () {
            sendGa($localStorage.auth, 'Search', 'Click', 'Search_use');
        });

	    $("#search-input").keyup(function (event) {
            console.log(event);
            let key_word = $(this).val();

	      $service.search(key_word, function (response) {
	        if (response.status === 200) {
	          $('#search-suggestion-pad').attr("style", "display: block !important");
	          self.listSearch = _.filter(response.data[1], function (number, key) {
	            return key < 5
	          });
	          if (_.contains(suggest_search, key_word.replace(" ", ""))) {
	            self.listSearch.unshift("tieng anh elight");
	          }
	          resultsLength = self.listSearch.length;
	        } else {
	          self.listSearch = [];
	          $('#search-suggestion-pad').attr("style", "display: none !important");
	        }
	      });
	      if (event.keyCode === 13) {
	        self.redirect(key_word)
	      }
	    });
	    //moving up and down using arrow
	    $("#search-input").keydown(function (event) {
	      let keyCode = event.keyCode;
	      if ((keyCode !== 38) && (keyCode !== 40)) {
	      } else {
	        if (keyCode === 38) {
	          if (selectedRow !== -1) {
	            document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "");
	          }
	          selectedRow--;
	          if (selectedRow < 0) {
	            selectedRow = resultsLength - 1;
	          }
	        } else {
	          if (selectedRow !== -1) {
	            document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "");
	          }
	          selectedRow++;
	          if (selectedRow >= resultsLength) {
	            selectedRow = 0;
	          }
	        }
	        let row = document.getElementById("auto-suggest-row" + selectedRow);
	        row.setAttribute("class", "selected");
	        textBox.value = row.textContent;
	      }
	    });
	    //google search when press enter
	    self.redirect = function (key) {
	      _gaq.push(['_trackEvent', "EE Search", 'Search', key]);
	      window.location.href = "https://www.google.com/search?sourceid=chrome&ie=utf-8&oe=utf-8&aq=t&hl=en-US&q=" + key;
	    };
	    //remove search suggestion when click outside the pad
	    $('body').click(function () {
	      $('#search-suggestion-pad').attr("style", "display: none !important");
	    });
		}
	]
});
