/*global angular*/

angular.module('swipe-menu', []);

angular.module('swipe-menu').directive('swipeMenu', function () {
    'use strict';

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

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

            // Gloabl state variables
            var STATE_DEFAULT = 1,
                STATE_LEFT_SIDE = 2,
                STATE_RIGHT_SIDE = 3,
                FAST_SWIPE = 300,

                menuElement = document.getElementById(attrs.swipeMenu),
                menuReturn = parseFloat(attrs.menuReturn),

                isAnimating = false,
                initialTouchPos = null,
                initialTouchTime,
                lastTouchPos = null,
                lastTouchTime = null,
                currentXPosition = 0,
                menuXPostition = -menuReturn,
                currentState = STATE_DEFAULT;

            function getGesturePointFromEvent(evt) {
                var point = {};

                if (evt.targetTouches) {
                    point.x = evt.targetTouches[0].clientX;
                    point.y = evt.targetTouches[0].clientY;
                } else {
                    // Either Mouse event or Pointer Event
                    point.x = evt.clientX;
                    point.y = evt.clientY;
                }

                return point;
            }

            function setTransformStyle(contentX, menuX) {
                var style;

                if (menuReturn) {
                    style = 'translateX(' + menuX + 'px)';

                    menuElement.style['-ms-transform'] = style;
                    menuElement.style['-webkit-transform'] = style;
                    menuElement.style['-moz-transform'] = style;
                    menuElement.style.transform = style;
                }

                style = 'translateX(' + contentX + 'px)';

                element[0].style['-ms-transform'] = style;
                element[0].style['-webkit-transform'] = style;
                element[0].style['-moz-transform'] = style;
                element[0].style.transform = style;
            }

            function onAnimFrame() {
                if (!isAnimating) {
                    return;
                }

                var differenceInX = initialTouchPos.x - lastTouchPos.x,
                    newXTransform = currentXPosition - differenceInX,
                    newMenuXTransform = 0;

                if (menuReturn) {
                    newMenuXTransform = -(menuReturn - (newXTransform * menuReturn / menuElement.clientWidth));
                }

                setTransformStyle(newXTransform, newMenuXTransform);

                isAnimating = false;
            }

            function changeState(newState) {
                switch (newState) {
                case STATE_DEFAULT:
                case STATE_LEFT_SIDE:
                    currentXPosition = 0;
                    menuXPostition = -menuReturn;
                    break;
                case STATE_RIGHT_SIDE:
                    currentXPosition = menuElement.clientWidth;
                    menuXPostition = 0;
                    break;
                }

                setTransformStyle(currentXPosition, menuXPostition);

                currentState = newState;
            }

            function updateSwipeRestPosition() {
                var differenceInX = initialTouchPos.x - lastTouchPos.x,
                    newState = STATE_DEFAULT;

                currentXPosition = currentXPosition - differenceInX;

                // fast swipe movement implies a full movement
                if (lastTouchTime - initialTouchTime <= FAST_SWIPE) {
                    if (differenceInX > 0) {
                        newState = STATE_LEFT_SIDE;
                    } else {
                        newState = STATE_RIGHT_SIDE;
                    }
                } else {
                    if (currentXPosition < menuElement.clientWidth / 2) {
                        newState = STATE_LEFT_SIDE;
                    } else {
                        newState = STATE_RIGHT_SIDE;
                    }
                }

                changeState(newState);

                element[0].style.transition = 'all 150ms ease-out';
                menuElement.style.transition = 'all 150ms ease-out';
            }

            // Handle move gestures
            function handleGestureMove(evt) {
                evt.preventDefault();

                lastTouchPos = getGesturePointFromEvent(evt);

                var position = currentXPosition - (initialTouchPos.x - lastTouchPos.x);

                if (isAnimating || position < 0) {
                    return;
                }

                isAnimating = true;

                window.requestAnimFrame(onAnimFrame);
            }

            // Handle end gestures
            function handleGestureEnd(evt) {

                evt.preventDefault();

                if (evt.touches && evt.touches.length > 0) {
                    return;
                }

                isAnimating = false;

                // Remove Event Listeners
                if (window.PointerEventsSupport) {
                    // Remove Pointer Event Listeners
                    menuElement.removeEventListener(pointerMoveName, function (event) { event.preventDefault(); }, true);
                    document.removeEventListener(pointerMoveName, handleGestureMove, true);
                    document.removeEventListener(pointerUpName, handleGestureEnd, true);
                } else {
                    // Remove Touch Listeners
                    menuElement.removeEventListener('touchmove', function (event) { event.preventDefault(); }, true);
                    document.removeEventListener('touchmove', handleGestureMove, true);
                    document.removeEventListener('touchend', handleGestureEnd, true);
                    document.removeEventListener('touchcancel', handleGestureEnd, true);

                    // Remove Mouse Listeners
                    menuElement.removeEventListener('mousemove', function (event) { event.preventDefault(); }, true);
                    document.removeEventListener('mousemove', handleGestureMove, true);
                    document.removeEventListener('mouseup', handleGestureEnd, true);
                }

                lastTouchTime = new Date();
                updateSwipeRestPosition();
            }

            // Handle the start of gestures
            function handleGestureStart(evt) {
                evt.preventDefault();
                
                if (evt.touches && evt.touches.length > 1) {
                    return;
                }

                // Add the move and end listeners
                if (window.PointerEventsSupport) {
                    // Pointer events are supported.
                    menuElement.addEventListener(pointerMoveName, function (event) { event.preventDefault(); }, true);
                    document.addEventListener(pointerMoveName, handleGestureMove, true);
                    document.addEventListener(pointerUpName, handleGestureEnd, true);
                } else {
                    // Add Touch Listeners
                    menuElement.addEventListener('touchmove', function (event) { event.preventDefault(); }, true);
                    document.addEventListener('touchmove', handleGestureMove, true);
                    document.addEventListener('touchend', handleGestureEnd, true);
                    document.addEventListener('touchcancel', handleGestureEnd, true);

                    // Add Mouse Listeners
                    menuElement.addEventListener('mousemove', function (event) { event.preventDefault(); }, true);
                    document.addEventListener('mousemove', handleGestureMove, true);
                    document.addEventListener('mouseup', handleGestureEnd, true);
                }

                initialTouchPos = getGesturePointFromEvent(evt);
                initialTouchTime = new Date();

                element[0].style.transition = 'initial';
            }

            // Check if pointer events are supported.
            if (window.PointerEventsSupport) {
                // Add Pointer Event Listener
                element[0].addEventListener(pointerDownName, handleGestureStart, true);
            } else {
                // Add Touch Listener
                element[0].addEventListener('touchstart', handleGestureStart, true);

                // Add Mouse Listener
                element[0].addEventListener('mousedown', handleGestureStart, true);
            }

        }

    };

});