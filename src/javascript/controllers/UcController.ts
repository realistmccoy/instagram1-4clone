'use strict'
namespace app.Controllers {
  export class UcController{

public comment;
public dawg;



    public addComment() {
    let comment = {
      message: this.comment.message,
      UcCom: this.$routeParams['id']
    };
    this.UcService.saveUc(comment).then((res) => {
    this.$location.path('/');
    });
  }

  public deleteComment(comment) {
    this.UcService.deleteUc(comment).then((res) => {
      this.dawg.comments.splice(this.dawg.comments.indexOf(comment), 1);
    });
  }




    constructor(private UcService: app.Services.UcService,

                      private $location: ng.ILocationService,
                      private $routeParams: ng.route.IRouteParamsService

  ){

    }
  }
angular.module('app').controller('UcController', UcController);
}
