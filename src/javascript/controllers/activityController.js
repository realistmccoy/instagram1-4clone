'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var activityController = (function () {
            function activityController(likePicturesService) {
                this.likePicturesService = likePicturesService;
                this.batchPicture = likePicturesService.getAll();
            }
            return activityController;
        }());
        Controllers.activityController = activityController;
        angular.module('app').controller('activityController', activityController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
