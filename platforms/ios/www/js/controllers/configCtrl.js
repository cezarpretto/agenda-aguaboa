angular.module('starter')

.controller('ConfigCtrl', function($scope, $firebaseAuth, MsgService, $firebaseArray, SearchService){
  var authRef = new Firebase("https://listaab.firebaseio.com/telefones/usuarios");
  var auth = $firebaseAuth(authRef);
  $scope.logado = false;
  $scope.usuarioLogado = auth.$getAuth();
  if($scope.usuarioLogado !== null){
    $scope.logado = true;
  }else{
    $scope.logado = false;
  }

  $scope.logar = function(){
    auth.$authWithOAuthPopup("google").then(function(authData) {
      console.log(authData);
      console.log("Logged in as:", authData.uid);
      $scope.logado = true;
      $scope.usuarioLogado = authData;
    }).catch(function(error) {
      console.log("Authentication failed:", error);
      $scope.logado = false;
      $scope.usuarioLogado = null;
    });
  };

  $scope.logout = function(){
    $scope.logado = false;
    auth.$unauth();
    $scope.usuarioLogado = null;
  };

  $scope.sincronizar = function(){
    MsgService.confirm('<b>Atenção!</b> Essa operação vai sincronizar todos os números com nosso servidor. Isso pode não ser bom se você estiver navegando com seu plano de dados. Deseja mesmo assim continuar?')
    .then(function(res){
      if(res){
        MsgService.loadingShow('Sincronizando banco de Números');
        var telefonesRev = new Firebase("https://listaab.firebaseio.com/telefones");
        $scope.onlineTelefones = $firebaseArray(telefonesRev);
        $scope.onlineTelefones.$loaded().then(function(){
          window.localStorage.setItem('telefones', JSON.stringify($scope.onlineTelefones));
          SearchService.setLastSync();
          // console.log($scope.onlineTelefones);
          MsgService.loadingHide();
        }).catch(function(err){
          MsgService.loadingHide();
          MsgService.alert('Não foi possível sincronizar. Tente mais tarde. =(');
          console.error(err);
        });
      }
    });
  };
});
