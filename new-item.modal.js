(function () {
    angular.module('myApp').controller('NewItemModalInstanceCtrl', function ($scope, $modalInstance) {

        $scope.ok = function () {
            //$modalInstance.close($scope.selected.item);
            $modalInstance.close({"name": $scope.newItemName, "description": $scope.newItemDescription, "children": []});
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
}());
