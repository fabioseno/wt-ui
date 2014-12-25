/*global angular*/
angular.module('swipe-menu').controller('swipeMenuController', function SwipeMenu($scope) {
    'use strict';
    
    $scope.swipeMenu = {
        menuId: 'menu',
        returnSize: 30,
        isOpen: false
    };

    $scope.toggleMenu = function () {
        $scope.$emit('TOGGLE_MENU');
    };
    
});