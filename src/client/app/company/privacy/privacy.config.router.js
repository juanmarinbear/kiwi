(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var privacy = {
      name: 'privacy',
      url: '/privacy',
      templateProvider: template,
      controller: 'Privacy',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/privacy/privacy.html\'\"</div>';
      });
    }

    $stateProvider.state(privacy);
  
  }

})();
