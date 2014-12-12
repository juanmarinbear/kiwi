(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('mediaquery', mediaquery);

  mediaquery.$inject = ['$window'];

  /* @ngInject */
  function mediaquery($window) {

    var factory = {
      screenSize: screenSize 
    };

    return factory;

    function screenSize() {
      // Return screen size based on PureCSS conventions
      if ($window.matchMedia('(max-width: 35.5em)').matches) {
        return 'sm';
      }

      if ($window.matchMedia('(max-width: 48em)').matches) {
        return 'md';
      }

      if ($window.matchMedia('(max-width: 64em)').matches) {
        return 'lg';
      }

      return 'xl';
    }
  }

})();
