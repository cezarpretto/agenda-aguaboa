angular.module('starter')

.service('MsgService', function($ionicLoading, $ionicPopup){
  this.loadingShow = function(msg){
    $ionicLoading.show({
      template: msg
    });
  };

  this.loadingHide = function(){
    $ionicLoading.hide();
  };

  this.alert = function(msg){
    $ionicPopup.alert({
     title: 'Agenda Água Boa',
     template: msg
    });
  };

  this.confirm = function(msg){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Agenda Água Boa',
     template: msg
    });
    return confirmPopup;
  };
});
