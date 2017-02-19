/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('loginCtrl', ['$scope', '$http','$state','cache',function ($scope, $http, $state,cache) {
    $scope.submit=function () {
        $http.post('data/login.json',$scope.user).success(function (res) {
            console.log(res)
            cache.put('id',res.id);
            cache.put('name',res.name);
            cache.put('image',res.image);
            $state.go('main');
        })
    }
}])