angular.module('slider', ['wt-ui']);

angular.module('slider').controller('sliderController', ['$scope', function ($scope) {
    'use strict';
    
    $scope.pages = ['PAGE 1', 'PAGE 2', 'PAGE 3'];
}]);