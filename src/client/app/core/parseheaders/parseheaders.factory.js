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
        'X-Parse-Application-Id': 'uV1p4HVboKFhgVIVU8kEZH223EXVLLrNoCiZ9ubw',
        'X-Parse-REST-API-Key': 'rIDFytzlYaGyrdYVPHn62SVNgvIEDdcyhbAxbAmm'
      }
    };
  }
})();
