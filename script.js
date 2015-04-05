(function() {
  var app = angular.module('myApp', []);

  var MainController = function($scope, $http) {
    $http.get('sample_data.json')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available 
        $scope.data = data;
      })
      .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.error = "ERROR!!!" + data;
      });

    var createNewChild = function(item) {
      item.children.push({
        "name": $scope.newItemName,
        "children": [],
      });
      console.log("Creating child: " + $scope.newChild);
    }

    $scope.createNewChild = createNewChild;
    $scope.itemToAddTo = null;
    $scope.newChild = null;
  }

  app.controller('MainController', ["$scope", "$http", MainController]);
}());