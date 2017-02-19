/**
 * Created by yc on 2017/2/14.
 */
'use strict';

angular.module('app').directive('appTab',[function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/tab.html',
        scope:{
            list:'=',
            tabClick:"&"
        },
        link: function ($scope) {
            $scope.selectedId=$scope.list[0].id;
            console.log($scope.selectedId);
            $scope.changeTab = function (tab) {
                $scope.selectedId = tab.id;
                $scope.tabClick(tab);
            }
        }
    };
}])