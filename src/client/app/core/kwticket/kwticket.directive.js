(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('kwTicket', kwTicket);

  kwTicket.$inject = ['$timeout'];

  /* @ngInject */
  function kwTicket($timeout) {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        kwTicket: '=',
        kwInputs: '='
      },
      templateUrl: 'app/core/kwticket/kwticket.html'
    };

    return directive;

    function link(scope, element, attrs) {

      activate();

      function activate() {
      }
    }
  }
})();
