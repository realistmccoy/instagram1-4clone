'use strict';

namespace app.Services{
  export class pickerService {


    public UserInputResource;

    public addComment(){

    }

    public getAll() {

  return this.UserInputResource.query();
}

    public savePicker(picker){

      return this.UserInputResource.save(picker).$promise;

    };

    public deletePicker(picker){
      return this.UserInputResource.delete({id: picker._id}).$promise;
    }

constructor(
  private $resource:ng.resource.IResourceService

){
  this.UserInputResource = $resource('/pUpload/:id', null,{
    'update': {method:'PUT'}
  })
}

  }
  angular.module('app').service('pickerService',pickerService);
}
