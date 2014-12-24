(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Sales', Sales);

  Sales.$inject = ['$scope', '$stateParams', '$filter', '$timeout', 'template', 'mxpostapi', 'kiwiwebapi'];

  function Sales($scope, $stateParams, $filter, $timeout, template, mxpostapi, kiwiwebapi) {
    var vm = this;
    vm.animate = {};
    vm.error = error;
    vm.errors = {};
    vm.form = {};
    vm.geoZip = geoZip;
    vm.getDistricts = getDistricts;
    vm.getMunicipalities = getMunicipalities;
    vm.getZip = getZip;
    vm.reset = reset;
    vm.submit = submit;
    vm.SalesTicket = kiwiwebapi.newKiwiWebResource();
    vm.success = success;
    vm.ticket = {};
    angular.extend(vm.ticket, {
      type: 'Sales',
      channel: 'web_channel',
      step: 'Lead',
      outcome: 'Open',
      levels: '2'
    });

    activate();

    function activate() {
      console.log('Activating Sales Controller');
      template.get('app/services/sales/language/sales.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(template.get('app/services/sales/language/salesform.es.json')
      .then(function(result) {
        vm.inputs = result.inputs; 
      }))
      .then(mxpostapi.getStates()
      .$promise
      .then(function(data) {
        vm.states = data.results;
      }))
      .then(function() {
        $scope.app.setTitle(vm.text.title);
        if ($stateParams.service) {
          if ($stateParams.service === 'metromesh') {
            vm.ticket.service = 'Metro Mesh';
          } else {
            vm.ticket.service = $filter('capitalize')($stateParams.service);
          }
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

    function getDistricts(state, municipality) {
      $scope.$emit('startLoading');
      mxpostapi.getDistricts(state, municipality)
      .$promise
      .then(function(data) {
        vm.districts = data.results;
        vm.ticket.district = null;
        vm.ticket.zip = null;
        $scope.$emit('stopLoading');
      });
    }

    function getMunicipalities(state) {
      $scope.$emit('startLoading');
      mxpostapi.getMunicipalities(state)
      .$promise
      .then(function(data) {
        vm.municipalities = data.results;
        vm.districts = [];
        vm.ticket.municipality = null;
        vm.ticket.district = null;
        vm.ticket.zip = null;
        $scope.$emit('stopLoading');
      });
    }

    function getZip(district) {
      vm.district = $filter('filter')(vm.districts, {name: district}, true)[0];
      vm.ticket.zip = vm.district.zip;
    }

    function geoZip(zip) {
      vm.errors.zip = false;
      if (vm.form.zip.$invalid) {
        return; 
      }
      $scope.$emit('startLoading');
      mxpostapi.geoZip(zip)
      .$promise
      .then(function(data) {
        vm.districts = data.results;
        if (!vm.districts.length) {
          vm.errors.zip = true;
        } else {
          vm.errors.zip = false;
          vm.district = data.results[0];
          mxpostapi.getMunicipalities(vm.district.state)
          .$promise
          .then(function(data) {
            vm.municipalities = data.results;
            vm.ticket.state = vm.district.state;
            vm.ticket.municipality = vm.district.municipality;
            vm.ticket.district = vm.district.name;
            $scope.$emit('stopLoading');
          });
        }
      });
    }

    function reset() {
      vm.animate.success = false;
      vm.animate.error = false;
      vm.animate.errorTitle = false; 
      vm.animate.errorMessage = false; 
      vm.animate.successTitle = false; 
      vm.animate.successMessage = false; 
      vm.animate.successTicket = false; 
    }

    function submit(ticket) {
      if (vm.form.$valid) {
        $scope.$emit('startLoading');
        vm.ticket.name = capitalize(vm.ticket.name);
        vm.ticket.last = capitalize(vm.ticket.last);
        if(vm.ticket.company) {
          vm.ticket.company = capitalize(vm.ticket.company);
        }
        var salesTicket = new vm.SalesTicket(ticket);
        salesTicket.$save({class: vm.ticket.type})
        .then(
          function(data) {
            salesTicket.$get({class: vm.ticket.type})
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
