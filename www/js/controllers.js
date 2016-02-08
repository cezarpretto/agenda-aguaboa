angular.module('starter')

.controller('DashCtrl', function($scope, $firebaseArray, ConnectionService, MsgService, SearchService) {
  $scope.search = {
    query: undefined
  };
  $scope.resultados = [];
  if(ConnectionService.checkConnection() === 2){
    MsgService.loadingShow('Sincronizando banco de Números');
    var telefonesRev = new Firebase("https://listaab.firebaseio.com/telefones");
    $scope.onlineTelefones = $firebaseArray(telefonesRev);
    $scope.onlineTelefones.$loaded().then(function(){
      window.localStorage.setItem('telefones', JSON.stringify($scope.onlineTelefones));
      // console.log($scope.onlineTelefones);
      MsgService.loadingHide();
    }).catch(function(err){
      MsgService.loadingHide();
      console.error(err);
    });
  }

  $scope.pesquisar = function(){
    console.log($scope.resultados = SearchService.search($scope.search.query));
  };
});
