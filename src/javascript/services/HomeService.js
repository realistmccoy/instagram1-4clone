"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.PickerRes = $resource('/pUpload/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.PickerRes.query();
            };
            HomeService.prototype.getBook = function (bookId) {
                return this.BookResource.get({ id: bookId });
            };
            HomeService.prototype.getLike = function (like) {
                return this.PickerRes.save(like).$promise;
            };
            HomeService.prototype.saveComment = function (comment) {
                return this.PickerRes.save(comment).$promise;
            };
            HomeService.prototype.updateComment = function (comment) {
                return this.PickerRes.update({ id: comment._id }, comment).$promise;
            };
            HomeService.prototype.deleteComment = function (commentId) {
                return this.PickerRes.delete({ _id: commentId }).$promise;
            };
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
