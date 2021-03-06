(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Unsubscribe', Unsubscribe);

  Unsubscribe.$inject = ['$scope', '$stateParams', '$timeout', 'template', 'mxpostapi', 'kiwiwebapi'];

  function Unsubscribe($scope, $stateParams, $timeout, template, mxpostapi, kiwiwebapi) {
    var vm = this;
    vm.animate = {};
    vm.UnsubscribeTicket = kiwiwebapi.newKiwiWebResource();
    vm.error = error;
    vm.errors = {};
    vm.form = {};
    vm.submit = submit;
    vm.ticket = {};
    vm.success = success;
    angular.extend(vm.ticket, {
      type: 'Unsubscribe',
      channel: 'web_channel',
      unsubscribeEmail: false,
      unsubscribeMobile: false,
      unsubscribeAddress: false,
      opposeTransfer: false,
      forgetMe: false
    });

    activate();

    function activate() {
      console.log('Activating Unsubscribe Controller');
      template.get('app/company/unsubscribe/language/unsubscribe.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(template.get('app/company/unsubscribe/language/unsubscribeform.es.json')
      .then(function(result) {
        vm.inputs = result.inputs; 
      }))
      .then(function() {
        $scope.app.setTitle(vm.text.title);
      });
    }

    function capitalize(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    function error() {
      $scope.$emit('startLoading');
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
        vm.ticket.name = capitalize(vm.ticket.name);
        vm.ticket.last = capitalize(vm.ticket.last);
        var unsubscribeTicket = new vm.UnsubscribeTicket(ticket);
        unsubscribeTicket.$save({class: vm.ticket.type})
        .then(
          function(data) {
            unsubscribeTicket.$get({class: vm.ticket.type})
            .then(function(data) {
              angular.extend(vm.ticket, data);
              success();
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
