(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('mxpostapi', mxpostapi);

  mxpostapi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function mxpostapi($resource, parseheaders, parse) {

    var Mxpostapi = parse.newParseResource(parseheaders.mxpostapi);

    var factory = {
      getDistricts: getDistricts,
      getMunicipalities: getMunicipalities,
      getStates: getStates,
      geoZip: geoZip
    };

    return factory;

    function getDistricts(state, municipality) {
      return Mxpostapi.query({
        class: 'Districts',
        where: {
          state: state,
          municipality: municipality
        },
        limit: '1000',
        order: 'name'
      });
    }

    function getMunicipalities(state) {
      return Mxpostapi.query({
        class: 'Municipalities',
        where: {
          state: state 
        },
        limit: '1000',
        order: 'name'
      });
    }

    function getStates() {
      return Mxpostapi.query({
        class: 'States',
        order: 'name'
      });
    }

    function geoZip(zip) {
      return Mxpostapi.query({
        class: 'Districts',
        where: {
          zip: zip 
        }
      });
    }
  }
})();
