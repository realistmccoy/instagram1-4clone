'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var pickerService = (function () {
            function pickerService($resource) {
                this.$resource = $resource;
                this.UserInputResource = $resource('/pUpload/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            pickerService.prototype.addComment = function () {
            };
            pickerService.prototype.getAll = function () {
                return this.UserInputResource.query();
            };
            pickerService.prototype.savePicker = function (picker) {
                return this.UserInputResource.save(picker).$promise;
            };
            ;
            pickerService.prototype.deletePicker = function (picker) {
                return this.UserInputResource.delete({ id: picker._id }).$promise;
            };
            return pickerService;
        }());
        Services.pickerService = pickerService;
        angular.module('app').service('pickerService', pickerService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
