angular.module('starter')

.service('ConnectionService', function(){
  this.checkConnection = function(){
    if(navigator.connection !== undefined){
      var networkState = navigator.connection.type;
      var states = {};
      //var Connection = '';
      //console.log(networkState);
      console.log(networkState);
      switch (networkState) {
        case 'cellular':
          return 0
          break;
        case '2g':
          return 1
          break;
        case '3g':
          return 2
          break;
        case '4g':
          return 3
          break;
        case 'ethernet':
          return 4
          break;
        case 'none':
          return 5
          break;
        case 'unknown':
          return 6
          break;
        case 'wifi':
          return 7
          break;
      }
      // states[Connection.UNKNOWN]  = 0;
      // states[Connection.ETHERNET] = 1;
      // states[Connection.WIFI]     = 2;
      // states[Connection.CELL_2G]  = 3;
      // states[Connection.CELL_3G]  = 4;
      // states[Connection.CELL_4G]  = 5;
      // states[Connection.CELL]     = 6;
      // states[Connection.NONE]     = 7;
      // return states[networkState];
    }else{
      return false
    }
  };
})
