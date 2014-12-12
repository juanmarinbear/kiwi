(function() {
  'use strict';

  angular
  .module('app.customer')
  .controller('Pay', Pay);

  Pay.$inject = ['$scope', '$stateParams', '$resource', 'template', 'kiwiwebapi'];

  function Pay($scope, $stateParams, $resource, template, kiwiwebapi) {
    var vm = this;
    vm.PayTicket = kiwiwebapi.newKiwiWebResource();
    vm.errors = {};
    vm.form = {};
    vm.submit = submit;
    vm.ticket = {};
    angular.extend(vm.ticket, {
      type: 'Pay',
    });

    activate();

    function activate() {
      console.log('Activating Pay Controller');
      template.get('app/customer/pay/language/pay.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(template.get('app/customer/pay/language/payform.es.json')
      .then(function(result) {
        vm.inputs = result.inputs; 
      }))
      .then(function() {
        $scope.app.setTitle(vm.text.title);
      });
    }

    function submit(ticket) {
      if (vm.form.$valid) {
        var payTicket = new vm.PayTicket(ticket);
        payTicket.$save({class: vm.ticket.type})
        .then(function(data) {
          payTicket.$get({class: vm.ticket.type})
          .then(function(data) {
            console.log(data);
          });
        });
      }
      vm.form.submitted = true;
    }
  }

})();
