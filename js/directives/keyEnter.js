/*global wtUI*/
/**
    The keyEnter directive executes specific actions in response to specific keys pressed.

    @class keyEnter
**/
wtUI.directive('keyEnter', ['$timeout', function ($timeout) {
    'use strict';
    
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            var attr,
                pattern = /key\d+/i,
                result;
            
            function bindEvent(callback) {
                
                $timeout(function () {
                    scope.$apply(callback);
                    
                    event.preventDefault();
                });
            }
            
            for (attr in attrs) {
                result = attr.match(pattern);
                
                if (result) {
                    if (event.which === result.input.replace('key', '')) {
                        bindEvent(attrs[result.input]);
                    }
                }
            }
        });
    };
}]);