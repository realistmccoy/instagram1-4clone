"use strict";
namespace app.Services {
  export class HomeService {
    
public PickerRes;
public BookResource;
    public  getAll(){

      return this.PickerRes.query();

    }

    public getBook(bookId) {
  // GET: /books/{{bookId}}
  return this.BookResource.get({ id: bookId });
}



    public getLike(like){
      return this.PickerRes.save(like).$promise;
    }



    public saveComment(comment){
      return this.PickerRes.save(comment).$promise;
    }

    public updateComment(comment){
      return this.PickerRes.update({id:comment._id}, comment).$promise;
    }

public deleteComment(commentId){
  return this.PickerRes.delete({_id:commentId}).$promise;
}

    constructor(private $resource: ng.resource.IResourceService) {
      this.PickerRes  = $resource('/pUpload/:id',null,
    {
  'update':{ method:'PUT'}
    });

    }

  }

  angular.module('app').service('HomeService', HomeService);
}
