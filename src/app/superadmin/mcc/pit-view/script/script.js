(function() {
    angular.module('myApp', ['ui.bootstrap']);
    
    angular.module('myApp')
      .controller('AppController', function($scope, $modal) {
        $scope.myData = { value: 'original value' };
      
        $scope.showDialog = function() {
          console.log('hi')
          var modalInstance = $modal.open({
            templateUrl: 'dialog.html',
            controller: 'DialogController',
            resolve: {
              model: function() {
                return $scope.myData;
              }
            }
          });
        }
        
      })
      
      .controller('DialogController', function($scope, $modalInstance, model) {
        $scope.dialogData = model;
      
        $scope.onFormSubmit = function() {
          // do something
          $scope.$close();
        };
        
        $scope.cancelDialog = function() {
          $scope.myForm.$rollbackViewValue();
          $scope.$close();
        }
      });
  })();