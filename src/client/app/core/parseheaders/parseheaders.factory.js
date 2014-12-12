(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('parseheaders', parseheaders);

  parseheaders.$inject = [];

  /* @ngInject */
  function parseheaders() {

    return {
      mxpostapi: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'K6fafnegdVE32PXOMrOELlS70ZHxLqcHiQTA8Tq6',
        'X-Parse-REST-API-Key': 'g15AcAKamIKsgxE4nqtA2KlSMc5Tk8rdkq0l1ZYl'
      },
      kiwiwebapi: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'FH9ImcjJr5PWoumZrDbbahRTqSLtgoP3FHmrOIpZ',
        'X-Parse-REST-API-Key': 's8B22ec8itvsi8O0AVmVhM0isGr4p5pbjlP3ZDJG'
      }
    };
  }
})();
