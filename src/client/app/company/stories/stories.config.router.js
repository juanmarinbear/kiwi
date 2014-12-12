(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var stories = {
      name: 'stories',
      url: '/stories',
      templateProvider: template,
      controller: 'Stories',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/stories/stories.html\'\"</div>';
      });
    }

    $stateProvider.state(stories);
  
  }

})();
