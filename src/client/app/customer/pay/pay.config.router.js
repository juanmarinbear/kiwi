(function() {
  'use strict';

  angular
  .module('app.customer')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var pay = {
      name: 'pay',
      url: '/pay',
      templateProvider: template,
      controller: 'Pay',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/customer/pay/pay.html\'\"</div>';
      });
    }

    $stateProvider.state(pay);
  
  }

})();
