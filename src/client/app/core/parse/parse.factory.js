(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('parse', parse);

  parse.$inject = ['$resource'];

  /* @ngInject */
  function parse($resource) {

    var factory = {
      newParseResource: newParseResource
    };

    return factory;

    function newParseResource(headers) {
      return $resource(
        'https://api.parse.com/1/classes/:class/:objectId',
        {
          objectId: '@objectId' 
        },
        { 
          'get':    {method:'GET', headers: headers},
          'save':   {method:'POST', headers: headers},
          'edit':   {method:'PUT', headers: headers},
          'query':  {method:'GET', headers: headers},
          'remove': {method:'DELETE', headers: headers},
          'delete': {method:'DELETE', headers: headers} 
        }
      );
    }
  }
})();
