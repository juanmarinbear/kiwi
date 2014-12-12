(function() {
  'use strict';

  angular
  .module('app.core')
  .filter('capitalize', capitalize);

  capitalize.$inject = [];

  /* @ngInject */
  function capitalize() {
    return function(input) {
      if (!!input) {
        return input.replace(/([^\W_]+[^\s-]*) */g, 
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      } else {
        return ''; 
      }
    };
  }
})();
