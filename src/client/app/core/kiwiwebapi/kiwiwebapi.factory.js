(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('kiwiwebapi', kiwiwebapi);

  kiwiwebapi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function kiwiwebapi($resource, parseheaders, parse) {

    var factory = {
      newKiwiWebResource: newKiwiWebResource
    };

    return factory;

    function newKiwiWebResource() {
      return parse.newParseResource(parseheaders.kiwiwebapi);
    }
  }
})();
