var app = angular.module('myApp', ['ui.bootstrap']);
(function () {

    var MainController = function ($scope, $http, $modal) {
        $http.get('sample_data.json')
          .success(function (data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available 
              $scope.data = data;
          })
          .error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              $scope.error = "ERROR!!!" + data;
          });

        var createNewChild = function (item) {
            item.children.push({
                "name": $scope.newItemName,
                "children": [],
            });
            console.log("Creating child: " + $scope.newChild);
        }

        $scope.createNewChild = createNewChild;
        $scope.itemToAddTo = null;
        $scope.newChild = null;

        $scope.groups = [
            { title: 'Dynamic Group Header - 1', content: 'Dynamic Group Body - 1' },
            { title: 'Dynamic Group Header - 2', content: 'Dynamic Group Body - 2' }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function (item) {
            var modalInstance = $modal.open({
                templateUrl: 'NewItemModalContent.html',
                controller: 'NewItemModalInstanceCtrl',
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });

            modalInstance.result.then(function (childItem) {
                //$scope.selected = selectedItem;
                item.children.push(childItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.goToItem = function (child) {
            console.log("Go to: " + child.name);
            $scope.data = child;
        }
    }

    app.controller('MainController', ["$scope", "$http", "$modal", MainController]);
}());