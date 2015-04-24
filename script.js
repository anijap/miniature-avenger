var app = angular.module('myApp', ['ui.bootstrap']);
(function () {

    var MainController = function ($scope, $http, $modal, fileReader) {
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
                childItem.parent = item;
                item.children.push(childItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.goToItem = function (child) {
            console.log("Go to: " + child.name);
            $scope.data = child;
        }

        $scope.goToParent = function (child) {
            $scope.data = child.parent;
        }

        $scope.saveData = function (data) {
            // Navigate to the top
            while (data.parent !== data) {
                data = data.parent;
            }

            // Clean up parents
            var cleanUpParents = function (data) {
                delete data.parent;
                delete data.$$hashKey; // where did this come from? for some reason it's there in the data

                if (data.children) {
                    data.children.forEach(function (child) {
                        cleanUpParents(child);
                    });
                }
            }
            cleanUpParents(data);

            // Save to file
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            saveAs(blob, "ToDo.json");
        }

        $scope.readFile = function () {
            var reader = new FileReader();


            reader.onloadend = function (event) {

                var stuff = 7;
                // this callback will be called asynchronously
                // when the response is available 
                var temp = JSON.parse(event.target.result);
                //$scope.data = JSON.parse(reader.result);
                temp.parent = temp; // This is the root

                // Set up parents
                var setUpParents = function (data) {
                    if (data.children) {
                        data.children.forEach(function (child) {
                            child.init = function () {
                                child.parent = data;
                                delete this.init;
                                return this;
                            }
                            child.init();
                        });

                        data.children.forEach(function (child) {
                            setUpParents(child);
                        });
                    }
                }

                setUpParents(temp);
                $scope.data = temp;
                $scope.$apply();

            };

            reader.readAsText($scope.file);
        };
    }

    app.controller('MainController', ["$scope", "$http", "$modal", "fileReader", MainController]);
}());