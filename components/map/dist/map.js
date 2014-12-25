/*global angular*/
angular.module('map', []);

angular.module('map').directive('map', function () {
    'use strict';
    
    return {
        
        restrict: 'EA',
        
        link: function (scope, element, attrs) {
            var mapOptions = {
                center: new google.maps.LatLng(-34.397, 150.644),
                zoom: 8
            },
                map = new google.maps.Map(element[0], mapOptions);
            
        }
        
    };
});