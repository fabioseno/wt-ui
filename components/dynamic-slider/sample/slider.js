/*global angular*/
angular.module('slider', ['dynamic-slider']);

angular.module('slider').controller('sliderController', ['$scope', function ($scope) {
    'use strict';
    
    $scope.pages = [
        {content: 'PAGE 1', color: '#ff0000'},
        {content: 'PAGE 2', color: '#00ff00'},
        {content: 'PAGE 3', color: '#0000ff'}
    ];
}]);