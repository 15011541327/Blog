$(function () {
    showBigImg();
    function showBigImg() {
        var $mediumImg = $("#mediumImg");
        var $mask = $("#mask");
        var $maskTop = $("#maskTop");
        var $largeImgContainer = $("#largeImgContainer");
        var $loading = $("#loading");
        var $largeImg = $("#largeImg");

        $maskTop.mouseover(function () {
            $largeImgContainer.show();
            $loading.show();
            $mask.show();
            var src = $mediumImg.attr('src').replace(/m\.jpg$/,'l.jpg');
            $largeImg.attr('src',src);
            $largeImg.on('load',function () {
                var $largeImgWidth = $largeImg.width();
                var $largeImgHeight = $largeImg.height();
                $largeImgContainer.css({
                    width:$largeImgWidth/2,
                    height:$largeImgHeight/2
                });
                $loading.hide();
                $largeImg.show();
                $maskTop.mousemove(function (ev) {
                    var event = ev || event;
                    var left = 0;
                    var top = 0;

                    var $maskWidth = $mask.width();
                    var $maskHeight = $mask.height();
                    var $maskTopWidth = $maskTop.width();
                    var $maskTopHeight = $maskTop.height();
                    var eventX = event.offsetX;
                    var eventY = event.offsetY;
                    //计算left和top
                    left = eventX - $maskWidth/2;
                    top = eventY - $maskHeight/2;
                    console.log(left);
                    console.log(top);
                    if(left<0){
                        left = 0;
                    }
                    if(left > $maskTopWidth-$maskWidth){
                        left = $maskTopWidth-$maskWidth;
                    }
                    if(top<0){
                        top = 0;
                    }
                    if(top >$maskTopHeight - $maskHeight ){
                        top = $maskTopHeight - $maskHeight;
                    }
                    $mask.css({
                        left:left,
                        top:top
                    });
                    $largeImg.css({
                        left:-left*$largeImgWidth/$maskTopWidth,
                        top:-top*$largeImgHeight/$maskTopHeight
                    });


                });
            });
        })/*.mouseout(function () {
            $largeImgContainer.hide();
            $largeImg.hide();
            $mask.hide();
        })*/
    }


});


