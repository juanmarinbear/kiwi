(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Apply', Apply);

  Apply.$inject = ['$scope', '$stateParams', '$timeout', '$upload', 'parseheaders', 'template', 'kiwiwebapi'];

  function Apply($scope, $stateParams, $timeout, $upload, parseheaders, template, kiwiwebapi) {
    var vm = this;
    vm.animate = {};
    vm.ApplyTicket = kiwiwebapi.newKiwiWebResource();
    vm.error = error;
    vm.errors = {};
    vm.file = {
      invalid: true,
      valid: false,
      dirty: false
    };
    vm.fileSelected = fileSelected;
    vm.form = {};
    vm.submit = submit;
    vm.roles = {
      'networkEngineer' : 'Ingeniero de Redes',
      'solutionsEngineer' : 'Ingeniero de Soluciones',
      'softwareEngineer' : 'Ingeniero de Software'
    };
    vm.success = success;
    vm.ticket = {};
    angular.extend(vm.ticket, {
      type: 'Jobs',
      channel: 'web_channel',
    });

    activate();

    function activate() {
      console.log('Activating Apply Controller');
      template.get('app/company/apply/language/apply.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(template.get('app/company/apply/language/applyform.es.json')
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

    function fileSelected($files, $event) {
      if ($files.length) {
        vm.ticket.resume = null;
        vm.file.dirty = true;
        if ($files[0].type !== 'application/pdf') {
          vm.file.invalid = true; 
          vm.file.valid = false; 
        } else {
          vm.file.valid = true;
          vm.file.invalid = false;
          vm.ticket.resume = $files[0];
        }
      }
    }

    function submit(ticket) {
      if (vm.form.$valid && vm.file.valid) {
        $scope.$emit('startLoading');
        var headers = parseheaders.kiwiwebapi;
        headers['Content-Type'] = vm.ticket.resume.type;
        $upload.upload({
          url: 'https://api.parse.com/1/files/' + vm.ticket.resume.name,
          method: 'POST',
          headers: headers,
          file: vm.ticket.resume
        })
        .then(
          function(result) {
            vm.ticket.resume = {
              name: result.data.name,
              url: result.data.url
            };
            vm.ticket.name = capitalize(vm.ticket.name);
            vm.ticket.last = capitalize(vm.ticket.last);
            if(vm.ticket.college) {
              vm.ticket.college = capitalize(vm.ticket.college);
            }
            if(vm.ticket.masters) {
              vm.ticket.masters = capitalize(vm.ticket.masters);
            }
            if(vm.ticket.phd) {
              vm.ticket.phd = capitalize(vm.ticket.phd);
            }
            var applyTicket = new vm.ApplyTicket(ticket);
            applyTicket.$save({class: vm.ticket.type})
            .then(
              function(data) {
                applyTicket.$get({class: vm.ticket.type})
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
          },
          function(data) {
            error();
            console.log(data)
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
