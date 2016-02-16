angular.module('starter')

.controller('SobreCtrl', function($scope, $ionicModal, ModalService){
  var counter = 0;
  $scope.counter_ = 0;
  $scope.openGithub = function(){
    window.open('http://github.com/cezarpretto', '_system');
  };

  ModalService.init('modal-easteregg.html', $scope).then(function(modal){
    $scope.modal = modal;
  });

  $scope.count = function(){
    counter ++;
    if(counter > 6){
      $scope.counter_ = counter
    }
    if(counter === 18){
      counter = 0;
      $scope.modal.show();
      $scope.counter_ = 0;
      if (window.StatusBar) {
        StatusBar.styleDefault();
        if (cordova.platformId == 'android') {
          StatusBar.backgroundColorByHexString("#444444");
        }
      }
    }
  };
});
