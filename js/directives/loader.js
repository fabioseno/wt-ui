/*global wtUI*/

/**
    The loader directive displays a loader image in response to executing operations.

    @class loader
**/
wtUI.directive('loader', function () {
    'use strict';
    
    return {
        
        restrict: 'AE',
        
        template: '<div class="loader"><div class="rotate rotate_01"></div><div lass="rotate rotate_02"></div><div class="rotate rotate_03"></div><div class="rotate rotate_04"></div><div class="rotate rotate_05"></div><div class="rotate rotate_06"></div><div class="rotate rotate_07"></div><div class="rotate rotate_08"></div></div>',
        
        scope: {
            loader: '='
        },
        
        link: function (scope, element, attrs) {
            element[0].style.position = "absolute";
            element[0].style.width = parent.offsetWidth + 'px';
            element[0].style.height = parent.offsetHeight + 'px';
            
            scope.$watch('loader', function (newValue, oldValue, scope) {
                if (newValue) {
                    element[0].style.display = 'block';
                } else {
                    element[0].style.display = 'none';
                }
            });
        }
        
    };
});