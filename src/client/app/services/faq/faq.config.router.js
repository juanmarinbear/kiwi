(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var faq = {
      name: 'faq',
      url: '/faq',
      templateProvider: template,
      controller: 'Faq',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/faq/faq.html\'\"</div>';
      });
    }

    $stateProvider.state(faq);
  
  }

})();
