'use strict';

/* Directives */


angular.module('MixMaster.Directives', []).
  directive('appVersion', ['version', function (version) {
      return function (scope, elm, attrs) {
          elm.text(version);
      };
  }]);