/**
 * Created by wangtiantian on 2016/7/25.
 */
/*
扩展jQuery工具方法
* leftTrim(str)去除左边的空格
* rightTrim(str)去除右边的空格
*/
//$的扩展方法$.extend(obj)
$.extend({
    leftTrim : function (str) {
        return str.replace(/^\s+/, '');
    },
    rightTrim : function (str) {
        return str.replace(/\s+$/, '');
    }
});

/*
* checkAllL:全选
* unCheckAll:全部选
* reverseCheck:反选
* */
//jQuery对象的扩展方法
$.fn.extend({
    checkAll : function () {
        this.prop('checked',true);
    },
    unCheckAll : function () {
        this.prop('checked',false);
    },
    reverseCheck : function () {
        this.each(function () {                 //this是jQuery对象
            this.checked = !this.checked;       //this是dom元素
        })
    }

});





















































