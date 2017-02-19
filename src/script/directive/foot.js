/**
 * Created by yc on 2017/2/14.
 */
'use strict';

angular.module('app').directive('appFoot',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}])