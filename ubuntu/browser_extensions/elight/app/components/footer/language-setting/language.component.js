"use strict";

angular.module("footer.setting").component("languageSetting", {
	templateUrl : "app/components/footer/language-setting/language.template.html",
	controller : ["$scope", "$localStorage", "$rootScope",
		function languageSettingController($scope, $localStorage, $rootScope) {
        let self = this;

        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
        self.languageSelected = $rootScope.language;
        self.openLanguageModal = function() {
            $('#language_modal').modal('show');
        };
        self.selectLanguage = function(language) {
            self.languageSelected = language;
            applyScope($scope);
        };

        self.confirmSelectLanguage = function(language){
            $localStorage.language = language;
            $rootScope.language = $localStorage.language;
            applyScope($scope);
            window.location.reload();
        }
      }
	]
});
