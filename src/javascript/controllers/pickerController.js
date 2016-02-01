var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var pickerController = (function () {
            function pickerController(filepickerService, $scope, pickerService, $location, $routeParams) {
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.pickerService = pickerService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            pickerController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            pickerController.prototype.fileUploaded = function (file) {
                var _this = this;
                this.file = file;
                this.$scope.$apply();
                this.pickerService.savePicker(this.file).then(function (res) {
                    _this.$location.path('/userComment/' + res._id);
                });
            };
            return pickerController;
        }());
        Controllers.pickerController = pickerController;
        angular.module('app').controller('pickerController', pickerController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
