/**
 * Created by wangtiantian on 2016/7/26.
 */
/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果

 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域


 1). 给哪个(些)标签绑定什么事件监听
 2). 在回调函数中, 对哪个(些)标签进行什么操作处理
 */
$(function () {
    //1. 鼠标移入显示,移出隐藏
    hoverContent();
    //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    hoverNaviSubIterms();
    //3. 输入搜索关键字, 列表显示匹配的结果
    search();
    //4.分享更多
    showShareIcons();
    // 5. 鼠标移入移出切换地址的显示隐藏
    showAddress();
    // 6. 点击切换地址tab
    changeAddressTabs();
   // 7. 鼠标移入移出切换显示迷你购物车
    showMinCart();
    //8. 点击切换产品选项
    changeProductTabs();
    //9. 点击向右/左, 移动当前展示商品的小图片
    moveSmallImgs();
    //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    showMiddleImg();

});
//10. 当鼠标悬停在某个小图上,在上方显示对应的中图
function showMiddleImg() {
    //小图片src : images\products\product-s3.jpg
    //中图片src : images/products/product-s3-m.jpg
    var $imgs = $("#icon_list>li>img");
    //点击小图片改变li的样式
    $imgs.hover(function () {
        //显示红边框
        $(this).attr('class','hoveredThumb');
        //在上方显示中图片
        var src = this.src.replace(/.jpg$/,'-m.jpg');
        $('#mediumImg').attr('src',src);
    },function () {
        $(this).removeClass();
    })

}
//9. 点击向右/左, 移动当前展示商品的小图片
function moveSmallImgs() {
    var $as = $("#preview>h1>a");
    var $backward = $as.first();
    var $forward = $as.last();
    var $listUl =$("#icon_list");
    var $lis = $listUl.children();
    //初始化最右边的a标签
    if($lis.length > 5){
        $forward.attr('class', 'forward');
    }
    //初始化$listUl的宽度
    $listUl.css('width', 62*$lis.length);
    //定义移动的次数
    var moveContent = 0;
    //图片向右移动
    $forward.click(function () {
        //如果到最右边一张return
        if(this.className === 'forward_disabled'){
            return;
        }
        moveContent++;
        //图片移动到最右边
        if(moveContent === $lis.length-5){
            //$forward.attr('class', 'forward_disabled');
            this.className = 'forward_disabled'
        }
        $listUl.css('left',-62*moveContent);
        $backward.attr('class','backward');
    });
    //图片向左移动
    $backward.click(function () {
        console.log(moveContent);
        //如果到最左边一张return
        if(this.className === 'backward_disabled'){
            return;
        }
        moveContent--;
        //图片移动到最左边
        if(moveContent === 0){
            this.className = 'backward_disabled';
        }

        $listUl.css('left',-62*moveContent);
        $forward.attr('class','forward');
    })
}
//8. 点击切换产品选项
function changeProductTabs() {
    var $childrens = $("#product_detail>ul>li");
    $childrens.click(function () {
        if(this.className !== 'current'){
            var $divs = $('#product_info,#product_data,#product_package,#product_comment,#product_saleAfter');
            //删除当前className为current的兄弟元素
            var $lis =$(this).siblings('.current');
            $lis.removeClass();
            $divs.eq($lis.index()).hide();

            //显示出当前点击的div
            this.className = 'current';
            $divs.eq($(this).index()).show();
        }
    })

}
// 7. 鼠标移入移出切换显示迷你购物车
function showMinCart() {
    var $minCart = $("#minicart");
    $minCart.hover(function () {
        $(this).addClass('minicart');
        $(this).children('div').show();
    },function () {
        $(this).removeClass('minicart');
        $(this).children('div').hide();
    })
}
// 6. 点击切换地址tab
function changeAddressTabs() {
    var $storeTabs = $("#store_tabs>li");
    $storeTabs.click(function () {
        if(this.className == 'hover'){
            return;
        }
        //找到className为hover的兄弟元素
        $(this).siblings('.hover').removeClass();
        this.className = 'hover'

    })
}
// 5. 鼠标移入移出切换地址的显示隐藏
function showAddress() {
    var $storeSelect = $("#store_select");
    var $children = $storeSelect.children(':gt(0)');
    $storeSelect.hover(function () {
        $children.show();
    },function () {
        $children.hide();
    }).children(':last').click(function () {
        $children.hide();
    })
}
//4.分享更多
function showShareIcons() {
    var $shareA = $('#shareMore');
    var $parentDiv = $shareA.parent();
    var $shareAs = $shareA.prevAll('a:lt(2)');
    var $children = $shareA.children();
    $shareA.click(function () {
        if($children.attr('class') === 'backword'){//关闭
            console.log('a');
            $parentDiv.css('width',155);
            $shareAs.hide();
            $children.removeClass();
        }else{                          //打开
            $parentDiv.css('width',200);
            $shareAs.show();
            $children.addClass('backword');
        }
    })
}
//3. 输入搜索关键字, 列表显示匹配的结果
function search() {
    $('#txtSearch').on('foucs keyup',function () {
        if($.trim(this.value) != ''){
            $('#search_helper').show();
        }
    }).blur(function () {
        $('#search_helper').hide();
    })
}
//2. 鼠标移动切换二级导航菜单的切换显示和隐藏
function hoverContent() {
    $('[name = show_hide]').hover(function () {
        $('#'+this.id+'_items').show();
    },function () {
        $('#'+this.id+'_items').hide();
    })
}
//1. 鼠标移入显示,移出隐藏
function hoverNaviSubIterms() {
    $('#category_items>div').hover(function () {
        $(this).children('div').show();
    },function () {
        $(this).children('div').hide();
    });
}



























