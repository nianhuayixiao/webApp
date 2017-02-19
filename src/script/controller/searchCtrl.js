/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('searchCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.name = '';
    $scope.search = function () {
        $http({
            url: 'data/positionList.json?name=' + $scope.name
        }).then(function (res) {
            $scope.search_list = res.data;
        })
    };
    $scope.search();
    $scope.spinner={};
    $scope.filterObj={};
    $scope.tabList = [
        {
            id: 'city',
            name: '城市'
        },
        {
            id: 'salary',
            name: '薪资'
        },
        {
            id: 'scale',
            name: '公司规模'
        }
    ];
    var tabId;
    $scope.tClick=function (id,name) {
        tabId=id;
        $scope.spinner.visible=true;
        $scope.spinner.list=dict[id];
    };
    $scope.spinnerClick=function (id,name) {
        if(id){
            angular.forEach($scope.tabList,function (item) {
                if(item.id==tabId){
                    item.name=name;
                }
            });
            $scope.filterObj[tabId+'Id']=id;
        }else{
            delete $scope.filterObj[tabId+'Id'];
            angular.forEach($scope.tabList,function (item) {
                if(item.id==tabId){
                    switch (item.id){
                        case 'city':
                            item.name='城市';
                            break;
                        case 'salary':
                            item.name='薪资';
                            break;
                        case 'scale ':
                            item.name='公司规模';
                            break;
                    }
                }
            })
        }
    }
}])