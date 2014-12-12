(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var careers = {
      name: 'careers',
      url: '/careers',
      templateProvider: template,
      controller: 'Careers',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/careers/careers.html\'\"</div>';
      });
    }

    $stateProvider.state(careers);
  
  }

})();
