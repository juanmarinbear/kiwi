(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Support', Support);

  Support.$inject = ['$scope', '$stateParams', '$timeout', 'template', 'kiwiwebapi'];

  function Support($scope, $stateParams, $timeout, template, kiwiwebapi) {
    var vm = this;
    vm.animate = {};
    vm.SupportTicket = kiwiwebapi.newKiwiWebResource();
    vm.error = error;
    vm.errors = {};
    vm.form = {};
    vm.submit = submit;
    vm.success = success;
    vm.ticket = {};
    angular.extend(vm.ticket, {
      type: 'Technical',
      channel: 'web_channel',
    });
    vm.updateType = updateType;

    activate();

    function activate() {
      console.log('Activating Support Controller');
      template.get('app/support/language/support.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(template.get('app/support/language/supportform.es.json')
      .then(function(result) {
        vm.inputs = result.inputs; 
      }))
      .then(function() {
        $scope.app.setTitle(vm.text.title);
        if ($stateParams.role) {
          vm.ticket.role = vm.roles[$stateParams.role];
        }
      });
    }

    function capitalize(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
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
        vm.ticket.name = capitalize(vm.ticket.name);
        vm.ticket.last = capitalize(vm.ticket.last);
        if(vm.ticket.company) {
          vm.ticket.company = capitalize(vm.ticket.company);
        }
        var supportTicket = new vm.SupportTicket(ticket);
        supportTicket.$save({class: vm.ticket.type})
        .then(
          function(data) {
            supportTicket.$get({class: vm.ticket.type})
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

    function updateType(subject) {
      if (subject === vm.inputs.subject.options.items[2].value) {
        vm.ticket.type = 'Administrative';
      } else {
        vm.ticket.type = 'Technical';
      }
    }
  }

})();
