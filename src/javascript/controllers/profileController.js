'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var profileController = (function () {
            function profileController() {
            }
            return profileController;
        }());
        Controllers.profileController = profileController;
        angular.module('app').controller('profileController', profileController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
