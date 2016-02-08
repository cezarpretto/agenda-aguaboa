angular.module('starter.services', [])
.service('ConnectionService', function(){
  this.checkConnection = function(){
    if(navigator.connection !== undefined){
      var networkState = navigator.connection.type;
      var states = {};
      //var Connection = '';
      //console.log(networkState);
      states[Connection.UNKNOWN]  = 0;
      states[Connection.ETHERNET] = 1;
      states[Connection.WIFI]     = 2;
      states[Connection.CELL_2G]  = 3;
      states[Connection.CELL_3G]  = 4;
      states[Connection.CELL_4G]  = 5;
      states[Connection.CELL]     = 6;
      states[Connection.NONE]     = 7;
      return states[networkState];
    }else{
      return false
    }
  };
})
.service('MsgService', function($ionicLoading){
  this.loadingShow = function(msg){
    $ionicLoading.show({
      template: msg
    });
  };

  this.loadingHide = function(){
    $ionicLoading.hide();
  };
})
.service('SearchService', function(){
  this.search = function(searchTerm){
    var arr = JSON.parse(window.localStorage.getItem('telefones'));
    var filtered = arr.filter(function(str) {
      return str.nome.toUpperCase().indexOf(searchTerm.toUpperCase()) != -1;
    });
    //cordova.plugins.Keyboard.close();
    return filtered;
  };
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
