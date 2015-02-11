'use strict';

angular.module('MixMaster.Controllers', [])
    .controller('OccasionController', ['$scope', 'Occasions', function ($scope, Occasions) {

        //console.log('OccasionController');

        $scope.myData = {
            currentOccasion: null,
            occasionsList: [],
            occasionsListState: 'open',
            occasionsListSort: 'created',
            occasionsListDirection: 'desc',
            occasionsListPage: 1
        };


        $scope.setOccasionsList = function () {
            Occasions.list({
                state: $scope.myData.occasionsListState,
                sort: $scope.myData.occasionsListSort,
                direction: $scope.myData.occasionsListDirection
            }, function (data) {
                //console.log(data);
                $scope.myData.occasionsList = data.result;
            });
        };

        $scope.setCurrentOccasion = function (number) {
            Occasions.byid({ occasion_id: number }, function (data) {
                //console.log(data);
                $scope.myData.currentOccasion = data.result;
            });
        };

        $scope.setOccasionsList();

    }])
    .controller('TastesController', ['$scope', 'Tastes', function ($scope, Tastes) {
        //console.log('TastesController');

        $scope.myData = {
            tastesList: []        
        };

        $scope.setTastesList = function () {
            Tastes.list({ state: 'true' }, function (data) {
                //console.log(data);
                $scope.myData.tastesList = data.result;
            });
        };

        $scope.setTastesList();

    }])
    .controller('DrinksController', ['$scope', '$routeParams', 'Drinks', function ($scope, $routeParams, Drinks) {
        console.log('DrinksController');

        $scope.filter = $routeParams.filter;
        $scope.id = $routeParams.id;

        //console.log("filter " + $scope.filter + " id " + $scope.id);

        $scope.myData = {
            drinksList: []
        };

        $scope.setDrinksList = function () {
            Drinks.list({
                filter: $scope.filter,
                id: $scope.id
            }, function (data) {
                //console.log(data);
                $scope.myData.drinksList = data.result;
            });
        };

        $scope.setDrinksList();

    }])
.controller('DrinkDetailController', ['$scope', '$routeParams', 'Drink', 'LCD', function ($scope, $routeParams, Drink, LCD) {
    console.log('DrinkDetailController');

    //$scope.drink = Drink.byId();

    ////$scope.filter = $routeParams.filter;
    $scope.id = $routeParams.id;

    //console.log(" id " + $scope.id);

    $scope.myData = {
        drinkList: []
    };

    $scope.setDrinkList = function () {
        Drink.byid({ id: $scope.id }, function (data) {
            console.log(data.result);
            $scope.myData.drinkList = data.result;

            var drink = { name: $scope.myData.drinkList[0].name, ingredients: $scope.myData.drinkList[0].ingredients };

            console.log(drink);

            console.log('Sending-To-LCD');
            LCD.show({ drink: drink }, function (data) {
                console.log("sent");
            });

        });
    };
    
    $scope.setDrinkList();


}]);