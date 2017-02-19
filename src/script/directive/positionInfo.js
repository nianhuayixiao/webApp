/**
 * Created by yc on 2017/2/15.
 */
'use strict';
angular.module('app').directive('appPositionInfo', ['$http',function ($http) {
    return {
        restrict: 'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isLogin:'=',
            pos:'='
        },
        link:function ($scope) {
            $scope.$watch('pos',function (newValue) {
                if(newValue){
                    $scope.pos.select=$scope.pos.select||'';
                    $scope.imgPath=$scope.pos.select?'image/star-active.png':'image/star.png';
                }
            })
            $scope.clickStar=function () {
                $http.post('data/favorite.json',{
                    id:$scope.pos.id,
                    select:$scope.pos.select
                }).success(function (res) {
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imgPath=$scope.pos.select?'image/star-active.png':'image/star.png';

                })
            }
        }
    }
}]);