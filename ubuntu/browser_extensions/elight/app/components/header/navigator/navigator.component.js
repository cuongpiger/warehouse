'use strict';

angular.module("header.navigator").component("navigator", {
	templateUrl : 'app/components/header/navigator/navigator.template.html',
	controller	:	['$localStorage',
		function navigatorController($localStorage) {

	    this.logo = $localStorage.auth && ($localStorage.auth.actived_code.count_use_code > 0 || $localStorage.auth.actived_code.count_user_courses > 0) ? config_url.url_logo_paid_user : config_url.url_logo;
			this.imageUrl_logo = config_image_url.elight_logo;
			//track the amount of click on logo
			this.tracking = function () {
				_gaq.push(['_trackEvent', 'Elight Extension', 'Link Logo', "Logo"]);
			};

	    //get topsites for nav menu
	    chrome.topSites.get(function (data) {
	      let topSites = _.filter(data, function (number, key) {
          return key < 10
	      });
	      let visited = $("#topsites_menu");
	      let length = topSites.length;
	      for (var i = 0; i < length; i++) {
	        let link_icon = "https://www.google.com/s2/favicons?domain=" + topSites[i].url;
	        let hr = i === 9 ? '' : '<hr>';
	        visited.append('<div>' +
	        '<a class="elight_visited_link" href="' + topSites[i].url + '"> ' +
	          '<i style="background-image:url(' + link_icon + ');background-size:cover;"></i>' + topSites[i].title +
	        '</a>' +
	        '</div>')
	      }
	    });
			//toggle topsite menu
			utils.resetClickHandler($('#lnk_topsites'), function (e) {
					e.stopPropagation();
					_gaq.push(['_trackEvent', config_app + ' Click', 'top_sites', 'top_sites']);
					$('#topsites_menu').toggle(200);
					$('#share_menu').fadeOut(200);
					$('#support_menu').fadeOut(200);
					$('#setting_menu').fadeOut(200);
			});

			//update button
			this.is_update = localStorage._wupdate == 'true' ? true : false;
			this.update = function () {
				chrome.tabs.create({url: "chrome://extensions/"});
			};

			//hide nav menu when mouse leave
			function hideMenu() {
				$('#topsites_menu').fadeOut(200);
				$('#share_menu').fadeOut(200);
				$('#support_menu').fadeOut(200);
			}

			//add listener to nav
	    $('nav').off('mouseleave');
	    $('nav').on('mouseleave', hideMenu);
		}]
});
