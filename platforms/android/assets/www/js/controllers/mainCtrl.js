angular.module('starter')

.controller('MainCtrl', function($scope, $firebaseArray, ConnectionService, MsgService, SearchService, $ionicActionSheet, $timeout) {
  $scope.listCanSwipe = true;
  $scope.search = {
    query: undefined
  };
  $scope.resultados = [];
  $scope.message = false;
  if(ConnectionService.checkConnection() === false){
    $scope.message = true;
  }else{
    if(ConnectionService.checkConnection() === 7 || ConnectionService.checkConnection() === 6 && SearchService.canSync()){
      MsgService.loadingShow('Sincronizando banco de Números');
      var telefonesRev = new Firebase("https://listaab.firebaseio.com/telefones");
      $scope.onlineTelefones = $firebaseArray(telefonesRev);
      $scope.onlineTelefones.$loaded().then(function(){
        window.localStorage.setItem('telefones', JSON.stringify($scope.onlineTelefones));
        // console.log($scope.onlineTelefones);
        SearchService.setLastSync();
        MsgService.loadingHide();
      }).catch(function(err){
        MsgService.loadingHide();
        MsgService.alert('Não foi possível sincronizar! Tente mais tarde =(');
        console.error(err);
      });
    }
  }

  $scope.pesquisar = function(){
    $scope.resultados = SearchService.search($scope.search.query);
    $scope.search.query = undefined;
  };

  function share(telefone){
    var message = {
      text: 'Agenda Água Boa - ' + telefone.nome,
      url: telefone.telefone,
    };
    window.socialmessage.send(message);
  };

  function favorito(telefone){
    SearchService.addFavorito(telefone);
  };

  $scope.options = function(telefone) {
     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Ligar' },
         { text: 'Compartilhar' },
         { text: 'Número Favorito' }
       ],
       titleText: 'Opções',
       cancelText: 'Cancelar',
       cancel: function() {
            // add cancel code..
       },
       buttonClicked: function(index) {
         console.log(index);
         if(index === 0){
           window.open('tel://' + telefone.telefone);
         }else if(index === 1){
           share(telefone);
         }else if(index === 2){
           favorito(telefone);
         }

       }
     });

     // For example's sake, hide the sheet after two seconds
     $timeout(function() {
       hideSheet();
     }, 3500);

   };
});
