'use strict';
var App;
(function (App) {
    angular.module('app', ['ngMaterial', 'ngRoute', 'ngResource', 'angular-filepicker', 'ngAnimate'])
        .config(function (filepickerProvider, $routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/Home.html',
            controller: app.Controllers.HomeController,
            controllerAs: 'vm'
        })
            .when('/register', {
            templateUrl: '/templates/register.html',
            controller: app.Controllers.UserController,
            controllerAs: 'vm'
        })
            .when('/login', {
            templateUrl: '/templates/login.html',
            controller: app.Controllers.UserController,
            controllerAs: 'vm'
        })
            .when('/camera', {
            templateUrl: '/templates/camera.html',
            controller: app.Controllers.pickerController,
            controllerAs: 'vm'
        })
            .when('/profile', {
            templateUrl: '/templates/profile.html',
            controller: app.Controllers.profileController,
            controllerAs: 'vm'
        })
            .when('/userComment/:id', {
            templateUrl: '/templates/userComment.html',
            controller: app.Controllers.UcController,
            controllerAs: 'vm'
        })
            .when('/activity', {
            templateUrl: '/templates/activity.html',
            controller: app.Controllers.activityController,
            controllerAs: 'vm'
        })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('HTTPFactory');
        filepickerProvider.setKey('AwMr7Yc2nQX2zdOcs5Q1Az');
    });
})(App || (App = {}));
