'use strict'
namespace app.Controllers {
  export class activityController {

public batchPicture;

constructor(
  private likePicturesService: app.Services.likePicturesService
){
  this.batchPicture = likePicturesService.getAll();
}
  }
  angular.module('app').controller('activityController', activityController);
}
