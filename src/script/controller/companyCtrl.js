/**
 * Created by yc on 2017/2/13.
 */
angular.module('app').controller('companyCtrl', ['$scope', '$http','$state',function ($scope,$http,$state) {
    $http({
        url:'/data/company.json?id='+$state.params.id,
    }).then(function (res) {
        $scope.company=res.data;
        $scope.$broadcast('e_name_down',{id:2});
    })
    //事件传播要考虑接收方是否已初始化完毕，$emit,$broadcast,$on放的位置要注意
    $scope.$on('e_name_up',function (event,data) {
        console.log(event,data)
    })
    //不要再controller中写原生dom操作，document.getElementById(''),如果要写在指令中，因为用原生的容易发生数据绑定失效
}])