/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('registerCtrl', ['$scope', '$http', '$interval', '$state', function ($scope, $http, $interval, $state) {
    $scope.submit = function () {
        $http.post('data/regist.json', $scope.user).success(function (res) {
            $state.go('login');
        })
    }
    $scope.send = function () {
        $http({
            url: 'data/code.json'
        }).then(function (res) {
            if (1 == res.data.state) {
                var count = 5;
                $scope.time = '5s';
                var interval = $interval(function () {
                    if (count <= 0) {
                        $interval.cancel(interval);
                        $scope.time = '';
                        return;
                    } else {
                        count--;
                        $scope.time = count + 's';
                    }
                }, 1000)
            }
        })
    }
}])