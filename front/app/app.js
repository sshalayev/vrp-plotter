
const angular = require('angular');
const math = require('mathjs');

math.config({number: 'BigNumber', precision: 64});

const vrp = angular.module('VRPPlotter', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-resource'),
    require('angular-messages'),
    require('angular-aria'),
    require('angular-material'),
    require('angular-filter')
]);

const algotpl = require('./templates/algo.html');
console.log(algotpl);
vrp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('orange')
            .warnPalette('purple');

        $mdThemingProvider.theme('algo')
            .primaryPalette('blue')
            .accentPalette('orange')
            .warnPalette('pink');

        $urlRouterProvider.otherwise('/algo');

        $stateProvider
            .state("algo", {
                controller: 'RouteController',
                controllerAs: 'vm',
                template: require('./templates/algo.html'),
                url: "/algo",
                onEnter: function ($rootScope) {
                    $rootScope.pageTitle = 'Routing algorithms demo';
                }
            });
        console.log($stateProvider);
    }]);

vrp.run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
                $rootScope.preState = {
                    name: from.name,
                    url: from.url,
                    params: fromParams
                };
                $rootScope.curState = {
                    name: to.name,
                    url: to.url,
                    params: toParams
                };
            });
        }
    ]
);
module.exports = vrp;