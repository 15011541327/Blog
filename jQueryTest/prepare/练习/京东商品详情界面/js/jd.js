/*
1. 鼠标移入显示,移出隐藏
	目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
2. 鼠标移动切换二级导航菜单的切换显示和隐藏
3. 输入搜索关键字, 列表显示匹配的结果

4. 点击显示或者隐藏更多的分享图标
5. 鼠标移入移出切换地址的显示隐藏
6. 点击切换地址tab

7. 鼠标移入移出切换显示迷你购物车
8. 点击切换地址选项

9. 点击向右/左, 移动当前展示商品的小图片
10. 当鼠标悬停在某个小图上,在上方显示对应的中图
11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

$(function () {
	
	hoverContent();
	hoverNaviSubItems();
	search();
	
	showMoreShares();
	hoverAddress();
	changeAddressTab();
	
	hoverMiniCat();
	changeProductTab();
	
	moveImages();
	changeImages();
	bigImage();
	
	
	/*
	 * 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
	 */
	function bigImage () {
		var $mediumImg = $('#mediumImg');
		var $mask = $('#mask');
		var $largeImgContainer = $('#largeImgContainer');
		var $loading = $('#loading');
		var $largeImg = $('#largeImg');
		var $maskTop = $('#maskTop');
		$maskTop
			.mouseover(function () {
				$mask.show();
				$largeImgContainer.show();
				$loading.show();
				var src = $mediumImg.attr('src').replace(/-m\.jpg$/, '-l.jpg');
				$largeImg.attr('src', src);
				
				$largeImg.on('load', function () {
					var imgWidth = $largeImg.width();
					var imgHeight = $largeImg.height();
					$largeImgContainer.width(imgWidth/2);
					$largeImgContainer.height(imgHeight/2);
					$loading.hide();
					$largeImg.show();
				});
			})
			.mousemove(function (ev) {
				var evX = ev.offsetX;
				var evY = ev.offsetY;
				var maskWidth = $mask.outerWidth();
				var maskHeight = $mask.outerHeight();
				var maskTopWidth = $maskTop.outerWidth();
				var maskTopHeight = $maskTop.outerHeight();
				
				var left = evX-maskWidth/2;
				var top = evY-maskHeight/2;
				if(left<0) {
					left = 0;
				} else if(left>maskTopWidth-maskWidth) {
					left = maskTopWidth-maskWidth;
				}
				if(top<0) {
					top = 0;
				} else if(top>maskTopHeight - maskHeight) {
					top = maskTopHeight - maskHeight;
				}
				$mask.css('left', left);
				$mask.css('top', top);
				$largeImg.css('left', -left*$largeImg.outerWidth()/maskTopHeight);
				$largeImg.css('top', -top*$largeImg.outerHeight()/maskTopHeight);
			})
			.mouseout(function () {
				$mask.hide();
				$largeImgContainer.hide();
				$largeImg.hide();
			});
	}
	
	/*
	 * 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
	 */
	function changeImages() {
		var $mediumImg = $('#mediumImg');
		var $imgs = $('#icon_list img');
		$('#icon_list img').mouseover(function () {
			if(this.className!='hoveredThumb') {
				$imgs.filter('.hoveredThumb').removeClass();
				this.className = 'hoveredThumb';
				
				//images/products/p-s1.jpg
				//images/products/p-s1-m.jpg
				var src = this.src.replace(/.jpg$/, '-l.jpg');
				$mediumImg.attr('src', src);
			}
		});
	}
	
	/*
	 * 9. 点击向右/左, 移动当前展示商品的小图片
	 */
	function moveImages () {
		var $a = $('#preview>h1>a');
		var $backwardA = $a.first();
		var $forwardA = $a.last();
		var $imgListUl = $('#icon_list');
		var $smallImgs = $('#icon_list img');
		
		//设置ul的宽度为所有li宽度的和
		$imgListUl.css('width', 62*$smallImgs.length);
		if($smallImgs.length>5) {
			$forwardA.attr('class', 'forward');
		}
		
		var moveCount = 0;
		$backwardA.click(function () {
			if(this.className=='backward_disabled') {
				return;
			}
			moveCount--;
			$imgListUl.css('left', -62*moveCount);
			
			if(moveCount==0) {
				this.className='backward_disabled'
			}
			$forwardA.attr('class', 'forward');
		});
		
		$forwardA.click(function () {
			if(this.className=='forward_disabled') {
				return;
			}
			moveCount++;
			$imgListUl.css('left', -62*moveCount);
			
			if(moveCount==$smallImgs.length-5) {
				this.className='forward_disabled'
			}
			$backwardA.attr('class', 'backward');
		});
	}
	
	/*
	 * 8. 点击切换地址选项
	 */
	function changeProductTab () {
		var $lis = $('#product_detail>ul>li');
		var $tabDetail = $('#product_info,#product_data,#product_package,#product_comment,#product_saleAfter');
		$lis.click(function () {
			var $cLi = $lis.filter('.current');
			$cLi.removeClass();
			var cIndex = $cLi.index();
			if(cIndex!=3) {
				$tabDetail.eq(cIndex).hide();
			}
			
			this.className = 'current';
			cIndex = $(this).index();
			if(cIndex!=3) {
				$tabDetail.eq(cIndex).show();
			}
		});
	}
	
	/*
	 * 7. 鼠标移入移出切换显示迷你购物车
	 */
	function hoverMiniCat () {
		$('#minicart').hover(function () {
			$(this).addClass('minicart').children('div').show();
		}, function () {
			$(this).removeClass().children('div').hide();
		});
	}
	
	/*
	 * 6. 点击切换地址tab
	 */
	function changeAddressTab () {
		$('#store_tabs>li').click(function () {
			if(this.className!='hover') {
				$(this).siblings('.hover').removeClass();
				this.className = 'hover';
			}
		});
	}
	
	/*
	 * 5. 鼠标移入移出切换地址的显示隐藏
	 */
	function hoverAddress () {
		var $storeSelect = $('#store_select');
		var $hoverChildren = $storeSelect.children(':gt(0)');
		$storeSelect.hover(function () {
			$hoverChildren.show();
		}, function () {
			$hoverChildren.hide();
		})
		.children(':last').click(function () {
			$hoverChildren.hide();
		});
	}
	
	/*
	 * 4. 点击显示或者隐藏更多的分享图标
	 */
	function showMoreShares () {
		$('#shareMore').click(function () {
			var $parentDiv = $(this).parent();
			var $childB = $(this).children(':first');
			var $moreA = $parentDiv.children('a:gt(2):not(:last)');
			
			if($childB.attr('class')==='backword') {
				$childB.removeAttr('class');
				$moreA.hide();
				$parentDiv.css('width', 155);
			} else {
				$childB.attr('class', 'backword');
				$moreA.show();
				$parentDiv.css('width', 200);
			}
		});
	}
	
	/*
	 * 3. 输入搜索关键字, 列表显示匹配的结果
	 */
	function search () {
		var $shDiv = $('#search_helper');
		$('#txtSearch')
			/*.keyup(function () {//按键起来
				if($.trim(this.value)!='') {
					$shDiv.show();
				}
			})
			.focus(function () {
				if($.trim(this.value)!='') {
					$shDiv.show();
				}
			})*/
			.on('keyup focus', function () {
				if($.trim(this.value)!='') {
					$shDiv.show();
				}
			}) 
			.blur(function () {//失去焦点
				$shDiv.hide();
			});
	}
	/*
	 * 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
	 */
	function hoverNaviSubItems () {
		$('#category_items>div').hover(function () {
			$(this).children('div').show();
		}, function () {
			$(this).children('div').hide();
		});
	}
	/*
	 * 1. 鼠标移入显示,移出隐藏
	 	 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
	 */
	function hoverContent () {
		$("[name=show_hide]").hover(function () {
			$(this).children('#'+this.id+'_items').show();
		}, function () {
			$(this).children('#'+this.id+'_items').hide();
		});
	}
});
