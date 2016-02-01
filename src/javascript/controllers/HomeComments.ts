'use strict';

namespace app.Controllers{
  export class HomeCommentsController{
    public comment;

    public addComment(){
      let comment = {
        message: this.comment,
        
      }
    }

    constructor(
      private pickerService: app.Services.pickerService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      this.comment = pickerService.getAll($routeParams['id']);
    }
  }
  angular.module('app').controller('HomeCommentsController', HomeCommentsController)
}
