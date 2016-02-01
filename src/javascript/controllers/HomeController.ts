'use strict';
namespace app.Controllers {
  export class HomeController {
    public Ppicker;


    public like;
    public activityPop;
    public comment: String;
    public likePicture(pickerp){
          let LP = {
            like: pickerp._id
          };
          this.likePicturesService.saveLikePicture(LP).then((res) =>{
            console.log(res);
            this.$location.path('/')
          })
        }

        public addComment() {
  let comment = {
    message: this.comment,
    book: this.book._id
  };
  this.CommentService.saveComment(comment).then((res) => {
    this.book.comments.push(res);
  });
}

public deleteComment(comment) {
  this.CommentService.deleteComment(comment).then((res) => {
    this.book.comments.splice(this.book.comments.indexOf(comment), 1);
  });
}



    constructor(private HomeService: app.Services.HomeService,
      private likePicturesService: app.Services.likePicturesService,
      private $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
                        ){

                          this.Ppicker = HomeService.getAll();

                          this.activityPop = likePicturesService.getAll();


    }


}
  angular.module('app').controller('HomeController', HomeController);
}
