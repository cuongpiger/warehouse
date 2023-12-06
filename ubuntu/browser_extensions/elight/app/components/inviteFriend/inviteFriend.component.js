'use strict';

angular.module('inviteFriend').component('inviteFriend', {
    templateUrl: 'app/components/inviteFriend/inviteFriend.template.html',
    controller: ['$scope', '$rootScope', '$localStorage', 'inviteFriendService', '$timeout','challenge.io.service',
        function($scope, $rootScope, $localStorage, inviteFriendService, $timeout, socketService) {
        let self = this;
        // $rootScope.random = 4;
        // $rootScope.invite = true;
        function changePrgress(new_number){
            self.openedGift = false;
            self.new_inivte_num = new_number;
            if(self.new_inivte_num > $localStorage.old_invite_gift_num || !$localStorage.old_invite_gift_num){
                if(new_number == 1 || new_number == 3 || new_number == 6 || new_number == 10){
                    var old_number = new_number-1;
                    self.inviteProgres = getProgress(old_number);
                    $timeout(1000).then(function(res){
                        self.inviteProgres.percentage = 100;
                        return $timeout(1000);
                    }).then(function(res){
                        self.openGift(new_number);
                        return $timeout(500);
                    })
                    $localStorage.old_invite_gift_num = self.new_inivte_num;
                }else{
                    self.inviteProgres = getProgress(new_number);
                    $localStorage.old_invite_gift_num = self.new_inivte_num;
                }
            }else{
                self.inviteProgres = getProgress(new_number);
                $localStorage.old_invite_gift_num = self.new_inivte_num;
            }
        }
        self.openInviteFriend = function(){
            if (self.notiReceiveGift) {
                _gaq.push(['_trackEvent', 'INVITE', 'Open invitation', 'yes']);
            }else {
                _gaq.push(['_trackEvent', 'INVITE', 'Open invitation', 'no']);
            }

            // if ($localStorage.giftReceived.length > 0) {
            //     changePrgress(self.userInvited);
            // }
            if (!self.userInvited) {
                self.userInvited = 0;
            }
            changePrgress(self.userInvited);
            $rootScope.random = 4;
            $rootScope.invite = true;
            if (!$localStorage.firstTimeDisplayInvite) {
                $localStorage.firstTimeDisplayInvite = true;
                self.notiReceiveGift = false;
            }
        }
        self.bookUrl = "https://api.elight.edu.vn/public/uploads/files/speak%20out-elementary-student%20book.pdf";
        self.closeGift = function(){
            self.inviteProgres = getProgress(self.new_inivte_num);
            self.openedGift = false;
        };
        self.openGift = function(invite_num){
            self.giftMessage = "Click để nhận quà";
            if (invite_num == 1) {
                self.classGiftBox = 'blue_gift_box';
            }else if (invite_num == 3) {
                self.classGiftBox = 'pink_gift_box';
            }else if (invite_num == 6) {
                self.classGiftBox = 'green_gift_box';
            }else if (invite_num == 10) {
                self.classGiftBox = 'orange_gift_box';
            }
            self.openedGift = true;
            self.showGift = false;
            self.giftType = invite_num;
            var userReceiveGift = invite_num + '_' + $localStorage.guest_id;
            _gaq.push(['_trackEvent', 'INVITE', 'Open gift', userReceiveGift]);
        };
        self.closeInvite = function() {
            $rootScope.random = 1;
            $rootScope.invite = false;
            $rootScope.isQuote = false;
            $rootScope.isLearn_word = true;
            $rootScope.elightube = false;
            $rootScope.topic = false;
        };
        self.downloadBook = function(){
            receiveGift(3);
        };
        function bonusItems(){
            socketService.openInviteChest($localStorage.guest_id)
                .then(function(response){
                    if(response.code == 1){
                        if($localStorage.ability){
                            $localStorage.ability = {
                                freeze : $localStorage.ability.freeze + 3,
                                unfreeze : $localStorage.ability.unfreeze + 3,
                                boom : $localStorage.ability.boom + 3,
                                heart : $localStorage.ability.heart + 3
                            }
                        }else{
                            $localStorage.ability = {
                                freeze : 3,
                                unfreeze :3,
                                boom : 3,
                                heart : 3
                            }
                        }
                    }
                    receiveGift(1);
                })
                .catch(function(err){
                    console.log(err);
                })
        }
        function showGift(){
            var giftType = self.giftType;
            self.showGift = true;
            if (giftType == 1) {
                bonusItems();
            }else if (giftType == 3) {

            }else if (giftType == 6) {
                self.openListTopic();
            }else if (giftType == 10) {

            }
        }
        function animateProgress(){
            $timeout(1000).then(function(res){
                self.inviteProgres.percentage = 0;
                return $timeout(1000);
            }).then(function(res){
                self.inviteProgres = getProgress(self.new_inivte_num);
                return $timeout(500);
            })
        }
        self.giftMessage = "Click để nhận quà";
        function unboxEffect() {
            animateProgress();
            $('#gift-type').addClass('shake').delay(500).queue(function() {
                self.giftMessage = "Bạn đã nhận được quà";
                $(this).removeClass("close_gift").addClass('open_gift');
            });
            $timeout(function() {
                showGift();
            }, 1300);
        }
        self.unboxGift = function() {
            unboxEffect();
            var userReceiveGift = self.giftType + '_' + $localStorage.guest_id;
            _gaq.push(['_trackEvent', 'INVITE', 'Unbox gift', userReceiveGift]);
        }
        // init();
        self.guest_id = $localStorage.guest_id;
        self.copyLink = function(){
            $timeout(function(){
                var copyTextarea = document.querySelector('.js-copytextarea');
                copyTextarea.select();
                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'Copying text was successful' : ' Copying text was unsuccessful';
                    self.copyMsg = msg;
                    $timeout(function(){
                        self.copyMsg = '';
                    }, 1500);
                } catch (err) {
                    console.log('Oops, unable to copy');
                }
            }, 200)
            var guest_id = $localStorage.guest_id;
            _gaq.push(['_trackEvent', 'INVITE', 'copy link', guest_id]);
        }

        self.likeGift = function(giftType) {
            $localStorage.giftLiked.push(giftType);
            var gift_type = giftType.toString();
            _gaq.push(['_trackEvent', 'INVITE', 'like gift', gift_type]);
            if (giftType == 1) {
                self.likeGift_1 = true;
            }else if (giftType == 3) {
                self.likeGift_3 = true;
            }else if (giftType == 6) {
                self.likeGift_6 = true;
            }else if (giftType == 10) {
                self.likeGift_10 = true;
            }
        }
        init();
        function init(){
            if($localStorage.call_invite_date){
                var old_date = $localStorage.call_invite_date;
                var new_date = getDate();
                var minus_day = minusDayDate(old_date, new_date);
                if(minus_day <= 0){
                }else{
                    getInviteByUserId();
                }
            }else{
                getInviteByUserId();
            }
            if (!$localStorage.giftReceived) {
                $localStorage.giftReceived = [];
            }

            if (!$localStorage.giftOpenned) {
                $localStorage.giftOpenned = [];
            }

            if (!$localStorage.giftLiked) {
                $localStorage.giftLiked = [];
            }

            if (!$localStorage.inviteStage) {
                $localStorage.inviteStage = 0;
            }

            if (!$localStorage.firstTimeDisplayInvite) {
                self.notiReceiveGift = true;
            }
            checkGiftLiked();
            // invite();
        }
        /*
        * count down time
        */
        function countDownNextGift() {
            let nextGift = localStorage.getItem("next-gift");
            if (nextGift == null || nextGift == undefined) {
                nextGift = Date.now() + 60*60*24*30*1000;
                localStorage.setItem("next-gift", nextGift);
            }
            let remainingTime = (nextGift - Date.now())/1000;
            if (remainingTime > 0) {
                let day = Math.floor(remainingTime/86400);
                let hour = Math.floor((remainingTime - day*86400)/3600);
                let minute = Math.floor((remainingTime - day*86400 - hour*3600)/60);
                self.remainingTime = `${day} ngày ${hour < 10 ? ('0' + hour) : hour} giờ ${minute < 10 ? ('0' + minute): minute} phút`;
            } else {
                // ready phase
                self.remainingTime = `0 ngày 00 giờ 00 phút`;
                resetGift();
                countDownNextGift();
            }
        }
        setInterval(function() {
            countDownNextGift()
        }, 1000);
        function resetGift() {
            localStorage.removeItem('next-gift');
            delete $localStorage.giftReceived;
            delete $localStorage.giftOpenned;
            self.gift_1_open = false;
            self.gift_3_open = false;
            self.gift_6_open = false;
            self.gift_10_open = false;
            self.gift_1_received = false;
            self.gift_3_received = false;
            self.gift_6_received = false;
            self.gift_10_received = false;
        }
        /*
        * set invite progress
        * */
        function getProgress(invite_num){
            invite_num = invite_num%10;
            var data = {
                percentage : 0,
                stateProgress : 1,
                inviteClass : 'invite_blue_box',
                addNum : 1,
                invite_num : invite_num ? invite_num : 0
            };
            if(invite_num < 1){
                data.stateProgress = 1;
                data.inviteClass = 'invite_blue_box';
            }else if(invite_num >= 1 && invite_num < 3){
                data.stateProgress = 3;
                data.inviteClass = 'invite_pink_box';
            }else if(invite_num >= 3 && invite_num < 6){
                data.stateProgress = 6;
                data.inviteClass = 'invite_green_box';
            }else if(invite_num >= 6 && invite_num < 10){
                data.stateProgress = 10;
                data.inviteClass = 'invite_orange_box';
            }
            data.addNum = data.stateProgress - invite_num;
            data.percentage = (invite_num/data.stateProgress*100).toFixed(2);
            return data;
        }
        /*
        * get invite by user_id
        * */
        function getInviteByUserId(){
            var params = {
                guest_id   : $localStorage.guest_id
            };
            $localStorage.call_invite_date = getDate();
            self.inviteProgres = getProgress(0);
            inviteFriendService.getInviteByUserId(params)
                .then(function(data){
                    if(data && data.code  == 1){
                        // data.data.length = 1;
                        // self.inviteProgres = getProgress(data.data.length);
                        // lưu mức quà nhận được theo số lượt invite
                        if (data.data.length > 0) {
                            if (Math.floor(data.data.length/10) > $localStorage.inviteStage && (data.data.length%10) != 0) {
                                $localStorage.giftOpenned = [];
                                self.gift_1_open = false;
                                self.gift_3_open = false;
                                self.gift_6_open = false;
                                self.gift_10_open = false;
                                $localStorage.inviteStage = Math.floor(data.data.length/10);
                            }
                            var userInvited = (data.data.length % 10);
                            if (userInvited ===  0 )  {
                                userInvited = 10
                            }
                            self.userInvited = userInvited;
                            if (userInvited >= 10 || userInvited == 0) {
                                $localStorage.giftReceived = [];
                                $localStorage.giftReceived.push(10, 6, 3, 1);
                                self.gift_10_received = true;
                                self.gift_6_received = true;
                                self.gift_3_received = true;
                                self.gift_1_received = true;
                                openLastGift();
                            }else if (userInvited >= 6) {
                                $localStorage.giftReceived = [];
                                $localStorage.giftReceived.push(6, 3, 1);
                                self.gift_6_received = true;
                                self.gift_3_received = true;
                                self.gift_1_received = true;
                                openLastGift();
                            }else if (userInvited >= 3) {
                                $localStorage.giftReceived = [];
                                $localStorage.giftReceived.push(3, 1);
                                self.gift_3_received = true;
                                self.gift_1_received = true;
                                openLastGift();
                            }else if (userInvited >= 1) {
                                $localStorage.giftReceived = [];
                                $localStorage.giftReceived.push(1);
                                self.gift_1_received = true;
                                openLastGift();
                            }
                        }else {
                            self.userInvited = 0;
                        }
                        checkGiftReceived();
                        checkGiftOpenned();

                    }else{
                        console.log("error");
                        self.inviteProgres = getProgress(0);
                    }
                })
        }

        /*
        * open last gift
        **/
        function openLastGift() {
            $localStorage.giftReceived = _.difference($localStorage.giftReceived, $localStorage.giftOpenned);
            var lastGiftReceived = Math.max.apply(null, $localStorage.giftReceived);
            if ($localStorage.giftReceived.length > 0) {
                self.notiReceiveGift = true;
            }
            if (lastGiftReceived > 0) {
                self.openGift(lastGiftReceived);
            }

        }
        /*
        * store invitation
        * */
        function invite(){
            var params = {
                guest_id   : $localStorage.guest_id
            };
            inviteFriendService.invite(params)
                .then(function(data){
                })
        }
        /*
        * save user detail -  invitation
        * */
        function updateUserDetail(){
            var params = {
                guest_id   : $localStorage.guest_id,
                name : $ctrl.inviteUser.name,
                phone : $ctrl.inviteUser.phone
            };
            inviteFriendService.updateUserInvitation(params)
                .then(function(data){
                })
        }

        function checkGiftReceived() {
            var giftReceived = $localStorage.giftReceived;

            if (giftReceived.length > 0) {
                self.notiReceiveGift = true;
                let difference = $localStorage.giftReceived.filter(x => $localStorage.giftOpenned.indexOf(x) == -1);
                if(difference.length > 0){
                    self.notiReceiveGift = true;
                }else{
                    self.notiReceiveGift = false;
                }
            }
            if (giftReceived.indexOf(1) != -1) {
                self.gift_1_received = true;
            }
            if (giftReceived.indexOf(3) != -1) {
                self.gift_3_received = true;
            }
            if (giftReceived.indexOf(6) != -1) {
                self.gift_6_received = true;
            }
            if (giftReceived.indexOf(10) != -1) {
                self.gift_10_received = true;
            }
        }

        function checkGiftOpenned() {
            var giftOpenned = $localStorage.giftOpenned;
            if (giftOpenned.indexOf(1) != -1) {
                self.gift_1_open = true;
            }
            if (giftOpenned.indexOf(3) != -1) {
                self.gift_3_open = true;
            }
            if (giftOpenned.indexOf(6) != -1) {
                self.gift_6_open = true;
            }
            if (giftOpenned.indexOf(10) != -1) {
                self.gift_10_open = true;
            }
        }

        function checkGiftLiked() {
            var giftLiked = $localStorage.giftLiked;
            if (giftLiked.indexOf(1) != -1) {
                self.likeGift_1 = true;
            }
            if (giftLiked.indexOf(3) != -1) {
                self.likeGift_3 = true;
            }
            if (giftLiked.indexOf(6) != -1) {
                self.likeGift_6 = true;
            }
            if (giftLiked.indexOf(10) != -1) {
                self.likeGift_10 = true;
            }
        }

        function receiveGift(giftType) {
            $localStorage.giftReceived.splice($localStorage.giftReceived.indexOf(giftType), 1);
            $localStorage.giftOpenned.push(giftType);
            if (giftType == 1) {
                self.gift_1_open = true;
                self.gift_1_received = false;
                var userReceiveGift = 1 + '_' + $localStorage.guest_id;
                _gaq.push(['_trackEvent', 'INVITE', 'Receive gift', userReceiveGift]);
            }else if (giftType == 3) {
                self.gift_3_open = true;
                self.gift_3_received = false;
                var userReceiveGift = 3 + '_' + $localStorage.guest_id;
                _gaq.push(['_trackEvent', 'INVITE', 'Receive gift', userReceiveGift]);
            }else if (giftType == 6) {
                self.gift_6_open = true;
                self.gift_6_received = false;
                // self.openedGift = false;
                // self.giftType = '';
                var userReceiveGift = 6 + '_' + $localStorage.guest_id;
                _gaq.push(['_trackEvent', 'INVITE', 'Receive gift', userReceiveGift]);
            }else if (giftType == 10) {
                self.gift_10_open = true;
                self.gift_10_received = false;
                var userReceiveGift = 10 + '_' + $localStorage.guest_id;
                _gaq.push(['_trackEvent', 'INVITE', 'Receive gift', userReceiveGift]);
            }
            if ($localStorage.giftOpenned.indexOf(10) != -1 && $localStorage.giftOpenned.indexOf(6) != -1
                && $localStorage.giftOpenned.indexOf(3) != -1 && $localStorage.giftOpenned.indexOf(1) != -1) {
                    self.notiReceiveGift = false;
                    // $localStorage.giftOpenned = [];
            }
            if ($localStorage.giftReceived.length == 0) {
                self.notiReceiveGift = false;
            }

        }

        self.openListTopic = function(id) {
            if($localStorage.unit && $localStorage.unit.length >= 10){
                receiveGift(6);
                self.messageFullUnit = "Bạn đã mở tất cả Unit";
            }else{
                self.giftType = 6;
                var unitLocal = $localStorage.unit;
                // _gaq.push(['_trackEvent', 'INTRO', 'List topic screen', '']);
                if (id) {
                    unitLocal = _.initial($localStorage.unit);
                    $localStorage.unit = unitLocal;
                    $('body').removeClass("modal-open").css("padding-right","");
                }
                _.map(units, function ($value) {
                    if (unitLocal) {
                        var unlock = _.contains(unitLocal, $value.id);
                        if  (unlock) {
                            $value.lock = false;
                        }
                    }
                });
                self.units = units;
            }
        };

        self.chooseTopic = function(unitId, unitName) {
            // _gaq.push(['_trackEvent', 'INTRO', 'Choose topic', '']);
            self.unitName = unitName;
            self.unitId = unitId;
            let unlock = _.contains($localStorage.unit, self.unitId);
            $rootScope.selectedUnit = $localStorage.unit;
            if (!unlock) {
                $('#confirm-topic-box').modal('show');
                $('.modal-backdrop').appendTo('#list_topic');
                $('.modal_topic').removeClass("modal-open").css("padding-right","");
            }
        };

        self.closeConfirmTopicModal = function() {
            $('#confirm-topic-box').modal('hide');
            $('.modal_topic').removeClass('modal-backdrop');
        };

        self.confirmTopic = function() {
            // _gaq.push(['_trackEvent', 'INTRO', 'Comfirm topic', '']);
            //Available Unit
            _.unique($localStorage.unit.push(self.unitId));
            receiveGift(6);
        };
        self.msg_discount_code = "";
        self.addUserInfo = function(){
            var params = {
                name : self.inviteUser.name,
                phone : self.inviteUser.phone,
                guest_id : $localStorage.guest_id,
                email :  $localStorage.auth && $localStorage.auth.email ? $localStorage.auth.email : ''
            };
            self.inviteUser = {};
            inviteFriendService.updateUserInvitation(params)
                .then(function(data){
                    if(data.code == 1){
                        self.msg_discount_code = "Thêm thông tin thành công";
                        receiveGift(10);
                    }
                })
                .catch(function(){
                    console.log("Error");
                })
        }

        self.openFB = function() {
            var guest_id = $localStorage.guest_id;
            _gaq.push(['_trackEvent', 'INVITE', 'open fb', guest_id]);
        }

        self.openEmail = function() {
            var guest_id = $localStorage.guest_id;
            _gaq.push(['_trackEvent', 'INVITE', 'open email', guest_id]);
        }
    }]
})
