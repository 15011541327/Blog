/*
 1). 给哪个(些)标签绑定什么事件监听
 2). 在回调函数中, 对哪个(些)标签进行什么操作处理
 */

$(function () {
        //1. 鼠标移入显示,移出隐藏
        //目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
        showhide();
        //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
        showSubItems();
        //3. 输入搜索关键字, 列表显示匹配的结果
        search();
        //4. 点击显示或者隐藏更多的分享图标
        showMore();
        //5. 鼠标移入移出切换地址的显示隐藏
        showAddress();
        //6. 点击切换地址tab
        changeAddressTabs();
        //7. 鼠标移入移出切换显示迷你购物车
        changeMinCart();
        //8. 点击切换产品选项
        changeProductTabs();
        //9. 点击向右/左, 移动当前展示商品的小图片
        moveSmallImgs();
        //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
        showMiddleImg();
        //11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
        showBigImg();

});
//11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
function showBigImg() {
    var $mask = $("#mask");
    var $maskTop = $("#maskTop");
    var $largeImgContainer = $("#largeImgContainer");
    var $loading = $("#loading");
    var $largeImg = $("#largeImg");
    var $mediumImg = $("#mediumImg");

    $maskTop.mouseover(function () {
        $mask.show();
        $largeImgContainer.show();
        $loading.show();
        var src = $mediumImg.attr('src').replace(/m\.jpg$/,'l.jpg');
        $largeImg.attr('src',src);
        $largeImg.on('load',function () {
            console.log('a');
            //调整$largeImgContainer的尺寸
            var largeImgWidth = $(this).width();
            var largeImgHeight = $(this).height();
            $largeImgContainer.css({
                width:largeImgWidth/2,
                height:largeImgHeight/2
        });

            $largeImg.show();
            $loading.hide();
            $maskTop.mousemove(function (event) {
                var left = 0;
                var top = 0;
                //$maskTop的宽高
                var maskTopWidth = $maskTop.width();
                var maskTopHeight = $maskTop.height();
                //$mask的宽高
                var maskWidth = $mask.width();
                var maskHeight = $mask.height();
                //事件的坐标
                var eventX = event.offsetX;
                var eventY = event.offsetY;
                left = eventX - maskWidth/2;
                top = eventY - maskHeight/2;
                if(left<0){
                    left = 0;
                }else if(left>maskTopWidth - maskWidth ){
                    left = maskTopWidth - maskWidth;
                }
                if(top < 0){
                    top = 0;
                } else if(top > maskTopHeight - maskHeight){
                    top = maskTopHeight - maskHeight;
                }
                //mask的css
                $mask.css({
                    left:left,
                    top:top
                });
                $largeImg.css({
                    left: -left*largeImgWidth/maskTopWidth,
                    top: -top*largeImgHeight/maskTopHeight
                })
            })

        })

    })


}
//10. 当鼠标悬停在某个小图上,在上方显示对应的中图
function showMiddleImg() {
    var $lists = $("#icon_list>li>img");
    var $mediumImg = $("#mediumImg");
    $lists.hover(function () {
       this.className = 'hoveredThumb';
        var src = $(this).attr('src').replace(/.jpg$/, '-m.jpg');
        $('#mediumImg').attr('src',src);
    },function () {
        this.className = '';
    })

}
//9. 点击向右/左, 移动当前展示商品的小图片
function moveSmallImgs() {
    var $listA = $("#preview>h1>a");
    var $div = $("#icon_list");
    var $listimg = $div.children('li');
    var $backward = $listA.first();         //前页
    var $forward = $listA.last();           //后页
    //初始化容器的宽度
    $div.css('width',62*$listimg.length);
    //定义翻页的次数
    var moveContent = 0;
    $forward.attr('class','forward');
    //向右翻页
    $forward.click(function () {
        if(this.className == 'forward_disabled'){
            return;
        }
        moveContent++;
        if(moveContent == $listimg.length - 5){
            this.className = 'forward_disabled';
        }
        $backward.attr('class','backward');
        $div.css('left',-62*moveContent);
    });
    //向左翻页
    $backward.click(function () {
        if(this.className == 'backward_disabled'){
            return;
        }
        moveContent--;
        if(moveContent == 0){
            this.className = 'backward_disabled';
        }
        $forward.attr('class','forward');
        $div.css('left',-62*moveContent);
    })
}
//8. 点击切换产品选项
function changeProductTabs() {
var $lists = $("#product_detail>ul>li");
    $lists.click(function () {
        if(this.className == 'current'){
            return;
        }
        var $divs = $("#product_info,#product_data,#product_package,#product_comment,#product_saleAfter");

        this.className = 'current';
        $divs.eq($(this).index()).show();
        //兄弟元素中有className=current的元素
        var $sibling = $(this).siblings('.current');
        $sibling.removeClass();
        $divs.eq($sibling.index()).hide();
    })
}
//7. 鼠标移入移出切换显示迷你购物车
function changeMinCart() {
    $("#minicart").hover(function () {
        this.className = 'minicart';
        $(this).children().show();
    },function () {
        this.className = '';
        $(this).children('div').hide();
    })
}
//5. 鼠标移入移出切换地址的显示隐藏
function showAddress() {
    var $storeSelect  = $("#store_select");
    var $divs = $storeSelect.children('div:gt(0)');
    $storeSelect.hover(function () {
        $divs.show();
    },function () {
        $divs.hide();
    })
}
//6. 点击切换地址tab
function changeAddressTabs() {
    var $Tabs = $("#store_tabs>li");
    $Tabs.click(function () {
        if(this.className == 'hover'){
            return;
        }
        this.className = 'hover';
        //兄弟标签中右class是hover的，去掉hover
        var $sibling = $(this).siblings('.hover');
        $sibling.removeClass();
    })

}
//4. 点击显示或者隐藏更多的分享图标
function showMore() {
    var $shareMore = $("#shareMore");
    var $prevA = $shareMore.prevAll('a:lt(2)');
    var $parentDiv = $shareMore.parent();
    var $childrenB = $shareMore.children();
    $shareMore.click(function () {
        if($childrenB.attr('class')=='backword'){
            $parentDiv.css('width',155);
            $prevA.hide();
            $childrenB.removeClass();
        }else{
            $parentDiv.css('width',200);
            $prevA.show();
            $childrenB.addClass('backword');

        }
    })
}
//3. 输入搜索关键字, 列表显示匹配的结果
function search() {
//focus/keyup/blur
    $("#txtSearch").on('focus keyup',function () {
        if($.trim(this.value) != ''){
            $("#search_helper").show();
        }
    }).blur(function () {
        $("#search_helper").hide();
    })
}
//1. 鼠标移入显示,移出隐藏
function showhide() {
    $("[name=show_hide]").hover(function () {
        $("#"+$(this).attr('id')+'_items').show();
    },function () {
        $("#"+$(this).attr('id')+'_items').hide();
    })
}
//2. 鼠标移动切换二级导航菜单的切换显示和隐藏
function showSubItems() {
   $("#category_items>div").hover(function () {
        $(this).children('div').show();
   },function () {
       $(this).children('div').hide();
   })
}



































































