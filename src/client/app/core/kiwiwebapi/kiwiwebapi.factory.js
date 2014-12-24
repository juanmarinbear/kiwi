(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('kiwiwebapi', kiwiwebapi);

  kiwiwebapi.$inject = ['parseheaders', 'parse'];

  /* @ngInject */
  function kiwiwebapi(parseheaders, parse) {

    var factory = {
      newKiwiWebResource: newKiwiWebResource
    };

    return factory;

    function newKiwiWebResource() {
      return parse.newParseResource(parseheaders.kiwiwebapi);
    }
  }
})();
