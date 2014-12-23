/*global angular*/
angular.module('sample', ['toastr']);

angular.module('sample').controller('toastrController', ['$scope', 'toastr', function ($scope, toastr) {
    'use strict';
    
    $scope.showToastr = function () {
        toastr.show($scope.message, $scope.type);
    };
}]);