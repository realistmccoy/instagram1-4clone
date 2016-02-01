'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService, likePicturesService, $routeParams, $location) {
                this.HomeService = HomeService;
                this.likePicturesService = likePicturesService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.Ppicker = HomeService.getAll();
                this.activityPop = likePicturesService.getAll();
            }
            HomeController.prototype.likePicture = function (pickerp) {
                var _this = this;
                var LP = {
                    like: pickerp._id
                };
                this.likePicturesService.saveLikePicture(LP).then(function (res) {
                    console.log(res);
                    _this.$location.path('/');
                });
            };
            HomeController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment,
                    book: this.book._id
                };
                this.CommentService.saveComment(comment).then(function (res) {
                    _this.book.comments.push(res);
                });
            };
            HomeController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.CommentService.deleteComment(comment).then(function (res) {
                    _this.book.comments.splice(_this.book.comments.indexOf(comment), 1);
                });
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
