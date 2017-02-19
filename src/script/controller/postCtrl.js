/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('postCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.tabList = [{
        id: 'all',
        name: '全部'
    }, {
        id: 'pass',
        name: '邀请面试'
    }, {
        id: 'failed',
        name: '不合适'
    }];
    $http({
        url: 'data/myPost.json'
    }).then(function (res) {
        console.log(res.data)
        $scope.positionList = res.data;
    })
    $scope.filterObj = {};
    $scope.tClick = function (id, name) {
        switch (id) {
            case 'all':
                delete $scope.filterObj.state;
                break;
            case 'pass':
                $scope.filterObj.state='1';
                break;
            case 'failed':
                $scope.filterObj.state='-1';
                break;
        }
    }
}])