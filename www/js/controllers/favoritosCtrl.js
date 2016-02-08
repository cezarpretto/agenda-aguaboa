angular.module('starter')

.controller('FavoritosCtrl', function($scope, SearchService, $ionicActionSheet, $timeout){
  $scope.favoritos = [];
  function getFavoritos(){
    $scope.favoritos = SearchService.getFavoritos();
    console.log($scope.favoritos);
  };
  getFavoritos();

  function share(telefone){
    var message = {
      text: 'Agenda Água Boa - ' + telefone.nome,
      url: telefone.telefone,
    };
    window.socialmessage.send(message);
  };

  function deleteFavorito(telefone){
    $scope.favoritos = SearchService.deleteNumeroFavorito(telefone);
  };

  $scope.options = function(telefone) {
     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Ligar' },
         { text: 'Compartilhar' },
         { text: 'Excluir' }
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
           deleteFavorito(telefone);
         }

       }
     });

     // For example's sake, hide the sheet after two seconds
     $timeout(function() {
       hideSheet();
     }, 3500);

   };

   $scope.$on('updateFavoritos', function(event, data){
     console.log(data);
     $scope.favoritos = data;
   });
});
