'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UcController = (function () {
            function UcController(UcService, $location, $routeParams) {
                this.UcService = UcService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            UcController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment.message,
                    UcCom: this.$routeParams['id']
                };
                this.UcService.saveUc(comment).then(function (res) {
                    _this.$location.path('/');
                });
            };
            UcController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.UcService.deleteUc(comment).then(function (res) {
                    _this.dawg.comments.splice(_this.dawg.comments.indexOf(comment), 1);
                });
            };
            return UcController;
        }());
        Controllers.UcController = UcController;
        angular.module('app').controller('UcController', UcController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
