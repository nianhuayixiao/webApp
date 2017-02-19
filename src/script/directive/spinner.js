/**
 * Created by yc on 2017/2/14.
 */
'use strict';

angular.module('app').directive('appSpinner',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/spinner.html',
        scope:{
            list:'=',
            visible:'=',
            select:'&'
        },
        link:function ($scope) {

        }
    }
}])