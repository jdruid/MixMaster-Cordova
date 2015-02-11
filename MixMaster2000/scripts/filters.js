'use strict';

/* Filters */

angular.module('MixMaster.Filters', []).
  filter('interpolate', ['version', function (version) {
      return function (text) {
          return String(text).replace(/\%VERSION\%/mg, version);
      }
  }]);