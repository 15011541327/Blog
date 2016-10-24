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
    var $mediumImg = $('#mediumImg');
    var $maskTop = $("#maskTop");
    var $mask = $('#mask');
    var $largeImgContainer = $("#largeImgContainer");
    var $loading = $("#loading");
    var $largeImg = $("#largeImg");
    $maskTop.mouseover(function () {
        $mask.show();
        $largeImgContainer.show();
        $loading.show();
        var src = $mediumImg.attr('src').replace(/m\.jpg$/,'l.jpg');
        $largeImg.attr('src',src);
        $largeImg.on('load',function () {
            //得到图片的宽高
            var largeImgWidth = $largeImg.width();
            var largeImgHeight = $largeImg.height();
            $largeImgContainer.css({
                width:largeImgWidth/2,
                height:largeImgHeight/2
            });
            $loading.hide();
            $largeImg.show();
            //大图加载完后，才进行后面的操作
            $maskTop.mousemove(function (ev) {
                var event = event||ev;
                var left = 0;
                var top = 0;
                var $maskTopWidth = $maskTop.width();
                var $maskTopHeight = $maskTop.height();
                var $maskWidth = $mask.width();
                var $maskHeight = $mask.height();
                var eventX = event.offsetX;
                var eventY =event.offsetY;

                //计算left 和 top
                left = eventX - $maskWidth/2;//41-175
                top = eventY - $maskHeight/2;

                if(left<0){
                    left = 0;
                }else if(left>$maskTopWidth - $maskWidth){
                    left = $maskTopWidth - $maskWidth;
                }
                if(top<0){
                    top = 0;
                }else if(top > $maskTopHeight - $maskHeight){
                    top = $maskTopHeight - $maskHeight;
                }
                $mask.css({
                    left:left,
                    top:top
                });
                $largeImg.css({
                    left:-left*largeImgWidth/$maskTopWidth,
                    top:-top*largeImgHeight/$maskTopHeight
                })
            })
        })
    }).mouseout(function () {
        $largeImg.hide();
        $mask.hide();
        $largeImgContainer.hide();
    })
}
//10. 当鼠标悬停在某个小图上,在上方显示对应的中图
function showMiddleImg() {
    var $img = $("#icon_list>li>img");
    var $bigImg = $("#mediumImg");
    $img.hover(function () {
        $(this).addClass('hoveredThumb');
        var src = this.src.replace(/.jpg$/,'-m.jpg');
        $bigImg.attr('src',src);
    },function () {
        $(this).removeClass();
    })

}
//9. 点击向右/左, 移动当前展示商品的小图片
function moveSmallImgs() {
    var $as = $("#preview>h1>a");
    var $backward = $as.first();
    var $forward = $as.last();
    var index = 1;
    var offsetLeft = 0;
    $forward.removeClass();
    $forward.addClass('forward');
    $forward.click(function () {
        if(index == 3){
            $forward.removeClass();
            $forward.addClass('forward_disabled');
            return;
        }
        index ++;
        offsetLeft = -index*62;
        $("#icon_list").css('left',offsetLeft);
        $backward.removeClass();
        $backward.addClass('backward');
    });
    $backward.click(function () {
        if(index == 0){
            $backward.removeClass();
            $backward.addClass('backward_disabled');
            return;
        }
        index --;
        offsetLeft = -index*62;
        $("#icon_list").css('left',offsetLeft);
        $forward.removeClass();
        $forward.addClass('$forward');
    })
}
//8. 点击切换产品选项
function changeProductTabs() {
    var $childrens = $("#product_detail>ul>li");
    var  $productDetail=$("#product_detail");
    var $lis = $productDetail.children('ul>li');
    var $divs = $('#product_info,#product_data,#product_package,#product_comment,#product_saleAfter');
    $childrens.click(function () {
        if(this.className !== 'current'){
            var $sibling = $(this).siblings('.current');
            $sibling.removeClass();
            $divs.eq($sibling.index()).hide();

            $(this).addClass('current');
            $divs.eq($(this).index()).show();
        }
    })
}
//7. 鼠标移入移出切换显示迷你购物车
function changeMinCart() {
    var $minicart = $("#minicart");
    var $p = $minicart.children('p');
    var $div = $minicart.children('div');
    $p.hover(function () {
        $minicart.addClass('minicart');
        $div.show();
    },function () {
        $minicart.removeClass();
        $div.hide();
    })
}
//6. 点击切换地址tab
function changeAddressTabs() {
    var $children = $("#store_tabs>li");
    $children.click(function () {
        if($(this).attr('class') == 'hover'){
            return;
        }
        //找到兄弟元素中className为hover的兄弟元素
        $(this).siblings('.hover').removeClass();
        $(this).addClass('hover');
    })
}
//5. 鼠标移入移出切换地址的显示隐藏
function showAddress() {
    $("#store_select").hover(function () {
        $("#store_content").show();
        $("#store_close").show();
    },function () {
        $("#store_content").hide();
        $("#store_close").hide();
    });
    $("#store_close").click(function () {
        $(this).hide();
        $("#store_content").hide();
    })
}
//4. 点击显示或者隐藏更多的分享图标
function showMore() {
    var $shareMore = $("#shareMore");
    var $parentDiv = $shareMore.parent();
    var $prevAll = $shareMore.prevAll('a:lt(2)');
    var $children = $shareMore.children();
    $shareMore.click(function () {
        if($children.attr('class') == 'backword'){
            $parentDiv.css('width',155);
            $prevAll.hide();
            $children.removeClass();
        }else{
            $parentDiv.css('width',200);
            $prevAll.show();
            $children.addClass('backword');
        }
    })

}
//3. 输入搜索关键字, 列表显示匹配的结果
function search() {
    $('#txtSearch').on('focus keyup',function () {
        var text = $(this).val();
        if($.trim(text) != ''){
            $("#search_helper").show();
        }
    }).blur(function () {
        $("#search_helper").hide();
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
//1. 鼠标移入显示,移出隐藏
//目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
function showhide() {
    $("[name = show_hide]").hover(function () {
        $("#"+$(this).attr('id')+'_items').show();
    },function () {
        $("#"+$(this).attr('id')+'_items').hide();
    })
}