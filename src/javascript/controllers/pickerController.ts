namespace app.Controllers {
  export class pickerController {
    public file;

      public pickFile() {
          this.filepickerService.pick(
              { mimetype: 'image/*' },
              this.fileUploaded.bind(this)
          );
      }

      public fileUploaded(file) {
          // save file url to database


          this.file = file;
          this.$scope.$apply();
          this.pickerService.savePicker(this.file).then((res) => {

            this.$location.path('/userComment/' + res._id);
          });


           // force page to update
      }



      constructor(private filepickerService, private $scope: ng.IScope,
                        private pickerService: app.Services.pickerService,
                        private $location: ng.ILocationService,
                        private $routeParams: ng.route.IRouteParamsService) { }
  }

  angular.module('app').controller('pickerController', pickerController);

}
