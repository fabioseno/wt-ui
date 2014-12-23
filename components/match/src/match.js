/*global angular, $*/
angular.module('match', []);

angular.module('match').directive('wtMatch', [function () {
    'use strict';
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstInput = '#' + attrs.wtMatch;
            elem.add(firstInput).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstInput).val();
                    ctrl.$setValidity('wtmatch', v);
                });
            });
        }
    };
}]);