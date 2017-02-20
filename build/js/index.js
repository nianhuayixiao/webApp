/**
 * Created by yc on 2017/2/13.
 */
'use strict';

angular.module('app',['ui.router','ngCookies','validation','ngAnimate']);
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
/**
 * Created by yc on 2017/2/13.
 */
'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('main',{
        url:'/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    }).state('position',{
        url:'/position/:id',
        templateUrl:'view/position.html',
        controller:'positionCtrl'
    }).state('company',{
        url:'/company/:id',
        templateUrl:'view/company.html',
        controller:'companyCtrl'
    }).state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    }).state('register',{
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
    }).state('login',{
        url:'/login',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
    }).state('me',{
        url:'/me',
        templateUrl:'view/me.html',
        controller:'meCtrl'
    }).state('post',{
        url:'/post',
        templateUrl:'view/post.html',
        controller:'postCtrl'
    }).state('favorite',{
        url:'/favorite',
        templateUrl:'view/favorite.html',
        controller:'favoriteCtrl'
    })
    $urlRouterProvider.otherwise('main');
}])
/**
 * Created by yc on 2017/2/18.
 */
angular.module('app').config(['$validationProvider', function ($validationProvider) {
    var expression = {
        phone: /^1[\d]{10}$/,
        password: function (value) {
            var str =value+'';
            return str.length > 5;
        },
        required:function (value) {
            return !!value;
        }
    };
    var defaultMsg = {
        phone: {
            success:'',
            error:'输入11位数字'
        },
        password:  {
            success:'',
            error:'长度6位以上'
        },
        required:{
            success:'',
            error:'必填'
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])
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
/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('favoriteCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $http({
        url:'data/myFavorite.json'
    }).then(function (res) {
        $scope.favoriteList=res.data;
    })
}])
/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('loginCtrl', ['$scope', '$http','$state','cache',function ($scope, $http, $state,cache) {
    $scope.submit=function () {
        $http.post('data/login.json',$scope.user).success(function (res) {
            console.log(res)
            cache.put('id',res.id);
            cache.put('name',res.name);
            cache.put('image',res.image);
            $state.go('main');
        })
    }
}])
/**
 * Created by yc on 2017/2/13.
 */
angular.module('app').controller('mainCtrl', ['$http','$scope','cache', function ($http,$scope,cache) {
    cache.remove('name');
    $http({
        url:'/data/positionList.json',
    }).then(function(res){
        $scope.lists1=res.data;

        }, function () {

    });
}])
/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('meCtrl', ['$scope', '$http', '$state', 'dict', 'cache', function ($scope, $http, $state, dict, cache) {
    if (cache.get('id')) {
        $scope.id = cache.get('id');
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }
    $scope.signOut = function () {
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    }
}])
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
/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('postCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.tabList = [{
        id: 'all',
        name: '全部'
    }, {
        id: 'pass',
        name: '邀请面试'
    }, {
        id: 'failed',
        name: '不合适'
    }];
    $http({
        url: 'data/myPost.json'
    }).then(function (res) {
        console.log(res.data)
        $scope.positionList = res.data;
    })
    $scope.filterObj = {};
    $scope.tClick = function (id, name) {
        switch (id) {
            case 'all':
                delete $scope.filterObj.state;
                break;
            case 'pass':
                $scope.filterObj.state='1';
                break;
            case 'failed':
                $scope.filterObj.state='-1';
                break;
        }
    }
}])
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
/**
 * Created by yc on 2017/2/13.
 */
'use strict';
angular.module('app').controller('searchCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.name = '';
    $scope.search = function () {
        $http({
            url: 'data/positionList.json?name=' + $scope.name
        }).then(function (res) {
            $scope.search_list = res.data;
        })
    };
    $scope.search();
    $scope.spinner={};
    $scope.filterObj={};
    $scope.tabList = [
        {
            id: 'city',
            name: '城市'
        },
        {
            id: 'salary',
            name: '薪资'
        },
        {
            id: 'scale',
            name: '公司规模'
        }
    ];
    var tabId;
    $scope.tClick=function (id,name) {
        tabId=id;
        $scope.spinner.visible=true;
        $scope.spinner.list=dict[id];
    };
    $scope.spinnerClick=function (id,name) {
        if(id){
            angular.forEach($scope.tabList,function (item) {
                if(item.id==tabId){
                    item.name=name;
                }
            });
            $scope.filterObj[tabId+'Id']=id;
        }else{
            delete $scope.filterObj[tabId+'Id'];
            angular.forEach($scope.tabList,function (item) {
                if(item.id==tabId){
                    switch (item.id){
                        case 'city':
                            item.name='城市';
                            break;
                        case 'salary':
                            item.name='薪资';
                            break;
                        case 'scale ':
                            item.name='公司规模';
                            break;
                    }
                }
            })
        }
    }
}])
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
/**
 * Created by yc on 2017/2/13.
 */
'use strict';

angular.module('app').directive('appHead',['cache',function (cache) {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html',
        link:function ($scope) {
            $scope.id=cache.get('id')||'';
            $scope.name = cache.get('name')||'';
        }
    }
}])
/**
 * Created by yc on 2017/2/15.
 */
'use strict';
angular.module('app').directive('appPositionClass', [function () {
    return {
        restrict: 'A',
        replace:true,
        templateUrl:'view/template/positionClass.html',
        scope:{
            com:'='
        },
        link:function ($scope) {
            $scope.showPositionList = function (idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            }
            $scope.$watch('com',function (newValue) {
                if(newValue){
                    $scope.showPositionList(0);
                }
            })
        }
    }
}]);
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
/**
 * Created by yc on 2017/2/15.
 */
'use strict';
angular.module('app').directive('appPositionInfo', ['$http',function ($http) {
    return {
        restrict: 'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isLogin:'=',
            pos:'='
        },
        link:function ($scope) {
            $scope.$watch('pos',function (newValue) {
                if(newValue){
                    $scope.pos.select=$scope.pos.select||'';
                    $scope.imgPath=$scope.pos.select?'image/star-active.png':'image/star.png';
                }
            })
            $scope.clickStar=function () {
                $http.post('data/favorite.json',{
                    id:$scope.pos.id,
                    select:$scope.pos.select
                }).success(function (res) {
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imgPath=$scope.pos.select?'image/star-active.png':'image/star.png';

                })
            }
        }
    }
}]);
/**
 * Created by yc on 2017/2/14.
 */
'use strict';

angular.module('app').directive('appPositionList',['$http',function ($http) {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=',
            filterObj:'=',
            isFavorite:'='
        },
        link:function ($scope) {
            $scope.select=function (item) {
                $http.post('data/myFavorite.json',{id:item.id,select:!item.select})
                    .success(function (res) {
                        item.select = !item.select;
                    })
            }
        }
    }
}])
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
/**
 * Created by yc on 2017/2/14.
 */
'use strict';

angular.module('app').directive('appTab',[function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/tab.html',
        scope:{
            list:'=',
            tabClick:"&"
        },
        link: function ($scope) {
            $scope.selectedId=$scope.list[0].id;
            console.log($scope.selectedId);
            $scope.changeTab = function (tab) {
                $scope.selectedId = tab.id;
                $scope.tabClick(tab);
            }
        }
    };
}])
/**
 * Created by yc on 2017/2/17.
 */
'use strict';

angular.module('app').filter('filterByObj', [function () {
    return function (list, obj) {
        var result=[];
        angular.forEach(list,function (item) {
            var isEqual=true;
            for(var e in obj){
                if(item[e]!==obj[e]){
                    isEqual=false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        })
        return result;
    }
}])
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
