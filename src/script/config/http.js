/**
 * Created by yc on 2017/2/18.
 */
'use strict';
angular.module('app').config(['$provide', function ($provide) {
    $provide.decorator('$http', ['$delegate', '$q', function ($delegate, $q) {
        $delegate.post = function (url, data, config) {
            var deferd = $q.defer();
            /*$delegate.get(url).success(function (res) {
                deferd.resolve(res)
            }).error(function (err) {
                deferd.reject(err)
            })*/
            $delegate({url:url}).then(function (res) {
                deferd.resolve(res.data);
            },function (err) {
                deferd.reject(err);
            })
            return{
                success:function (cb) {
                    deferd.promise.then(cb);
                },
                error:function (cb) {
                    deferd.promise.then(null,cb);
                }
            };
        };
        return $delegate;
    }])
}])