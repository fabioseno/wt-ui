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
            action: '&'
        },
        template: '<ul class="pagination" data-ng-show="pages.length > 0">' +
            '<li><a data-ng-click="previous();">{{ previousText }}</a></li>' +
            '<li data-ng-class="{active: page === currentPage}" data-ng-repeat="page in pages"><a data-ng-click="changePage(page);">{{ page }}</a></li>' +
            '<li><a data-ng-click="next();">{{ nextText }}</a></li>' +
            '</ul>',
        link: function (scope, element, attrs) {
            var i = 0;
            
            scope.totalPages = 0;
            scope.visiblePages = 0;
            scope.currentPage = 1;
            
            function buildPager() {
                
                if (scope.visiblePages) {
                    scope.visiblePages = parseInt(scope.visiblePages);
                } else {
                    scope.visiblePages = scope.totalPages < 9 ? scope.totalPages : 9;
                }
                
                //                if (attrs.currentPage) {
                //                    currentPage = parseInt(attrs.currentPage);
                //                }
                
                scope.previousText = attrs.previousText || '<';
                scope.nextText = attrs.nextText || '>';
                //scope.currentPage = currentPage;
                scope.pages = [];
                
                var fromPage = (scope.currentPage - Math.floor(scope.visiblePages / 2)),
                    toPage;
                
                if (fromPage < 1) {
                    fromPage = 1;
                } else if (scope.totalPages - fromPage < scope.visiblePages) {
                    fromPage = scope.totalPages - scope.visiblePages + 1;
                }
                
                toPage = fromPage + scope.visiblePages - 1;
                
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
            
            attrs.$observe('totalPages', function (value) {
                if (value) {
                    scope.totalPages = parseInt(value);
                    buildPager();
                }
            });
            
            attrs.$observe('currentPage', function (value) {
                if (value) {
                    scope.currentPage = parseInt(value);
                    buildPager();
                }
            });
            
            attrs.$observe('visiblePages', function (value) {
                if (value) {
                    scope.visiblePages = parseInt(value) < 9 ? parseInt(value) : 9;
                    buildPager();
                }
            });
        }
    };
});