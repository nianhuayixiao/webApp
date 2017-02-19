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