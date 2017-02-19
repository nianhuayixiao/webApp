/**
 * Created by yc on 2017/2/15.
 */
'use strict';
angular.module('app').directive('appPositionClass', [function () {
    return {
        restrict: 'A',
        replace:true,
        templateUrl:'view/template/positionClass.html',
        scope:{
            com:'='
        },
        link:function ($scope) {
            $scope.showPositionList = function (idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            }
            $scope.$watch('com',function (newValue) {
                if(newValue){
                    $scope.showPositionList(0);
                }
            })
        }
    }
}]);