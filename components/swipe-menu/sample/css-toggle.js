/*global angular*/
angular.module('swipe-menu').directive('cssToggle', function () {
    'use strict';
    
    var pointerDownName = 'MSPointerDown',
        pointerUpName = 'MSPointerUp',
        pointerMoveName = 'MSPointerMove';

    if (window.PointerEvent) {
        pointerDownName = 'pointerdown';
        pointerUpName = 'pointerup';
        pointerMoveName = 'pointermove';
    }

    // Simple way to check if some form of pointerevents is enabled or not
    window.PointerEventsSupport = false;
    if (window.PointerEvent || window.navigator.msPointerEnabled) {
        window.PointerEventsSupport = true;
    }
    
    return {
        link: function (scope, element, attrs) {
            
            if (!attrs.mainClass) {
                attrs.mainClass = '';
            }
            
            if (!attrs.secondaryClass) {
                attrs.secondaryClass = '';
            }
            
            function setMainClass() {
                if (attrs.secondaryClass) {
                    element[0].classList.remove(attrs.secondaryClass);
                }
                
                element[0].className += " " + attrs.mainClass;
            }
            
            function setSecondaryClass() {
                if (attrs.mainClass) {
                    element[0].classList.remove(attrs.mainClass);
                }
                
                element[0].className += " " + attrs.secondaryClass;
            }
            
            // Check if pointer events are supported.
            if (window.PointerEventsSupport) {
                // Add Pointer Event Listener
                element[0].addEventListener(pointerDownName, setMainClass, true);
                element[0].addEventListener(pointerUpName, setSecondaryClass, true);
            } else {
                // Add Touch Listener
                element[0].addEventListener('touchstart', setMainClass, true);
                element[0].addEventListener('touchend', setSecondaryClass, true);

                // Add Mouse Listener
                element[0].addEventListener('mousedown', setMainClass, true);
                element[0].addEventListener('mouseup', setSecondaryClass, true);
            }
            
        }
    };
});