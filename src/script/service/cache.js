/**
 * Created by yc on 2017/2/16.
 */
'use strict';

angular.module('app').service('cache', ['$cookies', function ($cookies) {
    this.put = function (key, value) {
        $cookies.put(key, value);
    }
    this.get = function (key) {
        return $cookies.get(key);
    }
    this.remove = function (key) {
        $cookies.remove(key);
    }
}])
//factory写法：不能用this，用return返回一个对象，而且factory内部可以声明一个私有对象，service不可；
/*
angular.module('app').factory('cache', ['$cookies', function ($cookies) {
    var a = {};
    return {
        put: function (key, value) {
            $cookies.put(key, value);
        },
        get: function (key) {
            return $cookies.get(key);
        },
        remove: function (key) {
            $cookies.remove(key);
        }
    }

}])*/
