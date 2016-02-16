angular.module('starter')

.service('SearchService', function(MsgService, $rootScope, ConnectionService){
  var self = this;
  this.search = function(searchTerm){
    var number = false;
    if(parseInt(searchTerm)){
      number = true;
    }
    searchTerm = self.clearString(searchTerm);
    var arr = JSON.parse(window.localStorage.getItem('telefones'));
    var filtered = arr.filter(function(str) {
      if(number){
        return self.clearString(str.telefone).toUpperCase().indexOf(searchTerm.toUpperCase()) != -1;
      }else{
        return self.clearString(str.nome).toUpperCase().indexOf(searchTerm.toUpperCase()) != -1;
      }
    });
    cordova.plugins.Keyboard.close();
    return filtered;
  };

  this.clearString = function(str){
    str = str.toString();
    str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
    str = str.replace(/[àáâãäå]/,"a");
    str = str.replace(/[ÈÉÊË]/,"E");
    str = str.replace(/[Ç]/,"C");
    str = str.replace(/[ç]/,"c");
    return str.replace(/[^a-z0-9]/gi,'');
  };

  this.addFavorito = function(telefone){
    var favoritos = JSON.parse(window.localStorage.getItem('favoritos'));
    if(favoritos === null){
      favoritos = [];
    }
    favoritos.push(telefone);
    window.localStorage.setItem('favoritos', JSON.stringify(favoritos));
    MsgService.alert('Número adicionado aos favoritos =)');
    $rootScope.$broadcast('updateFavoritos', favoritos);
  };

  this.getFavoritos = function(){
    return JSON.parse(window.localStorage.getItem('favoritos'));
  };

  this.deleteNumeroFavorito = function(telefone){
    var favoritos = JSON.parse(window.localStorage.getItem('favoritos'));
    var idx = favoritos.indexOf(telefone);
    favoritos.splice(idx, 1);
    window.localStorage.setItem('favoritos', JSON.stringify(favoritos));
    MsgService.alert('Número excluído =)');
    return favoritos;
  };

  this.setLastSync = function(){
    var ll = new Date();
    window.localStorage.setItem('lastSync', JSON.stringify(ll));
  };

  // this.canSync = function(){
  //   var lastSync = JSON.parse(window.localStorage.getItem('lastSync'));
  //   if(lastSync === null){
  //     return true;
  //   }else{
  //     var ls = new Date(lastSync).getTime();
  //     var now = new Date().getTime();
  //     if(now - ls >= 172800000){
  //       //console.log('Diferença:', now - loggedAt);
  //       return true;
  //     }else{
  //       return false;
  //     }
  //   }
  // };

  this.canSync = function(){
    var telefones = JSON.parse(window.localStorage.getItem('telefones'));
    if(telefones === null){
      return true;
    }else if(ConnectionService.checkConnection() === 7){
      return true;
    }

    return false;
  };
});
