angular.module('starter')
  .directive('abMaxLength', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        //console.log(attrs.max);
        element.bind('keypress', function(e) {
          if (element[0].value.length === parseInt(attrs.max)) {
            // console.log(e.charCode)
            e.preventDefault();
            return false;
          }
        });
      }
    };
  });
