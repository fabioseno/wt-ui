/*global angular, toastr*/
angular.module('toastr', []);

// Component Dependency: Toastr

// USAGE
// scope.messager.show('my message', 'info', { positionClass: 'toast-bottom-left' });

angular.module('toastr').service('toastr', ['$log', function ($log) {
    'use strict';
    
    this.options = {
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000
    };
    
    this.clear = function () {
        toastr.clear();
    };
    
    this.show = function (message, type, options) {
        if (options) {
            if (options.positionClass) { toastr.options.positionClass = options.positionClass; }
            if (options.fadeIn) { toastr.options.fadeIn = options.fadeIn; }
            if (options.fadeOut) { toastr.options.fadeOut = options.fadeOut; }
            if (options.timeOut) { toastr.options.timeOut = options.timeOut; }
            if (options.extendedTimeOut) { toastr.options.extendedTimeOut = options.extendedTimeOut; }
        }
        
        switch (type) {
        case 'success':
            $log.log(message);
            toastr.success(message);
            break;
        case 'info':
            $log.info(message);
            toastr.info(message);
            break;
        case 'warning':
            $log.warn(message);
            toastr.warning(message);
            break;
        case 'error':
            $log.error(message);
            toastr.error(message);
            break;
        default:
            $log.info(message);
            toastr.info(message);
            break;
        }
    };
}]);