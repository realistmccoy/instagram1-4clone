'use strict'

namespace app.Services {
  export class likePicturesService {
    public likeResource;

    getAll() {
      return this.likeResource.query();
    }
    saveLikePicture(likePicture){
      return this.likeResource.save(likePicture).$promise;
    }

    constructor(private $resource: ng.resource.IResourceService){
      this.likeResource = $resource('/likePictures')
    }


  }
  angular.module('app').service('likePicturesService', likePicturesService);
}
