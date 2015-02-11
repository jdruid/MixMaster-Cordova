'use strict';

angular.module('MixMaster.Services', ['ngResource'])
    .factory('Occasions', function ($resource) {
        return $resource(
            'https://addb.absolutdrinks.com/occasions/:occasion_id/',
            { occasion_id: '@number' },
            {
                list: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                },
                byid: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                }
            }           
        ) 
    })
    .factory('Tastes', function ($resource) {
        return $resource(
            'https://addb.absolutdrinks.com/tastes/:taste_id/',
            { taste_id: '@number' },
            {
                list: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                },
                byid: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                }
            }
        )
    })
    .factory('Drinks', function ($resource) {
        return $resource(
            'https://addb.absolutdrinks.com/drinks/:filter/:id/',
            { filter: '@filter', id: "@id" },
            {
                list: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                },
                byid: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                }
            }
        )
    })
    .factory('Drink', function ($resource) {
        return $resource(
            'https://addb.absolutdrinks.com/drinks/:id/',
            { id: "@id" },
            {
                byid: {
                    method: 'GET', params: { apiKey: 'API_KEY' }
                }
            }
        )
    })
    .factory('LCD', function ($resource) {
        return $resource(
            'http://EDISON_IP:8800/drinks/steps',
            { drink: "@drink" },
            {
                show: {
                    method: 'POST', params: { apiKey: 'API_KEY' }
                }
            }
        )
    })
    .value('version', '0.1');


