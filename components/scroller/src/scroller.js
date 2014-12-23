/*global angular*/
angular.module('scroller', []);

angular.module('scroller').directive('scroller', function () {
    'use strict';
    
    return {
        link: function (scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0,
                e = element[0];
            
            element.bind('scroll', function () {
                if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                    scope.$apply(attrs.scroller);
                }
            });
        }
    };
});