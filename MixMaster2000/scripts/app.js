'use strict';

var app = angular.module('MixMaster', ['ngRoute','ngResource',
  'MixMaster.Controllers',
  'MixMaster.Services'
]);


/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      // Home
      .when("/", { templateUrl: "views/occasions.html", controller: "OccasionController" })
      // Pages
      .when("/actions", { templateUrl: "views/actions.html", controller: "TastesController" })
      .when("/glasses", { templateUrl: "views/glasses.html", controller: "TastesController" })
      .when("/ingredienttypes", { templateUrl: "views/ingredienttypes.html", controller: "TastesController" })
      .when("/occasions", { templateUrl: "views/occasions.html", controller: "OccasionController" })
      .when("/settings", { templateUrl: "views/settings.html", controller: "TastesController" })
      .when("/tastes", { templateUrl: "views/tastes.html", controller: "TastesController" })
    .when("/drinks/:filter/:id", { templateUrl: "views/filter-results.html", controller: "DrinksController" })
    .when("/drinks/:id", { templateUrl: "views/drink-detail.html", controller: "DrinkDetailController" })
      
}]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ms-appx):/);
}]);

