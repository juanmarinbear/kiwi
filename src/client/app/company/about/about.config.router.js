(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var about = {
      name: 'about',
      url: '/about',
      templateProvider: template,
      controller: 'About',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/about/about.html\'\"</div>';
      });
    }

    $stateProvider.state(about);
  
  }

})();
