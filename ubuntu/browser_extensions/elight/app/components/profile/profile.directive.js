'use strict';

angular.module('profile').directive('profileDetail', function() {
    return {
        scope: {
            login: '=',
            openFrom: '='
        },
        restrict: 'E',
        templateUrl: 'app/components/profile/profile-detail.template.html',
        controller: ['$scope', '$rootScope', '$localStorage', '$timeout', 'Upload', 'ProfileService','mainService','challenge.io.service', 'user.service', 'challenge.items.service',
        function($scope, $rootScope, $localStorage, $timeout, Upload, ProfileService, $service, socketService, userService, ChallengeItem) {
            var userSchool;
            $scope.localesMessage = profileLocales;
            $scope.init = function() {
                $scope.user = userService.fetch();
                $scope.enableUpdateProfile = false;
                $scope.user.username = $scope.user.username.substring(0, 7);
                $scope.userSchoolArea = $scope.user.schoolArea;
                userSchool = $scope.user.school || '';
                getUserSchoolArea();
                if ($scope.userSchoolArea) {
                    $scope.chooseArea($scope.userSchoolArea);
                }
            }

            function getUserSchoolArea() {
                $scope.schoolAreas = [];
                schoolList.forEach(function(element, index) {
                    $scope.schoolAreas.push(element.area);
                });
            }

            $scope.chooseArea = function(userSchoolArea) {
                var index = $scope.schoolAreas.indexOf(userSchoolArea);
                $scope.userSchoolArea = userSchoolArea;
                $scope.shoolInArea = schoolList[index].schools;
            }

            $scope.getValueOfSchool = function(school) {
                $scope.enableUpdateProfile = true;

                let seasonTimeStart = $localStorage.season.startTime - Date.now();
                let seasonTimeLeft = $localStorage.season.endingTime - Date.now();
                if (
                    userSchool &&
                    userSchool.id !== school.id &&
                    seasonTimeStart <= 0  &&
                    seasonTimeLeft > 0
                ) {
                    userSchool = typeof school !== 'object' ? JSON.parse(school) : school;
                    $scope.showPopupChangeSchool = true;
                } else {
                    $scope.user.school = typeof school !== 'object' ? JSON.parse(school) : school;
                }
            }

            $scope.cancelUpdate = function() {
                delete $scope.showPopupChangeSchool;
                $scope.enableUpdateProfile = false;
            }

            $scope.logout = function() {
                $(".modal-backdrop.in").hide();
                $rootScope.$broadcast('deny-invite');
                socketService.disconnect($localStorage.guest_id)
                    .then((res) => {
                        delete $scope.openConfirmLogout;
                        delete $scope.$parent.loginFromProfile;
                        delete $scope.user;
                        delete $scope.login;
                        delete $rootScope.loggedIn;
                        delete $rootScope.showWelcome;
        
                        delete $localStorage.warPlayerState;
                        delete $localStorage.auth;
                        delete $localStorage.rank;
                        delete $localStorage.schoolRank;
                        delete $localStorage.token_guest_id;
                        delete $localStorage.guest_id;
                        delete $localStorage.isSetUnit;
                        delete $localStorage.lastTimeGetVideos;
                        delete $localStorage.count;
                        localStorage.removeItem('war-win');
                        localStorage.removeItem('user');
                        $service.getGuestId(function(res){
                            if(res.data) $localStorage.guest_id = res.data;
                            $timeout(function() {
                                $('#profile_menu').modal('hide');
                                    $scope.$parent.logout();
                            }, 1000);
                            $localStorage.welcome = false;
                            $rootScope.showWelcome = 'intro';
                            location.reload();
                        })
                    })
            }

            $scope.checkNameLength = function(name) {
                if (name && name.length >= 8) {
                    $scope.messageErr = $scope.localesMessage[12][$rootScope.language] ;
                    $scope.enableUpdateProfile = false;
                }else {
                    $scope.messageErr = '';
                    $scope.enableUpdateProfile = true;
                }
            }

            $scope.updateProfile = function() {
                if (!$scope.user.username) {
                    $scope.messageErr = $scope.localesMessage[13][$rootScope.language];
                    $scope.enableUpdateProfile = false;
                }else if ($scope.user.username.length > 8) {
                    $scope.messageErr = $scope.localesMessage[12][$rootScope.language];
                    $scope.enableUpdateProfile = false;
                }
                else if (!$scope.user.school && $rootScope.language === 'vn') {
                    $scope.messageErr = 'Trường không được để trống';
                    $scope.enableUpdateProfile = false;
                }else if ($scope.enableUpdateProfile) {
                    var isUserReceiveReward;
                    ProfileService.updateUserInfo($localStorage.guest_id, $scope.user.username, $scope.user.avatar, $scope.user.school.id, $scope.user.school.school_name)
                        .then(function(userUpdated) {
                            if (userUpdated && userUpdated.code === 1) {
                                if (userUpdated.data.rewardAfterUpdate) {
                                    isUserReceiveReward = true;
                                }
                                return ProfileService.updateProfile($scope.user.username, $scope.user.school ? $scope.user.school.school_name : '', $localStorage.auth.user_token);
                            }
                            return;
                        })
                        .then(function(result) {
                            $scope.enableUpdateProfile = false;
                            if (result.data.code == 1) {
                                $scope.messageSuccess = $scope.localesMessage[14][$rootScope.language];
                                if (isUserReceiveReward && $rootScope.language === 'vn') {
                                    ChallengeItem.onOpenBonus('freeze', 1);
                                    ChallengeItem.onOpenBonus('unfreeze', 1);
                                    ChallengeItem.onOpenBonus('bomb', 1);
                                    ChallengeItem.onOpenBonus('health', 1);

                                    $timeout(function() {
                                        $scope.messageSuccess = 'Bạn đã nhận được bộ 4 item sau khi thêm trường học!'
                                    }, 1000);
                                }
                                $scope.user.schoolArea = $scope.userSchoolArea ? $scope.userSchoolArea : '';
                                userSchool = $scope.user.school;
                                delete $localStorage.schoolRank;
                                delete $localStorage.schoolmateRank;
                                delete $scope.showPopupChangeSchool;
                                delete $localStorage.warPlayerState;
                                delete $localStorage.schoolRankByTotalStudent;
                                delete $localStorage.allRank;
                                delete $localStorage.rank;

                                $localStorage.auth.display_name = $scope.user.username;
                                $localStorage.auth.avatar = $scope.user.avatar;
                                $localStorage.auth.school = $scope.user.school;
                                localStorage.setItem('user', JSON.stringify($localStorage.auth));

                                if($localStorage.warPlayerState){
                                    if($localStorage.warPlayerState.school){
                                        $localStorage.warPlayerState.school = $scope.user.school;
                                    }
                                    if($localStorage.warPlayerState.username){
                                        $localStorage.warPlayerState.username = $scope.user.username;
                                    }
                                }
                            }else {
                                $scope.messageErr = result.data.mgs;
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                            $scope.messageErr = $scope.localesMessage[15][$rootScope.language];
                        });
                }
            }

            $scope.showModalEditAvatar = function () {
                $scope.showModalCropImg = true;
            }

            $scope.closeModalEditAvatar = function() {
                $scope.showModalCropImg = false;
            }

            $scope.check_upload_avatar_fist = 0;
            $scope.upload = function (dataUrl, name) {
                if($scope.check_upload_avatar_fist == 1 ) {
                    return false;
                }

                $scope.check_upload_avatar_fist = 1;
                $scope.loading_avatar = true;
                $scope.disable = true;
                $rootScope.loading_avatar = true;

                ProfileService.updateAvatar(dataUrl, $scope.user.user_token)
                    .then(function(result) {
                        $scope.showModalCropImg = false;
                        if (result.data.code === 1) {
                            $('#user_avatar').attr('src', dataUrl);
                            $scope.user.avatar = dataUrl;
                            var user = $scope.user;
                            user.avatar = result.data.data;
                            localStorage.setItem('user', JSON.stringify(user));
                            $localStorage.auth.avatar = user.avatar;
                            delete $rootScope.loading_avatar;
                            $scope.messageSuccess = $scope.localesMessage[16][$rootScope.language];
                        } else {
                            delete $rootScope.loading_avatar;
                            $scope.messageErr = result.data.mgs;
                        }
                    }).catch(function(err) {
                        delete $rootScope.loading_avatar;
                        $scope.showModalCropImg = false;
                        $scope.messageErr = $scope.localesMessage[17][$rootScope.language];
                    });
            }

            $scope.confirmLogout = function() {
                $scope.openConfirmLogout = true;
            }

            $scope.closeConfirmLogout = function() {
                $scope.openConfirmLogout = false;
            }
        }]
    }
})
