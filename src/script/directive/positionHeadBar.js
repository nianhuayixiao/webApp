/**
 * Created by yc on 2017/2/14.
 */
'use strict';

angular.module('app').directive('appPositionHeadBar',[function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionHeadBar.html',
        scope:{
            text:'@'
        },
        link:function ($scope) {
            $scope.back=function () {
                window.history.back();
            }
            $scope.$emit('e_name_up',{id:1});
            $scope.$on('e_name_down',function (event,data) {
                console.log(event,data)
            })
            //当双向数据失效时，或者用原生方法操作dom时，使用$digest，一般不用，不然会发生错误
            // $scope.$digest()
        }
    }
}])