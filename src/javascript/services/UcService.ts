namespace app.Services {
  export class UcService{

    public UserCommentResource;

    public getAll(){
      return this.UserCommentResource.query();
    }
    public getComment(comId){
      return this.UserCommentResource.get({id: comId});
    }
    public saveUc(uc) {
      return this.UserCommentResource.save(uc).$promise;
    }
    public deleteUc(uc){
      return this.UserCommentResource.delete({id: uc._id}).$promise;
    }
    public editUc(uc){
      return this.UserCommentResource.update({id: uc._id}).$promise;
    }


    constructor(private $resource:ng.resource.IResourceService,
      private $window: ng.IWindowService){

        this.UserCommentResource = $resource('/comments/:id', null,{
          'update':{method: 'PUT'}
        });
    }
  }
  angular.module('app').service('UcService',UcService);
}
