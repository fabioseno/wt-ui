/*global angular*/
angular.module('sample', ['ngTouch', 'wt-ui']);

angular.module('sample').controller('toastrController', ['$scope', 'toastr', function ($scope, toastr) {
    'use strict';
    
    $scope.showToastr = function () {
        toastr.show($scope.message, $scope.type);
    };
}]);