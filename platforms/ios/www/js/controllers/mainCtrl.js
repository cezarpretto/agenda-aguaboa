angular.module('starter')

.controller('MainCtrl', function($scope, $firebaseArray, ConnectionService, MsgService, SearchService, $ionicActionSheet, $timeout, ModalService, $state, $firebaseAuth, $firebaseArray) {
  $scope.listCanSwipe = true;
  $scope.search = {
    query: undefined
  };
  $scope.resultados = [];
  $scope.message = false;
  var authRef = new Firebase("https://listaab.firebaseio.com/usuarios");
  var sugRef = new Firebase("https://listaab.firebaseio.com/sugestoes");
  var corrRef = new Firebase("https://listaab.firebaseio.com/correcoes");
  var auth = $firebaseAuth(authRef);
  var usuarioLogado = {};
  $scope.sugestoes = $firebaseArray(sugRef);
  $scope.correcoes = $firebaseArray(corrRef);
  $scope.sugestao = {};

  if(SearchService.canSync()){
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
         { text: 'Número Favorito' },
         { text: 'Adicionar aos contatos' },
         { text: 'Pedir correção' }
       ],
       titleText: 'Opções',
       cancelText: 'Cancelar',
       cancel: function() {
            // add cancel code..
       },
       buttonClicked: function(index) {
         if(index === 0){
           window.open('tel://' + telefone.telefone);
         }else if(index === 1){
           share(telefone);
         }else if(index === 2){
           favorito(telefone);
           hideSheet();
         }else if(index === 3){
           addContato(telefone);
         }else if(index === 4){
           selecionaCorrecao(telefone);
           hideSheet();
         }

       }
     });

     // For example's sake, hide the sheet after two seconds
     $timeout(function() {
       hideSheet();
     }, 3500);

   };

   ModalService.init('modal-sugestao.html', $scope).then(function(modal){
     $scope.modalSugestao = modal;
   });

   ModalService.init('modal-correcao.html', $scope).then(function(modal){
     $scope.modalCorrecao = modal;
   });

   $scope.openSugestao = function(){
     usuarioLogado = auth.$getAuth();
     if(usuarioLogado !== null){
       $scope.modalSugestao.show();
       $scope.sugestao = {nome: undefined, telefone: undefined, usuario: undefined};
     }else{
       MsgService.alert('<b>Atenção!</b> Para dar sugestão de números você deve estar logado. Faça login para continuar.');
       $state.go('tab.config');
     }
   };

   $scope.addSugestao = function(){
     $scope.sugestao.usuario = usuarioLogado.google;
     $scope.sugestoes.$add($scope.sugestao).then(function(){
       MsgService.alert('Sugestão enviada com sucesso. Obrigado!');
       $scope.modalSugestao.hide();
     }).catch(function(){
       MsgService.alert('Não foi possível enviar a sugestão no momento. Tente mais tarde!');
     });
   };

   $scope.addCorrecao = function(){
     $scope.correcao.usuario = usuarioLogado.google;
     $scope.correcoes.$add($scope.correcao).then(function(){
       MsgService.alert('Pedido de correção enviado com sucesso. Obrigado!');
       $scope.modalCorrecao.hide();
     }).catch(function(){
       MsgService.alert('Não foi possível enviar o pedido de correção no momento. Tente mais tarde!');
     });
   };

   function selecionaCorrecao(telefone){
     usuarioLogado = auth.$getAuth();
     if(usuarioLogado !== null){
       $scope.correcao = {oldTelefone: angular.copy(telefone), nome: telefone.nome, telefone: telefone.telefone};
       $scope.modalCorrecao.show();
     }else{
       MsgService.alert('<b>Atenção!</b> Para pedir correção de números você deve estar logado. Faça login para continuar.');
       $state.go('tab.config');
     }
   };

  function addContato(telefone){
    navigator.notification.confirm('Deseja realmente salvar o contato ' + telefone.nome + '?', confirmCallback, 'Agenda Água Boa', ['Não, obrigado!', 'Manda ver!'])

    function confirmCallback(callback){
      if(callback === 2){
        var contact = navigator.contacts.create();
        contact.displayName = telefone.nome;
        contact.name = telefone.nome;
        var numeros = [];
        numeros[0] = new ContactField('', telefone.telefone, true);
        contact.phoneNumbers = numeros;
        contact.save(onSuccess, onError);

        function onSuccess(contact) {
          navigator.notification.alert('Contato salvo com sucesso!', alertCallback, 'Agenda Água Boa', 'Beleza =)')
          function alertCallback(alert){
          }
        };

        function onError(contactError) {
          alert("Error = " + contactError.code);
        };
      }
    }
  };

});
