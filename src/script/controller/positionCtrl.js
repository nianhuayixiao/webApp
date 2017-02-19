/**
 * Created by yc on 2017/2/13.
 */
angular.module('app').controller('positionCtrl', ['$scope','$http','$state', '$q','cache',function ($scope,$http,$state,$q,cache) {
    $scope.isLogin=!!cache.get('id')||'';
    $scope.message=$scope.isLogin?'投简历':'登陆';
    function getPosition(){
        var defer = $q.defer();
        $http({
            url:'data/position.json?id='+$state.params.id,
        }).then(function (res) {
            $scope.position=res.data;
            if($scope.position.posted){
                if($scope.isLogin){
                    $scope.message="已投递";
                }
            }
            defer.resolve(res.data);
        },function (err) {
            defer.reject(err);
        });
        return defer.promise;
    };
    function getCompany(id) {
        $http({
            url:'/data/company.json?id='+id
        }).then(function (res) {
            $scope.company = res.data;
        })
    }
    getPosition().then(function (obj) {
        getCompany(obj.companyId)
    })
    $scope.go=function () {
        if(!$scope.position.posted){
            if($scope.isLogin){
                $http.post('data/handle.json',{
                    id:$scope.position.id,
                }).success(function (res) {
                    console.log('投递简历成功');
                    $scope.message="已投递"
                })
            }else{
                $state.go('login');
            }
        }

    }
}])