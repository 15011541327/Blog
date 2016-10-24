/**
 * Created by wangtiantian on 2016/7/26.
 */
/*
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域


 1). 给哪个(些)标签绑定什么事件监听
 2). 在回调函数中, 对哪个(些)标签进行什么操作处理
 */
$(function () {
    //1. 鼠标移入显示,移出隐藏
    showHide();
    //目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
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
    miniCart();
    //8. 点击切换产品选项
    changeProductTabs();
    //9. 点击向右/左, 移动当前展示商品的小图片
    moveSmallImgs();
    //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    showMiddleImg();
    //11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    showBigImg()
});
//11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
function showBigImg() {
    /* <p id="medimImgContainer">
     <img id="mediumImg" src="images/products/product-s1-m.jpg" />
     <span id="mask"></span>
     <span id="maskTop"></span>
     <span id="largeImgContainer">
     <img id="loading" src="images/loading.gif"/>
     <img id="largeImg"/>*/

    var $mediumImg = $('#mediumImg');               //第二大图片
    var $maskTop = $('#maskTop');                   /*悬于图片/mask上方的专用于接收鼠标移动事件的一个完全透明的层加事件监听的区域*/


    var $loading = $("#loading");                   //加载未完成时候图片
    var $mask = $("#mask");                            //黄块
    var $largeImg = $("#largeImg");                    //大图片
    var $largeImgContainer = $("#largeImgContainer");   //显示的·大图片区域
    $maskTop.mouseover(function () {
        $mask.show();
        $largeImgContainer.show();
        $loading.show();
        var largeSrc = $mediumImg.attr('src').replace(/m\.jpg/,"l.jpg");
        $largeImg.attr('src',largeSrc);
        //图片加载完，隐藏$loading、调整$largeImgContainer的尺寸

        $largeImg.on('load',function () {

            //得到图图片的尺寸
            var $largeImgWidth = $largeImg.width();
            var $largeImgHeight = $largeImg.height();
            $largeImgContainer.css({
                width: $largeImgWidth/2,
                height: $largeImgHeight/2
            });
            $loading.hide();        //隐藏加载图片
            $largeImg.show();       //显示大图片
            //大图片加载完成后才加后面的监听
            $maskTop.mousemove(function (event) {
                var left = 0;
                var top = 0;
                //得到$maskTop的宽高
                var $maskTopWidth = $maskTop.width();
                var $maskTopHeight =$maskTop.height();
                //得到$mask的尺寸
                var $maskWidth = $mask.width();
                var $maskHeight = $mask.height();
                //得到事件的坐标offsetx：设置或者是得到鼠标相对于目标事件的父元素的内边界在x坐标上的位置。
                var eventX = event.offsetX;
                var eventY =event.offsetY;
                /*console.log(eventX);
                console.log(eventY);*/
                //计算left和top
                left = eventX - $maskWidth/2; //让鼠标在黄块的中间
                top = eventY - $maskHeight/2;
                console.log(left);
                console.log(top);
                if(left<0){
                    left=0;
                }else if(left > $maskTopWidth - $maskWidth){
                    left = $maskTopWidth - $maskWidth;
                }
                if(top < 0){
                    top = 0;
                }else if(top > $maskTopHeight - $maskHeight){
                    top = $maskTopHeight - $maskHeight;
                }
                //$mask移动
                $mask.css({
                    left:left,
                    top:top
                });
                //$largeImg移动
                $largeImg.css({
                    left: -left*$largeImgWidth/$maskTopWidth,
                    top: -top*$largeImgHeight/$maskTopHeight
                })


            });
        });

    }).mouseout(function () {
        $largeImg.hide();
        $mask.hide();
        $largeImgContainer.hide();
    })
}
//10. 当鼠标悬停在某个小图上,在上方显示对应的中图
function showMiddleImg() {
    //小图片src ：images\products\product-s1.jpg
    //中图片src ：images/products/product-s1-m.jpg
    var $imgs = $("#icon_list>li>img");
    $imgs.hover(function () {
        this.className = 'hoveredThumb';
        var src = this.src.replace(/.jpg$/, '-m.jpg');
        $("#mediumImg").attr('src',src)
    },function () {
        this.className = '';
    })
    

}
//9. 点击向右/左, 移动当前展示商品的小图片
function moveSmallImgs() {
    var $listA = $("#preview>h1>a");
    var $forward = $listA.last();
    var $backward = $listA.first();
    var $ul = $("#icon_list");
    var $lis = $ul.children('li');
    //初始化$ul的宽度
    $ul.css('width', 62*$lis.length);
    //初始化$forward
    if($lis.length > 5){
        $forward.attr('class','forward')
    }
    //定义翻页的次数
    var moveConten = 0;
    //向右翻页
    $forward.click(function () {
        if(this.className == 'forward_disabled'){
            return;
        }
        moveConten++;
        //翻到最后一页
        if(moveConten == $lis.length - 5){
            $forward.attr('class','forward_disabled')
        }
        $ul.css('left', -62*moveConten);
        $backward.attr('class','backward')
    });
    //向左翻页
    $backward.click(function () {
        if(this.className == 'backward_disabled'){
            return;
        }
        moveConten--;
        //翻到最后一页
        if(moveConten == 0){
            $backward.attr('class','backward_disabled')
        }
        $ul.css('left', -62*moveConten);
        $forward.attr('class','forward')
    })

}
//8. 点击切换产品选项
function changeProductTabs() {
    var $list = $("#product_detail>ul>li");
    var $divs = $("#product_info,#product_data,#product_package,#product_comment,#product_saleAfter");
    $list.click(function () {
        if(this.className == 'current'){
            return;
        }
        this.className = 'current';
        //显示当前下标的内容
        $divs.eq($(this).index()).show();
        //className为currentd的div隐藏
        var $sibling = $(this).siblings('.current');
        $sibling.removeClass();
        $divs.eq($sibling.index()).hide();
    });
}
//7. 鼠标移入移出切换显示迷你购物车
function miniCart() {
    $("#minicart").hover(function () {
        this.className = 'minicart';
       $(this).children('div').show();
    },function () {
        $(this).children('div').hide();
        this.className = '';
    })
}
//6. 点击切换地址tab
function changeAddressTabs() {
    var $lis = $("#store_tabs>li");
    $lis.click(function () {
        if(this.className == 'hover'){
            return;
        }
        //去掉兄弟中classname是hover的
        var $stors =$(this).siblings('.hover');
            $stors.removeClass();
            $(this).addClass('hover');
    })
};
//5. 鼠标移入移出切换地址的显示隐藏
function showAddress() {
    var $storeSelect = $("#store_select");
    var $divs = $storeSelect.children('div:gt(0)');
    $storeSelect.hover(function () {
        $divs.show();
    },function () {
        $divs.hide();
    }).children(':last').click(function () {
        $('#store_content').hide();
        $(this).hide();
    })
}
//4. 点击显示或者隐藏更多的分享图标
function showMore() {
    var $shareA = $("#shareMore");
    var $as = $shareA.prevAll('a:lt(2)');
    var $parentDiv = $shareA.parent();
    var $childrenB = $shareA.children();
    $shareA.click(function () {
        if($childrenB.attr('class') == 'backword'){
            $childrenB.removeClass();
            $as.hide();
            $parentDiv.css('width',155);
        }else{
            $childrenB.addClass('backword');
            $as.show();
            $parentDiv.css('width',200)
        }
    })
}
//3. 输入搜索关键字, 列表显示匹配的结果
function search() {
    //focus、keyup、bluer
    $("#txtSearch").on('focus keyup',function () {
        if($.trim(this.value) ==""){   //输入空格或者空值，跳出函数
            return;
        }
        $("#search_helper").show();
    }).blur(function () {
        $("#search_helper").hide();
    })
}
//2. 鼠标移动切换二级导航菜单的切换显示和隐藏
function showSubItems() {
    var $categoryItems = $("#category_items>div");
    $categoryItems.hover(function () {
        $(this).children('div').show();
    },function () {
        $(this).children('div').hide();
    })
}
//1. 鼠标移入显示,移出隐藏
function showHide() {
    var $showhide = $("[name=show_hide]");
    $showhide.hover(function () {
        $('#'+this.id+'_items').show();
    },function () {
        $('#'+this.id+'_items').hide();
    })
}

































