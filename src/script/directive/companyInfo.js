/**
 * Created by yc on 2017/2/15.
 */
'use strict';
angular.module('app').directive('appCompanyInfo', [function () {
    return {
        restrict: 'A',
        replace:true,
        templateUrl:'view/template/companyInfo.html',
        scope:{
            com:'='
        }
    }
}]);