/**
 * Created by yc on 2017/2/16.
 */
'use strict';
// 创建全局变量dict
angular.module('app').value('dict',{}).run(['$http','dict',function ($http,dict) {
    $http({
        url:'data/city.json'
    }).then(function (res) {
        dict.city=res.data;
    });
    $http({
        url:'data/salary.json'
    }).then(function (res) {
        dict.salary=res.data;
    });
    $http({
        url:'data/scale.json'
    }).then(function (res) {
        dict.scale=res.data;
    });
}])