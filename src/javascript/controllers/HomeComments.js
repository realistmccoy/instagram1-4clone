'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeCommentsController = (function () {
            function HomeCommentsController(pickerService, $location, $routeParams) {
                this.pickerService = pickerService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.comment = pickerService.getAll($routeParams['id']);
            }
            HomeCommentsController.prototype.addComment = function () {
                var comment = {
                    message: this.comment,
                };
            };
            return HomeCommentsController;
        }());
        Controllers.HomeCommentsController = HomeCommentsController;
        angular.module('app').controller('HomeCommentsController', HomeCommentsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
