/*global wtUI*/

/**
    The pager directive displays a pager navigation component.

    @class pager
**/
wtUI.directive('pager', function () {
    'use strict';
    
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            currentPage: '=',
            totalPages: '=',
            action: '&'
        },
        template: '<ul class="pagination">' +
                    '<li><a data-ng-click="previous();">{{ previousText }}</a></li>' +
                    '<li data-ng-class="{active: page === currentPage}" data-ng-repeat="page in pages"><a data-ng-click="changePage(page);">{{ page }}</a></li>' +
                    '<li><a data-ng-click="next();">{{ nextText }}</a></li>' +
                  '</ul>',
        link: function (scope, element, attrs) {
            var i = 0;
            
            scope.previousText = element.previousText ? element.previousText : '<';
            scope.nextText = element.nextText ? element.nextText : '>';
            scope.visiblePages = element.visiblePages ? parseFloat(element.visiblePages) : 9;
            scope.currentPage = scope.currentPage ? scope.currentPage : 1;
            
            scope.pages = [];
            
            function buildPager() {
                var fromPage = (scope.currentPage - Math.floor(scope.visiblePages / 2));
                
                if (fromPage < 1) {
                    fromPage = 1;
                } else if (scope.totalPages - fromPage < scope.visiblePages) {
                    fromPage = scope.totalPages - scope.visiblePages + 1;
                }
                
                var toPage = fromPage + scope.visiblePages - 1;
                
                if (toPage > scope.totalPages) {
                    toPage = scope.totalPages;
                }
                
                scope.pages = [];
                    
                for (i = fromPage; i <= toPage; i += 1) {
                    scope.pages.push(i);
                }
            }
            
            scope.previous = function () {
                if (scope.currentPage > 1) {
                    scope.currentPage -= 1;
                    
                    scope.changePage(scope.currentPage);
                }
            };
            
            scope.next = function () {
                if (scope.currentPage < scope.totalPages) {
                    scope.currentPage += 1;
                    
                    scope.changePage(scope.currentPage);
                }
            };
            
            scope.changePage = function (page) {
                scope.currentPage = page;
                scope.action({ page: scope.currentPage});
                
                buildPager();
            };
            
            buildPager();
        }
    };
});