/**
 * Created by xfzhang on 2016/7/26.
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

    hoverContent();
    hoverNaviSubItems();
    search();
    showShareIcons();
    showAddress();
    changeAddressTabs();
    showMiniCart();
    changeProductTabs();
    moveSmallImgs();
    showMiddleImg();


    /*
     10. 当鼠标悬停在某个小图上,在上方显示对应的中图
     */
    function showMiddleImg () {
        $('#icon_list>li>img').hover(function () {
            this.className = 'hoveredThumb';
            //小图: images\products\product-s3.jpg
            //中图: images/products/product-s3-m.jpg
            var src = this.src.replace(/.jpg$/, '-m.jpg');
            $('#mediumImg').attr('src', src);

        }, function () {
            this.className = '';
        });
    }

    /*
     9. 点击向右/左, 移动当前展示商品的小图片
     */
    function moveSmallImgs () {
        var $as = $('#preview>h1>a');
        var $backwardA = $as.first();
        var $forwardA = $as.last();
        var $listUl = $('#icon_list');
        var $lis = $listUl.children();
        //初始化更新$forwardA的class
        if($lis.length>5) {
            $forwardA.attr('class', 'forward');
        }
        //初始化指定$listUl的width
        $listUl.css('width', 62*$lis.length);

        var moveCount = 0;//向右移动的次数
        $forwardA.click(function () {
            //判断是否可以向右移动
            if(this.className === 'forward_disabled') {
                return;
            }
            moveCount++;
            //判断是否已经到达最右边
            if(moveCount==$lis.length-5) {
                this.className = 'forward_disabled';
            }
            //移动一下
            $listUl.css('left', -62*moveCount);
            //更新$backwardA
            $backwardA.attr('class', 'backward');
        });

        $backwardA.click(function () {
            //判断是否可以向左移动
            if(this.className === 'backward_disabled') {
                return;
            }
            moveCount--;
            //判断是否已经到达最左边
            if(moveCount==0) {
                this.className = 'backward_disabled';
            }
            //移动一下
            $listUl.css('left', -62*moveCount);
            //更新$forwardA
            $forwardA.attr('class', 'forward');
        });
    }


    /*
     8. 点击切换产品选项
     */
    function changeProductTabs () {
        $('#product_detail>ul>li').click(function () {
            if(this.className!='current') {
                //与所有li对应的内容div
                var $divs = $('#product_info,#product_data,#product_package,#product_comment,#product_saleAfter');

                //将class为current的标签的class移除
                var $li = $(this).siblings('.current');
                $li.removeClass();
                //隐藏对应的div内容
                $divs.eq($li.index()).hide();

                //给当前标签添加class
                this.className = 'current';
                //显示对应的内容
                $divs.eq($(this).index()).show();
            }
        });
    }

    /*
     7. 鼠标移入移出切换显示迷你购物车
     */
    function showMiniCart () {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children('div').show();
        }, function () {
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        });
    }


    /*
     6. 点击切换地址tab
     */
    function changeAddressTabs() {
        $('#store_tabs>li').click(function () {
            if(this.className === 'hover') //如果点击的本来就是选中的, 不需要做改变
                return;
            //找到class为hover的li, 移除class
            $(this).siblings('.hover').removeClass();
            //给当前li加class=hover
            this.className = 'hover';
        });
    }

    /*
     5. 鼠标移入移出切换地址的显示隐藏
     */
    function showAddress () {
        var $storeSelect = $('#store_select');
        var $children = $storeSelect.children(':gt(0)');
        $storeSelect.hover(function () {
            $children.show();
        }, function () {
            $children.hide();
        })
        .children(':last').click(function () {
            $children.hide();
        });
    }
    /*
     4. 点击显示或者隐藏更多的分享图标
     */
    function showShareIcons () {
        var $shareA = $('#shareMore');
        var $parentDiv = $shareA.parent();
        var $shareAs = $shareA.prevAll('a:lt(2)');
        var $childB = $shareA.children();

        $shareA.click(function () {
            if($childB.attr('class')==='backword') {//-->关闭
                $parentDiv.css('width', 155);
                $shareAs.hide();
                $childB.removeClass();
            } else { //--->打开
                $parentDiv.css('width', 200);
                $shareAs.show();
                $childB.addClass('backword');
            }
        });
    }

    /*
     3. 输入搜索关键字, 列表显示匹配的结果
     */
    function search() {
        $('#txtSearch')
        /*.focus(function () {
            //只有输入了数据才显示
            if($.trim(this.value)!='') {
                $('#search_helper').show();
            }
        }).keyup(function () {
            if($.trim(this.value)!='') {
                $('#search_helper').show();
            }
        })*/
        .on('focus keyup', function () { //加2个监听
            //只有输入了数据才显示
            if($.trim(this.value)!='') {
                $('#search_helper').show();
            }
        })
        .blur(function () {
            $('#search_helper').hide();
        })
    }
    /*
     2. 鼠标移动切换二级导航菜单的切换显示和隐藏
     */
    function hoverNaviSubItems() {
        $('#category_items>div').hover(function () {
            $(this).children('div').show();
        }, function () {
            $(this).children('div').hide();
        });
    }

    //1. 鼠标移入显示,移出隐藏
    function hoverContent() {
        $('[name=show_hide]').hover(function () { //移入-->显示
                $('#'+this.id+'_items').show();
        }, function () { //移出-->隐藏
            $('#'+this.id+'_items').hide();
        });
    }
});