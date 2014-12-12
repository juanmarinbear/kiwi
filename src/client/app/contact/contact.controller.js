(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Contact', Contact);

  Contact.$inject = ['$scope', '$stateParams', '$timeout', 'template', 'kiwiwebapi'];

  function Contact($scope, $stateParams, $timeout, template, kiwiwebapi) {
    var vm = this;
    vm.animate = {};
    vm.ContactTicket = kiwiwebapi.newKiwiWebResource();
    vm.error = error;
    vm.errors = {};
    vm.form = {};
    vm.submit = submit;
    vm.success = success;
    vm.ticket = {};
    angular.extend(vm.ticket, {
      type: 'Contact',
    });

    activate();

    function activate() {
      console.log('Activating Contact Controller');
      template.get('app/contact/language/contact.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(template.get('app/contact/language/contactform.es.json')
      .then(function(result) {
        vm.inputs = result.inputs; 
      }))
      .then(function() {
        $scope.app.setTitle(vm.text.title);
      });
    }

    function error() {
      $scope.$emit('stopLoading');
      vm.animate.error = true;
      $timeout(function() {
        vm.animate.errorTitle = true; 
      }, 250);
      $timeout(function() {
        vm.animate.errorMessage = true; 
      }, 500);
    }

    function submit(ticket) {
      if (vm.form.$valid) {
        $scope.$emit('startLoading');
        var contactTicket = new vm.ContactTicket(ticket);
        contactTicket.$save({class: vm.ticket.type})
        .then(
          function(data) {
            contactTicket.$get({class: vm.ticket.type})
            .then(function(data) {
              angular.extend(vm.ticket, data);
              success();
              console.log(vm.ticket);
            });
          }, 
          function(data) {
            error();
            console.log(data);
          }
        );
      }
    }

    function success() {
      $scope.$emit('stopLoading');
      vm.animate.success = true;
      $timeout(function() {
        vm.animate.successTitle = true; 
      }, 250);
      $timeout(function() {
        vm.animate.successMessage = true; 
      }, 500);
      $timeout(function() {
        vm.animate.successTicket = true; 
      }, 750);
    }
  }

})();
