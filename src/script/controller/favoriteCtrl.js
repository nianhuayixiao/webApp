/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('favoriteCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $http({
        url:'data/myFavorite.json'
    }).then(function (res) {
        $scope.favoriteList=res.data;
    })
}])