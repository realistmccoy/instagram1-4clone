var app;
(function (app) {
    var Services;
    (function (Services) {
        var UcService = (function () {
            function UcService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.UserCommentResource = $resource('/comments/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            UcService.prototype.getAll = function () {
                return this.UserCommentResource.query();
            };
            UcService.prototype.getComment = function (comId) {
                return this.UserCommentResource.get({ id: comId });
            };
            UcService.prototype.saveUc = function (uc) {
                return this.UserCommentResource.save(uc).$promise;
            };
            UcService.prototype.deleteUc = function (uc) {
                return this.UserCommentResource.delete({ id: uc._id }).$promise;
            };
            UcService.prototype.editUc = function (uc) {
                return this.UserCommentResource.update({ id: uc._id }).$promise;
            };
            return UcService;
        }());
        Services.UcService = UcService;
        angular.module('app').service('UcService', UcService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
