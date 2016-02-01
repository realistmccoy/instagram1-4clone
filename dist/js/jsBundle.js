"use strict";

function filepickerDirective(e, r, i) {
    return {
        restrict: "A",
        scope: {
            onSuccess: "&"
        },
        link: function (i, n, t) {
            var c, l;
            n.bind("change", function (r) {
                r.preventDefault(), i.onSuccess({
                    event: r.originalEvent || r
                }), e.$apply()
            }), n = n.length ? n[0] : n;
            for (c in t.$attr) l = t.$attr[c], n.setAttribute(l, t[c]);
            r.constructWidget(n)
        }
    }
}
function filepickerService(e) {
    return e.filepicker
}
function filepickerPreviewDirective(e, r) {
    return {
        restrict: "A",
        scope: {
            url: "="
        },
        link: function (e, r, i) {
            function n(e) {
                e && (e = e.replace("api/file/", "api/preview/"), c.src = e)
            }
            var t = e.url,
                c = document.createElement("iframe");
            c.src = t, c.width = "100%", c.height = "100%", angular.element(r).append(c), e.$watch("url", n)
        }
    }
}
function fpUtilService() {
    function e(e) {
        var i = [];
        for (var n in e) e.hasOwnProperty(n) && ("[object Object]" !== Object.prototype.toString.call(e[n]) ? i.push(n + "=" + e[n]) : i.push(r(e[n])));
        return i.join("&")
    }
    function r(e) {
        var r = [];
        for (var i in e) e.hasOwnProperty(i) && r.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
        return r.join("&")
    }
    return {
        toParams: e,
        serialize: r
    }
}
function fpConvert(e, r) {
    return function (i, n) {
        var t = e("fpUrlFilter")(i);
        if (t && n) return t + "/convert?" + r.toParams(n)
    }
}
angular.module("angular-filepicker", []), window.filepicker = window.filepicker || {}, window.filepicker.plugin = "angular_js_lib", angular.module("angular-filepicker").directive("filepicker", filepickerDirective), filepickerDirective.$inject = ["$rootScope", "filepickerService", "$parse"], angular.module("angular-filepicker").provider("filepicker", function () {
    this.$get = function () {
        return window.filepicker
    }, this.setKey = function (e) {
        try {
            window.filepicker.setKey(e)
        } catch (r) {
            console.error("Include filepicker.js script")
        }
    }
}), angular.module("angular-filepicker").service("filepickerService", filepickerService), filepickerService.$inject = ["$window"], angular.module("angular-filepicker").directive("filepickerPreview", filepickerPreviewDirective), filepickerPreviewDirective.$inject = ["$rootScope", "filepickerService"], angular.module("angular-filepicker").service("fpUtilService", fpUtilService), angular.module("angular-filepicker").filter("fpConvert", fpConvert), fpConvert.$inject = ["$filter", "fpUtilService"], angular.module("angular-filepicker").filter("fpUrlFilter", function () {
    return function (e) {
        if (!e) return "";
        var r = ["/convert", "/metadata", "?"];
        for (var i in r) {
            var n = e.indexOf(r[i]);
            if (n > -1) return e.substr(0, n)
        }
        return e
    }
});

'use strict';
var App;
(function (App) {
    angular.module('app', ['ngMaterial', 'ngRoute', 'ngResource', 'angular-filepicker', 'ngAnimate']).config(function (filepickerProvider, $routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/Home.html',
            controller: app.Controllers.HomeController,
            controllerAs: 'vm'
        }).when('/register', {
            templateUrl: '/templates/register.html',
            controller: app.Controllers.UserController,
            controllerAs: 'vm'
        }).when('/login', {
            templateUrl: '/templates/login.html',
            controller: app.Controllers.UserController,
            controllerAs: 'vm'
        }).when('/camera', {
            templateUrl: '/templates/camera.html',
            controller: app.Controllers.pickerController,
            controllerAs: 'vm'
        }).when('/profile', {
            templateUrl: '/templates/profile.html',
            controller: app.Controllers.profileController,
            controllerAs: 'vm'
        }).when('/userComment/:id', {
            templateUrl: '/templates/userComment.html',
            controller: app.Controllers.UcController,
            controllerAs: 'vm'
        }).when('/activity', {
            templateUrl: '/templates/activity.html',
            controller: app.Controllers.activityController,
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('HTTPFactory');
        filepickerProvider.setKey('AwMr7Yc2nQX2zdOcs5Q1Az');
    });
})(App || (App = {}));

'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var GlobalController = (function () {
            function GlobalController(UserService) {
                this.UserService = UserService;
                this.status = UserService.status;
            }
            GlobalController.prototype.logout = function () {
                this.UserService.removeToken();
                this.UserService.removeUser();
            };
            return GlobalController;
        }());
        Controllers.GlobalController = GlobalController;
        angular.module('app').controller('GlobalController', GlobalController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));

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

'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserController = (function () {
            function UserController(UserService, $location) {
                this.UserService = UserService;
                this.$location = $location;
            }
            UserController.prototype.register = function () {
                var _this = this;
                var user = {
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password
                };
                this.UserService.register(user).then(function (res) {
                    _this.$location.path('/');
                });
            };;
            UserController.prototype.login = function () {
                var _this = this;
                this.UserService.login(this.user).then(function (res) {
                    _this.UserService.setToken(res.token);
                    _this.UserService.setUser();
                    _this.$location.path('/');
                });
            };
            return UserController;
        }());
        Controllers.UserController = UserController;
        angular.module('app').controller('UserController', UserController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));

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
                this.filepickerService.pick({
                    mimetype: 'image/*'
                }, this.fileUploaded.bind(this));
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

'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var profileController = (function () {
            function profileController() {}
            return profileController;
        }());
        Controllers.profileController = profileController;
        angular.module('app').controller('profileController', profileController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));

"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        angular.module('app').factory('HTTPFactory', function ($window) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    config.headers['Accepts'] = 'application/json';
                    config.headers['Content-Type'] = 'application/json';
                    if ($window.localStorage.getItem('token')) {
                        config.headers['Authorization'] = "Bearer " + $window.localStorage.getItem('token');
                    }
                    return config;
                }
            };
        });
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));

"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.PickerRes = $resource('/pUpload/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.PickerRes.query();
            };
            HomeService.prototype.getBook = function (bookId) {
                return this.BookResource.get({
                    id: bookId
                });
            };
            HomeService.prototype.getLike = function (like) {
                return this.PickerRes.save(like).$promise;
            };
            HomeService.prototype.saveComment = function (comment) {
                return this.PickerRes.save(comment).$promise;
            };
            HomeService.prototype.updateComment = function (comment) {
                return this.PickerRes.update({
                    id: comment._id
                }, comment).$promise;
            };
            HomeService.prototype.deleteComment = function (commentId) {
                return this.PickerRes.delete({
                    _id: commentId
                }).$promise;
            };
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var Services;
    (function (Services) {
        var UcService = (function () {
            function UcService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.UserCommentResource = $resource('/comments/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            }
            UcService.prototype.getAll = function () {
                return this.UserCommentResource.query();
            };
            UcService.prototype.getComment = function (comId) {
                return this.UserCommentResource.get({
                    id: comId
                });
            };
            UcService.prototype.saveUc = function (uc) {
                return this.UserCommentResource.save(uc).$promise;
            };
            UcService.prototype.deleteUc = function (uc) {
                return this.UserCommentResource.delete({
                    id: uc._id
                }).$promise;
            };
            UcService.prototype.editUc = function (uc) {
                return this.UserCommentResource.update({
                    id: uc._id
                }).$promise;
            };
            return UcService;
        }());
        Services.UcService = UcService;
        angular.module('app').service('UcService', UcService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.status = {
                    _id: null,
                    email: null,
                    username: null
                };
                this.UserRegisterResource = $resource('/users/register');
                this.UserLoginResource = $resource('/users/login');
                if (this.getToken()) this.setUser();
            }
            UserService.prototype.login = function (user) {
                return this.UserLoginResource.save(user).$promise;
            };
            UserService.prototype.register = function (user) {
                console.log(user);
                return this.UserRegisterResource.save(user).$promise;
            };;
            UserService.prototype.setToken = function (token) {
                this.$window.localStorage.setItem('token', token);
            };;
            UserService.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            UserService.prototype.removeToken = function () {
                this.$window.localStorage.removeItem('token');
            };
            UserService.prototype.removeUser = function () {
                this.status._id = null;
                this.status.email = null;
                this.status.username = null;
            };
            UserService.prototype.setUser = function () {
                var u = JSON.parse(atob(this.$window.localStorage.getItem('token').split('.')[1]));
                this.status._id = u._id;
                this.status.email = u.email;
                this.status.username = u.username;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('app').service('UserService', UserService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));

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

'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var pickerService = (function () {
            function pickerService($resource) {
                this.$resource = $resource;
                this.UserInputResource = $resource('/pUpload/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            }
            pickerService.prototype.addComment = function () {};
            pickerService.prototype.getAll = function () {
                return this.UserInputResource.query();
            };
            pickerService.prototype.savePicker = function (picker) {
                return this.UserInputResource.save(picker).$promise;
            };;
            pickerService.prototype.deletePicker = function (picker) {
                return this.UserInputResource.delete({
                    id: picker._id
                }).$promise;
            };
            return pickerService;
        }());
        Services.pickerService = pickerService;
        angular.module('app').service('pickerService', pickerService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));