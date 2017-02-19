/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('meCtrl', ['$scope', '$http', '$state', 'dict', 'cache', function ($scope, $http, $state, dict, cache) {
    if (cache.get('id')) {
        $scope.id = cache.get('id');
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }
    $scope.signOut = function () {
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    }
}])