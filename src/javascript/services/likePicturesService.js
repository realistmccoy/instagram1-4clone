'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var likePicturesService = (function () {
            function likePicturesService($resource) {
                this.$resource = $resource;
                this.likeResource = $resource('/likePictures');
            }
            likePicturesService.prototype.getAll = function () {
                return this.likeResource.query();
            };
            likePicturesService.prototype.saveLikePicture = function (likePicture) {
                return this.likeResource.save(likePicture).$promise;
            };
            return likePicturesService;
        }());
        Services.likePicturesService = likePicturesService;
        angular.module('app').service('likePicturesService', likePicturesService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
