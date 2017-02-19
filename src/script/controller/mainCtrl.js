/**
 * Created by yc on 2017/2/13.
 */
angular.module('app').controller('mainCtrl', ['$http','$scope','cache', function ($http,$scope,cache) {
    cache.remove('name');
    $http({
        url:'/data/positionList.json',
    }).then(function(res){
        $scope.lists1=res.data;

        }, function () {

    });
}])