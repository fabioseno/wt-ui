/*global angular, alert*/
angular.module('smart', ['smart-pager']);

angular.module('smart').controller('smartController', ['$scope', 'pageBuffer', 'customDataSource', function ($scope, PageBuffer, customDataSource) {
    'use strict';

    var pageSize = 5,
        bufferFactory = new PageBuffer(pageSize, 1);

    $scope.items = [];
    $scope.logs = [];
    $scope.currentPage = 1;

    $scope.list = function (currentPage) {
        bufferFactory.getData(currentPage, function (currentPage) {
            $scope.logs.push('Retrieving page ' + currentPage + '...');
            return customDataSource.getLiveData(currentPage, pageSize);
        }).then(function (result) {
            $scope.logs.push('Page ' + currentPage + ' ready to be consumed!');

            $scope.items = result;
        });
    };

    $scope.list($scope.currentPage);

}]);

angular.module('smart').service('customDataSource', ['$q', '$timeout', function ($q, $timeout) {
    'use strict';

    this.getLiveData = function getLiveData(currentPage, pageSize) {
        var items = [], i,
            defer,
            data = {
                currentPage: currentPage
            };

        defer = $q.defer();

        $timeout(function () {
            for (i = 0; i < pageSize; i += 1) {
                items.push('Item ' + ((currentPage - 1) * pageSize + 1 + i));
            }

            data.items = items;

            defer.resolve(data);
        }, 2000);

        return defer.promise;
    };
}]);