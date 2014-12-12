(function() {
  'use strict';

  angular
  .module('app.contact')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var contact = {
      name: 'contact',
      url: '/contact',
      templateProvider: template,
      controller: 'Contact',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/contact/contact.html\'\"</div>';
      });
    }

    $stateProvider.state(contact);
  
  }

})();
