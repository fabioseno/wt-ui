/*global wtUI*/

/**
    The pageBuffer factory manages paged data.

    @class pageBuffer
**/
wtUI.factory('pageBuffer',  ['$q', '$timeout', function ($q, $timeout) {
    'use strict';

    return function PageBuffer(pageSize, pagesToBuffer) {
        var bufferedPages = {};

        function assignResult(result) {
            bufferedPages['page' + result.currentPage] = result.items;
        }

        return {

            getData: function getData(currentPage, callback) {
                var i = 0, startPage = 1, endPage, items = [], defer, promise;

                defer = $q.defer();

                startPage = currentPage - pagesToBuffer;
                endPage = currentPage + pagesToBuffer;

                if (startPage < 1) {
                    startPage = 1;
                }

                // primeiro serve a página corrente
                if (!bufferedPages['page' + currentPage]) {
                    promise = callback(currentPage);
                    promise.then(function (result) {
                        bufferedPages['page' + result.currentPage] = result.items;
                        defer.resolve(result.items);
                    });
                } else {
                    $timeout(function () {
                        defer.resolve(bufferedPages['page' + currentPage]);
                    });
                }

                // demais páginas
                for (i = startPage; i <= endPage; i += 1) {
                    if (i !== currentPage && !bufferedPages['page' + i]) {
                        promise = callback(i);
                        promise.then(assignResult);
                    }
                }

                return defer.promise;
            }
        };
    };
}]);