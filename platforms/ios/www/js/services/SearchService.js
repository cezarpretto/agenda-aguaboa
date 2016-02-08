angular.module('starter')

.service('SearchService', function(MsgService, $rootScope){
  this.search = function(searchTerm){
    var arr = JSON.parse(window.localStorage.getItem('telefones'));
    var filtered = arr.filter(function(str) {
      return str.nome.toUpperCase().indexOf(searchTerm.toUpperCase()) != -1;
    });
    cordova.plugins.Keyboard.close();
    return filtered;
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

  this.canSync = function(){
    var lastSync = JSON.parse(window.localStorage.getItem('lastSync'));
    console.log(lastSync);
    if(lastSync === null){
      return true;
    }else{
      var ls = new Date(lastSync).getTime();
      var now = new Date().getTime();
      if(now - ls >= 172800000){
        //console.log('Diferença:', now - loggedAt);
        return true;
      }else{
        return false;
      }
    }
  };
});
